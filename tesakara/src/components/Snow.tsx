import React from "react";

type CSSVars = { "--snow-color"?: string };

type SnowProps = {
  color?: string;
  /** how many tiny flakes to render */
  count?: number;
};

/**
 * Pure DOM/CSS snow — no canvas, no libs.
 * Smaller, more elegant flakes with randomized size, drift, spin, speed, start offset, and opacity.
 * Uses CSS variables per flake and nested elements so vertical fall, horizontal sway,
 * and rotation are independent animations.
 */
export default function Snow({ color = "#ffffff", count = 80 }: SnowProps) {
  // deterministic pseudo‑random so SSR/CSR match
  const rand = (i: number) => {
    const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  const flakes = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r1 = rand(i + 1);
        const r2 = rand(i + 2);
        const r3 = rand(i + 3);
        const r4 = rand(i + 4);
        const r5 = rand(i + 5);
        const r6 = rand(i + 6);
        return {
          x: r1 * 100, // vw
          // smaller, elegant: ~0.7–1.6px "arm" thickness
          size: 0.5 + r2 * 0.9,
          // slower, graceful descent: 16–42s
          dur: 16 + r3 * 26,
          // negative to stagger on mount
          delay: -r4 * 28,
          // gentler sway amplitude: 4–16px
          amp: 4 + r5 * 12,
          // slower spin: 12–30s
          spin: 12 + r6 * 18,
          // slower sway: 6–14s
          sway: 6 + r2 * 8,
          // subtle per‑flake transparency for depth: 0.45–0.8
          alpha: 0.45,
          tilt: Math.floor(r3 * 360),
        };
      }),
    [count]
  );

  const style: React.CSSProperties & CSSVars = { "--snow-color": color };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      style={style}
      aria-hidden
    >
      <div className="relative h-full w-full">
        {flakes.map((f, i) => (
          <span
            className="flake"
            key={i}
            style={
              {
                "--x": `${f.x}vw`,
                "--size": `${f.size}px`,
                "--dur": `${f.dur}s`,
                "--delay": `${f.delay}s`,
                "--amp": `${f.amp}px`,
                "--spin": `${f.spin}s`,
                "--sway": `${f.sway}s`,
                "--tilt": `${f.tilt}deg`,
                "--alpha": `${f.alpha}`,
              } as React.CSSProperties
            }
          >
            <i className="mover">
              <b className="glyph" />
            </i>
          </span>
        ))}
      </div>

      {/* self‑contained CSS */}
      <style>{`
        .flake {
          position: absolute;
          left: var(--x);
          top: -10vh;
          will-change: transform;
          animation: snow-fall var(--dur) linear infinite;
          animation-delay: var(--delay);
        }

        @keyframes snow-fall {
          to { transform: translate3d(0, 112vh, 0); }
        }

        .mover {
          position: absolute;
          inset: 0;
          will-change: transform;
          animation: snow-sway var(--sway) ease-in-out infinite alternate;
        }

        @keyframes snow-sway {
          from { transform: translate3d(calc(-1 * var(--amp)), 0, 0); }
          to   { transform: translate3d(var(--amp), 0, 0); }
        }

        /* Tiny 6-armed snowflake glyph */
        .glyph {
          position: absolute;
          left: 0; top: 0;
          width: var(--size);
          height: calc(var(--size) * 3.6);
          background: var(--snow-color);
          border-radius: 999px;
          opacity: var(--alpha);
          /* crisper at small sizes without harsh glow */
          filter: drop-shadow(0 0 0.25px var(--snow-color));
          transform: translate(-50%, -50%) rotate(var(--tilt));
          will-change: transform;
          animation: snow-spin var(--spin) linear infinite;
        }

        .glyph::before,
        .glyph::after {
          content: "";
          position: absolute;
          left: 50%; top: 50%;
          width: var(--size);
          height: calc(var(--size) * 2.6);
          background: var(--snow-color);
          border-radius: 999px;
          transform-origin: 50% 50%;
        }
        .glyph::before { transform: translate(-50%, -50%) rotate(60deg); }
        .glyph::after  { transform: translate(-50%, -50%) rotate(-60deg); }

        @keyframes snow-spin {
          to { transform: translate(-50%, -50%) rotate(calc(var(--tilt) + 360deg)); }
        }
      `}</style>
    </div>
  );
}
