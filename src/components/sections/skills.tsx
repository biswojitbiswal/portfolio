"use client";

import type { ElementType, RefObject } from "react";
import {
  Braces,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Cpu,
  Database,
  Layers3,
  ListRestart,
  PanelsTopLeft,
  Server,
  ShieldCheck,
  Webhook,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  SiDocker,
  SiExpress,
  SiGit,
  SiJavascript,
  SiJsonwebtokens,
  SiLinux,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: ElementType;
  color: string;
};

type SkillCategory = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend Development",
    shortTitle: "Backend",
    description: "Scalable server-side applications and maintainable APIs.",
    icon: Server,
    skills: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        color: "#339933",
      },
      {
        name: "NestJS",
        icon: SiNestjs,
        color: "#e0234e",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "var(--foreground)",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "#3178c6",
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        color: "#f7df1e",
      },
    ],
  },
  {
    id: "databases",
    title: "Databases & Data",
    shortTitle: "Databases",
    description: "Reliable schemas, data modelling, queries and transactions.",
    icon: Database,
    skills: [
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        color: "#4169e1",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "#47a248",
      },
      {
        name: "Prisma",
        icon: SiPrisma,
        color: "var(--foreground)",
      },
    ],
  },
  {
    id: "caching",
    title: "Caching & Background Jobs",
    shortTitle: "Caching & Jobs",
    description: "Caching, queues and scheduled background processing.",
    icon: Layers3,
    skills: [
      {
        name: "Redis",
        icon: SiRedis,
        color: "#dc382d",
      },
      {
        name: "BullMQ",
        icon: ListRestart,
        color: "var(--technical)",
      },
      {
        name: "Cron Jobs",
        icon: Clock3,
        color: "var(--technical)",
      },
    ],
  },
  {
    id: "security",
    title: "APIs & Security",
    shortTitle: "APIs & Security",
    description: "Secure APIs, authentication, authorization and integrations.",
    icon: ShieldCheck,
    skills: [
      {
        name: "REST APIs",
        icon: Braces,
        color: "var(--technical)",
      },
      {
        name: "JWT",
        icon: SiJsonwebtokens,
        color: "#d63aff",
      },
      {
        name: "RBAC",
        icon: ShieldCheck,
        color: "var(--technical)",
      },
      {
        name: "WebSockets",
        icon: SiSocketdotio,
        color: "var(--foreground)",
      },
      {
        name: "Webhooks",
        icon: Webhook,
        color: "var(--technical)",
      },
      {
        name: "Swagger",
        icon: SiSwagger,
        color: "#85ea2d",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    shortTitle: "DevOps",
    description: "Production deployment, process management and development tools.",
    icon: Wrench,
    skills: [
      {
        name: "Linux",
        icon: SiLinux,
        color: "#fcc624",
      },
      {
        name: "Nginx",
        icon: SiNginx,
        color: "#009639",
      },
      {
        name: "PM2",
        icon: Cpu,
        color: "var(--technical)",
      },
      {
        name: "Docker",
        icon: SiDocker,
        color: "#2496ed",
      },
      {
        name: "Git",
        icon: SiGit,
        color: "#f05032",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    shortTitle: "Frontend",
    description: "Responsive interfaces for complete product delivery.",
    icon: PanelsTopLeft,
    skills: [
      {
        name: "React",
        icon: SiReact,
        color: "#61dafb",
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "var(--foreground)",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "#06b6d4",
      },
      {
        name: "Shadcn UI",
        icon: PanelsTopLeft,
        color: "var(--technical)",
      },
    ],
  },
];

export function Skills() {
  const [activeCategoryId, setActiveCategoryId] = useState("backend");

  const categoryScrollerRef = useRef<HTMLDivElement>(null);
  const skillScrollerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const activeCategory = useMemo(() => skillCategories.find((category) => category.id === activeCategoryId) ?? skillCategories[0], [activeCategoryId]);

  // useEffect(() => {
  //   const activeTab = categoryScrollerRef.current?.querySelector<HTMLElement>(`[data-category-id="${activeCategoryId}"]`);

  //   activeTab?.scrollIntoView({
  //     behavior: reduceMotion ? "auto" : "smooth",
  //     inline: "center",
  //     block: "nearest",
  //   });

  //   skillScrollerRef.current?.scrollTo({
  //     left: 0,
  //     behavior: reduceMotion ? "auto" : "smooth",
  //   });
  // }, [activeCategoryId, reduceMotion]);

  useEffect(() => {
    const container = categoryScrollerRef.current;

    const activeTab =
      container?.querySelector<HTMLElement>(
        `[data-category-id="${activeCategoryId}"]`,
      );

    if (container && activeTab) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      const targetLeft =
        container.scrollLeft +
        tabRect.left -
        containerRect.left -
        (container.clientWidth - tabRect.width) / 2;

      container.scrollTo({
        left: targetLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }

    skillScrollerRef.current?.scrollTo({
      left: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeCategoryId, reduceMotion]);


  return (
    <section id="skills" aria-label="Technical skills" className="relative isolate scroll-mt-24 overflow-hidden bg-background py-12 sm:py-14 lg:py-16">
      <SkillsBackground reduceMotion={Boolean(reduceMotion)} />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Section heading */}
        <div className="grid items-end gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.7fr)] lg:gap-12">
          <div>
            <p className="section-label">&lt; Technical Skills /&gt;</p>

            <h2 className="section-heading mt-3">Tools I use to build.</h2>
          </div>

          <p className="section-description max-w-xl lg:justify-self-end">A backend-first toolkit shaped by production work, from data design to deployment.</p>
        </div>

        {/* Horizontal category navigation */}
        <div className="mt-7 flex items-center gap-2">
          <ScrollButton direction="previous" label="Show previous skill categories" onClick={() => scrollByPage(categoryScrollerRef, -1, 0.7)} />

          <div
            ref={categoryScrollerRef}
            role="tablist"
            aria-label="Skill categories"
            className="flex min-w-0 flex-1 snap-x snap-mandatory [scrollbar-width:none] gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          >
            {skillCategories.map((category) => {
              const CategoryIcon = category.icon;
              const isActive = category.id === activeCategoryId;

              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  data-category-id={category.id}
                  aria-selected={isActive}
                  aria-controls="active-skill-panel"
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`flex min-h-10 shrink-0 snap-start items-center gap-2 rounded-md border px-3.5 text-xs font-medium transition-[border-color,background-color,color] duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-11 sm:px-4 sm:text-sm ${isActive
                      ? "border-technical bg-primary text-primary-foreground"
                      : "border-border bg-surface/75 text-muted-foreground hover:border-technical/40 hover:text-foreground"
                    }`}
                >
                  <CategoryIcon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.8} />

                  {category.shortTitle}
                </button>
              );
            })}
          </div>

          <ScrollButton direction="next" label="Show more skill categories" onClick={() => scrollByPage(categoryScrollerRef, 1, 0.7)} />
        </div>

        {/* Active category */}
        <div
          id="active-skill-panel"
          role="tabpanel"
          className="group/panel relative mt-4 overflow-hidden rounded-lg border border-technical/35 bg-surface/75 p-4 transition-[border-color,box-shadow] duration-300 hover:border-technical/60 hover:shadow-lg hover:shadow-technical/5 sm:p-5 lg:p-6"
        >
          <PanelCircuit />

          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={
                reduceMotion
                  ? false
                  : {
                    opacity: 0,
                    y: 10,
                  }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                    opacity: 0,
                    y: -8,
                  }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.22,
                ease: "easeOut",
              }}
              className="relative z-10"
            >
              <CategoryHeader category={activeCategory} />

              {/* Four visible skills with horizontal scrolling */}
              <div className="mt-6 flex items-center gap-2 sm:gap-3">
                <ScrollButton
                  direction="previous"
                  label={`Show previous ${activeCategory.shortTitle} skills`}
                  onClick={() => scrollByPage(skillScrollerRef, -1, 1)}
                />

                <div
                  ref={skillScrollerRef}
                  className="grid min-w-0 flex-1 snap-x snap-mandatory [scrollbar-width:none] grid-flow-col gap-2 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
                  style={{
                    gridAutoColumns: "calc((100% - 1.5rem) / 4)",
                  }}
                >
                  {activeCategory.skills.map((skill, index) => (
                    <SkillItem key={skill.name} skill={skill} index={index} reduceMotion={Boolean(reduceMotion)} />
                  ))}
                </div>

                <ScrollButton direction="next" label={`Show more ${activeCategory.shortTitle} skills`} onClick={() => scrollByPage(skillScrollerRef, 1, 1)} />
              </div>

              {/* Bottom carousel indicator */}
              <div aria-hidden="true" className="mt-5 flex items-center gap-2">
                <span className="h-1 w-8 bg-technical" />
                <span className="h-1 w-4 bg-technical/50" />
                <span className="h-px flex-1 bg-gradient-to-r from-technical/40 to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function SkillsBackground({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute -top-24 -left-20 size-72 rounded-full bg-primary/12 blur-[100px]" />
      <div className="absolute -right-20 -bottom-28 size-80 rounded-full bg-primary/12 blur-[110px]" />

      <svg viewBox="0 0 1400 600" preserveAspectRatio="none" className="absolute inset-0 hidden size-full text-technical opacity-[0.1] lg:block">
        <path d="M600 40L760 180V310L880 430H1080" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="7 9" />

        <path d="M760 180H980L1100 300H1320" fill="none" stroke="currentColor" strokeWidth="1" />

        <path d="M520 520H700L810 410" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 8" />

        <motion.circle
          cx="760"
          cy="180"
          fill="currentColor"
          animate={
            reduceMotion
              ? undefined
              : {
                r: [2, 5, 2],
                opacity: [0.3, 1, 0.3],
              }
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.circle
          cx="880"
          cy="430"
          fill="currentColor"
          animate={
            reduceMotion
              ? undefined
              : {
                r: [3, 6, 3],
                opacity: [0.25, 0.9, 0.25],
              }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </svg>
    </div>
  );
}

function PanelCircuit() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 340"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 size-full text-technical opacity-[0.12]"
    >
      <path d="M320 0L410 90V160L500 250H600" fill="none" stroke="currentColor" strokeWidth="1" />

      <path d="M410 90H510L560 140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 7" />

      <path d="M250 340L340 250V190" fill="none" stroke="currentColor" strokeWidth="1" />

      <circle cx="410" cy="90" r="3" fill="currentColor" className="motion-safe:animate-pulse" />

      <circle cx="500" cy="250" r="3" fill="currentColor" className="motion-safe:animate-pulse" />
    </svg>
  );
}

