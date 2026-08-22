import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/config/projects";
import { services } from "@/config/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url.replace(/\/$/, "");

  const staticRoutes = ["", "/work", "/services", "/about", "/process", "/contact", "/start-a-project"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : 0.8,
    })),
    ...projects.map((p) => ({
      url: `${base}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...services
      .filter((s) => s.hasPage)
      .map((s) => ({
        url: `${base}/services/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];
}
