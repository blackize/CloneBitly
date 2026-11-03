# Shortnow (`shortnow.site`) — High-Speed URL Shortener, QR & pSEO Platform

**Shortnow** is a production URL shortening, dynamic QR code, and marketing link management platform live at **[https://shortnow.site](https://shortnow.site)**. Built as an npm workspaces monorepo (`frontend` + `backend`) deployed on **Vercel** with **PostgreSQL (Prisma)** and **Redis**.

---

## 🚀 Live Features (Current Production State)

### 1. Core Link & Redirect Engine
- **Sub-15ms Redirects (`GET /:slug`)**: Powered by an in-memory Redis cache (`1h` TTL) with asynchronous click counter increments in PostgreSQL (`short_links` table).
- **Custom Branded Aliases**: Free custom back-half slugs (`shortnow.site/your-brand`, 2–20 chars) with real-time uniqueness validation.
- **The `+` Analytics Shortcut (`GET /:slug+`)**: Appending `+` to any Shortnow link (`shortnow.site/slug+`) redirects directly to its live performance dashboard (`/stats/slug`).
- **Smart Unclaimed Link Flow (`/?claim=slug`)**: Visiting any non-existent short link (`shortnow.site/free-alias`) automatically redirects to the homepage with `free-alias` pre-filled in the Custom Alias input so the visitor can claim it in one click.
- **Dynamic QR Codes**: Every shortened link automatically generates a downloadable high-contrast PNG QR code tracked by the same click counter.
- **Zero-Auth Local Workspace (`My Recent Links`)**: Browser `localStorage` automatically stores the user's recently created links and refreshes live click counts from the API without requiring registration.

### 2. Multi-Layer Security & Anti-Spam Guard
- **IP Rate Limiting (`RateLimitGuard`)**: Redis-backed sliding window (`10 links / 60s` per real client IP via `x-forwarded-for` / `x-real-ip`).
- **Strict Destination URL Validator (`LinksService`)**:
  - Enforces valid `http://` and `https://` public domains (blocks `javascript:`, `data:`, `localhost`, raw IPs, and `@` credential phishing tricks).
  - **Chained Shortener Protection**: Blocks self-redirects (`shortnow.site`) and nested URL shorteners (`bit.ly`, `tinyurl.com`, `t.co`, `cutt.ly`, `rb.gy`, `short.io`, `rebrand.ly`, etc.) to protect domain reputation in Google Safe Browsing.
  - **Malware Extension Filter**: Blocks direct links to executable files (`.exe`, `.scr`, `.bat`, `.cmd`, `.msi`, `.vbs`, `.ps1`, `.jar`).
  - **Reserved System Slugs**: Protects 30+ system routes (`api`, `stats`, `tools`, `admin`, `dashboard`, `login`, `pricing`, `pro`, `billing`, etc.) from being registered as custom slugs.

### 3. Programmatic SEO (pSEO) Micro-Tool Suite (22 Indexed Pages)
All pages are statically pre-rendered on the server (`generateStaticParams` + `generateMetadata`) with automatic **JSON-LD (`WebApplication` + `FAQPage`)** structured data and dynamic `sitemap.xml`:
- `/` — Main Shortnow URL Shortener & Local Link Workspace
- `/tools` — Complete Directory of Free Link & QR Utilities
- **Specialized Interactive Modes in `<ShortenerWidget />`**:
  - **UTM Builder Mode (`/tools/utm-link-shortener`, `/tools/shopify-link-shortener`)**: Interactive `utm_source`, `utm_medium`, `utm_campaign`, and `utm_content` builder with live URL preview + instant shortening.
  - **WhatsApp Click-to-Chat Mode (`/tools/whatsapp-link-generator`)**: Phone number + pre-filled greeting message builder that constructs `https://wa.me/...` and shortens it into a branded link & QR code.
  - **Click Tracker Mode (`/tools/link-click-tracker`)**: Inspect live clicks for any existing `shortnow.site/slug` or create a new tracked link.
  - **QR Generator Mode (`/tools/qr-code-generator`, `/tools/google-forms-link-shortener`)**: Low-density trackable QR code generator.
  - **Platform & Use-Case Landing Pages**:
    - `/tools/custom-url-shortener`
    - `/tools/amazon-link-shortener`
    - `/tools/discord-link-shortener`
    - `/tools/instagram-bio-link-shortener`
    - `/tools/google-drive-link-shortener`
    - `/tools/youtube-link-shortener`
    - `/tools/telegram-link-shortener`
    - `/tools/tiktok-link-shortener`
    - `/tools/linkedin-url-shortener`
    - `/tools/notion-link-shortener`
    - `/tools/canva-link-shortener`
    - `/tools/podcast-link-shortener`
    - `/tools/bitly-alternative`
    - `/tools/tinyurl-alternative`

---

## 🛠 Tech Stack & Project Structure

- **Frontend (`/frontend`)**: Next.js 16 (App Router), React 19, Tailwind CSS v4
  - `src/data/seo-tools.ts` — Central configuration & SEO copy for the homepage and all 20 pSEO tool pages.
  - `src/components/ShortenerWidget.tsx` — Multi-mode client tool (`default`, `qr`, `utm`, `tracker`, `custom`, `whatsapp`) + `localStorage` dashboard.
  - `src/components/SeoLandingTemplate.tsx` — Server-rendered SEO page template with JSON-LD Schema.org (`WebApplication` + `FAQPage`), comparison table, and native `<details>` FAQ accordion.
  - `src/app/stats/[slug]/page.tsx` — Live link telemetry page with QR download, Pro feature demand teasers, and viral acquisition CTA.
- **Backend (`/backend`)**: NestJS 11, Prisma 6 (PostgreSQL), `ioredis` (Redis)
  - `src/app.controller.ts` — `/api`, `/api/health`, `POST /api/links`, `GET /api/links/:slug/stats`
  - `src/redirect.controller.ts` — `GET /:slug` redirect & `GET /:slug+` stats shortcut + `/?claim=slug` fallback
  - `src/links.service.ts` — URL/slug security validation, Redis caching, and Prisma queries
  - `src/vercel.ts` — Serverless entry point for Vercel Node runtime
- **Deployment**: `vercel.json` (Monorepo routing between `@vercel/next` and `@vercel/node`) & `docker-compose.yml` for local multi-container development.

---

## 🗺 Roadmap & Next Milestones (Where to Resume)

See **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** for the detailed Ukrainian checkpoint and next implementation steps:
1. **Pro Waitlist / Lead Capture & Background Telemetry (Next Step)**:
   - Record aggregated Country (`x-vercel-ip-country`), Device OS (`iOS` / `Android` / `Desktop`), and Referrer domain in Redis/PostgreSQL during redirects.
   - Add an email capture input inside the **Pro Workspace / Edit Destination URL** prompt on `/stats/[slug]` to collect warm leads ready to pay $5/mo.
2. **Multilingual pSEO Expansion**:
   - Localize top-performing tools (`/qr-code-generator`, `/whatsapp-link-generator`, `/utm-link-shortener`) into low-competition languages (UA, PL, ES, DE, PT).
3. **Full Pro Dashboard + Auth + Stripe ($5–$9/mo)**:
   - 1-click Google OAuth login with automatic migration of `localStorage` links (`POST /api/links/claim`), editable destination URLs, custom SVG QR codes, and full geo/device analytics.

---

## 📜 License
[MIT](./LICENSE)
