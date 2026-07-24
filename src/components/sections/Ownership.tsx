import { ownershipTiers } from "@/data/ownership";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ResponsibilityMap } from "@/components/lab/ResponsibilityMap";

/**
 * "What I touch in a product" — ownership visualised as a system map with an
 * explicit line-style legend, instead of inflated claims. Solid lines are
 * owned; dashed, contributed; dotted, growing toward.
 */
export function Ownership() {
  return (
    <Section id="ownership" labelledBy="ownership-heading">
      <Container>
        <SectionHeader
          eyebrow="Ownership map"
          id="ownership-heading"
          title="What I touch in a product"
          intro="Honest boundaries, drawn as a map: what I own today, what I contribute to alongside the team, and what I'm deliberately growing toward."
        />
        <Reveal className="mt-12">
          <ResponsibilityMap tiers={[...ownershipTiers]} />
        </Reveal>
      </Container>
    </Section>
  );
}
