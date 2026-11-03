"use client";

import { useState, useEffect, useId, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ToolMode } from "@/data/seo-tools";

export interface StoredShortLink {
  slug: string;
  originalUrl: string;
  createdAt: string;
  clickCount?: number;
}

const STORAGE_KEY = "shortnow_recent_links";

interface ShortenerWidgetProps {
  mode?: ToolMode;
  urlPlaceholder?: string;
  aliasPlaceholder?: string;
  ctaButtonText?: string;
}

export default function ShortenerWidget({
  mode = "default",
  urlPlaceholder = "Paste your long link here (https://...)",
  aliasPlaceholder = "my-link",
  ctaButtonText = "Shorten URL",
}: ShortenerWidgetProps) {
  const router = useRouter();
  const formId = useId();
  const urlInputId = `${formId}-url`;
  const aliasInputId = `${formId}-alias`;
  const utmSourceId = `${formId}-utm-source`;
  const utmMediumId = `${formId}-utm-medium`;
  const utmCampaignId = `${formId}-utm-campaign`;
  const utmContentId = `${formId}-utm-content`;

  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [utmContent, setUtmContent] = useState("");

  const [status, setStatus] = useState<"loading" | "online" | "offline">("loading");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [claimedBannerSlug, setClaimedBannerSlug] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const [latestLink, setLatestLink] = useState<StoredShortLink | null>(null);
  const [recentLinks, setRecentLinks] = useState<StoredShortLink[]>([]);
  const [refreshingStats, setRefreshingStats] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined" && window.location.hostname !== "localhost"
      ? `${window.location.origin}/api`
      : "http://localhost:3001/api");

  const getOrigin = () =>
    typeof window !== "undefined" ? window.location.origin : "https://shortnow.site";

  // Build final URL including optional UTM tags
  const buildFinalUrl = useCallback(
    (rawUrl: string) => {
      const trimmed = rawUrl.trim();
      if (!trimmed) return "";
      if (mode !== "utm" || (!utmSource && !utmMedium && !utmCampaign && !utmContent)) {
        return trimmed;
      }
      try {
        const parsed = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
        if (utmSource.trim()) parsed.searchParams.set("utm_source", utmSource.trim());
        if (utmMedium.trim()) parsed.searchParams.set("utm_medium", utmMedium.trim());
        if (utmCampaign.trim()) parsed.searchParams.set("utm_campaign", utmCampaign.trim());
        if (utmContent.trim()) parsed.searchParams.set("utm_content", utmContent.trim());
        return parsed.toString();
      } catch {
        return trimmed;
      }
    },
    [mode, utmSource, utmMedium, utmCampaign, utmContent]
  );

  // Fetch live click counts for stored links
  const refreshRecentCounts = useCallback(
    async (linksToRefresh: StoredShortLink[]) => {
      if (!linksToRefresh.length) return;
      setRefreshingStats(true);
      try {
        const updated = await Promise.all(
          linksToRefresh.slice(0, 8).map(async (item) => {
            try {
              const res = await fetch(`${API_URL}/links/${item.slug}/stats`);
              if (res.ok) {
                const data = await res.json();
                return { ...item, clickCount: data.clickCount ?? item.clickCount ?? 0 };
              }
            } catch {
              // ignore individual stat fetch failure
            }
            return item;
          })
        );
        setRecentLinks(updated);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }
      } finally {
        setRefreshingStats(false);
      }
    },
    [API_URL]
  );

  useEffect(() => {
    // Check backend health
    fetch(API_URL)
      .then((res) => (res.ok ? setStatus("online") : setStatus("offline")))
      .catch(() => setStatus("offline"));

    // Load recent links from localStorage and check ?claim= query param
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const claimParam = params.get("claim")?.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 20);
      if (claimParam && claimParam.length >= 2) {
        setCustomSlug(claimParam);
        setClaimedBannerSlug(claimParam);
      }

      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as StoredShortLink[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRecentLinks(parsed);
            refreshRecentCounts(parsed);
          }
        }
      } catch {
        // ignore malformed localStorage
      }
    }
  }, [API_URL, refreshRecentCounts]);

  const handleCopy = async (shortUrl: string, slugKey: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedSlug(slugKey);
      setTimeout(() => setCopiedSlug(null), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  const handleRemoveRecent = (slugToRemove: string) => {
    const next = recentLinks.filter((item) => item.slug !== slugToRemove);
    setRecentLinks(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const rawInput = url.trim();
    if (!rawInput) return;

    // In tracker mode, if user enters a shortnow.site URL or a bare slug, open stats directly
    if (mode === "tracker") {
      const cleaned = rawInput.replace(/\/+$/, "").replace(/\+$/, "");
      if (cleaned.includes("shortnow.site/")) {
        const extractedSlug = cleaned.split("shortnow.site/").pop()?.split("?")[0];
        if (extractedSlug && !extractedSlug.includes("/")) {
          router.push(`/stats/${extractedSlug}`);
          return;
        }
      } else if (!cleaned.includes(".") && !cleaned.startsWith("http")) {
        router.push(`/stats/${cleaned}`);
        return;
      }
    }

    const destinationUrl = buildFinalUrl(
      rawInput.startsWith("http://") || rawInput.startsWith("https://")
        ? rawInput
        : `https://${rawInput}`
    );

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: destinationUrl,
          customSlug: customSlug.trim() || undefined,
        }),
      });

      if (!response.ok) {
        let serverMessage = "";
        try {
          const errJson = await response.json();
          serverMessage = Array.isArray(errJson.message)
            ? errJson.message.join(" ")
            : errJson.message;
        } catch {
          // ignore JSON parse failure
        }
        if (response.status === 409) {
          throw new Error(serverMessage || "This custom alias is already taken. Try another slug!");
        }
        throw new Error(
          serverMessage || "Could not shorten this link right now. Please check the URL and try again."
        );
      }

      const data = await response.json();
      const created: StoredShortLink = {
        slug: data.slug,
        originalUrl: data.originalUrl || destinationUrl,
        createdAt: data.createdAt || new Date().toISOString(),
        clickCount: data.clickCount ?? 0,
      };

      setLatestLink(created);
      setClaimedBannerSlug(null);
      setUrl("");
      setCustomSlug("");

      const updatedRecent = [
        created,
        ...recentLinks.filter((item) => item.slug !== created.slug),
      ].slice(0, 8);

      setRecentLinks(updatedRecent);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecent));
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Unexpected error while shortening URL.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const latestShortUrl = latestLink ? `${getOrigin()}/${latestLink.slug}` : "";
  const latestQrUrl = latestLink
    ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
        latestShortUrl
      )}&color=3b82f6&bgcolor=0a0a0a`
    : "";

  const previewUtmUrl = mode === "utm" && url.trim() ? buildFinalUrl(url) : "";

  return (
    <div className="w-full max-w-3xl mx-auto">
      {claimedBannerSlug && (
        <div
          role="status"
          aria-live="polite"
          className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-blue-500/40 bg-blue-500/10 px-5 py-3.5 text-left text-sm text-blue-200"
        >
          <span>
            ✨ <strong className="font-mono text-white">shortnow.site/{claimedBannerSlug}</strong> is
            available! Paste any destination URL below to claim this custom link for free.
          </span>
          <button
            type="button"
            onClick={() => setClaimedBannerSlug(null)}
            aria-label="Dismiss availability notice"
            className="text-xs text-blue-300 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="glass group relative mb-6 flex flex-col rounded-2xl p-3 sm:p-4 transition-all animate-glow border border-white/10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label htmlFor={urlInputId} className="sr-only">
            Destination URL
          </label>
          <input
            id={urlInputId}
            name="url"
            type={mode === "tracker" ? "text" : "url"}
            placeholder={urlPlaceholder}
            className="w-full bg-transparent px-4 py-3.5 text-base sm:text-lg text-white outline-none placeholder:text-zinc-500 sm:flex-1 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
            required
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm sm:px-7 sm:py-4 sm:text-base font-semibold text-white transition-all hover:bg-blue-500 active:scale-95 disabled:opacity-60 cursor-pointer shrink-0"
          >
            {isSubmitting ? "Processing..." : ctaButtonText}
          </button>
        </div>

        {/* UTM Builder Extra Fields */}
        {mode === "utm" && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-zinc-800/70 pt-3 px-2 text-left">
            <div>
              <label
                htmlFor={utmSourceId}
                className="block text-xs font-medium text-zinc-400 mb-1"
              >
                Campaign Source (<code className="text-blue-400">utm_source</code>)
              </label>
              <input
                id={utmSourceId}
                name="utm_source"
                type="text"
                placeholder="e.g. newsletter, instagram, google"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={utmSource}
                onChange={(e) => setUtmSource(e.target.value)}
                className="w-full rounded-lg bg-zinc-900/90 border border-zinc-800 px-3 py-2 text-sm text-white outline-none focus-visible:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor={utmMediumId}
                className="block text-xs font-medium text-zinc-400 mb-1"
              >
                Campaign Medium (<code className="text-blue-400">utm_medium</code>)
              </label>
              <input
                id={utmMediumId}
                name="utm_medium"
                type="text"
                placeholder="e.g. cpc, bio, email, social"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={utmMedium}
                onChange={(e) => setUtmMedium(e.target.value)}
                className="w-full rounded-lg bg-zinc-900/90 border border-zinc-800 px-3 py-2 text-sm text-white outline-none focus-visible:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor={utmCampaignId}
                className="block text-xs font-medium text-zinc-400 mb-1"
              >
                Campaign Name (<code className="text-blue-400">utm_campaign</code>)
              </label>
              <input
                id={utmCampaignId}
                name="utm_campaign"
                type="text"
                placeholder="e.g. black_friday_2026"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={utmCampaign}
                onChange={(e) => setUtmCampaign(e.target.value)}
                className="w-full rounded-lg bg-zinc-900/90 border border-zinc-800 px-3 py-2 text-sm text-white outline-none focus-visible:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor={utmContentId}
                className="block text-xs font-medium text-zinc-400 mb-1"
              >
                Campaign Content (<code className="text-zinc-500">utm_content</code> optional)
              </label>
              <input
                id={utmContentId}
                name="utm_content"
                type="text"
                placeholder="e.g. hero_button_a"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={utmContent}
                onChange={(e) => setUtmContent(e.target.value)}
                className="w-full rounded-lg bg-zinc-900/90 border border-zinc-800 px-3 py-2 text-sm text-white outline-none focus-visible:border-blue-500"
              />
            </div>
            {previewUtmUrl && (
              <div className="sm:col-span-2 rounded-lg bg-zinc-950/80 border border-zinc-800/80 px-3 py-2 text-xs text-zinc-400 break-all">
                <span className="text-zinc-500 font-medium mr-1">Tagged URL Preview:</span>
                {previewUtmUrl}
              </div>
            )}
          </div>
        )}

        {/* Custom Alias Row */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/60 px-4 pt-3 pb-1 text-left">
          <div className="flex items-center flex-1 min-w-[240px]">
            <label
              htmlFor={aliasInputId}
              className="text-zinc-400 text-xs sm:text-sm mr-1.5 shrink-0"
            >
              Custom Alias (optional): <span className="text-zinc-300 font-mono">shortnow.site/</span>
            </label>
            <input
              id={aliasInputId}
              name="customSlug"
              type="text"
              maxLength={20}
              placeholder={aliasPlaceholder}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="bg-transparent text-xs sm:text-sm font-mono text-blue-400 outline-none placeholder:text-zinc-600 flex-1 min-w-[100px]"
              value={customSlug}
              onChange={(e) => {
                setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""));
                if (errorMsg) setErrorMsg(null);
              }}
            />
          </div>
          <span className="text-[11px] text-zinc-500 hidden sm:inline">
            Tip: Add <code className="text-zinc-300">+</code> to any link to view stats
          </span>
        </div>
      </form>

      {/* Dynamic Error / Status Message */}
      <div aria-live="polite">
        {errorMsg && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 text-left">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Latest Shortened URL & QR Result Card */}
      {latestLink && (
        <div className="glass mb-8 rounded-2xl p-6 text-left border border-blue-500/30 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400 mb-3">
                ✓ Ready to share & track
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={latestShortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl sm:text-3xl font-bold text-white hover:text-blue-400 transition-colors break-all"
                >
                  {latestShortUrl.replace(/^https?:\/\//, "")}
                </a>
              </div>
              <p className="mt-2 text-xs text-zinc-400 truncate max-w-md">
                Redirects to: <span className="text-zinc-300">{latestLink.originalUrl}</span>
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleCopy(latestShortUrl, latestLink.slug)}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  {copiedSlug === latestLink.slug ? "✓ Copied!" : "Copy Short Link"}
                </button>
                <Link
                  href={`/stats/${latestLink.slug}`}
                  className="rounded-xl bg-zinc-800/90 border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors"
                >
                  📊 Live Analytics ({latestLink.clickCount ?? 0} clicks)
                </Link>
                <a
                  href={latestQrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`shortnow-${latestLink.slug}-qr.png`}
                  className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
                >
                  ⬇ QR Code
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center bg-zinc-950/80 p-3 rounded-xl border border-white/10 shrink-0 self-center md:self-auto">
              <img
                src={latestQrUrl}
                alt={`QR Code for ${latestShortUrl}`}
                width={128}
                height={128}
                className="w-28 h-28 rounded-lg"
              />
              <span className="mt-1.5 text-[11px] text-zinc-400 font-mono">
                /{latestLink.slug}+
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Trust Badges & System Telemetry Row */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 mb-8">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              status === "online"
                ? "bg-emerald-500"
                : status === "offline"
                ? "bg-red-500"
                : "bg-zinc-500"
            }`}
          />
          <span>Engine: {status === "loading" ? "checking..." : status}</span>
        </div>
        <div>✓ 100% Free — No Login</div>
        <div>✓ Redis &lt;15ms Redirects</div>
        <div>✓ Dynamic QR &amp; Live Click Counter</div>
      </div>

      {/* Zero-Auth Local Workspace ("My Recent Links") */}
      {recentLinks.length > 0 && (
        <section
          aria-label="Your recently shortened links"
          className="glass rounded-2xl p-5 sm:p-6 text-left border border-white/10 mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <span>My Recent Links</span>
                <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[11px] font-medium text-blue-400">
                  {recentLinks.length} saved locally
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Stored in your browser so you can track clicks anytime without an account.
              </p>
            </div>
            <button
              type="button"
              onClick={() => refreshRecentCounts(recentLinks)}
              disabled={refreshingStats}
              className="rounded-lg bg-zinc-800/80 border border-zinc-700/80 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50"
            >
              {refreshingStats ? "Refreshing..." : "↻ Refresh Clicks"}
            </button>
          </div>

          <ul className="divide-y divide-zinc-800/70">
            {recentLinks.map((item) => {
              const fullShort = `${getOrigin()}/${item.slug}`;
              return (
                <li
                  key={item.slug}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <a
                        href={fullShort}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm font-semibold text-blue-400 hover:underline truncate"
                      >
                        shortnow.site/{item.slug}
                      </a>
                      <span className="inline-flex items-center rounded-md bg-zinc-800/90 px-2 py-0.5 text-xs font-medium text-zinc-300">
                        {item.clickCount ?? 0} {item.clickCount === 1 ? "click" : "clicks"}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 truncate mt-0.5">{item.originalUrl}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(fullShort, item.slug)}
                      className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                      {copiedSlug === item.slug ? "Copied!" : "Copy"}
                    </button>
                    <Link
                      href={`/stats/${item.slug}`}
                      className="rounded-lg bg-blue-600/15 border border-blue-500/30 px-3 py-1.5 text-xs font-medium text-blue-300 hover:bg-blue-600/25 transition-colors"
                    >
                      Stats &amp; QR
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleRemoveRecent(item.slug)}
                      aria-label={`Remove ${item.slug} from local history`}
                      className="rounded-lg px-2 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

