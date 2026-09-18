"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import type {
  Project,
  ProjectStatus,
} from "@/types/project";

const PROJECTS_PER_PAGE = 4;

type ProjectsExplorerProps = {
  projects: Project[];
  initialSearch?: string;
  initialCategory?: string;
  initialTechnology?: string;
  initialPage?: number;
};

export function ProjectsExplorer({
  projects,
  initialSearch = "",
  initialCategory = "all",
  initialTechnology = "all",
  initialPage = 1,
}: ProjectsExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [technology, setTechnology] =
    useState(initialTechnology);
  const [page, setPage] = useState(initialPage);

  const categories = useMemo(() => {
    return Array.from(
      new Set(projects.map((project) => project.category)),
    ).sort();
  }, [projects]);

  const technologies = useMemo(() => {
    return Array.from(
      new Set(
        projects.flatMap((project) => project.technologies),
      ),
    ).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !normalizedSearch ||
        project.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        project.description
          .toLowerCase()
          .includes(normalizedSearch) ||
        project.category
          .toLowerCase()
          .includes(normalizedSearch) ||
        project.technologies.some((item) =>
          item.toLowerCase().includes(normalizedSearch),
        );

      const matchesCategory =
        category === "all" ||
        project.category === category;

      const matchesTechnology =
        technology === "all" ||
        project.technologies.includes(technology);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesTechnology
      );
    });
  }, [projects, search, category, technology]);

  const pageCount = Math.max(
    1,
    Math.ceil(
      filteredProjects.length / PROJECTS_PER_PAGE,
    ),
  );

  const safePage = Math.min(page, pageCount);

  const visibleProjects = useMemo(() => {
    const start =
      (safePage - 1) * PROJECTS_PER_PAGE;

    return filteredProjects.slice(
      start,
      start + PROJECTS_PER_PAGE,
    );
  }, [filteredProjects, safePage]);

  const firstVisibleProject =
    filteredProjects.length === 0
      ? 0
      : (safePage - 1) * PROJECTS_PER_PAGE + 1;

  const lastVisibleProject = Math.min(
    safePage * PROJECTS_PER_PAGE,
    filteredProjects.length,
  );

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "all" ||
    technology !== "all";

  useEffect(() => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (category !== "all") {
      params.set("category", category);
    }

    if (technology !== "all") {
      params.set("technology", technology);
    }

    if (safePage > 1) {
      params.set("page", String(safePage));
    }

    const query = params.toString();

    router.replace(
      query ? `${pathname}?${query}` : pathname,
      {
        scroll: false,
      },
    );
  }, [
    search,
    category,
    technology,
    safePage,
    pathname,
    router,
  ]);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
    setPage(1);
  }

  function handleTechnologyChange(value: string) {
    setTechnology(value);
    setPage(1);
  }

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setTechnology("all");
    setPage(1);
  }

  function changePage(nextPage: number) {
    if (nextPage < 1 || nextPage > pageCount) {
      return;
    }

    setPage(nextPage);

    window.requestAnimationFrame(() => {
      document
        .getElementById("projects-list")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  }

  return (
    <section
      aria-labelledby="projects-page-heading"
      className="
        relative isolate overflow-hidden
        bg-background pb-10 pt-8
        sm:pb-12 sm:pt-10
        lg:pb-14 lg:pt-12
      "
    >
      <ProjectsBackground />

      <div
        className="
          relative z-10 mx-auto max-w-7xl
          px-5 sm:px-8 lg:px-12 xl:px-16
        "
      >
        <ProjectsHeader />

        <ProjectFilters
          search={search}
          category={category}
          technology={technology}
          categories={categories}
          technologies={technologies}
          projectCount={filteredProjects.length}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onTechnologyChange={
            handleTechnologyChange
          }
          onClear={clearFilters}
        />

        <div
          id="projects-list"
          className="scroll-mt-28"
        >
          {visibleProjects.length > 0 ? (
            <div className="divide-y divide-border">
              {visibleProjects.map(
                (project, index) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    priority={
                      safePage === 1 && index === 0
                    }
                  />
                ),
              )}
            </div>
          ) : (
            <EmptyProjects onClear={clearFilters} />
          )}
        </div>

        {filteredProjects.length > 0 && (
          <div
            className="
              mt-5 flex flex-col gap-4
              border-t border-border pt-4
              sm:flex-row sm:items-center
              sm:justify-between
            "
          >
            <p className="text-xs text-muted-foreground">
              Showing {firstVisibleProject}–
              {lastVisibleProject} of{" "}
              {filteredProjects.length} projects
            </p>

            {pageCount > 1 && (
              <Pagination
                page={safePage}
                pageCount={pageCount}
                onChange={changePage}
              />
            )}
          </div>
        )}

        <ProjectsContactCTA />
      </div>
    </section>
  );
}

