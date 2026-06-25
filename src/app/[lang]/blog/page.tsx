import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: `${dict.blog.title} | Turan Hidayetov` };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const posts = Object.entries(dict.blog.posts).map(([slug, post]) => ({
    slug,
    title: post.title,
    description: post.description,
    date: post.date,
  }));

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-main">
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-bold">{dict.blog.title}</h1>
            <p className="text-zinc-500 dark:text-zinc-400">{dict.blog.subtitle}</p>
          </div>

          <div className="mx-auto max-w-2xl space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  {...post}
                  lang={lang}
                  readMore={dict.blog.read_more}
                />
              ))
            ) : (
              <p className="text-center text-zinc-500">{dict.blog.no_posts}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
