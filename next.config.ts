import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages (user page: https://syeduzaif.github.io).
 * - output: "export"  → emits a fully static site to ./out
 * - images.unoptimized → GitHub Pages has no image optimization server
 * - trailingSlash      → route/ resolves to route/index.html on Pages
 * No basePath/assetPrefix needed: a user page is served from the domain root.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
