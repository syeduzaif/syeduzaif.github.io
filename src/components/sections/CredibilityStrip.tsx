import { credibilityFacts } from "@/data/highlights";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";

export function CredibilityStrip() {
  return (
    <section
      aria-label="Key facts"
      className="border-y border-cream/10 bg-surface/40 py-10"
    >
      <Container className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
        {credibilityFacts.map((fact, i) => (
          <Reveal key={fact.label} delay={i * 0.06}>
            <Stat value={fact.value} label={fact.label} />
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
