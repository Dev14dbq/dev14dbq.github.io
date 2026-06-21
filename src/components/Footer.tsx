import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-card-border px-6 py-8 md:px-10 lg:px-16">
      <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base font-bold">
            Soft<span className="gradient-text">foxxy</span>
          </span>
          <span className="text-muted text-sm">
            © {year} · {t("rights")}
          </span>
        </div>
        <p className="text-muted text-sm font-mono">{t("built")}</p>
      </div>
    </footer>
  );
}
