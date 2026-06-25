"use client";

import { useEffect } from "react";
import { resolveHomeLocale } from "@/lib/locale";

export default function RootPage() {
  useEffect(() => {
    resolveHomeLocale().then((locale) => {
      window.location.replace(`/${locale}`);
    });
  }, []);

  return null;
}
