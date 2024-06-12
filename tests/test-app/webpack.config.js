const path = require('path');
const WasiExtPlugin = require("wasi-ext/plugin")


module.exports = {
    entry: './src/index.ts',
    experiments: {
        outputModule: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    externals: {
        "wasi:http/types@0.2.0": "wasi:http/types@0.2.0",
        "wasi:cli/environment@0.2.0": "wasi:cli/environment@0.2.0",
        "wasi:filesystem/preopens@0.2.0": "wasi:filesystem/preopens@0.2.0",
        "fermyon:spin/llm@2.0.0": "fermyon:spin/llm@2.0.0",
        "fermyon:spin/variables@2.0.0": "fermyon:spin/variables@2.0.0",
        "fermyon:spin/redis@2.0.0": "fermyon:spin/redis@2.0.0",
        "fermyon:spin/key-value@2.0.0": "fermyon:spin/key-value@2.0.0",
        "fermyon:spin/sqlite@2.0.0": "fermyon:spin/sqlite@2.0.0",
        "fermyon:spin/postgres@2.0.0": "fermyon:spin/postgres@2.0.0",
        "fermyon:spin/mysql@2.0.0": "fermyon:spin/mysql@2.0.0",
        "fermyon:spin/mqtt@2.0.0": "fermyon:spin/mqtt@2.0.0"
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        module: true,
        library: {
            type: "module",
        }
    },
    plugins: [
        new WasiExtPlugin()
    ],
    optimization: {
        minimize: false
    },
};