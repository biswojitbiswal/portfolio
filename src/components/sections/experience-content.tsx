"use client";

import { useState } from "react";
import { BriefcaseBusiness, CalendarDays, Check, ChevronDown, MapPin } from "lucide-react";

type ExperienceItem = {
  id: string;
  company: string;
  shortName: string;
  role: string;
  type: string;
  location: string;
  period: string;
  current?: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
};

export type ExperienceData = {
  _id: string;
  _rev: string;
  desktopSectionLabel: string;
  mobileSectionLabel: string;
  heading: string;
  desktopDescription: string;
  mobileDescription: string;
  stats: { _key: string; value: string; label: string }[];
  focusLabel: string;
  focusItems: { _key: string; label: string }[];
  experiences: ExperienceItem[];
};

export function ExperienceContent({ data }: { data: ExperienceData }) {
  const experiences = data.experiences;
  const [selectedId, setActiveId] = useState(experiences[0]?.id ?? "");
  const activeId = selectedId === "" || experiences.some((item) => item.id === selectedId)
    ? selectedId
    : experiences[0]?.id ?? "";

  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative overflow-hidden py-12 sm:py-12 lg:py-14">
      {/* Background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* Top-left */}
        <div className="absolute -top-20 -left-16 size-72 rounded-full bg-primary/15 blur-[100px]" />

        {/* Bottom-right */}
        <div className="absolute -right-16 -bottom-24 size-80 rounded-full bg-primary/15 blur-[110px]" />
      </div>

      {/* Desktop and tablet */}
      <div className="mx-auto hidden max-w-7xl items-start gap-14 px-8 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:px-12 xl:gap-20 xl:px-16">
        <DesktopIntroduction data={data} />

        <DesktopTimeline experiences={experiences} activeId={activeId} setActiveId={setActiveId} />
      </div>

      {/* Separate mobile UI */}
      <MobileExperience data={data} />
    </section>
  );
}

function DesktopIntroduction({ data }: { data: ExperienceData }) {
  return (
    // <div className="self-start lg:sticky lg:top-28">
    <div className="relative self-start">
      <p className="font-mono text-sm font-semibold tracking-[0.14em] text-technical uppercase">&lt; {data.desktopSectionLabel} /&gt;</p>

      <h2 id="experience-heading" className="mt-4 max-w-md text-4xl leading-[1.05] font-bold tracking-[-0.04em] text-foreground xl:text-5xl">
        {data.heading}
      </h2>

      <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">{data.desktopDescription}</p>

      {/* Flat statistics */}
      <div className="mt-8 grid max-w-lg grid-cols-3 border-y border-border">
        {data.stats.map((stat, index) => (
          <Stat key={stat._key} value={stat.value} label={stat.label} bordered={index % 3 === 1} />
        ))}
      </div>

      {/* No outer box */}
      <div className="mt-8 max-w-lg">
        <p className="font-mono text-xs font-semibold tracking-[0.12em] text-technical uppercase">{data.focusLabel}</p>

        <ul className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          {data.focusItems.map((item) => <FocusItem key={item._key} label={item.label} />)}
        </ul>
      </div>

      <div aria-hidden="true" className="mt-10 flex max-w-lg items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-technical/80 to-transparent" />

        <span className="size-2 border border-technical bg-background" />
      </div>
    </div>
  );
}

