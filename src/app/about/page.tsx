import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { Technology } from "@/components/sections/Technology";
import { StartProject } from "@/components/sections/StartProject";

export const metadata: Metadata = {
  title: "About",
  description:
    "A creative technology partner combining design, development, branding, strategy and AI into complete digital solutions.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={"Small Team.\nBig Digital Thinking."}
        lead="A creative technology partner, not a traditional agency."
      />
      <About showHead={false} />
      <WhyUs />
      <Technology />
      <StartProject />
    </>
  );
}
