import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProject } from "@/config/projects";
import { site } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { projectPhotos } from "@/config/images";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton, ArrowLink } from "@/components/ui/MagneticButton";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Case study not found" };
  return {
    title: `${project.name} — ${project.industry} case study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.name, description: project.summary },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const photo = projectPhotos[project.slug];
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const chapters = [
    { title: "Challenge", body: project.challenge },
    { title: "Strategy", body: project.strategy },
    { title: "Design", body: project.design },
    { title: "Development", body: project.development },
    { title: "Outcome", body: project.outcome },
  ];

  return (
    <>
      <header className="relative overflow-hidden pb-16 pt-40 md:pt-48">
        <div className="shell flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-3">
            <ArrowLink href="/work">All work</ArrowLink>
            <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              Sample project
            </span>
          </div>
          <h1 className="display-xl balance max-w-[14ch] text-ink">
            <RevealText text={project.name} by="word" immediate />
          </h1>
          <p className="pretty max-w-2xl text-lg leading-relaxed text-ink-dim">{project.summary}</p>
        </div>
      </header>

      <Reveal className="shell">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-line">
          <Photo
            photo={photo}
            fallback={project.art}
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </div>
      </Reveal>

      {/* Meta */}
      <section className="shell mt-16">
        <dl className="grid gap-8 border-y border-line py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Industry", project.industry],
            ["Year", project.year],
            ["Services", project.services.join(", ")],
            ["Technologies", project.technologies.join(", ")],
            ["Photography", photo.credit],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">{k}</dt>
              <dd className="pretty mt-2 text-sm text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Narrative */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-4">
            <ol className="flex flex-col gap-16">
              {chapters.map((c, i) => (
                <li key={c.title}>
                  <Reveal>
                    <span className="tnum font-mono text-[10px] text-ink-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-3 font-display text-3xl leading-none text-ink md:text-4xl">
                      {c.title}
                    </h2>
                    <p className="pretty mt-4 max-w-2xl text-base leading-relaxed text-ink-dim">
                      {c.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Device gallery */}
      <section className="shell pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="aspect-[16/10] overflow-hidden rounded-xl border border-line">
              <Photo photo={photo} fallback={project.art} sizes="(max-width: 768px) 100vw, 60vw" />
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              Desktop
            </p>
          </div>
          <div>
            <div className="aspect-[9/16] overflow-hidden rounded-xl border border-line">
              <Photo photo={photo} fallback={project.art} sizes="(max-width: 768px) 100vw, 30vw" />
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              Mobile
            </p>
          </div>
        </div>
      </section>

      {/* Metrics — blank until real */}
      <section className="shell pb-24">
        <div className="rounded-xl border border-line bg-surface p-8 md:p-12">
          <h2 className="font-display text-2xl text-ink">Results</h2>
          <dl className="mt-8 grid gap-8 sm:grid-cols-2">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dd className="font-display text-4xl text-ink-faint">{m.value ?? "—"}</dd>
                <dt className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
          <p className="pretty mt-8 max-w-xl text-sm leading-relaxed text-ink-faint">
            This is a sample case study. Metrics stay blank until they come from a real, measured
            engagement.
          </p>
        </div>
      </section>

      {/* Next project */}
      <section className="border-t border-line">
        <Link href={`/work/${next.slug}`} className="group block py-20 transition-colors hover:bg-surface">
          <div className="shell flex flex-col gap-3">
            <span className="eyebrow">Next project</span>
            <span className="display-lg flex items-center gap-6 text-ink">
              {next.name}
              <span
                aria-hidden="true"
                className="text-3xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4"
              >
                →
              </span>
            </span>
          </div>
        </Link>
      </section>

      <section className="shell py-24 text-center">
        <MagneticButton href={site.cta.primary.href}>Start Your Project</MagneticButton>
      </section>
    </>
  );
}