function DesktopTimeline({ experiences, activeId, setActiveId }: { experiences: ExperienceItem[]; activeId: string; setActiveId: (id: string) => void }) {
  return (
    <div className="relative self-start">
      {/* Timeline */}
      <div aria-hidden="true" className="absolute top-5 bottom-5 left-2 w-px bg-gradient-to-b from-technical/80 via-border to-transparent" />

      <div className="space-y-3">
        {experiences.map((experience, index) => {
          const isActive = activeId === experience.id;

          return (
            <DesktopExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              isActive={isActive}
              onToggle={() => setActiveId(isActive ? "" : experience.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

function DesktopExperienceCard({
  experience,
  index,
  isActive,
  onToggle,
}: {
  experience: ExperienceItem;
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const contentId = `experience-${experience.id}`;

  return (
    <article className="relative pl-8">
      {/* Timeline spot */}
      <div
        aria-hidden="true"
        className={`absolute top-[1.6rem] left-[0.15rem] z-10 flex size-3 items-center justify-center border bg-background transition-all duration-300 ${
          isActive ? "border-technical shadow-[0_0_0_4px_var(--technical-soft)]" : "border-border"
        } `}
      >
        <span className={`size-1 transition-colors ${isActive ? "bg-technical" : "bg-muted-foreground/50"}`} />
      </div>

      <span className="absolute top-[2.8rem] left-0 font-mono text-[0.6rem] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>

      <div
        className={`overflow-hidden rounded-lg border bg-card/60 transition-[border-color,box-shadow] duration-300 ${
          isActive ? "border-technical/60 shadow-lg shadow-technical/5" : "border-border hover:border-technical/35"
        } `}
      >
        <button
          type="button"
          aria-expanded={isActive}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex w-full items-center gap-4 p-4 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset"
        >
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-md border font-mono text-sm font-bold transition-colors ${
              isActive ? "border-technical/40 bg-technical-soft text-technical" : "border-border bg-surface-soft text-muted-foreground"
            } `}
          >
            {experience.shortName}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-card-foreground">{experience.company}</h3>

              {experience.current && (
                <span className="rounded-sm border border-technical/40 bg-technical-soft px-2 py-0.5 font-mono text-[0.6rem] font-semibold tracking-wide text-technical uppercase">
                  Current
                </span>
              )}
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
              <p className="text-sm font-medium text-technical">{experience.role}</p>

              <ExperienceMeta icon={CalendarDays} value={experience.period} />

              <ExperienceMeta icon={MapPin} value={experience.location} />
              <ExperienceMeta icon={BriefcaseBusiness} value={experience.type} />
            </div>
          </div>

          <ChevronDown aria-hidden="true" className={`size-4 shrink-0 text-technical transition-transform duration-300 ${isActive ? "rotate-180" : ""} `} />
        </button>

        <div
          id={contentId}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          } `}
        >
          <div className="overflow-hidden">
            <div className="border-t border-border px-4 pt-4 pb-4">
              <p className="text-sm leading-6 text-muted-foreground">{experience.description}</p>

              <ul className="mt-4 grid gap-x-6 gap-y-2.5 xl:grid-cols-2">
                {experience.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-2.5 text-sm leading-5 text-muted-foreground">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-technical" />

                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-3">
                {experience.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-sm border border-technical/25 bg-technical-soft px-2 py-1 font-mono text-[0.68rem] font-medium text-technical"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function MobileExperience({ data }: { data: ExperienceData }) {
  const experiences = data.experiences;
  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 lg:hidden">
      <p className="font-mono text-xs font-semibold tracking-[0.12em] text-technical uppercase">&lt; {data.mobileSectionLabel} /&gt;</p>

      <h2 id="experience-heading-mobile" className="mt-3 text-3xl leading-tight font-bold tracking-[-0.035em] text-foreground">
        {data.heading}
      </h2>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">{data.mobileDescription}</p>

      <div className="relative mt-9">
        <div aria-hidden="true" className="absolute top-2 bottom-2 left-[0.3rem] w-px bg-gradient-to-b from-technical via-border to-transparent" />

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <MobileExperienceItem key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileExperienceItem({ experience, index }: { experience: ExperienceItem; index: number }) {
  return (
    <article className="relative pl-7">
      <div aria-hidden="true" className="absolute top-1.5 left-0 flex size-2.5 items-center justify-center border border-technical bg-background">
        <span className="size-1 bg-technical" />
      </div>

      <div className="border-b border-border pb-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[0.6rem] text-technical">{String(index + 1).padStart(2, "0")}</p>

            <h3 className="mt-1 leading-5 font-bold text-foreground">{experience.company}</h3>

            <p className="mt-1 text-sm font-medium text-technical">{experience.role}</p>
          </div>

          {experience.current && (
            <span className="shrink-0 border border-technical/35 bg-technical-soft px-1.5 py-0.5 font-mono text-[0.55rem] text-technical uppercase">
              Current
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          <ExperienceMeta icon={CalendarDays} value={experience.period} />

          <ExperienceMeta icon={MapPin} value={experience.location} />
              <ExperienceMeta icon={BriefcaseBusiness} value={experience.type} />
        </div>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">{experience.description}</p>

        {/* Only the most important points on mobile */}
        <ul className="mt-3 space-y-2">
          {experience.achievements.slice(0, 2).map((achievement) => (
            <li key={achievement} className="flex gap-2 text-sm leading-5 text-muted-foreground">
              <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-technical" />

              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {experience.technologies.slice(0, 4).map((technology) => (
            <span key={technology} className="border border-border bg-surface-soft px-2 py-1 font-mono text-[0.65rem] text-muted-foreground">
              {technology}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ExperienceMeta({ icon: Icon, value }: { icon: typeof CalendarDays; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon aria-hidden="true" className="size-3.5" />
      {value}
    </span>
  );
}

function Stat({ value, label, bordered = false }: { value: string; label: string; bordered?: boolean }) {
  return (
    <div className={`py-4 ${bordered ? "border-x border-border px-5" : "px-1"}`}>
      <p className="text-xl font-bold text-foreground">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function FocusItem({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-2.5">
      <span aria-hidden="true" className="size-1.5 bg-technical" />

      {label}
    </li>
  );
}
