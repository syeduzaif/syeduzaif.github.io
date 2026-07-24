import type { ContentGap } from "@/lib/types";

/**
 * A visible, labelled "content needed" marker — styled as an editor's note
 * pinned into the layout, so a missing section is never hidden silently.
 */
export function ContentPlaceholder({ gap }: { gap: ContentGap }) {
  return (
    <div className="border border-dashed border-ink/30 bg-paper-soft p-4">
      <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-orange-deep">
        Content needed — {gap.section}
      </p>
      <p className="mt-1.5 text-sm text-grey">{gap.note}</p>
    </div>
  );
}
