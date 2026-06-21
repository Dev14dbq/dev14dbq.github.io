import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import MarqueeTech from "@/components/MarqueeTech";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <MarqueeTech />
      <Services />
      <Process />
      <Work />
      <About />
      <Contact />
    </>
  );
}
