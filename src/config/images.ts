/**
 * ─────────────────────────────────────────────────────────────
 *  UNSPLASH PHOTOGRAPHY
 * ─────────────────────────────────────────────────────────────
 *  ART DIRECTION — this is an AGENCY site, so the imagery shows
 *  the WORK, not the client's industry. A photograph of food on a
 *  restaurant case study says "we photograph restaurants"; a
 *  screen showing the site we built says "we build websites".
 *
 *    project covers → interfaces, devices, design craft
 *    about          → studio, type specimens, colour systems
 *    industries     → sector imagery IS correct here, because the
 *                     section is explicitly about sectors served
 *
 *  Every photo is rendered through <Photo>, which applies a shared
 *  duotone grade so stock photography sits inside the palette and
 *  reads art-directed rather than dropped in.
 * ─────────────────────────────────────────────────────────────
 *  Every photo on the site is declared here — nothing is hardcoded
 *  in a component. Each entry is an Unsplash photo ID plus the alt
 *  text and photographer credit that travel with it.
 *
 *  ⚠️  These IDs were written in an environment where Unsplash is
 *  network-blocked, so they could NOT be fetched and confirmed.
 *  Run `npm run check:images` to verify every URL resolves, and
 *  swap any that report a failure.
 *
 *  TO REPLACE A PHOTO
 *  1. Find it on unsplash.com
 *  2. The ID is the last URL segment: unsplash.com/photos/<slug>-<ID>
 *     …or right-click the image → Copy image address and take the
 *     `photo-…` segment from images.unsplash.com/photo-XXXX
 *  3. Paste it as `id` below and update `alt` + `credit`
 *
 *  Any photo that fails to load falls back to the generated gradient
 *  artwork automatically, so a wrong ID degrades instead of breaking.
 *
 *  LICENCE: Unsplash photos are free for commercial and
 *  non-commercial use with no permission needed. Attribution is not
 *  required but is appreciated — `credit` is rendered on case-study
 *  pages and collected in the README.
 * ─────────────────────────────────────────────────────────────
 */

export type Photo = {
  id: string;
  alt: string;
  credit: string;
};

/** Build a responsive Unsplash URL. Unsplash serves AVIF/WebP via auto=format. */
export function unsplashUrl(id: string, width: number, quality = 80) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

/**
 * Lightweight blur placeholder generated from a colour, so images fade
 * in from the project's own accent rather than flashing white. Avoids
 * shipping real base64 thumbnails we cannot generate offline.
 */
