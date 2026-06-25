import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";
import projects from "@/data/projects.json";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const featuredProjects = projects.filter((p) => p.featured);
  const descriptionKey = `description_${lang}` as keyof typeof projects[0];
  const posts = dict.blog.posts;
  const firstPost = Object.entries(posts)[0];

  return (
    <>
      <Hero dict={dict} lang={lang as Locale} />

      <section className="section-padding bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="container-main">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">{dict.work.subtitle}</h2>
            <p className="text-zinc-500 dark:text-zinc-400">{dict.work.title}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={String(project[descriptionKey])}
                tags={project.tags}
                images={project.images}
                url={project.url}
                github={project.github}
                liveDemo={dict.work.live_demo}
                sourceCode={dict.work.source_code}
                aspectRatio={project.aspectRatio}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">{dict.blog.title}</h2>
            <p className="text-zinc-500 dark:text-zinc-400">{dict.blog.subtitle}</p>
          </div>

          <div className="mx-auto max-w-2xl">
            {firstPost && (
              <BlogCard
                title={firstPost[1].title}
                description={firstPost[1].description}
                date={firstPost[1].date}
                slug={firstPost[0]}
                lang={lang}
                readMore={dict.blog.read_more}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
