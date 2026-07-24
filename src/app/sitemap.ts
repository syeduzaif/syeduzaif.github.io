import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { featuredSlugs } from "@/data/caseStudies";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${base}/work/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/about/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...featuredSlugs.map((slug) => ({
      url: `${base}/work/${slug}/`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
