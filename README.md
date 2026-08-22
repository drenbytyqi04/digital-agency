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
npm run dev           # http://localhost:3000
npm run build         # production build
npm run typecheck     # tsc --noEmit
npm run check:images  # verify every Unsplash photo resolves
```

## Configuration — one place for everything

No business information is hardcoded in components. Everything lives in `src/config/`:

| File | Holds |
| --- | --- |
| `site.ts` | Agency name, tagline, contact details, socials, statistics, results metrics, nav, CTAs, SEO keywords |
| `services.ts` | The eight services, their copy, capabilities, and which get their own page |
| `projects.ts` | Case studies — narrative, services, technologies, cover art, metrics |
| `content.ts` | Process, differentiators, technologies, industries, testimonials, FAQ, form options |
| `images.ts` | Every Unsplash photo — ID, alt text, photographer credit |

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

## Photography

All photography is Unsplash, served from `images.unsplash.com` through
`next/image` (AVIF/WebP, responsive `sizes`, lazy below the fold, blur-up
placeholder). Nothing is hardcoded in a component — every photo is declared in
`src/config/images.ts` with its alt text and photographer credit.

### Art direction — show the work, not the client's industry

This is an agency site, so the imagery is about what the studio *makes*. A
photograph of food on a restaurant case study says "we photograph restaurants";
a screen showing the site we built says "we build websites".

| Slot | Subject |
| --- | --- |
| Project covers | Interfaces, devices, design craft — the deliverable |
| About | Studio, type specimens, colour systems |
| Industries | Sector imagery *is* correct here — the section is about sectors served |

### Treatment

Photographs render **in full colour**. Cohesion comes from the dark surround
and a bottom scrim that settles each frame into the page, not from desaturating
it.

```tsx
<Photo treatment="color" />    // full colour + scrim (default)
<Photo treatment="soft" />     // full colour, dimmed — for photos carrying text
<Photo treatment="duotone" />  // desaturated + accent tint (available, not default)
```

Hero and closing-CTA backdrops keep a brightness reduction and low opacity.
That is **not** styling — the headline sits on top of them, and those values
are what hold its contrast. Measured against a worst-case pure-white
photograph, the brightest pixel behind each headline is `rgb(32,32,32)`:

| Headline | Contrast |
| --- | --- |
| Hero | 12.95:1 |
| Closing CTA | 12.82:1 |

Both pass AA at any text size. If you raise those opacities, re-measure.

The filter is set through CSS custom properties declared as classes, not inline
styles — an inline filter outranks the hover rule and silently kills the
hover lift.

### ⚠️ Verify the photo IDs before launch

The photo IDs were authored in a sandbox where `images.unsplash.com` is
network-blocked, so **they could not be fetched and confirmed**. Run this on a
machine with normal internet access:

```bash
npm run check:images
```

It reports each ID as `ok` or `FAIL`, and distinguishes a blocked network from a
genuinely bad ID so you don't go hunting for replacements that were never wrong.
Swap any failures in `src/config/images.ts`.

### Where photography appears

| Section | Images |
| --- | --- |
| Hero | Graded backdrop behind the headline |
| Services | Row-anchored preview on hover **and keyboard focus** |
| Work / case studies | Cover plus two distinct gallery shots per project |
| Service pages | Header image per service |
| Industries | Cursor-following preview, pointer-only |
| Branding | Three-image editorial composition |
| Website showcase | Live screen inside the device frame |
| About | Studio, workspace, process |
| Closing CTA | Graded backdrop |

42 photos in total.

### Graceful degradation

Meaningful photos render through `<Photo>`, which falls back to the generated
gradient artwork if the image fails to load; purely decorative ones use
`<DecorImage>`, which removes itself so the designed gradient shows through — a stale ID, an offline build or a
blocked CDN degrades to something deliberate rather than a broken-image icon.
This path is exercised and verified: with Unsplash blocked, the site renders
**zero broken images**.

### To replace a photo

1. Find it on unsplash.com
2. Take the ID from the URL — `unsplash.com/photos/<slug>-<ID>`, or copy the
   image address and take the `photo-…` segment
3. Paste it as `id` in `src/config/images.ts` and update `alt` and `credit`

### Licence

Unsplash photos are free for commercial and non-commercial use with no
permission needed. Attribution is not required but is appreciated — each photo's
`credit` is rendered on its case-study page.

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

## Mobile performance

Animation work is tuned per input device rather than run identically everywhere.

| | Before | After |
| --- | --- | --- |
| Lenis smooth scroll on touch | active | **off** |
| Blur filters ≥ 40px | 2 | **0** |
| `backdrop-filter` elements | 6 | **1** |
| Permanently promoted `will-change` layers | 6 | **0** |
| Infinite animations running off-screen | 11 | **0** |

- **Lenis runs on pointer devices only.** On a phone it intercepted touch
  scrolling and re-drove it from JavaScript, replacing native momentum with a
  laggy, floaty scroll — and every scroll-linked reveal inherited that lag, so
  sections appeared to open late.
- **The accent blooms use gradients, not `blur()`.** A 120px blur on a 600px
  layer bought almost nothing over the radial gradient already underneath it,
  while forcing a large offscreen buffer to recomposite on every scroll frame.
- **Marquees pause off-screen** via IntersectionObserver and release their
  `will-change` layer when paused. They resume and animate normally when
  scrolled back into view.
- **Hero parallax, the CTA pulse and the automation flow dots are pointer-only** —
  decorative loops that cost frames and battery on mobile for effects that are
  barely perceptible on a small viewport.

The marquee CSS lives in `@layer components` deliberately: unlayered rules
outrank every Tailwind utility, and while it sat outside a layer the pause
classes were silently overridden.

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
