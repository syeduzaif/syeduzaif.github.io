import { credibilityFacts } from "@/data/highlights";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HandDrawnArrow } from "@/components/lab/HandDrawnArrow";
import { Annotation } from "@/components/lab/Annotation";
import { cn } from "@/lib/utils";

/** Uneven vertical rhythm — annotations pinned along a shared rule. */
const offsets = ["", "md:translate-y-3", "md:-translate-y-1", "md:translate-y-4"];
const underlines = ["text-orange", "text-blue", "text-green", "text-yellow"];

/**
 * Product evidence strip — metrics presented as editorial annotations along a
 * horizontal composition, not four identical stat cards. Notes carry the
 * honesty boundaries (downloads = team/product outcome).
 */
export function CredibilityStrip() {
  return (
    <section
      aria-label="Key facts"
      className="border-y border-ink/15 bg-paper-soft py-12"
    >
      <Container>
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {credibilityFacts.map((fact, i) => (
            <li key={fact.label} className={cn("max-w-[16rem]", offsets[i])}>
              <Reveal delay={i * 0.05}>
                <span className="font-serif text-[1.7rem] leading-none text-ink">
                  {fact.value}
                </span>
                <HandDrawnArrow
                  variant="underline"
                  className={cn("mt-1.5 block h-2 w-24", underlines[i])}
                />
                <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-grey">
                  {fact.label}
                </p>
                {fact.note && (
                  <Annotation className="mt-1.5 text-[0.92rem]">
                    ↳ {fact.note}
                  </Annotation>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
