import { Play } from "lucide-react";
import type { CreativeVideo } from "@/data/creative";
import { VideoThumbnail } from "@/components/media/VideoThumbnail";
import { buttonVariants } from "./Button";
import { Reveal } from "./Reveal";

/** Creative work card. Falls back to a disabled "Coming soon" when no URL. */
export function VideoCard({ video }: { video: CreativeVideo }) {
  return (
    <Reveal className="flex h-full flex-col">
      <VideoThumbnail media={video.thumb} href={video.url} title={video.title} />

      <h3 className="mt-4 font-serif text-xl text-cream">{video.title}</h3>
      <p className="mt-2 text-sm text-muted">{video.idea}</p>

      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
        {video.skills.map((skill) => (
          <li key={skill} className="text-xs text-olive-text">
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        {video.url ? (
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "secondary" })}
            aria-label={`Watch ${video.title} on YouTube`}
          >
            <Play size={14} /> Watch
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm text-muted/70">
            <Play size={14} /> Coming soon
          </span>
        )}
      </div>
    </Reveal>
  );
}
