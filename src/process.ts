//@ts-ignore
import { getEnvironment } from "wasi:cli/environment@0.2.0";

interface ProcessEnv {
	[key: string]: string
}

class Process {
	constructor() {
		this.env = {}
	}
	setupProcess = () => {
		let env = getEnvironment();
		env.map((k: any) => {
			this.env[k[0] as string] = k[1] as string;
		})
	}
	env: ProcessEnv
}

const process = new Process();

export default process;

