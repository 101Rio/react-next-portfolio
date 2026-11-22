"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Arrow } from "./Arrow";
import { currentSection, navigation } from "./navigation";
import { WaveText } from "./WaveText";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const atHome = pathname === "/";
  const BrandLink = atHome ? "a" : Link;
  const [indexOpen, setIndexOpen] = useState(false);
  const indexButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!indexOpen) return;
    const content = document.getElementById("page-content");
    indexButton.current?.focus({ preventScroll: true });
    if (!content) return;
    content.inert = true;
    window.addEventListener("popstate", closeIndex);
    return () => {
      content.inert = false;
      window.removeEventListener("popstate", closeIndex);
    };
  }, [indexOpen]);

  function closeIndex() {
    setIndexOpen(false);
  }

  function returnToIndexButton() {
    indexButton.current?.focus({ preventScroll: true });
    closeIndex();
  }

  return (
    <div
      className={styles.header}
      role={indexOpen ? "dialog" : undefined}
      aria-modal={indexOpen || undefined}
      aria-label={indexOpen ? "サイトのIndex" : undefined}
      onKeyDown={(event) => {
        if (!indexOpen) return;
        if (event.key === "Escape") {
          event.preventDefault();
          returnToIndexButton();
        } else if (event.key === "Tab") {
          const links = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button");
          const visible = Array.from(links).filter(
            (link) => !link.closest("[inert]") && link.getClientRects().length > 0,
          );
          const first = visible[0];
          const last = visible[visible.length - 1];
          if (event.shiftKey && event.target === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && event.target === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }}
    >
      <a className="skipLink" href="#main-content" inert={indexOpen}>
        本文へ移動
      </a>
      <header className={styles.bar}>
        <BrandLink
          className={styles.brand}
          href={atHome ? "#top" : "/"}
          aria-label="Rio Imai ホーム"
          onClick={closeIndex}
        >
          ri<span>o.</span>
        </BrandLink>
        <span className={styles.label}>WEB PORTFOLIO</span>
        <nav aria-label="メインナビゲーション" className={styles.navigation}>
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onNavigate={closeIndex}
              aria-current={currentSection(pathname, item.href)}
            >
              <span className={styles.navNumber} aria-hidden="true">
                0{index + 1}
              </span>
              <span className="navUnderline">{item.label}</span>
            </Link>
          ))}
        </nav>
        <button
          ref={indexButton}
          type="button"
          className={styles.menuButton}
          aria-expanded={indexOpen}
          aria-controls="site-index"
          aria-label={indexOpen ? "Indexを閉じる" : "Indexを開く"}
          onClick={() => setIndexOpen((open) => !open)}
        >
          Index <span className="toggleMark" aria-hidden="true" />
        </button>
      </header>
      <div id="site-index" className={styles.menu} inert={!indexOpen}>
        <nav aria-label="全ページ" className={styles.menuLinks}>
          {[
            { href: "/", label: "Home", ja: "トップページ" },
            ...navigation,
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onNavigate={returnToIndexButton}
              aria-current={currentSection(pathname, item.href)}
              style={{ "--row": index } as CSSProperties}
            >
              <span className={styles.number} aria-hidden="true">0{index}</span>
              <span lang="en"><span className="navUnderline"><WaveText text={item.label} trigger="index" /></span></span>
              <small><WaveText text={item.ja} trigger="index" /></small>
              <Arrow diagonal />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
