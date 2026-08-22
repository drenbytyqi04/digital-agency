import { brandDeliverables } from "@/config/content";
import { site } from "@/config/site";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Photo } from "@/components/ui/Photo";
import { brandingPhotos } from "@/config/images";

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
              <div className="relative col-span-3 row-span-4 overflow-hidden rounded-xl border border-line bg-void">
                <Photo
                  photo={brandingPhotos[2]}
                  fallback={{ from: "#181410", to: "#050505", accent: "#D4A574" }}
                  sizes="(max-width: 1024px) 50vw, 28vw"
                />
                {/* Type specimen sits over the photograph, not beside it */}
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl text-ink mix-blend-difference md:text-8xl">
                    Aa
                  </span>
                </span>
              </div>
              <div className="accent-gradient col-span-3 row-span-2 rounded-xl" />
              <div className="col-span-3 row-span-2 grid grid-cols-4 gap-2 rounded-xl border border-line bg-void p-3">
                {["#050505", "#4d7cfe", "#8b5cf6", "#ededE8"].map((c) => (
                  <span key={c} className="rounded-md" style={{ background: c }} />
                ))}
              </div>
              <div className="col-span-2 row-span-2 overflow-hidden rounded-xl border border-line">
                <Photo
                  photo={brandingPhotos[0]}
                  fallback={{ from: "#14120f", to: "#050505", accent: "#8b5cf6" }}
                  sizes="(max-width: 1024px) 33vw, 18vw"
                />
              </div>
              <div className="col-span-4 row-span-2 overflow-hidden rounded-xl border border-line">
                <Photo
                  photo={brandingPhotos[1]}
                  fallback={{ from: "#101418", to: "#050505", accent: "#4d7cfe" }}
                  sizes="(max-width: 1024px) 66vw, 36vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
