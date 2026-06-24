import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shortnow.site"),
  title: "Shortnow | Minimalist URL Shortener",
  description: "Fast, simple, and powerful URL shortening for your links. Track clicks and manage your connections with Shortnow.",
  keywords: ["url shortener", "bitly clone", "link management", "fast redirect"],
  openGraph: {
    title: "Shortnow | Minimalist URL Shortener",
    description: "Fast, simple, and powerful URL shortening.",
    url: "https://shortnow.site",
    siteName: "Shortnow",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shortnow | Minimalist URL Shortener",
    description: "Fast, simple, and powerful URL shortening.",
    images: ["/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
