import Link from "next/link";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { WorkGrid } from "@/components/WorkCard";
import { Arrow } from "@/components/Arrow";
import { PostCard } from "@/components/PostCard";
import { WaveText } from "@/components/WaveText";
import { getPosts } from "@/lib/posts";
import { getWorks } from "@/lib/works";
import styles from "./page.module.css";
export default async function HomePage() {
  const [works, posts] = await Promise.all([getWorks(), getPosts()]);
  const publishedWorks = works.filter((work) => !work.isSample);
  return (
    <>
      <Hero hasWorks={publishedWorks.length > 0} />
      {publishedWorks.length > 0 && (
        <section id="selected-works" className={styles.works} aria-labelledby="works-title">
          <Container>
            <header className={styles.worksHead}>
              <h2 id="works-title" className="sectionTitle" lang="en"><WaveText text="Works." trigger="viewport" /></h2>
              <Link href="/works" className="textLink">作品一覧 <Arrow /></Link>
            </header>
            <WorkGrid works={publishedWorks.slice(0, 2)} headingLevel="h3" />
          </Container>
        </section>
      )}
      <section className={styles.about} aria-labelledby="about-title">
        <Container>
          <div className={styles.aboutGrid}>
            <header>
              <span className="eyebrow">02 / ABOUT</span>
              <h2 id="about-title" className="sectionTitle" lang="en">
                <WaveText text="About." trigger="viewport" />
              </h2>
            </header>
            <div data-reveal>
              <h3>
                つくりながら、
                <br />
                仕組みを覚える。
              </h3>
              <p>
                京都の専門学校で、Web制作を学んでいます。
                <br />
                HTML・CSSやReactで制作を重ねています。
                <br className={styles.desktopBreak} />
                作りたいと思ったサイトやアプリを、自分の手で形にするのが目標です。
              </p>
              <Link className="textLink" href="/profile">
                プロフィール <Arrow diagonal />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <section className={styles.notes}>
        <Container>
          <header className={styles.sectionHeader}>
            <div>
              <span className="eyebrow">03 / LEARNING NOTES</span>
              <h2 className="sectionTitle" lang="en">
                <WaveText text="Notes." trigger="viewport" />
              </h2>
            </div>
            <div className={styles.notesIntro}>
              <p>
                {posts.length > 0 && posts.every((post) => post.isSample)
                  ? "現在は授業用サンプル記事を掲載しています。"
                  : "Web制作で試したこと、学んだことを記録しています。"}
              </p>
              <Link className="textLink" href="/blog">
                記事一覧 <Arrow />
              </Link>
            </div>
          </header>
          {posts.slice(0, 3).map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              headingLevel="h3"
              index={index}
            />
          ))}
        </Container>
      </section>
    </>
  );
}
