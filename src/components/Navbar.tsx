"use client";

import { type Locale, type Dictionary } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  dict: Dictionary;
  lang: Locale;
}

export function Navbar({ dict, lang }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

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

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher currentLang={lang} />
          <ThemeToggle />
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-1 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6 text-zinc-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed inset-0 z-50 overflow-y-auto bg-white px-4 pb-6 pt-16 dark:bg-zinc-950 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <LanguageSwitcher currentLang={lang} />
            <ThemeToggle />
          </div>
          </div>
        </>
      )}
    </header>
  );
}
