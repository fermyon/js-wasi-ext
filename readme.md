# `js-wasi-ext`

This is a library compatible with WASI 0.2 that makes select Node.js APIs available in
[ComponentizeJS](https://github.com/bytecodealliance/componentizeJS/) and
[StarlingMonkey](https://github.com/bytecodealliance/starlingmonkey).

## Usage

This library currently requires Webpack and uses a plugin to define the fall backs.:

```js
import WasiExtPlugin from "@spinframework/wasi-ext/plugin/index.js";

export default config = () => {
    ...
    return {
        ...
        plugins: [
            new WasiExtPlugin()
        ],
        ...
    }
}

```

> Note: this currently does not support the `node:process` syntax yet.

Because accessing environment variables needs to happen at runtime (not during
pre-initialization), the actual environment variables can only be accessed from
the handler function. If accessed outside, that is not supported (and currently,
`process.env` returns an empty map; we can discuss what this behavior should be).

The library currently exports a `setupExt()` function that explicitly initializes
`process.env` from the handler. We could potentially remove that depending on the
desired experience of this library.

After setup:

```js
import process from "process";

...
console.log(process.env["PET"]);
```

## Supported APIs

* `process`: certain methods are no-ops and few throw exceptions. For detailed list refer to the [upstream library](https://github.com/defunctzombie/node-process/blob/master/browser.js). `process.env` is only populated when inside the handler function, when outside, it returns an empty object (i.e) `{}`
* `fs`: Limited to `readFileSync` and `readdirSync`


