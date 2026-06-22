"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import HRule from "./HRule";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

export default function Hero() {
  const t = useTranslations("hero");
  const lineGapClass = "pt-0 pb-0";
  const blockGapClass = "h-6 md:h-8";

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Glow orb */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 w-[600px] h-[600px] rounded-full"
        style={{ background: "rgba(237,170,196,0.06)", filter: "blur(120px)" }}
      />

      <div className="relative z-10 section-padding w-full">
        <div className="container-wide">
          <motion.div
            className="w-full flex flex-col"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Badge */}
            <HRule />
            <motion.div variants={fadeUp} className={`${lineGapClass} max-w-2xl`}>
              <span className="inline-block font-mono text-xs border border-card-border rounded-full px-4 py-1.5 text-muted">
                {t("badge")}
              </span>
            </motion.div>
            <HRule />
            <div aria-hidden className={blockGapClass} />

            {/* H1 */}
            <HRule />
            <div className={`${lineGapClass} max-w-2xl`}>
              <motion.h1
                variants={fadeUp}
                className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight"
              >
                {t("title")}
                <br />
                <span className="gradient-text">{t("titleAccent")}</span>
              </motion.h1>
            </div>
            <HRule />
            <div aria-hidden className={blockGapClass} />

            {/* Subtitle */}
            <HRule />
            <div className={`${lineGapClass} max-w-2xl`}>
              <motion.p
                variants={fadeUp}
                className="text-base text-muted max-w-xl leading-relaxed"
              >
                {t("subtitle")}
              </motion.p>
            </div>
            <HRule />
            <div aria-hidden className={blockGapClass} />

            {/* CTAs */}
            <HRule />
            <div className={`${lineGapClass} max-w-2xl`}>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-full bg-accent text-[#08050a] px-6 py-3 text-sm font-semibold hover:shadow-[0_0_32px_rgba(237,170,196,0.4)] transition-shadow"
                >
                  {t("ctaPrimary")}
                </a>
                <a
                  href="#about"
                  className="rounded-full border border-card-border bg-transparent text-foreground px-6 py-3 text-sm font-semibold hover:border-accent-40 transition-colors"
                >
                  {t("ctaSecondary")}
                </a>
              </motion.div>
            </div>
            <HRule />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
