import { cn } from "@/lib/utils";

/** Editorial-index nav item: mono number + label, orange underline when active. */
export function NavLink({
  href,
  children,
  n,
  active,
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  /** Index number shown before the label ("01"). */
  n?: string;
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
        "group relative flex items-baseline gap-1.5 text-sm text-grey transition-colors hover:text-ink data-[active]:text-ink",
        className,
      )}
    >
      {n && (
        <span
          aria-hidden
          className="font-mono text-[0.65rem] text-grey/70 transition-colors group-hover:text-orange-deep group-data-[active]:text-orange-deep"
        >
          {n}
        </span>
      )}
      {children}
      <span
        aria-hidden
        className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-orange transition-transform duration-300 group-hover:scale-x-100 group-data-[active]:scale-x-100 motion-reduce:transition-none"
      />
    </a>
  );
}
