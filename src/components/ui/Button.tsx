import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "link";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper-soft hover:bg-orange-deep",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5",
  link: "text-orange-deep underline-offset-4 hover:text-ink hover:underline px-0 py-0",
};

const sizes: Record<Size, string> = {
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-6 py-3",
};

/**
 * Returns the class string for a button-styled element. Apply directly to
 * <a>, <Link>, or <button> so links stay real links (good for a11y + export).
 */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], variant !== "link" && sizes[size], className);
}
