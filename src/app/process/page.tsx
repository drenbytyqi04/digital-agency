import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { StartProject } from "@/components/sections/StartProject";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Five stages from discovery to launch, each with a named deliverable and a decision point.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title={"From Idea\nto Impact."}
        lead="Five stages, each with a named deliverable and a decision point. You always know what is happening and what comes next."
      />
      <Process showHead={false} />
      <Faq />
      <StartProject />
    </>
  );
}
