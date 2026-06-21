"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import HRule from "./HRule";

type ProjectKey = "portfolio" | "crm" | "bot" | "saas";

const projects: { key: ProjectKey; badge?: "thissite" | "demo" }[] = [
  { key: "portfolio", badge: "thissite" },
  { key: "crm",  badge: "demo" },
  { key: "bot",  badge: "demo" },
  { key: "saas", badge: "demo" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Work() {
  const t = useTranslations("work");

  return (
    <section id="work" className="section-padding">
      <div className="container-wide">
        <SectionHeading
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div aria-hidden className="h-6 md:h-8" />

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
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={{ show: { transition: { staggerChildren: 0.1 } } }}
              >
                {projects.map(({ key, badge }, i) => {
                  const tags = t.raw(`items.${key}.tags`) as string[];

                  return (
                    <motion.div
                      key={key}
                      variants={fadeUp}
                      className="card-base flex flex-col justify-between min-h-[280px]"
                      style={{ backgroundColor: "var(--background)" }}
                    >
                      <div className="flex flex-col gap-3">
                        {badge && (
                          <span className="self-start font-mono text-xs border border-accent/30 text-accent rounded-md px-2.5 py-1">
                            {t(badge)}
                          </span>
                        )}
                        <h3 className="text-xl font-bold">{t(`items.${key}.title`)}</h3>
                        <p className="text-muted text-sm leading-relaxed">
                          {t(`items.${key}.description`)}
                        </p>
                      </div>

                      <div className="flex items-end justify-between gap-4 mt-6">
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border border-card-border bg-background/50 px-2.5 py-1 font-mono text-xs text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="font-mono text-xs text-muted shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
          <HRule />
        </div>
      </div>
    </section>
  );
}
