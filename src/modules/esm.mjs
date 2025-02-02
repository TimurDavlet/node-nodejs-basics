import path from 'path';
import { release, version } from 'os';
import http from 'http';
import './files/c.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const random = Math.random();

export let unknownObject;

if (random > 0.5) {
    unknownObject = import('./files/a.json', { assert: { type: "json" } }).then(data => data).catch(err => err);
} else {
    unknownObject = import('./files/b.json', { assert: { type: "json" } }).then(data => data).catch(err => err);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

export const myServer = http.createServer((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(await unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});
