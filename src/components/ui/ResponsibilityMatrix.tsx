import type { Responsibility } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Separates individual work from team outcomes — the honesty guardrail.
 * Rule weight carries the claim: solid ink = owned, lighter = contributed,
 * dashed = not solely mine. Empty columns (e.g. solo projects) are dropped
 * rather than shown empty.
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
    border: "border-t-2 border-ink/35",
    marker: "border border-ink/60 bg-transparent",
  },
  {
    key: "teamOutcome",
    title: "Team / product outcome",
    note: "Not solely mine",
    border: "border-t-2 border-dashed border-grey/60",
    marker: "rounded-full border border-dashed border-grey bg-transparent",
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
        <div key={col.key} className={cn("bg-paper-soft p-5", col.border)}>
          <h3 className="font-display text-[1.05rem] leading-snug font-semibold tracking-tight text-ink">
            {col.title}
          </h3>
          <p className="mt-1 font-mono text-[0.6rem] font-medium tracking-[0.14em] text-grey uppercase">
            {col.note}
          </p>
          <ul className="mt-5 space-y-2.5 border-t border-rule pt-4">
            {data[col.key].map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-grey">
                <span
                  aria-hidden
                  className={cn("mt-[7px] size-1.5 shrink-0", col.marker)}
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
