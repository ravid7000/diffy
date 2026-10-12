import forEach from "lodash/forEach.js";
import type { Plugin } from "vite-plus";
import { buildHeadTags } from "./build-head-tags.ts";
import { buildStaticFiles } from "./build-static-files.ts";
import type { SiteConfig } from "./types.ts";

export const seoPlugin = (config: SiteConfig): Plugin => ({
  name: "diffy-seo",
  transformIndexHtml: (html) => html.replace("<!--seo-head-->", buildHeadTags(config)),
  generateBundle() {
    forEach(buildStaticFiles(config), (source, fileName) =>
      this.emitFile({ type: "asset", fileName, source }),
    );
  },
});
