import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { profile } from "@/data/profile";
import { Experience } from "@/components/Experience";
import { initializeOpening, Opening } from "@/components/Opening";
import "./globals.css";

// サンプルは静的生成。CMS接続時は no-store の取得が動的表示を選択します。

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Web Portfolio`,
    template: `%s | ${profile.name}`,
  },
  description:
    "京都でWeb制作を学ぶRio Imaiのポートフォリオ。自己紹介サイトやReactポケモン図鑑など、制作したサイトとアプリ、その制作過程を紹介します。",
  icons: { icon: "/favicon.svg" },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/geist.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: initializeOpening }} />
      </head>
      <body id="top">
        <Opening />
        <Experience>
          <div className="siteFrame">
            <SiteHeader />
            <div id="page-content">
              <main id="main-content">{children}</main>
              <SiteFooter />
            </div>
          </div>
        </Experience>
      </body>
    </html>
  );
}
