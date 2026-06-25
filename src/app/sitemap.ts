import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://turanly.com";

  const locales = ["az", "en", "ru"];
  const pages = ["", "/about", "/work", "/blog", "/blog/getting-started-nextjs", "/contact"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
