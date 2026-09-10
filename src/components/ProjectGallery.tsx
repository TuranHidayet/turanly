"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import type { Dictionary } from "@/lib/i18n";
import type { DescriptionKey, Project } from "@/types/project";

interface ProjectGalleryProps {
  projects: Project[];
  lang: string;
  dict: Dictionary;
  descriptionKey: DescriptionKey;
}

export function ProjectGallery({ projects, lang, dict, descriptionKey }: ProjectGalleryProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelected(project)}
            className="cursor-pointer rounded-2xl"
          >
            <ProjectCard
              title={project.title}
              description={project[descriptionKey]}
              tags={project.tags}
              images={project.images}
              url={project.url}
              github={project.github}
              liveDemo={dict.work.live_demo}
              sourceCode={dict.work.source_code}
              aspectRatio={project.aspectRatio}
            />
          </div>
        ))}
      </div>

      {selected && (
        <ProjectModal
          project={selected}
          lang={lang}
          dict={dict}
          descriptionKey={descriptionKey}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
