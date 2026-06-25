"use client";

import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiRust,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGit,
  SiTelegram,
  SiDiscord,
} from "@icons-pack/react-simple-icons";

type TechItem =
  | { type: "icon"; Icon: React.ComponentType<{ size?: number; className?: string }>; label: string }
  | { type: "text"; label: string };

const items: TechItem[] = [
  { type: "icon", Icon: SiReact,      label: "React" },
  { type: "icon", Icon: SiTypescript, label: "TypeScript" },
  { type: "icon", Icon: SiNodedotjs,  label: "Node.js" },
  { type: "icon", Icon: SiPython,     label: "Python" },
  { type: "icon", Icon: SiRust,       label: "Rust" },
  { type: "icon", Icon: SiPostgresql, label: "PostgreSQL" },
  { type: "icon", Icon: SiRedis,      label: "Redis" },
  { type: "icon", Icon: SiDocker,     label: "Docker" },
  { type: "icon", Icon: SiGit,        label: "Git" },
  { type: "icon", Icon: SiTelegram,   label: "Telegram" },
  { type: "icon", Icon: SiDiscord,    label: "Discord" },
  { type: "text", label: "SQL" },
  { type: "text", label: "VK API" },
  { type: "text", label: "Ai" },
  { type: "text", label: "Ps" },
  { type: "text", label: "Electron" },
];

function Item({ item }: { item: TechItem }) {
  return (
    <div className="flex items-center gap-2 mx-6 shrink-0">
      {item.type === "icon" ? (
        <item.Icon size={18} className="text-muted" />
      ) : (
        <span className="w-[18px] text-center font-mono text-xs font-bold text-muted">
          {item.label.substring(0, 2)}
        </span>
      )}
      <span className="font-mono text-sm text-muted whitespace-nowrap">
        {item.label}
      </span>
    </div>
  );
}

export default function MarqueeTech() {
  const doubled = [...items, ...items];

  return (
    <section className="py-5 border-y border-card-border overflow-hidden relative bg-card flex items-center">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

      <div className="marquee-track">
        {doubled.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </div>
    </section>
  );
}
