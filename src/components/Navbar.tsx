import { type Locale, type Dictionary } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

interface NavbarProps {
  dict: Dictionary;
  lang: Locale;
}

export function Navbar({ dict, lang }: NavbarProps) {
  const navItems = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/work`, label: dict.nav.work },
    { href: `/${lang}/blog`, label: dict.nav.blog },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-zinc-200/50 bg-white/80 backdrop-blur-lg dark:border-zinc-800/50 dark:bg-zinc-950/80">
      <nav className="container-main flex h-16 items-center justify-between">
        <Link
          href={`/${lang}`}
          className="text-lg font-bold tracking-tight transition-colors hover:text-primary"
        >
          Turanly
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLang={lang} />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
