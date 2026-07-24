import type { Metric } from "@/lib/types";

/**
 * A row of defensible result metrics — accent-ticked, annotation style,
 * matching the homepage evidence strip's editorial language.
 */
export function ProjectMetric({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-7 border-y border-ink/15 py-7 md:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} className="border-l-2 pl-4" style={{ borderColor: "var(--accent)" }}>
          <dt className="sr-only">{m.label}</dt>
          <dd>
            <span className="block font-serif text-[1.6rem] leading-tight text-ink">
              {m.value}
            </span>
            <span className="mt-1 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-grey">
              {m.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
