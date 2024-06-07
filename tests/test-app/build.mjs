#!/usr/bin/env node

import { componentize } from "@bytecodealliance/componentize-js";
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, basename } from 'node:path';

const src = "dist/bundle.js";
const source = await readFile(src, 'utf8');
const { component, imports } = await componentize(source, {
    sourceName: basename(src),
    witPath: resolve("./wit"),
    worldName: 'spin-http',
});

await writeFile("target/wasi-ext-tests.wasm", component);
console.log("Successfully written component");