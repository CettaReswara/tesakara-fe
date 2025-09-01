"use client";

import React, { useRef } from "react";
import { motion, Variants, useInView, useReducedMotion } from "framer-motion";

type ViewOptions = NonNullable<Parameters<typeof useInView>[1]>;

// Single element reveal
export type RevealProps = {
  children: React.ReactNode;
  /** How much of the element must be visible to trigger (0–1 or an array of thresholds). */
  amount?: ViewOptions["amount"]; // number | "some" | "all"
  margin?: ViewOptions["margin"]; // matches MarginType
  once?: ViewOptions["once"];     // boolean
  /** Where the element comes from. */
  direction?: "up" | "down" | "left" | "right" | "zoom" | "none";
  /** Seconds */
  duration?: number;
  /** Seconds */
  delay?: number;
  /** Optional className passthrough */
  className?: string;
  /** Optional style passthrough */
  style?: React.CSSProperties;
};

export function Reveal({
  children,
  amount = 0.25,
  margin,
  once = false,
  direction = "up",
  duration = 0.6,
  delay = 0,
  className,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount, margin, once: false });
  const reduce = useReducedMotion();

  const distance = 32; // px

  const baseHidden: any = { opacity: 0 };
  const baseVisible: any = { opacity: 1 };

  const variantsByDir: Record<string, Variants> = {
    none: {
      hidden: baseHidden,
      visible: baseVisible,
    },
    up: {
      hidden: { ...baseHidden, y: distance },
      visible: { ...baseVisible, y: 0 },
    },
    down: {
      hidden: { ...baseHidden, y: -distance },
      visible: { ...baseVisible, y: 0 },
    },
    left: {
      hidden: { ...baseHidden, x: distance },
      visible: { ...baseVisible, x: 0 },
    },
    right: {
      hidden: { ...baseHidden, x: -distance },
      visible: { ...baseVisible, x: 0 },
    },
    zoom: {
      hidden: { ...baseHidden, scale: 0.95 },
      visible: { ...baseVisible, scale: 1 },
    },
  };

  const variants = variantsByDir[direction] ?? variantsByDir.up;

  // Respect reduced motion
  const finalVariants: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : variants;

  const shouldShow = once ? inView || (ref.current && ref.current.dataset.seen === "true") : inView;
  if (once && ref.current && inView) ref.current.dataset.seen = "true";

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ willChange: "transform, opacity", ...style }}
      initial="hidden"
      animate={shouldShow ? "visible" : "hidden"}
      variants={finalVariants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// -----------------------------
// Group reveal with staggered children
// -----------------------------
export type RevealGroupProps = Omit<RevealProps, "children"> & {
  children: React.ReactNode;
  /** Seconds between children */
  stagger?: number;
  /** Delay before the first child */
  delayChildren?: number;
};

export function RevealGroup({
  children,
  amount = 0.25,
  margin,
  once = false,
  direction = "up",
  duration = 0.6,
  delay = 0,
  stagger = 0.08,
  delayChildren = 0,
  className,
  style,
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount, margin, once: false });
  const reduce = useReducedMotion();

  const distance = 24;
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : direction === "left"
    ? { hidden: { opacity: 0, x: distance }, visible: { opacity: 1, x: 0 } }
    : direction === "right"
    ? { hidden: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0 } }
    : direction === "down"
    ? { hidden: { opacity: 0, y: -distance }, visible: { opacity: 1, y: 0 } }
    : direction === "zoom"
    ? { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }
    : { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } };

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };

  const shouldShow = once ? inView || (ref.current && ref.current.dataset.seen === "true") : inView;
  if (once && ref.current && inView) ref.current.dataset.seen = "true";

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      animate={shouldShow ? "visible" : "hidden"}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          variants={item}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// -----------------------------
// Example usage (a simple demo section)
// -----------------------------
export default function DemoPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-24">
      <header className="space-y-2">
        <Reveal direction="down">
          <h1 className="text-3xl font-semibold tracking-tight">Scroll Reveal Demo</h1>
        </Reveal>
        <Reveal direction="up" delay={0.1}>
          <p className="text-neutral-600 dark:text-neutral-300">
            Each block animates <em>in</em> as it enters the viewport, and animates back <em>out</em> when it leaves.
          </p>
        </Reveal>
      </header>

      <section className="grid gap-10 sm:grid-cols-2 sm:items-center">
        <Reveal direction="left" className="space-y-3">
          <h2 className="text-2xl font-medium">Text comes from the left</h2>
          <p className="text-neutral-600 dark:text-neutral-300">
            This paragraph uses a horizontal slide + fade. Try scrolling it in and out of view.
          </p>
        </Reveal>
        <Reveal direction="zoom">
          {/* Using a plain <img> keeps this demo zero-config. Swap for next/image in your app. */}
          <img
            src="https://picsum.photos/seed/reveal/720/480"
            alt="Random"
            className="w-full rounded-2xl shadow"
            loading="lazy"
          />
        </Reveal>
      </section>

      <section>
        <RevealGroup direction="up" stagger={0.12} className="space-y-3">
          <h3 className="text-xl font-semibold">Staggered list</h3>
          <ul className="list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
            <li>Item one reveals first</li>
            <li>Item two follows</li>
            <li>Item three after that</li>
            <li>…and so on</li>
          </ul>
        </RevealGroup>
      </section>

      <footer className="text-sm text-neutral-500">Tip: Set <code>once</code> to true if you only want the first-time reveal.</footer>
    </main>
  );
}
