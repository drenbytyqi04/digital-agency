/**
 * Generated project cover art.
 *
 * Pure CSS/SVG rather than bitmap imagery: no network request, no
 * layout shift, and it scales to any container. Replace with a
 * <next/image> when real project photography exists — the aspect
 * wrapper already reserves the space, so swapping causes no CLS.
 */
export function ProjectArt({
  from,
  to,
  accent,
  label,
  className,
}: {
  from: string;
  to: string;
  accent: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ background: `linear-gradient(150deg, ${from} 0%, ${to} 70%)` }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id={`g-${accent.slice(1)}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Abstract interface lattice */}
        <g stroke={accent} strokeOpacity="0.18" strokeWidth="0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 37.5} x2="400" y2={i * 37.5} />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="300" />
          ))}
        </g>
        <rect x="40" y="52" width="150" height="9" rx="4.5" fill={accent} fillOpacity="0.5" />
        <rect x="40" y="72" width="96" height="9" rx="4.5" fill="#fff" fillOpacity="0.14" />
        <rect x="40" y="104" width="220" height="86" rx="8" fill={`url(#g-${accent.slice(1)})`} />
        <rect x="276" y="104" width="84" height="40" rx="8" fill="#fff" fillOpacity="0.07" />
        <rect x="276" y="152" width="84" height="38" rx="8" fill="#fff" fillOpacity="0.05" />
        <rect x="40" y="210" width="60" height="20" rx="10" fill={accent} fillOpacity="0.75" />
        <rect x="112" y="210" width="60" height="20" rx="10" fill="#fff" fillOpacity="0.08" />
      </svg>
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}
