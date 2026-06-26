"use client";

import { Locale, locales } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const labels: Record<Locale, string> = { az: "AZ", en: "EN", ru: "RU" };

  function switchHref(locale: Locale): string {
    const parts = pathname.split("/");
    if (parts.length > 1 && (parts[1] === "az" || parts[1] === "en" || parts[1] === "ru")) {
      parts[1] = locale;
    } else {
      parts.splice(1, 0, locale);
    }
    return parts.join("/") || "/";
  }

  function handleClick(e: React.MouseEvent, locale: Locale) {
    e.preventDefault();
    const scrollY = window.scrollY;
    history.scrollRestoration = "manual";
    sessionStorage.setItem("scrollY", String(scrollY));
    router.replace(switchHref(locale), { scroll: false });
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={(e) => handleClick(e, locale)}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
            locale === currentLang
              ? "bg-primary text-white"
              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          }`}
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  );
}
