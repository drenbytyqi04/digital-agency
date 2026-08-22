import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Work } from "@/components/sections/Work";
import { StartProject } from "@/components/sections/StartProject";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects across restaurants, travel, real estate, e-commerce, construction and professional services.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Work That Speaks."
        lead="Sample projects showing how we approach different sectors. Each one is a placeholder illustrating our process, replaced by real client work as it ships."
      />
      <Work showHead={false} />
      <StartProject />
    </>
  );
}
