import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import {
  caseStudies,
  confidentialityNote,
  featuredSlugs,
  type CaseStudy,
} from "@/data/caseStudies";
import { routeMetadata } from "@/lib/seo";
import { accentVars } from "@/lib/accents";
import { factRows } from "@/lib/caseStudyRows";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SpecTable } from "@/components/ui/SpecTable";
import { GithubIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { DecisionRecord } from "@/components/lab/DecisionRecord";
import { ApproachCard } from "@/components/lab/ApproachCard";
import { MediaFrame } from "@/components/media/MediaFrame";
import { MediaFragment } from "@/components/lab/MediaFragment";
import { AppTrio } from "@/components/lab/AppTrio";
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

/** Square bordered action — the site's one button shape. */
const actionClass =
  "inline-flex items-center gap-2 border border-ink px-4 py-2.5 font-mono text-[0.62rem] tracking-[0.14em] text-ink uppercase transition-colors hover:bg-ink hover:text-paper";

/** A chapter: thick rule, mono index + title, then the content. */
function Chapter({
  id,
  n,
  title,
  wide,
  children,
}: {
  id: string;
  n: string;
  title: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28">
      <header className="flex items-baseline gap-4 border-t-2 border-ink pt-3">
        <span className="font-mono text-[0.62rem] font-semibold tracking-[0.16em] text-(--accent-ink)">
          {n}
        </span>
        <h2
          id={`${id}-h`}
          className="font-mono text-[0.68rem] font-semibold tracking-[0.18em] text-ink uppercase"
        >
          {title}
        </h2>
      </header>
      <div
        className="mt-7 text-grey"
        style={wide ? undefined : { maxWidth: "var(--width-reading)" }}
      >
        {children}
      </div>
    </section>
  );
}

/** Square accent markers, replacing the retired glyph set. */
function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden
            className="mt-[0.6em] size-1.5 shrink-0 bg-(--accent)"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** A labelled sub-block inside a chapter. */
function SubBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Eyebrow tone="grey">{label}</Eyebrow>
      <div className="mt-3">{children}</div>
    </div>
  );
}

