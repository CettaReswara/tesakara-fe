type CSSVars = { '--snow-color'?: string };

export default function Snow({ color = '#ffffff' }: { color?: string }) {
  const style: React.CSSProperties & CSSVars = { '--snow-color': color };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      style={style}
    >
      <div className="snow-layer snow-slow" />
      <div className="snow-layer snow-fast" />
    </div>
  );
}
