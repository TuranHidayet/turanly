export type Locale = "az" | "en" | "ru";

const messages = {
  az: () => import("@/messages/az.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default),
  ru: () => import("@/messages/ru.json").then((m) => m.default),
};

export const locales: Locale[] = ["az", "en", "ru"];
export const defaultLocale: Locale = "az";

export const hasLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale);

export const getDictionary = async (locale: Locale) => messages[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
