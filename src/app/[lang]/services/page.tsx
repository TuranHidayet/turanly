import { getDictionary, hasLocale, getFullName, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  LaptopMockup,
  PhoneMockup,
  DesignMockup,
  SupportMockup,
  SeoMockup,
  EcommerceMockup,
  DataAnalyticsMockup,
} from "@/components/AnimatedMockup";

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
  return { title: `${dict.services.title} | ${getFullName(lang as Locale)}` };
}

const serviceConfig: Record<
  string,
  { mockup: (props?: any) => React.ReactNode; images?: string[] }
> = {
  websites: {
    mockup: () => (
      <LaptopMockup
        images={[
          "/images/projects/mopsn.png",
          "/images/projects/ems.png",
          "/images/projects/mdtf.png",
          "/images/projects/bsc.png",
        ]}
      />
    ),
  },
  applications: {
    mockup: () => (
      <PhoneMockup
        images={[
          "/images/projects/agro-express.png",
          "/images/projects/rafconsulting.png",
          "/images/projects/orhundoor.png",
        ]}
      />
    ),
  },
  design: { mockup: () => <DesignMockup /> },
  support: { mockup: () => <SupportMockup /> },
  seo: { mockup: () => <SeoMockup /> },
  ecommerce: { mockup: () => <EcommerceMockup /> },
  "data-analytics": { mockup: () => <DataAnalyticsMockup /> },
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-main">
          <div className="mb-14 text-center">
            <h1 className="mb-3 text-4xl font-bold">{dict.services.title}</h1>
            <p className="text-zinc-500 dark:text-zinc-400">{dict.services.subtitle}</p>
          </div>

          <div className="space-y-20">
            {Object.entries(dict.services.items).map(
              ([key, service]: [string, any], idx) => {
                const config = serviceConfig[key];
                return (
                  <div
                    key={key}
                    id={`service-${key}`}
                    className={`flex flex-col items-center gap-8 md:flex-row ${
                      idx % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="flex-1 space-y-4">
                      <h2 className="text-2xl font-bold">{service.title}</h2>
                      <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {service.intro}
                      </p>
                      <Link
                        href={`/${lang}/services/${key}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        {lang === "az"
                          ? "Ətraflı Bax"
                          : lang === "ru"
                            ? "Узнать больше"
                            : "Learn More"}
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                    <div className="w-full max-w-md flex-1">
                      {config?.mockup()}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
