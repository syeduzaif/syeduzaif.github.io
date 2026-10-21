import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "link";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-none font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

/**
 * `primary` is the signal fill. Ink on signal is 5.6:1, so the dark text is
 * deliberate — paper on signal would only reach 3:1 and fail for button text.
 */
const variants: Record<Variant, string> = {
  primary: "bg-orange text-ink hover:bg-ink hover:text-paper",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
  link: "text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink px-0 py-0",
};

const sizes: Record<Size, string> = {
  md: "text-sm px-5 py-2.5",
  lg: "text-[0.95rem] px-6 py-3.5",
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
