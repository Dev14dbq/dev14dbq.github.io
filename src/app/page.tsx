"use client";

import { useEffect, useState } from "react";
import { resolveHomeLocale } from "@/lib/locale";

export default function RootPage() {
  const [target, setTarget] = useState<"ru" | "en" | null>(null);

  useEffect(() => {
    let cancelled = false;

    resolveHomeLocale().then((locale) => {
      if (cancelled) return;
      setTarget(locale);
      window.location.replace(`/${locale}`);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center gap-4">
      <a
        href="/ru"
        className={`font-mono text-sm transition-colors ${
          target === "ru" ? "text-accent" : "text-muted hover:text-foreground"
        }`}
      >
        RU
      </a>
      <span className="text-muted-40">·</span>
      <a
        href="/en"
        className={`font-mono text-sm transition-colors ${
          target === "en" ? "text-accent" : "text-muted hover:text-foreground"
        }`}
      >
        EN
      </a>
    </main>
  );
}
