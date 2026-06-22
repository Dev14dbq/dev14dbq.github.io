"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import HRule from "./HRule";

const steps = ["discover", "plan", "build", "launch", "support"] as const;

export default function Process() {
  const t = useTranslations("process");
  const lineGapClass = "pt-0 pb-0";
  const blockGapClass = "h-6 md:h-8";
  const railLabelInset =
    "calc(max(calc(50% - 36rem), var(--content-px)) - var(--rail-content-offset) - var(--rail-gap) - var(--rail-label-outset))";

  return (
    <section id="process" className="section-padding bg-card-30">
      <div className="container-wide">
        {/* Heading */}
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

        {/* Steps */}
        <div className="relative z-10">
          <div aria-hidden className="h-6 md:h-8" />
          {steps.map((key, i) => (
            <motion.div key={key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <HRule />
              <div className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[3.5rem_1px_16rem_1px_1fr] items-stretch">
                {/* Number */}
                <div className="flex items-center justify-center py-7 md:py-8 pr-4">
                  <span className="font-mono text-2xl font-bold text-accent-50 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Vertical divider 1 — desktop only */}
                <div aria-hidden className="hidden md:block w-px bg-card-border self-stretch" />

                {/* Title */}
                <div className="hidden md:flex items-center py-7 md:py-8 px-8">
                  <h3 className="font-semibold text-lg leading-snug">{t(`steps.${key}.title`)}</h3>
                </div>

                {/* Vertical divider 2 — desktop only */}
                <div aria-hidden className="hidden md:block w-px bg-card-border self-stretch" />

                {/* Description (+ title on mobile) */}
                <div className="flex flex-col justify-center py-7 md:py-8 pl-0 md:pl-8">
                  <h3 className="font-semibold text-lg leading-snug mb-1 md:hidden">{t(`steps.${key}.title`)}</h3>
                  <p className="text-muted text-sm leading-relaxed">{t(`steps.${key}.description`)}</p>
                </div>
              </div>
            </motion.div>
          ))}
          <HRule />
        </div>
      </div>
    </section>
  );
}
