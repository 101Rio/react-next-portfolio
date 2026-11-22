"use client";
import Image from "next/image";
import { useId, useState } from "react";
import { pokedex } from "@/data/pokedex";
import { Arrow } from "./Arrow";
import styles from "./ProjectViewer.module.css";

/** 実画面を比較し、選択したときだけ公開中のアプリを読み込む。 */
export function ProjectViewer({ priority = false }: { priority?: boolean }) {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const screen = pokedex.screens[active === 1 ? 1 : 0];
  return (
    <div className={styles.viewer}>
      <div className={styles.toolbar}>
        <span>図鑑のプレビュー</span>
        <div
          className={styles.switcher}
          role="group"
          aria-label="作品の表示画面"
        >
          {["一覧", "詳細", "操作"].map((label, index) => (
            <button
              key={label}
              type="button"
              aria-pressed={active === index}
              aria-controls={panelId}
              onClick={() => setActive(index)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.stage} id={panelId}>
        <div className={styles.browser}>
          <div className={styles.address}>
            <span className={styles.windowMark} aria-hidden="true">
              ↗
            </span>
            <span>
              101rio.github.io/react-pokemon-zukan/
              {active === 2 ? "" : screen.path}
            </span>
            <span className={styles.screenLabel}>
              {active === 2 ? "LIVE" : "実際の画面"}
            </span>
          </div>
          {active === 2 ? (
            <div className={styles.liveScreen}>
              <iframe
                title="公開中のReactポケモン図鑑を操作"
                src={pokedex.url}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className={styles.screen} key={active}>
              <Image
                src={screen.image}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                sizes="(max-width: 700px) 92vw, 70vw"
                priority={priority && active === 0}
              />
            </div>
          )}
        </div>
        <a
          className={styles.open}
          href={active === 1 ? pokedex.detailUrl : pokedex.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="ポケモン図鑑の公開サイトを開く（新しいタブ）"
        >
          図鑑を別タブで開く <Arrow diagonal />
        </a>
      </div>
      <div className={styles.caption} aria-live="polite">
        <span>
          <b>0{active + 1}</b> / 03
        </span>
        <p>
          {active === 2
            ? "公開中のアプリです。この画面内で操作できます。"
            : screen.caption}
        </p>
      </div>
    </div>
  );
}
