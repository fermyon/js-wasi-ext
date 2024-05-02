
export class Os {
	EOL = "\n";
	arch = (): string => {
		return "wasm32/wasi"
	}
}

const os = new Os();
export default os;
