"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import SectionHeading from "./SectionHeading";
import { SiTelegram, SiDiscord } from "@icons-pack/react-simple-icons";
import { FiArrowUpRight } from "react-icons/fi";
import HRule from "./HRule";

const BOT_TOKEN = "8826141605:AAGDWBmH-6pZ7iZql130n2PW_3WTOSS9XTc";
const CHAT_ID = "7611517250";

const messengers = [
  {
    key: "telegram",
    href: "https://t.me/dev14dbq",
    Icon: SiTelegram,
  },
  {
    key: "discord",
    href: "https://discordapp.com/users/1352594334741958717",
    Icon: SiDiscord,
  },
  {
    key: "max",
    href: "https://max.ru/u/f9LHodD0cOJsptUnau4dddQ29fi9Pfe0aBLGfY5TGK0ESWz5ERdPFXC11mU",
    Icon: null,
  },
] as const;

function MaxIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1.5 14H11v-5.5L9 12V9.5l2-1.5h2.5V16z" />
    </svg>
  );
}

function SuccessCard() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.94, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="card-base flex flex-col items-center justify-center gap-6 h-full"
      style={{ backgroundColor: "var(--background)", minHeight: "320px" }}
    >
      <div className="relative">
        <svg viewBox="0 0 72 72" fill="none" className="w-[72px] h-[72px]">
          <motion.circle
            cx="36"
            cy="36"
            r="31"
            stroke="var(--accent)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
          <motion.path
            d="M21 36.5 L31 47 L51 25"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, delay: 0.48, ease: "easeOut" }}
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-base font-semibold text-foreground tracking-tight">Заявка отправлена</p>
        <p className="text-sm text-muted mt-1.5">Отвечу вам в ближайшее время</p>
      </div>
    </motion.div>
  );
}

const NAME_MAX = 16;

function sanitizePhone(raw: string): string {
  // Allow only: digits, +, spaces, hyphens, parentheses
  return raw.replace(/[^\d+\s\-()]/g, "");
}

function countPhoneDigits(value: string): number {
  return value.replace(/\D/g, "").length;
}

