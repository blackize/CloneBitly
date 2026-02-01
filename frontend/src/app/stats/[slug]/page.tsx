"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface LinkStats {
    slug: string;
    originalUrl: string;
    clickCount: number;
    createdAt: string;
}

export default function StatsPage() {
    const { slug } = useParams();
    const [stats, setStats] = useState<LinkStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL ||
        (typeof window !== "undefined" && window.location.hostname !== "localhost"
            ? `${window.location.origin}/api`
            : "http://localhost:3001");

    useEffect(() => {
        if (!slug) return;

        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_URL}/links/${slug}/stats`);
                if (!response.ok) {
                    throw new Error("Stats not found");
                }
                const data = await response.json();
                setStats(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [slug, API_URL]);

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
                <h1 className="text-4xl font-bold text-white">404</h1>
                <p className="mt-4 text-zinc-400">Oops! We couldn't find stats for this link.</p>
                <Link href="/" className="mt-8 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-500">
                    Back to Home
                </Link>
            </div>
        );
    }

    const shortUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/${stats.slug}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shortUrl)}&color=3b82f6&bgcolor=000000`;

    return (
        <div className="relative flex min-h-screen flex-col items-center bg-black px-4 py-12 md:py-24">
            {/* Background Orbs */}
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-600/10 blur-[100px]" />

            <div className="z-10 w-full max-w-2xl">
                <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12">
                    ← Back to Home
                </Link>

                <header className="mb-12">
                    <h1 className="text-3xl font-bold text-white mb-2">Link Performance</h1>
                    <p className="text-zinc-500 truncate">Stats for {shortUrl}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glass rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center md:col-span-2">
                        <span className="text-zinc-500 text-sm uppercase tracking-wider mb-2">Total Clicks</span>
                        <span className="text-7xl font-bold text-blue-500">{stats.clickCount}</span>
                    </div>

                    <div className="glass rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center">
                        <img
                            src={qrCodeUrl}
                            alt="QR Code"
                            className="w-32 h-32 rounded-lg mb-4"
                        />
                        <span className="text-zinc-500 text-xs">Dynamic QR Code</span>
                    </div>
                </div>

                <div className="glass rounded-2xl p-8 border border-white/5 space-y-6">
                    <div>
                        <label className="block text-sm text-zinc-500 uppercase tracking-wider mb-1">Original Destination</label>
                        <p className="text-lg text-white break-all">{stats.originalUrl}</p>
                    </div>
                    <div>
                        <label className="block text-sm text-zinc-500 uppercase tracking-wider mb-1">Created On</label>
                        <p className="text-lg text-white">{new Date(stats.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                    </div>
                </div>
            </div>

            <footer className="mt-auto pt-12 text-zinc-600 text-sm">
                © 2026 Shortnow Analytics • Built with speed in mind.
            </footer>
        </div>
    );
}
