import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeading } from "@/components/PageHeading";
import { JournalList } from "@/components/JournalList";
import { getPosts } from "@/lib/posts";
import styles from "./page.module.css";
export const metadata: Metadata = {
  title: "Notes — 学びの記録",
  description: "Rio ImaiのWeb制作と学習の記録。",
};
export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <Container className={styles.page}>
      <header className={styles.header}>
        <PageHeading label="03 / LEARNING NOTES" title="Notes." />
        <p>
          {posts.length > 0 && posts.every((post) => post.isSample)
            ? "現在は授業用サンプル記事を掲載しています。"
            : "Web制作で試したこと、学んだことを記録しています。"}
        </p>
      </header>
      <JournalList posts={posts} />
    </Container>
  );
}
