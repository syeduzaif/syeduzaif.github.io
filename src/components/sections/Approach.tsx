import { processStages, processLoopNote } from "@/data/process";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessFlow } from "@/components/lab/ProcessFlow";

/** "How I think" — six connected stages with a deliberate loop. */
export function Approach() {
  return (
    <Section
      id="process"
      labelledBy="process-heading"
      className="border-y border-ink/10 bg-paper-soft/60"
    >
      <Container>
        <SectionHeader
          eyebrow="02 / Process"
          id="process-heading"
          title="How I think"
          intro="Six stages I actually move through — each one tied to a real example from shipped work. Select a stage to see it."
        />
        <Reveal className="mt-12">
          <ProcessFlow stages={[...processStages]} loopNote={processLoopNote} />
        </Reveal>
      </Container>
    </Section>
  );
}
