"use client";

import Link from "next/link";
import { Braces, Check, CloudCog, Database, Puzzle, Radio, ShieldCheck, Zap, ChevronDown, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Capability = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  examples: string[];
};

const capabilities: Capability[] = [
  {
    id: "api",
    title: "API Development",
    description: "Modular REST APIs with validation, filtering, pagination, documentation and third-party integrations.",
    icon: Braces,
    examples: ["GET /api/users", "POST /api/auth", "PATCH /api/users/:id"],
  },
  {
    id: "auth",
    title: "Auth & RBAC",
    description: "Secure authentication, token management and permission-based access.",
    icon: ShieldCheck,
    examples: ["JWT access tokens", "Refresh-token rotation", "PermissionsGuard"],
  },
  {
    id: "database",
    title: "Database Design",
    description: "Reliable schemas, relationships, indexes and optimized database queries.",
    icon: Database,
    examples: ["Prisma transactions", "Compound indexes", "Relation modelling"],
  },
  {
    id: "caching",
    title: "Caching & Jobs",
    description: "Caching and asynchronous processing for faster, reliable applications.",
    icon: Zap,
    examples: ["Redis cache keys", 'queue.add("email")', '@Cron("0 * * * *")'],
  },
  {
    id: "realtime",
    title: "Real-time Systems",
    description: "Live communication, events, notifications and webhook workflows.",
    icon: Radio,
    examples: ['socket.emit("message")', "Webhook handlers", "Push notifications"],
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "External services connected through secure and maintainable APIs.",
    icon: Puzzle,
    examples: ["ZeptoMail", "Cloudflare Turnstile", "Pencil Spaces"],
  },
  {
    id: "production",
    title: "Production Delivery",
    description: "Deployment, process management, logging and production support.",
    icon: CloudCog,
    examples: ["Nginx reverse proxy", "PM2 process management", "Docker services"],
  },
];

const engineeringApproach = ["Modular architecture", "Performance by design", "Production ownership"];

export function Capabilities() {
  const [activeId, setActiveId] = useState("api");

  const reduceMotion = useReducedMotion();

  // Prevents automatic pointer-enter events caused by cards moving
  // during the layout animation.
  const hoverLocked = useRef(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (unlockTimer.current) {
        clearTimeout(unlockTimer.current);
      }
    };
  }, []);

  const activateCapability = useCallback(
    (id: string, force = false) => {
      if (id === activeId) {
        return;
      }

      if (hoverLocked.current && !force) {
        return;
      }

      hoverLocked.current = true;
      setActiveId(id);

      if (unlockTimer.current) {
        clearTimeout(unlockTimer.current);
      }

      unlockTimer.current = setTimeout(
        () => {
          hoverLocked.current = false;
        },
        reduceMotion ? 0 : 450,
      );
    },
    [activeId, reduceMotion],
  );

  const activeCapability = useMemo(() => capabilities.find((capability) => capability.id === activeId) ?? capabilities[0], [activeId]);

  const compactCapabilities = useMemo(() => capabilities.filter((capability) => capability.id !== activeId), [activeId]);

  const layoutTransition = reduceMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 350,
        damping: 32,
        mass: 0.75,
      };

  function resetFeaturedCard() {
    hoverLocked.current = true;
    setActiveId("api");

    if (unlockTimer.current) {
      clearTimeout(unlockTimer.current);
    }

    unlockTimer.current = setTimeout(
      () => {
        hoverLocked.current = false;
      },
      reduceMotion ? 0 : 450,
    );
  }

  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="relative scroll-mt-24 overflow-hidden bg-background py-12 sm:py-12 lg:py-14">
      {/* Background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* Top-left */}
        <div className="absolute -top-20 -left-16 size-72 rounded-full bg-primary/15 blur-[100px]" />

        {/* Bottom-right */}
        <div className="absolute -right-16 -bottom-24 size-80 rounded-full bg-primary/15 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="hidden items-start gap-6 lg:grid lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.8fr)] xl:grid-cols-[360px_minmax(0,1fr)] xl:gap-8">
          {/* Left introduction */}
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.12em] text-technical uppercase sm:text-sm">&lt; Backend Capabilities /&gt;</p>

            <h2 id="capabilities-heading" className="mt-2 font-heading text-4xl leading-none font-bold tracking-[-0.04em] text-foreground sm:text-5xl">
              What I Build
            </h2>

            <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
              End-to-end backend development from API design to production deployment, focused on reliability, security and scale.
            </p>

            <p className="mt-2 max-w-md text-base leading-6 text-muted-foreground">
              I work across the complete backend lifecycle—from designing data models and secure APIs to caching, background processing, integrations and
              production deployment.
            </p>

            {/* Engineering approach */}
            <div className="mt-6">
              <p className="font-mono text-xs font-semibold tracking-[0.12em] text-technical uppercase">Engineering approach</p>

              <ul className="mt-2 space-y-3">
                {engineeringApproach.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-technical-soft text-technical">
                      <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
                    </span>

                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* <Link
                            href="#projects"
                            className="
                group
                mt-6
                inline-flex
                min-h-11
                items-center
                gap-2
                text-sm
                font-semibold
                text-technical
                outline-none
                transition-colors
                hover:text-primary
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background
              "
                        >
                            See my projects

                            <ArrowRight
                                aria-hidden="true"
                                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link> */}

            <div aria-hidden="true" className="mt-10 flex max-w-lg items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-technical/80 to-transparent" />

              <span className="size-2 border border-technical bg-background" />
            </div>
          </div>

          {/* Right capability area */}
          <div
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") {
                resetFeaturedCard();
              }
            }}
            onBlur={(event) => {
              const nextTarget = event.relatedTarget as Node | null;

              if (!event.currentTarget.contains(nextTarget)) {
                resetFeaturedCard();
              }
            }}
            className="min-w-0"
          >
            {/* Permanent featured panel */}
            <article
              aria-live="polite"
              className="relative min-h-[17rem] overflow-hidden rounded-2xl border border-technical bg-surface p-5 shadow-xl shadow-technical/10 sm:p-6 xl:min-h-[13rem]"
            >
              {/* Featured background */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-technical/10 via-transparent to-technical/5" />

              <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-technical to-transparent" />

              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={activeCapability.id}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 12,
                          scale: 0.985,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.985 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.24,
                    ease: "easeOut",
                  }}
                  className="relative grid gap-7 xl:grid-cols-[minmax(0,1.2fr)_minmax(250px,0.8fr)] xl:items-center xl:gap-10"
                >
                  <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                    <CapabilityIcon icon={activeCapability.icon} large />

                    <div className="min-w-0 pt-1">
                      <p className="font-mono text-xs tracking-[0.12em] text-technical uppercase">Featured capability</p>

                      <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{activeCapability.title}</h3>

                      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">{activeCapability.description}</p>
                    </div>
                  </div>

                  {/* Featured examples */}
                  <div className="space-y-2">
                    {activeCapability.examples.map((example, index) => (
                      <motion.div
                        key={example}
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: 14,
                              }
                        }
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.2,
                          delay: reduceMotion ? 0 : index * 0.05,
                        }}
                        className="flex min-h-10 items-center gap-3 rounded-md border border-border bg-surface-soft px-3 font-mono text-xs"
                      >
                        <span className="size-1.5 shrink-0 rounded-full bg-technical" />

                        <span className="min-w-0 truncate text-muted-foreground">{example}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </article>

            {/* Six compact cards */}
            <motion.div layout className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence initial={false} mode="popLayout">
                {compactCapabilities.map((capability) => (
                  <motion.button
                    layout
                    key={capability.id}
                    type="button"
                    aria-label={`Show ${capability.title} details`}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") {
                        activateCapability(capability.id);
                      }
                    }}
                    onFocus={() => activateCapability(capability.id, true)}
                    onClick={() => activateCapability(capability.id, true)}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            scale: 0.96,
                          }
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: 0,
                            scale: 0.96,
                          }
                    }
                    transition={{
                      layout: layoutTransition,
                      opacity: {
                        duration: reduceMotion ? 0 : 0.18,
                      },
                      scale: {
                        duration: reduceMotion ? 0 : 0.18,
                      },
                    }}
                    // style={{
                    //     borderRadius: 14,
                    // }}
                    className="group relative flex min-h-[7.25rem] min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-surface p-3.5 text-left shadow-sm transition-colors duration-300 outline-none hover:border-technical/60 hover:bg-surface-soft focus-visible:border-technical focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div className="flex items-start gap-3">
                      <CapabilityIcon icon={capability.icon} />

                      <div className="min-w-0 pt-1">
                        <h3 className="font-heading text-base leading-5 font-semibold text-foreground">{capability.title}</h3>

                        <p className="mt-1.5 line-clamp-3 text-sm leading-5 text-muted-foreground">{capability.description}</p>
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-0 bg-technical transition-all duration-300 group-hover:w-full group-focus-visible:w-full"
                    />
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      <MobileCapabilities />
    </section>
  );
}

