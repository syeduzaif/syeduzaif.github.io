import type { ContentGap } from "@/lib/types";
import { Eyebrow } from "./Eyebrow";

/**
 * A visible, labelled "content needed" marker. The dashed rule is deliberate
 * — it reads as a reserved slot, so a missing section is never hidden.
 */
export function ContentPlaceholder({ gap }: { gap: ContentGap }) {
  return (
    <div className="border border-dashed border-ink/30 bg-paper-soft p-4">
      <Eyebrow>Content needed — {gap.section}</Eyebrow>
      <p className="mt-2 text-sm text-grey">{gap.note}</p>
    </div>
  );
}
