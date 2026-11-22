export const navigation = [
  { href: "/works", label: "Works", ja: "制作したもの" },
  { href: "/profile", label: "About", ja: "わたしについて" },
  { href: "/blog", label: "Notes", ja: "学びの記録" },
] as const;

export function currentSection(pathname: string, href: string) {
  if (pathname === href || pathname === `${href}/`) return "page";
  if (href !== "/" && pathname.startsWith(`${href}/`)) return "location";
  return undefined;
}
