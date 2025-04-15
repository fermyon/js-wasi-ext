//@ts-ignore
import { getEnvironment } from "wasi:cli/environment@0.2.3";
//@ts-ignore
import process from "process/browser"

process.title = "starlingMonkey"

if (delete process.env) {
	Object.defineProperty(process, 'env', {
		get: function () {
			// TODO: Should we attempt to get the env each time.  
			// if env does not exist populate the list if running within the handler
			if (!this._env) {
				// This needs to be set within the handler function 
				if (!this.insideHandler) {
					// return empty env for top level
					return {}
				}
				this._env = {}
				let env = getEnvironment();
				env.map((k: any) => {
					this._env[k[0] as string] = k[1] as string;
				})
			}
			return this._env;
		},
		configurable: true,
		enumerable: true,
	});
}

// We can probably support chdir if desired (these throw errors in the upstream process shim).
// If we do that, we probably want to fix cwd to properly represent the state as well. 

export default process;

