import { getDictionary, hasLocale, getFullName, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return locales.flatMap((lang) => [
    { lang, slug: "getting-started-nextjs" },
  ]);
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

  return (
    <div className="pt-24">
      <article className="section-padding">
        <div className="container-main">
          <div className="mx-auto max-w-2xl">
            <Link
              href={`/${lang}/blog`}
              className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {dict.blog.back}
            </Link>

            <h1 className="mb-4 text-4xl font-bold">{post.body_title}</h1>
            <p className="mb-8 text-sm text-zinc-400">{post.date}</p>

            <div className="prose prose-zinc max-w-none dark:prose-invert">
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
          </div>
        </div>
      </article>
    </div>
  );
}
