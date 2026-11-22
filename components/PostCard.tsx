import Link from "next/link";
import { Arrow } from "./Arrow";
import { formatDate } from "@/lib/format-date";
import type { Post } from "@/types/post";
import styles from "./PostCard.module.css";
export function PostCard({
  post,
  headingLevel = "h2",
  index = 0,
}: {
  post: Post;
  headingLevel?: "h2" | "h3";
  index?: number;
}) {
  const Heading = headingLevel;
  return (
    <article className={styles.post} data-reveal>
      <Link href={`/blog/${post.slug}`}>
        <span className={styles.index}>0{index + 1}</span>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <div className={styles.body}>
          <Heading>{post.title}</Heading>
          <p>{post.description}</p>
        </div>
        <span className={styles.tag}>
          {post.isSample ? "授業用サンプル" : "LEARNING NOTE"}
        </span>
        <span className={styles.arrow}>
          <Arrow diagonal />
        </span>
      </Link>
    </article>
  );
}
