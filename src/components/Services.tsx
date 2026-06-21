"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FiCode,
  FiSmartphone,
  FiCpu,
  FiPenTool,
  FiDatabase,
  FiCloud,
} from "react-icons/fi";
import HRule from "./HRule";

const services: Array<{ key: string; icon: IconType }> = [
  { key: "web", icon: FiCode },
  { key: "mobile", icon: FiSmartphone },
  { key: "bots", icon: FiCpu },
  { key: "design", icon: FiPenTool },
  { key: "backend", icon: FiDatabase },
  { key: "devops", icon: FiCloud },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  const t = useTranslations("services");
  const lineGapClass = "pt-0 pb-0";
  const blockGapClass = "h-6 md:h-8";
  const railLabelInset =
    "calc(max(calc(50% - 36rem), var(--content-px)) - var(--rail-content-offset) - var(--rail-gap) - var(--rail-label-outset))";

  return (
    <section id="services" className="section-padding relative z-0">
      <div className="container-wide">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-screen -translate-x-1/2 lg:block"
          >
            <span
              className="absolute top-1/2 font-mono text-xs uppercase tracking-widest text-accent"
              style={{
                left: railLabelInset,
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "translateY(-50%) rotate(180deg)",
              }}
            >
              {t("label")}
            </span>
          </div>
          <HRule />
          <div className={lineGapClass}>
            <h2 className="text-4xl font-bold text-foreground">{t("title")}</h2>
          </div>
          <HRule />
          <div aria-hidden className={blockGapClass} />

          <HRule />
          <div className={lineGapClass}>
            <p className="text-muted text-lg max-w-2xl">{t("subtitle")}</p>
          </div>
          <HRule />
        </div>

        <div aria-hidden className="h-[var(--rail-content-offset)] py-10" />
        {/* Services cards */}
        <div className="relative z-10">
          <HRule />
        <div className="relative -mx-[var(--rail-content-offset)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 px-[var(--rail-content-offset)]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(237,170,196,0.14) 0 1.5px, transparent 1.5px 7px)",
            }}
          />
          <div className="relative z-10 px-[var(--rail-content-offset)] py-[var(--rail-content-offset)]">
            <motion.div
              className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            >
              {services.map(({ key, icon: Icon }) => (
                <motion.div
                  key={key}
                  variants={fadeUp}
                  className="card-base relative z-10 flex min-h-[200px] flex-col justify-between"
                  style={{ backgroundColor: 'var(--background)' }}
                >
                  <div className="relative z-10">
                    <Icon className="mb-4 text-3xl text-accent" aria-hidden />
                    <h3 className="mb-2 text-xl font-bold">{t(`items.${key}.title`)}</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        <HRule />
        </div>
      </div>
    </section>
  );
}
