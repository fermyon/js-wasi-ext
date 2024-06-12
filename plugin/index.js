module.exports = class WasiExtPlugin {
    constructor() {
        this.fallbacks = {
            process: require.resolve('../lib/process'),
            fs: require.resolve('../lib/fs'),
            path: require.resolve('path-browserify'),
        };
    }

    apply(compiler) {
        compiler.hooks.afterPlugins.tap('WasiExtPlugin', (compiler) => {
            const webpack = compiler.webpack || require('webpack');

            compiler.options.resolve.fallback = {
                ...this.fallbacks,
                ...compiler.options.resolve.fallback,
            };

            // Adding ProvidePlugin configuration
            compiler.options.plugins.push(
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'],
                })
            );
        });
    }
};