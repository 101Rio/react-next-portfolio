import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { RichTextBody } from "@/components/RichTextBody";
import { Arrow } from "@/components/Arrow";
import { formatDate } from "@/lib/format-date";
import { getPostBySlug, getPosts } from "@/lib/posts";
import styles from "./page.module.css";
type PageProps = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return post
    ? { title: post.title, description: post.description }
    : { title: "記事が見つかりません" };
}
export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const posts = await getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const next = posts.length > 1 ? posts[(index + 1) % posts.length] : null;
  return (
    <Container className={styles.page}>
      <article>
        <header className={styles.header}>
          <Link className={styles.backLink} href="/blog">
            <span className={styles.backArrow} aria-hidden="true">←</span>
            <span className="navUnderline">ALL NOTES</span>
          </Link>
          <span className="eyebrow">NOTES / LEARNING NOTE</span>
          <h1>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>
          <div className={styles.meta}>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span>{post.isSample ? "授業用サンプル" : "BY RIO IMAI"}</span>
          </div>
        </header>
        {post.thumbnail && !post.isSample && (
          <figure className={styles.figure}>
            <Image
              className={styles.thumbnail}
              src={post.thumbnail.url}
              alt={`${post.title}のアイキャッチ`}
              width={post.thumbnail.width}
              height={post.thumbnail.height}
              sizes="(max-width:600px) 90vw, 80vw"
              priority
            />
          </figure>
        )}
        <div className={styles.articleBody}>
          <aside>
            <span className="eyebrow">
              NOTE / {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.readLabel}>
              制作の流れを、
              <br />
              知るために。
            </span>
          </aside>
          <div className={styles.content}>
            <RichTextBody content={post.content} />
          </div>
        </div>
      </article>
      {next && (
        <Link className={`${styles.next} insetLink`} href={`/blog/${next.slug}`}>
          <span>READ NEXT</span>
          <strong>{next.title}</strong>
          <Arrow diagonal />
        </Link>
      )}
      <Link className="textLink" href="/blog">
        すべての記事へ
        <Arrow />
      </Link>
    </Container>
  );
}
