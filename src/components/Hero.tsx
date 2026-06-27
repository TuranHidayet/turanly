import { type Locale, type Dictionary } from "@/lib/i18n";
import Link from "next/link";
import { HeroBackground } from "./HeroBackground";

interface HeroProps {
  dict: Dictionary;
  lang: Locale;
}

export function Hero({ dict, lang }: HeroProps) {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4">
      <HeroBackground />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-medium tracking-widest uppercase text-primary">
          {dict.hero.subtitle}
        </p>

        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
          <span className="gradient-text">{dict.hero.title}</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {dict.hero.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href={`/${lang}/work`} className="btn-primary">
            {dict.hero.cta_work}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link href={`/${lang}/contact`} className="btn-outline">
            {dict.hero.cta_contact}
          </Link>
        </div>
      </div>
    </section>
  );
}
