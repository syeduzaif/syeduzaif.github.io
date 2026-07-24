import { cn } from "@/lib/utils";

/** Centered content column capped at the site max width. */
export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full px-6 md:px-8", className)}
      style={{ maxWidth: "var(--width-container)" }}
      {...props}
    >
      {children}
    </div>
  );
}
