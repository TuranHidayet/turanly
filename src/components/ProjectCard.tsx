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

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            {liveDemo}
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
