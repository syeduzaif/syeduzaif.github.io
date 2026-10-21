import { creativeVideos } from "@/data/creative";
import { siteConfig } from "@/data/siteConfig";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoryObservation } from "@/components/lab/StoryObservation";

/** Creative work as observations that became stories — no autoplaying video. */
export function CreativeWork() {
  const copy = siteConfig.sections.creative;

  return (
    <Section
      id="creative"
      labelledBy="creative-heading"
      className="border-t border-rule"
    >
      <Container>
        <SectionHeader
          eyebrow={copy.eyebrow}
          id="creative-heading"
          title={copy.heading}
          intro={copy.intro}
        />
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0">
          {creativeVideos.map((video, i) => (
            <div
              key={video.title}
              className="md:border-r md:border-rule md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <StoryObservation
                video={video}
                n={String(i + 1).padStart(2, "0")}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
