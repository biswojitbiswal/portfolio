import Link from "next/link";
import { ContentRefresh } from "@/components/providers/content-refresh";
import { ArrowRight, Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";

import { HeroVisual } from "./hero-visual";
import { client } from "@/sanity/lib/client";
import { HERO_QUERY } from "@/sanity/lib/queries";

type SocialLink = {
  platform: string;
  label: string;
  url: string;
};

type HeroData = {
  _id: string;
  _rev: string;
  developerTag: string;
  heading: string;
  subtitle: string;

  primaryCta?: {
    label?: string;
    href?: string;
  };

  resumeCta?: {
    label?: string;
    resumeFile?: {
      asset?: {
        url?: string;
      };
    };
  };

  socialLinks?: SocialLink[];

  profileImage?: {
    alt?: string;
    asset?: {
      url?: string;
    };
  };

  codeCard?: {
    code?: string;
  };

  quoteCard?: {
    firstLine?: string;
    secondLine?: string;
  };
};

const socialIcons: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
};


export async function Hero() {
  const hero = await client.fetch<HeroData | null>(HERO_QUERY, {}, {
    perspective: "published",
    useCdn: false,
    cache: "no-store",
  });

  if (!hero) {
    return <ContentRefresh initialRevision={null} />;
  }
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-background">
      <ContentRefresh initialRevision={hero._id + ":" + hero._rev} />
      {/* Background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-8rem] left-[-10rem] size-[22rem] rounded-full bg-technical/10 blur-[100px]" />

        <div className="absolute right-[-8rem] bottom-[-10rem] size-[25rem] rounded-full bg-technical/10 blur-[110px]" />
      </div>

      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-5 pt-10 pb-12 sm:px-8 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12 lg:py-16 xl:px-16 max-sm:min-h-0 max-sm:gap-6 max-sm:pt-7 max-sm:pb-8">
        {/* Hero content */}
        <div className="relative z-10 order-1">
          <p className="mb-4 font-mono text-sm font-semibold tracking-[0.12em] text-technical uppercase sm:text-base max-sm:mb-3 max-sm:text-[0.7rem] max-sm:tracking-[0.1em]">&lt; {hero.developerTag} /&gt;</p>

          <h1 id="hero-heading" className="max-w-3xl font-heading text-[clamp(2.35rem,8vw,4rem)] leading-[1.02] font-bold tracking-[-0.045em] text-foreground max-sm:text-[clamp(1.9rem,8.5vw,2.25rem)] max-sm:leading-[1.1] max-sm:tracking-[-0.035em]">
            {hero.heading}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 max-sm:mt-4 max-sm:text-sm max-sm:leading-6">
            {hero.subtitle}
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center max-sm:mt-5 max-sm:flex-row max-sm:flex-wrap max-sm:items-center max-sm:gap-2">
            {hero.primaryCta?.href && (
              <Link
                href={hero.primaryCta.href}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 max-sm:shadow-sm max-sm:shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:w-auto max-sm:min-h-11 max-sm:w-auto max-sm:max-w-full max-sm:rounded-lg max-sm:px-3 max-sm:py-2.5 max-sm:text-xs"
              >
                {hero.primaryCta.label ?? "View Projects"}

                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            )}

            {hero.resumeCta?.resumeFile?.asset?.url && (
              <a
                href={hero.resumeCta.resumeFile.asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-technical/50 bg-surface/50 px-6 py-3 text-sm font-semibold text-technical shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-technical hover:bg-technical-soft hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:w-auto max-sm:min-h-11 max-sm:w-auto max-sm:max-w-full max-sm:rounded-lg max-sm:px-3 max-sm:py-2.5 max-sm:text-xs"
              >
                <Download
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                />

                {hero.resumeCta.label ?? "Download Resume"}
              </a>
            )}
          </div>


          {/* Social links */}
          <div aria-label="Social profiles" className="mt-6 flex items-center gap-3 max-sm:mt-4 max-sm:gap-2">
            {hero.socialLinks?.map((social) => {
              const Icon = socialIcons[social.platform];

              if (!Icon) {
                return null;
              }

              return (
                <a
                  key={`${social.platform}-${social.url}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Biswojit's ${social.label} profile`}
                  className="inline-flex size-11 items-center justify-center rounded-xl max-sm:rounded-lg border border-border bg-surface/70 text-muted-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-technical/60 hover:bg-technical-soft hover:text-technical hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <Icon aria-hidden="true" className="size-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Portrait area */}
        <div className="relative order-2 mx-auto w-full max-w-[32rem] max-sm:max-w-[18rem]">
          <HeroVisual
            imageUrl={hero.profileImage?.asset?.url}
            imageAlt={hero.profileImage?.alt}
            code={hero.codeCard?.code}
            quoteFirstLine={hero.quoteCard?.firstLine}
            quoteSecondLine={hero.quoteCard?.secondLine}
          />
        </div>
      </div>
    </section>
  );
}
