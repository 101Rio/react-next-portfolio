import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { RichTextBody } from "@/components/RichTextBody";
import { ProjectViewer } from "@/components/ProjectViewer";
import { Arrow } from "@/components/Arrow";
import { pokedex } from "@/data/pokedex";
import { getWorkBySlug, getWorks } from "@/lib/works";
import styles from "./page.module.css";
type PageProps = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getWorks()).map((work) => ({ slug: work.slug }));
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  return work
    ? { title: work.title, description: work.description }
    : { title: "作品が見つかりません" };
}
export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) notFound();
  const isPokedex = work.slug === "react-pokemon-zukan";
  return (
    <Container className={styles.page}>
      <article>
        <header className={styles.header}>
          <Link className={styles.backLink} href="/works">
            ← ALL WORKS
          </Link>
          <span className="eyebrow">
            {work.isSample
              ? "CLASS SAMPLE / 授業用サンプル"
              : "WORKS / PROJECT"}
          </span>
          <h1>{work.title}</h1>
          <p className={styles.description}>{work.description}</p>
          <div className={styles.meta}>
            <div>
              <span>TYPE</span>
              <p>{work.isSample ? "授業用サンプル" : (work.category ?? "Web制作")}</p>
            </div>
            <div>
              <span>TOOLS</span>
              <p>{work.technologies?.join(" / ") ?? "Web development"}</p>
            </div>
            {work.siteUrl && (
              <a
                className="textLink"
                href={work.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                公開サイトを開く <Arrow diagonal />
              </a>
            )}
          </div>
        </header>
        {isPokedex ? (
          <ProjectViewer priority />
        ) : (
          work.thumbnail && (
            <Image
              className={styles.thumbnail}
              src={work.thumbnail.url}
              alt={work.imageAlt ?? work.title}
              width={work.thumbnail.width}
              height={work.thumbnail.height}
              sizes="90vw"
              priority
            />
          )
        )}
        <div className={styles.articleBody}>
          <aside>
            <span className="eyebrow">OVERVIEW</span>
            <h2>何をつくったか。</h2>
          </aside>
          <div className={styles.content}>
            <RichTextBody content={work.content} />
          </div>
        </div>
        {isPokedex && (
          <section className={styles.structure}>
            <div>
              <span className="eyebrow">HOW IT WORKS</span>
              <h2>
                画面を支える、
                <br />
                三つの役割。
              </h2>
            </div>
            <div className={styles.accordions}>
              {pokedex.steps.map((step, index) => (
                <details key={step.title}>
                  <summary>
                    <span>0{index + 1}</span>
                    <h3>{step.title}</h3>
                    <span className="toggleMark" aria-hidden="true" />
                  </summary>
                  <p>{step.body}</p>
                </details>
              ))}
            </div>
          </section>
        )}
        {isPokedex && (
          <p className={styles.credit}>
            掲載画像は{pokedex.capturedOn}に公開中のアプリで撮影しました。ポケモンの画像・名称等の権利は各権利者に帰属します。本作品は学習目的の非公式アプリです。
          </p>
        )}
      </article>
      <Link className={`${styles.returnLink} insetLink`} href="/works">
        <Arrow /> 作品一覧に戻る
      </Link>
    </Container>
  );
}
