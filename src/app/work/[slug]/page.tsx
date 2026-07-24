import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { caseStudies, featuredSlugs, type CaseStudy } from "@/data/caseStudies";
import { routeMetadata } from "@/lib/seo";
import { accentVars } from "@/lib/accents";
import { Container } from "@/components/ui/Container";
import { GithubIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { EditorialLabel } from "@/components/lab/EditorialLabel";
import { ExperimentLegend } from "@/components/lab/ExperimentLegend";
import { Glyph, type GlyphKind } from "@/components/lab/Glyph";
import { DecisionRecord } from "@/components/lab/DecisionRecord";
import { ApproachCard } from "@/components/lab/ApproachCard";
import { Annotation } from "@/components/lab/Annotation";
import { MediaFrame } from "@/components/media/MediaFrame";
import { MediaFragment } from "@/components/lab/MediaFragment";
import { ResponsibilityMatrix } from "@/components/ui/ResponsibilityMatrix";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { ProjectMetric } from "@/components/ui/ProjectMetric";
import { ContentPlaceholder } from "@/components/ui/ContentPlaceholder";

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

/** A chapter: numbered mono header + optional glyph, then content. */
function Chapter({
  id,
  n,
  title,
  glyph,
  wide,
  children,
}: {
  id: string;
  n: string;
  title: string;
  glyph?: GlyphKind;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28">
      <header className="flex items-center gap-3 border-b border-ink/15 pb-3">
        <span className="font-mono text-[0.72rem] text-(--accent-ink)">{n}</span>
        {glyph && <Glyph kind={glyph} className="text-(--accent-ink)" />}
        <h2
          id={`${id}-h`}
          className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.2em] text-ink"
        >
          {title}
        </h2>
      </header>
      <div
        className="mt-6 text-grey"
        style={wide ? undefined : { maxWidth: "var(--width-reading)" }}
      >
        {children}
      </div>
    </section>
  );
}

