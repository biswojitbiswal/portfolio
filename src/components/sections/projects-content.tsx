"use client";

import { SanityImage } from "@/components/shared/sanity-image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export type Project = {
  _rev: string;
  id: string;
  title: string;
  category: string;
  role: string;
  description: string;
  image: string | null;
  imageAlt: string | null;
  href: string;
  technologies: string[];
};

export type ProjectsSection = {
  _id: string;
  _rev: string;
  desktopSectionLabel: string;
  mobileSectionLabel: string;
  heading: string;
  desktopDescription: string;
  mobileDescription: string;
  viewAllLabel: string;
  viewAllHref: string;
  caseStudyLabel: string;
};

type ProjectsContentProps = { section: ProjectsSection; projects: Project[] };

function projectDetailsHref(project: Project) {
  return `/projects?project=${encodeURIComponent(project.id)}#project-${encodeURIComponent(project.id)}`;
}

export function ProjectsContent({ section, projects }: ProjectsContentProps) {
  if (projects.length === 0) return null;
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative isolate scroll-mt-24 overflow-hidden bg-background py-12 sm:py-14 lg:py-16">
      <BackgroundGlows />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16">
        <DesktopProjects section={section} projects={projects} />
        <MobileProjects section={section} projects={projects} />
      </div>
    </section>
  );
}

