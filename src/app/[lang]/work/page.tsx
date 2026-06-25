"use client";

import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { useState, useEffect, use } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import projects from "@/data/projects.json";

export default function WorkPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const [activeFilter, setActiveFilter] = useState("all");
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    if (!hasLocale(lang)) notFound();
    getDictionary(lang as Locale).then(setDict);
  }, [lang]);

  if (!dict) return null;

  const categories = [
    { key: "all", label: dict.work.all },
    { key: "frontend", label: dict.work.frontend },
    { key: "fullstack", label: dict.work.fullstack },
    { key: "uiux", label: dict.work.uiux },
  ];

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const descriptionKey = `description_${lang}` as keyof typeof projects[0];

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-main">
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-bold">{dict.work.title}</h1>
            <p className="text-zinc-500 dark:text-zinc-400">{dict.work.subtitle}</p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeFilter === cat.key
                    ? "bg-primary text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={String(project[descriptionKey])}
                tags={project.tags}
                image={project.image}
                url={project.url}
                github={project.github}
                liveDemo={dict.work.live_demo}
                sourceCode={dict.work.source_code}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
