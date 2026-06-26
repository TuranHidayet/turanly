import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  lang: string;
  readMore: string;
  image?: string;
}

export function BlogCard({ title, description, date, slug, lang, readMore, image }: BlogCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800">
      {image && (
        <Link href={`/${lang}/blog/${slug}`} className="overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 text-xs font-medium text-zinc-400">{date}</div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
        <Link
          href={`/${lang}/blog/${slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
        >
          {readMore}
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
