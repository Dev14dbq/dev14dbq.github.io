"use client";

import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    window.location.replace("/ru");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <a href="/ru" className="font-mono text-sm text-muted hover:text-foreground">
        Перейти на сайт →
      </a>
    </main>
  );
}
