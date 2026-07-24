import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { caseStudies, featuredSlugs, type CaseStudy } from "@/data/caseStudies";
import { routeMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GithubIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { ProjectVisual } from "@/components/media/ProjectVisual";

export const dynamicParams = false;

export function generateStaticParams() {
  return featuredSlugs.map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug as CaseStudy["slug"]];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return routeMetadata({
    title: cs.title,
    description: cs.summary,
    path: `/work/${slug}/`,
  });
}

/** A body block: serif sub-heading + content, at reading width. */
function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-serif text-h3 text-cream">{title}</h2>
      <div className="mt-3 text-muted">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden
            className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-terracotta"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function WorkCaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const others = featuredSlugs
    .filter((s) => s !== cs.slug)
    .map((s) => caseStudies[s]);

  return (
    <article className="pt-28 pb-24 md:pt-36">
      <Container>
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-cream"
        >
          <ArrowLeft size={16} /> Back to work
        </Link>

        {/* Header */}
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div>
            <Eyebrow>{cs.category}</Eyebrow>
            <h1 className="mt-4 text-h2 text-cream text-balance">{cs.title}</h1>
            <p className="mt-5 text-lead text-muted">{cs.summary}</p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-cream/10 pt-6 text-sm">
              {cs.role && (
                <div>
                  <dt className="text-olive-text">Role</dt>
                  <dd className="mt-1 text-cream/90">{cs.role}</dd>
                </div>
              )}
              {cs.timeframe && (
                <div>
                  <dt className="text-olive-text">Timeline</dt>
                  <dd className="mt-1 text-cream/90">{cs.timeframe}</dd>
                </div>
              )}
              {cs.platforms && (
                <div>
                  <dt className="text-olive-text">Platforms</dt>
                  <dd className="mt-1 text-cream/90">
                    {cs.platforms.join(" · ")}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-olive-text">Key result</dt>
                <dd className="mt-1 text-cream/90">
                  {cs.keyMetric.value} — {cs.keyMetric.label}
                </dd>
              </div>
            </dl>
          </div>

          <ProjectVisual
            media={cs.cover}
            className="aspect-[4/3]"
            sizes="(max-width:768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Body */}
        <div
          className="mt-16 md:mt-20"
          style={{ maxWidth: "var(--width-reading)" }}
        >
          {cs.overview && (
            <Block title="Overview">
              <p>{cs.overview}</p>
            </Block>
          )}
          {cs.challenge && (
            <Block title="The challenge">
              <p>{cs.challenge}</p>
            </Block>
          )}
          {cs.contributions && (
            <Block title="What I did">
              <List items={cs.contributions} />
            </Block>
          )}
          {cs.results && (
            <Block title="Results">
              <List items={cs.results} />
            </Block>
          )}
          {cs.learnings && (
            <Block title="What I learned">
              <List items={cs.learnings} />
            </Block>
          )}
          {cs.nextSteps && (
            <Block title="Next steps">
              <List items={cs.nextSteps} />
            </Block>
          )}

          {/* Resources */}
          <div className="mt-12 flex flex-wrap gap-3">
            {cs.links?.github && (
              <a
                href={cs.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-cream/20 px-4 py-2 text-sm text-cream transition-colors hover:border-sand hover:text-sand"
              >
                <GithubIcon size={16} /> View on GitHub
              </a>
            )}
            {cs.links?.youtube && (
              <a
                href={cs.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-cream/20 px-4 py-2 text-sm text-cream transition-colors hover:border-sand hover:text-sand"
              >
                <YoutubeIcon size={16} /> Watch the series
              </a>
            )}
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-md border border-cream/20 px-4 py-2 text-sm text-cream transition-colors hover:border-sand hover:text-sand"
            >
              Ask me about it
            </Link>
          </div>

          {cs.confidential && (
            <p className="mt-6 text-xs text-olive-text">
              Note: this is production work under confidentiality — visuals and
              details are sanitised before publishing.
            </p>
          )}
        </div>

        {/* Closing nav */}
        {others.length > 0 && (
          <nav
            aria-label="More work"
            className="mt-20 border-t border-cream/10 pt-10"
          >
            <Eyebrow>More work</Eyebrow>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/work/${o.slug}/`}
                  className="group flex flex-col rounded-lg border border-cream/10 bg-surface/40 p-6 transition-colors hover:border-sand/40"
                >
                  <Eyebrow>{o.category}</Eyebrow>
                  <span className="mt-2 font-serif text-xl text-cream transition-colors group-hover:text-sand">
                    {o.title}
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </Container>
    </article>
  );
}