export function blurFrom(hex: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="6"><rect width="8" height="6" fill="${hex}"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/* ── PROJECT COVERS ──────────────────────────────────────────
 * Keyed by the project slug in src/config/projects.ts
 * ────────────────────────────────────────────────────────── */
export const projectPhotos: Record<string, Photo> = {
  "sample-restaurant": {
    id: "photo-1467232004584-a241de8bcf5d",
    alt: "Website design for a restaurant displayed on a laptop screen",
    credit: "Igor Miske on Unsplash",
  },
  "sample-travel": {
    id: "photo-1512941937669-90a1b58e7e9c",
    alt: "Travel booking interface open on a phone and laptop",
    credit: "Windows on Unsplash",
  },
  "sample-real-estate": {
    id: "photo-1497215728101-856f4ea42174",
    alt: "Property listing platform on a desktop display",
    credit: "Nastuh Abootalebi on Unsplash",
  },
  "sample-ecommerce": {
    id: "photo-1523206489230-c012c64b2b48",
    alt: "Online store product page shown on a screen",
    credit: "Roberto Cortese on Unsplash",
  },
  "sample-construction": {
    id: "photo-1503387837-b154d5074bd2",
    alt: "Architectural drawings and plans laid out on a desk",
    credit: "Daniel McCullough on Unsplash",
  },
  "sample-professional": {
    id: "photo-1531403009284-440f080d1e12",
    alt: "Wireframes and interface sketches across a working desk",
    credit: "Kelly Sikkema on Unsplash",
  },
};

/* ── ABOUT ───────────────────────────────────────────────── */
export const aboutPhotos: Record<"team" | "workspace" | "process", Photo> = {
  team: {
    id: "photo-1600880292089-90a7e086ee0c",
    alt: "Designers reviewing layouts together at a studio desk",
    credit: "Amy Hirschi on Unsplash",
  },
  workspace: {
    id: "photo-1481487196290-c152efe083f5",
    alt: "Studio workspace with colour swatches and type specimens",
    credit: "Mika Baumeister on Unsplash",
  },
  process: {
    id: "photo-1558655146-d09347e92766",
    alt: "Colour palette and brand system explorations on paper",
    credit: "Balázs Kétyi on Unsplash",
  },
};

/* ── INDUSTRIES ──────────────────────────────────────────────
 * Hover previews. Keyed by industry name in src/config/content.ts
 * ────────────────────────────────────────────────────────── */
export const industryPhotos: Record<string, Photo> = {
  Restaurants: {
    id: "photo-1414235077428-338989a2e8c0",
    alt: "Restaurant interior during service",
    credit: "Jay Wennington on Unsplash",
  },
  Hotels: {
    id: "photo-1566073771259-6a8506099945",
    alt: "Hotel room with made bed and soft lighting",
    credit: "Reisetopia on Unsplash",
  },
  "Travel Agencies": {
    id: "photo-1476514525535-07fb3b4ae5f1",
    alt: "Winding road through a mountain valley",
    credit: "Luca Bravo on Unsplash",
  },
  "Real Estate": {
    id: "photo-1560518883-ce09059eeffa",
    alt: "Estate agent handing over keys in a bright interior",
    credit: "Maria Ziegler on Unsplash",
  },
  Construction: {
    id: "photo-1503387762-592deb58ef4e",
    alt: "Crane and steel frame on a construction site",
    credit: "Danist Soh on Unsplash",
  },
  "E-commerce": {
    id: "photo-1472851294608-062f824d29cc",
    alt: "Retail products styled on a clean background",
    credit: "Heidi Fin on Unsplash",
  },
  Startups: {
    id: "photo-1519389950473-47ba0277781c",
    alt: "Team working together at laptops in an open office",
    credit: "Marvin Meyer on Unsplash",
  },
  "Professional Services": {
    id: "photo-1600880292203-757bb62b4baf",
    alt: "Two professionals in discussion across a desk",
    credit: "Amy Hirschi on Unsplash",
  },
  Technology: {
    id: "photo-1518770660439-4636190af475",
    alt: "Close detail of circuitry and hardware",
    credit: "Umberto on Unsplash",
  },
  "Local Businesses": {
    id: "photo-1441986300917-64674bd600d8",
    alt: "Independent shopfront with window display",
    credit: "Alex Kotliarskyi on Unsplash",
  },
};


/* ── PROJECT GALLERIES ───────────────────────────────────────
 * Distinct supporting shots per case study. The cover alone was
 * previously reused for the hero AND both device frames, so the
 * "gallery" showed one photograph three times.
 * ────────────────────────────────────────────────────────── */
export const projectGalleries: Record<string, Photo[]> = {
  "sample-restaurant": [
    {
      id: "photo-1555396273-367ea4eb4db5",
      alt: "Menu layout and typography detail on screen",
      credit: "Kate Townsend on Unsplash",
    },
    {
      id: "photo-1512941937669-90a1b58e7e9c",
      alt: "Reservation flow shown on a mobile device",
      credit: "Windows on Unsplash",
    },
  ],
  "sample-travel": [
    {
      id: "photo-1504198266287-1659872e6590",
      alt: "Itinerary timeline laid out across a wide screen",
      credit: "Annie Spratt on Unsplash",
    },
    {
      id: "photo-1522199755839-a2bacb67c546",
      alt: "Enquiry form in use on a laptop",
      credit: "Windows on Unsplash",
    },
  ],
  "sample-real-estate": [
    {
      id: "photo-1460925895917-afdab827c52f",
      alt: "Listing dashboard with data and map view",
      credit: "Carlos Muza on Unsplash",
    },
    {
      id: "photo-1551650975-87deedd944c3",
      alt: "Saved-search interface on a handheld device",
      credit: "UX Store on Unsplash",
    },
  ],
  "sample-ecommerce": [
    {
      id: "photo-1441984904996-e0b6ba687e04",
      alt: "Product catalogue grid on a storefront",
      credit: "Charles Deluvio on Unsplash",
    },
    {
      id: "photo-1556742049-0cfed4f6a45d",
      alt: "Checkout step shown on a phone",
      credit: "Rupixen on Unsplash",
    },
  ],
  "sample-construction": [
    {
      id: "photo-1487958449943-2429e8be8625",
      alt: "Structural detail from a completed building",
      credit: "Joel Filipe on Unsplash",
    },
    {
      id: "photo-1497366754035-f200968a6e72",
      alt: "Project archive browsed on a desktop screen",
      credit: "Nastuh Abootalebi on Unsplash",
    },
  ],
  "sample-professional": [
    {
      id: "photo-1454165804606-c3d57bc86b40",
      alt: "Insight article layout with long-form typography",
      credit: "Campaign Creators on Unsplash",
    },
    {
      id: "photo-1517245386807-bb43f82c33c4",
      alt: "Practice-area navigation on a tablet",
      credit: "Carl Heyerdahl on Unsplash",
    },
  ],
};

/* ── SERVICES ────────────────────────────────────────────────
 * Hover previews on the service index, and the header image on
 * each /services/[slug] page. Keyed by service slug.
 * ────────────────────────────────────────────────────────── */
export const servicePhotos: Record<string, Photo> = {
  "website-design": {
    id: "photo-1559028012-481c04fa702d",
    alt: "Layout compositions and grid work on screen",
    credit: "Balázs Kétyi on Unsplash",
  },
  "website-development": {
    id: "photo-1461749280684-dccba630e2f6",
    alt: "Source code open in an editor",
    credit: "Jantine Doornbos on Unsplash",
  },
  branding: {
    id: "photo-1626785774573-4b799315345d",
    alt: "Brand collateral and printed identity pieces",
    credit: "Kelly Sikkema on Unsplash",
  },
  "ui-ux-design": {
    id: "photo-1586717791821-3f44a563fa4c",
    alt: "Interface wireframes pinned across a wall",
    credit: "Hal Gatewood on Unsplash",
  },
  ecommerce: {
    id: "photo-1472851294608-062f824d29cc",
    alt: "Online storefront product listing",
    credit: "Heidi Fin on Unsplash",
  },
  "ai-automation": {
    id: "photo-1620712943543-bcc4688e7485",
    alt: "Abstract representation of connected systems",
    credit: "Google DeepMind on Unsplash",
  },
  "seo-performance": {
    id: "photo-1551288049-bebda4e38f71",
    alt: "Analytics dashboard showing traffic trends",
    credit: "Luke Chesser on Unsplash",
  },
  "digital-solutions": {
    id: "photo-1531482615713-2afd69097998",
    alt: "Custom dashboard interface on a large display",
    credit: "Alvaro Reyes on Unsplash",
  },
};

/* ── SECTION IMAGERY ─────────────────────────────────────── */
export const sectionPhotos = {
  /** Hero backdrop — heavily graded, sits behind the headline */
  hero: {
    id: "photo-1497366858526-0766cadbe8fa",
    alt: "",
    credit: "Nastuh Abootalebi on Unsplash",
  } as Photo,
  /** Closing CTA backdrop */
  cta: {
    id: "photo-1451187580459-43490279c0fa",
    alt: "",
    credit: "NASA on Unsplash",
  } as Photo,
  /** Live screen inside the device showcase frame */
  showcase: {
    id: "photo-1467232004584-a241de8bcf5d",
    alt: "Finished website design displayed full-screen",
    credit: "Igor Miske on Unsplash",
  } as Photo,
};

/** Branding section composition. */
export const brandingPhotos: Photo[] = [
  {
    id: "photo-1600096194534-95cf5ece04cf",
    alt: "Logo marks applied across printed collateral",
    credit: "Kelly Sikkema on Unsplash",
  },
  {
    id: "photo-1524758631624-e2822e304c36",
    alt: "Business cards and stationery in a brand system",
    credit: "Brooke Cagle on Unsplash",
  },
  {
    id: "photo-1611532736597-de2d4265fba3",
    alt: "Packaging designed within a brand identity",
    credit: "Mediamodifier on Unsplash",
  },
];

/** Flat list used by the credits section and the verification script. */
export const allPhotos: Photo[] = [
  ...Object.values(projectPhotos),
  ...Object.values(projectGalleries).flat(),
  ...Object.values(servicePhotos),
  ...Object.values(aboutPhotos),
  ...Object.values(industryPhotos),
  ...Object.values(sectionPhotos),
  ...brandingPhotos,
];
