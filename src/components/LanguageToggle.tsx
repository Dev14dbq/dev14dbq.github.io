"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { saveLocalePreference } from "@/lib/locale";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === "ru" ? "en" : "ru";
    saveLocalePreference(next);
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      onClick={toggle}
      className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors px-2 py-1"
      aria-label="Switch language"
    >
      {locale.toUpperCase()}
    </button>
  );
}
