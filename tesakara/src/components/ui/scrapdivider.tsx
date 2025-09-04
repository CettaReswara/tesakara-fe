import styles from "./scrapdivider.module.css";
import React from "react";

type CSSLen = `${number}px` | `${number}vw` | `${number}%`;

export type ScrapDividerProps = {
  position?: "top" | "bottom";
  /** number => px, "screen" => 100vw, or any CSS length like "80vw" */
  width?: number | "screen" | CSSLen;
  /** cap the width; number => px */
  maxWidth?: number | `${number}px`;
  height?: number;            // px
  angle?: number;             // deg
  textureSrc?: string;        // background image url(...)
  className?: string;         // extra classes (e.g., Tailwind)
};

const toLen = (v: ScrapDividerProps["width"] | ScrapDividerProps["maxWidth"]): string => {
  if (typeof v === "number") return `${v}px`;
  if (v === "screen") return "100vw";
  return (v ?? "100%") as string;
};

function ScrapDivider({
  position = "bottom",
  width = "screen",
  maxWidth = 470,
  height = 470,
  angle = -2,
  textureSrc = "/img/paper.png",
  className = "",
}: ScrapDividerProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  // Reveal-on-intersect (triggers the slap animation once)
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add(styles.isInview); // use module class
            io.disconnect();
          }
        });
      },
      { rootMargin: "120px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const w = toLen(width);
  const mw = toLen(maxWidth);

  const vars: React.CSSProperties = {
    ["--scrap-w" as any]: `min(${w}, ${mw})`,
    ["--scrap-h" as any]: `${height}px`,
    ["--scrap-angle" as any]: `${angle}deg`,
    ["--paper" as any]: `url("${textureSrc}")`,
  };

  const cls = [
    styles.scrapDivider,
    position === "top" ? styles.scrapTop : styles.scrapBottom,
    className, // allow Tailwind/extra classes
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={cls} style={vars} aria-hidden="true">
      <span className={styles.scrapPaper} />
    </div>
  );
}

export default ScrapDivider;
