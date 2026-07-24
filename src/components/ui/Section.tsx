import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> {
  /** Wire to the section heading's id for a labelled landmark. */
  labelledBy?: string;
}

/** Semantic <section> with consistent vertical rhythm. */
export function Section({
  className,
  children,
  labelledBy,
  ...props
}: SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn("py-20 md:py-28", className)}
      {...props}
    >
      {children}
    </section>
  );
}
