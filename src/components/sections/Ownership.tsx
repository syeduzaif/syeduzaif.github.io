import { ownershipAreas } from "@/data/ownership";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Ownership() {
  return (
    <Section id="ownership" labelledBy="ownership-heading">
      <Container>
        <SectionHeader
          eyebrow="Ownership"
          id="ownership-heading"
          title="Beyond writing code"
          intro="I don't wait for perfectly written tickets. I take responsibility across the product, not just the implementation."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {ownershipAreas.map((area) => (
            <Reveal key={area.title}>
              <div className="h-full rounded-lg border border-cream/10 bg-surface/40 p-7">
                <h3 className="font-serif text-h3 text-cream">{area.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {area.points.map((point) => (
                    <li key={point} className="flex gap-3 text-muted">
                      <span
                        aria-hidden
                        className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-terracotta"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