function CategoryHeader({ category }: { category: SkillCategory }) {
  const CategoryIcon = category.icon;

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-technical/30 bg-technical-soft text-technical sm:size-12">
          <CategoryIcon aria-hidden="true" className="size-5 sm:size-6" strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[0.6rem] font-semibold tracking-[0.12em] text-technical uppercase sm:text-xs">{category.shortTitle}</p>

          <h3 className="mt-1 text-lg font-bold tracking-tight text-foreground sm:text-2xl">{category.title}</h3>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">{category.description}</p>
        </div>
      </div>

      <span className="hidden shrink-0 items-center gap-2 rounded-sm border border-technical/30 bg-technical-soft px-2.5 py-1 font-mono text-[0.65rem] text-technical sm:inline-flex">
        <span className="size-1.5 rounded-full bg-technical" />
        {category.skills.length} tools
      </span>
    </div>
  );
}

function SkillItem({ skill, index, reduceMotion }: { skill: Skill; index: number; reduceMotion: boolean }) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
            opacity: 0,
            scale: 0.94,
          }
      }
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.2,
        delay: reduceMotion ? 0 : index * 0.04,
      }}
      className="flex min-w-0 snap-start flex-col items-center justify-center gap-2 border-b border-border px-1 py-3 text-center transition-colors group-hover/panel:border-technical/40 sm:min-h-28 sm:py-4"
    >
      <div className="flex size-10 items-center justify-center rounded-md border border-border bg-surface-soft transition-[border-color,background-color,transform] duration-300 group-hover/panel:border-technical/40 group-hover/panel:bg-technical-soft sm:size-12">
        <Icon
          aria-hidden="true"
          className="size-6 transition-[filter,opacity,transform] duration-500 sm:size-7 lg:opacity-70 lg:grayscale lg:group-hover/panel:-translate-y-0.5 lg:group-hover/panel:opacity-100 lg:group-hover/panel:grayscale-0"
          style={{
            color: skill.color,
          }}
        />
      </div>

      <span className="w-full truncate text-[0.6rem] font-medium text-muted-foreground transition-colors group-hover/panel:text-foreground sm:text-xs">
        {skill.name}
      </span>
    </motion.div>
  );
}

function ScrollButton({ direction, label, onClick }: { direction: "previous" | "next"; label: string; onClick: () => void }) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-[border-color,color,background-color] outline-none hover:border-technical/50 hover:bg-technical-soft hover:text-technical focus-visible:ring-2 focus-visible:ring-ring sm:size-10"
    >
      <Icon aria-hidden="true" className="size-4.5" />
    </button>
  );
}

function scrollByPage(ref: RefObject<HTMLDivElement | null>, direction: -1 | 1, pageSize: number) {
  const container = ref.current;

  if (!container) {
    return;
  }

  container.scrollBy({
    left: container.clientWidth * pageSize * direction,
    behavior: "smooth",
  });
}
