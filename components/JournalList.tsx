"use client";
import { useState } from "react";
import { PostCard } from "./PostCard";
import type { Post } from "@/types/post";
import styles from "./JournalList.module.css";
export function JournalList({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const filtered = posts.filter((post) =>
    (post.title + " " + post.description)
      .toLocaleLowerCase()
      .includes(query.trim().toLocaleLowerCase()),
  );
  return (
    <>
      <div className={styles.toolbar}>
        <span aria-live="polite">
          {String(filtered.length).padStart(2, "0")} NOTES
        </span>
        <label className={styles.search}>
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="6" stroke="currentColor" />
            <path d="m15 15 6 6" stroke="currentColor" />
          </svg>
          <input
            type="search"
            placeholder="記事を検索"
            aria-label="記事を検索"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <div>
        {filtered.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
        {!filtered.length && (
          <div className={styles.empty}>
            <p>「{query}」に一致する記事は見つかりませんでした。</p>
            <button onClick={() => setQuery("")}>すべての記事を表示 ↗</button>
          </div>
        )}
      </div>
    </>
  );
}
