import { MetadataRoute } from "next";
import { SEO_TOOLS } from "@/data/seo-tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const toolEntries: MetadataRoute.Sitemap = SEO_TOOLS.map((tool) => ({
    url: `https://shortnow.site/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: "https://shortnow.site",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://shortnow.site/tools",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...toolEntries,
  ];
}
