import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./Arrow";
import type { Work } from "@/types/work";
import styles from "./WorkCard.module.css";

type HeadingLevel = "h2" | "h3";

export function WorkGrid({
  works,
  headingLevel = "h2",
}: {
  works: Work[];
  headingLevel?: HeadingLevel;
}) {
  return (
    <div className={styles.grid}>
      {works.map((work, index) => (
        <WorkCard key={work.id} work={work} headingLevel={headingLevel} index={index} />
      ))}
    </div>
  );
}

export function WorkCard({
  work,
  headingLevel: Heading = "h2",
  index = 0,
}: {
  work: Work;
  headingLevel?: HeadingLevel;
  index?: number;
}) {
  return (
    <article className={styles.card} data-reveal>
      {work.thumbnail && (
        <div className={styles.visual}>
          <Image
            src={work.thumbnail.url}
            alt={work.imageAlt ?? work.title}
            width={work.thumbnail.width}
            height={work.thumbnail.height}
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(max-width: 700px) 94vw, (max-width: 1680px) 46vw, 760px"
          />
        </div>
      )}
      {work.technologies?.length ? (
        <p className={styles.tools}>{work.technologies.join(" / ")}</p>
      ) : null}
      <Heading className={styles.title}>{work.title}</Heading>
      <p className={styles.description}>{work.description}</p>
      <div className={styles.actions}>
        <Link
          href={`/works/${work.slug}`}
          className={styles.caseLink}
          aria-label={`${work.title}の制作メモを読む`}
        >
          制作メモ
        </Link>
        {work.siteUrl && (
          <a
            className={styles.siteLink}
            href={work.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${work.title}の公開サイトを開く（新しいタブ）`}
          >
            公開サイトを開く <Arrow diagonal />
          </a>
        )}
      </div>
    </article>
  );
}
