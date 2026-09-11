import { getDictionary, hasLocale, getFullName, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { TimelineItem } from "@/components/Timeline";
import { SkillBadge } from "@/components/SkillBadge";
import experience from "@/data/experience.json";
import skills from "@/data/skills.json";
import profile from "@/data/profile.json";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return buildMetadata({
    lang: lang as Locale,
    path: "/about",
    title: `${dict.about.title} | ${getFullName(lang as Locale)}`,
    description: dict.about.meta_description,
  });
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
            <h1 className="mb-4 text-4xl font-bold">{dict.about.title}</h1>

            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {profile.location}
              </span>
              {profile.available && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {dict.about.available}
                </span>
              )}
            </div>

            <p className="mb-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {dict.about.bio}
            </p>

            <a
              href="/turan-hidayetov-cv.pdf"
              download
              className="btn-outline mb-12"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 12m0 0l4.5-4.5M12 12V3" />
              </svg>
              {dict.about.download_cv}
            </a>

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
            <div className="mb-16 grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </div>

            <h2 className="mb-6 text-2xl font-bold">{dict.about.languages}</h2>
            <div className="flex flex-wrap gap-3">
              {[dict.about.language_az, dict.about.language_en, dict.about.language_tr].map((language) => (
                <span
                  key={language}
                  className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium dark:border-zinc-800"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
