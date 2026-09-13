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

const experiences: ExperienceItem[] = [
  {
    id: "kgn-infotech",
    company: "KGN INFOTECH LLP",
    shortName: "K",
    role: "Backend Developer",
    type: "Full-time",
    location: "India",
    period: "Jul 2024 — Present",
    current: true,
    description: "Building and maintaining production-ready backend services across EdTech, CMS and real-estate products.",
    achievements: [
      "Built modular NestJS and TypeScript APIs for production products.",
      "Designed MongoDB and PostgreSQL models using Prisma.",
      "Implemented Redis caching, BullMQ jobs, RBAC and WebSockets.",
      "Deployed services using Linux, Nginx and PM2.",
    ],
    technologies: ["NestJS", "TypeScript", "Prisma", "MongoDB", "PostgreSQL", "Redis"],
  },
  {
    id: "techflow-labs",
    company: "TECHFLOW LABS",
    shortName: "T",
    role: "Backend Developer Intern",
    type: "Internship",
    location: "Remote",
    period: "Jan 2024 — Jun 2024",
    description: "Worked with the development team to build secure APIs and improve application performance.",
    achievements: [
      "Developed REST APIs using Node.js, Express and TypeScript.",
      "Added JWT authentication and role-based authorization.",
      "Optimized database queries and API response times.",
      "Created API documentation and integration tests.",
    ],
    technologies: ["Node.js", "Express", "TypeScript", "MongoDB", "JWT", "Jest"],
  },
  {
    id: "independent-projects",
    company: "INDEPENDENT PROJECTS",
    shortName: "IP",
    role: "Freelance Full-stack Developer",
    type: "Freelance",
    location: "Remote",
    period: "Aug 2023 — Dec 2023",
    description: "Delivered small business applications from planning and development through deployment.",
    achievements: [
      "Created responsive products using React and Next.js.",
      "Integrated email, payment and third-party API services.",
      "Built reusable backend modules and database schemas.",
      "Configured domains and production environments.",
    ],
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "REST API", "Docker"],
  },
];

export function Experience() {
  const [activeId, setActiveId] = useState(experiences[0].id);

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
        <DesktopIntroduction />

        <DesktopTimeline activeId={activeId} setActiveId={setActiveId} />
      </div>

      {/* Separate mobile UI */}
      <MobileExperience />
    </section>
  );
}

function DesktopIntroduction() {
  return (
    // <div className="self-start lg:sticky lg:top-28">
    <div className="relative self-start">
      <p className="font-mono text-sm font-semibold tracking-[0.14em] text-technical uppercase">&lt; Professional Experience /&gt;</p>

      <h2 id="experience-heading" className="mt-4 max-w-md text-4xl leading-[1.05] font-bold tracking-[-0.04em] text-foreground xl:text-5xl">
        Backend in practice.
      </h2>

      <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
        Production experience across backend architecture, API development, databases, background jobs and deployment.
      </p>

      {/* Flat statistics */}
      <div className="mt-8 grid max-w-lg grid-cols-3 border-y border-border">
        <Stat value="1+" label="Year experience" />

        <Stat value="3" label="Product domains" bordered />

        <Stat value="Full" label="Delivery cycle" />
      </div>

      {/* No outer box */}
      <div className="mt-8 max-w-lg">
        <p className="font-mono text-xs font-semibold tracking-[0.12em] text-technical uppercase">Current focus</p>

        <ul className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <FocusItem label="API architecture" />
          <FocusItem label="Database design" />
          <FocusItem label="Caching and queues" />
          <FocusItem label="Production deployment" />
        </ul>
      </div>

      <div aria-hidden="true" className="mt-10 flex max-w-lg items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-technical/80 to-transparent" />

        <span className="size-2 border border-technical bg-background" />
      </div>
    </div>
  );
}

function DesktopTimeline({ activeId, setActiveId }: { activeId: string; setActiveId: (id: string) => void }) {
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

function MobileExperience() {
  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 lg:hidden">
      <p className="font-mono text-xs font-semibold tracking-[0.12em] text-technical uppercase">&lt; Experience /&gt;</p>

      <h2 id="experience-heading-mobile" className="mt-3 text-3xl leading-tight font-bold tracking-[-0.035em] text-foreground">
        Backend in practice.
      </h2>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">Building and supporting real products from API design to production deployment.</p>

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
