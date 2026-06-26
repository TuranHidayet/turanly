import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/ProjectGallery";
import projects from "@/data/projects.json";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const descriptionKey = `description_${lang}`;

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-main">
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-bold">{dict.work.title}</h1>
            <p className="text-zinc-500 dark:text-zinc-400">{dict.work.subtitle}</p>
          </div>

          <ProjectGallery
            projects={projects}
            lang={lang}
            dict={dict}
            descriptionKey={descriptionKey}
          />
        </div>
      </section>
    </div>
  );
}
