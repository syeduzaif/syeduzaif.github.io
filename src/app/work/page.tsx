import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredSlugs, caseStudies } from "@/data/caseStudies";
import { siteConfig } from "@/data/siteConfig";
import { routeMetadata } from "@/lib/seo";
import { accentVars } from "@/lib/accents";
import { inquiryRows } from "@/lib/caseStudyRows";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecTable } from "@/components/ui/SpecTable";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = routeMetadata({
  title: "Product and Flutter Case Studies",
  description:
    "Selected product and Flutter case studies by Syed Uzaif — a production education platform (SimpliEd), an independent budgeting product (Budget Buddy), and a behavioural alarm experiment (Stupid Alarm).",
  path: "/work/",
});

/** The full experiment index — every investigation as a technical report. */
export default function WorkIndexPage() {
  return (
    <div className="pt-28 pb-24 md:pt-36">
      <Container>
        <SectionHeader
          as="h1"
          eyebrow="Index / all experiments"
          title={siteConfig.work.heading}
          intro={siteConfig.work.intro}
        />

        <ol className="mt-16 space-y-16 md:mt-20 md:space-y-24">
          {featuredSlugs.map((slug) => {
            const cs = caseStudies[slug];
            const href = `/work/${slug}/`;

            return (
              <li key={slug} style={accentVars[cs.accent]}>
                <Reveal>
                  {/* running head — experiment number, kind, lifecycle */}
                  <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t-2 border-ink pt-3">
                    <p className="flex items-center gap-3 font-mono text-[0.62rem] font-semibold tracking-[0.16em] text-ink uppercase">
                      Experiment {cs.experiment.n}
                      <span aria-hidden className="h-px w-7 bg-ink/40" />
                      <span className="font-medium text-grey">
                        {cs.experiment.kind}
                      </span>
                    </p>
                    {cs.status && (
                      <p className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] text-grey uppercase">
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full bg-(--accent)"
                        />
                        {cs.status}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 grid gap-6 lg:grid-cols-[6.5rem_1fr_auto] lg:gap-10">
                    <p
                      aria-hidden
                      className="font-display text-[4.5rem] leading-[0.8] font-bold [font-stretch:88%] text-(--accent)"
                    >
                      {cs.experiment.n}
                    </p>

                    <div className="max-w-[62ch]">
                      <h2 className="text-h3 [font-stretch:92%] text-ink text-balance">
                        <Link
                          href={href}
                          className="transition-colors hover:text-(--accent-ink)"
                        >
                          {cs.title}
                        </Link>
                      </h2>
                      <p className="mt-4 text-grey">{cs.summary}</p>

                      <SpecTable className="mt-7" rows={inquiryRows(cs.inquiry)} />

                      <Link
                        href={href}
                        className="mt-6 inline-flex items-center gap-1.5 border-b border-ink pb-1 text-[0.95rem] font-medium text-ink transition-colors hover:border-(--accent-ink) hover:text-(--accent-ink)"
                      >
                        Read the investigation <ArrowUpRight size={15} />
                      </Link>

                      {cs.stack && (
                        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5">
                          {cs.stack.map((tech) => (
                            <li
                              key={tech}
                              className="font-mono text-[0.6rem] tracking-[0.12em] text-grey uppercase after:ml-3 after:text-ink/25 after:content-['·'] last:after:content-none"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <Link
                      href={href}
                      aria-label={`Read the ${cs.experiment.kind} investigation`}
                      className="hidden size-11 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-paper lg:flex"
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </div>
  );
}
