import { client } from "@/sanity/lib/client";
import { CONTACT_QUERY } from "@/sanity/lib/queries";
import { ContentRefresh } from "@/components/providers/content-refresh";
import type { ElementType } from "react";
import { ArrowUpRight, Clock3, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

type ContactMethod = {
  id: string;
  label: string;
  title: string;
  value: string;
  href: string;
  icon: string;
  actionLabel: string;
  external?: boolean;
};

type ContactData = {
  _id: string;
  _rev: string;
  sectionLabel: string;
  heading: string;
  description: string;
  availabilityText: string;
  showAvailability: boolean;
  contactMethods: ContactMethod[];
  replyText: string;
  footerText: string | null;
};

const contactIcons: Record<string, ElementType> = {
  email: Mail,
  linkedin: FaLinkedin,
  whatsapp: FaWhatsapp,
  github: FaGithub,
};

export async function Contact() {
  const data = await client.fetch<ContactData | null>(CONTACT_QUERY, {}, {
    perspective: "published",
    useCdn: false,
    cache: "no-store",
  });

  if (!data) return <ContentRefresh section="contact" initialRevision={null} />;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="
        relative isolate scroll-mt-24 overflow-hidden
        bg-background py-10 sm:py-12 lg:py-14
      "
    >
      <ContentRefresh section="contact" initialRevision={data._id + ":" + data._rev} />
      <BackgroundGlows />

      <div
        className="
          relative z-10 mx-auto max-w-7xl
          px-5 sm:px-8 lg:px-12 xl:px-16
        "
      >
        {/* Header */}
        <div
          className="
            grid items-end gap-5
            lg:grid-cols-[minmax(0,1fr)_auto]
            lg:gap-12
          "
        >
          <div>
            <p className="section-label">&lt; {data.sectionLabel} /&gt;</p>

            <h2
              id="contact-heading"
              className="section-heading mt-3 max-w-2xl"
            >
              {data.heading}
            </h2>

            <p className="section-description mt-4 max-w-2xl">
              {data.description}
            </p>
          </div>

          {data.showAvailability && <AvailabilityStatus text={data.availabilityText} />}
        </div>

        {/* Accent divider */}
        <div
          aria-hidden="true"
          className="mt-6 flex items-center gap-3"
        >
          <span className="h-0.5 w-10 shrink-0 bg-technical" />

          <span
            className="
              h-px flex-1
              bg-gradient-to-r
              from-technical/30
              to-transparent
            "
          />
        </div>

        {/* Contact methods */}
        <div
          className="
            mt-5 grid grid-cols-1 gap-2.5
            min-[360px]:grid-cols-2
            lg:grid-cols-4 lg:gap-3
          "
        >
          {data.contactMethods.map((method, index) => (
            <ContactCard
              key={method.id}
              method={method}
              index={index}
            />
          ))}
        </div>

        {/* Bottom information */}
        <div
          className="
            mt-5 flex flex-col gap-3
            border-t border-border/70 pt-4
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <ReplyInformation text={data.replyText} />

          <p
            className="
              hidden font-mono text-[0.65rem]
              uppercase tracking-[0.14em]
              text-muted-foreground
              md:block
            "
          >
            {data.footerText}
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  method,
  index,
}: {
  method: ContactMethod;
  index: number;
}) {
  const Icon = contactIcons[method.icon] ?? Mail;

  return (
    <a
      href={method.href}
      target={method.external ? "_blank" : undefined}
      rel={method.external ? "noopener noreferrer" : undefined}
      aria-label={`${method.title} via ${method.label}`}
      className="
        group relative min-w-0 overflow-hidden
        rounded-lg border border-border
        bg-surface/75 p-3.5
        outline-none
        transition-[border-color,background-color,transform,box-shadow]
        duration-300
        hover:-translate-y-0.5
        hover:border-technical/50
        hover:bg-surface-soft
        hover:shadow-md
        hover:shadow-technical/5
        focus-visible:ring-2
        focus-visible:ring-ring
        sm:p-4
      "
    >
      {/* Card number */}
      <span
        aria-hidden="true"
        className="
          absolute right-3 top-3
          font-mono text-[0.55rem]
          text-muted-foreground/50
        "
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon and contact type */}
      <div className="flex items-center gap-2.5 pr-6">
        <div
          className="
            flex size-9 shrink-0 items-center
            justify-center rounded-md
            border border-technical/25
            bg-technical-soft text-technical
            transition-transform duration-300
            group-hover:-translate-y-0.5
            sm:size-10
          "
        >
          <Icon
            aria-hidden="true"
            className="size-5"
          />
        </div>

        <p
          className="
            min-w-0 truncate font-mono
            text-[0.58rem] font-semibold
            uppercase tracking-[0.12em]
            text-technical
          "
        >
          {method.label}
        </p>
      </div>

      {/* Main content */}
      <h3
        className="
          mt-3 truncate text-sm font-semibold
          text-foreground sm:text-base
        "
      >
        {method.title}
      </h3>

      {/* Hidden on smaller screens to keep cards compact */}
      <p
        className="
          mt-1 hidden truncate text-xs
          text-muted-foreground sm:block
        "
      >
        {method.value}
      </p>

      {/* Action */}
      <div
        className="
          mt-3 flex items-center justify-between
          gap-2 border-t border-border/70 pt-2.5
        "
      >
        <span
          className="
            min-w-0 truncate text-[0.68rem]
            font-medium text-muted-foreground
            transition-colors
            group-hover:text-technical
            sm:text-xs
          "
        >
          {method.actionLabel}
        </span>

        <ArrowUpRight
          aria-hidden="true"
          className="
            size-3.5 shrink-0 text-technical
            transition-transform duration-300
            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
            sm:size-4
          "
        />
      </div>

      {/* Bottom hover line */}
      <span
        aria-hidden="true"
        className="
          absolute bottom-0 left-0
          h-0.5 w-0 bg-technical
          transition-[width] duration-300
          group-hover:w-full
        "
      />
    </a>
  );
}

