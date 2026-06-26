import { getDictionary, hasLocale, getFullName, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { TimelineItem } from "@/components/Timeline";
import { SkillBadge } from "@/components/SkillBadge";
import experience from "@/data/experience.json";
import skills from "@/data/skills.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: `${dict.about.title} | ${getFullName(lang as Locale)}` };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const roleKey = `role_${lang}` as keyof (typeof experience)[0];
  const descKey = `description_${lang}` as keyof (typeof experience)[0];

  const workExperience = experience.filter((e) => e.type === "fulltime" || e.type === "freelance");
  const education = experience.filter((e) => e.type === "education");

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-main">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold">{dict.about.title}</h1>
            <p className="mb-12 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {dict.about.bio}
            </p>

            <h2 className="mb-6 text-2xl font-bold">{dict.about.experience}</h2>
            <div className="mb-16">
              {workExperience.map((exp) => (
                <TimelineItem
                  key={exp.id}
                  role={String(exp[roleKey])}
                  company={exp.company}
                  period={`${exp.startDate} - ${exp.endDate || "Present"}`}
                  description={String(exp[descKey])}
                  location={exp.location}
                />
              ))}
            </div>

            <h2 className="mb-6 text-2xl font-bold">{dict.about.education}</h2>
            <div className="mb-16">
              {education.map((exp) => (
                <TimelineItem
                  key={exp.id}
                  role={String(exp[roleKey])}
                  company={exp.company}
                  period={`${exp.startDate} - ${exp.endDate || "Present"}`}
                  description={String(exp[descKey])}
                  location={exp.location}
                />
              ))}
            </div>

            <h2 className="mb-6 text-2xl font-bold">{dict.about.skills}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
