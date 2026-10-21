import { MediaFragment } from "./MediaFragment";
import { cn } from "@/lib/utils";

export interface TrioApp {
  src: string;
  alt: string;
  label: string;
}

/**
 * The three-app poster: Student, Teacher, and the attendance flow set side by
 * side, upright and evenly ruled, with the middle frame lifted — the
 * arrangement the design draws. Used as the SimpliEd cover on the homepage
 * and the case-study header.
 */
export function AppTrio({
  apps,
  note,
  priority,
  className,
}: {
  apps: TrioApp[];
  /** Honest margin note under the trio (e.g. demo-data disclosure). */
  note?: string;
  priority?: boolean;
  className?: string;
}) {
  const lift = ["md:translate-y-2", "md:-translate-y-2", "md:translate-y-3"];

  return (
    <div className={className}>
      <div className="grid grid-cols-3 items-start gap-2.5 sm:gap-4">
        {apps.slice(0, 3).map((app, i) => (
          <MediaFragment
            key={app.src}
            src={app.src}
            alt={app.alt}
            label={app.label}
            priority={priority}
            aspect="aspect-[9/19]"
            sizes="(max-width:768px) 30vw, 220px"
            className={cn(lift[i])}
          />
        ))}
      </div>
      {note && (
        <p className="mt-4 font-mono text-[0.62rem] leading-relaxed tracking-[0.1em] text-grey uppercase">
          {note}
        </p>
      )}
    </div>
  );
}
