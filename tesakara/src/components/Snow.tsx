export default function Snow({ color = "#ffffff" }: { color?: string }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      style={{ ["--snow-color" as any]: color }}
    >
      <div className="snow-layer snow-slow" />
      <div className="snow-layer snow-fast" />
    </div>
  );
}
