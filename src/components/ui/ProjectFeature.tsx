import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";
import { ProjectVisual } from "@/components/media/ProjectVisual";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Large editorial project entry; alternates image side on desktop. */
export function ProjectFeature({
  caseStudy,
  index,
  headingLevel = 3,
}: {
  caseStudy: CaseStudy;
  index: number;
  /** Title heading level — keep the document outline correct per page. */
  headingLevel?: 2 | 3;
}) {
  const reversed = index % 2 === 1;
  const Heading = `h${headingLevel}` as React.ElementType;

  return (
    <Reveal>
      <article className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className={cn(reversed && "md:order-2")}>
          <ProjectVisual
            media={caseStudy.cover}
            className="aspect-[4/3]"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>

        <div className={cn(reversed && "md:order-1")}>
          <Eyebrow>{caseStudy.category}</Eyebrow>
          <Heading className="mt-3 text-h3 text-cream text-balance">
            {caseStudy.title}
          </Heading>
          <p className="mt-4 text-muted">{caseStudy.summary}</p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-serif text-2xl text-sand">
              {caseStudy.keyMetric.value}
            </span>
            <span className="text-sm text-muted">
              {caseStudy.keyMetric.label}
            </span>
          </div>

          {caseStudy.stack && (
            <div className="mt-6 flex flex-wrap gap-2">
              {caseStudy.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-sm border border-cream/10 px-2.5 py-1 text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/work/${caseStudy.slug}/`}
            className="mt-7 inline-flex items-center gap-1.5 text-terracotta-hi transition-colors hover:text-sand"
          >
            Read case study <ArrowUpRight size={16} />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
