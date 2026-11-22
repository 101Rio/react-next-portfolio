import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeading } from "@/components/PageHeading";
import { Arrow } from "@/components/Arrow";
import { profile } from "@/data/profile";
import styles from "./page.module.css";
export const metadata: Metadata = {
  title: "About — わたしについて",
  description:
    "京都でWeb制作を学ぶRio Imaiのプロフィールと、いま学んでいること。",
};
export default function ProfilePage() {
  return (
    <Container className={styles.page}>
      <header className={styles.header}>
        <PageHeading label="02 / ABOUT ME" title="About." />
      </header>
      <section className={styles.identity}>
        <div className={styles.name}>
          <span>RIO IMAI</span>
          <h2>
            つくりながら、
            <br />
            仕組みを覚える。
          </h2>
        </div>
        <p>
          京都の専門学校で、Web制作を学んでいます。
          <br />
          {profile.introduction}
        </p>
      </section>
      <section className={styles.row}>
        <div>
          <span className="eyebrow">CURRENTLY LEARNING</span>
          <h2>いま、学んでいること。</h2>
        </div>
        <div>
          <p>
            ページの構造から、見た目、動き、データの扱いへ。
            <br />
            一つずつ実装しながら、理解を深めています。
          </p>
          <ul className={styles.skills}>
            {profile.skills.map((skill, index) => (
              <li key={skill}>
                <span>0{index + 1}</span>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={styles.row}>
        <div>
          <span className="eyebrow">NEXT STEPS</span>
          <h2>これからできるように。</h2>
        </div>
        <ol className={styles.goals}>
          {profile.learningGoals.map((goal, index) => (
            <li key={goal}>
              <span>0{index + 1}</span>
              <p>{goal}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.row}>
        <div>
          <span className="eyebrow">OFF SCREEN</span>
          <h2>画面の外では。</h2>
        </div>
        <div>
          <p>
            音楽を聴くこと。CDを集めること。
            <br />
            イヤホンの音を聴き比べること。ゲームをすること。
          </p>
          <p className={styles.small}>
            同じ音楽でも、録音や再生する機器で聞こえ方が変わる。
            <br />
            そんな違いを楽しむ時間が好きです。
          </p>
          <a
            className="textLink"
            href={profile.personalSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            自己紹介サイトを見る <Arrow diagonal />
          </a>
        </div>
      </section>
      <Link className={styles.workLink} href="/works">
        <span>制作したものを見る</span>
        <Arrow diagonal />
      </Link>
    </Container>
  );
}
