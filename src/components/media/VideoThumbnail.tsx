import { Play } from "lucide-react";
import type { Media } from "@/lib/types";
import { MediaFrame } from "./MediaFrame";

/** Video thumbnail with a play glyph; becomes a link when a URL exists. */
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
    <div className="group relative overflow-hidden rounded-lg">
      <MediaFrame
        media={media}
        className="aspect-video"
        sizes="(max-width:768px) 100vw, 33vw"
      />
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bg/70 text-cream backdrop-blur transition-transform duration-300 group-hover:scale-110">
          <Play size={22} className="ml-0.5" />
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
