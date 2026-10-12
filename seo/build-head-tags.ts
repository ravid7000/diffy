import escape from "lodash/escape.js";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  THEME_COLOR,
} from "./constants.ts";
import { siteUrl } from "./site-url.ts";
import type { SiteConfig } from "./types.ts";

const meta = (key: "name" | "property", id: string, content: string) =>
  `<meta ${key}="${id}" content="${escape(content)}" />`;

const jsonLd = (config: SiteConfig) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: siteUrl(config),
    description: SITE_DESCRIPTION,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  }).replaceAll("<", "\\u003c");

export const buildHeadTags = (config: SiteConfig) => {
  const url = siteUrl(config);
  return [
    `<title>${escape(SITE_TITLE)}</title>`,
    meta("name", "description", SITE_DESCRIPTION),
    meta("name", "keywords", SITE_KEYWORDS),
    meta("name", "robots", "index, follow, max-image-preview:large"),
    meta("name", "theme-color", THEME_COLOR),
    meta("name", "color-scheme", "light dark"),
    meta("name", "application-name", SITE_NAME),
    `<link rel="canonical" href="${url}" />`,
    `<link rel="manifest" href="${siteUrl(config, "manifest.webmanifest")}" />`,
    meta("property", "og:type", "website"),
    meta("property", "og:site_name", SITE_NAME),
    meta("property", "og:title", SITE_TITLE),
    meta("property", "og:description", SITE_DESCRIPTION),
    meta("property", "og:url", url),
    meta("property", "og:locale", "en_US"),
    meta("name", "twitter:card", "summary"),
    meta("name", "twitter:title", SITE_TITLE),
    meta("name", "twitter:description", SITE_DESCRIPTION),
    `<script type="application/ld+json">${jsonLd(config)}</script>`,
  ].join("\n    ");
};
