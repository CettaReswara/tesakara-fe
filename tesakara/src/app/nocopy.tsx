"use client";

import { PropsWithChildren, useEffect } from "react";
import styles from "./nocopy.module.css";

const isEditable = (el: EventTarget | null) => {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName.toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    el.isContentEditable
  );
};

export default function NoCopy({ children }: PropsWithChildren) {
  useEffect(() => {
    const block = (e: Event) => {
      // allow default behavior inside form fields / editable areas
      if (isEditable(e.target)) return;
      e.preventDefault();
    };

    const onKey = (e: KeyboardEvent) => {
      if (isEditable(e.target)) return; // allow shortcuts in inputs
      const k = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ["c", "x", "s", "p"].includes(k)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("paste", block);
    document.addEventListener("dragstart", block);
    document.addEventListener("contextmenu", block);
    document.addEventListener("keydown", onKey, true);

    return () => {
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("paste", block);
      document.removeEventListener("dragstart", block);
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("keydown", onKey, true);
    };
  }, []);

  return <div className={styles.nocopy}>{children}</div>;
}
