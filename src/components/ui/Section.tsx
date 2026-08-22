import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative py-24 md:py-40", className)}>
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="accent-gradient inline-block h-px w-8" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <h2 className="display-lg balance max-w-4xl text-ink">
        <RevealText text={title} by="line" />
      </h2>
      {lead && (
        <Reveal delay={0.1}>
          <p className="pretty max-w-2xl text-lg leading-relaxed text-ink-dim">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
