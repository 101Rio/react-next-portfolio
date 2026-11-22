"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { MotionToggle } from "./Experience";
import { currentSection, navigation } from "./navigation";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const pathname = usePathname();
  return (
    <footer className={styles.footer}>
      <Container>
        <nav className={styles.links} aria-label="フッターナビゲーション">
          {navigation.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={currentSection(pathname, href)}>
              <span className="navUnderline">{label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Rio Imai</span>
          <MotionToggle />
          <a href="#top">Back to top ↑</a>
        </div>
      </Container>
    </footer>
  );
}
