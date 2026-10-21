import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredSlugs, caseStudies } from "@/data/caseStudies";
import { siteConfig } from "@/data/siteConfig";
import { routeMetadata } from "@/lib/seo";
import { accentVars } from "@/lib/accents";
import { Container } from "@/components/ui/Container";
import { EditorialLabel } from "@/components/lab/EditorialLabel";
import { InquiryBlock } from "@/components/lab/InquiryBlock";

export const metadata = routeMetadata({
  title: "Product and Flutter Case Studies",
  description:
    "Selected product and Flutter case studies by Syed Uzaif — a production education platform (SimpliEd), an independent budgeting product (Budget Buddy), and a behavioural alarm experiment (Stupid Alarm).",
  path: "/work/",
});

/** The full experiment index — an editorial table of investigations. */
export default function WorkIndexPage() {
  return (
    <div className="pt-28 pb-24 md:pt-36">
      <Container>
        <EditorialLabel>Index / all experiments</EditorialLabel>
        <h1 className="mt-4 text-h2 text-ink text-balance">
          {siteConfig.work.heading}
        </h1>
        <p
          className="mt-5 text-lead text-grey"
          style={{ maxWidth: "var(--width-reading)" }}
        >
          {siteConfig.work.intro}
        </p>

        <ol className="mt-14 border-t border-ink/15">
          {featuredSlugs.map((slug) => {
            const cs = caseStudies[slug];
            return (
              <li
                key={slug}
                style={accentVars[cs.accent]}
                className="border-b border-ink/15"
              >
                <div className="grid gap-6 py-10 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-10">
                  <span
                    aria-hidden
                    className="font-display text-4xl text-(--accent-ink) md:pt-1"
                  >
                    {cs.experiment.n}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <EditorialLabel className="text-(--accent-ink)">
                        {cs.experiment.kind}
                      </EditorialLabel>
                      {cs.status && (
                        <span className="border border-ink/20 bg-paper-soft px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-grey">
                          {cs.status}
                        </span>
                      )}
                    </div>
                    <h2 className="mt-3 font-display text-h3 text-ink text-balance">
                      <Link
                        href={`/work/${slug}/`}
                        className="transition-colors hover:text-(--accent-ink)"
                      >
                        {cs.title}
                      </Link>
                    </h2>
                    <p className="mt-3 max-w-[46rem] text-grey">{cs.summary}</p>
                    <div className="mt-5 max-w-[46rem]">
                      <InquiryBlock inquiry={cs.inquiry} />
                    </div>
                  </div>
                  <Link
                    href={`/work/${slug}/`}
                    aria-label={`Read the ${cs.experiment.kind} investigation`}
                    className="hidden h-11 w-11 items-center justify-center border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper-soft md:flex"
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </div>
  );
}
