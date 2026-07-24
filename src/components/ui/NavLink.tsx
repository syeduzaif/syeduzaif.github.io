import { cn } from "@/lib/utils";

/** Nav item with an animated underline (CSS only). */
export function NavLink({
  href,
  children,
  active,
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      data-active={active || undefined}
      className={cn(
        "group relative text-sm text-muted transition-colors hover:text-cream data-[active]:text-cream",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-sand transition-transform duration-300 group-hover:scale-x-100 group-data-[active]:scale-x-100"
      />
    </a>
  );
}
