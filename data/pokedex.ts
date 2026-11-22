export const pokedex = {
  url: "https://101rio.github.io/react-pokemon-zukan/",
  detailUrl: "https://101rio.github.io/react-pokemon-zukan/#/pokemon/6",
  capturedOn: "2026年11月22日",
  screens: [
    {
      label: "一覧",
      image: "/images/works/pokedex-pickup.jpg",
      width: 1348,
      height: 936,
      alt: "図鑑の一覧画面。サダイジャのピックアップの下に検索欄とポケモンのカードが並ぶ。",
      caption: "ピックアップの6匹から選ぶか、名前や図鑑番号で検索する。",
      path: "#/",
    },
    {
      label: "詳細",
      image: "/images/works/pokedex-charizard.jpg",
      width: 1348,
      height: 936,
      alt: "リザードンの詳細画面。イラストの横にタイプ、高さ1.7 m、体重90.5 kg、特性と6つの種族値が並ぶ。",
      caption: "リザードンの高さや体重を選ぶと、同じ値を持つポケモンを探せる。",
      path: "#/pokemon/6",
    },
  ],
  steps: [
    {
      title: "検索用のデータをまとめる",
      body: "PokéAPIのデータから、名前・タイプ・特性・高さ・体重などを検索できる索引を作り、JSONとして図鑑に同梱しています。全国図鑑番号が同じ姿にも個別のIDがあるので、通常の姿とメガシンカ後のすがたを区別できます。",
    },
    {
      title: "条件を組み合わせて探す",
      body: "日本語名・英語名・図鑑番号で探せます。詳細検索では二つのタイプを同時に指定したり、世代や特性で絞ったりできます。条件と並び順はURLに残るので、見つけた一覧をそのまま開き直せます。",
    },
    {
      title: "一匹から別の姿をたどる",
      body: "たとえばリザードンの名前を押すと、同じ全国図鑑番号の姿が一覧に並びます。「同じポケモンの姿」からは、メガリザードンX・Yなどの詳細へ直接移動できます。タイプ・特性・高さ・体重も、それぞれ次の検索の入口です。",
    },
  ],
} as const;
