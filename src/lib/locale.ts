export type AppLocale = "ru" | "en";

const PREFERENCE_KEY = "portfolio-locale";
const CIS_COUNTRIES = new Set(["RU", "BY", "UA"]);

export function getSavedLocale(): AppLocale | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(PREFERENCE_KEY);
    if (stored === "ru" || stored === "en") return stored;
  } catch {
    // localStorage may be blocked in private mode
  }

  const match = document.cookie.match(/(?:^|;\s*)portfolio-locale=(ru|en)(?:;|$)/);
  return match?.[1] === "ru" || match?.[1] === "en" ? match[1] : null;
}

export function saveLocalePreference(locale: AppLocale) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(PREFERENCE_KEY, locale);
  } catch {
    // ignore
  }

  document.cookie = `portfolio-locale=${locale};path=/;max-age=31536000;samesite=lax`;
}

function detectFromBrowserLanguage(): AppLocale {
  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const language of languages) {
    const code = language.toLowerCase();
    if (code.startsWith("ru") || code.startsWith("uk") || code.startsWith("be")) {
      return "ru";
    }
  }

  return "en";
}

async function detectFromGeo(): Promise<AppLocale> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch("https://ipwho.is/", {
      signal: controller.signal,
    });

    if (!response.ok) throw new Error("geo lookup failed");

    const data = (await response.json()) as { country_code?: string };
    const country = data.country_code?.toUpperCase();

    if (country && CIS_COUNTRIES.has(country)) return "ru";
    return "en";
  } finally {
    clearTimeout(timeout);
  }
}

export async function resolveHomeLocale(): Promise<AppLocale> {
  const saved = getSavedLocale();
  if (saved) return saved;

  try {
    return await detectFromGeo();
  } catch {
    return detectFromBrowserLanguage();
  }
}
