export type ToolMode = "default" | "qr" | "utm" | "tracker" | "custom" | "whatsapp";

export interface SeoStep {
  title: string;
  description: string;
}

export interface SeoDeepDiveBlock {
  subtitle: string;
  points: { label: string; text: string }[];
}

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoToolConfig {
  slug: string; // "" for home page, or tool slug under /tools/[tool]
  navTitle: string;
  badge: string;
  h1Main: string;
  h1Accent: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  mode: ToolMode;
  urlPlaceholder: string;
  aliasPlaceholder: string;
  ctaButtonText: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  howItWorksTitle: string;
  steps: [SeoStep, SeoStep, SeoStep];
  deepDiveTitle: string;
  deepDiveBlocks: [SeoDeepDiveBlock, SeoDeepDiveBlock];
  faqs: SeoFaqItem[];
}

export const HOME_SEO_CONFIG: SeoToolConfig = {
  slug: "",
  navTitle: "URL Shortener",
  badge: "Shortnow • Instant Link Infrastructure",
  h1Main: "Shorten your",
  h1Accent: "connections.",
  subtitle:
    "Free minimalist URL shortener with custom aliases, dynamic QR codes, and real-time click analytics — no sign-up required.",
  metaTitle: "Shortnow | Free URL Shortener, Custom Short Links & QR Generator",
  metaDescription:
    "Shorten long URLs instantly with Shortnow. Create free custom short links, generate trackable QR codes, and monitor real-time click analytics without registration.",
  keywords: [
    "url shortener",
    "free url shortener",
    "custom short link",
    "link shortener no login",
    "qr code generator with tracking",
    "link click tracker",
    "shortnow",
  ],
  mode: "default",
  urlPlaceholder: "Paste your long URL here (https://...)",
  aliasPlaceholder: "my-custom-link",
  ctaButtonText: "Shorten URL",
  overviewTitle: "Why Shortnow is Built for High-Speed Link Management",
  overviewParagraphs: [
    "Long, cluttered URLs filled with tracking parameters, session IDs, and nested folder paths break across messaging apps, reduce click-through rates (CTR) on social media, and look untrustworthy in emails or printed materials.",
    "Shortnow replaces complex web addresses with clean, memorable short links powered by an ultra-low-latency Redis caching layer and PostgreSQL persistence. Every link you create automatically includes a real-time analytics dashboard and a downloadable QR code — completely free and without forcing you through a registration wall.",
  ],
  howItWorksTitle: "How Our Instant URL Shortener Works",
  steps: [
    {
      title: "1. Paste Any Long URL",
      description:
        "Drop your destination link into the input box above. Optionally specify a custom alias (like shortnow.site/launch) to keep your brand front and center.",
    },
    {
      title: "2. Instant Redis Caching & QR Creation",
      description:
        "Our engine generates a unique slug, caches the redirect in Redis for sub-15ms resolution, and builds a ready-to-print QR code immediately.",
    },
    {
      title: "3. Share & Track Clicks in Real Time",
      description:
        "Share your short link anywhere. Add a '+' sign to the end of any Shortnow link (shortnow.site/slug+) or open your local dashboard to inspect live click performance.",
    },
  ],
  deepDiveTitle: "Under the Hood: Sub-15ms Redirects & Zero-Friction Analytics",
  deepDiveBlocks: [
    {
      subtitle: "1. Edge-Ready Redis Lookup Architecture",
      points: [
        {
          label: "The Challenge",
          text: "Traditional database-only URL shorteners suffer from cold queries and slow redirects during traffic spikes on social media or email blasts.",
        },
        {
          label: "The Shortnow Solution",
          text: "Every newly created or accessed short link is cached in memory via Redis with a sliding TTL, while click increments are written asynchronously to PostgreSQL so visitors never wait.",
        },
      ],
    },
    {
      subtitle: "2. The '+' Trick & Local Link Workspace",
      points: [
        {
          label: "The Challenge",
          text: "Most platforms lock basic click counts and QR codes behind mandatory accounts and $29+/month subscriptions.",
        },
        {
          label: "The Shortnow Solution",
          text: "Append '+' to any short URL (e.g. shortnow.site/demo+) to jump straight to its analytics page, while your browser automatically remembers your recent links locally.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is Shortnow completely free to use?",
      answer:
        "Yes. You can shorten unlimited links, pick custom aliases, generate QR codes, and track total clicks for free without creating an account or entering a credit card.",
    },
    {
      question: "How do I check the click statistics of a shortened link?",
      answer:
        "You can click the 'Analytics' button right after shortening a link, view your 'My Recent Links' panel on the page, or simply add a plus sign (+) to the end of any Shortnow URL in your browser (for example: shortnow.site/abc123+).",
    },
    {
      question: "Do Shortnow links expire?",
      answer:
        "No. Standard links created on Shortnow are stored permanently in our PostgreSQL database and do not expire.",
    },
    {
      question: "Can I customize the back-half (slug) of my short link?",
      answer:
        "Absolutely. Use the 'Custom Alias' field inside the tool to choose your own readable slug using letters, numbers, hyphens, or underscores.",
    },
    {
      question: "Does every short link include a QR code?",
      answer:
        "Yes. Every shortened link automatically generates a dynamic QR code that you can download in PNG format and track through the same analytics dashboard.",
    },
  ],
};

export const SEO_TOOLS: SeoToolConfig[] = [
  {
    slug: "qr-code-generator",
    navTitle: "QR Code Generator",
    badge: "Free Dynamic QR Code Tool",
    h1Main: "Trackable QR Code",
    h1Accent: "Generator.",
    subtitle:
      "Turn any URL into a high-contrast, scannable QR code backed by a short link so you can track every scan in real time.",
    metaTitle: "Free Dynamic QR Code Generator with Scan Tracking | Shortnow",
    metaDescription:
      "Generate free trackable QR codes for any URL in seconds. Download high-contrast PNG QR codes with real-time scan analytics — no sign-up required.",
    keywords: [
      "free qr code generator",
      "dynamic qr code generator",
      "trackable qr code",
      "qr code with scan counter",
      "url to qr code",
    ],
    mode: "qr",
    urlPlaceholder: "Enter website, menu, or PDF URL for your QR code...",
    aliasPlaceholder: "cafe-menu",
    ctaButtonText: "Generate QR Code",
    overviewTitle: "Why Dynamic Short-Link QR Codes Beat Static QR Codes",
    overviewParagraphs: [
      "When you encode a long 150-character URL directly into a static QR code, the resulting matrix becomes dense, complex, and difficult for smartphone cameras to scan from a distance or on small print labels.",
      "Shortnow solves this by first compressing your destination URL into a concise short link (`shortnow.site/slug`) and encoding that short URL into the QR matrix. The result is a clean, low-density QR code that scans faster from any angle and records every single scan in real time.",
    ],
    howItWorksTitle: "How to Create a Trackable QR Code in 3 Steps",
    steps: [
      {
        title: "1. Enter Your Destination URL",
        description:
          "Paste the link to your restaurant menu, event registration page, Wi-Fi portal, or product page, and optionally pick a custom slug.",
      },
      {
        title: "2. Generate Low-Density QR Matrix",
        description:
          "Shortnow creates a short redirect URL and renders a crisp QR code that remains easy to scan even when printed on small business cards.",
      },
      {
        title: "3. Download PNG & Monitor Scans",
        description:
          "Download your QR code with one click and open its `/stats/slug` dashboard anytime to see how many people scanned your code.",
      },
    ],
    deepDiveTitle: "Technical Advantages of Short-URL Backed QR Codes",
    deepDiveBlocks: [
      {
        subtitle: "1. Matrix Density & Camera Readability",
        points: [
          {
            label: "The Problem with Long URLs",
            text: "Long URLs with UTM tags force QR generators to use high version numbers (dense tiny dots), leading to failed scans in low light.",
          },
          {
            label: "The Shortnow Advantage",
            text: "Because `shortnow.site/slug` is always around 20 characters, the QR matrix stays sparse, bold, and scannable from farther away.",
          },
        ],
      },
      {
        subtitle: "2. Built-in Scan Telemetry",
        points: [
          {
            label: "The Problem with Static QR",
            text: "Standard static QR codes jump straight to the target site without counting offline print conversions.",
          },
          {
            label: "The Shortnow Advantage",
            text: "Every scan passes through our sub-15ms redirect engine, incrementing your scan counter automatically before opening the destination.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Do QR codes generated on Shortnow expire?",
        answer:
          "No. Your QR code and its underlying short link remain active permanently with no scan limits.",
      },
      {
        question: "Can I track how many times my QR code was scanned?",
        answer:
          "Yes! Every QR code is paired with a live analytics page (`/stats/your-slug`) that displays the exact number of scans and clicks.",
      },
      {
        question: "Are Shortnow QR codes free for commercial print use?",
        answer:
          "Yes, you can freely print them on flyers, packaging, restaurant menus, posters, and business cards.",
      },
    ],
  },
  {
    slug: "utm-link-shortener",
    navTitle: "UTM Builder & Shortener",
    badge: "Marketing Campaign Utility",
    h1Main: "UTM Builder &",
    h1Accent: "URL Shortener.",
    subtitle:
      "Build Google Analytics UTM campaign parameters and compress the messy tracking URL into a clean short link in one click.",
    metaTitle: "Free UTM Link Builder & URL Shortener for Campaigns | Shortnow",
    metaDescription:
      "Add utm_source, utm_medium, and utm_campaign tags to any URL and instantly shorten it into a clean, trackable link with QR code.",
    keywords: [
      "utm link shortener",
      "utm builder and shortener",
      "campaign url builder",
      "google analytics utm generator",
      "shorten utm links",
    ],
    mode: "utm",
    urlPlaceholder: "https://yourwebsite.com/landing-page",
    aliasPlaceholder: "summer-sale",
    ctaButtonText: "Build & Shorten UTM Link",
    overviewTitle: "Stop Sharing Ugly 200-Character UTM Links",
    overviewParagraphs: [
      "Marketing attribution relies on UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`), but raw UTM links look spammy in newsletters, social bios, SMS campaigns, and influencer posts—and savvy users often strip them out before sharing.",
      "Our combined UTM Builder & URL Shortener lets you define your campaign tags cleanly, validates the query string automatically, and wraps the entire tracking URL inside a short, trustworthy `shortnow.site` alias.",
    ],
    howItWorksTitle: "How to Build & Shorten UTM Campaign Links",
    steps: [
      {
        title: "1. Enter Landing Page & UTM Tags",
        description:
          "Fill in your base URL along with campaign source (e.g., newsletter, tiktok), medium (cpc, social), and campaign name.",
      },
      {
        title: "2. Automatic URL Encoding & Shortening",
        description:
          "We properly URL-encode spaces and special characters in your UTM tags and bind the full address to a custom short slug.",
      },
      {
        title: "3. Double-Layer Analytics",
        description:
          "Track instant top-of-funnel clicks in Shortnow while Google Analytics 4 or Plausible captures full downstream UTM conversions.",
      },
    ],
    deepDiveTitle: "Why Marketers Pair UTM Parameters with Short Links",
    deepDiveBlocks: [
      {
        subtitle: "1. Protecting Attribution Integrity",
        points: [
          {
            label: "Parameter Stripping Risk",
            text: "When users copy-paste visible `?utm_source=...` links into Slack or WhatsApp, they frequently delete the query string.",
          },
          {
            label: "Hidden UTM Preservation",
            text: "A short link conceals the query parameters until the HTTP 302 redirect fires in the browser, preserving 100% of your UTM data.",
          },
        ],
      },
      {
        subtitle: "2. Cross-Check Ad Platform Clicks",
        points: [
          {
            label: "Ad Network Discrepancies",
            text: "Social ad managers often over-report link clicks compared to actual landing page sessions.",
          },
          {
            label: "Independent Click Verification",
            text: "Use Shortnow's server-side click counter as an independent benchmark between ad platform clicks and GA4 sessions.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Do UTM parameters survive the URL redirect?",
        answer:
          "Yes, 100%. Shortnow redirects directly to your full destination URL with all `utm_source`, `utm_medium`, `utm_campaign`, and `utm_content` parameters intact.",
      },
      {
        question: "What UTM values should I use for social media?",
        answer:
          "A common best practice is lowercase naming, such as `utm_source=instagram`, `utm_medium=bio` (or `paid_social`), and `utm_campaign=product_launch`.",
      },
      {
        question: "Can I create a custom slug for each campaign?",
        answer:
          "Yes, you can assign memorable slugs like `shortnow.site/ig-spring` and `shortnow.site/yt-spring` to compare channels effortlessly.",
      },
    ],
  },
  {
    slug: "link-click-tracker",
    navTitle: "Link Click Tracker",
    badge: "Real-Time Click Telemetry",
    h1Main: "Free URL Click",
    h1Accent: "Counter & Tracker.",
    subtitle:
      "Check how many clicks any Shortnow link has received or create a new trackable short link with live click analytics.",
    metaTitle: "Free URL Click Counter & Real-Time Link Tracker | Shortnow",
    metaDescription:
      "Track link clicks in real time for free. Inspect click counts for any Shortnow URL or create a new tracked short link in seconds.",
    keywords: [
      "link click tracker",
      "url click counter",
      "track link clicks free",
      "short link analytics",
      "check short url clicks",
    ],
    mode: "tracker",
    urlPlaceholder: "Paste a Shortnow link to inspect OR any URL to track...",
    aliasPlaceholder: "tracked-link",
    ctaButtonText: "Track Link Clicks",
    overviewTitle: "Instant Visibility Into Every Link Click",
    overviewParagraphs: [
      "Sharing a link without click tracking is flying blind. Whether you are testing two headlines on X/Twitter, sending a cold outreach link, or placing a link in a forum post, knowing whether people actually clicked changes how you iterate.",
      "With Shortnow's Link Click Tracker, you can either paste an existing Shortnow URL (or slug) to inspect its live performance immediately, or wrap any external webpage in a trackable short URL.",
    ],
    howItWorksTitle: "How Real-Time Click Tracking Works",
    steps: [
      {
        title: "1. Paste a Link to Track or Inspect",
        description:
          "Enter an existing `shortnow.site/slug` to view its stats right away, or paste any external URL to generate a new tracked link.",
      },
      {
        title: "2. Asynchronous Zero-Latency Counting",
        description:
          "Each visitor triggers a fast cached redirect while our backend increments the PostgreSQL click counter asynchronously.",
      },
      {
        title: "3. Pro Shortcut: Add '+' to Any Link",
        description:
          "Need to check stats on the go? Just type '+' at the end of any Shortnow URL in your browser bar (`shortnow.site/slug+`).",
      },
    ],
    deepDiveTitle: "High-Accuracy Click Counting Without Slowing Redirects",
    deepDiveBlocks: [
      {
        subtitle: "1. Non-Blocking Analytics Pipeline",
        points: [
          {
            label: "Why Trackers Often Feel Slow",
            text: "Synchronous analytics tools wait for database writes before issuing the HTTP redirect, adding 200–500ms of delay.",
          },
          {
            label: "Asynchronous Increment",
            text: "Shortnow resolves the destination URL from Redis first and dispatches the database counter update in the background.",
          },
        ],
      },
      {
        subtitle: "2. Transparent Public & Local Stats",
        points: [
          {
            label: "Shareable Performance Reports",
            text: "Every `/stats/[slug]` page can be shared with clients, sponsors, or teammates as verifiable proof of traffic.",
          },
          {
            label: "Browser History Dashboard",
            text: "Your recently created links stay saved in your local browser storage so you can refresh click totals anytime.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How do I check clicks on an existing Shortnow link?",
        answer:
          "Paste the Shortnow link or slug into the tracker above, or simply append a `+` character to the end of the short URL in your browser address bar.",
      },
      {
        question: "Are clicks updated in real time?",
        answer:
          "Yes, click counts are updated within milliseconds of each redirect and can be refreshed live on the stats page.",
      },
      {
        question: "Does click tracking work for links shared inside apps like Telegram, Discord, or WhatsApp?",
        answer:
          "Yes. Because tracking happens at the HTTP redirect level on our server, clicks from mobile apps, SMS, and QR scans are all counted accurately.",
      },
    ],
  },
  {
    slug: "custom-url-shortener",
    navTitle: "Custom URL Shortener",
    badge: "Free Branded Aliases",
    h1Main: "Custom URL",
    h1Accent: "Shortener.",
    subtitle:
      "Create memorable, human-readable short links with your own custom back-half slug (shortnow.site/your-brand) for free.",
    metaTitle: "Free Custom URL Shortener — Create Vanity Short Links | Shortnow",
    metaDescription:
      "Create free custom short links with your own alias (`shortnow.site/your-name`). Boost click-through rates with readable branded URLs and no login required.",
    keywords: [
      "custom url shortener",
      "free custom short link",
      "vanity url generator",
      "branded short links free",
      "custom link alias",
    ],
    mode: "custom",
    urlPlaceholder: "Paste the destination URL you want to brand...",
    aliasPlaceholder: "your-custom-slug",
    ctaButtonText: "Create Custom Link",
    overviewTitle: "Boost Click-Through Rates with Human-Readable Slugs",
    overviewParagraphs: [
      "Randomly generated strings like `bit.ly/3x9Kp2Q` look indistinguishable from phishing links and are impossible to say out loud on a podcast, webinar, or stage presentation.",
      "Shortnow lets you choose your own custom back-half slug (`shortnow.site/pitch-deck`, `shortnow.site/join-us`, `shortnow.site/menu`) completely free—giving your audience immediate context before they click.",
    ],
    howItWorksTitle: "How to Claim Your Custom Short Link",
    steps: [
      {
        title: "1. Paste Your Destination URL",
        description:
          "Enter any valid webpage, document, social profile, or app store link you want to shorten.",
      },
      {
        title: "2. Choose Your Custom Alias",
        description:
          "Type your desired slug using letters, numbers, hyphens, or underscores in the Custom Alias field.",
      },
      {
        title: "3. Instant Availability Check & Lock",
        description:
          "If the alias is available, it is immediately reserved in our database along with its matching QR code and analytics page.",
      },
    ],
    deepDiveTitle: "Why Custom Short Links Outperform Random Hashes",
    deepDiveBlocks: [
      {
        subtitle: "1. Up to 34% Higher Click Trust",
        points: [
          {
            label: "User Hesitation on Random Slugs",
            text: "Security-conscious users hesitate to click opaque URLs when they cannot tell what awaits on the other side.",
          },
          {
            label: "Descriptive Slug Clarity",
            text: "A clear slug like `shortnow.site/roadmap-2026` communicates destination intent right inside the link text.",
          },
        ],
      },
      {
        subtitle: "2. Verbal & Offline Memorability",
        points: [
          {
            label: "Slide Decks & Podcasts",
            text: "Listeners and conference attendees cannot memorize case-sensitive random hashes shown on a slide for 5 seconds.",
          },
          {
            label: "Effortless Recall",
            text: "A clean hyphenated word slug can be spoken aloud once and typed directly into any mobile browser.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How many custom slugs can I create for free?",
        answer:
          "Unlike competitors that limit free accounts to 3–5 custom back-halves per month, Shortnow lets you create custom aliases for free without registration.",
      },
      {
        question: "What characters are allowed in a custom alias?",
        answer:
          "You can use English letters (`a-z`, `A-Z`), numbers (`0-9`), hyphens (`-`), and underscores (`_`) up to 20 characters.",
      },
      {
        question: "What happens if my chosen custom slug is already taken?",
        answer:
          "Our API checks uniqueness in real time and will notify you immediately so you can add a suffix or pick another variation.",
      },
    ],
  },
  {
    slug: "amazon-link-shortener",
    navTitle: "Amazon Link Shortener",
    badge: "For Affiliates, Creators & Sellers",
    h1Main: "Amazon Link",
    h1Accent: "Shortener.",
    subtitle:
      "Turn massive Amazon product and affiliate URLs (`?tag=...&keywords=...`) into clean, high-converting short links with click tracking.",
    metaTitle: "Free Amazon Link Shortener for Affiliates & Products | Shortnow",
    metaDescription:
      "Shorten long Amazon product and Associates affiliate URLs into clean short links with QR codes and click tracking. Free and instant.",
    keywords: [
      "amazon link shortener",
      "shorten amazon url",
      "amazon affiliate link shortener",
      "clean amazon product link",
    ],
    mode: "custom",
    urlPlaceholder: "https://www.amazon.com/dp/B08N5WRWNW?tag=...",
    aliasPlaceholder: "best-mic-deal",
    ctaButtonText: "Shorten Amazon Link",
    overviewTitle: "Clean Up Massive Amazon Product & Affiliate URLs",
    overviewParagraphs: [
      "Standard Amazon URLs often stretch over 300 characters because they bundle search keywords, session timestamps (`qid`), ranking indices (`sr`), and referral tags into the address bar.",
      "Shortnow compresses any Amazon product page, storefront, or wishlist link into a sleek URL like `shortnow.site/studio-mic` while preserving all query parameters—and gives you real-time click analytics and a printable QR code for product inserts.",
    ],
    howItWorksTitle: "How to Shorten Amazon URLs in Seconds",
    steps: [
      {
        title: "1. Copy Your Full Amazon URL",
        description:
          "Copy the product link from your browser bar or Amazon Associates SiteStripe bar.",
      },
      {
        title: "2. Add a Product-Friendly Slug",
        description:
          "Paste the link above and choose a descriptive custom alias (for example, `shortnow.site/desk-lamp`).",
      },
      {
        title: "3. Share Across YouTube, TikTok & Blogs",
        description:
          "Place your clean link in video descriptions, social bios, or packaging inserts and monitor clicks live.",
      },
    ],
    deepDiveTitle: "Designed for E-Commerce Sellers & Content Creators",
    deepDiveBlocks: [
      {
        subtitle: "1. Preserving Query & Attribution Tags",
        points: [
          {
            label: "Zero Parameter Loss",
            text: "Manual URL trimming can accidentally delete your `tag=` or attribution parameters.",
          },
          {
            label: "Exact HTTP Redirect",
            text: "Shortnow forwards the visitor to the exact original Amazon URL byte-for-byte.",
          },
        ],
      },
      {
        subtitle: "2. Packaging & Insert QR Codes",
        points: [
          {
            label: "Amazon FBA Product Inserts",
            text: "Include a high-contrast QR code on product manuals linking directly to your warranty registration or store page.",
          },
          {
            label: "Measure Insert Conversion",
            text: "See exactly how many buyers scan your physical packaging insert via `/stats/[slug]`.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does shortening an Amazon URL break the product redirect?",
        answer:
          "No. Shortnow issues a direct HTTP redirect to the exact Amazon URL you provided, preserving all product ASINs and query parameters.",
      },
      {
        question: "Can I generate a QR code for an Amazon product page?",
        answer:
          "Yes, every shortened Amazon link automatically comes with a downloadable QR code.",
      },
    ],
  },
  {
    slug: "discord-link-shortener",
    navTitle: "Discord Link Shortener",
    badge: "Community & Server Growth",
    h1Main: "Discord Link",
    h1Accent: "Shortener.",
    subtitle:
      "Create custom branded invite links (`shortnow.site/my-server`) and track how many members click your Discord links across social channels.",
    metaTitle: "Free Discord Link Shortener & Custom Invite URL Maker | Shortnow",
    metaDescription:
      "Create custom Discord invite short links (`shortnow.site/your-server`) without Server Boost Level 3. Track invite clicks and generate QR codes for free.",
    keywords: [
      "discord link shortener",
      "custom discord invite link free",
      "discord server url shortener",
      "track discord invite clicks",
    ],
    mode: "custom",
    urlPlaceholder: "https://discord.gg/your-invite-code",
    aliasPlaceholder: "join-our-guild",
    ctaButtonText: "Shorten Discord Link",
    overviewTitle: "Custom Vanity URLs for Your Discord Server — Without Level 3 Boosts",
    overviewParagraphs: [
      "Unlocking a custom vanity invite URL natively on Discord requires maintaining 14 Server Boosts (Level 3), which costs communities and indie game devs hundreds of dollars a year.",
      "With Shortnow, you can wrap your permanent `discord.gg` invite link inside a custom alias like `shortnow.site/my-community` for free, plus get real-time click analytics and a scannable QR code for stream overlays.",
    ],
    howItWorksTitle: "How to Create a Custom Discord Server Link",
    steps: [
      {
        title: "1. Generate a Never-Expiring Discord Invite",
        description:
          "In Discord, create an invite link set to 'Never expire' with 'No limit' on uses, and copy the `discord.gg/...` URL.",
      },
      {
        title: "2. Pick Your Community Slug",
        description:
          "Paste the invite link into Shortnow and enter your server name in the Custom Alias field.",
      },
      {
        title: "3. Share on Twitch, YouTube & X",
        description:
          "Put your memorable link in stream banners and track exactly how many viewers click through to join.",
      },
    ],
    deepDiveTitle: "Why Community Managers Use Shortnow for Discord",
    deepDiveBlocks: [
      {
        subtitle: "1. Memorable Stream & Bio Links",
        points: [
          {
            label: "Random Invite Codes",
            text: "Default codes like `discord.gg/8fK9x2mP` are impossible for viewers to type from a Twitch overlay.",
          },
          {
            label: "Branded Alias",
            text: "A readable URL like `shortnow.site/valorant-ua` is easy to remember and type in seconds.",
          },
        ],
      },
      {
        subtitle: "2. Funnel Analytics for Server Growth",
        points: [
          {
            label: "Click vs Join Ratio",
            text: "Discord only shows how many users accepted the invite, not how many clicked the link and bounced.",
          },
          {
            label: "Full Click Visibility",
            text: "Compare Shortnow click counts with Discord join logs to optimize your server onboarding.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need Discord Nitro or Server Boosts to use a custom Shortnow link?",
        answer:
          "No! Shortnow is completely independent and free, so any Discord server can have a clean custom alias immediately.",
      },
      {
        question: "Make sure my Discord link doesn't stop working—what should I check?",
        answer:
          "When creating the invite inside Discord, click 'Edit invite link' and set 'Expire after' to 'Never' before shortening it on Shortnow.",
      },
    ],
  },
  {
    slug: "instagram-bio-link-shortener",
    navTitle: "Instagram Bio Shortener",
    badge: "Creator & SMM Toolkit",
    h1Main: "Instagram Bio",
    h1Accent: "Link Shortener.",
    subtitle:
      "Make your Instagram, TikTok, and Threads bio links clean, branded, and fully trackable with real-time click analytics.",
    metaTitle: "Free Instagram Bio Link Shortener & Click Tracker | Shortnow",
    metaDescription:
      "Shorten and customize links for your Instagram bio, Stories, and Reels. Track clicks in real time without registration.",
    keywords: [
      "instagram bio link shortener",
      "shorten link for instagram bio",
      "tiktok bio link shortener",
      "track instagram link clicks",
    ],
    mode: "custom",
    urlPlaceholder: "Paste your shop, portfolio, or latest video link...",
    aliasPlaceholder: "my-portfolio",
    ctaButtonText: "Shorten Bio Link",
    overviewTitle: "Turn Every Profile Visit Into a Measurable Click",
    overviewParagraphs: [
      "Your Instagram or TikTok bio gives you precious little space to convert profile visitors into customers, newsletter subscribers, or viewers. A cut-off 90-character URL looks messy and wastes visual trust.",
      "Shortnow lets creators and SMM managers craft clean custom links (`shortnow.site/book-call`, `shortnow.site/new-drop`) and measure exactly how many followers tap their bio or Story link stickers.",
    ],
    howItWorksTitle: "How to Optimize Your Social Bio Link",
    steps: [
      {
        title: "1. Paste Your Target Link",
        description:
          "Enter your online store, Notion portfolio, Calendly page, or YouTube video URL.",
      },
      {
        title: "2. Add a Call-to-Action Slug",
        description:
          "Use an action-oriented custom alias like `shortnow.site/free-guide` or `shortnow.site/shop-now`.",
      },
      {
        title: "3. Paste in Bio & Track Story Stickers",
        description:
          "Add the link to your profile or Story link sticker and watch clicks roll in live on `/stats/slug`.",
      },
    ],
    deepDiveTitle: "Why Creators Prefer Clean Custom Short Links",
    deepDiveBlocks: [
      {
        subtitle: "1. Action-Oriented Slugs Drive Higher CTR",
        points: [
          {
            label: "Generic Links Blend In",
            text: "Followers ignore cryptic URLs in profile headers.",
          },
          {
            label: "Built-in CTA",
            text: "When the slug itself reads `/winter-drop`, the URL reinforces your call to action.",
          },
        ],
      },
      {
        subtitle: "2. Zero Interstitial Pages",
        points: [
          {
            label: "In-App Browser Speed",
            text: "Instagram and TikTok open links inside an in-app WebView where slow pages cause immediate drop-offs.",
          },
          {
            label: "Direct Redis Redirect",
            text: "Shortnow sends users straight to your destination in under 15ms with zero intermediate splash screens.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is Shortnow safe to use in Instagram bios and Stories?",
        answer:
          "Yes. Shortnow performs a clean, direct HTTP redirect without ads or interstitial pages, ensuring smooth loading inside Instagram's in-app browser.",
      },
      {
        question: "Can I create separate short links for Instagram vs TikTok to see which brings more traffic?",
        answer:
          "Yes! Create one link with slug `ig-offer` and another with `tt-offer` pointing to the same page to compare exact click counts from each platform.",
      },
    ],
  },
  {
    slug: "google-drive-link-shortener",
    navTitle: "Google Drive Shortener",
    badge: "Document & File Sharing",
    h1Main: "Google Drive & Docs",
    h1Accent: "Link Shortener.",
    subtitle:
      "Convert long Google Drive, Docs, Sheets, and Slides sharing URLs into clean, memorable links with QR codes and download tracking.",
    metaTitle: "Free Google Drive & Google Docs Link Shortener | Shortnow",
    metaDescription:
      "Shorten long Google Drive, Docs, Sheets, and Forms links into clean custom URLs (`shortnow.site/our-deck`) with click tracking and QR codes.",
    keywords: [
      "google drive link shortener",
      "shorten google docs link",
      "google forms url shortener",
      "custom link for google drive folder",
    ],
    mode: "custom",
    urlPlaceholder: "https://drive.google.com/file/d/1A2B3C.../view?usp=sharing",
    aliasPlaceholder: "q4-pitch-deck",
    ctaButtonText: "Shorten Drive Link",
    overviewTitle: "Share Google Drive Files & Forms Without 100-Character Hashes",
    overviewParagraphs: [
      "Google Drive, Docs, Sheets, and Forms generate sharing URLs with 44-character cryptographic file IDs (`https://docs.google.com/presentation/d/1xYz.../edit?usp=sharing`) that cannot be typed by hand and break across printed handouts.",
      "Shortnow transforms any shared Google Workspace link into a clean, professional URL like `shortnow.site/workshop-slides` plus a ready-to-scan QR code you can place right on your final presentation slide.",
    ],
    howItWorksTitle: "How to Shorten Google Drive & Docs Links",
    steps: [
      {
        title: "1. Set Google Drive Access to 'Anyone with the link'",
        description:
          "In Google Drive or Docs, click Share, set general access to 'Anyone with the link', and copy the URL.",
      },
      {
        title: "2. Create a Memorable Document Slug",
        description:
          "Paste the link above and choose a readable custom slug like `shortnow.site/event-photos`.",
      },
      {
        title: "3. Share URL or Slide QR Code",
        description:
          "Let attendees scan the generated QR code or type the short link, and see how many people opened your file.",
      },
    ],
    deepDiveTitle: "Perfect for Presentations, Syllabi & Client Deliverables",
    deepDiveBlocks: [
      {
        subtitle: "1. Know When Clients Open Your Proposal",
        points: [
          {
            label: "Zero Read Receipts on Drive Links",
            text: "Google Drive doesn't notify you when an anonymous viewer clicks your shared PDF or presentation link.",
          },
          {
            label: "Instant Click Verification",
            text: "Send a dedicated Shortnow link (`shortnow.site/acme-proposal`) and check `/stats/acme-proposal` to see when it was opened.",
          },
        ],
      },
      {
        subtitle: "2. Classroom & Conference Handouts",
        points: [
          {
            label: "Paper-to-Digital Bridge",
            text: "Students and attendees can either scan the QR code or type a 15-character short URL in seconds.",
          },
          {
            label: "Works With Forms, Sheets & Folders",
            text: "Compatible with Google Forms (`forms.gle`), Drive folders, Docs, Sheets, and Slides.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does Shortnow change the permissions of my Google Drive file?",
        answer:
          "No. Shortnow only redirects visitors to your Google Drive URL; your Google Workspace access permissions remain 100% enforced by Google.",
      },
      {
        question: "Can I see how many people opened my shared Google Doc?",
        answer:
          "Yes, every click on your shortened Google Doc or Drive link is counted in real time on its `/stats/[slug]` page.",
      },
    ],
  },
  {
    slug: "youtube-link-shortener",
    navTitle: "YouTube Link Shortener",
    badge: "Video & Channel Growth",
    h1Main: "YouTube Link",
    h1Accent: "Shortener & QR.",
    subtitle:
      "Create branded short links and trackable QR codes for YouTube videos, Shorts, playlists, and channel subscribe links.",
    metaTitle: "Free YouTube Link Shortener & Video QR Code Generator | Shortnow",
    metaDescription:
      "Shorten YouTube video, playlist, and channel URLs into custom branded links with real-time click analytics and QR codes.",
    keywords: [
      "youtube link shortener",
      "shorten youtube url",
      "youtube channel qr code generator",
      "custom youtube short link",
    ],
    mode: "custom",
    urlPlaceholder: "https://www.youtube.com/watch?v=... or playlist URL",
    aliasPlaceholder: "watch-demo",
    ctaButtonText: "Shorten YouTube Link",
    overviewTitle: "Promote Videos & Playlists With Branded Links",
    overviewParagraphs: [
      "While `youtu.be` shortens single video links into random case-sensitive IDs, it doesn't let you pick a readable slug, doesn't shorten long playlist or `?sub_confirmation=1` channel URLs cleanly, and doesn't give you external click & QR analytics.",
      "Shortnow lets you create human-readable links like `shortnow.site/subscribe-now` or `shortnow.site/tutorial-ep1` with a downloadable QR code for merch, posters, and cross-platform promotions.",
    ],
    howItWorksTitle: "How to Shorten YouTube Video & Channel Links",
    steps: [
      {
        title: "1. Paste Video, Playlist, or Channel URL",
        description:
          "Tip: add `?sub_confirmation=1` to your channel URL before shortening to prompt desktop visitors to subscribe immediately!",
      },
      {
        title: "2. Customize Your Video Alias",
        description:
          "Choose a memorable custom slug that matches your video topic or episode number.",
      },
      {
        title: "3. Track Cross-Platform Clicks",
        description:
          "Share across newsletters, X, LinkedIn, or print QR codes and track clicks before YouTube Studio attribution.",
      },
    ],
    deepDiveTitle: "Pro Tricks for YouTube Creators & Marketers",
    deepDiveBlocks: [
      {
        subtitle: "1. Auto-Subscribe & Timestamp Links",
        points: [
          {
            label: "Hide Ugly Query Strings",
            text: "Links with `?t=425s` or `?sub_confirmation=1` look clunky when shared in plain text.",
          },
          {
            label: "Clean Branded Wrapper",
            text: "Wrap timestamped tutorials or auto-subscribe prompts inside a clean `shortnow.site` slug.",
          },
        ],
      },
      {
        subtitle: "2. Offline-to-YouTube QR Codes",
        points: [
          {
            label: "Product Manuals & Conferences",
            text: "Link physical products directly to an instructional YouTube video via a trackable QR code.",
          },
          {
            label: "Real-Time Scan Counter",
            text: "Measure how many customers scan your setup video QR code.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Do timestamp parameters (`?t=120`) still work when shortened?",
        answer:
          "Yes! Shortnow redirects visitors to the exact URL including any timestamp or playlist parameters.",
      },
      {
        question: "Can I shorten a YouTube Shorts or Playlist URL?",
        answer:
          "Yes, any valid `youtube.com` or `youtu.be` URL works seamlessly.",
      },
    ],
  },
  {
    slug: "bitly-alternative",
    navTitle: "Free Bitly Alternative",
    badge: "Open & Minimalist Comparison",
    h1Main: "The Zero-Friction",
    h1Accent: "Bitly Alternative.",
    subtitle:
      "Why pay $35/month or fight mandatory sign-up walls just to create a custom short link and QR code? Shorten, customize, and track for free.",
    metaTitle: "Best Free Bitly Alternative (No Login, Custom Slugs & QR) | Shortnow",
    metaDescription:
      "Looking for a fast, free Bitly alternative without mandatory sign-up? Shortnow offers instant custom short links, dynamic QR codes, and real-time click stats.",
    keywords: [
      "free bitly alternative",
      "bitly alternative no login",
      "url shortener like bitly free",
      "tinyurl alternative with analytics",
    ],
    mode: "custom",
    urlPlaceholder: "Test it right now — paste any URL to shorten...",
    aliasPlaceholder: "switch-to-shortnow",
    ctaButtonText: "Shorten Free Now",
    overviewTitle: "Why Thousands of Users Look for a Simpler Bitly Alternative",
    overviewParagraphs: [
      "Over the last few years, legacy URL shorteners have aggressively restricted their free tiers—forcing users through multi-step registration flows, capping free links to 5–10 per month, locking custom back-halves, and putting basic QR codes and click analytics behind expensive enterprise plans.",
      "Shortnow returns to what a modern URL shortener should be: blazingly fast, minimalist, and generous. Powered by NestJS, PostgreSQL, and Redis caching, it gives you custom slugs, QR codes, and real-time click stats right on the home screen in under two seconds.",
    ],
    howItWorksTitle: "Switch to Effortless Link Shortening in 3 Seconds",
    steps: [
      {
        title: "1. Zero Registration Wall",
        description:
          "Open Shortnow and paste your URL right away—no email verification, OAuth popups, or onboarding questionnaires.",
      },
      {
        title: "2. Free Custom Slugs & QR Codes",
        description:
          "Pick a custom alias and download your matching QR code immediately without hitting paywalls.",
      },
      {
        title: "3. Local Dashboard + '+' Stats Trick",
        description:
          "All your recent links are saved in your browser's local workspace with live click counters.",
      },
    ],
    deepDiveTitle: "How Shortnow Compares to Legacy Shorteners",
    deepDiveBlocks: [
      {
        subtitle: "1. Speed & Developer-Grade Simplicity",
        points: [
          {
            label: "Bloated Legacy Dashboards",
            text: "Creating a single short link on legacy platforms takes 6+ clicks through heavy dashboards.",
          },
          {
            label: "1-Click Workflow",
            text: "Paste, optionally name your slug, press Enter, and copy—done in under 3 seconds.",
          },
        ],
      },
      {
        subtitle: "2. Built-in Analytics Without Paywalls",
        points: [
          {
            label: "Locked Click History",
            text: "Many free plans hide click counts unless you upgrade to a paid tier.",
          },
          {
            label: "Open Real-Time Telemetry",
            text: "Every Shortnow link has a live `/stats/[slug]` dashboard accessible anytime.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How is Shortnow different from Bitly's free plan?",
        answer:
          "Shortnow does not require you to create an account to shorten links, allows free custom aliases, generates free QR codes for every link, and provides real-time click counters out of the box.",
      },
      {
        question: "Where are my links saved if I don't log in?",
        answer:
          "Your links are permanently saved in our database for redirects, and your personal list of recently created links is automatically saved in your browser's local storage (`My Recent Links`) for easy access.",
      },
    ],
  },
  {
    slug: "whatsapp-link-generator",
    navTitle: "WhatsApp Link Generator",
    badge: "Click-to-Chat + QR & Analytics",
    h1Main: "WhatsApp Link",
    h1Accent: "Generator & QR.",
    subtitle:
      "Create a custom WhatsApp click-to-chat link with a pre-filled message, shorten it into a branded URL, and track every customer tap.",
    metaTitle: "Free WhatsApp Link Generator (wa.me) with Pre-Filled Message & QR | Shortnow",
    metaDescription:
      "Generate a free WhatsApp click-to-chat link with a custom pre-filled message, branded short URL (shortnow.site/chat), and printable QR code.",
    keywords: [
      "whatsapp link generator",
      "create whatsapp link",
      "wa.me link generator",
      "whatsapp qr code generator",
      "whatsapp link shortener",
    ],
    mode: "whatsapp",
    urlPlaceholder: "+1 555 234 5678 (or paste an existing wa.me link)",
    aliasPlaceholder: "chat-with-us",
    ctaButtonText: "Create WhatsApp Link & QR",
    overviewTitle: "Let Customers Message You on WhatsApp in One Tap",
    overviewParagraphs: [
      "Asking leads to manually save your phone number in their address book before they can message you on WhatsApp causes up to 60% drop-off on mobile landing pages and Instagram profiles.",
      "Our WhatsApp Link Generator builds an official `wa.me` click-to-chat URL with your pre-written greeting message, wraps it inside a clean custom alias like `shortnow.site/order-chat`, and gives you a downloadable QR code plus a real-time counter of how many customers initiated a chat.",
    ],
    howItWorksTitle: "How to Create a Trackable WhatsApp Link in 3 Steps",
    steps: [
      {
        title: "1. Enter Your WhatsApp Phone Number",
        description:
          "Type your phone number including the country code (for example, +380..., +48..., or +1...). Our tool strips spaces and symbols automatically.",
      },
      {
        title: "2. Add a Pre-Filled Greeting Message",
        description:
          "Write a default message like 'Hi! I want to ask about your services' so customers can hit send immediately when WhatsApp opens.",
      },
      {
        title: "3. Share Short URL or Print QR Code",
        description:
          "Use your clean `shortnow.site/your-brand` link in Instagram bios, websites, or table tents and track every click in real time.",
      },
    ],
    deepDiveTitle: "Why Shorten Your wa.me Link with Shortnow?",
    deepDiveBlocks: [
      {
        subtitle: "1. Hide Your Raw Phone Number & Long Text Strings",
        points: [
          {
            label: "Exposed Numbers & Ugly %20 Encoding",
            text: "Standard links like `https://wa.me/15551234567?text=Hello%20I%20need%20help` expose your raw number to scrapers and look messy in bios.",
          },
          {
            label: "Clean Branded Alias",
            text: "Replace the entire string with `shortnow.site/vip-support` for a polished storefront look.",
          },
        ],
      },
      {
        subtitle: "2. Track How Many Leads Open WhatsApp",
        points: [
          {
            label: "Zero Analytics on Standard wa.me",
            text: "Default WhatsApp links never tell you how many people clicked your link but didn't send the first message.",
          },
          {
            label: "Live Click & QR Scan Counter",
            text: "Measure exact click-to-chat volume via `/stats/[slug]`.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How should I format my phone number for the WhatsApp link generator?",
        answer:
          "Include your country calling code (e.g., +1 for US/Canada, +44 for UK, +380 for Ukraine, +48 for Poland). You can include spaces or dashes—our generator cleans them automatically.",
      },
      {
        question: "Does this work with both personal WhatsApp and WhatsApp Business?",
        answer:
          "Yes! The generated click-to-chat link works seamlessly with both standard WhatsApp and the WhatsApp Business app on iOS, Android, and WhatsApp Web.",
      },
      {
        question: "Can I print the QR code on packaging or store windows?",
        answer:
          "Yes, scanning the generated QR code with any smartphone camera immediately opens a WhatsApp chat with your pre-filled message.",
      },
    ],
  },
  {
    slug: "telegram-link-shortener",
    navTitle: "Telegram Link Shortener",
    badge: "Channels, Bots & Deep Links",
    h1Main: "Telegram Link",
    h1Accent: "Shortener & Tracker.",
    subtitle:
      "Shorten private Telegram invite links (`t.me/+...`), bot referral URLs (`?start=...`), and post links into clean trackable URLs.",
    metaTitle: "Free Telegram Link Shortener for Channels, Groups & Bots | Shortnow",
    metaDescription:
      "Shorten private Telegram channel invites (t.me/+hash) and bot referral links into custom branded URLs with click tracking and QR codes.",
    keywords: [
      "telegram link shortener",
      "shorten t.me link",
      "custom telegram invite link",
      "track telegram bot referral clicks",
    ],
    mode: "custom",
    urlPlaceholder: "https://t.me/+AbCdEfGhIjKlMnOp or https://t.me/your_bot?start=ref1",
    aliasPlaceholder: "join-tg-channel",
    ctaButtonText: "Shorten Telegram Link",
    overviewTitle: "Upgrade Cryptic Private Telegram Links & Bot Referrals",
    overviewParagraphs: [
      "Private Telegram channels and groups use random invite hashes (`https://t.me/+X9kLm2PqR7vW`), while Telegram Mini Apps and bots rely on exposed referral parameters (`?start=campaign_42`) that users often delete.",
      "Shortnow lets you wrap any `t.me` invite, message link, or bot start link inside a clean custom alias (`shortnow.site/crypto-news`, `shortnow.site/start-bot`) with independent click tracking and a QR code.",
    ],
    howItWorksTitle: "How to Shorten & Track Telegram Links",
    steps: [
      {
        title: "1. Copy Your t.me Link",
        description:
          "Copy your public channel URL, private invite link (`t.me/+...`), specific post URL, or bot deep link.",
      },
      {
        title: "2. Set a Memorable Custom Alias",
        description:
          "Choose a readable slug so subscribers know exactly what community or bot they are opening.",
      },
      {
        title: "3. Measure Ad & Cross-Promo Traffic",
        description:
          "Create unique slugs for each ad placement and compare real click counts against Telegram subscriber joins.",
      },
    ],
    deepDiveTitle: "Built for Telegram Channel Admins & Mini App Developers",
    deepDiveBlocks: [
      {
        subtitle: "1. Conceal Bot Referral Parameters",
        points: [
          {
            label: "Visible ?start= Strings",
            text: "Savvy users frequently strip `?start=ref_id` from Telegram bot links before clicking.",
          },
          {
            label: "Protected Redirect",
            text: "A Shortnow alias hides the query parameter until the Telegram app is launched.",
          },
        ],
      },
      {
        subtitle: "2. Audit Paid Promo Placements",
        points: [
          {
            label: "Verify Ad Views vs Clicks",
            text: "When buying shoutouts in other Telegram channels, track exact clicks independently via `/stats/slug`.",
          },
          {
            label: "Instant QR for Offline Events",
            text: "Let conference attendees join your Telegram group with a quick QR scan.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does Shortnow work with private Telegram invite links (`t.me/+...`)?",
        answer:
          "Yes, private invite links containing `+` or `joinchat/` redirect smoothly to the Telegram app on mobile and desktop.",
      },
      {
        question: "Are bot `?start=` parameters preserved during redirect?",
        answer:
          "Yes, all query parameters for Telegram bots and Mini Apps (`?start=` and `?startapp=`) are forwarded intact.",
      },
    ],
  },
  {
    slug: "tiktok-link-shortener",
    navTitle: "TikTok Link Shortener",
    badge: "Creator Bio & Video Links",
    h1Main: "TikTok Bio & Video",
    h1Accent: "Link Shortener.",
    subtitle:
      "Create clean custom bio links and shorten long TikTok video or TikTok Shop URLs with real-time click analytics.",
    metaTitle: "Free TikTok Link Shortener for Bio & Video URLs | Shortnow",
    metaDescription:
      "Shorten links for your TikTok bio or compress long TikTok video and Shop URLs into custom trackable links (`shortnow.site/my-drop`).",
    keywords: [
      "tiktok link shortener",
      "shorten link for tiktok bio",
      "tiktok shop url shortener",
      "track tiktok bio clicks",
    ],
    mode: "custom",
    urlPlaceholder: "Paste your bio destination or TikTok video URL...",
    aliasPlaceholder: "viral-find",
    ctaButtonText: "Shorten TikTok Link",
    overviewTitle: "Convert TikTok Views Into Measurable Bio Clicks",
    overviewParagraphs: [
      "When a TikTok video goes viral, thousands of viewers tap your profile for 3 seconds. If your bio link is a cut-off URL with random parameters, viewers bounce without clicking.",
      "Shortnow gives creators, affiliates, and brands a crisp custom URL (`shortnow.site/get-template`, `shortnow.site/shop-deal`) that loads in under 15ms inside TikTok's in-app browser and counts every click live.",
    ],
    howItWorksTitle: "How to Use Shortnow for TikTok Growth",
    steps: [
      {
        title: "1. Paste Your Offer or Store Link",
        description:
          "Enter your product page, affiliate link, Linktree alternative, or TikTok video URL.",
      },
      {
        title: "2. Pick a Short Call-to-Action Alias",
        description:
          "Mention the exact link on screen in your video (e.g., 'Go to shortnow.site/presets').",
      },
      {
        title: "3. Watch Real-Time Clicks Roll In",
        description:
          "Open `/stats/slug` to see how many viewers actually tapped through from your viral clip.",
      },
    ],
    deepDiveTitle: "Why Even Accounts Without 1,000 Followers Use Shortnow",
    deepDiveBlocks: [
      {
        subtitle: "1. Verbal & Text-On-Screen Links",
        points: [
          {
            label: "The 1,000 Follower Bio Rule",
            text: "TikTok often restricts clickable bio links until an account reaches 1,000 followers or business verification.",
          },
          {
            label: "Typeable Short URLs in Captions",
            text: "Put a super-short custom link (`shortnow.site/deal7`) in your pinned comment or video text overlay so viewers can type it effortlessly.",
          },
        ],
      },
      {
        subtitle: "2. Zero Interstitial Delay",
        points: [
          {
            label: "Fast In-App WebView",
            text: "Direct HTTP redirects ensure your landing page opens immediately inside TikTok.",
          },
          {
            label: "Free QR Code for Live Streams",
            text: "Display your generated QR code on screen during TikTok LIVE sessions.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I use Shortnow links in my TikTok bio?",
        answer:
          "Yes! Shortnow uses clean HTTPS redirects with no intermediate ad pages, making it safe for TikTok profiles.",
      },
      {
        question: "Can I also shorten long TikTok video sharing links?",
        answer:
          "Yes, paste any `tiktok.com/@user/video/...` link to turn it into a clean short URL for cross-posting on X, Instagram, or WhatsApp.",
      },
    ],
  },
  {
    slug: "linkedin-url-shortener",
    navTitle: "LinkedIn URL Shortener",
    badge: "B2B Content & Personal Branding",
    h1Main: "LinkedIn URL",
    h1Accent: "Shortener.",
    subtitle:
      "Turn long LinkedIn profile URLs, company posts, and outbound article links into clean custom links with click tracking.",
    metaTitle: "Free LinkedIn URL Shortener for Posts, Profiles & Resumes | Shortnow",
    metaDescription:
      "Shorten LinkedIn profile links for resumes and create clean, trackable outbound links for LinkedIn posts and newsletters.",
    keywords: [
      "linkedin url shortener",
      "shorten link for linkedin post",
      "custom link for linkedin profile resume",
      "track linkedin post link clicks",
    ],
    mode: "custom",
    urlPlaceholder: "Paste your article, lead magnet, or LinkedIn profile URL...",
    aliasPlaceholder: "b2b-report",
    ctaButtonText: "Shorten LinkedIn Link",
    overviewTitle: "Professional Short Links for LinkedIn Posts, DMs & Resumes",
    overviewParagraphs: [
      "Sharing raw URLs with long query strings inside LinkedIn posts, first-comment links, or cold outreach messages looks unpolished—and LinkedIn's native `lnkd.in` wrapper doesn't let you see click counts or customize the slug.",
      "With Shortnow, founders, recruiters, and B2B marketers can create readable custom links (`shortnow.site/q3-report`, `shortnow.site/hire-alex`) with a matching QR code for conference badges and pitch decks.",
    ],
    howItWorksTitle: "How to Create Branded Links for LinkedIn",
    steps: [
      {
        title: "1. Paste Your Article, Case Study, or Profile URL",
        description:
          "Works with any external blog post, webinar registration page, or your own `linkedin.com/in/...` profile.",
      },
      {
        title: "2. Choose an Executive Custom Slug",
        description:
          "Pick a clean alias like `shortnow.site/saas-playbook` for your post or 'link in first comment'.",
      },
      {
        title: "3. Measure True Outbound Engagement",
        description:
          "LinkedIn impressions don't equal website visits—check `/stats/slug` to see real outbound clicks.",
      },
    ],
    deepDiveTitle: "High-Impact Use Cases for Professionals",
    deepDiveBlocks: [
      {
        subtitle: "1. 'Link in First Comment' Tracking",
        points: [
          {
            label: "Algorithm-Friendly Sharing",
            text: "Many B2B creators place outbound links in the first comment to maximize post reach.",
          },
          {
            label: "Dedicated Click Counter",
            text: "Since LinkedIn doesn't report clicks on comment links, Shortnow gives you exact click telemetry.",
          },
        ],
      },
      {
        subtitle: "2. Resumes, CVs & Conference Badges",
        points: [
          {
            label: "Know When Recruiters Click Your Resume",
            text: "Put `shortnow.site/cv-yourname` on your PDF resume and see whenever a hiring manager clicks through to your portfolio.",
          },
          {
            label: "Networking QR Code",
            text: "Save the generated QR code to your phone lock screen for instant LinkedIn connections at events.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Why use Shortnow instead of LinkedIn's automatic lnkd.in shortener?",
        answer:
          "LinkedIn's `lnkd.in` generates a random hash, only works inside post bodies (not in comments, DMs, or PDFs), and does not give you a public click counter or QR code.",
      },
      {
        question: "Does Shortnow preserve OpenGraph preview cards on LinkedIn?",
        answer:
          "Yes! LinkedIn's crawler follows Shortnow's HTTP redirect directly to your destination article and renders the target page's title and thumbnail image.",
      },
    ],
  },
  {
    slug: "notion-link-shortener",
    navTitle: "Notion Link Shortener",
    badge: "Templates, Docs & Portfolios",
    h1Main: "Notion Link",
    h1Accent: "Shortener.",
    subtitle:
      "Replace 60-character Notion page hashes (`notion.site/Page-Title-3f8a9b...`) with a clean, memorable custom short link.",
    metaTitle: "Free Notion Link Shortener for Public Pages & Templates | Shortnow",
    metaDescription:
      "Shorten long Notion public page and template links (`notion.site/...`) into clean custom URLs (`shortnow.site/my-wiki`) with click tracking.",
    keywords: [
      "notion link shortener",
      "shorten notion url",
      "custom url for notion page free",
      "track notion template clicks",
    ],
    mode: "custom",
    urlPlaceholder: "https://yourname.notion.site/Workspace-3f9a8c7b6d5e...",
    aliasPlaceholder: "product-wiki",
    ctaButtonText: "Shorten Notion Link",
    overviewTitle: "Give Your Public Notion Pages a Clean URL",
    overviewParagraphs: [
      "Notion is one of the best ways to publish templates, job boards, startup wikis, and client portals—but every shared Notion link ends with a 32-character hexadecimal ID (`https://notion.site/My-Resume-1a2b3c4d5e6f7g8h9i0j`).",
      "Shortnow lets you give any public Notion page a crisp custom alias like `shortnow.site/habit-tracker` or `shortnow.site/press-kit` for free, plus tracks how many visitors open your workspace.",
    ],
    howItWorksTitle: "How to Shorten a Notion Page Link",
    steps: [
      {
        title: "1. Publish Your Notion Page to the Web",
        description:
          "In Notion, click 'Share' → 'Publish' and copy your public `notion.site` link.",
      },
      {
        title: "2. Pick a Clean Custom Alias",
        description:
          "Paste the Notion URL above and enter a short slug without random hex IDs.",
      },
      {
        title: "3. Share & Track Template Views",
        description:
          "Since free Notion pages don't include visitor analytics, use `/stats/slug` to see how many people opened your page!",
      },
    ],
    deepDiveTitle: "Free Analytics for Notion Creators & Teams",
    deepDiveBlocks: [
      {
        subtitle: "1. Visitor Counter for Free Notion Plans",
        points: [
          {
            label: "Built-in Notion Analytics Require Plus/Business",
            text: "Standard Notion workspaces limit page view analytics.",
          },
          {
            label: "Instant Click Tracking",
            text: "Every visit through your Shortnow link is counted automatically.",
          },
        ],
      },
      {
        subtitle: "2. Clean Links for Gumroad & Template Creators",
        points: [
          {
            label: "Preview Links That Convert",
            text: "Share clean demo links (`shortnow.site/crm-demo`) on X and Product Hunt.",
          },
          {
            label: "QR Code for Event Schedules",
            text: "Print a QR code that opens your live Notion conference schedule.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does Shortnow embed my Notion page or redirect to it?",
        answer:
          "Shortnow performs an instant <15ms redirect directly to your official `notion.site` page so all Notion interactive toggles, databases, and dark mode work natively.",
      },
      {
        question: "Can I track how many people opened my Notion resume or portfolio?",
        answer:
          "Yes! Create a custom link like `shortnow.site/john-portfolio` and check `shortnow.site/john-portfolio+` anytime to see total opens.",
      },
    ],
  },
  {
    slug: "canva-link-shortener",
    navTitle: "Canva Link Shortener",
    badge: "Presentations & Design Sharing",
    h1Main: "Canva Link",
    h1Accent: "Shortener & QR.",
    subtitle:
      "Turn long Canva public view links and template sharing URLs (`canva.com/design/DAG...`) into clean, branded short links.",
    metaTitle: "Free Canva Link Shortener for Presentations & Templates | Shortnow",
    metaDescription:
      "Shorten long Canva view-only presentation, portfolio, and template URLs into clean custom links (`shortnow.site/our-deck`) with QR codes.",
    keywords: [
      "canva link shortener",
      "shorten canva view link",
      "custom url for canva website",
      "canva presentation qr code",
    ],
    mode: "custom",
    urlPlaceholder: "https://www.canva.com/design/DAG.../view",
    aliasPlaceholder: "brand-guidelines",
    ctaButtonText: "Shorten Canva Link",
    overviewTitle: "Share Canva Decks & Templates Without Ugly URLs",
    overviewParagraphs: [
      "Canva's public 'View-only link' and 'Template link' features generate long URLs packed with design tokens (`https://www.canva.com/design/DAGx9Kp2/8fLm3n/view?utm_content=...`) that look messy in client emails.",
      "With Shortnow, designers, teachers, and marketers can wrap any Canva presentation, website, or template inside a clean alias like `shortnow.site/media-kit` and track how many times it gets opened.",
    ],
    howItWorksTitle: "How to Shorten a Canva Design Link",
    steps: [
      {
        title: "1. Copy Your Canva Public View or Template Link",
        description:
          "In Canva, click 'Share' → 'Public view link' (or 'Template link') and copy the URL.",
      },
      {
        title: "2. Choose a Memorable Custom Slug",
        description:
          "Paste the long Canva URL above and enter a short, descriptive alias.",
      },
      {
        title: "3. Send to Clients or Print the QR Code",
        description:
          "Share your clean link and check `/stats/slug` to confirm when your client viewed the deck.",
      },
    ],
    deepDiveTitle: "Why Designers Pair Canva with Shortnow",
    deepDiveBlocks: [
      {
        subtitle: "1. Strip Canva's Default Referral Noise",
        points: [
          {
            label: "Default Canva Share Strings",
            text: "Copied Canva links automatically append `?utm_content=DAG...&utm_campaign=designshare`.",
          },
          {
            label: "Professional Presentation",
            text: "Your client only sees `shortnow.site/studio-deck` in your email signature or proposal.",
          },
        ],
      },
      {
        subtitle: "2. Track Digital Menu & Event Poster Scans",
        points: [
          {
            label: "Hosted on Canva, Tracked on Shortnow",
            text: "Design your wedding invite or cafe menu in Canva, then use Shortnow's QR code to track scans.",
          },
          {
            label: "Instant Updates",
            text: "Edit your Canva design anytime—your Shortnow link and QR code stay identical.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "If I update my design inside Canva, do I need a new Shortnow link?",
        answer:
          "No! Because Canva's public view URL updates automatically when you edit slides, your existing Shortnow link and QR code will always show the latest version.",
      },
      {
        question: "Does this work for Canva Template links sold on Etsy or Gumroad?",
        answer:
          "Yes, it works with both Canva view-only links, Canva websites, and Canva template links.",
      },
    ],
  },
  {
    slug: "google-forms-link-shortener",
    navTitle: "Google Forms Shortener",
    badge: "Surveys, RSVPs & Classroom",
    h1Main: "Google Forms",
    h1Accent: "Shortener & QR.",
    subtitle:
      "Turn Google Forms survey URLs (`docs.google.com/forms/...` or random `forms.gle` hashes) into custom readable links and QR codes.",
    metaTitle: "Free Google Forms Link Shortener & Survey QR Code Maker | Shortnow",
    metaDescription:
      "Create a custom readable short link (`shortnow.site/event-rsvp`) and printable QR code for any Google Form survey or quiz.",
    keywords: [
      "google forms link shortener",
      "custom url for google form",
      "google form qr code generator",
      "shorten google survey link",
    ],
    mode: "qr",
    urlPlaceholder: "https://docs.google.com/forms/d/e/1FAIpQL.../viewform",
    aliasPlaceholder: "feedback-survey",
    ctaButtonText: "Shorten Form & Get QR",
    overviewTitle: "Get More Survey Responses with Custom Links & QR Codes",
    overviewParagraphs: [
      "While Google Forms includes a basic `forms.gle` shortener, it produces a random 17-character case-sensitive hash (`forms.gle/9xKpLm2Qr8TvW4YzA`) that nobody can type from a presentation screen, and it doesn't generate a QR code or track how many people clicked vs submitted.",
      "Shortnow gives your Google Form a human-readable alias (`shortnow.site/attendee-quiz`, `shortnow.site/rsvp-2026`), generates an instant QR code for slides and posters, and counts every form open.",
    ],
    howItWorksTitle: "How to Create a Custom Google Form Link & QR Code",
    steps: [
      {
        title: "1. Copy Your Google Form 'Send' Link",
        description:
          "In Google Forms, click 'Send', switch to the Link tab, and copy the full `docs.google.com/forms/...` URL.",
      },
      {
        title: "2. Enter a Memorable Survey Slug",
        description:
          "Paste the full form URL above and type a clear custom alias like `class-quiz`.",
      },
      {
        title: "3. Project the QR Code & Track Opens",
        description:
          "Download the QR code for your slide deck and compare total form opens (`/stats/slug`) with completed responses.",
      },
    ],
    deepDiveTitle: "Measure Form Drop-Off Rate (Clicks vs Submissions)",
    deepDiveBlocks: [
      {
        subtitle: "1. Discover Your Survey Completion Rate",
        points: [
          {
            label: "Google Forms Only Counts Final Submits",
            text: "Google Forms never tells you if 200 people opened your survey and 180 abandoned it halfway.",
          },
          {
            label: "Compare Opens to Submits",
            text: "Use Shortnow's click counter to see total form opens and calculate your exact completion rate.",
          },
        ],
      },
      {
        subtitle: "2. Note on forms.gle vs Full Form URLs",
        points: [
          {
            label: "Use the Full docs.google.com URL",
            text: "Copy the full `https://docs.google.com/forms/...` address rather than a pre-shortened link for the fastest direct redirect.",
          },
          {
            label: "Pre-Filled Form Links Supported",
            text: "Works seamlessly with Google Forms pre-filled parameter URLs (`?usp=pp_url&entry.123=...`).",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Why is a custom Shortnow link better than forms.gle?",
        answer:
          "`forms.gle` creates a random string of uppercase and lowercase letters that is hard to type from a screen, whereas Shortnow lets you pick a custom word slug (`shortnow.site/rsvp`) and automatically creates a QR code + click counter.",
      },
      {
        question: "Does it work with pre-filled Google Form links?",
        answer:
          "Yes! Pre-filled Google Form URLs are often 300+ characters long—Shortnow compresses them into a clean short link while keeping all pre-filled answers intact.",
      },
    ],
  },
  {
    slug: "shopify-link-shortener",
    navTitle: "Shopify Link Shortener",
    badge: "E-Commerce & Social Selling",
    h1Main: "Shopify & Store",
    h1Accent: "Link Shortener.",
    subtitle:
      "Shorten Shopify product collection URLs, discount auto-apply links, and UTM campaign URLs into high-converting branded links.",
    metaTitle: "Free Shopify Link Shortener & Discount URL Maker | Shortnow",
    metaDescription:
      "Shorten Shopify product, collection, and auto-discount URLs with UTM tags into clean trackable links and QR codes.",
    keywords: [
      "shopify link shortener",
      "shorten shopify product url",
      "shopify discount link shortener",
      "ecommerce utm link shortener",
    ],
    mode: "utm",
    urlPlaceholder: "https://yourstore.com/products/item or /discount/VIP20",
    aliasPlaceholder: "vip-20-off",
    ctaButtonText: "Shorten Store Link",
    overviewTitle: "Higher Conversion Rates for E-Commerce & SMS Campaigns",
    overviewParagraphs: [
      "Shopify collection URLs, cart permalinks (`/cart/419283:1`), and automatic discount links (`/discount/WELCOME15?redirect=/collections/new`) are powerful sales drivers—but when combined with UTM tags, they become too long for SMS marketing and social bios.",
      "Shortnow lets e-commerce brands append UTM attribution tags and compress the entire checkout or product URL into a clean slug like `shortnow.site/flash-sale`.",
    ],
    howItWorksTitle: "How to Shorten Shopify Product & Discount Links",
    steps: [
      {
        title: "1. Paste Your Product, Collection, or Discount Link",
        description:
          "Enter your store URL and optionally fill in `utm_source`, `utm_medium`, and `utm_campaign` right inside the widget.",
      },
      {
        title: "2. Choose a Promo Alias",
        description:
          "Create a high-converting slug such as `shortnow.site/bundle-deal`.",
      },
      {
        title: "3. Deploy Across SMS, Influencer & Print Inserts",
        description:
          "Save character count in SMS blasts and track influencer click performance in real time.",
      },
    ],
    deepDiveTitle: "Built for D2C Brands & Influencer Seeding",
    deepDiveBlocks: [
      {
        subtitle: "1. Track Individual Influencer Links",
        points: [
          {
            label: "Dedicated Slug per Creator",
            text: "Generate `shortnow.site/emma-glow` and `shortnow.site/lucas-glow` in seconds.",
          },
          {
            label: "Instant Click Leaderboard",
            text: "Compare how many clicks each creator drove before checking checkout conversions.",
          },
        ],
      },
      {
        subtitle: "2. Shopify Cart Permalinks & Packaging QR",
        points: [
          {
            label: "1-Click Reorder QR Codes",
            text: "Encode a pre-loaded Shopify cart permalink into a Shortnow QR code and print it on your product bottle for instant reorders.",
          },
          {
            label: "Sub-15ms Redirects",
            text: "Zero redirect lag so mobile shoppers never abandon checkout.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Do Shopify auto-discount links (`/discount/CODE?redirect=...`) work when shortened?",
        answer:
          "Yes! Shortnow forwards the shopper to the exact Shopify discount URL so the promo code is automatically applied to their cart.",
      },
      {
        question: "Can I add UTM parameters for Google Analytics and Shopify Analytics?",
        answer:
          "Yes, our built-in UTM fields on this page automatically attach `utm_source`, `utm_medium`, and `utm_campaign` before shortening.",
      },
    ],
  },
  {
    slug: "podcast-link-shortener",
    navTitle: "Podcast Link Shortener",
    badge: "Audio Creators & Show Notes",
    h1Main: "Podcast Link",
    h1Accent: "Shortener.",
    subtitle:
      "Create easy-to-say, memorable short links (`shortnow.site/ep42`) that listeners can actually remember and type while driving or working out.",
    metaTitle: "Free Podcast Link Shortener for Show Notes & Sponsors | Shortnow",
    metaDescription:
      "Create spoken-word friendly custom short links (`shortnow.site/ep12`) for podcast episodes, sponsor offers, and Spotify/Apple links.",
    keywords: [
      "podcast link shortener",
      "spoken url shortener for podcasts",
      "custom short links for podcast show notes",
      "track podcast sponsor clicks",
    ],
    mode: "custom",
    urlPlaceholder: "Paste Spotify, Apple Podcasts, or sponsor landing page URL...",
    aliasPlaceholder: "episode-42",
    ctaButtonText: "Create Spoken Short Link",
    overviewTitle: "Links Your Listeners Can Actually Remember Out Loud",
    overviewParagraphs: [
      "Podcast listeners are usually driving, walking, or at the gym—they cannot click a link inside an audio stream. If you read out a complicated URL or a random hash on air, 99% of listeners will forget it before they unlock their phone.",
      "Shortnow lets hosts create crystal-clear verbal slugs (`shortnow.site/ep50`, `shortnow.site/book-list`, `shortnow.site/sponsor-name`) and prove exact click counts to podcast sponsors.",
    ],
    howItWorksTitle: "How Podcasters Use Shortnow",
    steps: [
      {
        title: "1. Paste Episode, Lead Magnet, or Sponsor URL",
        description:
          "Enter your Apple Podcasts link, Spotify episode URL, newsletter signup, or sponsor offer.",
      },
      {
        title: "2. Pick a Spoken-Word Friendly Alias",
        description:
          "Use simple dictionary words or episode numbers (`shortnow.site/ep104`) that require zero spelling explanation on air.",
      },
      {
        title: "3. Share Verified Click Stats With Sponsors",
        description:
          "Send sponsors the public `/stats/[slug]` link as transparent proof of listener engagement.",
      },
    ],
    deepDiveTitle: "Why Audio Creators Need Custom Slugs",
    deepDiveBlocks: [
      {
        subtitle: "1. The 'Radio Test' for URLs",
        points: [
          {
            label: "Random Hashes Fail Audio",
            text: "You can never say 'Go to bit-dot-ly slash capital-K-seven-lowercase-q' on a microphone.",
          },
          {
            label: "Clean Memorable Slugs",
            text: "Saying 'Go to shortnow.site/guide' takes two seconds and sticks in memory.",
          },
        ],
      },
      {
        subtitle: "2. Sponsor Attribution & QR for Video Podcasts",
        points: [
          {
            label: "Video Podcast Overlays",
            text: "Display the generated QR code in the corner of your YouTube video podcast episode.",
          },
          {
            label: "Prove Ad Read ROI",
            text: "Track how many listeners visited a sponsor's offer directly from your host-read ad.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I share the analytics page directly with my podcast sponsor?",
        answer:
          "Yes! Every Shortnow link has a clean `/stats/[slug]` page showing total clicks that you can share with sponsors or agencies.",
      },
      {
        question: "Are custom episode slugs free?",
        answer:
          "Yes, you can create custom slugs for every episode (`ep1`, `ep2`, `ep3`) completely free.",
      },
    ],
  },
  {
    slug: "tinyurl-alternative",
    navTitle: "TinyURL Alternative",
    badge: "Modern UI + Live Click Stats",
    h1Main: "The Modern",
    h1Accent: "TinyURL Alternative.",
    subtitle:
      "All the no-login simplicity of TinyURL, upgraded with free real-time click analytics, dynamic QR codes, and a sleek ad-free dark interface.",
    metaTitle: "Best Free TinyURL Alternative with Click Analytics & QR | Shortnow",
    metaDescription:
      "Looking for a modern TinyURL alternative that includes free click tracking and QR codes without login? Try Shortnow.",
    keywords: [
      "tinyurl alternative",
      "free tinyurl alternative with stats",
      "url shortener like tinyurl",
      "ad free url shortener",
    ],
    mode: "custom",
    urlPlaceholder: "Paste any long URL to shorten with live click stats...",
    aliasPlaceholder: "clean-link",
    ctaButtonText: "Shorten URL Now",
    overviewTitle: "Classic Instant Shortening — Now With Free Click Telemetry",
    overviewParagraphs: [
      "TinyURL pioneered instant link shortening in 2002, but its free experience today is cluttered with banner ads, pop-up drawers, and paywalled click analytics.",
      "Shortnow combines the zero-friction speed you love—paste a link, pick an optional alias, and get your short URL in one click—with modern developer-grade features: real-time click counters, instant QR codes, UTM building, and a local browser link history.",
    ],
    howItWorksTitle: "Why Upgrade to Shortnow in 3 Steps",
    steps: [
      {
        title: "1. Paste & Customize Instantly",
        description:
          "No popups, no captcha walls, and no account required—just paste your URL and pick an optional alias.",
      },
      {
        title: "2. Get Free Click Tracking Included",
        description:
          "Every Shortnow link comes with live click counting out of the box—just add '+' to the end of any short link.",
      },
      {
        title: "3. Access Your Links Anytime Locally",
        description:
          "Your browser automatically remembers your recent links and refreshes their live click totals.",
      },
    ],
    deepDiveTitle: "Shortnow vs Legacy 2000s URL Shorteners",
    deepDiveBlocks: [
      {
        subtitle: "1. Zero Clutter & Sub-15ms Redis Engine",
        points: [
          {
            label: "Ad-Heavy Legacy Interfaces",
            text: "Legacy free tools surround the input field with distracting display ads and upsell modals.",
          },
          {
            label: "Focused Minimalist Workspace",
            text: "Shortnow is engineered for speed, clarity, and instant copy-paste productivity.",
          },
        ],
      },
      {
        subtitle: "2. Free Analytics & QR Without Subscriptions",
        points: [
          {
            label: "No Blind Links",
            text: "Never wonder if someone clicked your link again—check `/stats/[slug]` anytime for free.",
          },
          {
            label: "Built-in Marketing Toolkit",
            text: "Includes specialized generators for UTM campaigns, QR codes, and WhatsApp click-to-chat.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does Shortnow track clicks for free without an account?",
        answer:
          "Yes! Unlike TinyURL's free tier, Shortnow tracks clicks on every shortened link automatically and lets you view them anytime via `/stats/your-slug` or by adding `+` to the short URL.",
      },
      {
        question: "Do links created on Shortnow ever expire?",
        answer:
          "No, your shortened links and QR codes remain active permanently.",
      },
    ],
  },
];

export function getSeoToolBySlug(slug: string): SeoToolConfig | undefined {
  return SEO_TOOLS.find((tool) => tool.slug === slug);
}

