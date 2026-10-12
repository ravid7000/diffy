import { cp, mkdir, rm } from "node:fs/promises";
import { BUILD_DIRECTORY, DIFFY_ASSETS_DIRECTORY, WORKER_ASSETS_DIRECTORY } from "./constants.ts";

await rm(WORKER_ASSETS_DIRECTORY, { recursive: true, force: true });
await mkdir(WORKER_ASSETS_DIRECTORY, { recursive: true });
await cp(BUILD_DIRECTORY, DIFFY_ASSETS_DIRECTORY, { recursive: true });
