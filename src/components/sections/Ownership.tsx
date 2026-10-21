import { ownershipTiers } from "@/data/ownership";
import { siteConfig } from "@/data/siteConfig";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ResponsibilityMap } from "@/components/lab/ResponsibilityMap";

/**
 * "What I touch in a product" — ownership as nested containment rather than
 * inflated claims. The masthead sits beside the map, not above it.
 */
export function Ownership() {
  const copy = siteConfig.sections.ownership;

  return (
    <Section id="ownership" labelledBy="ownership-heading">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="font-mono text-eyebrow font-medium tracking-[0.16em] text-orange-deep uppercase">
            {copy.eyebrow}
          </p>
          <h2
            id="ownership-heading"
            className="mt-5 text-h2 [font-stretch:90%] text-ink text-balance"
          >
            {copy.heading}
          </h2>
          <p className="mt-6 max-w-[44ch] text-grey">{copy.intro}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <ResponsibilityMap tiers={[...ownershipTiers]} />
        </Reveal>
      </Container>
    </Section>
  );
}
