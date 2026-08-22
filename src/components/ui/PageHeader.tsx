import { RevealText } from "./RevealText";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line pb-20 pt-44 md:pb-28 md:pt-52">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0 opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-void to-transparent" />
      </div>
      <div className="shell relative flex flex-col gap-7">
        <Reveal immediate>
          <span className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="accent-gradient inline-block h-px w-8" />
            {eyebrow}
          </span>
        </Reveal>
        <h1 className="display-xl balance max-w-[15ch] text-ink">
          <RevealText text={title} by="line" immediate />
        </h1>
        {lead && (
          <Reveal delay={0.12} immediate>
            <p className="pretty max-w-2xl text-lg leading-relaxed text-ink-dim">{lead}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
