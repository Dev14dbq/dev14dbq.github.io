"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#process",  label: t("process") },
    { href: "#work",     label: t("work") },
    { href: "#about",    label: t("about") },
    { href: "#contact",  label: t("contact") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background border-b border-card-border">
      <div className="container-wide flex items-center justify-between h-16 px-6 md:px-10 lg:px-16">
        {/* Logo */}
        <Link href="/" className="font-mono text-lg font-bold tracking-tight">
          Soft<span className="gradient-text">foxxy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a
            href="#contact"
            className="hidden md:inline-flex items-center rounded-full bg-accent text-[#08050a] px-4 py-2 text-sm font-semibold hover:shadow-[0_0_32px_rgba(237,170,196,0.4)] transition-shadow"
          >
            {t("cta")}
          </a>

          {/* Mobile hamburger → ✕ */}
          <button
            className="md:hidden p-1 text-muted hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-current transition-transform duration-300 origin-center ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-current my-1.5 transition-all duration-300 origin-center ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-transform duration-300 origin-center ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu — slide down */}
      <div
        className={`md:hidden glass border-t border-card-border overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 pb-6 pt-4">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-full bg-accent text-[#08050a] px-4 py-2 text-sm font-semibold"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
