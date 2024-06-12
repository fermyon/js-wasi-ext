import fs from "fs";
import { setupExt } from "../../../src";
import process from "process"

//@ts-ignore
addEventListener('fetch', (event: FetchEvent) => {
    handleEvent(event)
});

async function handleEvent(event: FetchEvent) {
    setupExt()
    let resolve: any, reject: any;
    let responsePromise = new Promise(async (res, rej) => {
        resolve = res;
        reject = rej;
    });
    //@ts-ignore
    event.respondWith(responsePromise);

    let pathInfo = event.request.headers.get("spin-path-info")

    try {

        let response: string = ""
        switch (pathInfo) {
            case "/health":
                resolve(new Response())
                return
            case "/testEnvVars":
                response = testEnvVars()
                break
            case "/testReadFile":
                response = testReadFile()
                break
            default:
                resolve(new Response(null, { status: 404 }))
                return
        }
        resolve(new Response(response))
    } catch (e: any) {
        resolve(new Response(e.message, { status: 500 }))
    }
}

function testEnvVars() {
    return JSON.stringify(process.env)
}

function testReadFile() {
    return fs.readFileSync("./test.txt").toString("utf-8")
}

// Keep wizer happy during pre-init. Should go away
// oncehttps://github.com/bytecodealliance/ComponentizeJS/issues/114 is resolved
export const incomingHandler = {
    handle() { }
}