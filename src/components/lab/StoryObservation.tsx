import { ArrowUpRight } from "lucide-react";
import type { CreativeVideo } from "@/data/creative";
import { VideoThumbnail } from "@/components/media/VideoThumbnail";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A creative piece presented as an observation that became a story:
 * still → observation → medium → what it demonstrates. Stills only — the
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
      <div className="relative">
        <VideoThumbnail
          media={video.thumb}
          href={video.url}
          title={video.title}
        />
        <span className="absolute top-3 left-3 bg-paper px-2.5 py-1 font-mono text-[0.58rem] font-semibold tracking-[0.14em] text-ink uppercase">
          Observation {n}
        </span>
        {!video.url && (
          <span className="absolute top-3 right-3 bg-yellow px-2.5 py-1 font-mono text-[0.58rem] font-semibold tracking-[0.14em] text-ink uppercase">
            {video.reserved ? "In production" : "Coming soon"}
          </span>
        )}
      </div>

      <p className="mt-5 font-display text-[1.05rem] leading-snug italic text-grey text-balance">
        {video.observation}
      </p>
      <h3 className="mt-3 font-display text-[1.25rem] leading-snug font-semibold tracking-tight text-ink text-balance">
        {video.title}
      </h3>
      <p className="mt-3 text-[0.92rem] leading-relaxed text-grey">
        {video.idea}
      </p>

      <dl className="mt-5 border-t border-rule">
        <div className="grid grid-cols-[6rem_1fr] gap-3 border-b border-rule py-2.5 font-mono text-[0.58rem] tracking-[0.12em] uppercase">
          <dt className="text-grey/70">Medium</dt>
          <dd className="text-ink">{video.medium}</dd>
        </div>
        <div className="grid grid-cols-[6rem_1fr] gap-3 border-b border-rule py-2.5 font-mono text-[0.58rem] tracking-[0.12em] uppercase">
          <dt className="text-grey/70">Demonstrates</dt>
          <dd className="text-ink">{video.demonstrates}</dd>
        </div>
      </dl>

      {video.url && (
        <div className="mt-auto pt-6">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border-b border-ink pb-1 font-medium text-ink transition-colors hover:border-orange-deep hover:text-orange-deep"
            aria-label={`Watch ${video.title} on YouTube`}
          >
            Watch <ArrowUpRight size={14} />
          </a>
        </div>
      )}
    </Reveal>
  );
}
