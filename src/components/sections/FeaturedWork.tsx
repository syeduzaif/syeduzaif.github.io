import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredCaseStudies } from "@/data/caseStudies";
import { siteConfig } from "@/data/siteConfig";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectFeature } from "@/components/ui/ProjectFeature";

export function FeaturedWork() {
  return (
    <Section id="work" labelledBy="work-heading">
      <Container>
        <SectionHeader
          eyebrow={siteConfig.work.eyebrow}
          id="work-heading"
          title={siteConfig.work.heading}
          intro={siteConfig.work.intro}
        />
        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {featuredCaseStudies.map((caseStudy, i) => (
            <ProjectFeature key={caseStudy.slug} caseStudy={caseStudy} index={i} />
          ))}
        </div>

        <div className="mt-14 border-t border-cream/10 pt-8">
          <Link
            href="/work/"
            className="inline-flex items-center gap-1.5 text-terracotta-hi transition-colors hover:text-sand"
          >
            View all work <ArrowUpRight size={16} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
