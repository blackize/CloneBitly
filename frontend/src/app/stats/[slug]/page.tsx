"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface LinkStats {
  slug: string;
  originalUrl: string;
  clickCount: number;
  createdAt: string;
}

export default function StatsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [stats, setStats] = useState<LinkStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [proPromptFeature, setProPromptFeature] = useState<string | null>(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined" && window.location.hostname !== "localhost"
      ? `${window.location.origin}/api`
      : "http://localhost:3001/api");

  const fetchStats = useCallback(
    async (isRefresh = false) => {
      if (!slug) return;
      if (isRefresh) setRefreshing(true);
      try {
        const response = await fetch(`${API_URL}/links/${slug}/stats`);
        if (!response.ok) {
          throw new Error("Stats not found");
        }
        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [slug, API_URL]
  );

  useEffect(() => {
    fetchStats(false);
  }, [fetchStats]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
        <h1 className="text-4xl font-bold text-white">Link Not Claimed Yet</h1>
        <p className="mt-4 max-w-md text-zinc-400">
          No short link exists for <code className="text-blue-400">shortnow.site/{slug}</code> yet.
          Want to claim this custom alias right now for free?
        </p>
        <Link
          href={`/?claim=${encodeURIComponent(slug || "")}`}
          className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          Claim shortnow.site/{slug} Free →
        </Link>
      </div>
    );
  }

  const shortUrl = `${
    typeof window !== "undefined" ? window.location.origin : "https://shortnow.site"
  }/${stats.slug}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    shortUrl
  )}&color=3b82f6&bgcolor=0a0a0a`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-black px-4 py-12 md:py-20 overflow-x-hidden">
      {/* Background Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-600/10 blur-[100px]"
      />

      <main className="z-10 w-full max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-sm font-semibold text-white hover:text-blue-400 transition-colors"
          >
            <img
              src="/logo.png"
              alt="Shortnow logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span>Short<span className="text-blue-500">now</span></span>
            <span className="text-zinc-500 font-normal ml-1">← Home</span>
          </Link>
          <button
            type="button"
            onClick={() => fetchStats(true)}
            disabled={refreshing}
            className="rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
          >
            {refreshing ? "Refreshing..." : "↻ Refresh Live Count"}
          </button>
        </div>

        <header className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Real-Time Link Telemetry
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mt-1 truncate">
              shortnow.site/{stats.slug}
            </h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors cursor-pointer"
            >
              {copied ? "✓ Copied!" : "Copy Short URL"}
            </button>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Open Link ↗
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-2xl p-8 border border-white/10 flex flex-col items-center justify-center md:col-span-2">
            <span className="text-zinc-400 text-xs uppercase tracking-wider mb-2">
              Total Verified Clicks &amp; QR Scans
            </span>
            <span className="text-7xl font-bold text-blue-500">{stats.clickCount}</span>
            <span className="mt-3 text-xs text-zinc-500">
              Updated in real time via Redis + PostgreSQL
            </span>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center">
            <img
              src={qrCodeUrl}
              alt={`QR Code for ${shortUrl}`}
              width={144}
              height={144}
              className="w-36 h-36 rounded-lg mb-3"
            />
            <a
              href={qrCodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={`shortnow-${stats.slug}-qr.png`}
              className="text-xs font-semibold text-blue-400 hover:underline"
            >
              ⬇ Download PNG QR
            </a>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8 border border-white/10 space-y-5 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">
                Original Destination URL
              </div>
              <p className="text-base text-white break-all">{stats.originalUrl}</p>
            </div>
            <button
              type="button"
              onClick={() => setProPromptFeature("Edit Destination URL")}
              className="self-start sm:self-center shrink-0 rounded-lg bg-zinc-900 border border-zinc-700/80 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-blue-500/50 hover:text-white transition-colors cursor-pointer"
            >
              ✏️ Edit Destination (Pro)
            </button>
          </div>
          <div className="border-t border-zinc-800/80 pt-4 flex flex-wrap items-center justify-between gap-4 text-sm">
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-wider block mb-0.5">
                Created On
              </span>
              <span className="text-white">
                {new Date(stats.createdAt).toLocaleDateString(undefined, { dateStyle: "long" })}
              </span>
            </div>
            <div className="text-xs text-zinc-400">
              Shortcut: <code className="text-blue-400">shortnow.site/{stats.slug}+</code>
            </div>
          </div>
        </div>

        {/* Pro Telemetry Demand Validation Cards */}
        <section className="glass rounded-2xl p-6 border border-white/10 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-base font-semibold text-white">
                Deep Audience Telemetry &amp; Dynamic Controls
              </h2>
              <p className="text-xs text-zinc-400">
                Unlock country breakdown, referrer sources, device OS, and editable destination URLs.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setProPromptFeature("Pro Analytics Suite")}
              className="rounded-xl bg-blue-600/20 border border-blue-500/40 px-4 py-2 text-xs font-semibold text-blue-300 hover:bg-blue-600/30 transition-colors cursor-pointer"
            >
              🔒 Unlock Pro Workspace
            </button>
          </div>

          {proPromptFeature && (
            <div
              role="status"
              aria-live="polite"
              className="mt-3 rounded-xl bg-blue-500/10 border border-blue-500/30 p-4 text-xs text-blue-200"
            >
              <strong>{proPromptFeature}</strong> is launching in Shortnow Pro ($5/mo). Your
              existing links stored in this browser will automatically sync when Pro accounts open!
            </div>
          )}
        </section>

        {/* Viral Acquisition Loop Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-zinc-900 border border-blue-500/30 p-6 text-center">
          <h2 className="text-lg font-bold text-white">
            Want to track your own links &amp; QR codes for free?
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-300">
            Create custom short URLs, UTM campaign links, and dynamic QR codes in 2 seconds — no
            login required.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Create Free Short Link →
            </Link>
            <Link
              href="/tools/qr-code-generator"
              className="rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-2.5 text-xs font-medium text-zinc-200 hover:bg-zinc-800 transition-colors"
            >
              Free QR Generator
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-auto pt-12 text-zinc-500 text-xs">
        © 2026 Shortnow Analytics • Powered by NestJS, PostgreSQL &amp; Redis
      </footer>
    </div>
  );
}
