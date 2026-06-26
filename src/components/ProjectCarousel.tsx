"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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

function slidingWindows<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const window: T[] = [];
    for (let j = 0; j < size; j++) {
      window.push(arr[(i + j) % arr.length]);
    }
    result.push(window);
  }
  return result;
}

export function ProjectCarousel({ projects, lang, dict }: ProjectCarouselProps) {
  const windows = slidingWindows(projects, 1);
  const [page, setPage] = useState(0);
  const touchStartX = useRef(0);

  const next = useCallback(() => {
    setPage((prev) => (prev + 1) % windows.length);
  }, [windows.length]);

  const prev = useCallback(() => {
    setPage((prev) => (prev - 1 + windows.length) % windows.length);
  }, [windows.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  }, [next, prev]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const descriptionKey = `description_${lang}` as keyof typeof projects[0];

  return (
    <div className="relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {windows.map((group, i) => (
            <div key={i} className="w-full shrink-0">
              {group.map((project) => (
                <ProjectCard
                  key={`${i}-${project.id}`}
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

      {windows.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 -left-3 z-10 -translate-y-1/2 rounded-full bg-white p-2 text-zinc-600 shadow-lg transition-colors hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -right-3 z-10 -translate-y-1/2 rounded-full bg-white p-2 text-zinc-600 shadow-lg transition-colors hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {windows.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-2 rounded-full transition-all ${
                  i === page ? "w-6 bg-primary" : "w-2 bg-zinc-300 dark:bg-zinc-600"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
