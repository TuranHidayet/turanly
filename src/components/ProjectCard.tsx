interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  url?: string;
  github?: string;
  liveDemo?: string;
  sourceCode?: string;
}

export function ProjectCard({ title, description, tags, image, url, github, liveDemo, sourceCode }: ProjectCardProps) {
  return (
    <div className="card group overflow-hidden">
      <div className="mb-4 aspect-video overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <div className="flex h-full items-center justify-center text-zinc-300 dark:text-zinc-600">
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
        </div>
      </div>

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
  );
}