function ProjectsHeader() {
  return (
    <header
      className="
        relative border-b border-border
        pb-6 sm:pb-7
      "
    >
      <div className="max-w-3xl">
        <p className="section-label">
          &lt; Selected Work /&gt;
        </p>

        <h1
          id="projects-page-heading"
          className="
            section-heading mt-3
            max-w-3xl text-balance
          "
        >
          Systems behind real products.
        </h1>

        <p
          className="
            section-description mt-4
            max-w-2xl
          "
        >
          Production backend systems across EdTech,
          CMS, real estate and publishing—built for
          reliability, security and scale.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="
          absolute right-0 top-0
          hidden items-start gap-8
          lg:flex
        "
      >
        <DotPattern />

        <div
          className="
            pt-14 font-mono
            text-[0.58rem] uppercase
            leading-4 tracking-[0.16em]
            text-muted-foreground
          "
        >
          <span className="block">Code</span>
          <span className="block">Systems</span>
          <span className="block">Real impact</span>

          <span className="mt-2 block h-0.5 w-5 bg-technical" />
        </div>
      </div>
    </header>
  );
}

type ProjectFiltersProps = {
  search: string;
  category: string;
  technology: string;
  categories: string[];
  technologies: string[];
  projectCount: number;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTechnologyChange: (value: string) => void;
  onClear: () => void;
};

function ProjectFilters({
  search,
  category,
  technology,
  categories,
  technologies,
  projectCount,
  hasActiveFilters,
  onSearchChange,
  onCategoryChange,
  onTechnologyChange,
  onClear,
}: ProjectFiltersProps) {
  return (
    <div
      className="
        grid gap-2.5 border-b
        border-border py-4
        sm:grid-cols-2
        lg:grid-cols-[minmax(240px,1fr)_minmax(170px,0.55fr)_minmax(180px,0.6fr)_auto]
        lg:items-center
      "
    >
      <label className="relative block sm:col-span-2 lg:col-span-1">
        <span className="sr-only">
          Search projects
        </span>

        <Search
          aria-hidden="true"
          className="
            pointer-events-none absolute
            left-3 top-1/2 size-4
            -translate-y-1/2
            text-muted-foreground
          "
        />

        <input
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search projects..."
          className="
            h-10 w-full rounded-md
            border border-border
            bg-surface/75
            pl-9 pr-9
            text-sm text-foreground
            outline-none
            transition-colors
            placeholder:text-muted-foreground/70
            hover:border-technical/40
            focus:border-technical
            focus:ring-2
            focus:ring-ring/20
          "
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="
              absolute right-2 top-1/2
              flex size-7 -translate-y-1/2
              items-center justify-center
              rounded-md text-muted-foreground
              transition-colors
              hover:bg-surface-soft
              hover:text-foreground
              focus-visible:ring-2
              focus-visible:ring-ring
            "
          >
            <X
              aria-hidden="true"
              className="size-3.5"
            />
          </button>
        )}
      </label>

      <FilterSelect
        label="Project category"
        value={category}
        onChange={onCategoryChange}
      >
        <option value="all">
          All categories
        </option>

        {categories.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        label="Technology"
        value={technology}
        onChange={onTechnologyChange}
      >
        <option value="all">
          All technologies
        </option>

        {technologies.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </FilterSelect>

      <div
        className="
          flex items-center justify-between
          gap-3 sm:col-span-2
          lg:col-span-1 lg:justify-end
        "
      >
        <p
          className="
            whitespace-nowrap font-mono
            text-[0.65rem]
            text-muted-foreground
          "
        >
          {projectCount}{" "}
          {projectCount === 1
            ? "project"
            : "projects"}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="
              text-xs font-medium
              text-technical outline-none
              transition-colors
              hover:text-primary
              focus-visible:ring-2
              focus-visible:ring-ring
            "
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="relative block min-w-0">
      <span className="sr-only">{label}</span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-10 w-full appearance-none
          rounded-md border border-border
          bg-surface/75
          px-3 pr-9
          text-xs font-medium
          text-foreground
          outline-none
          transition-colors
          hover:border-technical/40
          focus:border-technical
          focus:ring-2
          focus:ring-ring/20
        "
      >
        {children}
      </select>

      <ChevronDown
        aria-hidden="true"
        className="
          pointer-events-none absolute
          right-3 top-1/2 size-3.5
          -translate-y-1/2
          text-muted-foreground
        "
      />
    </label>
  );
}

