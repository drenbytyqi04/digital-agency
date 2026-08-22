"use client";

import { useId, useState } from "react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/config/site";

/**
 * Before/after redesign comparison.
 *
 * WCAG 2.2 "Dragging Movements": the control is a native
 * <input type="range">, so the comparison is fully operable by
 * keyboard (arrows/Home/End) and by a single tap on the track — the
 * drag is an enhancement, never the only way to use it.
 */
export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <Section>
      <div className="shell">
        <SectionHead
          eyebrow="Redesign"
          title="See What Better Digital Design Can Do."
          lead="A generic business layout on the left, the same content given structure and hierarchy on the right."
        />

        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-xl border border-line select-none">
            <div className="relative aspect-[16/10] w-full md:aspect-[2/1]">
              {/* AFTER — full width underneath */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b0d14] to-void">
                <MockAfter />
              </div>

              {/* BEFORE — clipped from the left */}
              <div
                className="absolute inset-0 overflow-hidden bg-[#e9e9e6]"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <MockBefore />
              </div>

              {/* Divider */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-px bg-ink"
                style={{ left: `${pos}%` }}
              >
                <span className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink bg-void text-xs text-ink">
                  ↔
                </span>
              </div>

              <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-void/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink md:bg-void/80 md:backdrop-blur-sm">
                Before
              </span>
              <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-void/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink md:bg-void/80 md:backdrop-blur-sm">
                After
              </span>
            </div>

            {/* The accessible control */}
            <div className="border-t border-line bg-surface px-5 py-4">
              <label htmlFor={id} className="eyebrow mb-3 block">
                Comparison position
              </label>
              <input
                id={id}
                type="range"
                min={0}
                max={100}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-valuetext={`${pos}% before, ${100 - pos}% after`}
                className="h-11 w-full cursor-ew-resize accent-[#4d7cfe]"
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.1}>
          <MagneticButton href={site.cta.primary.href}>Get Your Website Redesigned</MagneticButton>
        </Reveal>
      </div>
    </Section>
  );
}

/* Generic "before" layout: cramped, centred, undifferentiated. */
function MockBefore() {
  return (
    <div aria-hidden="true" className="flex h-full w-full flex-col gap-3 p-6 text-[#333] md:p-10">
      <div className="flex items-center justify-between border-b border-[#ccc] pb-3">
        <div className="h-4 w-24 rounded-sm bg-[#999]" />
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-2.5 w-10 rounded-sm bg-[#bbb]" />
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center gap-2 text-center">
        <div className="h-5 w-2/3 rounded-sm bg-[#888]" />
        <div className="h-2.5 w-1/2 rounded-sm bg-[#bbb]" />
        <div className="mt-2 h-7 w-28 rounded-sm bg-[#5a7fbf]" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-1.5 rounded-sm border border-[#ddd] p-3">
            <div className="h-8 w-8 rounded-full bg-[#ddd]" />
            <div className="h-2 w-full rounded-sm bg-[#ccc]" />
            <div className="h-2 w-4/5 rounded-sm bg-[#ddd]" />
            <div className="h-2 w-3/5 rounded-sm bg-[#e3e3e3]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* "After": editorial hierarchy, space, one clear action. */
function MockAfter() {
  return (
    <div aria-hidden="true" className="flex h-full w-full flex-col justify-between p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div className="font-display text-lg text-ink">Studio</div>
        <div className="flex items-center gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1.5 w-8 rounded-full bg-[#3a3a42]" />
          ))}
          <div className="h-6 w-20 rounded-full bg-ink" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-[#4d7cfe] to-[#8b5cf6]" />
        <div className="font-display text-3xl leading-[0.95] text-ink md:text-5xl">
          Built to convert,
          <br />
          not just to exist.
        </div>
        <div className="h-2 w-1/3 rounded-full bg-[#2a2a30]" />
      </div>
      <div className="flex items-end justify-between">
        <div className="flex gap-3">
          <div className="h-8 w-28 rounded-full bg-ink" />
          <div className="h-8 w-24 rounded-full border border-[#2a2a30]" />
        </div>
        <div className="flex gap-6">
          {["50+", "10+", "100%"].map((n) => (
            <div key={n} className="font-display text-base text-ink">
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
