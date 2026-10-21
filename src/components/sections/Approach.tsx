import { processStages, processLoopNote } from "@/data/process";
import { siteConfig } from "@/data/siteConfig";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessFlow } from "@/components/lab/ProcessFlow";

/** "How I think" — six connected stages with a deliberate loop, on the night band. */
export function Approach() {
  const copy = siteConfig.sections.process;

  return (
    <Section id="process" labelledBy="process-heading" className="bg-night">
      <Container>
        <SectionHeader
          eyebrow={copy.eyebrow}
          id="process-heading"
          title={copy.heading}
          intro={copy.intro}
          onNight
        />
        <Reveal className="mt-14">
          <ProcessFlow stages={[...processStages]} loopNote={processLoopNote} />
        </Reveal>
      </Container>
    </Section>
  );
}
