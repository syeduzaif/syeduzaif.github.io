import { MediaFragment } from "./MediaFragment";
import { Annotation } from "./Annotation";
import { cn } from "@/lib/utils";

export interface TrioApp {
  src: string;
  alt: string;
  label: string;
}

/**
 * The three-app poster: Student, Teacher, and the attendance flow pinned side
 * by side like prints on the working wall — middle one lifted, outer two
 * tilted. Used as the SimpliEd cover on the homepage and case-study header.
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
  const rotate = [-1.5, 0, 1.5];
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
            rotate={rotate[i]}
            taped={i !== 1}
            priority={priority}
            aspect="aspect-[9/19]"
            sizes="(max-width:768px) 30vw, 220px"
            className={cn(lift[i])}
          />
        ))}
      </div>
      {note && (
        <p className="mt-4">
          <Annotation className="text-[0.92rem]">{note}</Annotation>
        </p>
      )}
    </div>
  );
}
