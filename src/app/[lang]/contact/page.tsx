"use client";

import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { useState, type FormEvent, useEffect, use } from "react";
import profile from "@/data/profile.json";

export default function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const [dict, setDict] = useState<any>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (!hasLocale(lang)) notFound();
    getDictionary(lang as Locale).then(setDict);
  }, [lang]);

  if (!dict) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("success");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-main">
          <div className="mx-auto max-w-2xl">
            <div className="mb-12 text-center">
              <h1 className="mb-3 text-4xl font-bold">{dict.contact.title}</h1>
              <p className="text-zinc-500 dark:text-zinc-400">{dict.contact.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">{dict.contact.name}</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">{dict.contact.email}</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">{dict.contact.message}</label>
                <textarea
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center">
                {dict.contact.send}
              </button>

              {status === "success" && (
                <p className="text-center text-sm text-emerald-600 dark:text-emerald-400">
                  {dict.contact.success}
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-red-600 dark:text-red-400">
                  {dict.contact.error}
                </p>
              )}
            </form>

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