function List({ items, glyph }: { items: string[]; glyph?: GlyphKind }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          {glyph ? (
            <span aria-hidden className="mt-1 text-(--accent-ink)">
              <Glyph kind={glyph} size={12} />
            </span>
          ) : (
            <span
              aria-hidden
              className="mt-[11px] h-1 w-1 shrink-0 bg-ink/60"
            />
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}

interface ChapterDef {
  id: string;
  title: string;
  glyph?: GlyphKind;
  wide?: boolean;
  body: React.ReactNode;
}

export default async function WorkCaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const others = featuredSlugs
    .filter((s) => s !== cs.slug)
    .map((s) => caseStudies[s]);

  const visualGaps = cs.gaps?.filter((g) => g.section === "Visual walkthrough");
  const optionGaps = cs.gaps?.filter((g) => g.section === "Options considered");
  const trailingGaps = cs.gaps?.filter(
    (g) =>
      g.section !== "Visual walkthrough" && g.section !== "Options considered",
  );

  /* Assemble chapters from whatever content exists — numbering stays dense. */
  const defs: (ChapterDef | false)[] = [
    !!cs.overview && {
      id: "observation",
      title: "Observation",
      glyph: "observation",
      body: (
        <>
          <p className="font-serif text-[1.35rem] leading-snug text-ink">
            {cs.inquiry.observation}
          </p>
          <p className="mt-4">{cs.overview}</p>
        </>
      ),
    },
    !!(cs.problem || cs.context) && {
      id: "problem",
      title: "Problem",
      glyph: "unresolved",
      body: (
        <>
          {cs.problem && <p>{cs.problem}</p>}
          {cs.context && (
            <p className="mt-4 border-l-2 border-ink/20 pl-4 text-sm">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-grey">
                Context ·{" "}
              </span>
              {cs.context}
            </p>
          )}
        </>
      ),
    },
    !!cs.responsibility && {
      id: "ownership",
      title: "Ownership",
      wide: true,
      body: (
        <>
          {cs.team && (
            <p style={{ maxWidth: "var(--width-reading)" }}>{cs.team}</p>
          )}
          <div className="mt-6">
            <ResponsibilityMatrix data={cs.responsibility} />
          </div>
        </>
      ),
    },
    !!cs.constraints && {
      id: "constraints",
      title: "Constraints",
      body: <List items={cs.constraints} />,
    },
    !!cs.questions && {
      id: "questions",
      title: "Questions",
      glyph: "unresolved",
      body: (
        <ul className="space-y-3">
          {cs.questions.map((q) => (
            <li key={q} className="flex gap-3">
              <span aria-hidden className="mt-1 text-(--accent-ink)">
                <Glyph kind="unresolved" size={12} />
              </span>
              <span className="font-serif text-[1.1rem] italic leading-snug text-ink/85">
                {q}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    !!(cs.options || cs.decisions) && {
      id: "decisions",
      title: "Decisions",
      glyph: "decision",
      wide: true,
      body: (
        <>
          {cs.options && (
            <>
              <EditorialLabel className="text-grey">
                Approaches weighed
              </EditorialLabel>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {cs.options.map((o) => (
                  <ApproachCard key={o.approach} option={o} />
                ))}
              </div>
              {optionGaps?.map((g) => (
                <div key={g.section} className="mt-4">
                  <ContentPlaceholder gap={g} />
                </div>
              ))}
            </>
          )}
          {cs.decisions && (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {cs.decisions.map((d, i) => (
                <DecisionRecord
                  key={d.decision}
                  n={String(i + 1).padStart(2, "0")}
                  decision={d}
                />
              ))}
            </div>
          )}
        </>
      ),
    },
    !!(cs.technical || cs.architecture || cs.gallery || visualGaps?.length) && {
      id: "system",
      title: "System",
      glyph: "progression",
      wide: true,
      body: (
        <>
          {cs.technical && (
            <div style={{ maxWidth: "var(--width-reading)" }}>
              <List items={cs.technical} />
            </div>
          )}
          {cs.architecture && (
            <div className="mt-7">
              <ArchitectureDiagram
                title={cs.architecture.title}
                steps={cs.architecture.steps}
                note={cs.architecture.note}
              />
            </div>
          )}
          {cs.links?.article && (
            <p className="mt-5 border-l-2 pl-4" style={{ borderColor: "var(--accent)" }}>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-grey">
                Published write-up ·{" "}
              </span>
              <a
                href={cs.links.article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-(--accent-ink) underline decoration-1 underline-offset-4 transition-colors hover:text-ink"
              >
                {cs.links.article.label} ↗
              </a>
            </p>
          )}
          {cs.gallery && cs.gallery.length > 0 && (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cs.gallery.map((m, i) =>
                m.kind === "image" ? (
                  <MediaFragment
                    key={m.src}
                    src={m.src}
                    alt={m.alt}
                    caption={m.caption}
                    rotate={i % 2 === 0 ? -0.8 : 0.8}
                    taped
                    aspect="aspect-[9/19]"
                    sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw"
                  />
                ) : (
                  <MediaFrame
                    key={i}
                    media={m}
                    className="aspect-[3/4]"
                    sizes="(max-width:640px) 100vw, 50vw"
                  />
                ),
              )}
            </div>
          )}
          {visualGaps?.map((g) => (
            <div key={g.section} className="mt-6">
              <ContentPlaceholder gap={g} />
            </div>
          ))}
          {cs.confidential && (
            <p className="mt-5">
              <Annotation className="text-[0.95rem]">
                production work under confidentiality — screenshots and details
                are sanitised (student data, internal URLs, private metrics
                removed) before publishing.
              </Annotation>
            </p>
          )}
        </>
      ),
    },
    !!(cs.metrics || cs.results) && {
      id: "results",
      title: "Results",
      glyph: "result",
      wide: true,
      body: (
        <>
          {cs.metrics && <ProjectMetric metrics={cs.metrics} />}
          {cs.results && (
            <div
              className={cs.metrics ? "mt-6" : undefined}
              style={{ maxWidth: "var(--width-reading)" }}
            >
              <List items={cs.results} glyph="result" />
            </div>
          )}
        </>
      ),
    },
    !!cs.accessibility && {
      id: "accessibility",
      title: "Accessibility",
      body: <List items={cs.accessibility} />,
    },
    !!(cs.learnings || cs.improvements || cs.nextSteps) && {
      id: "reflection",
      title: "Reflection",
      body: (
        <div className="space-y-7">
          {cs.learnings && (
            <div>
              <EditorialLabel className="text-grey">What I learned</EditorialLabel>
              <div className="mt-3">
                <List items={cs.learnings} />
              </div>
            </div>
          )}
          {cs.improvements && (
            <div>
              <EditorialLabel className="text-grey">
                What I would improve
              </EditorialLabel>
              <div className="mt-3">
                <List items={cs.improvements} />
              </div>
            </div>
          )}
          {cs.nextSteps && (
            <div>
              <EditorialLabel className="text-grey">Next steps</EditorialLabel>
              <div className="mt-3">
                <List items={cs.nextSteps} glyph="progression" />
              </div>
            </div>
          )}
          {trailingGaps && trailingGaps.length > 0 && (
            <div className="space-y-3">
              {trailingGaps.map((g) => (
                <ContentPlaceholder key={g.section} gap={g} />
              ))}
            </div>
          )}
        </div>
      ),
    },
  ];

  const chapters: (ChapterDef & { n: string })[] = defs
    .filter((c): c is ChapterDef => Boolean(c))
    .map((c, i) => ({ ...c, n: String(i + 1).padStart(2, "0") }));

  return (
    <article
      className="pt-28 pb-24 md:pt-36"
      style={accentVars[cs.accent]}
    >
      <Container>
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-grey transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} /> Index / all experiments
        </Link>

        {/* Header */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <EditorialLabel className="text-(--accent-ink)">
                Experiment {cs.experiment.n} / {cs.experiment.kind}
              </EditorialLabel>
              {cs.status && (
                <span className="border border-ink/20 bg-paper-soft px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-grey">
                  {cs.status}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-h2 text-ink text-balance">{cs.title}</h1>
            <p className="mt-5 text-lead text-grey">{cs.summary}</p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/15 pt-6 text-sm">
              {cs.role && (
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-grey">
                    Role
                  </dt>
                  <dd className="mt-1 text-ink/90">{cs.role}</dd>
                </div>
              )}
              {cs.timeframe && (
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-grey">
                    Timeline
                  </dt>
                  <dd className="mt-1 text-ink/90">{cs.timeframe}</dd>
                </div>
              )}
              {cs.platforms && (
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-grey">
                    Platforms
                  </dt>
                  <dd className="mt-1 text-ink/90">
                    {cs.platforms.join(" · ")}
                  </dd>
                </div>
              )}
              <div>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-grey">
                  Key result
                </dt>
                <dd className="mt-1 text-ink/90">
                  {cs.keyMetric.value} — {cs.keyMetric.label}
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative border border-ink/15 bg-paper-soft p-2 shadow-[4px_5px_0_rgb(23_23_23/0.08)]">
            <MediaFrame
              media={cs.cover}
              className="aspect-[4/3]"
              sizes="(max-width:768px) 100vw, 45vw"
              priority
            />
          </div>
        </div>

        <ExperimentLegend className="mt-12" />

        {/* Body: sticky chapter index + chapters */}
        <div className="mt-12 gap-12 lg:grid lg:grid-cols-[190px_1fr] xl:gap-16">
          <aside className="hidden lg:block">
            <nav
              aria-label="Chapters"
              className="sticky top-24 border-l border-ink/15 pl-4"
            >
              <EditorialLabel className="text-grey">Index</EditorialLabel>
              <ol className="mt-3 space-y-2">
                {chapters.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      className="group flex items-baseline gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-grey transition-colors hover:text-ink"
                    >
                      <span className="text-(--accent-ink)">{c.n}</span>
                      <span>{c.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="space-y-14 md:space-y-16">
            {/* compact index for small screens */}
            <nav
              aria-label="Chapters"
              className="border border-ink/15 bg-paper-soft p-4 lg:hidden"
            >
              <EditorialLabel className="text-grey">Index</EditorialLabel>
              <ol className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                {chapters.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-grey hover:text-ink"
                    >
                      <span className="text-(--accent-ink)">{c.n}</span> {c.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {chapters.map((c) => (
              <Chapter
                key={c.id}
                id={c.id}
                n={c.n}
                title={c.title}
                glyph={c.glyph}
                wide={c.wide}
              >
                {c.body}
              </Chapter>
            ))}

            {/* Resources */}
            <div className="flex flex-wrap gap-3">
              {cs.links?.article && (
                <a
                  href={cs.links.article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ink/25 px-4 py-2 text-sm text-ink transition-colors hover:border-ink hover:bg-ink/5"
                >
                  <FileText size={16} /> Read the architecture write-up
                </a>
              )}
              {cs.links?.github && (
                <a
                  href={cs.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ink/25 px-4 py-2 text-sm text-ink transition-colors hover:border-ink hover:bg-ink/5"
                >
                  <GithubIcon size={16} /> View on GitHub
                </a>
              )}
              {cs.links?.youtube && (
                <a
                  href={cs.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ink/25 px-4 py-2 text-sm text-ink transition-colors hover:border-ink hover:bg-ink/5"
                >
                  <YoutubeIcon size={16} /> Watch the series
                </a>
              )}
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 border border-ink/25 px-4 py-2 text-sm text-ink transition-colors hover:border-ink hover:bg-ink/5"
              >
                Ask me about it
              </Link>
            </div>
          </div>
        </div>

        {/* Closing nav */}
        {others.length > 0 && (
          <nav
            aria-label="More work"
            className="mt-20 border-t border-ink/15 pt-10"
          >
            <EditorialLabel>More experiments</EditorialLabel>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/work/${o.slug}/`}
                  style={accentVars[o.accent]}
                  className="group flex flex-col border border-ink/15 bg-paper-soft p-6 transition-colors hover:border-ink/40"
                >
                  <EditorialLabel className="text-(--accent-ink)">
                    Experiment {o.experiment.n} / {o.experiment.kind}
                  </EditorialLabel>
                  <span className="mt-2 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-(--accent-ink)">
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
