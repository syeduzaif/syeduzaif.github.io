import { cn } from "@/lib/utils";

/** Small tracked, uppercase label used above section titles. */
export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-block text-eyebrow font-medium uppercase tracking-[0.22em] text-olive-text",
        className,
      )}
    >
      {children}
    </span>
  );
}
