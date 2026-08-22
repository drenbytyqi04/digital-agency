import { differentiators } from "@/config/content";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function WhyUs() {
  return (
    <Section>
      <div className="shell">
        <SectionHead
          eyebrow="Why us"
          title={"Not Just Another\nWeb Agency."}
          lead="Six commitments that shape how every project runs."
        />

        <div className="mt-20 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06}>
              <div className="group relative h-full bg-void p-8 transition-colors duration-300 hover:bg-surface md:p-10">
                <span
                  aria-hidden="true"
                  className="accent-gradient absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
                <span className="tnum font-mono text-[10px] text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-2xl leading-tight text-ink">{item.title}</h3>
                <p className="pretty mt-3 text-sm leading-relaxed text-ink-dim">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
