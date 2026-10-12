import path from "node:path";

export const PROJECT_DIRECTORY = path.resolve(import.meta.dirname, "../..");
export const BUILD_DIRECTORY = path.join(PROJECT_DIRECTORY, "dist");
export const WORKER_ASSETS_DIRECTORY = path.join(PROJECT_DIRECTORY, "dist-worker");
export const DIFFY_ASSETS_DIRECTORY = path.join(WORKER_ASSETS_DIRECTORY, "diffy");
