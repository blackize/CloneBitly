import type { Metadata } from "next";
import Link from "next/link";
import { SEO_TOOLS } from "@/data/seo-tools";

export const metadata: Metadata = {
  title: "Free Link Shortener, QR Code & UTM Marketing Tools | Shortnow",
  description:
    "Explore Shortnow's suite of free link management utilities: Dynamic QR Code Generator, UTM Link Builder, Real-Time Click Tracker, Custom URL Shortener, and more.",
  alternates: {
    canonical: "https://shortnow.site/tools",
  },
};

export default function ToolsDirectoryPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-x-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-96 -right-24 h-96 w-96 rounded-full bg-indigo-600/10 blur-[110px]"
      />

      <header className="z-20 w-full border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Shortnow logo"
              width={36}
              height={36}
              fetchPriority="high"
              className="h-9 w-9 object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-lg font-bold tracking-tight text-white">
              Short<span className="text-blue-500">now</span>
            </span>
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            ← Main Shortener
          </Link>
        </div>
      </header>

      <main className="z-10 w-full max-w-5xl px-4 py-16">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
            100% Free • No Login Required
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Shortnow <span className="text-blue-500">Link &amp; QR Toolkit</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            Every specialized tool below runs on our sub-15ms Redis redirect engine and includes
            real-time click analytics and downloadable QR codes out of the box.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SEO_TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="glass group rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="mb-3 inline-flex items-center rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[11px] font-medium text-blue-400">
                  {tool.badge}
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {tool.navTitle}
                </h2>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{tool.subtitle}</p>
              </div>
              <div className="mt-6 flex items-center text-xs font-semibold text-blue-400">
                Open {tool.navTitle} →
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

