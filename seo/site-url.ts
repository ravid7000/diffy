import type { SiteConfig } from "./types.ts";

export const siteUrl = ({ origin, basePath }: SiteConfig, file = "") =>
  `${origin}${basePath}${file}`;
