import type { ProjectOption } from "@/lib/types";
import { Glyph, type GlyphKind } from "./Glyph";
import { cn } from "@/lib/utils";

const verdictStyle: Record<
  ProjectOption["verdict"],
  { glyph: GlyphKind; label: string; className: string }
> = {
  chosen: { glyph: "decision", label: "chosen", className: "text-green-deep" },
  rejected: { glyph: "rejected", label: "rejected", className: "text-grey" },
  exploring: {
    glyph: "unresolved",
    label: "exploring",
    className: "text-orange-deep",
  },
};

/** An approach that was weighed — rejected ideas shown, not hidden. */
export function ApproachCard({ option }: { option: ProjectOption }) {
  const v = verdictStyle[option.verdict];
  return (
    <div
      className={cn(
        "flex gap-3 border border-ink/15 bg-paper-soft p-4",
        option.verdict === "rejected" && "opacity-80",
      )}
    >
      <span className={cn("mt-0.5", v.className)}>
        <Glyph kind={v.glyph} />
      </span>
      <div>
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="font-medium text-ink">{option.approach}</span>
          <span
            className={cn(
              "font-mono text-[0.62rem] uppercase tracking-[0.16em]",
              v.className,
            )}
          >
            {v.label}
          </span>
        </div>
        {option.note && <p className="mt-1 text-sm text-grey">{option.note}</p>}
      </div>
    </div>
  );
}
