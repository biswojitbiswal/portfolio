import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";

import { HeroVisual } from "./hero-visual";

type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/biswojitbiswal",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/biswojitb",
    icon: FaLinkedin,
  },
];

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-background">
      {/* Background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-8rem] left-[-10rem] size-[22rem] rounded-full bg-technical/10 blur-[100px]" />

        <div className="absolute right-[-8rem] bottom-[-10rem] size-[25rem] rounded-full bg-technical/10 blur-[110px]" />
      </div>

      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-5 pt-10 pb-12 sm:px-8 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12 lg:py-16 xl:px-16">
        {/* Hero content */}
        <div className="relative z-10 order-1">
          <p className="mb-4 font-mono text-sm font-semibold tracking-[0.12em] text-technical uppercase sm:text-base">&lt; Backend Developer /&gt;</p>

          <h1 id="hero-heading" className="max-w-3xl font-heading text-[clamp(2.35rem,8vw,4rem)] leading-[1.02] font-bold tracking-[-0.045em] text-foreground">
            I build dependable backend systems for real products.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Node.js, NestJS, TypeScript, PostgreSQL, MongoDB and Redis.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/projects"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:w-auto"
            >
              View Projects
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href="/resume/Biswojit-Biswal-Resume.pdf"
              download
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-technical/50 bg-surface/50 px-6 py-3 text-sm font-semibold text-technical shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-technical hover:bg-technical-soft hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:w-auto"
            >
              <Download aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download Resume
            </a>
          </div>

          {/* Social links */}
          <div aria-label="Social profiles" className="mt-6 flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Biswojit's ${label} profile`}
                className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface/70 text-muted-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-technical/60 hover:bg-technical-soft hover:text-technical hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <Icon aria-hidden="true" className="size-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Portrait area */}
        <div className="relative order-2 mx-auto w-full max-w-[32rem]">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
