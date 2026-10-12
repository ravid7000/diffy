import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT_PLACEHOLDER } from "../seo/index.ts";
import { createMemoryStorage } from "./create-memory-storage.ts";

const root = path.resolve(import.meta.dirname, "..");
const htmlPath = path.join(root, "dist/index.html");
const serverDir = path.join(root, "dist-ssr");

Object.assign(globalThis, { window: globalThis, localStorage: createMemoryStorage() });

const { render } = (await import(pathToFileURL(path.join(serverDir, "entry-server.js")).href)) as {
  render: () => string;
};
const html = await readFile(htmlPath, "utf8");

if (!html.includes(ROOT_PLACEHOLDER))
  throw new Error("Root placeholder missing in dist/index.html");

await writeFile(htmlPath, html.replace(ROOT_PLACEHOLDER, `<div id="root">${render()}</div>`));
await rm(serverDir, { recursive: true, force: true });
