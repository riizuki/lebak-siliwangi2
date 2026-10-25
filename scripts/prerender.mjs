// Tulis HTML hasil render React ke dist/index.html dan dist/galeri.html supaya teks
// halaman langsung tampil tanpa menunggu JavaScript (mempercepat FCP/LCP).
import { readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const { render } = await import(pathToFileURL(path.resolve('.ssr/entry-server.js')).href);
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const inject = (html) => template.replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);

await writeFile(path.join(dist, 'index.html'), inject(render(false)));
await writeFile(path.join(dist, 'galeri.html'), inject(render(true)));
await rm(path.resolve('.ssr'), { recursive: true, force: true });
