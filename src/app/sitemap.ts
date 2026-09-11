import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

const staticPages = ["", "/about", "/work", "/blog", "/services", "/contact"];

const blogSlugs = [
  "why-need-website",
  "planning-website-project",
  "successful-website-features",
];

const serviceSlugs = [
  "websites",
  "applications",
  "design",
  "support",
  "seo",
  "ecommerce",
  "data-analytics",
];

const pages = [
  ...staticPages,
  ...blogSlugs.map((slug) => `/blog/${slug}`),
  ...serviceSlugs.map((slug) => `/services/${slug}`),
];

function languageAlternates(page: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${SITE_URL}/${locale}${page}`;
  }
  return languages;
}

function priorityFor(page: string): number {
  if (page === "") return 1.0;
  if (page.includes("/blog/") || page.includes("/services/")) return 0.7;
  return 0.8;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: priorityFor(page),
        alternates: { languages: languageAlternates(page) },
      });
    }
  }

  return entries;
}
