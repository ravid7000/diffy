import { describe, expect, it } from "vite-plus/test";
import { buildHeadTags } from "./build-head-tags.ts";
import { buildStaticFiles } from "./build-static-files.ts";
import { normalizeBasePath } from "./normalize-base-path.ts";

const config = { origin: "https://ravid.dev", basePath: "/diffy/" };

describe("normalizeBasePath", () => {
  it.each([
    ["/", "/"],
    ["", "/"],
    ["diffy", "/diffy/"],
    ["/diffy", "/diffy/"],
    ["/diffy/", "/diffy/"],
  ])("normalizes %j to %j", (input, expected) => {
    expect(normalizeBasePath(input)).toBe(expected);
  });
});

describe("buildHeadTags", () => {
  const tags = buildHeadTags(config);

  it("points canonical and og:url at the base path", () => {
    expect(tags).toContain('<link rel="canonical" href="https://ravid.dev/diffy/" />');
    expect(tags).toContain('content="https://ravid.dev/diffy/"');
  });

  it("embeds valid WebApplication JSON-LD", () => {
    const json = tags.match(/ld\+json">(.*)<\/script>/)?.[1] ?? "";
    expect(JSON.parse(json)).toMatchObject({ "@type": "WebApplication" });
  });

  it("escapes attribute content", () => {
    expect(tags).toContain("Diffy - Online Diff Checker &amp; Text Compare Tool");
  });
});

describe("buildStaticFiles", () => {
  const files = buildStaticFiles(config);

  it("links robots to the sitemap", () => {
    expect(files["robots.txt"]).toContain("Sitemap: https://ravid.dev/diffy/sitemap.xml");
  });

  it("lists the site url in the sitemap", () => {
    expect(files["sitemap.xml"]).toContain("<loc>https://ravid.dev/diffy/</loc>");
  });

  it("scopes the manifest to the base path", () => {
    expect(JSON.parse(files["manifest.webmanifest"])).toMatchObject({ start_url: "/diffy/" });
  });
});
