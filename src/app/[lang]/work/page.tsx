import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";
import projects from "@/data/projects.json";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const descriptionKey = `description_${lang}` as keyof typeof projects[0];

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-main">
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-bold">{dict.work.title}</h1>
            <p className="text-zinc-500 dark:text-zinc-400">{dict.work.subtitle}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
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
    </div>
  );
}
