module.exports = class WasiExtPlugin {
    constructor() {
        this.fallbacks = {
            process: require.resolve('../lib/process'),
            fs: require.resolve('../lib/fs'),
            path: require.resolve('path-browserify'),
        };
    }
    apply(compiler) {
        compiler.options.resolve.fallback = {
            ...this.fallbacks,
            ...compiler.options.resolve.fallback,
        }
    }
}