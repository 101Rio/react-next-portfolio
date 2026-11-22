import type { Thumbnail } from "@/types/media";
export type Work = {
  id: string;
  slug: string;
  title: string;
  description: string;
  // 初期データは段落配列、CMS移行後はHTML文字列。
  content: string | string[];
  thumbnail?: Thumbnail;
  siteUrl?: string;
  category?: string;
  technologies?: string[];
  isSample?: boolean;
  imageAlt?: string;
};
