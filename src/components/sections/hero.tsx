import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Download,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HeroVisual } from "./hero-visual";

const socialLinks = [
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
        <section
            id="home"
            aria-labelledby="hero-heading"
            className="relative isolate overflow-hidden"
        >
            {/* Background glows */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
            >
                <div className="absolute left-[-10rem] top-[-8rem] h-[22rem] w-[22rem] rounded-full bg-violet-400/10 blur-[100px] dark:bg-cyan-400/10" />

                <div className="absolute bottom-[-10rem] right-[-8rem] h-[25rem] w-[25rem] rounded-full bg-violet-500/10 blur-[110px] dark:bg-cyan-400/10" />
            </div>

            <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-5 pb-12 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12 lg:py-16 xl:px-16">
                {/* Hero content */}
                <div className="relative z-10 order-1">
                    <p className="mb-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-violet-600 dark:text-cyan-400 sm:text-base">
                        &lt; Backend Developer /&gt;
                    </p>

                    <h1
                        id="hero-heading"
                        className="max-w-3xl text-[clamp(2.35rem,8vw,4rem)] font-bold leading-[1.02] tracking-[-0.045em] text-slate-950 dark:text-white"
                    >
                        I build dependable backend systems for real products.
                    </h1>

                    <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
                        Node.js, NestJS, TypeScript, PostgreSQL, MongoDB and Redis.
                    </p>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link
                            href="/projects"
                            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-violet-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 sm:w-auto dark:bg-cyan-400 dark:text-slate-950 dark:shadow-cyan-500/15 dark:hover:bg-cyan-300 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-slate-950"
                        >
                            View Projects

                            <ArrowRight
                                aria-hidden="true"
                                className="size-4 transition-transform group-hover:translate-x-1"
                            />
                        </Link>

                        <a
                            href="/resume/Biswojit-Biswal-Resume.pdf"
                            download
                            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-violet-500/60 bg-white/50 px-6 py-3 text-sm font-semibold text-violet-700 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-violet-600 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 sm:w-auto dark:border-cyan-400/50 dark:bg-slate-950/30 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:bg-cyan-400/10 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-slate-950"
                        >
                            <Download
                                aria-hidden="true"
                                className="size-4 transition-transform group-hover:translate-y-0.5"
                            />

                            Download Resume
                        </a>
                    </div>

                    {/* Social links */}
                    <div
                        aria-label="Social profiles"
                        className="mt-6 flex items-center gap-3"
                    >
                        {socialLinks.map(({ label, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit Biswojit's ${label} profile`}
                                className="
                                inline-flex
                                size-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary/20
                                text-primary
                                text-muted-foreground
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-primary/10
                                hover:text-primary
                                hover:shadow-md
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-primary
                                focus-visible:ring-offset-2
                                focus-visible:ring-offset-background">
                                <Icon
                                    aria-hidden="true"
                                    className="size-5"
                                />
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

function DotGrid({ className }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={`absolute grid grid-cols-6 gap-2 opacity-40 ${className ?? ""}`}
        >
            {Array.from({ length: 30 }).map((_, index) => (
                <span
                    key={index}
                    className="size-1 rounded-full bg-violet-500 dark:bg-cyan-400"
                />
            ))}
        </div>
    );
}