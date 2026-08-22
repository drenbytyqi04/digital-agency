export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  description: string;
  /** Lucide icon name, resolved in components/ui/Icon.tsx */
  icon: string;
  capabilities: string[];
  /** Set true to give this service its own /services/[slug] page */
  hasPage: boolean;
};

export const services: Service[] = [
  {
    slug: "website-design",
    index: "01",
    title: "Website Design",
    short: "Premium websites designed around your brand, audience and goals.",
    description:
      "Every layout starts from your business, not a template library. We design the structure, hierarchy and visual language that make the right thing obvious on every screen.",
    icon: "PenTool",
    capabilities: ["Art direction", "Design systems", "Responsive layout", "Prototyping", "Copy direction"],
    hasPage: true,
  },
  {
    slug: "website-development",
    index: "02",
    title: "Website Development",
    short: "Fast, responsive and scalable websites built with modern technologies.",
    description:
      "Production code built on Next.js and TypeScript. Fast on real devices and real networks, accessible by default, and structured so it stays maintainable long after launch.",
    icon: "Code2",
    capabilities: ["Next.js & React", "TypeScript", "Headless CMS", "Core Web Vitals", "Deployment"],
    hasPage: true,
  },
  {
    slug: "branding",
    index: "03",
    title: "Branding",
    short: "Visual identities that make businesses recognizable and memorable.",
    description:
      "Logo systems, typography, colour and the rules that hold them together, delivered as guidelines your team can actually apply without us in the room.",
    icon: "Sparkles",
    capabilities: ["Logo systems", "Visual identity", "Typography", "Brand guidelines", "Collateral"],
    hasPage: true,
  },
  {
    slug: "ui-ux-design",
    index: "04",
    title: "UI/UX Design",
    short: "User experiences designed to be intuitive, beautiful and conversion-focused.",
    description:
      "Interface work grounded in how people actually move through a product: clear hierarchy, honest affordances, and accessible interaction at every breakpoint.",
    icon: "MousePointerClick",
    capabilities: ["User flows", "Wireframing", "Interaction design", "Accessibility", "Design systems"],
    hasPage: true,
  },
  {
    slug: "ecommerce",
    index: "05",
    title: "E-commerce",
    short: "High-performing online stores designed to turn visitors into customers.",
    description:
      "Storefronts built around the path to checkout: fast catalogue browsing, clear product pages, and a checkout that removes reasons to leave.",
    icon: "ShoppingBag",
    capabilities: ["Storefront design", "Checkout UX", "Product pages", "Payments", "Analytics"],
    hasPage: false,
  },
  {
    slug: "ai-automation",
    index: "06",
    title: "AI & Automation",
    short: "Smart digital systems that automate repetitive business processes.",
    description:
      "Lead routing, CRM sync, email sequences and internal dashboards — the operational work that quietly consumes a team's week, handled by systems instead of people.",
    icon: "Workflow",
    capabilities: ["CRM integration", "Lead automation", "Email workflows", "Internal dashboards", "AI assistants"],
    hasPage: true,
  },
  {
    slug: "seo-performance",
    index: "07",
    title: "SEO & Performance",
    short: "Optimization focused on visibility, speed and measurable growth.",
    description:
      "Technical SEO, structured data and performance work measured against Core Web Vitals — not vanity scores from a single synthetic run.",
    icon: "Gauge",
    capabilities: ["Technical SEO", "Structured data", "Core Web Vitals", "Content structure", "Reporting"],
    hasPage: false,
  },
  {
    slug: "digital-solutions",
    index: "08",
    title: "Digital Solutions",
    short: "Custom websites, dashboards, CRM systems and business tools.",
    description:
      "When off-the-shelf software stops fitting the business, we build the tool that does — dashboards, portals and internal systems on the same modern stack.",
    icon: "LayoutGrid",
    capabilities: ["Web applications", "Dashboards", "Client portals", "Integrations", "Automation"],
    hasPage: false,
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
