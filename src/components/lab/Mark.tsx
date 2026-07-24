import { cn } from "@/lib/utils";

const tones = {
  yellow: "bg-yellow",
  green: "bg-green",
} as const;

/**
 * Inline highlighter mark — ink text over a yellow/green sweep. The accents
 * are used as fills only (they don't meet contrast as text colours).
 */
export function Mark({
  tone = "yellow",
  className,
  children,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <mark className={cn("marker text-ink", tones[tone], className)}>
      {children}
    </mark>
  );
}
