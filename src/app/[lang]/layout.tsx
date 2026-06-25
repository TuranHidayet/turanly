import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Navbar dict={dict} lang={lang as Locale} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict} lang={lang as Locale} />
    </>
  );
}
