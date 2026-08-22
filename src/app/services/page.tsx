import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { StartProject } from "@/components/sections/StartProject";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website design and development, branding, UI/UX, e-commerce, AI and automation, SEO and custom digital solutions.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={"Everything You Need\nto Go Digital."}
        lead="Eight disciplines under one roof. Most projects combine three or four of them."
      />
      <Services />
      <Process />
      <StartProject />
    </>
  );
}
