export default function GridOverlay() {
  // max-w-6xl = 72rem → half = 36rem
  // Content left edge = max(50vw - 36rem, --content-px)
  // This mirrors how section-padding + container-wide centers content
  const contentOffset = "var(--rail-content-offset)";
  const left = `calc(max(calc(50% - 36rem), var(--content-px)) - ${contentOffset})`;
  const right = `calc(max(calc(50% - 36rem), var(--content-px)) - ${contentOffset})`;
  const railGap = "var(--rail-gap)";
  const hatchPattern =
    "repeating-linear-gradient(-45deg, rgba(237,170,196,0.14) 0 1.5px, transparent 1.5px 7px)";

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
      style={{ top: "4rem" }}
      aria-hidden
    >
      <div
        className="absolute inset-y-0"
        style={{
          left: `calc(${left} - ${railGap})`,
          width: railGap,
          backgroundImage: hatchPattern,
        }}
      />
      <div
        className="absolute inset-y-0 w-px"
        style={{ left, background: "rgba(237,170,196,0.12)" }}
      />
      <div
        className="absolute inset-y-0 w-px"
        style={{
          left: `calc(${left} - ${railGap})`,
          background: "rgba(237,170,196,0.12)",
        }}
      />

      <div
        className="absolute inset-y-0"
        style={{
          right: `calc(${right} - ${railGap})`,
          width: railGap,
          backgroundImage: hatchPattern,
        }}
      />
      <div
        className="absolute inset-y-0 w-px"
        style={{ right, background: "rgba(237,170,196,0.12)" }}
      />
      <div
        className="absolute inset-y-0 w-px"
        style={{
          right: `calc(${right} - ${railGap})`,
          background: "rgba(237,170,196,0.12)",
        }}
      />
    </div>
  );
}
