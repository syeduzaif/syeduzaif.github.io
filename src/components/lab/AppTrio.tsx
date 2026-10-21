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
 *
 * Three 9:19 frames across a phone leave each about 90px wide, which is far
 * too small to read a screenshot — and stacking them would run to roughly
 * 2000px. So below `sm` the row becomes a snapping scroll strip: each frame
 * keeps a legible width, and the slice of the next one showing is the
 * affordance. `tabIndex` makes that strip scrollable by keyboard, since the
 * frames themselves hold nothing focusable. It costs one inert tab stop at
 * wider widths, which is the cheaper half of the trade.
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
  const shown = apps.slice(0, 3);

  return (
    <div className={className}>
      <ul
        tabIndex={0}
        aria-label={shown.map((a) => a.label).join(", ")}
        className="flex snap-x snap-mandatory items-start gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0"
      >
        {shown.map((app, i) => (
          <li
            key={app.src}
            className={cn("w-[62%] shrink-0 snap-start sm:w-auto", lift[i])}
          >
            <MediaFragment
              src={app.src}
              alt={app.alt}
              label={app.label}
              priority={priority}
              aspect="aspect-[9/19]"
              sizes="(max-width:640px) 50vw, (max-width:1024px) 30vw, 220px"
            />
          </li>
        ))}
      </ul>
      {note && (
        <p className="mt-4 font-mono text-[0.62rem] leading-relaxed tracking-[0.1em] text-grey uppercase">
          {note}
        </p>
      )}
    </div>
  );
}
