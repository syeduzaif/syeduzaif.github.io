import type { Metric } from "@/lib/types";

/**
 * Defensible result metrics as a bounded spec grid — the same four-column
 * treatment the homepage evidence strip uses.
 */
export function ProjectMetric({ metrics }: { metrics: Metric[] }) {
  return (
    <>
      <dl className="grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            /* Cells stretch to the tallest; `mt-auto` keeps every value on one
               baseline even when a label wraps to two lines. */
            className="flex flex-col border-b border-rule py-6 pr-8 sm:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <dt className="font-mono text-[0.6rem] font-medium tracking-[0.16em] text-grey uppercase">
              {m.label}
            </dt>
            <dd className="mt-auto pt-3 font-display text-[1.6rem] leading-none font-semibold tracking-tight text-ink">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-rule" />
    </>
  );
}
