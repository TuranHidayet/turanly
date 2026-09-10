import { getDictionary, hasLocale, getFullName, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const WORDS_PER_MINUTE = 200;

function estimateReadingMinutes(...text: string[]): number {
  const wordCount = text.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

const allSlugs = ["why-need-website", "planning-website-project", "successful-website-features"];

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    allSlugs.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  const post = dict.blog.posts[slug as keyof typeof dict.blog.posts];
  return {
    title: post ? `${post.title} | ${getFullName(lang as Locale)}` : "Blog",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const post = dict.blog.posts[slug as keyof typeof dict.blog.posts];

  if (!post) notFound();

  const readingMinutes = estimateReadingMinutes(
    post.paragraph1,
    post.why_desc,
    post.start_desc,
    post.conclusion_desc,
  );

  return (
    <div className="pt-24">
      <article className="pb-20 md:pb-28">
        <div className="container-main">
          <div className="mx-auto max-w-2xl">
            <Link
              href={`/${lang}/blog`}
              className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {dict.blog.back}
            </Link>

            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{post.body_title}</h1>

            <div className="mb-8 flex items-center gap-3 text-sm text-zinc-400">
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <span>{readingMinutes} {dict.blog.min_read}</span>
            </div>

            {post.image && (
              <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl shadow-sm">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-p:leading-relaxed prose-p:first:text-xl prose-p:first:font-medium prose-p:first:text-zinc-700 dark:prose-p:first:text-zinc-300 prose-pre:rounded-xl">
              <p>{post.paragraph1}</p>

              <h2>{post.why_title}</h2>
              <p>{post.why_desc}</p>
              <ul>
                {post.features.map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              <h2>{post.start_title}</h2>
              <p>{post.start_desc}</p>
              <pre><code>{post.code}</code></pre>

              <h2>{post.conclusion_title}</h2>
              <p>{post.conclusion_desc}</p>
            </div>

            <div className="mt-14 rounded-2xl bg-primary/5 p-8 text-center dark:bg-primary/10">
              <h3 className="mb-2 text-lg font-semibold">{dict.blog.cta_title}</h3>
              <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-400">{dict.blog.cta_desc}</p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                {dict.nav.contact}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
