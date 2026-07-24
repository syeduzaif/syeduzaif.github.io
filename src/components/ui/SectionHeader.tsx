import { cn } from "@/lib/utils";
import { EditorialLabel } from "@/components/lab/EditorialLabel";

interface SectionHeaderProps {
  /** Mono index/eyebrow, e.g. "02 / PROCESS". */
  eyebrow?: string;
  title: string;
  intro?: string;
  /** id applied to the heading — pair with Section's labelledBy. */
  id?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(align === "center" && "mx-auto text-center", className)}
      style={{ maxWidth: align === "center" ? "var(--width-reading)" : undefined }}
    >
      {eyebrow && (
        <EditorialLabel className="text-(--accent-ink)">{eyebrow}</EditorialLabel>
      )}
      <h2 id={id} className="mt-4 text-h2 text-ink text-balance">
        {title}
      </h2>
      {intro && (
        <p
          className={cn("mt-5 text-lead text-grey", align === "center" && "mx-auto")}
          style={{ maxWidth: "var(--width-reading)" }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
