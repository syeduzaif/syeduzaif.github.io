import { ArrowRight } from "lucide-react";
import { currentDirection } from "@/data/highlights";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function CurrentDirection() {
  return (
    <Section
      id="direction"
      labelledBy="direction-heading"
      className="bg-surface/30"
    >
      <Container>
        <SectionHeader
          eyebrow="Forward"
          id="direction-heading"
          title="What I'm working toward"
        />
        <ul className="mt-12 grid gap-x-12 md:grid-cols-2">
          {currentDirection.map((item, i) => (
            <li key={item}>
              <Reveal
                className="flex items-center gap-3 border-b border-cream/10 py-4 text-cream/90"
                delay={(i % 2) * 0.05}
              >
                <ArrowRight size={16} className="shrink-0 text-terracotta" />
                {item}
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
