import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeading } from "@/components/PageHeading";
import { WorkGrid } from "@/components/WorkCard";
import { Arrow } from "@/components/Arrow";
import { getWorks } from "@/lib/works";
import styles from "./page.module.css";
export const metadata: Metadata = {
  title: "Works — 制作したもの",
  description: "制作したWebサイトとアプリの見どころ、使った技術、公開URLを紹介します。",
};
export default async function WorksPage() {
  const all = await getWorks();
  const works = all.filter((work) => !work.isSample);
  const samples = all.filter((work) => work.isSample);
  return (
    <Container className={styles.page}>
      <header className={styles.header}>
        <PageHeading label="01 / PROJECT INDEX" title="Works." />
        <div className={styles.intro}>
          <p>
            つくったものを、
            <br />
            画面と仕組みから。
          </p>
          <span>作品ごとに制作メモと公開サイトをまとめました。</span>
        </div>
      </header>
      <WorkGrid works={works} />
      {samples.length > 0 && (
        <aside className={styles.samples}>
          <div>
            <span className="eyebrow">CLASS SAMPLES</span>
            <p>授業用サンプル</p>
          </div>
          <div>
            {samples.map((work) => (
              <Link href={`/works/${work.slug}`} key={work.id}>
                <span>{work.title}</span>
                <Arrow diagonal />
              </Link>
            ))}
            <p>作品ページの作り方を学ぶためのデータです。</p>
          </div>
        </aside>
      )}
    </Container>
  );
}
