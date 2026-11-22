"use client";

import type { CSSProperties } from "react";
import styles from "./WaveText.module.css";

function revealInView(node: HTMLSpanElement | null) {
  if (!node) return;
  if (!("IntersectionObserver" in window)) {
    node.dataset.visible = "";
    return;
  }

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    node.dataset.visible = "";
    observer.disconnect();
  }, { threshold: 0.15 });
  observer.observe(node);
  return () => observer.disconnect();
}

type WaveTextProps = {
  text: string;
  trigger?: "page" | "viewport" | "index";
};

export function WaveText({ text, trigger = "page" }: WaveTextProps) {
  return (
    <span
      className={styles.wave}
      data-wave={trigger}
      ref={trigger === "viewport" ? revealInView : undefined}
    >
      <span className={styles.accessibleText}>{text}</span>
      <span className={styles.mask} aria-hidden="true">
        {Array.from(text, (letter, index) => letter === " " ? " " : (
          <span
            key={index}
            className={letter === "." ? `${styles.glyph} ${styles.period}` : styles.glyph}
            data-after={letter === "." ? text[index - 1] : undefined}
            style={{ "--letter": index } as CSSProperties}
          >{letter}</span>
        ))}
      </span>
    </span>
  );
}