function MobileCapabilities() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-xl px-5 sm:px-8 lg:hidden">
      <header>
        <p className="font-mono text-xs font-semibold tracking-[0.12em] text-technical uppercase">&lt; Backend Capabilities /&gt;</p>

        <h2 className="mt-3 text-3xl leading-tight font-bold tracking-[-0.035em] text-foreground">What I Build</h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">Backend systems designed for security, performance and production reliability.</p>
      </header>

      {/* Flat capability list */}
      <div className="mt-7 border-y border-border">
        {capabilities.map((capability, index) => {
          const isOpen = openId === capability.id;
          const Icon = capability.icon;
          const contentId = `mobile-${capability.id}-content`;

          return (
            <article key={capability.id} className={index > 0 ? "border-t border-border" : ""}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => setOpenId(isOpen ? null : capability.id)}
                className="group flex w-full items-center gap-3 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-md border transition-colors duration-300 ${
                    isOpen ? "border-technical/50 bg-technical-soft text-technical" : "border-border bg-surface-soft text-muted-foreground"
                  } `}
                >
                  <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.8} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-foreground">{capability.title}</span>

                  {!isOpen && <span className="mt-0.5 block truncate text-xs text-muted-foreground">{capability.description}</span>}
                </span>

                <ChevronDown aria-hidden="true" className={`size-4 shrink-0 text-technical transition-transform duration-300 ${isOpen ? "rotate-180" : ""} `} />
              </button>

              <div
                id={contentId}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                } `}
              >
                <div className="overflow-hidden">
                  <div className="pb-4 pl-12">
                    <p className="text-sm leading-6 text-muted-foreground">{capability.description}</p>

                    <div className="mt-3 space-y-1.5">
                      {capability.examples.map((example) => (
                        <div
                          key={example}
                          className="flex items-center gap-2.5 border-l-2 border-technical/50 bg-surface-soft px-3 py-2 font-mono text-[0.7rem] text-muted-foreground"
                        >
                          <span className="size-1 shrink-0 bg-technical" />

                          <span className="min-w-0 truncate">{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function CapabilityIcon({ icon: Icon, large = false }: { icon: LucideIcon; large?: boolean }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-md border border-technical/30 bg-technical-soft text-technical transition-transform duration-300 group-hover:scale-105 ${large ? "size-12" : "size-9"} `}
    >
      <Icon aria-hidden="true" strokeWidth={1.8} className={large ? "size-6" : "size-4.5"} />
    </div>
  );
}
