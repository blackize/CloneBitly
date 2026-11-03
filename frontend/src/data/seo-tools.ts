export type ToolMode = "default" | "qr" | "utm" | "tracker" | "custom";

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
];

export function getSeoToolBySlug(slug: string): SeoToolConfig | undefined {
  return SEO_TOOLS.find((tool) => tool.slug === slug);
}

