"use client";

import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { useState, useEffect, use } from "react";
import { ContactForm } from "@/components/ContactForm";
import profile from "@/data/profile.json";

export default function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    if (!hasLocale(lang)) notFound();
    getDictionary(lang as Locale).then(setDict);
  }, [lang]);

  if (!dict) return null;

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-main">
          <div className="mx-auto max-w-2xl">
            <div className="mb-12 text-center">
              <h1 className="mb-3 text-4xl font-bold">{dict.contact.title}</h1>
              <p className="text-zinc-500 dark:text-zinc-400">{dict.contact.subtitle}</p>
            </div>

            <ContactForm dict={dict} />

            <div className="mt-12 text-center">
              <p className="mb-4 text-sm text-zinc-400">{dict.contact.or}</p>
              <div className="flex justify-center gap-4">
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  GitHub
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  LinkedIn
                </a>
                <a href={profile.social.email} className="btn-outline">
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
