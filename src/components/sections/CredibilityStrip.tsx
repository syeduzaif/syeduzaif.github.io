import { credibilityFacts } from "@/data/highlights";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Product evidence — a four-column spec table bounded by rules. The notes
 * carry the honesty boundaries (downloads are a team/product outcome, the
 * load figure was profiled before it was restructured).
 */
export function CredibilityStrip() {
  return (
    <section aria-label="Key facts" className="pb-20 md:pb-28">
      <Container>
        <ul className="grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
          {credibilityFacts.map((fact, i) => (
            <li
              key={fact.label}
              className="border-b border-rule py-7 pr-8 sm:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <Reveal delay={i * 0.05}>
                <p className="font-mono text-[0.62rem] font-medium tracking-[0.16em] text-grey uppercase">
                  {fact.label}
                </p>
                <p className="mt-3 font-display text-[1.75rem] leading-none font-semibold tracking-tight text-ink">
                  {fact.value}
                </p>
                {fact.note && (
                  <p className="mt-3 max-w-[22ch] text-[0.82rem] leading-snug text-grey">
                    <span aria-hidden>↳ </span>
                    {fact.note}
                  </p>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="border-t border-rule" />
      </Container>
    </section>
  );
}
