import { creativeVideos } from "@/data/creative";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoryObservation } from "@/components/lab/StoryObservation";

/** Creative work as observations that became stories — no autoplaying video. */
export function CreativeWork() {
  return (
    <Section
      id="creative"
      labelledBy="creative-heading"
      className="border-y border-ink/10 bg-paper-soft/60"
    >
      <Container>
        <SectionHeader
          eyebrow="03 / Creative"
          id="creative-heading"
          title="Observations that became stories"
          intro="The same habit that drives the product work — noticing something small and following it — pointed at people instead of software. Video opens on YouTube; nothing autoplays here."
        />
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {creativeVideos.map((video, i) => (
            <StoryObservation
              key={video.title}
              video={video}
              n={String(i + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
