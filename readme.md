# `js-wasi-ext`

This is a library compatible with WASI 0.2 that makes select Node.js APIs available in
[ComponentizeJS](https://github.com/bytecodealliance/componentizeJS/) and
[StarlingMonkey](https://github.com/bytecodealliance/starlingmonkey).

## Usage

This library currently requires Webpack to define aliases for imports:

```js
    alias: {
        'process': 'wasi-ext/lib/process',
    },
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

* `process`: `process.env`


