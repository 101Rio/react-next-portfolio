import type { Work } from "@/types/work";
import { pokedex } from "./pokedex";
import { profile } from "./profile";
export const sampleWorks: Work[] = [
  {
    id: "about-me-site",
    slug: "about-me-site",
    title: "自己紹介サイト",
    category: "個人サイト",
    description:
      "レトロなパソコンを入口に、専攻での学びや、音楽・野球などの好きなものを紹介するサイトです。",
    siteUrl: profile.personalSiteUrl,
    technologies: ["HTML", "CSS", "JavaScript"],
    imageAlt: "水色の「Rio Imai.」の文字と、名前を映すレトロPCのピクセルアート。",
    thumbnail: { url: "/images/works/about-me-cover.webp", width: 1280, height: 800 },
    content: [
      "トップでは、暗い紺色を背景に「Hello, I'm Rio Imai.」と名前をタイプ表示します。横に置いたピクセルアートのパソコンは、電源ボタンを押すと画面が消え、もう一度押すと点きます。",
      "「About」ではスーパーITエンジニア専攻での学びを、「Skills & Hobbies」では空手や野球観戦を紹介しています。「Favorites」にはPython、ラーメン、よく聴く音楽をまとめました。",
      "各ページをHTMLで組み、配色や文字組みは共通のCSSで揃えました。トップのパソコンやCDのイラストは、JavaScriptでCanvasに描いています。",
    ],
  },
  {
    id: "react-pokemon-zukan",
    slug: "react-pokemon-zukan",
    title: "Reactポケモン図鑑",
    category: "Webアプリケーション",
    description:
      "名前や図鑑番号で探したり、タイプ・特性・高さ・体重で絞り込んだりできる図鑑です。一匹の詳細から、別の姿や同じ特徴を持つポケモンをたどれます。",
    content: [
      "トップには、ページを開くたびに選ばれる6匹のピックアップがあります。好きな一匹から読み始めても、詳細検索で条件を決めてから探しても使えるようにしました。",
      "一覧は図鑑番号・名前・合計種族値で並べ替えられます。詳細ではイラストと一緒に図鑑説明や6つの種族値を読み、別の姿へ移ってタイプや数値の違いを見比べられます。",
      "ReactとTypeScriptで画面を組み、検索用の索引とイラストをアプリに同梱しました。全国図鑑番号と姿ごとのIDを使い分けることで、同じポケモンの姿をまとめて探せます。",
    ],
    siteUrl: pokedex.url,
    technologies: ["React", "TypeScript", "PokéAPI"],
    imageAlt: pokedex.screens[0].alt,
    thumbnail: {
      url: pokedex.screens[0].image,
      width: pokedex.screens[0].width,
      height: pokedex.screens[0].height,
    },
  },
];
