//@ts-ignore
import { getDirectories } from 'wasi:filesystem/preopens@0.2.0'
//@ts-ignore 
import { Descriptor, DirectoryEntry } from './types/wasi-filesystem-types'
import pathUtility from "path";
import process from "./process"
import { Dirent, readdir, readdirSync } from 'fs';

interface FileReadOptions {
	encoding: "utf-8",
	flag: string
}

interface DirReadOptions {
	encoding: "utf-8",
	withFileTypes: boolean,
	recursive: boolean
}

let decoder = new TextDecoder()

//TODO: figure out a way to stub these calls when not inside the handler function.
const fs = {
	readFileSync: (path: string, options?: FileReadOptions): Buffer | string => {
		let dirs = getDirectories()
		path = pathUtility.resolve(process.cwd() || "/", path)
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
			return Buffer.from(res[0])
		} catch (e: any) {
			if (e.message === "no-entry") {
				throw new Error("File not found")
			}
			throw new Error("Something went wrong")
		}
	},
	readdirSync: (path: string, options: DirReadOptions = { encoding: "utf-8", withFileTypes: false, recursive: false }): string[] | Dirent[] => {
		let dirs = getDirectories()
		path = pathUtility.resolve(process.cwd() || "/", path)
		let closestMatchingDir = findLongestMatchingDirectory(dirs, path)
		if (!closestMatchingDir) {
			throw new Error(`Directory not found: ${path}`)
		}
		try {
			let directories = readDirectory(closestMatchingDir[0], options)
			if (!options.withFileTypes) {
				return directories.map(k => { return k.name })
			}
			return directories.map(k => {
				return {
					name: k.name,
					isBlockDevice: () => { return k.type === "block-device" },
					isCharacterDevice: () => { return k.type === "character-device" },
					isDirectory: () => { return k.type === "directory" },
					isFIFO: () => { return k.type === "fifo" },
					isFile: () => { return k.type === "regular-file" },
					isSocket: () => { return k.type === "socket" },
					isSymbolicLink: () => { return k.type === "symbolic-link" },
					parentPath: pathUtility.dirname(k.name),
					path: pathUtility.dirname(k.name)
				}
			})
		} catch (e: any) {
			if (e.message === "no-entry") {
				throw new Error("Directory not found")
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

function readDirectory(directory: Descriptor, options: DirReadOptions, path = ''): DirectoryEntry[] {
	let entries: DirectoryEntry[] = [];
	let test = directory.readDirectory();
	let entry = test.readDirectoryEntry();

	while (entry) {
		let entryName = `${path}${entry.name}`;
		entries.push({ type: entry.type, name: entryName });

		if (entry.type === "directory") {
			if (options.recursive) {
				let subDir = directory.openAt({ symlinkFollow: true }, entry.name, { create: false, directory: true, exclusive: false, truncate: false }, { read: true });
				entries = entries.concat(readDirectory(subDir, options, `${entryName}/`));
			}
		}

		entry = test.readDirectoryEntry();
	}

	return entries;
}