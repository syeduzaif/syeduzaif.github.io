import { processStages } from "@/data/process";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Approach() {
  return (
    <Section id="approach" labelledBy="approach-heading" className="bg-surface/30">
      <Container>
        <SectionHeader
          eyebrow="How I work"
          id="approach-heading"
          title="How I approach products"
          intro="A repeatable way of moving from a messy idea to something shipped — and improved."
        />
        <ol className="mt-14 border-t border-cream/10">
          {processStages.map((stage) => (
            <li key={stage.number}>
              <Reveal className="grid gap-4 border-b border-cream/10 py-8 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-12">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-2xl text-sand">
                    {stage.number}
                  </span>
                  <h3 className="font-serif text-h3 text-cream">{stage.name}</h3>
                </div>
                <div>
                  <p className="text-lead text-cream/90">{stage.question}</p>
                  <p className="mt-3 border-l-2 border-olive pl-4 text-sm text-muted">
                    {stage.example}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
