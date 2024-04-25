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

> Note: this currently does not support the `node:process` syntaxt yet.

Then, in content:

```js
import process from "process";

...
console.log(process.env["PET"]);
```

## Supported APIs

* `process`: `process.env`


