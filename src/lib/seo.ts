import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";

export const SITE_URL = "https://turanly.com";

const OG_LOCALE: Record<Locale, string> = {
  az: "az_AZ",
  en: "en_US",
  ru: "ru_RU",
};

function buildLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }
  languages["x-default"] = `${SITE_URL}/${locales[0]}${path}`;
  return languages;
}

export function buildMetadata({
  lang,
  path,
  title,
  description,
  image,
}: {
  lang: Locale;
  /** Locale-less path, e.g. "" | "/about" | "/blog/my-post" */
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const canonical = `${SITE_URL}/${lang}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Turanly.com",
      locale: OG_LOCALE[lang],
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
