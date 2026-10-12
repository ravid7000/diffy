import dayjs from "dayjs";
import { SITE_DESCRIPTION, SITE_NAME, THEME_COLOR } from "./constants.ts";
import { siteUrl } from "./site-url.ts";
import type { SiteConfig } from "./types.ts";

const robots = (config: SiteConfig) =>
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl(config, "sitemap.xml")}\n`;

const sitemap = (config: SiteConfig) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl(config)}</loc>
    <lastmod>${dayjs().format("YYYY-MM-DD")}</lastmod>
  </url>
</urlset>
`;

const manifest = (config: SiteConfig) =>
  JSON.stringify(
    {
      name: SITE_NAME,
      short_name: SITE_NAME,
      description: SITE_DESCRIPTION,
      start_url: config.basePath,
      scope: config.basePath,
      display: "standalone",
      background_color: THEME_COLOR,
      theme_color: THEME_COLOR,
      icons: [{ src: "favicon.svg", sizes: "any", type: "image/svg+xml" }],
    },
    null,
    2,
  );

export const buildStaticFiles = (config: SiteConfig) => ({
  "robots.txt": robots(config),
  "sitemap.xml": sitemap(config),
  "manifest.webmanifest": manifest(config),
});
