import {
  BriefcaseBusiness,
  FileText,
  Rocket,
  type LucideIcon,
} from "lucide-react";

type AboutStat = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const aboutStats: AboutStat[] = [
  {
    title: "1+",
    description: "Year of professional experience",
    icon: BriefcaseBusiness,
  },
  {
    title: "4",
    description: "Major production projects",
    icon: FileText,
  },
  {
    title: "Full-cycle",
    description: "Build, deploy and support",
    icon: Rocket,
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 overflow-hidden bg-background py-20 sm:py-24 lg:py-18"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-12rem]
          top-1/2
          -z-10
          size-[26rem]
          -translate-y-1/2
          rounded-full
          bg-technical/5
          blur-[110px]
        "
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-0">
          {/* Left content */}
          <div className="relative lg:pr-16 xl:pr-20">
            <p className="mb-4 font-mono text-sm font-semibold uppercase tracking-[0.1em] text-technical">
              &lt; About Me /&gt;
            </p>

            <h2
              id="about-heading"
              className="
                max-w-xl
                font-heading
                text-[clamp(2.25rem,6vw,3.65rem)]
                font-bold
                leading-[1.02]
                tracking-[-0.045em]
                text-foreground
              "
            >
              Backend-focused.
              <br />
              Product-minded.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              I&apos;m a Backend Developer at KGN INFOTECH LLP, building
              production-ready APIs and systems with NestJS, TypeScript,
              PostgreSQL, MongoDB, Prisma and Redis. I also work with React and
              Next.js when a product needs end-to-end delivery.
            </p>

            {/* Desktop decoration */}
            <div className="mt-12 hidden items-end gap-7 lg:flex">
              <CircuitLine />
              <DotPattern />
            </div>
          </div>

          {/* Right content */}
          <div className="lg:border-l lg:border-border lg:pl-16 xl:pl-20">
            <p className="mb-4 font-mono text-sm font-semibold uppercase tracking-[0.1em] text-technical">
              At a glance
            </p>

            {/* Desktop stats */}
            <div className="hidden lg:block">
              {aboutStats.map(({ title, description, icon: Icon }, index) => (
                <div
                  key={title}
                  className={`
                    flex items-center gap-7 py-6
                    ${index === 0 ? "pt-2" : ""}
                    ${
                      index !== aboutStats.length - 1
                        ? "border-b border-border"
                        : ""
                    }
                  `}
                >
                  <StatIcon icon={Icon} />

                  <div>
                    <p className="text-3xl font-bold leading-none tracking-tight text-foreground">
                      {title}
                    </p>

                    <p className="mt-1 max-w-[13rem] text-base leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile/tablet stats */}
            <div className="grid grid-cols-2 gap-3 lg:hidden">
              {aboutStats.map(({ title, description, icon: Icon }, index) => (
                <article
                  key={title}
                  className={`
                    rounded-xl
                    border
                    border-border
                    bg-surface
                    p-4
                    shadow-sm
                    ${
                      index === aboutStats.length - 1
                        ? "col-span-2"
                        : ""
                    }
                  `}
                >
                  {index === aboutStats.length - 1 ? (
                    <div className="flex items-center gap-4">
                      <StatIcon icon={Icon} compact />

                      <div>
                        <p className="text-xl font-bold leading-none tracking-tight text-foreground">
                          {title}
                        </p>

                        <p className="mt-1 text-sm leading-5 text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <StatIcon icon={Icon} compact />

                      <p className="mt-4 text-2xl font-bold leading-none tracking-tight text-foreground">
                        {title}
                      </p>

                      <p className="mt-1 text-sm leading-5 text-muted-foreground">
                        {description}
                      </p>
                    </>
                  )}
                </article>
              ))}
            </div>

            {/* Current status */}
            <div className="mt-7 flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary shadow-sm"
              />

              <p className="font-mono text-xs leading-5 text-muted-foreground sm:text-sm">
                Currently building production systems
                <br className="hidden sm:block" /> at KGN INFOTECH LLP
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatIcon({
  icon: Icon,
  compact = false,
}: {
  icon: LucideIcon;
  compact?: boolean;
}) {
  return (
    <div
      className={`
        flex
        shrink-0
        items-center
        justify-center
        rounded-xl
        border
        border-technical/25
        bg-technical-soft
        text-technical
        ${compact ? "size-10" : "size-16"}
      `}
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1.8}
        className={compact ? "size-5" : "size-7"}
      />
    </div>
  );
}

function DotPattern() {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-7 gap-2"
    >
      {Array.from({ length: 35 }).map((_, index) => (
        <span
          key={index}
          className="size-1 rounded-full bg-grid-dot"
        />
      ))}
    </div>
  );
}

function CircuitLine() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 245 55"
      className="h-14 w-[245px] text-technical"
    >
      <path
        d="M0 10H142L174 42H218"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.7"
      />

      <rect
        x="218"
        y="34"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <rect
        x="223"
        y="39"
        width="6"
        height="6"
        fill="currentColor"
        opacity="0.25"
      />
    </svg>
  );
}