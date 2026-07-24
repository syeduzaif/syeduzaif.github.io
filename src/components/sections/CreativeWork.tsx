import { creativeVideos } from "@/data/creative";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VideoCard } from "@/components/ui/VideoCard";

export function CreativeWork() {
  return (
    <Section id="creative" labelledBy="creative-heading" className="bg-surface/30">
      <Container>
        <SectionHeader
          eyebrow="Creative"
          id="creative-heading"
          title="Stories, experiments and creative work"
          intro="My background in video, photography, editing, and storytelling shapes how I think about products, communication, and user attention."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {creativeVideos.map((video) => (
            <VideoCard key={video.title} video={video} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