function ProjectRow({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const visibleTechnologies =
    project.technologies.slice(0, 4);

  const remainingTechnologies =
    project.technologies.length -
    visibleTechnologies.length;

  return (
    <article
      className="
        group grid grid-cols-1
        gap-3 py-4

        min-[360px]:grid-cols-[7rem_minmax(0,1fr)]

        sm:grid-cols-[15rem_minmax(0,1fr)]
        sm:gap-5 sm:py-5

        lg:grid-cols-[18rem_minmax(0,1fr)]
        lg:gap-6
      "
    >
      {/* Project image */}
      <Link
        href={project.caseStudyHref}
        aria-label={`View ${project.title} case study`}
        className="
          relative min-h-40
          overflow-hidden rounded-lg
          border border-border
          bg-surface-soft
          outline-none
          focus-visible:ring-2
          focus-visible:ring-ring

          min-[360px]:min-h-0

          sm:min-h-48
        "
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          priority={priority}
          sizes="
            (max-width: 359px) 100vw,
            (max-width: 639px) 112px,
            (max-width: 1023px) 240px,
            288px
          "
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-[1.025]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-t
            from-background/15
            to-transparent
          "
        />
      </Link>

      {/* Project information */}
      <div className="min-w-0 py-0.5">
        <div
          className="
            flex flex-wrap items-center
            gap-1.5
          "
        >
          <ProjectBadge>
            {project.category}
          </ProjectBadge>

          <StatusBadge status={project.status} />
        </div>

        <div
          className="
            mt-1.5 flex items-start
            justify-between gap-3
          "
        >
          <div className="min-w-0">
            <h2
              className="
                truncate text-base
                font-bold tracking-tight
                text-foreground
                sm:text-xl
              "
            >
              {project.title}
            </h2>

            <p
              className="
                mt-1 line-clamp-2
                text-xs leading-5
                text-muted-foreground
                sm:text-sm
              "
            >
              {project.description}
            </p>
          </div>

          {project.liveSiteHref && (
            <a
              href={project.liveSiteHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title} live website`}
              className="
                inline-flex size-8 shrink-0
                items-center justify-center
                rounded-md border
                border-transparent
                text-technical
                outline-none
                transition-colors
                hover:border-technical/30
                hover:bg-technical-soft
                focus-visible:ring-2
                focus-visible:ring-ring
                sm:hidden
              "
            >
              <ArrowUpRight
                aria-hidden="true"
                className="size-4"
              />
            </a>
          )}
        </div>

        <p
          className="
            mt-1.5 text-[0.68rem]
            text-muted-foreground
            sm:text-xs
          "
        >
          <span className="text-technical">
            Role:
          </span>{" "}
          {project.role}
        </p>

        {/* Technologies */}
        <div
          className="
            mt-2 flex flex-wrap
            gap-1 sm:gap-1.5
          "
        >
          {visibleTechnologies.map(
            (technology, index) => (
              <TechnologyBadge
                key={technology}
                className={
                  index >= 3
                    ? "hidden sm:inline-flex"
                    : ""
                }
              >
                {technology}
              </TechnologyBadge>
            ),
          )}

          {remainingTechnologies > 0 && (
            <TechnologyBadge>
              +{remainingTechnologies}
            </TechnologyBadge>
          )}
        </div>

        {/* Project highlights */}
        <div className="mt-2.5 space-y-1">
          {project.highlights
            .slice(0, 2)
            .map((highlight, index) => (
              <div
                key={highlight}
                className={
                  index === 1
                    ? "hidden items-start gap-2 sm:flex"
                    : "flex items-start gap-2"
                }
              >
                <span
                  className="
                    mt-0.5 flex size-3.5
                    shrink-0 items-center
                    justify-center rounded-full
                    bg-technical text-background
                  "
                >
                  <Check
                    aria-hidden="true"
                    className="size-2.5"
                    strokeWidth={3}
                  />
                </span>

                <p
                  className="
                    line-clamp-1
                    text-[0.68rem]
                    leading-4
                    text-muted-foreground
                    sm:text-xs
                  "
                >
                  {highlight}
                </p>
              </div>
            ))}
        </div>

        {/* Actions */}
        <div
          className="
            mt-3 flex items-center
            justify-between gap-3
          "
        >
          <Link
            href={project.caseStudyHref}
            className="
              group/link inline-flex
              min-h-8 flex-1
              items-center justify-center
              gap-2 rounded-md
              border border-technical/50
              px-3 text-[0.68rem]
              font-semibold text-technical
              outline-none
              transition-colors
              hover:bg-technical-soft
              focus-visible:ring-2
              focus-visible:ring-ring

              sm:min-h-0
              sm:flex-none
              sm:border-0
              sm:px-0
              sm:text-xs
            "
          >
            View Case Study

            <ArrowRight
              aria-hidden="true"
              className="
                size-3.5
                transition-transform
                group-hover/link:translate-x-1
              "
            />
          </Link>

          {project.liveSiteHref && (
            <a
              href={project.liveSiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="
                hidden items-center
                gap-1.5 text-xs
                font-medium
                text-muted-foreground
                outline-none
                transition-colors
                hover:text-technical
                focus-visible:ring-2
                focus-visible:ring-ring
                sm:inline-flex
              "
            >
              Live Site

              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        inline-flex max-w-full
        items-center rounded-full
        border border-technical/30
        bg-technical-soft
        px-2 py-0.5
        font-mono text-[0.55rem]
        font-medium text-technical
        sm:text-[0.6rem]
      "
    >
      <span className="truncate">
        {children}
      </span>
    </span>
  );
}

function StatusBadge({
  status,
}: {
  status: ProjectStatus;
}) {
  const isProduction = status === "Production";

  return (
    <span
      className={`
        inline-flex items-center
        gap-1.5 rounded-full
        border px-2 py-0.5
        font-mono text-[0.55rem]
        font-medium
        sm:text-[0.6rem]
        ${
          isProduction
            ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-400"
            : "border-amber-400/25 bg-amber-400/10 text-amber-400"
        }
      `}
    >
      <span
        className={`
          size-1.5 rounded-full
          ${
            isProduction
              ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
              : "bg-amber-400"
          }
        `}
      />

      {status}
    </span>
  );
}

function TechnologyBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`
        inline-flex max-w-24
        items-center rounded-full
        border border-border
        bg-surface-soft
        px-2 py-0.5
        text-[0.55rem]
        text-muted-foreground
        sm:max-w-none
        sm:text-[0.6rem]
        ${className}
      `}
    >
      <span className="truncate">
        {children}
      </span>
    </span>
  );
}

function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  const pages = Array.from(
    { length: pageCount },
    (_, index) => index + 1,
  );

  return (
    <nav
      aria-label="Projects pagination"
      className="
        flex items-center justify-center
        gap-2 sm:justify-end
      "
    >
      <PaginationButton
        label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        <ArrowLeft
          aria-hidden="true"
          className="size-3.5"
        />

        <span className="hidden sm:inline">
          Previous
        </span>
      </PaginationButton>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onChange(pageNumber)}
          aria-label={`Go to page ${pageNumber}`}
          aria-current={
            pageNumber === page
              ? "page"
              : undefined
          }
          className={`
            flex size-9 items-center
            justify-center rounded-md
            border text-xs font-semibold
            outline-none transition-colors
            focus-visible:ring-2
            focus-visible:ring-ring
            ${
              pageNumber === page
                ? "border-technical bg-technical text-background"
                : "border-border bg-surface/75 text-muted-foreground hover:border-technical/40 hover:text-technical"
            }
          `}
        >
          {pageNumber}
        </button>
      ))}

      <PaginationButton
        label="Next page"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
      >
        <span className="hidden sm:inline">
          Next
        </span>

        <ArrowRight
          aria-hidden="true"
          className="size-3.5"
        />
      </PaginationButton>
    </nav>
  );
}

function PaginationButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      className="
        inline-flex min-h-9
        items-center justify-center
        gap-2 rounded-md border
        border-border bg-surface/75
        px-3 text-xs font-medium
        text-muted-foreground
        outline-none
        transition-colors
        hover:border-technical/40
        hover:text-technical
        focus-visible:ring-2
        focus-visible:ring-ring
        disabled:pointer-events-none
        disabled:opacity-40
      "
    >
      {children}
    </button>
  );
}

function EmptyProjects({
  onClear,
}: {
  onClear: () => void;
}) {
  return (
    <div
      className="
        flex min-h-72 flex-col
        items-center justify-center
        border-b border-border
        py-12 text-center
      "
    >
      <div
        className="
          flex size-12 items-center
          justify-center rounded-lg
          border border-technical/25
          bg-technical-soft
          text-technical
        "
      >
        <Search
          aria-hidden="true"
          className="size-5"
        />
      </div>

      <h2
        className="
          mt-4 text-lg font-semibold
          text-foreground
        "
      >
        No projects found
      </h2>

      <p
        className="
          mt-1 max-w-sm text-sm
          leading-6 text-muted-foreground
        "
      >
        Try changing your search term, category or
        selected technology.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="
          mt-4 inline-flex min-h-9
          items-center justify-center
          rounded-md bg-primary
          px-4 text-xs font-semibold
          text-primary-foreground
          outline-none
          transition-transform
          hover:-translate-y-0.5
          focus-visible:ring-2
          focus-visible:ring-ring
        "
      >
        Clear all filters
      </button>
    </div>
  );
}

function ProjectsContactCTA() {
  return (
    <div
      className="
        relative mt-6 overflow-hidden
        rounded-lg border
        border-technical/30
        bg-surface/75 p-4
        sm:flex sm:items-center
        sm:justify-between sm:gap-8
        sm:p-5
      "
    >
      <div className="relative z-10">
        <h2
          className="
            text-sm font-semibold
            text-foreground
            sm:text-base
          "
        >
          Have a backend problem to solve?
        </h2>

        <p
          className="
            mt-1 max-w-xl
            text-xs leading-5
            text-muted-foreground
          "
        >
          Let&apos;s build something reliable,
          scalable and impactful.
        </p>
      </div>

      <Link
        href="/#contact"
        className="
          group relative z-10 mt-4
          inline-flex min-h-10 w-full
          items-center justify-center
          gap-2 rounded-md
          bg-primary px-5
          text-xs font-semibold
          text-primary-foreground
          outline-none
          transition-transform
          hover:-translate-y-0.5
          focus-visible:ring-2
          focus-visible:ring-ring
          sm:mt-0 sm:w-auto
        "
      >
        Let&apos;s Talk

        <ArrowRight
          aria-hidden="true"
          className="
            size-4 transition-transform
            group-hover:translate-x-1
          "
        />
      </Link>

      <div
        aria-hidden="true"
        className="
          absolute -right-16 -top-20
          size-52 rounded-full
          bg-primary/10 blur-[70px]
        "
      />
    </div>
  );
}

function DotPattern() {
  return (
    <div className="grid grid-cols-7 gap-2 opacity-50">
      {Array.from({ length: 35 }).map(
        (_, index) => (
          <span
            key={index}
            className="
              size-1 rounded-full
              bg-grid-dot
            "
          />
        ),
      )}
    </div>
  );
}

function ProjectsBackground() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0 -z-10
        overflow-hidden
      "
    >
      <div
        className="
          absolute -left-32 -top-28
          size-72 rounded-full
          bg-primary/10 blur-[100px]
        "
      />

      <div
        className="
          absolute -bottom-40 -right-32
          size-80 rounded-full
          bg-primary/10 blur-[110px]
        "
      />

      <div
        className="
          absolute left-1/2 top-72
          hidden h-px w-[60rem]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-technical/10
          to-transparent
          lg:block
        "
      />
    </div>
  );
}