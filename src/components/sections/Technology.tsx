import { technologies } from "@/config/content";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/Section";

export function Technology() {
  return (
    <section className="border-y border-line py-24 md:py-32">
      <div className="shell">
        <SectionHead eyebrow="Stack" title="Built With Modern Technology." align="center" />
      </div>

      <Reveal className="mt-16">
        <Marquee duration={38}>
          {technologies.map((tech) => (
            <span key={tech} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-3xl text-ink-dim transition-colors duration-300 hover:text-ink md:text-5xl">
                {tech}
              </span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-volt" />
            </span>
          ))}
        </Marquee>
      </Reveal>
      <Reveal className="mt-6">
        <Marquee duration={52} reverse>
          {[...technologies].reverse().map((tech) => (
            <span key={tech} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                {tech}
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
