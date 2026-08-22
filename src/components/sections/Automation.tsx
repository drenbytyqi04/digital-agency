"use client";

import { useEffect, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";
import { automationFlow, automationCapabilities } from "@/config/content";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { motionTokens } from "@/lib/utils";

export function Automation() {
  const reduce = useReducedMotion();
  /* Four dots looping forever is a constant compositor cost for pure
     decoration. Pointer devices only. */
  const [flow, setFlow] = useState(false);
  useEffect(() => {
    if (reduce) return;
    setFlow(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, [reduce]);

  return (
    <Section className="relative overflow-hidden bg-surface">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-lines opacity-30" />

      <div className="shell relative">
        <SectionHead
          eyebrow="AI & Automation"
          title={"Work Smarter.\nAutomate More."}
          lead="The operational work that quietly consumes a team's week — routing, follow-up, reporting — handled by systems instead of people."
        />

        {/* Flow diagram */}
        <ol className="mt-20 flex flex-col gap-0 lg:flex-row lg:items-stretch">
          {automationFlow.map((node, i) => (
            <li key={node.label} className="flex flex-1 flex-col lg:flex-row lg:items-center">
              <Reveal delay={i * 0.08} className="flex-1">
                <div className="relative rounded-xl border border-line bg-void p-6">
                  <span className="tnum font-mono text-[10px] text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl leading-none text-ink">{node.label}</h3>
                  <p className="pretty mt-2 text-xs leading-relaxed text-ink-dim">{node.detail}</p>
                </div>
              </Reveal>

              {i < automationFlow.length - 1 && (
                <span
                  aria-hidden="true"
                  className="relative my-2 flex h-8 w-full items-center justify-center lg:my-0 lg:h-full lg:w-10"
                >
                  <span className="absolute h-full w-px bg-line lg:h-px lg:w-full" />
                  {/* Rendered unconditionally — see Hero.tsx. A `reduce`
                      gate here changed the tree between server and client
                      and broke hydration. Hidden by CSS instead. */}
                  <motion.span
                    className="absolute h-1.5 w-1.5 rounded-full bg-volt motion-reduce:hidden"
                    animate={
                      flow ? { y: ["-50%", "50%"], x: 0, opacity: [0, 1, 0] } : undefined
                    }
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: i * 0.35,
                      ease: "easeInOut",
                    }}
                  />
                </span>
              )}
            </li>
          ))}
        </ol>

        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
          {automationCapabilities.map((c) => (
            <li key={c} className="flex items-center gap-2.5 text-sm text-ink-dim">
              <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-viol" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
