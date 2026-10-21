import { Play } from "lucide-react";
import type { Media } from "@/lib/types";
import { MediaFrame } from "./MediaFrame";

/**
 * Video still with a signal play button; becomes a link when a URL exists.
 * A slot with no URL gets no play affordance — it isn't playable, and showing
 * one would promise a video that doesn't exist yet.
 */
export function VideoThumbnail({
  media,
  href,
  title,
}: {
  media: Media;
  href: string | null;
  title: string;
}) {
  const inner = (
    <div className="group relative overflow-hidden">
      <MediaFrame
        media={media}
        className="aspect-video"
        sizes="(max-width:768px) 100vw, 33vw"
      />
      {href && (
        <span
          aria-hidden
          className="absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-full bg-orange text-ink transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        >
          <Play size={16} className="ml-0.5" />
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${title} on YouTube`}
      >
        {inner}
      </a>
    );
  }
  return inner;
}