export default function Contact() {
  const t = useTranslations("contact");
  const tf = useTranslations("contact.form");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [social, setSocial] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    setName(localStorage.getItem("cf_name") ?? "");
    setPhone(localStorage.getItem("cf_phone") ?? "");
    setSocial(localStorage.getItem("cf_social") ?? "");
  }, []);

  const clearStorage = () => {
    localStorage.removeItem("cf_name");
    localStorage.removeItem("cf_phone");
    localStorage.removeItem("cf_social");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Введите имя";
    const digits = countPhoneDigits(phone);
    if (!phone.trim()) newErrors.phone = "Введите номер телефона";
    else if (digits < 7) newErrors.phone = "Слишком короткий номер";
    else if (digits > 15) newErrors.phone = "Слишком длинный номер";
    if (!social.trim()) newErrors.social = "Укажите соцсеть или юзернейм";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    const lines = [
      "<b>Новая заявка с сайта</b>",
      "",
      name   ? `👤 <b>Имя:</b> ${name}`    : null,
      phone  ? `📞 <b>Телефон:</b> ${phone}` : null,
      social ? `💬 <b>Соцсети:</b> ${social}` : null,
    ].filter((l) => l !== null).join("\n");

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: CHAT_ID, text: lines, parse_mode: "HTML" }),
        }
      );
      if (!res.ok) throw new Error("Non-2xx response");
      setSubmitStatus("success");
      setName("");
      setPhone("");
      setSocial("");
      clearStorage();
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = (hasError?: boolean) =>
    `w-full bg-transparent border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:outline-none transition-colors ${
      hasError
        ? "border-red-400/50 focus:border-red-400/70"
        : "border-card-border focus:border-accent/50"
    }`;

  return (
    <section id="contact" className="section-padding">
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
            <motion.div
              className="relative z-10 px-[var(--rail-content-offset)] py-[var(--rail-content-offset)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">

                {/* Messenger buttons */}
                <div className="flex flex-col gap-3">
                  {messengers.map(({ key, href, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-base flex items-center justify-between group hover:border-accent/40 hover:shadow-[0_0_24px_rgba(237,170,196,0.10)] transition-all"
                      style={{ backgroundColor: "var(--background)" }}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-accent"
                          style={{ background: "rgba(237,170,196,0.08)", border: "1px solid rgba(237,170,196,0.16)" }}
                        >
                          {Icon
                            ? <Icon size={18} className="text-accent" />
                            : <MaxIcon size={18} />
                          }
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground leading-tight">
                            {t(key as "telegram" | "discord" | "max")}
                          </p>
                          <p className="font-mono text-xs text-muted mt-0.5 leading-tight">
                            {t(`${key}Hint` as "telegramHint" | "discordHint" | "maxHint")}
                          </p>
                        </div>
                      </div>
                      <FiArrowUpRight
                        size={16}
                        className="text-muted/60 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                      />
                    </a>
                  ))}
                </div>

                {/* Form / Success */}
                <AnimatePresence mode="wait">
                  {submitStatus === "success" ? (
                    <SuccessCard key="success" />
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.25 }}
                      className="card-base flex flex-col gap-4"
                      style={{ backgroundColor: "var(--background)" }}
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <label className="font-mono text-[10px] text-muted uppercase tracking-widest">
                            {tf("name")}
                          </label>
                          {name.length >= NAME_MAX && (
                            <span className="font-mono text-[10px] text-red-400">{name.length}/{NAME_MAX}</span>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder={tf("placeholderName")}
                          value={name}
                          maxLength={NAME_MAX}
                          onChange={(e) => {
                            const v = e.target.value.slice(0, NAME_MAX);
                            setName(v);
                            localStorage.setItem("cf_name", v);
                          }}
                          onFocus={() => setErrors((prev) => { const n = { ...prev }; delete n.name; return n; })}
                          className={inputCls(!!errors.name)}
                        />
                        {errors.name && (
                          <p className="text-[11px] text-red-400 leading-snug">{errors.name}</p>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <label className="font-mono text-[10px] text-muted uppercase tracking-widest">
                            {tf("phone")}
                          </label>
                          {phone && (countPhoneDigits(phone) < 7 || countPhoneDigits(phone) > 15) && (
                            <span className="font-mono text-[10px] text-red-400">
                              {countPhoneDigits(phone)}/15
                            </span>
                          )}
                        </div>
                        <input
                          type="tel"
                          placeholder={tf("placeholderPhone")}
                          value={phone}
                          onChange={(e) => {
                            const v = sanitizePhone(e.target.value);
                            setPhone(v);
                            localStorage.setItem("cf_phone", v);
                          }}
                          onFocus={() => setErrors((prev) => { const n = { ...prev }; delete n.phone; return n; })}
                          className={inputCls(!!errors.phone)}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-red-400 leading-snug">{errors.phone}</p>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] text-muted uppercase tracking-widest">
                          {tf("social")}
                        </label>
                        <input
                          type="text"
                          placeholder={tf("placeholderSocial")}
                          value={social}
                          onChange={(e) => {
                            setSocial(e.target.value);
                            localStorage.setItem("cf_social", e.target.value);
                          }}
                          onFocus={() => setErrors((prev) => { const n = { ...prev }; delete n.social; return n; })}
                          className={inputCls(!!errors.social)}
                        />
                        {errors.social && (
                          <p className="text-[11px] text-red-400 leading-snug">{errors.social}</p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 mt-auto pt-1">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="rounded-full bg-accent text-[#08050a] px-6 py-2.5 text-sm font-semibold self-start hover:shadow-[0_0_28px_rgba(237,170,196,0.45)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submitting ? "Отправляю…" : "Отправить"}
                        </button>
                        {submitStatus === "error" && (
                          <p className="text-[11px] text-red-400">Ошибка отправки, попробуй ещё раз</p>
                        )}
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          </div>
          <HRule />
        </div>
      </div>
    </section>
  );
}
