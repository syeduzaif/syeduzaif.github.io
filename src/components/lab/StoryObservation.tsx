import { Play } from "lucide-react";
import type { CreativeVideo } from "@/data/creative";
import { VideoThumbnail } from "@/components/media/VideoThumbnail";
import { EditorialLabel } from "./EditorialLabel";
import { buttonVariants } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A creative piece presented as an observation that became a story:
 * observation → still → medium → what it demonstrates. Stills only — the
 * video opens on YouTube after interaction (no iframes on load). A `reserved`
 * item renders as a labelled "In production" slot, not a fake video.
 */
export function StoryObservation({
  video,
  n,
}: {
  video: CreativeVideo;
  n: string;
}) {
  return (
    <Reveal className="flex h-full flex-col">
      <EditorialLabel className="text-orange-deep">
        Observation {n}
      </EditorialLabel>
      <p className="mt-3 min-h-[3.4em] font-serif text-[1.3rem] leading-snug text-ink text-balance">
        {video.observation}
      </p>

      <div className="mt-4">
        <VideoThumbnail
          media={video.thumb}
          href={video.url}
          title={video.title}
        />
      </div>
      <p className="mt-3 text-sm font-medium text-ink">{video.title}</p>
      <p className="mt-1.5 text-sm text-grey">{video.idea}</p>

      <dl className="mt-4 space-y-1.5 border-t border-ink/10 pt-3">
        <div className="flex gap-3 font-mono text-[0.62rem] uppercase tracking-[0.12em]">
          <dt className="w-24 shrink-0 text-grey/70">Medium</dt>
          <dd className="text-grey">{video.medium}</dd>
        </div>
        <div className="flex gap-3 font-mono text-[0.62rem] uppercase tracking-[0.12em]">
          <dt className="w-24 shrink-0 text-grey/70">Demonstrates</dt>
          <dd className="text-grey">{video.demonstrates}</dd>
        </div>
      </dl>

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
          <span className="inline-flex items-center gap-2 border border-dashed border-ink/30 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-orange-deep">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange motion-reduce:animate-none" />
            {video.reserved ? "In production" : "Coming soon"}
          </span>
        )}
      </div>
    </Reveal>
  );
}
