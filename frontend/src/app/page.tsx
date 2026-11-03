import type { Metadata } from "next";
import SeoLandingTemplate from "@/components/SeoLandingTemplate";
import { HOME_SEO_CONFIG } from "@/data/seo-tools";

export const metadata: Metadata = {
  title: HOME_SEO_CONFIG.metaTitle,
  description: HOME_SEO_CONFIG.metaDescription,
  keywords: HOME_SEO_CONFIG.keywords,
  alternates: {
    canonical: "https://shortnow.site",
  },
  openGraph: {
    title: HOME_SEO_CONFIG.metaTitle,
    description: HOME_SEO_CONFIG.metaDescription,
    url: "https://shortnow.site",
    siteName: "Shortnow",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_SEO_CONFIG.metaTitle,
    description: HOME_SEO_CONFIG.metaDescription,
  },
};

export default function Home() {
  return <SeoLandingTemplate config={HOME_SEO_CONFIG} />;
}
