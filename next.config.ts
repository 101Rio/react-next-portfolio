import type { NextConfig } from "next";
const staticExport = process.env.PORTFOLIO_STATIC_EXPORT === "1";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(staticExport ? { output: "export" as const } : {}),
  trailingSlash: true,
  devIndicators: false,
  experimental: { cpus: 2 },
  images: {
    unoptimized: staticExport,
    remotePatterns: [
      { protocol: "https", hostname: "images.microcms-assets.io" },
    ],
  },
};
export default nextConfig;
