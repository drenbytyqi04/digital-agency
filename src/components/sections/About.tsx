import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/MagneticButton";

const disciplines = ["Design", "Development", "Branding", "Strategy", "Technology", "AI", "Marketing"];

export function About() {
  return (
    <Section>
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <SectionHead eyebrow="About" title={"Small Team.\nBig Digital Thinking."} />
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
              <div className="col-span-2 flex aspect-[16/10] items-center justify-center rounded-xl border border-line bg-surface">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  Team photograph
                </span>
              </div>
              <div className="flex aspect-square items-center justify-center rounded-xl border border-line bg-surface">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  Workspace
                </span>
              </div>
              <div className="flex aspect-square items-center justify-center rounded-xl border border-line bg-surface">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  Process
                </span>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-ink-faint">
              Image placeholders — spaces are reserved so swapping in real photography causes no
              layout shift.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
