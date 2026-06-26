import Link from "next/link";
import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { BlogCard } from "@/components/BlogCard";
import { ContactForm } from "@/components/ContactForm";
import projects from "@/data/projects.json";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const posts = Object.entries(dict.blog.posts).map(([slug, post]: [string, any]) => ({
    slug,
    title: post.title,
    description: post.description,
    date: post.date,
    image: post.image,
  }));

  return (
    <>
      <Hero dict={dict} lang={lang as Locale} />

      <section className="section-padding bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="container-main">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">{dict.work.subtitle}</h2>
            <p className="text-zinc-500 dark:text-zinc-400">{dict.work.title}</p>
          </div>

          <ProjectCarousel projects={projects} lang={lang} dict={dict} />

          <div className="mt-10 text-center">
            <Link
              href={`/${lang}/work`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              {dict.work.view_all}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">{dict.blog.title}</h2>
            <p className="text-zinc-500 dark:text-zinc-400">{dict.blog.subtitle}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                image={post.image}
                slug={post.slug}
                lang={lang}
                readMore={dict.blog.read_more}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {dict.blog.view_all}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="container-main">
          <div className="mx-auto max-w-2xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold">{dict.contact.title}</h2>
              <p className="text-zinc-500 dark:text-zinc-400">{dict.contact.subtitle}</p>
            </div>
            <ContactForm dict={dict} />
          </div>
        </div>
      </section>
    </>
  );
}