function AvailabilityStatus({ text }: { text: string }) {
  return (
    <div className="mt-5 inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-chart-4">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-chart-4 opacity-50" />
        <span className="relative inline-flex size-2 rounded-full bg-chart-4" />
      </span>
      {text}
    </div>
  );
}

function ReplyInformation({ text }: { text: string }) {
  return (
    <div
      className="
        flex items-center gap-2
        text-xs text-muted-foreground
      "
    >
      <Clock3
        aria-hidden="true"
        className="size-4 shrink-0 text-technical"
      />

      {text}
    </div>
  );
}

function BackgroundGlows() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none absolute
        inset-0 z-0 overflow-hidden
      "
    >
      {/* Top-left primary glow */}
      <div
        className="
          absolute -left-16 -top-20
          size-72 rounded-full
          bg-primary/12 blur-[100px]
        "
      />

      {/* Bottom-right primary glow */}
      <div
        className="
          absolute -bottom-24 -right-16
          size-80 rounded-full
          bg-primary/12 blur-[110px]
        "
      />

      {/* Decorations constrained to content width */}
      <div
        className="
          absolute inset-0 mx-auto
          hidden max-w-7xl
          px-5 sm:px-8
          lg:block lg:px-12
          xl:px-16
        "
      >
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          className="
            size-full text-technical
            opacity-[0.1]
          "
        >
          {/* Top-right animated circuit */}
          <path
            d="M640 55H760L825 120H980"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="7 10"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-136"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>

          {/* Bottom-left animated circuit */}
          <path
            d="M20 430H170L235 365"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="5 8"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="104"
              dur="9s"
              repeatCount="indefinite"
            />
          </path>

          {/* Animated top point */}
          <circle
            cx="640"
            cy="55"
            r="3"
            fill="currentColor"
          >
            <animate
              attributeName="opacity"
              values="0.25;1;0.25"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Animated bottom point */}
          <circle
            cx="235"
            cy="365"
            r="3"
            fill="currentColor"
          >
            <animate
              attributeName="opacity"
              values="1;0.25;1"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Static technical nodes */}
          <rect
            x="972"
            y="112"
            width="8"
            height="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />

          <rect
            x="16"
            y="426"
            width="8"
            height="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}