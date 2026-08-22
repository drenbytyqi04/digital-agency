"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faqs } from "@/config/content";
import { Section, SectionHead } from "@/components/ui/Section";
import { motionTokens } from "@/lib/utils";

/**
 * Accordion built on native <button> + aria-expanded/aria-controls.
 * Panels animate height, but the content is present in the DOM and
 * hidden with `hidden` only when collapsed — so it never traps focus.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="faq">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHead eyebrow="FAQ" title="Questions, Answered." />
            </div>
          </div>

          <ul className="border-t border-line lg:col-span-8">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const btnId = `faq-btn-${i}`;
              return (
                <li key={item.q} className="border-b border-line">
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="pretty text-base text-ink transition-colors group-hover:text-white md:text-lg">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="relative mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center"
                      >
                        <span className="absolute h-px w-full bg-ink-dim transition-colors group-hover:bg-ink" />
                        <span
                          className={`absolute h-full w-px bg-ink-dim transition-all duration-300 group-hover:bg-ink ${
                            isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{
                          duration: reduce ? 0.01 : motionTokens.base,
                          ease: motionTokens.ease,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="pretty max-w-2xl pb-7 pr-10 text-sm leading-relaxed text-ink-dim">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
