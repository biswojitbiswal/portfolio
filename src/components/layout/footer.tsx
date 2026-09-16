import { client } from "@/sanity/lib/client";
import { FOOTER_QUERY } from "@/sanity/lib/queries";
import { ContentRefresh } from "@/components/providers/content-refresh";
import { ArrowRight, ArrowUp, FileText } from "lucide-react";
import { ElementType } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type FooterData = {
  _id: string;
  _rev: string;
  brandName: string;
  role: string;
  description: string;
  navigationTitle: string;
  navigationLinks: { _key: string; label: string; href: string; highlighted?: boolean }[];
  connectTitle: string;
  connectLinks: { _key: string; label: string; href: string | null; icon: string; external: boolean }[];
  copyrightName: string;
  builtWithText: string;
  backToTopLabel: string;
  backToTopHref: string;
};

const connectIcons: Record<string, ElementType> = {
  file: FileText,
  linkedin: FaLinkedin,
  github: FaGithub,
};

type ConnectLinkItem = {
  label: string;
  href: string;
  icon: ElementType;
  external: boolean;
};

export async function Footer() {
  const data = await client.fetch<FooterData | null>(FOOTER_QUERY, {}, {
    perspective: "published",
    useCdn: false,
    cache: "no-store",
  });

  if (!data) return <ContentRefresh section="footer" initialRevision={null} />;

  const navigationLinks = data.navigationLinks;
  const connectLinks = data.connectLinks.flatMap((link) => link.href ? [{
    ...link,
    href: link.href,
    icon: connectIcons[link.icon] ?? FileText,
  }] : []);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-background px-2 py-6 sm:px-4 sm:py-8 lg:px-12 xl:px-16">
      <ContentRefresh section="footer" initialRevision={data._id + ":" + data._rev} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-28 size-72 rounded-full bg-primary/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-lg border border-border bg-surface px-5 pt-16 pb-5 sm:px-7 sm:pb-6 lg:px-8">
        <TechnicalLine />

        {/* Desktop */}
        <div className="hidden grid-cols-[1.05fr_1.1fr_0.95fr] items-start lg:grid">
          <div className="border-r border-border pr-8">
            <Brand data={data} />
          </div>

          <div className="border-r border-border px-8">
            <p className="text-sm font-semibold text-foreground">{data.navigationTitle}</p>

            <nav aria-label="Footer navigation" className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
              {navigationLinks.map((link) => (
                <NavigationLink key={link._key} {...link} />
              ))}
            </nav>
          </div>

          <div className="pl-8">
            <p className="text-sm font-semibold text-foreground">{data.connectTitle}</p>

            <div className="mt-5 flex flex-wrap items-center gap-5">
              {connectLinks.map((link, index) => (
                <div key={link._key} className={`flex items-center gap-5 ${index !== connectLinks.length - 1 ? "after:h-5 after:w-px after:bg-border" : ""}`}>
                  <ConnectLink {...link} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile and tablet */}
        <div className="lg:hidden">
          <Brand data={data} />

          <div className="my-6 h-px bg-border" />

          <div>
            <p className="text-sm font-semibold text-foreground">{data.navigationTitle}</p>

            <nav aria-label="Footer navigation" className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {navigationLinks.map((link) => (
                <NavigationLink key={link._key} {...link} />
              ))}
            </nav>
          </div>

          <div className="my-6 h-px bg-border" />

          <div>
            <p className="text-sm font-semibold text-foreground">{data.connectTitle}</p>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {connectLinks.map(({ _key, label, href, icon: Icon, external }) => (
                <a
                  key={_key}
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
          <p className="text-sm text-muted-foreground">© {currentYear} {data.copyrightName}</p>

          <div className="flex items-end gap-5">
            <p className="hidden text-sm text-muted-foreground sm:block">{data.builtWithText}</p>

            <a
              href={data.backToTopHref}
              aria-label={data.backToTopLabel}
              className="group flex flex-col items-center gap-1.5 text-xs text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-10 items-center justify-center rounded-md border border-technical/50 bg-technical-soft text-technical transition-transform group-hover:-translate-y-0.5">
                <ArrowUp aria-hidden="true" className="size-5" />
              </span>

              <span className="hidden sm:inline">{data.backToTopLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Brand({ data }: { data: FooterData }) {
  return (
    <div>
      <p className="text-2xl font-bold tracking-[-0.035em] text-foreground">{data.brandName}</p>

      <p className="mt-1 text-base font-medium text-technical">{data.role}</p>

      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{data.description}</p>
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

function ConnectLink({ label, href, icon: Icon, external }: ConnectLinkItem) {
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