function DesktopProjects({ section, projects }: ProjectsContentProps) {
  const featuredProject = projects[0];
  const remainingProjects = projects.slice(1);

  return (
    <div className="hidden items-start gap-4 lg:grid lg:grid-cols-[minmax(260px,0.75fr)_minmax(0,1.25fr)] xl:grid-cols-[290px_minmax(0,1.25fr)_minmax(280px,0.85fr)] xl:gap-5">
      {/* Introduction */}
      <div className="flex flex-col border-r border-border pr-5">
        <p className="section-label">&lt; {section.desktopSectionLabel} /&gt;</p>

        <h2 id="projects-heading" className="section-heading mt-3">
          {section.heading}
        </h2>

        <p className="section-description mt-4">{section.desktopDescription}</p>

        <Link
          href={section.viewAllHref}
          className="group mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-technical transition-colors outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
        >
          {section.viewAllLabel}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <div aria-hidden="true" className="mt-auto hidden items-center gap-3 pt-18 xl:flex">
          <div className="h-px flex-1 bg-gradient-to-r from-technical/80 to-transparent" />

          <span className="size-2 border border-technical bg-background" />
        </div>
      </div>

      {/* Featured project */}
      <article className="overflow-hidden rounded-lg border border-technical/50 bg-surface">
        <div className="relative h-44 overflow-hidden border-b border-border xl:h-48">
          <ProjectImage project={featuredProject} />

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/15" />

          {/* Category over image */}
          <div className="absolute top-3 left-3 z-10">
            <ProjectCategory>{featuredProject.category}</ProjectCategory>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">{featuredProject.title}</h3>

              <p className="mt-0.5 text-xs font-medium text-technical">{featuredProject.role}</p>
            </div>

            <Link
              href={projectDetailsHref(featuredProject)}
              aria-label={`View details for ${featuredProject.title}`}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-technical outline-none hover:bg-technical-soft focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ExternalLink aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {featuredProject.technologies.map((technology) => (
              <Technology key={technology}>{technology}</Technology>
            ))}
          </div>

          <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
            {featuredProject.description}
          </p>
        </div>
      </article>

      {/* Remaining projects */}
      <div className="grid grid-cols-3 gap-3 lg:col-span-2 xl:col-span-1 xl:grid-cols-1">
        {remainingProjects.map((project) => (
          <DesktopProjectRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function DesktopProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={projectDetailsHref(project)}
      className="group grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3 rounded-lg border border-border bg-surface p-3.75 transition-[border-color,transform,background-color] duration-300 outline-none hover:-translate-y-0.5 hover:border-technical/55 hover:bg-surface-soft focus-visible:ring-2 focus-visible:ring-ring xl:grid-cols-[5.5rem_minmax(0,1fr)_auto]"
    >
      <div className="relative h-20 overflow-hidden rounded-md border border-border xl:h-full xl:min-h-20">
        <ProjectImage project={project} />
      </div>

      <div className="min-w-0">
        <ProjectCategory>{project.category}</ProjectCategory>

        <div className="mt-1 flex items-center justify-between gap-2">
          <h3 className="truncate font-semibold text-foreground">{project.title}</h3>

          <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-technical transition-transform group-hover:translate-x-1 xl:hidden" />
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((technology) => (
            <Technology key={technology} compact>
              {technology}
            </Technology>
          ))}
        </div>
      </div>

      <ArrowRight aria-hidden="true" className="hidden size-4 shrink-0 text-technical transition-transform group-hover:translate-x-1 xl:block" />
    </Link>
  );
}

function MobileProjects({ section, projects }: ProjectsContentProps) {
  const reduceMotion = useReducedMotion();
  const [selectedIndex, setActiveIndex] = useState(0);
  const activeIndex = Math.min(selectedIndex, projects.length - 1);
  const [direction, setDirection] = useState(1);

  const activeProject = projects[activeIndex];

  function changeProject(nextDirection: number) {
    setDirection(nextDirection);

    setActiveIndex((currentIndex) => {
      return (Math.min(currentIndex, projects.length - 1) + nextDirection + projects.length) % projects.length;
    });
  }

  return (
    <div className="lg:hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-label">&lt; {section.mobileSectionLabel} /&gt;</p>

          <h2 id="projects-heading-mobile" className="section-heading mt-3">
            {section.heading}
          </h2>
        </div>

        <span className="shrink-0 pt-1 font-mono text-xs text-technical">
          {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <p className="section-description mt-3 max-w-lg">{section.mobileDescription}</p>

      <div className="relative mt-7 px-2">
        {/* Previous button */}
        <button
          type="button"
          onClick={() => changeProject(-1)}
          disabled={projects.length < 2}
          aria-label="Show previous project"
          className="absolute top-[5.75rem] -left-2 z-20 flex size-9 items-center justify-center rounded-md border border-technical/40 bg-background text-technical shadow-md transition-colors outline-none hover:bg-technical-soft focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={() => changeProject(1)}
          disabled={projects.length < 2}
          aria-label="Show next project"
          className="absolute top-[5.75rem] -right-2 z-20 flex size-9 items-center justify-center rounded-md border border-technical/40 bg-background text-technical shadow-md transition-colors outline-none hover:bg-technical-soft focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>

        <div className="overflow-hidden">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.article
              key={activeProject.id}
              custom={direction}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: direction > 0 ? 35 : -35,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      x: direction > 0 ? -35 : 35,
                    }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.25,
                ease: "easeOut",
              }}
              drag={reduceMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) {
                  changeProject(1);
                }

                if (info.offset.x > 50) {
                  changeProject(-1);
                }
              }}
              className="overflow-hidden rounded-lg border border-border bg-surface"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
                <ProjectImage project={activeProject} />
              </div>

              <div className="p-4">
                <ProjectCategory>{activeProject.category}</ProjectCategory>

                <div className="mt-2 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">{activeProject.title}</h3>
                  <Link
                    href={projectDetailsHref(activeProject)}
                    aria-label={`View details for ${activeProject.title}`}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-technical outline-none hover:bg-technical-soft focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ExternalLink aria-hidden="true" className="size-4" />
                  </Link>
                </div>

                <p className="mt-0.5 text-xs font-medium text-technical">{activeProject.role}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeProject.technologies.slice(0, 3).map((technology) => (
                    <Technology key={technology}>{technology}</Technology>
                  ))}

                  {activeProject.technologies.length > 3 && <Technology>+{activeProject.technologies.length - 3}</Technology>}
                </div>

                <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                  {activeProject.description}
                </p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="mt-5 flex items-center justify-between">
        <div aria-label={`Project ${activeIndex + 1} of ${projects.length}`} className="flex items-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              aria-label={`Show ${project.title}`}
              className={`h-1.5 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                index === activeIndex ? "w-8 bg-technical" : "w-2 bg-border hover:bg-technical/50"
              } `}
            />
          ))}
        </div>

        <Link href={section.viewAllHref} className="group inline-flex items-center gap-2 text-xs font-semibold text-technical">
          {section.viewAllLabel}
          <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function ProjectCategory({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-sm border border-technical/30 bg-technical-soft px-2 py-0.5 font-mono text-[0.6rem] font-semibold tracking-wide text-technical uppercase">
      {children}
    </span>
  );
}

function Technology({ children, compact = false }: { children: React.ReactNode; compact?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-sm border border-border bg-surface-soft font-mono text-technical ${
        compact ? "px-1.5 py-0.5 text-[0.55rem]" : "px-2 py-1 text-[0.65rem]"
      } `}
    >
      {children}
    </span>
  );
}

function BackgroundGlows() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute -top-20 -left-16 size-72 rounded-full bg-primary/12 blur-[100px]" />

      <div className="absolute -right-16 -bottom-24 size-80 rounded-full bg-primary/12 blur-[110px]" />
    </div>
  );
}

function ProjectImage({ project }: { project: Project }) {
  const [failedSource, setFailedSource] = useState<string>();

  if (!project.image || failedSource === project.image) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-technical-soft to-surface p-4 text-center">
        <span aria-hidden="true" className="font-mono text-2xl text-technical">&lt;/&gt;</span>
        <span className="text-xs font-medium text-muted-foreground">Preview coming soon</span>
      </div>
    );
  }

  return (
    <SanityImage
      src={project.image}
      alt={project.imageAlt ?? project.title + " project interface"}
      width={960}
      height={540}
      sizes="(max-width: 1024px) 100vw, 40vw"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      onError={() => setFailedSource(project.image ?? undefined)}
    />
  );
}
