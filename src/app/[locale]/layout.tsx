import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocaleHtmlLang from "@/components/LocaleHtmlLang";
import GridOverlay from "@/components/GridOverlay";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");
  const ogLocale = locale === "ru" ? "ru_RU" : "en_US";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      locale: ogLocale,
      siteName: "Softfoxxy",
      images: [
        {
          url: "/photo.jpg",
          width: 1200,
          height: 630,
          alt: "Softfoxxy — Full-Stack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/photo.jpg"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ru" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="relative min-h-screen flex flex-col">
        <LocaleHtmlLang locale={locale} />
        <GridOverlay />
        <Header />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
