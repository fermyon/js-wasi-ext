const webpack = require('webpack');
module.exports = class WasiExtPlugin {
    constructor() {
        this.fallbacks = {
            process: require.resolve('../lib/process'),
            fs: require.resolve('../lib/fs'),
            path: require.resolve('path-browserify'),
        };
    }

    apply(compiler) {
        const providePlugin = new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: [require.resolve('../lib/process'), 'default']
        });

        compiler.options.resolve.fallback = {
            ...compiler.options.resolve.fallback,
            ...this.fallbacks,
        };

        compiler.options.plugins.push(providePlugin);
    }
};