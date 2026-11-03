import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingTemplate from "@/components/SeoLandingTemplate";
import { SEO_TOOLS, getSeoToolBySlug } from "@/data/seo-tools";

interface ToolPageProps {
  params: Promise<{ tool: string }>;
}

export async function generateStaticParams() {
  return SEO_TOOLS.map((item) => ({
    tool: item.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { tool } = await params;
  const config = getSeoToolBySlug(tool);

  if (!config) {
    return {
      title: "Tool Not Found | Shortnow",
    };
  }

  const canonicalUrl = `https://shortnow.site/tools/${config.slug}`;

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: canonicalUrl,
      siteName: "Shortnow",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.metaTitle,
      description: config.metaDescription,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { tool } = await params;
  const config = getSeoToolBySlug(tool);

  if (!config) {
    notFound();
  }

  return <SeoLandingTemplate config={config} />;
}

