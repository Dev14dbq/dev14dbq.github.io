import HRule from "./HRule";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  const railLabelInset =
    "calc(max(calc(50% - 36rem), var(--content-px)) - var(--rail-content-offset) - var(--rail-gap) - var(--rail-label-outset))";

  return (
    <div className={`relative ${centered ? "text-center" : ""}`}>
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
          {label}
        </span>
      </div>
      <HRule />
      <h2 className="text-4xl font-bold text-foreground">{title}</h2>
      {subtitle ? (
        <>
          <HRule />
          <div aria-hidden className="h-6 md:h-8" />
          <HRule />
          <p className="text-muted text-lg max-w-2xl">{subtitle}</p>
          <HRule />
        </>
      ) : (
        <HRule />
      )}
    </div>
  );
}
