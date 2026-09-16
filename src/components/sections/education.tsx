import { Fragment } from "react";
import { client } from "@/sanity/lib/client";
import { EDUCATION_QUERY } from "@/sanity/lib/queries";
import { ContentRefresh } from "@/components/providers/content-refresh";
import { BookOpen, CalendarDays, GraduationCap, MapPin, School, type LucideIcon } from "lucide-react";

type EducationItem = {
  id: string;
  qualification: string;
  institution: string;
  period: string;
  location: string;
  category: string;
  focus: string;
  icon: string;
};

type EducationData = {
  _id: string;
  _rev: string;
  sectionLabel: string;
  heading: string;
  desktopDescription: string;
  mobileDescription: string;
  learningSteps: { _key: string; label: string }[];
  educationItems: EducationItem[];
};

const educationIcons: Record<string, LucideIcon> = {
  graduationCap: GraduationCap,
  bookOpen: BookOpen,
  school: School,
};

export async function Education() {
  const data = await client.fetch<EducationData | null>(EDUCATION_QUERY, {}, {
    perspective: "published",
    useCdn: false,
    cache: "no-store",
  });

  if (!data) return <ContentRefresh section="education" initialRevision={null} />;

  return (
    <section id="education" aria-labelledby="education-heading" className="relative isolate scroll-mt-24 overflow-hidden bg-background py-12 sm:py-14 lg:py-16">
      <ContentRefresh section="education" initialRevision={data._id + ":" + data._rev} />
      <EducationBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16">
        <DesktopEducation data={data} />
        <MobileEducation data={data} />
      </div>
    </section>
  );
}

function DesktopEducation({ data }: { data: EducationData }) {
  return (
    <div className="hidden items-start gap-14 lg:grid lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,1.25fr)] xl:gap-20">
      {/* Introduction */}
      <div className="relative self-start">
        <p className="section-label">&lt; {data.sectionLabel} /&gt;</p>

        <h2 id="education-heading" className="section-heading mt-3 max-w-md">
          {data.heading}
        </h2>

        <p className="section-description mt-4 max-w-md">
          {data.desktopDescription}
        </p>

        {data.learningSteps.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
            {data.learningSteps.map((step, index) => (
              <Fragment key={step._key}>
                {index > 0 && <span aria-hidden="true" className="h-px w-8 bg-technical/60" />}
                <span>{step.label}</span>
              </Fragment>
            ))}
          </div>
        )}

        <DesktopIntroDecoration />
      </div>

      {/* Education timeline */}
      <div className="relative self-start">
        <div aria-hidden="true" className="absolute top-5 bottom-5 left-2 w-px bg-gradient-to-b from-technical via-border to-transparent" />

        <div className="space-y-3">
          {data.educationItems.map((item, index) => (
            <DesktopEducationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopEducationCard({ item, index }: { item: EducationItem; index: number }) {
  const Icon = educationIcons[item.icon] ?? GraduationCap;

  return (
    <article className="group relative pl-9">
      {/* Timeline marker */}
      <div
        aria-hidden="true"
        className={`absolute top-6 left-[0.15rem] z-10 flex size-3 items-center justify-center border bg-background transition-all duration-300 ${
          index === 0 ? "border-technical shadow-[0_0_0_4px_var(--technical-soft)]" : "border-border group-hover:border-technical"
        }`}
      >
        <span className={`size-1 ${index === 0 ? "bg-technical" : "bg-muted-foreground/50 group-hover:bg-technical"}`} />
      </div>

      <span className="absolute top-11 left-0 font-mono text-[0.6rem] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>

      {/* Minimal education card */}
      <div
        className={`grid items-center gap-4 rounded-lg border bg-surface/75 p-4 transition-[border-color,transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-surface-soft sm:grid-cols-[auto_minmax(0,1fr)_auto] ${
          index === 0 ? "border-technical/55" : "border-border hover:border-technical/40"
        }`}
      >
        <div className="flex size-11 items-center justify-center rounded-md border border-technical/25 bg-technical-soft text-technical">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-foreground">{item.qualification}</h3>

            <span className="rounded-sm border border-border bg-surface-soft px-2 py-0.5 font-mono text-[0.6rem] tracking-wide text-muted-foreground uppercase">
              {item.category}
            </span>
          </div>

          <p className="mt-1 text-sm font-medium text-technical">{item.institution}</p>

          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{item.focus}</p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 text-xs text-muted-foreground sm:items-end">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden="true" className="size-3.5" />

            {item.period}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-3.5" />

            {item.location}
          </span>
        </div>
      </div>
    </article>
  );
}

function MobileEducation({ data }: { data: EducationData }) {
  return (
    <div className="lg:hidden">
      <p className="section-label">&lt; {data.sectionLabel} /&gt;</p>

      <h2 id="education-heading-mobile" className="section-heading mt-3">
        {data.heading}
      </h2>

      <p className="section-description mt-3">{data.mobileDescription}</p>

      {/* Compact mobile timeline */}
      <div className="relative mt-7">
        <div aria-hidden="true" className="absolute top-2 bottom-2 left-[0.3rem] w-px bg-gradient-to-b from-technical via-border to-transparent" />

        <div className="space-y-6">
          {data.educationItems.map((item, index) => (
            <MobileEducationItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileEducationItem({ item, index }: { item: EducationItem; index: number }) {
  const Icon = educationIcons[item.icon] ?? GraduationCap;

  return (
    <article className="relative pl-7">
      <span
        aria-hidden="true"
        className={`absolute top-1.5 left-0 flex size-2.5 items-center justify-center border bg-background ${
          index === 0 ? "border-technical" : "border-border"
        }`}
      >
        <span className={`size-1 ${index === 0 ? "bg-technical" : "bg-muted-foreground/50"}`} />
      </span>

      <div className="border-b border-border pb-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-technical/25 bg-technical-soft text-technical">
            <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-mono text-[0.6rem] tracking-wide text-technical uppercase">{item.category}</p>

            <h3 className="mt-1 text-sm leading-5 font-semibold text-foreground">{item.qualification}</h3>

            <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays aria-hidden="true" className="size-3.5 text-technical" />

              {item.period}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function EducationBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Primary glows */}
      <div className="absolute -top-24 -left-20 size-72 rounded-full bg-primary/12 blur-[100px]" />
      <div className="absolute -right-20 -bottom-28 size-80 rounded-full bg-primary/12 blur-[110px]" />

      {/* Animated background circuit */}
      <svg viewBox="0 0 1200 500" preserveAspectRatio="none" className="absolute inset-0 hidden size-full text-technical opacity-[0.12] lg:block">
        <path d="M80 100H300L360 160H470" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" className="motion-safe:animate-pulse" />

        <path d="M750 360H930L1000 290H1140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="7 9" className="motion-safe:animate-pulse" />

        <path d="M280 390V300L340 240" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />

        <rect x="466" y="156" width="9" height="9" fill="none" stroke="currentColor" />

        <rect x="1135" y="285" width="9" height="9" fill="none" stroke="currentColor" />

        <circle cx="80" cy="100" r="3" fill="currentColor" />
        <circle cx="750" cy="360" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}

function DesktopIntroDecoration() {
  return (
    <div aria-hidden="true" className="mt-10 flex max-w-md items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-technical/80 to-transparent" />

      <span className="relative size-3 border border-technical">
        <span className="absolute top-1/2 left-1/2 size-1 -translate-x-1/2 -translate-y-1/2 bg-technical" />
      </span>
    </div>
  );
}
