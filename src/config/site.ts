/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL BUSINESS INFORMATION
 * ─────────────────────────────────────────────────────────────
 *  The agency name and business details are not finalised yet.
 *  "VOLTA" is a PLACEHOLDER working name — change `name` below
 *  and it updates everywhere: nav, footer, metadata, schema,
 *  preloader, OG tags and all body copy.
 *
 *  Nothing in this file is a real-world claim. Every statistic,
 *  metric and testimonial is marked `placeholder: true` and is
 *  rendered with a visible "sample" affordance until replaced.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "VOLTA",
  legalName: "VOLTA Studio",
  tagline: "Digital experiences built to move businesses forward.",
  descriptor: "DIGITAL STUDIO · DESIGN · DEVELOPMENT",
  positioning:
    "We don't just build websites. We build digital experiences that help businesses grow.",

  // Deployed origin. Used for canonical URLs, sitemap and OG tags.
  url: "https://example.com",

  /**
   * CONTACT — all values are placeholders. Nothing here is a real
   * phone number, address or inbox. Replace before going live.
   * `null` hides the corresponding UI affordance entirely.
   */
  contact: {
    email: "hello@example.com",
    phone: null as string | null,
    whatsapp: null as string | null, // e.g. "38344123456" (digits only)
    bookingUrl: null as string | null, // e.g. a Cal.com / Calendly link
    location: "Working with clients internationally",
    availability: "Currently taking new projects",
  },

  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Behance", href: "#" },
    { label: "Dribbble", href: "#" },
    { label: "TikTok", href: "#" },
  ],

  /**
   * HERO STATISTICS — placeholders.
   * Set `placeholder: false` once a number is real and verifiable.
   */
  stats: [
    { value: "50", suffix: "+", label: "Websites & Projects", placeholder: true },
    { value: "10", suffix: "+", label: "Industries", placeholder: true },
    { value: "100", suffix: "%", label: "Custom Design", placeholder: false },
    { value: "Global", suffix: "", label: "Client Focus", placeholder: false },
  ],

  /**
   * RESULTS METRICS — intentionally left as `null` values.
   * The brief says: do not fabricate results. These render as
   * an em-dash with a "pending real data" note until filled in.
   */
  results: [
    { value: null as number | null, prefix: "+", suffix: "%", label: "Conversion" },
    { value: null as number | null, prefix: "−", suffix: "%", label: "Load Time" },
    { value: null as number | null, prefix: "+", suffix: "%", label: "Engagement" },
    { value: null as number | null, prefix: "+", suffix: "", label: "Projects Delivered" },
  ],

  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Contact", href: "/contact" },
  ],

  cta: {
    primary: { label: "Start a Project", href: "/start-a-project" },
    secondary: { label: "View Our Work", href: "/work" },
    tertiary: { label: "Let's Talk", href: "/contact" },
  },

  seo: {
    keywords: [
      "web design agency",
      "web development agency",
      "digital agency",
      "web design Kosovo",
      "web design Europe",
      "website development",
      "branding agency",
      "UI UX design agency",
      "e-commerce development",
      "AI automation agency",
      "custom web development",
      "digital solutions",
    ],
  },
} as const;

export type Site = typeof site;
