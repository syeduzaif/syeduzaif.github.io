import { Glyph, type GlyphKind } from "./Glyph";
import { cn } from "@/lib/utils";

const entries: { kind: GlyphKind; label: string }[] = [
  { kind: "observation", label: "observation" },
  { kind: "unresolved", label: "open question" },
  { kind: "decision", label: "decision" },
  { kind: "rejected", label: "rejected" },
  { kind: "progression", label: "progression" },
  { kind: "result", label: "result" },
];

/**
 * Key for the lab's symbol language — shown once per case study so the
 * recurring glyphs read as a system, not decoration.
 */
export function ExperimentLegend({ className }: { className?: string }) {
  return (
    <dl
      aria-label="Symbol legend"
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-ink/15 py-3",
        className,
      )}
    >
      {entries.map((e) => (
        <div key={e.kind} className="flex items-center gap-1.5">
          <dt className="text-grey">
            <Glyph kind={e.kind} />
            <span className="sr-only">{e.label} symbol</span>
          </dt>
          <dd className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-grey">
            {e.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
