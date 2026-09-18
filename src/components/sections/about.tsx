import { BriefcaseBusiness, FileText, Rocket, type LucideIcon } from "lucide-react";

import { client } from "@/sanity/lib/client";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import { ContentRefresh } from "@/components/providers/content-refresh";

type AboutStat = {
  _key: string;
  title: string;
  description: string;
  icon: string;
};

type AboutData = {
  _id: string;
  _rev: string;
  sectionLabel: string;
  headingFirstLine: string;
  headingSecondLine: string;
  desktopDescription: string;
  mobileDescription: string;
  statsLabel: string;
  stats: AboutStat[] | null;
  currentStatus: string;
};

const statIcons: Record<string, LucideIcon> = {
  briefcase: BriefcaseBusiness,
  file: FileText,
  rocket: Rocket,
};

export async function About() {
  const about = await client.fetch<AboutData | null>(ABOUT_QUERY, {}, {
    perspective: "published",
    useCdn: false,
    cache: "no-store",
  });

  if (!about) return <ContentRefresh section="about" initialRevision={null} />;

  return (
    <section id="about" aria-label={about.sectionLabel} className="relative isolate scroll-mt-24 overflow-hidden bg-background py-12 sm:py-14 lg:py-16">
      <ContentRefresh section="about" initialRevision={about._id + ":" + about._rev} />
      {/* Top-left primary glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-40 -z-10 size-80 rounded-full bg-primary/10 blur-[100px]" />

      {/* Bottom-right primary glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -bottom-48 -z-10 size-96 rounded-full bg-primary/10 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Desktop */}
        <div className="hidden items-start lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <DesktopAboutContent about={about} />

          <DesktopStats about={about} />
        </div>

        {/* Mobile and tablet */}
        <MobileAbout about={about} />
      </div>
    </section>
  );
}

function DesktopAboutContent({ about }: { about: AboutData }) {
  return (
    <div className="relative pr-14 xl:pr-20">
      <p className="section-label">&lt; {about.sectionLabel} /&gt;</p>

      <h2 id="about-heading-desktop" className="section-heading mt-3 max-w-xl">
        {about.headingFirstLine}
        <br />
        {about.headingSecondLine}
      </h2>

      <p className="section-description mt-5 max-w-xl">
        {about.desktopDescription}
      </p>

      <div aria-hidden="true" className="mt-6 flex max-w-lg items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-technical/80 to-transparent" />

        <span className="size-2 border border-technical bg-background" />
      </div>

      {/* <div aria-hidden="true" className="mt-8 flex max-w-lg items-end gap-5">
        <CircuitLine />

        <DotPattern />
      </div> */}
    </div>
  );
}

function DesktopStats({ about }: { about: AboutData }) {
  const aboutStats = about.stats ?? [];
  return (
    <div className="border-l border-border pl-14 xl:pl-20">
      <p className="section-label">{about.statsLabel}</p>

      <div className="mt-2">
        {aboutStats.map(({ _key, title, description, icon }, index) => (
          <div key={_key} className={`flex items-center gap-4 py-4 ${index !== aboutStats.length - 1 ? "border-b border-border" : ""} `}>
            <StatIcon icon={statIcons[icon] ?? FileText} />

            <div>
              <p className="text-2xl leading-none font-bold tracking-tight text-foreground">{title}</p>

              <p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <CurrentStatus text={about.currentStatus} className="mt-5" />
    </div>
  );
}


function MobileAbout({ about }: { about: AboutData }) {
  const aboutStats = about.stats ?? [];
  return (
    <div className="lg:hidden">
      <p className="section-label">&lt; {about.sectionLabel} /&gt;</p>

      <h2 id="about-heading-mobile" className="section-heading mt-3">
        {about.headingFirstLine}
        <br />
        {about.headingSecondLine}
      </h2>

      {/* Shorter mobile description */}
      <p className="section-description mt-4">{about.mobileDescription}</p>

      {/* Only the two most important mobile statistics */}
      <div className="mt-6 grid grid-cols-2 border-y border-border py-4">
        {aboutStats.slice(0, 2).map(({ _key, title, description, icon }, index) => (
          <div key={_key} className={`flex min-w-0 items-center gap-3 ${index === 0 ? "pr-3" : "border-l border-border pl-4"} `}>
            <StatIcon icon={statIcons[icon] ?? FileText} compact />

            <div className="min-w-0">
              <p className="text-xl leading-none font-bold text-foreground">{title}</p>

              <p className="mt-1 text-xs leading-4 text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <CurrentStatus text={about.currentStatus} className="mt-4" />
    </div>
  );
}

function CurrentStatus({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`flex items-start gap-2.5 ${className}`}>
      <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-primary shadow-sm" />

      <p className="font-mono text-xs leading-5 text-muted-foreground">{text}</p>
    </div>
  );
}

function StatIcon({ icon: Icon, compact = false }: { icon: LucideIcon; compact?: boolean }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-md border border-technical/25 bg-technical-soft text-technical ${compact ? "size-9" : "size-11"} `}
    >
      <Icon aria-hidden="true" strokeWidth={1.8} className={compact ? "size-4" : "size-5"} />
    </div>
  );
}

function DotPattern() {
  return (
    <div aria-hidden="true" className="grid grid-cols-6 gap-1.5">
      {Array.from({ length: 24 }).map((_, index) => (
        <span key={index} className="size-1 rounded-full bg-grid-dot" />
      ))}
    </div>
  );
}

function CircuitLine() {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 48" className="h-12 w-[220px] text-technical">
      <path d="M0 8H125L153 36H194" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.7" />

      <rect x="194" y="29" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.25" />

      <rect x="198" y="33" width="6" height="6" fill="currentColor" opacity="0.25" />
    </svg>
  );
}
