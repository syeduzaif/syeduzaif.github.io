import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { siteConfig } from "@/data/siteConfig";
import { accentVars } from "@/lib/accents";
import type { CaseStudy } from "@/data/caseStudies";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFragment } from "@/components/lab/MediaFragment";
import { MediaFrame } from "@/components/media/MediaFrame";
import { EditorialLabel } from "@/components/lab/EditorialLabel";
import { ExperimentNumber } from "@/components/lab/ExperimentNumber";
import { InquiryBlock } from "@/components/lab/InquiryBlock";
import { ProductNote } from "@/components/lab/ProductNote";
import { HandDrawnArrow } from "@/components/lab/HandDrawnArrow";
import { Glyph } from "@/components/lab/Glyph";
import { cn } from "@/lib/utils";

/* ---------- shared entry chrome ---------- */

function EntryText({ cs }: { cs: CaseStudy }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <EditorialLabel className="text-(--accent-ink)">
          Experiment {cs.experiment.n} / {cs.experiment.kind}
        </EditorialLabel>
        {cs.status && (
          <span className="border border-ink/20 bg-paper px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-grey">
            {cs.status}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-h3 text-ink text-balance">
        <Link
          href={`/work/${cs.slug}/`}
          className="transition-colors hover:text-(--accent-ink)"
        >
          {cs.title}
        </Link>
      </h3>
      <p className="mt-4 text-grey">{cs.summary}</p>

      <div className="mt-6">
        <InquiryBlock
          inquiry={cs.inquiry}
          cta={
            <Link
              href={`/work/${cs.slug}/`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-(--accent-ink) transition-colors hover:text-ink"
            >
              Read the investigation <ArrowUpRight size={15} />
            </Link>
          }
        />
      </div>

      {cs.stack && (
        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
          {cs.stack.map((tech) => (
            <li
              key={tech}
              className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-grey"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- 01 · SimpliEd — production-system investigation ---------- */

function MiniFlow() {
  const steps = ["Local DB", "Outbox", "Sync", "REST API"];
  return (
    <ol
      aria-label="Offline-first write path"
      className="flex flex-wrap items-center gap-1.5"
    >
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-1.5">
          <span className="border border-ink/25 bg-paper px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink">
            {s}
          </span>
          {i < steps.length - 1 && (
            <HandDrawnArrow
              variant="right"
              className="h-3 w-5 text-(--accent-ink)"
            />
          )}
        </li>
      ))}
    </ol>
  );
}

function SimpliEdVisual({ cs }: { cs: CaseStudy }) {
  return (
    <div className="grid-paper relative border border-ink/15 bg-paper-soft p-5 md:p-6">
      <MiniFlow />
      <div className="mt-4 grid grid-cols-[1.15fr_0.85fr] items-end gap-4">
        <MediaFragment
          src={cs.cover.kind === "image" ? cs.cover.src : ""}
          alt={cs.cover.kind === "image" ? cs.cover.alt : ""}
          caption="Two live consumer apps + an offline-first Teacher app"
          rotate={-1}
          taped
          sizes="(max-width:768px) 60vw, 320px"
          aspect="aspect-square"
        />
        <div className="space-y-3 pb-2">
          <div>
            <span className="font-serif text-2xl leading-none text-ink">
              3.2s → 1.76s
            </span>
            <HandDrawnArrow
              variant="underline"
              className="mt-1 block h-2 w-20 text-(--accent)"
            />
            <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-grey">
              Initial load, profiled first
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["TestFlight", "Play Internal"].map((c) => (
              <span
                key={c}
                className="border border-ink/20 bg-paper px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-grey"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 02 · Budget Buddy — habit-design experiment ---------- */

function BudgetBuddyVisual({ cs }: { cs: CaseStudy }) {
  const features = ["Entry in seconds", "Category budgets", "Monthly totals"];
  return (
    <div className="relative pb-8">
      <MediaFrame
        media={cs.cover}
        className="aspect-[4/3]"
        sizes="(max-width:768px) 100vw, 50vw"
      />
      <div className="absolute -bottom-2 left-3 md:left-6">
        <ProductNote tone="yellow" rotate={-2} label="Current hypothesis · needs user testing">
          lower entry friction → the habit survives
        </ProductNote>
      </div>
      <ul className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
        {features.map((f, i) => (
          <li
            key={f}
            className={cn(
              "border border-ink/20 bg-green px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ink",
              i === 1 && "-rotate-1",
              i === 2 && "rotate-1",
            )}
          >
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- 03 · Stupid Alarm — behavioural prototype ---------- */

function SitUpSketch() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 180 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-20 w-40 text-ink/70"
    >
      {/* bed line */}
      <path d="M8 78h164" />
      {/* lying figure */}
      <circle cx="26" cy="68" r="7" />
      <path d="M33 70l38-2" />
      {/* rising arc */}
      <path d="M76 62C88 34 112 24 132 26" strokeDasharray="4 5" />
      <path d="M124 20l9 5-6 9" />
      {/* sitting figure */}
      <circle cx="142" cy="34" r="7" />
      <path d="M143 41l3 22 16 12" />
    </svg>
  );
}

function StupidAlarmVisual({ cs }: { cs: CaseStudy }) {
  void cs;
  return (
    <div className="relative flex flex-col items-center border border-ink/15 bg-paper-soft p-6 md:p-8">
      <span className="absolute top-4 left-4 -rotate-2 border border-orange-deep bg-paper px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-orange-deep">
        Prototype — not validated
      </span>
      <p
        aria-hidden
        className="mt-6 font-mono text-[clamp(3.6rem,9vw,6.5rem)] leading-none font-semibold tracking-tight text-orange"
      >
        06:30
      </p>
      <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-grey">
        Dismissal requires a real sign of waking
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <SitUpSketch />
        <div className="max-w-[13rem] space-y-1.5">
          <p className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-grey">
            <Glyph kind="unresolved" size={11} className="text-orange-deep" />
            false positives: phone on table
          </p>
          <p className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-grey">
            <Glyph kind="decision" size={11} className="text-orange-deep" />
            accessible fallback required
          </p>
          <p className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-grey">
            <Glyph kind="observation" size={11} className="text-orange-deep" />
            sensors stay on-device
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- section ---------- */

/**
 * Selected work — three experiments, three deliberately different
 * compositions: a structured production investigation (blue), a modular habit
 * experiment (green), and a bold behavioural prototype (orange).
 */
export function FeaturedWork() {
  const simplied = caseStudies.simplied;
  const budgetBuddy = caseStudies["budget-buddy"];
  const stupidAlarm = caseStudies["stupid-alarm"];

  return (
    <Section id="work" labelledBy="work-heading">
      <Container>
        <SectionHeader
          eyebrow={siteConfig.work.eyebrow}
          id="work-heading"
          title={siteConfig.work.heading}
          intro={siteConfig.work.intro}
        />

        <div className="mt-16 space-y-24 md:mt-20 md:space-y-32">
          {/* 01 — SimpliEd: structured, technical, grid-based */}
          <Reveal>
            <article style={accentVars[simplied.accent]} className="relative">
              <ExperimentNumber
                n={simplied.experiment.n}
                className="absolute -top-14 -left-2 md:-top-16"
              />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
                <EntryText cs={simplied} />
                <SimpliEdVisual cs={simplied} />
              </div>
            </article>
          </Reveal>

          {/* 02 — Budget Buddy: modular, friendlier, reversed */}
          <Reveal>
            <article
              style={accentVars[budgetBuddy.accent]}
              className="relative"
            >
              <ExperimentNumber
                n={budgetBuddy.experiment.n}
                className="absolute -top-14 right-0 md:-top-16"
              />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
                <div className="lg:order-2">
                  <EntryText cs={budgetBuddy} />
                </div>
                <div className="lg:order-1">
                  <BudgetBuddyVisual cs={budgetBuddy} />
                </div>
              </div>
            </article>
          </Reveal>

          {/* 03 — Stupid Alarm: bold, strange, slightly disruptive */}
          <Reveal>
            <article
              style={accentVars[stupidAlarm.accent]}
              className="relative"
            >
              <ExperimentNumber
                n={stupidAlarm.experiment.n}
                className="absolute -top-14 -left-2 md:-top-16"
              />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
                <EntryText cs={stupidAlarm} />
                <StupidAlarmVisual cs={stupidAlarm} />
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-ink/15 pt-8">
          <Link
            href="/work/"
            className="inline-flex items-center gap-1.5 font-medium text-orange-deep transition-colors hover:text-ink"
          >
            Open the full index <ArrowUpRight size={16} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
