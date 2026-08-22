/**
 * PLACEHOLDER PROJECTS.
 * These are illustrative project archetypes, not real clients.
 * Every entry is `placeholder: true` and renders with a visible
 * "Sample project" marker. Replace with real work before launch.
 */
export type Project = {
  slug: string;
  name: string;
  industry: string;
  year: string;
  summary: string;
  services: string[];
  technologies: string[];
  /** Tailwind gradient classes used for the generated cover art */
  art: { from: string; to: string; accent: string };
  challenge: string;
  strategy: string;
  design: string;
  development: string;
  outcome: string;
  /** Metrics stay null until real, verifiable numbers exist. */
  metrics: { label: string; value: string | null }[];
  placeholder: true;
};

export const projects: Project[] = [
  {
    slug: "sample-restaurant",
    name: "Maison Nord",
    industry: "Restaurant",
    year: "2026",
    summary:
      "A single-location restaurant that needed reservations to happen on the site instead of over the phone.",
    services: ["Website Design", "Development", "Branding"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Headless CMS"],
    art: { from: "#1a1410", to: "#050505", accent: "#C2703D" },
    challenge:
      "Bookings arrived by phone during service, pulling staff off the floor at the busiest hour. The old site showed a PDF menu that had been out of date for two seasons.",
    strategy:
      "Make reservation the single primary action on every screen, and move the menu into a CMS the kitchen can edit without a developer.",
    design:
      "Editorial layout built around food photography at full-bleed scale, with the booking action persistent but never covering content.",
    development:
      "Next.js with a headless CMS for menu and hours. Reservation widget loaded lazily so it never blocks first paint.",
    outcome:
      "Menu updates that used to take a support ticket now take the kitchen about two minutes.",
    metrics: [
      { label: "Phone bookings displaced", value: null },
      { label: "Menu update time", value: null },
    ],
    placeholder: true,
  },
  {
    slug: "sample-travel",
    name: "Atlas & Meridian",
    industry: "Travel Agency",
    year: "2026",
    summary:
      "A tour operator with strong itineraries buried under a booking flow nobody finished.",
    services: ["UI/UX Design", "Development", "SEO"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    art: { from: "#0d1520", to: "#050505", accent: "#4D7CFE" },
    challenge:
      "Itinerary pages were long, undifferentiated and gave no sense of the actual trip. The enquiry form asked for eleven fields before showing a price.",
    strategy:
      "Lead with the itinerary as a narrative, and cut the enquiry down to what genuinely qualifies a lead.",
    design:
      "Day-by-day timeline with sticky trip summary, so price and dates stay visible while the traveller reads.",
    development:
      "Static itinerary pages for speed, with a progressively enhanced multi-step enquiry writing to Supabase.",
    outcome:
      "Enquiries now arrive with enough context to quote without a follow-up email.",
    metrics: [
      { label: "Form fields before price", value: null },
      { label: "Enquiry completion", value: null },
    ],
    placeholder: true,
  },
  {
    slug: "sample-real-estate",
    name: "Northline Properties",
    industry: "Real Estate",
    year: "2025",
    summary:
      "A property platform where search worked but nothing else convinced anyone to call.",
    services: ["Web Application", "UI/UX Design", "Branding"],
    technologies: ["Next.js", "TypeScript", "Supabase", "Mapbox"],
    art: { from: "#101418", to: "#050505", accent: "#8B5CF6" },
    challenge:
      "Listings loaded slowly on mobile, and saved searches were lost the moment someone closed the tab.",
    strategy:
      "Treat the listing as the product page it actually is, and make saved state survive the session.",
    design:
      "Dense but calm listing cards, with the gallery and the enquiry action reachable without scrolling past the fold on mobile.",
    development:
      "Virtualised listing grid, image optimisation at the CDN, and persisted saved searches tied to a lightweight account.",
    outcome:
      "Agents receive enquiries that reference specific properties instead of generic contact requests.",
    metrics: [
      { label: "Listing load time", value: null },
      { label: "Saved search retention", value: null },
    ],
    placeholder: true,
  },
  {
    slug: "sample-ecommerce",
    name: "Fold & Grain",
    industry: "E-commerce",
    year: "2025",
    summary:
      "A homeware brand with excellent product photography and a checkout that lost people at shipping.",
    services: ["E-commerce", "Website Design", "Performance"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    art: { from: "#181410", to: "#050505", accent: "#D4A574" },
    challenge:
      "Shipping cost appeared for the first time on the final checkout step, and the product page hid variant availability until add-to-cart.",
    strategy:
      "Surface every cost and constraint as early as the catalogue page. Surprises at checkout are abandonment.",
    design:
      "Product pages that show variant stock inline, with shipping thresholds stated on the card itself.",
    development:
      "Stripe checkout with shipping estimated from the first product view, and cart state persisted across devices.",
    outcome:
      "Fewer carts abandoned at the shipping step, because shipping is no longer a reveal.",
    metrics: [
      { label: "Checkout abandonment", value: null },
      { label: "Average order value", value: null },
    ],
    placeholder: true,
  },
  {
    slug: "sample-construction",
    name: "Verge Construction",
    industry: "Construction",
    year: "2025",
    summary:
      "A contractor whose completed work was far better than the website representing it.",
    services: ["Website Design", "Development", "SEO"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    art: { from: "#14120f", to: "#050505", accent: "#9CA3AF" },
    challenge:
      "Twenty years of completed projects existed only as an unsorted photo folder. The site showed six of them.",
    strategy:
      "Turn the archive into the argument. A structured project index is the proof this business already earned.",
    design:
      "Project index filterable by sector and scale, with each entry given a real case layout rather than a lightbox.",
    development:
      "CMS-backed project archive with generated static pages and image optimisation for large site photography.",
    outcome:
      "Tender enquiries now cite specific past projects by name.",
    metrics: [
      { label: "Indexed project pages", value: null },
      { label: "Organic enquiries", value: null },
    ],
    placeholder: true,
  },
  {
    slug: "sample-professional",
    name: "Kestrel Advisory",
    industry: "Professional Services",
    year: "2024",
    summary:
      "A consultancy that read as credible in person and generic online.",
    services: ["Branding", "Website Design", "Development"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Headless CMS"],
    art: { from: "#0f1216", to: "#050505", accent: "#6EE7B7" },
    challenge:
      "The site described capabilities in language indistinguishable from every competitor in the sector.",
    strategy:
      "Replace capability lists with specifics: named sectors, real engagement shapes, actual constraints.",
    design:
      "Typographic identity built for reading, with a restrained palette that lets long-form content carry the page.",
    development:
      "CMS-driven insight articles with structured data, built for a publishing cadence the team can sustain.",
    outcome:
      "Enquiries arrive already aware of which practice area they need.",
    metrics: [
      { label: "Qualified enquiries", value: null },
      { label: "Time on insight pages", value: null },
    ],
    placeholder: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
