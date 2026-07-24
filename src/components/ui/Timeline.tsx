import type { TimelineItem } from "@/data/timeline";

/** Compact vertical timeline for the About preview. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative space-y-6 border-l border-cream/15 pl-6">
      {items.map((item) => (
        <li key={item.label} className="relative">
          <span
            aria-hidden
            className="absolute top-1.5 -left-[1.71rem] h-2.5 w-2.5 rounded-full bg-terracotta ring-4 ring-bg"
          />
          <div className="font-medium text-cream">{item.label}</div>
          <div className="text-sm text-muted">{item.detail}</div>
        </li>
      ))}
    </ol>
  );
}
