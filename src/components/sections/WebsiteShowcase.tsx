"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteCapabilities } from "@/config/content";
import { site } from "@/config/site";
import { Section, SectionHead } from "@/components/ui/Section";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn, motionTokens } from "@/lib/utils";

const devices = [
  { id: "desktop", label: "Desktop", w: "100%", ratio: "16 / 10" },
  { id: "tablet", label: "Tablet", w: "62%", ratio: "3 / 4" },
  { id: "mobile", label: "Mobile", w: "30%", ratio: "9 / 17" },
] as const;

/** Device showcase — a real tablist, so it is keyboard-operable. */
export function WebsiteShowcase() {
  const [active, setActive] = useState<(typeof devices)[number]["id"]>("desktop");
  const reduce = useReducedMotion();
  const current = devices.find((d) => d.id === active)!;

  return (
    <Section>
      <div className="shell">
        <SectionHead
          eyebrow="Websites"
          title={"Your Website Is Your\nBest Salesperson."}
          lead="It works every hour, in every market, and it never has an off day. It should be built like it matters."
        />

        <div className="mt-14 flex flex-wrap items-center gap-3" role="tablist" aria-label="Device preview">
          {devices.map((d) => (
            <button
              key={d.id}
              role="tab"
              type="button"
              aria-selected={active === d.id}
              aria-controls="device-preview"
              onClick={() => setActive(d.id)}
              className={cn(
                "min-h-11 cursor-pointer rounded-full border px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest transition-colors",
                active === d.id
                  ? "border-ink bg-ink text-void"
                  : "border-line-strong text-ink-dim hover:border-ink-faint hover:text-ink"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div
          id="device-preview"
          role="tabpanel"
          className="mt-10 flex min-h-[24rem] items-center justify-center rounded-xl border border-line bg-surface p-6 md:min-h-[34rem] md:p-14"
        >
          <motion.div
            layout={!reduce}
            transition={{ duration: motionTokens.slow, ease: motionTokens.ease }}
            className="overflow-hidden rounded-lg border border-line-strong bg-void shadow-2xl"
            style={{ width: current.w, aspectRatio: current.ratio }}
          >
            <div className="flex h-full w-full flex-col p-4 md:p-6">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="font-display text-sm text-ink">{site.name}</span>
                <span className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1 w-4 rounded-full bg-line-strong" />
                  ))}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-3">
                <span className="accent-gradient h-1 w-12 rounded-full" />
                <span className="font-display text-xl leading-[0.95] text-ink md:text-3xl">
                  Digital experiences
                  <br />
                  that convert.
                </span>
                <span className="h-1.5 w-1/2 rounded-full bg-line-strong" />
                <span className="mt-2 h-7 w-24 rounded-full bg-ink" />
              </div>
            </div>
          </motion.div>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-3">
          {siteCapabilities.map((c) => (
            <li
              key={c}
              className="rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-ink-dim"
            >
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <MagneticButton href={site.cta.primary.href}>Build My Website</MagneticButton>
        </div>
      </div>
    </Section>
  );
}
