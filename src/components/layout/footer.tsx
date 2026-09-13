import { ArrowRight, ArrowUp, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact", highlighted: true },
];

const connectLinks = [
  {
    label: "Resume",
    href: "/documents/biswojit_backend_developer.pdf",
    icon: FileText,
    external: false,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/biswojitb",
    icon: FaLinkedin,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/biswojitbiswal",
    icon: FaGithub,
    external: true,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-background px-2 py-6 sm:px-4 sm:py-8 lg:px-12 xl:px-16">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-28 size-72 rounded-full bg-primary/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-lg border border-border bg-surface px-5 pt-16 pb-5 sm:px-7 sm:pb-6 lg:px-8">
        <TechnicalLine />

        {/* Desktop */}
        <div className="hidden grid-cols-[1.05fr_1.1fr_0.95fr] items-start lg:grid">
          <div className="border-r border-border pr-8">
            <Brand />
          </div>

          <div className="border-r border-border px-8">
            <p className="text-sm font-semibold text-foreground">Navigation</p>

            <nav aria-label="Footer navigation" className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
              {navigationLinks.map((link) => (
                <NavigationLink key={link.label} {...link} />
              ))}
            </nav>
          </div>

          <div className="pl-8">
            <p className="text-sm font-semibold text-foreground">Connect</p>

            <div className="mt-5 flex flex-wrap items-center gap-5">
              {connectLinks.map((link, index) => (
                <div key={link.label} className={`flex items-center gap-5 ${index !== connectLinks.length - 1 ? "after:h-5 after:w-px after:bg-border" : ""}`}>
                  <ConnectLink {...link} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile and tablet */}
        <div className="lg:hidden">
          <Brand />

          <div className="my-6 h-px bg-border" />

          <div>
            <p className="text-sm font-semibold text-foreground">Navigation</p>

            <nav aria-label="Footer navigation" className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {navigationLinks.map((link) => (
                <NavigationLink key={link.label} {...link} />
              ))}
            </nav>
          </div>

          <div className="my-6 h-px bg-border" />

          <div>
            <p className="text-sm font-semibold text-foreground">Connect</p>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {connectLinks.map(({ label, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex min-h-20 flex-col items-center justify-center gap-2 rounded-md border border-border bg-surface-soft px-2 py-3 text-center text-xs font-medium text-muted-foreground transition-colors outline-none hover:border-technical/50 hover:text-technical focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon aria-hidden="true" className="size-5 text-technical" />

                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-7 flex items-end justify-between gap-5 border-t border-border pt-5">
          <p className="text-sm text-muted-foreground">© {currentYear} Biswojit Biswal</p>

          <div className="flex items-end gap-5">
            <p className="hidden text-sm text-muted-foreground sm:block">Built with Next.js &amp; TypeScript</p>

            <a
              href="#home"
              aria-label="Back to top"
              className="group flex flex-col items-center gap-1.5 text-xs text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-10 items-center justify-center rounded-md border border-technical/50 bg-technical-soft text-technical transition-transform group-hover:-translate-y-0.5">
                <ArrowUp aria-hidden="true" className="size-5" />
              </span>

              <span className="hidden sm:inline">Back to top</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Brand() {
  return (
    <div>
      <p className="text-2xl font-bold tracking-[-0.035em] text-foreground">Biswojit Biswal</p>

      <p className="mt-1 text-base font-medium text-technical">Backend Developer</p>

      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Building reliable APIs and production-ready systems.</p>
    </div>
  );
}

function NavigationLink({ label, href, highlighted = false }: { label: string; href: string; highlighted?: boolean }) {
  return (
    <a
      href={href}
      className={`group inline-flex w-fit items-center gap-2 pb-1 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        highlighted ? "border-b border-technical text-technical" : "border-b border-transparent text-muted-foreground hover:text-technical"
      }`}
    >
      {label}

      {highlighted && <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />}
    </a>
  );
}

function ConnectLink({ label, href, icon: Icon, external }: { label: string; href: string; icon: typeof FileText; external: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-technical focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon aria-hidden="true" className="size-5 text-technical transition-transform group-hover:-translate-y-0.5" />

      {label}
    </a>
  );
}

function TechnicalLine() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute top-3 right-5 left-5 h-9 text-technical sm:right-7 sm:left-7 lg:right-8 lg:left-8">
      <svg viewBox="0 0 1000 36" preserveAspectRatio="none" className="size-full">
        <path d="M8 22H820C870 22 875 6 930 6H986" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.8" />

        <circle cx="8" cy="22" r="4" fill="currentColor" opacity="0.3" />
        <circle cx="8" cy="22" r="2" fill="currentColor" />

        <circle cx="986" cy="6" r="5" fill="currentColor" opacity="0.3" />
        <circle cx="986" cy="6" r="2.5" fill="currentColor" />
      </svg>

      <div className="absolute top-7 right-5 hidden grid-cols-8 gap-2 opacity-50 lg:grid">
        {Array.from({ length: 32 }).map((_, index) => (
          <span key={index} className="size-1 rounded-full bg-grid-dot" />
        ))}
      </div>
    </div>
  );
}
