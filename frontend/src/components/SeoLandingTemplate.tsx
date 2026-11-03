import Link from "next/link";
import ShortenerWidget from "@/components/ShortenerWidget";
import { SEO_TOOLS, type SeoToolConfig } from "@/data/seo-tools";

interface SeoLandingTemplateProps {
  config: SeoToolConfig;
}

export default function SeoLandingTemplate({ config }: SeoLandingTemplateProps) {
  const canonicalUrl = config.slug
    ? `https://shortnow.site/tools/${config.slug}`
    : "https://shortnow.site";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: config.metaTitle.split("|")[0].trim(),
      url: canonicalUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      description: config.metaDescription,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Instant URL shortening with custom aliases",
        "Dynamic QR code generation in PNG format",
        "Real-time link click tracking and analytics",
        "UTM campaign parameter builder",
        "Sub-15ms Redis-cached redirects",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: config.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-x-hidden">
      {/* Structured Data for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[28rem] -right-24 h-96 w-96 rounded-full bg-indigo-600/10 blur-[110px]"
      />

      {/* Top Navigation */}
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

          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <Link href="/tools/qr-code-generator" className="hover:text-white transition-colors">
              QR Generator
            </Link>
            <Link href="/tools/utm-link-shortener" className="hover:text-white transition-colors">
              UTM Shortener
            </Link>
            <Link href="/tools/link-click-tracker" className="hover:text-white transition-colors">
              Click Tracker
            </Link>
            <Link href="/tools/custom-url-shortener" className="hover:text-white transition-colors">
              Custom Links
            </Link>
            <Link
              href="/tools"
              className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-white/10 transition-colors"
            >
              All Free Tools →
            </Link>
          </nav>

          <Link
            href="/tools"
            className="md:hidden rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-200"
          >
            All Tools
          </Link>
        </div>
      </header>

      <main className="z-10 w-full max-w-5xl px-4 pt-12 pb-24 sm:pt-20">
        {/* Hero Section + Interactive Tool Above the Fold */}
        <section className="text-center mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
              {config.badge}
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            {config.h1Main} <span className="text-blue-500">{config.h1Accent}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed">
            {config.subtitle}
          </p>

          <div className="mt-10">
            <ShortenerWidget
              mode={config.mode}
              urlPlaceholder={config.urlPlaceholder}
              aliasPlaceholder={config.aliasPlaceholder}
              ctaButtonText={config.ctaButtonText}
            />
          </div>
        </section>

        {/* How It Works (3-Step Cards) */}
        <section aria-labelledby="how-it-works-heading" className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Simple 3-Step Workflow
            </span>
            <h2
              id="how-it-works-heading"
              className="mt-2 text-2xl sm:text-3xl font-bold text-white"
            >
              {config.howItWorksTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.steps.map((step, index) => (
              <article
                key={step.title}
                className="glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/30 text-sm font-bold text-blue-400">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Overview & Technical Deep Dive (SynthID-style Structured Breakdown) */}
        <section aria-labelledby="overview-heading" className="mb-20">
          <div className="glass rounded-3xl p-8 sm:p-10 border border-white/10">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Overview &amp; Architecture
            </span>
            <h2 id="overview-heading" className="mt-2 text-2xl sm:text-3xl font-bold text-white">
              {config.overviewTitle}
            </h2>

            <div className="mt-4 space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              {config.overviewParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-zinc-800/80 pt-8">
              <h3 className="text-xl font-bold text-white mb-6">{config.deepDiveTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.deepDiveBlocks.map((block) => (
                  <div
                    key={block.subtitle}
                    className="rounded-2xl bg-zinc-950/70 border border-zinc-800/80 p-6"
                  >
                    <h4 className="text-base font-semibold text-blue-400 mb-4">
                      {block.subtitle}
                    </h4>
                    <dl className="space-y-4">
                      {block.points.map((pt) => (
                        <div key={pt.label}>
                          <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                            {pt.label}
                          </dt>
                          <dd className="mt-1 text-sm text-zinc-400 leading-relaxed">
                            {pt.text}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section aria-labelledby="comparison-heading" className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Feature Comparison
            </span>
            <h2
              id="comparison-heading"
              className="mt-2 text-2xl sm:text-3xl font-bold text-white"
            >
              Why Creators &amp; Marketers Choose Shortnow
            </h2>
          </div>

          <div className="glass overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-zinc-300">
                  <th className="py-4 px-6 font-semibold">Capability</th>
                  <th className="py-4 px-6 font-semibold text-blue-400">Shortnow (Free)</th>
                  <th className="py-4 px-6 font-semibold text-zinc-400">Legacy Shorteners (Free Tier)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/70 text-zinc-300">
                <tr>
                  <td className="py-3.5 px-6 font-medium text-white">Mandatory Account / Login</td>
                  <td className="py-3.5 px-6 text-emerald-400 font-medium">No — Instant 1-Click Use</td>
                  <td className="py-3.5 px-6 text-zinc-500">Required before shortening</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-white">Custom Alias Slugs</td>
                  <td className="py-3.5 px-6 text-emerald-400 font-medium">Unlimited Free Custom Slugs</td>
                  <td className="py-3.5 px-6 text-zinc-500">Capped at 3–5/month or Paid only</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-white">Dynamic QR Code Download</td>
                  <td className="py-3.5 px-6 text-emerald-400 font-medium">Included on Every Link</td>
                  <td className="py-3.5 px-6 text-zinc-500">Limited to 2/month</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-white">Real-Time Click Counter</td>
                  <td className="py-3.5 px-6 text-emerald-400 font-medium">Included (via /stats or + trick)</td>
                  <td className="py-3.5 px-6 text-zinc-500">Paywalled ($29+/month)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-white">Redirect Latency</td>
                  <td className="py-3.5 px-6 text-emerald-400 font-medium">&lt;15ms Redis In-Memory Cache</td>
                  <td className="py-3.5 px-6 text-zinc-500">Standard DB lookup</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Native Searchable FAQ Accordion (<details name="faq-accordion">) */}
        <section aria-labelledby="faq-heading" className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Frequently Asked Questions
            </span>
            <h2 id="faq-heading" className="mt-2 text-2xl sm:text-3xl font-bold text-white">
              Everything You Need to Know
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {config.faqs.map((faq, index) => (
              <details
                key={faq.question}
                name="faq-accordion"
                open={index === 0}
                className="group glass rounded-2xl border border-white/10 px-6 py-4 transition-colors open:border-blue-500/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-white">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs text-blue-400 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 border-t border-zinc-800/80 pt-3 text-sm text-zinc-300 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Internal Linking Silo: Explore All Free Link Tools */}
        <section aria-labelledby="tools-directory-heading">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Free Link &amp; Marketing Suite
            </span>
            <h2
              id="tools-directory-heading"
              className="mt-2 text-2xl sm:text-3xl font-bold text-white"
            >
              Explore Specialized URL &amp; QR Tools
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Purpose-built utilities powered by the Shortnow high-speed redirect engine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEO_TOOLS.map((tool) => {
              const isCurrent = tool.slug === config.slug;
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`rounded-2xl p-5 border transition-all ${
                    isCurrent
                      ? "bg-blue-600/15 border-blue-500/50"
                      : "glass border-white/10 hover:border-blue-500/40 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-semibold text-white">{tool.navTitle}</h3>
                    <span aria-hidden="true" className="text-blue-400 text-sm">
                      →
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {tool.subtitle}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-white/5 bg-black/50 py-10 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Shortnow (shortnow.site) • High-Speed URL Shortener &amp; QR Platform</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/tools" className="hover:text-white transition-colors">
              All Tools
            </Link>
            <Link href="/tools/qr-code-generator" className="hover:text-white transition-colors">
              QR Generator
            </Link>
            <Link href="/tools/utm-link-shortener" className="hover:text-white transition-colors">
              UTM Builder
            </Link>
            <Link href="/tools/link-click-tracker" className="hover:text-white transition-colors">
              Click Counter
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

