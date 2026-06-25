import { ImageSlider } from "./ImageSlider";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  images: string[];
  url?: string;
  github?: string;
  liveDemo?: string;
  sourceCode?: string;
  aspectRatio?: string;
}

export function ProjectCard({ title, description, tags, images, url, github, liveDemo, sourceCode, aspectRatio }: ProjectCardProps) {
  return (
    <div className="card group overflow-hidden">
      <ImageSlider images={images} alt={title} aspectRatio={aspectRatio} />

      <div className="mt-4">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {url && liveDemo && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
              {liveDemo}
            </a>
          )}
          {github && sourceCode && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-500 hover:underline dark:text-zinc-400">
              {sourceCode}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
