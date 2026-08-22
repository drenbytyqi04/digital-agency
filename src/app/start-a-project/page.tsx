import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectForm } from "@/components/forms/ProjectForm";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell us about your project. Four short steps, about two minutes.",
  alternates: { canonical: "/start-a-project" },
};

export default function StartProjectPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a project"
        title="Let's Build Something Great."
        lead="Four short steps, about two minutes. Enough for us to come back with a real answer rather than a discovery call."
      />
      <section className="shell py-20 md:py-24">
        <div className="max-w-3xl">
          <ProjectForm />
        </div>
      </section>
    </>
  );
}
