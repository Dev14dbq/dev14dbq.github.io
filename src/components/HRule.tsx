export default function HRule() {
  return (
    <div
      aria-hidden
      className="pointer-events-none flex-shrink-0"
      style={{
        position: "relative",
        zIndex: 0,
        height: "1px",
        width: "100vw",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        maxWidth: "100vw",
        background: "rgba(237,170,196,0.10)",
      }}
    />
  );
}
