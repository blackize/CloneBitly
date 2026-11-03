import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  description:
    "Fast, simple, and powerful URL shortening for your links. Track clicks and manage your connections with Shortnow.",
  keywords: ["url shortener", "bitly clone", "link management", "fast redirect"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "Shortnow | Minimalist URL Shortener",
    description: "Fast, simple, and powerful URL shortening.",
    url: "https://shortnow.site",
    siteName: "Shortnow",
    images: [
      {
        url: "/logo.png",
        width: 256,
        height: 256,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shortnow | Minimalist URL Shortener",
    description: "Fast, simple, and powerful URL shortening.",
    images: ["/logo.png"],
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
      </body>
    </html>
  );
}
