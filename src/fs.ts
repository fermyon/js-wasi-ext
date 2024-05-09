//@ts-ignore
import { getDirectories } from 'wasi:filesystem/preopens@0.2.0'
//@ts-ignore 
import { initialCwd } from 'wasi:cli/environment@0.2.0'
import { Descriptor } from './types/wasi-filesystem-types'
import pathUtility from "path";

interface FileReadOptions {
	encoding: "utf-8",
	flag: string
}

let decoder = new TextDecoder()

//TODO: figure out a way to stub these calls when not inside the handler function.
const fs = {
	readFileSync: (path: string, options?: FileReadOptions): Uint8Array | string => {
		let dirs = getDirectories()
		path = pathUtility.resolve(initialCwd() || "/", path)
		let closestMatchingDir = findLongestMatchingDirectory(dirs, path)
		if (!closestMatchingDir) {
			throw new Error(`File not found: ${path}`)
		}
		try {
			let file = closestMatchingDir[0].openAt({ symlinkFollow: true }, path.replace(closestMatchingDir[1], ""), { create: false, directory: false, exclusive: false, truncate: false }, { read: true })
			let filestats = file.stat()
			let res = file.read(filestats.size, BigInt(0))
			if (options?.encoding) {
				return decoder.decode(res[0])
			}
			return res[0]
		} catch (e: any) {
			if (e.message === "no-entry") {
				throw new Error("File not found")
			}
			throw new Error("Something went wrong")
		}
	}
}

export default fs;

function findLongestMatchingDirectory(descriptors: [Descriptor, string][], filePath: string): [Descriptor, string] | null {
	let longestMatch = null;
	let longestMatchLength = 0;

	descriptors.forEach(descriptor => {
		// Ensure paths end with a slash for consistent matching
		const normalizedDirectory = descriptor[1].endsWith('/') ? descriptor[1] : descriptor[1] + '/';

		if (filePath.startsWith(normalizedDirectory)) {
			// If the current directory is a match and is longer than the previous match
			if (normalizedDirectory.length > longestMatchLength) {
				longestMatch = descriptor;
				longestMatchLength = normalizedDirectory.length;
			}
		}
	});

	return longestMatch;
}
