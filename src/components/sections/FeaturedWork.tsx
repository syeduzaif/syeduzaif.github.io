import Link from "next/link";
import {
  Accessibility,
  AlarmClock,
  ArrowUpRight,
  Lock,
  TriangleAlert,
} from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { siteConfig } from "@/data/siteConfig";
import { accentVars } from "@/lib/accents";
import type { CaseStudy } from "@/data/caseStudies";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { AppTrio } from "@/components/lab/AppTrio";

/* ---------- shared entry chrome ---------- */

/** Rule + running head that opens every experiment. */
function ExperimentBar({ cs }: { cs: CaseStudy }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t-2 border-ink pt-3">
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
  );
}

/**
 * Observation → question → response as a plain spec table. The previous
 * hover-to-expand treatment is gone: all three beats are visible, which is
 * both what the design calls for and one less hover-only affordance.
 */
function InquiryTable({ cs }: { cs: CaseStudy }) {
  const rows = [
    ["Observation", cs.inquiry.observation],
    ["Question", cs.inquiry.question],
    ["Response", cs.inquiry.response],
  ] as const;

  return (
    <dl className="mt-7 border-t border-rule">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-rule py-3.5"
        >
          <dt className="pt-0.5 font-mono text-[0.6rem] font-medium tracking-[0.14em] text-grey uppercase">
            {label}
          </dt>
          <dd className="text-[0.95rem] leading-snug text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function EntryText({ cs }: { cs: CaseStudy }) {
  return (
    <div>
      <p
        aria-hidden
        className="font-display text-[5rem] leading-[0.8] font-bold [font-stretch:88%] text-(--accent)"
      >
        {cs.experiment.n}
      </p>
      <h3 className="mt-5 text-h3 [font-stretch:92%] text-ink text-balance">
        <Link
          href={`/work/${cs.slug}/`}
          className="transition-colors hover:text-(--accent-ink)"
        >
          {cs.title}
        </Link>
      </h3>
      <p className="mt-4 max-w-[52ch] text-grey">{cs.summary}</p>

      <InquiryTable cs={cs} />

      <Link
        href={`/work/${cs.slug}/`}
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
  );
}

/* ---------- 01 · SimpliEd — production-system investigation ---------- */

function MiniFlow() {
  const steps = ["Local DB", "Outbox", "Sync", "REST API"];
  return (
    <ol
      aria-label="Offline-first write path"
      className="flex flex-wrap items-center gap-2"
    >
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span
            className={
              i === 0
                ? "bg-blue px-3 py-2 font-mono text-[0.6rem] tracking-[0.12em] text-white uppercase"
                : "border border-ink/20 bg-paper px-3 py-2 font-mono text-[0.6rem] tracking-[0.12em] text-ink uppercase"
            }
          >
            {s}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden className="text-grey">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function SimpliEdVisual({ cs }: { cs: CaseStudy }) {
  return (
    <div className="bg-paper-soft p-5 md:p-7">
      <MiniFlow />
      {cs.posterApps && <AppTrio apps={cs.posterApps} className="mt-6" />}
      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-ink/15 pt-4">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-[1.6rem] leading-none font-semibold tracking-tight text-ink">
            3.2s → 1.76s
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.12em] text-grey uppercase">
            Initial load, profiled first
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["TestFlight", "Play Internal"].map((c) => (
            <span
              key={c}
              className="rounded-full border border-ink/25 px-3 py-1 font-mono text-[0.58rem] tracking-[0.1em] text-grey uppercase"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 02 · Budget Buddy — habit-design experiment ---------- */

function BudgetBuddyVisual({ cs }: { cs: CaseStudy }) {
  const features = ["Entry in seconds", "Category budgets", "Monthly totals"];
  return (
    <div className="bg-[#DCE8DD] p-5 md:p-7">
      <MediaFrame
        media={cs.cover}
        className="aspect-[4/3]"
        sizes="(max-width:1024px) 100vw, 46vw"
      />
      <div className="mt-5 bg-night p-4">
        <p className="font-display text-[1.05rem] leading-snug text-on-night">
          lower entry friction → the habit survives
        </p>
        <p className="mt-2.5 font-mono text-[0.6rem] font-medium tracking-[0.14em] text-yellow uppercase">
          Current hypothesis · needs user testing
        </p>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-1.5 rounded-full border border-green-deep/40 bg-paper px-3 py-1 font-mono text-[0.58rem] tracking-[0.1em] text-green-deep uppercase"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-green" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- 03 · Stupid Alarm — behavioural prototype ---------- */

function StupidAlarmVisual({ cs }: { cs: CaseStudy }) {
  void cs;
  const constraints = [
    { Icon: TriangleAlert, text: "False positives: phone on table" },
    { Icon: Accessibility, text: "Accessible fallback required" },
    { Icon: Lock, text: "Sensors stay on-device" },
  ];

  return (
    <div className="bg-night p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="border border-orange px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.14em] text-orange uppercase">
          Prototype — not validated
        </span>
        <AlarmClock aria-hidden size={18} className="text-on-night-2" />
      </div>

      <p
        aria-hidden
        className="mt-10 font-display text-[clamp(4rem,10vw,7rem)] leading-[0.82] font-semibold tracking-tight [font-stretch:92%] text-on-night"
      >
        06:30
      </p>
      <p className="mt-5 inline-block bg-yellow px-3 py-1.5 font-mono text-[0.6rem] font-medium tracking-[0.12em] text-ink uppercase">
        Dismissal requires a real sign of waking
      </p>

      <ul className="mt-10 border-t border-[#F1F1EC26]">
        {constraints.map(({ Icon, text }) => (
          <li
            key={text}
            className="flex items-center gap-3 border-b border-[#F1F1EC26] py-3 font-mono text-[0.6rem] tracking-[0.12em] text-on-night-2 uppercase"
          >
            <Icon aria-hidden size={13} />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- section ---------- */

/**
 * Selected work — three experiments laid out as technical reports. Each gets
 * its own accent (SimpliEd blue, Budget Buddy green, Stupid Alarm orange) and
 * a bespoke visual; entry 02 reverses the column order.
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

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
          {/* 01 — SimpliEd */}
          <Reveal>
            <article style={accentVars[simplied.accent]}>
              <ExperimentBar cs={simplied} />
              <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
                <EntryText cs={simplied} />
                <SimpliEdVisual cs={simplied} />
              </div>
            </article>
          </Reveal>

          {/* 02 — Budget Buddy, reversed */}
          <Reveal>
            <article style={accentVars[budgetBuddy.accent]}>
              <ExperimentBar cs={budgetBuddy} />
              <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
                <div className="lg:order-2">
                  <EntryText cs={budgetBuddy} />
                </div>
                <div className="lg:order-1">
                  <BudgetBuddyVisual cs={budgetBuddy} />
                </div>
              </div>
            </article>
          </Reveal>

          {/* 03 — Stupid Alarm */}
          <Reveal>
            <article style={accentVars[stupidAlarm.accent]}>
              <ExperimentBar cs={stupidAlarm} />
              <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
                <EntryText cs={stupidAlarm} />
                <StupidAlarmVisual cs={stupidAlarm} />
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mt-16 flex justify-end border-t-2 border-ink pt-6">
          <Link
            href="/work/"
            className="inline-flex items-center gap-2 font-display text-[1.6rem] font-semibold tracking-tight text-ink transition-colors hover:text-orange-deep"
          >
            Open the full index <ArrowUpRight size={22} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
