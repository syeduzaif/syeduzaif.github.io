import type { TimelineItem } from "@/data/timeline";
import { cn } from "@/lib/utils";

/**
 * Career timeline as hairline-ruled rows — a mono index in the label column,
 * matching the spec tables used everywhere else. The sequence is carried by
 * the numbering rather than by a drawn rail.
 */
export function Timeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <ol className={cn("border-t border-rule", className)}>
      {items.map((item, i) => (
        <li
          key={item.label}
          className="grid gap-4 border-b border-rule py-4"
          style={{ gridTemplateColumns: "2.75rem 1fr" }}
        >
          <span
            aria-hidden
            className="pt-1 font-mono text-[0.6rem] font-medium tracking-[0.14em] text-grey"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-medium text-ink">{item.label}</p>
            <p className="mt-0.5 text-sm text-grey">{item.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
