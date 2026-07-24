import type { Media } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MediaFrame } from "./MediaFrame";

/**
 * Project cover with a slow scale on hover. CSS-only (no client JS); the
 * `motion-reduce:` variants disable the transform under reduced-motion.
 */
export function ProjectVisual({
  media,
  className,
  sizes,
  priority,
}: {
  media: Media;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("group overflow-hidden rounded-lg", className)}>
      <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        <MediaFrame
          media={media}
          className="h-full w-full"
          sizes={sizes}
          priority={priority}
        />
      </div>
    </div>
  );
}
