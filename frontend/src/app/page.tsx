"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [status, setStatus] = useState<"loading" | "online" | "offline">("loading");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined" && window.location.hostname !== "localhost"
      ? `${window.location.origin}/api`
      : "http://localhost:3001");

  useEffect(() => {
    // Check backend health
    fetch(API_URL)
      .then((res) => (res.ok ? setStatus("online") : setStatus("offline")))
      .catch(() => setStatus("offline"));
  }, [API_URL]);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    try {
      const response = await fetch(`${API_URL}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, customSlug }),
      });

      if (response.ok) {
        const data = await response.json();
        const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
        setShortenedUrl(`${baseUrl}/${data.slug}`);
      } else {
        console.error("Failed to shorten URL");
      }
    } catch (err) {
      console.error("Error shortening URL:", err);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center px-4 py-8 sm:py-0 sm:justify-center overflow-x-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-600/10 blur-[100px]" />

      <main className="z-10 w-full max-w-2xl text-center flex-1 flex flex-col justify-center py-12">
        <div className="mb-12 flex flex-col items-center">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-medium tracking-widest text-zinc-500 uppercase font-geist-mono">
              Bitly Clone v1.0
            </span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Shorten your <span className="text-blue-500">connections.</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400">
            A minimalist URL shortener built for speed, simplicity, and scaling.
          </p>
        </div>

        <form
          onSubmit={handleShorten}
          className="glass group relative mb-8 flex flex-col items-center rounded-2xl p-2 transition-all hover:scale-[1.01] animate-glow"
        >
          <div className="flex w-full flex-col sm:flex-row sm:items-center">
            <input
              type="url"
              placeholder="Paste your long link here..."
              className="w-full bg-transparent px-6 py-4 text-lg text-white outline-none placeholder:text-zinc-600 sm:flex-1"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 sm:mt-0 sm:ml-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-base font-semibold text-white transition-all hover:bg-blue-500 active:scale-95"
            >
              Shorten
            </button>
          </div>
          <div className="flex w-full items-center border-t border-zinc-800/50 px-6 py-4 overflow-hidden">
            <span className="text-zinc-500 text-xs sm:text-sm mr-2 whitespace-nowrap">Alias: shortnow.site/</span>
            <input
              type="text"
              placeholder="my-link"
              className="bg-transparent text-xs sm:text-sm text-blue-400 outline-none placeholder:text-zinc-700 min-w-0 flex-1"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
            />
          </div>
        </form>

        {/* Shortened URL Display */}
        {shortenedUrl && (
          <div className="glass flex flex-col sm:flex-row items-center justify-between rounded-2xl p-6 text-left animate-in fade-in slide-in-from-bottom-4 duration-500 gap-4 mb-12">
            <div className="w-full sm:w-auto overflow-hidden">
              <p className="text-sm text-zinc-500 mb-1">Success! Your link is ready:</p>
              <a href={shortenedUrl} target="_blank" className="text-lg sm:text-xl font-medium text-blue-400 hover:underline break-all">
                {shortenedUrl}
              </a>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shortenedUrl);
              }}
              className="w-full sm:w-auto rounded-lg bg-zinc-800 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
            >
              Copy
            </button>
          </div>
        )}

        <div className="mt-auto pt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-zinc-500 text-xs sm:text-sm border-t border-zinc-800/20">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${status === 'online' ? 'bg-green-500' : status === 'offline' ? 'bg-red-500' : 'bg-zinc-500'}`} />
            Backend: <span className="text-zinc-400 font-medium lowercase italic">{status === 'loading' ? 'checking...' : status}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500/50" />
            Database: <span className="text-zinc-400 font-medium">Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            Redis: <span className="text-zinc-400 font-medium">Active</span>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 text-center text-sm text-zinc-600 z-10">
        <p>© 2026 Bitly Clone • Built with NestJS & Next.js</p>
      </footer>
    </div>
  );
}
