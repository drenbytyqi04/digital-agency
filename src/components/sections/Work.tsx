import Link from "next/link";
import { projects } from "@/config/projects";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { projectPhotos } from "@/config/images";
import { ArrowLink } from "@/components/ui/MagneticButton";

export function Work({ limit, showHead = true }: { limit?: number; showHead?: boolean }) {
  const list = limit ? projects.slice(0, limit) : projects;

  return (
    <Section id="work">
      <div className="shell">
        {showHead && (
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              eyebrow="Selected work"
              title="Work That Speaks."
              lead="Sample projects illustrating how we approach different sectors. Real client work replaces these as it ships."
            />
            {limit && <ArrowLink href="/work">All work</ArrowLink>}
          </div>
        )}

        <div className={`${showHead ? "mt-20 " : ""}grid gap-x-8 gap-y-16 md:grid-cols-2`}>
          {list.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={(i % 2) * 0.08}
              className={i % 3 === 0 ? "md:col-span-2" : ""}
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-xl border border-line">
                  <div
                    className={
                      i % 3 === 0
                        ? "aspect-[16/9] w-full overflow-hidden"
                        : "aspect-[4/3] w-full overflow-hidden"
                    }
                  >
                    <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                      <Photo
                        photo={projectPhotos[project.slug]}
                        fallback={project.art}
                        priority={i === 0}
                        interactive
                        sizes={
                          i % 3 === 0
                            ? "(max-width: 768px) 100vw, 90vw"
                            : "(max-width: 768px) 100vw, 45vw"
                        }
                      />
                    </div>
                  </div>
                  <span className="absolute left-5 top-5 rounded-full border border-line-strong bg-void/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-dim backdrop-blur-sm">
                    Sample project
                  </span>
                </div>

                <div className="mt-6 flex items-start justify-between gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-2xl leading-tight text-ink md:text-3xl">
                      {project.name}
                    </h3>
                    <p className="pretty max-w-lg text-sm leading-relaxed text-ink-dim">
                      {project.summary}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5">
                      {project.services.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-faint"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="shrink-0 text-right">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                      {project.industry}
                    </span>
                    <span className="tnum mt-1 block font-mono text-[10px] text-ink-faint">
                      {project.year}
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
