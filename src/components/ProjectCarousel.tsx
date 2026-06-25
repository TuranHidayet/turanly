"use client";

import { useState, useEffect, useCallback } from "react";
import { ProjectCard } from "./ProjectCard";

interface Project {
  id: number;
  title: string;
  description_az: string;
  description_en: string;
  description_ru: string;
  images: string[];
  tags: string[];
  url: string;
  github: string;
  featured: boolean;
  aspectRatio: string;
  category: string;
}

interface ProjectCarouselProps {
  projects: Project[];
  lang: string;
  dict: any;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function ProjectCarousel({ projects, lang, dict }: ProjectCarouselProps) {
  const pages = chunk(projects, 3);
  const [page, setPage] = useState(0);

  const next = useCallback(() => {
    setPage((prev) => (prev + 1) % pages.length);
  }, [pages.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const descriptionKey = `description_${lang}` as keyof typeof projects[0];

  return (
    <div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((group, i) => (
            <div key={i} className="grid min-w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={String(project[descriptionKey])}
                  tags={project.tags}
                  images={project.images}
                  url={project.url}
                  github={project.github}
                  liveDemo={dict.work.live_demo}
                  sourceCode={dict.work.source_code}
                  aspectRatio={project.aspectRatio}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {pages.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all ${
                i === page ? "w-6 bg-primary" : "w-2 bg-zinc-300 dark:bg-zinc-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
