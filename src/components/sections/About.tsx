import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/MagneticButton";
import { Photo } from "@/components/ui/Photo";
import { aboutPhotos } from "@/config/images";

const disciplines = ["Design", "Development", "Branding", "Strategy", "Technology", "AI", "Marketing"];

export function About({ showHead = true }: { showHead?: boolean }) {
  return (
    <Section>
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            {showHead && <SectionHead eyebrow="About" title={"Small Team.\nBig Digital Thinking."} />}
            <div className="mt-8 flex max-w-lg flex-col gap-5 text-base leading-relaxed text-ink-dim">
              <p className="pretty">
                We are a creative technology partner, not a traditional agency. The same people who
                design your site write the code that ships it — nothing is handed across a gap where
                intent gets lost.
              </p>
              <p className="pretty">
                That means fewer meetings translating between disciplines, and decisions made by
                people who understand both the business case and the implementation cost.
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {disciplines.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-dim"
                >
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ArrowLink href="/about">More about the studio</ArrowLink>
            </div>
          </div>

          <Reveal className="lg:col-span-6" delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 aspect-[16/10] overflow-hidden rounded-xl border border-line">
                <Photo
                  photo={aboutPhotos.team}
                  fallback={{ from: "#12141a", to: "#050505", accent: "#4d7cfe" }}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  treatment="grade"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-xl border border-line">
                <Photo
                  photo={aboutPhotos.workspace}
                  fallback={{ from: "#14120f", to: "#050505", accent: "#8b5cf6" }}
                  sizes="(max-width: 1024px) 50vw, 22vw"
                  treatment="grade"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-xl border border-line">
                <Photo
                  photo={aboutPhotos.process}
                  fallback={{ from: "#101418", to: "#050505", accent: "#6EE7B7" }}
                  sizes="(max-width: 1024px) 50vw, 22vw"
                  treatment="grade"
                />
              </div>
            </div>
            <p className="mt-4 text-[11px] text-ink-faint">
              Photography from Unsplash — replace with real studio and team images in{" "}
              <code className="wrap-anywhere font-mono">src/config/images.ts</code>.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
