import { Play } from "lucide-react";
import type { Media } from "@/lib/types";
import { MediaFrame } from "./MediaFrame";

/** Video still with a play glyph; becomes a link when a URL exists. */
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
    <div className="group relative overflow-hidden border border-ink/15 bg-paper-soft p-1.5">
      <MediaFrame
        media={media}
        className="aspect-video"
        sizes="(max-width:768px) 100vw, 33vw"
      />
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-13 w-13 items-center justify-center rounded-full bg-ink/85 text-paper-soft transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <Play size={20} className="ml-0.5" />
        </span>
      </span>
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
