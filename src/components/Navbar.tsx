import { type Locale, type Dictionary } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
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
        <Link href={`/${lang}`} className="rounded-lg border border-zinc-200 p-1 dark:border-zinc-700">
          <Image
            src="/images/turanly-logo-light.svg"
            alt="Turanly"
            width={100}
            height={28}
            className="h-7 w-auto dark:hidden"
            priority
          />
          <Image
            src="/images/turanly-logo-dark.svg"
            alt="Turanly"
            width={100}
            height={28}
            className="h-7 w-auto hidden dark:block"
            priority
          />
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
