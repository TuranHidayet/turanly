import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  lang: string;
  readMore: string;
}

export function BlogCard({ title, description, date, slug, lang, readMore }: BlogCardProps) {
  return (
    <article className="card group">
      <div className="mb-3 text-xs font-medium text-zinc-400">{date}</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      <Link
        href={`/${lang}/blog/${slug}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:gap-2"
      >
        {readMore}
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </article>
  );
}
