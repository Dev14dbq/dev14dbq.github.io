"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiMapPin, FiUser, FiGlobe, FiSmartphone, FiMessageSquare, FiLayout } from "react-icons/fi";
import HRule from "./HRule";
import SectionHeading from "./SectionHeading";

type Skill = { name: string; desc: string };
type DoItem = { title: string; desc: string };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

const doIcons = [FiGlobe, FiMessageSquare, FiSmartphone, FiLayout];

export default function About() {
  const t = useTranslations("about");
  const skills = t.raw("skills") as Skill[];
  const doItems = t.raw("do") as DoItem[];

  return (
    <section id="about" className="section-padding bg-card-30">
      <div className="container-wide">
        <SectionHeading label={t("label")} title={t("title")} />
        <div aria-hidden className="h-6 md:h-8" />

        <div className="relative z-10">
          <HRule />
          <div className="py-8">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            >
              {/* ── Left: Profile Card ── */}
              <motion.div
                variants={fadeUp}
                className="lg:col-span-1 card-base flex flex-col items-center gap-5 pt-8 pb-6 px-6"
                style={{ backgroundColor: "var(--background)" }}
              >
                {/* Photo */}
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden border border-card-border shrink-0 shadow-lg"
                  style={{ boxShadow: "0 0 40px rgba(237,170,196,0.15)" }}>
                  <Image
                    src="/photo.jpg"
                    alt="Gleb Softfoxxy"
                    fill
                    sizes="144px"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(8,5,10,0.6) 100%)" }} />
                </div>

                {/* Name */}
                <div className="text-center">
                  <p className="font-bold text-xl text-foreground tracking-tight">{t("firstName")}</p>
                  <p className="font-mono text-sm text-accent tracking-widest uppercase mt-0.5">{t("handle")}</p>
                </div>

                {/* Meta */}
                <div className="w-full flex flex-col gap-2.5 border-t border-card-border pt-4">
                  <div className="flex items-center gap-2.5 text-muted text-sm">
                    <FiUser size={13} className="text-accent-60 shrink-0" />
                    <span className="font-mono">{t("age")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted text-sm">
                    <FiMapPin size={13} className="text-accent-60 shrink-0" />
                    <span className="font-mono">{t("city")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm pt-0.5">
                    <span className="font-mono text-foreground-80">{t("role")}</span>
                  </div>
                </div>
              </motion.div>

              {/* ── Right: 2 stacked cards ── */}
              <div className="lg:col-span-2 flex flex-col gap-4">

                {/* Skills card */}
                <motion.div
                  variants={fadeUp}
                  className="card-base flex flex-col overflow-hidden"
                  style={{ backgroundColor: "var(--background)" }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-60 px-6 pt-5 pb-3">
                    {t("skillsLabel")}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    {skills.map((skill, i) => (
                      <div key={skill.name} className="relative px-6 py-3.5 group">
                        {i % 2 === 0 && i + 1 < skills.length && (
                          <div className="absolute top-0 right-0 bottom-0 w-px bg-card-border hidden sm:block" />
                        )}
                        {i >= 2 && (
                          <div className="absolute top-0 left-6 right-6 h-px bg-card-border" />
                        )}
                        <p className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors duration-200">
                          {skill.name}
                        </p>
                        <p className="text-xs text-muted mt-0.5 leading-relaxed">{skill.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* What I do card */}
                <motion.div
                  variants={fadeUp}
                  className="card-base flex flex-col overflow-hidden"
                  style={{ backgroundColor: "var(--background)" }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-60 px-6 pt-5 pb-3">
                    {t("doLabel")}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    {doItems.map((item, i) => {
                      const Icon = doIcons[i] ?? FiGlobe;
                      return (
                        <div key={item.title} className="relative px-6 py-4 group">
                          {i % 2 === 0 && i + 1 < doItems.length && (
                            <div className="absolute top-0 right-0 bottom-0 w-px bg-card-border hidden sm:block" />
                          )}
                          {i >= 2 && (
                            <div className="absolute top-0 left-6 right-6 h-px bg-card-border" />
                          )}
                          <div className="flex items-center gap-2.5 mb-1">
                            <span className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: "rgba(237,170,196,0.08)", border: "1px solid rgba(237,170,196,0.15)" }}>
                              <Icon size={12} className="text-accent" />
                            </span>
                            <p className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors duration-200">
                              {item.title}
                            </p>
                          </div>
                          <p className="text-xs text-muted leading-relaxed pl-[34px]">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </div>
          <HRule />
        </div>
      </div>
    </section>
  );
}
