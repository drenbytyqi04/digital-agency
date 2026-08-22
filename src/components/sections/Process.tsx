"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { processSteps } from "@/config/content";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Sticky process with a scroll-driven connecting line.
 *
 * The line is scaleY on a transform layer (no layout reflow). Under
 * reduced motion the line renders complete and every step is fully
 * visible — the section still reads top to bottom as a plain list.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 85%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="process" className="bg-surface">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHead eyebrow="Process" title={"From Idea\nto Impact."} />
              <p className="pretty mt-6 max-w-sm text-sm leading-relaxed text-ink-dim">
                Five stages, each with a named deliverable and a decision point. You always know
                what is happening and what comes next.
              </p>
            </div>
          </div>

          <div ref={ref} className="relative lg:col-span-8">
            {/* Connecting line */}
            <div aria-hidden="true" className="absolute left-0 top-2 hidden h-full w-px bg-line md:block">
              <motion.div
                className="accent-gradient absolute inset-x-0 top-0 h-full origin-top"
                style={reduce ? { scaleY: 1 } : { scaleY }}
              />
            </div>

            <ol className="flex flex-col">
              {processSteps.map((step, i) => (
                <li key={step.index} className="relative md:pl-14">
                  <Reveal delay={i * 0.06} className="border-b border-line py-10 last:border-b-0">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-11 hidden h-2 w-2 -translate-x-[3.5px] rounded-full bg-volt md:block"
                    />
                    <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-8">
                      <span className="tnum font-mono text-xs text-ink-faint">{step.index}</span>
                      <div className="flex flex-col gap-3">
                        <h3 className="font-display text-3xl leading-none text-ink md:text-4xl">
                          {step.title}
                        </h3>
                        <p className="pretty max-w-md text-sm leading-relaxed text-ink-dim">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
