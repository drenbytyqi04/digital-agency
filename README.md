# VOLTA — Digital Agency Website

A premium, animated marketing site for a digital agency, built with Next.js 15,
TypeScript, Tailwind CSS v4, Framer Motion, GSAP-derived motion tokens and Lenis
smooth scroll.

> **The agency name is a placeholder.** `VOLTA` is a working name chosen so the
> build could proceed. Change `name` in `src/config/site.ts` and it updates
> everywhere — nav, footer, metadata, schema, preloader, OG tags and body copy.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Configuration — one place for everything

No business information is hardcoded in components. Everything lives in `src/config/`:

| File | Holds |
| --- | --- |
| `site.ts` | Agency name, tagline, contact details, socials, statistics, results metrics, nav, CTAs, SEO keywords |
| `services.ts` | The eight services, their copy, capabilities, and which get their own page |
| `projects.ts` | Case studies — narrative, services, technologies, cover art, metrics |
| `content.ts` | Process, differentiators, technologies, industries, testimonials, FAQ, form options |

### Honesty defaults

The brief said not to invent achievements, results, clients or contact details.
The build takes that literally:

- **Results metrics are `null`** and render as `—` with a note, not invented numbers.
- **Testimonials** carry a visible "Sample copy — not real client reviews" label.
- **Projects** are marked `placeholder: true` and badged "Sample project".
- **Contact channels** set to `null` (phone, WhatsApp, booking link) are *hidden*
  rather than filled with a plausible-looking fake.
- **Client logos** in the trust bar are wordmarks labelled as samples.

Fill any of these in and the corresponding UI activates automatically.

## Design system

Dark-committed, defined as tokens in `src/app/globals.css`:

- **Surface** `#050505` void, with three lifted planes
- **Type** Instrument Serif (display) · Inter Tight (UI) · JetBrains Mono (labels, numerals)
- **Accent** electric blue `#4D7CFE` → violet `#8B5CF6`
- **Motion** one shared rhythm — `expo.out` easing, exit at ~65% of enter duration

All text tokens are verified against the void surface at AA or better:

| Token | Ratio |
| --- | --- |
| `--color-ink` | 17.35:1 |
| `--color-ink-dim` | 7.88:1 |
| `--color-ink-faint` | 4.97:1 |
| `--color-volt-soft` | 8.07:1 |
| `--color-volt` | 5.46:1 |

## Accessibility

- Every scroll animation is gated on `prefers-reduced-motion`, with a CSS backstop
  guaranteeing content renders in its final readable state. Verified: **0 invisible
  text nodes** under reduced motion.
- The before/after comparison is a native `<input type="range">` — fully keyboard
  operable, satisfying WCAG 2.2 *Dragging Movements*.
- The inquiry form uses visible labels, inline errors wired via `aria-describedby`,
  and a focusable error summary that receives focus on failed submit.
- Focus is never removed, only restyled. Mobile nav traps focus and restores it on close.
- Marquees pause on hover and focus, and render static under reduced motion.
- Skip link, landmark structure, and sequential heading hierarchy throughout.

## Connecting the inquiry form

`src/app/api/inquiry/route.ts` validates and normalises the payload server-side,
then hands off. Set **one** env var — no other file changes:

```bash
INQUIRY_WEBHOOK_URL=...   # Zapier / Make / n8n / any webhook
```

Commented-and-ready blocks for Supabase, Resend email and a generic CRM endpoint
are in the same file. With nothing configured the route logs the payload and
returns 200, so the form is testable end to end.

## SEO

Metadata API with per-route `generateMetadata`, Open Graph and Twitter cards,
Organization JSON-LD, canonical URLs, and generated `sitemap.xml` / `robots.txt`
driven from the same config. Set `site.url` to the real origin before deploying.

## Routes

`/` · `/work` · `/work/[slug]` · `/services` · `/services/[slug]` · `/about` ·
`/process` · `/contact` · `/start-a-project`

24 pages prerender statically; only the inquiry API is dynamic.
