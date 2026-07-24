import { featuredCaseStudies } from "@/data/caseStudies";
import { siteConfig } from "@/data/siteConfig";
import { routeMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProjectFeature } from "@/components/ui/ProjectFeature";

export const metadata = routeMetadata({
  title: "Work",
  description:
    "Selected product and Flutter case studies by Syed Uzaif — SimpliEd, Budget Buddy, and Stupid Alarm.",
  path: "/work/",
});

export default function WorkIndexPage() {
  return (
    <div className="pt-28 pb-24 md:pt-36">
      <Container>
        <Eyebrow>Work</Eyebrow>
        <h1 className="mt-4 text-h2 text-cream text-balance">
          {siteConfig.work.heading}
        </h1>
        <p
          className="mt-5 text-lead text-muted"
          style={{ maxWidth: "var(--width-reading)" }}
        >
          {siteConfig.work.intro}
        </p>

        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {featuredCaseStudies.map((caseStudy, i) => (
            <ProjectFeature
              key={caseStudy.slug}
              caseStudy={caseStudy}
              index={i}
              headingLevel={2}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
