import type { TimelineItem } from "@/data/timeline";

/** Compact vertical timeline — square lab markers on a hairline. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative space-y-6 border-l border-ink/20 pl-6">
      {items.map((item) => (
        <li key={item.label} className="relative">
          <span
            aria-hidden
            className="absolute top-1.5 -left-[1.83rem] h-2.5 w-2.5 border border-ink bg-paper ring-4 ring-paper"
          />
          <div className="font-medium text-ink">{item.label}</div>
          <div className="text-sm text-grey">{item.detail}</div>
        </li>
      ))}
    </ol>
  );
}