interface ChapterDef {
  id: string;
  title: string;
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
      body: (
        <>
          <p className="font-display text-[1.3rem] leading-snug font-medium [font-stretch:94%] text-ink text-balance">
            {cs.inquiry.observation}
          </p>
          <p className="mt-5">{cs.overview}</p>
        </>
      ),
    },
    !!(cs.problem || cs.context) && {
      id: "problem",
      title: "Problem",
      body: (
        <>
          {cs.problem && <p>{cs.problem}</p>}
          {cs.context && (
            <div className="mt-5 border-l-2 border-rule pl-4">
              <Eyebrow tone="grey">Context</Eyebrow>
              <p className="mt-1.5 text-sm">{cs.context}</p>
            </div>
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
          <div className="mt-7">
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
      body: (
        <ol className="border-t border-rule">
          {cs.questions.map((q, i) => (
            <li
              key={q}
              className="grid gap-4 border-b border-rule py-4"
              style={{ gridTemplateColumns: "2.5rem 1fr" }}
            >
              <span
                aria-hidden
                className="pt-1 font-mono text-[0.6rem] font-medium tracking-[0.14em] text-(--accent-ink)"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[1.1rem] leading-snug font-medium [font-stretch:94%] text-ink">
                {q}
              </span>
            </li>
          ))}
        </ol>
      ),
    },
    !!(cs.options || cs.decisions) && {
      id: "decisions",
      title: "Decisions",
      wide: true,
      body: (
        <div className="space-y-9">
          {cs.options && (
            <SubBlock label="Approaches weighed">
              <div className="grid gap-3 md:grid-cols-3">
                {cs.options.map((o) => (
                  <ApproachCard key={o.approach} option={o} />
                ))}
              </div>
              {optionGaps?.map((g) => (
                <div key={g.section} className="mt-4">
                  <ContentPlaceholder gap={g} />
                </div>
              ))}
            </SubBlock>
          )}
          {cs.decisions && (
            <SubBlock label="Decisions and trade-offs">
              <div className="grid gap-4 md:grid-cols-2">
                {cs.decisions.map((d, i) => (
                  <DecisionRecord
                    key={d.decision}
                    n={String(i + 1).padStart(2, "0")}
                    decision={d}
                  />
                ))}
              </div>
            </SubBlock>
          )}
        </div>
      ),
    },
    !!(cs.technical || cs.architecture || cs.gallery || visualGaps?.length) && {
      id: "system",
      title: "System",
      wide: true,
      body: (
        <>
          {cs.technical && (
            <div style={{ maxWidth: "var(--width-reading)" }}>
              <List items={cs.technical} />
            </div>
          )}
          {cs.architecture && (
            <div className="mt-8">
              <ArchitectureDiagram
                title={cs.architecture.title}
                steps={cs.architecture.steps}
                note={cs.architecture.note}
              />
            </div>
          )}
          {cs.links?.article && (
            <div
              className="mt-6 border-l-2 pl-4"
              style={{ borderColor: "var(--accent)" }}
            >
              <Eyebrow tone="grey">Published write-up</Eyebrow>
              <a
                href={cs.links.article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium text-(--accent-ink) underline decoration-1 underline-offset-4 transition-colors hover:text-ink"
              >
                {cs.links.article.label} <ArrowUpRight size={13} />
              </a>
            </div>
          )}
          {cs.gallery && cs.gallery.length > 0 && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cs.gallery.map((m, i) =>
                m.kind === "image" ? (
                  <MediaFragment
                    key={m.src}
                    src={m.src}
                    alt={m.alt}
                    caption={m.caption}
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
            <p className="mt-7 border-t border-rule pt-4 font-mono text-[0.62rem] leading-relaxed tracking-[0.1em] text-grey uppercase">
              {confidentialityNote}
            </p>
          )}
        </>
      ),
    },
    !!(cs.metrics || cs.results) && {
      id: "results",
      title: "Results",
      wide: true,
      body: (
        <>
          {cs.metrics && <ProjectMetric metrics={cs.metrics} />}
          {cs.results && (
            <div
              className={cs.metrics ? "mt-8" : undefined}
              style={{ maxWidth: "var(--width-reading)" }}
            >
              <List items={cs.results} />
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
            <SubBlock label="What I learned">
              <List items={cs.learnings} />
            </SubBlock>
          )}
          {cs.improvements && (
            <SubBlock label="What I would improve">
              <List items={cs.improvements} />
            </SubBlock>
          )}
          {cs.nextSteps && (
            <SubBlock label="Next steps">
              <List items={cs.nextSteps} />
            </SubBlock>
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
    <article className="pt-28 pb-24 md:pt-36" style={accentVars[cs.accent]}>
      <Container>
        <Link
          href="/work/"
          className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.14em] text-grey uppercase transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} /> Index / all experiments
        </Link>

        {/* ------------------------------------------------ running head */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t-2 border-ink pt-3">
          <p className="flex items-center gap-3 font-mono text-[0.62rem] font-semibold tracking-[0.16em] text-ink uppercase">
            Experiment {cs.experiment.n}
            <span aria-hidden className="h-px w-7 bg-ink/40" />
            <span className="font-medium text-grey">{cs.experiment.kind}</span>
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

        {/* ----------------------------------------------------- masthead */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p
              aria-hidden
              className="font-display text-[4.5rem] leading-[0.8] font-bold [font-stretch:88%] text-(--accent)"
            >
              {cs.experiment.n}
            </p>
            <h1 className="mt-5 text-h2 [font-stretch:90%] text-ink text-balance">
              {cs.title}
            </h1>
            <p className="mt-6 max-w-[54ch] text-lead text-grey">{cs.summary}</p>
            <SpecTable className="mt-9" labelWidth="7rem" rows={factRows(cs)} />
          </div>

          <div className="bg-paper-soft p-5 md:p-6">
            {cs.posterApps ? (
              <>
                <Eyebrow tone="accent">One platform / three surfaces</Eyebrow>
                <AppTrio
                  apps={cs.posterApps}
                  priority
                  className="mt-5"
                  note="Demo accounts shown — production data stays private."
                />
              </>
            ) : (
              <MediaFrame
                media={cs.cover}
                className="aspect-[4/3]"
                sizes="(max-width:768px) 100vw, 45vw"
                priority
              />
            )}
          </div>
        </div>

        {/* ------------------------------------ chapter index + chapters */}
        <div className="mt-20 gap-12 md:mt-24 lg:grid lg:grid-cols-[190px_1fr] xl:gap-16">
          <aside className="hidden lg:block">
            <nav
              aria-label="Chapters"
              className="sticky top-24 border-t-2 border-ink pt-4"
            >
              <Eyebrow tone="grey">Index</Eyebrow>
              <ol className="mt-3.5 space-y-2">
                {chapters.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      className="flex items-baseline gap-2.5 font-mono text-[0.66rem] tracking-[0.12em] text-grey uppercase transition-colors hover:text-ink"
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
              className="border border-rule bg-paper-soft p-4 lg:hidden"
            >
              <Eyebrow tone="grey">Index</Eyebrow>
              <ol className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
                {chapters.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      className="font-mono text-[0.66rem] tracking-[0.1em] text-grey uppercase hover:text-ink"
                    >
                      <span className="text-(--accent-ink)">{c.n}</span>{" "}
                      {c.title}
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
                wide={c.wide}
              >
                {c.body}
              </Chapter>
            ))}

            {/* Resources */}
            <div className="flex flex-wrap gap-3 border-t border-rule pt-8">
              {cs.links?.article && (
                <a
                  href={cs.links.article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionClass}
                >
                  <FileText size={14} /> Read the architecture write-up
                </a>
              )}
              {cs.links?.github && (
                <a
                  href={cs.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionClass}
                >
                  <GithubIcon size={14} /> View on GitHub
                </a>
              )}
              {cs.links?.youtube && (
                <a
                  href={cs.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionClass}
                >
                  <YoutubeIcon size={14} /> Watch the series
                </a>
              )}
              <Link href="/#contact" className={actionClass}>
                Ask me about it
              </Link>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------- closing nav */}
        {others.length > 0 && (
          <nav
            aria-label="More work"
            className="mt-20 border-t-2 border-ink pt-6 md:mt-24"
          >
            <Eyebrow tone="grey">More experiments</Eyebrow>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/work/${o.slug}/`}
                  style={accentVars[o.accent]}
                  className="group flex items-start justify-between gap-4 border border-rule bg-paper-soft p-6 transition-colors hover:border-ink"
                >
                  <span>
                    <Eyebrow tone="accent" as="span">
                      Experiment {o.experiment.n} / {o.experiment.kind}
                    </Eyebrow>
                    <span className="mt-2.5 block font-display text-[1.15rem] leading-snug font-semibold [font-stretch:94%] text-ink transition-colors group-hover:text-(--accent-ink)">
                      {o.title}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    size={18}
                    className="mt-0.5 shrink-0 text-grey transition-colors group-hover:text-ink"
                  />
                </Link>
              ))}
            </div>
          </nav>
        )}
      </Container>
    </article>
  );
}
