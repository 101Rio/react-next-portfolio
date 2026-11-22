import Link from "next/link";
import { profile } from "@/data/profile";
import { WaveText } from "./WaveText";
import styles from "./Hero.module.css";

export function Hero({ hasWorks }: { hasWorks: boolean }) {
  const WorksLink = hasWorks ? "a" : Link;
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.topline}>
        <span>WEB DEVELOPMENT</span>
        <span>PORTFOLIO — 2026</span>
      </div>
      <h1 className={styles.name} id="hero-title" lang="en">
        <WaveText text={`${profile.name}.`} />
      </h1>
      <div className={styles.intro}>
        <p>
          京都でWeb制作を学ぶ、Rio Imaiです。
          <br />
          自分でつくったサイトやアプリと、その制作過程を紹介します。
        </p>
        <WorksLink href={hasWorks ? "#selected-works" : "/works"} className={styles.jump}>
          制作したもの <span aria-hidden="true">↓</span>
        </WorksLink>
      </div>
    </section>
  );
}
