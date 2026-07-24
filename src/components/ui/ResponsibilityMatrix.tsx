import type { Responsibility } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Separates individual work from team outcomes — the honesty guardrail.
 * Column border style mirrors the site-wide line language (see the ownership
 * map): solid = owned, dashed = contributed, dotted = not solely mine.
 * Empty columns (e.g. solo projects) are dropped rather than shown empty.
 */
const columns: {
  key: keyof Responsibility;
  title: string;
  note: string;
  border: string;
  marker: string;
}[] = [
  {
    key: "owned",
    title: "What I owned",
    note: "Personally executed",
    border: "border-t-2 border-ink",
    marker: "bg-ink",
  },
  {
    key: "contributed",
    title: "What I contributed to",
    note: "Alongside others",
    border: "border-t-2 border-dashed border-ink/50",
    marker: "border border-dashed border-ink/60 bg-transparent",
  },
  {
    key: "teamOutcome",
    title: "Team / product outcome",
    note: "Not solely mine",
    border: "border-t-2 border-dotted border-grey",
    marker: "rounded-full border border-dotted border-grey bg-transparent",
  },
];

export function ResponsibilityMatrix({ data }: { data: Responsibility }) {
  const present = columns.filter((c) => data[c.key] && data[c.key].length > 0);

  return (
    <div
      className={cn(
        "grid gap-4",
        present.length === 3
          ? "md:grid-cols-3"
          : present.length === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-1",
      )}
    >
      {present.map((col) => (
        <div
          key={col.key}
          className={cn("bg-paper-soft p-5 shadow-[2px_3px_0_rgb(23_23_23/0.06)]", col.border)}
        >
          <h4 className="font-medium text-ink">{col.title}</h4>
          <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-grey">
            {col.note}
          </p>
          <ul className="mt-4 space-y-2.5">
            {data[col.key].map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-grey">
                <span
                  aria-hidden
                  className={cn("mt-[7px] h-1.5 w-1.5 shrink-0", col.marker)}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
