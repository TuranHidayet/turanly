import { Locale, locales } from "@/lib/i18n";
import Link from "next/link";

export function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const labels: Record<Locale, string> = { az: "AZ", en: "EN", ru: "RU" };

  return (
    <div className="flex items-center gap-1">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}`}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
            locale === currentLang
              ? "bg-primary text-white"
              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          }`}
        >
          {labels[locale]}
        </Link>
      ))}
    </div>
  );
}
