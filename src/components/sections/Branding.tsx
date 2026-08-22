import { brandDeliverables } from "@/config/content";
import { site } from "@/config/site";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Branding() {
  return (
    <Section className="bg-surface">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Branding" title="Make Your Brand Impossible to Ignore." />
            <p className="pretty mt-6 max-w-md text-base leading-relaxed text-ink-dim">
              An identity is a system, not a logo file. We build the parts and the rules that keep
              them consistent everywhere your business appears.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
              {brandDeliverables.map((d) => (
                <li key={d} className="flex items-center gap-2.5 text-sm text-ink-dim">
                  <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-volt" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <MagneticButton href={site.cta.primary.href}>Build My Brand</MagneticButton>
            </div>
          </div>

          {/* Editorial identity composition */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="grid grid-cols-6 grid-rows-6 gap-3 aspect-[4/3]">
              <div className="col-span-3 row-span-4 flex items-center justify-center rounded-xl border border-line bg-void">
                <span className="font-display text-6xl text-ink md:text-8xl">Aa</span>
              </div>
              <div className="accent-gradient col-span-3 row-span-2 rounded-xl" />
              <div className="col-span-3 row-span-2 grid grid-cols-4 gap-2 rounded-xl border border-line bg-void p-3">
                {["#050505", "#4d7cfe", "#8b5cf6", "#ededE8"].map((c) => (
                  <span key={c} className="rounded-md" style={{ background: c }} />
                ))}
              </div>
              <div className="col-span-2 row-span-2 flex items-center justify-center rounded-xl border border-line bg-void">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  Grid
                </span>
              </div>
              <div className="col-span-4 row-span-2 flex flex-col justify-center gap-2 rounded-xl border border-line bg-void p-5">
                <span className="h-1.5 w-2/3 rounded-full bg-line-strong" />
                <span className="h-1.5 w-1/2 rounded-full bg-line" />
                <span className="h-1.5 w-3/4 rounded-full bg-line" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
