"use client";

import type { FormEvent } from "react";
import { ArrowRight, Clock3, LockKeyhole, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/biswojitb",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/biswojitbiswal",
    icon: FaGithub,
  },
];

export function Contact() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Connect your API or email service here later.
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative isolate scroll-mt-24 overflow-hidden bg-background py-12 sm:py-14 lg:py-16">
      <BackgroundGlows />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(480px,1.15fr)] lg:gap-14 xl:gap-20">
          {/* Left content */}
          <div className="relative">
            <p className="section-label">&lt; Contact /&gt;</p>

            <h2 id="contact-heading" className="section-heading mt-3 max-w-lg">
              Let&apos;s build something reliable.
            </h2>

            <p className="section-description mt-4 max-w-lg">Have a backend role, project or technical challenge in mind? Send me a message.</p>

            <div className="mt-4 h-0.5 w-10 bg-technical" />

            <AvailabilityStatus />

            <div className="mt-6">
              <p className="text-sm font-semibold text-foreground">Prefer email?</p>

              <a
                href="mailto:biswojitb474@gmail.com"
                className="mt-2 inline-flex items-center gap-3 rounded-md border border-technical/25 bg-technical-soft px-3.5 py-2.5 text-sm font-semibold text-technical transition-colors outline-none hover:border-technical/50 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Mail aria-hidden="true" className="size-4.5" />

                <span className="break-all">biswojitb474@gmail.com</span>
              </a>
            </div>

            {/* Desktop-only social information */}
            <div className="mt-5 hidden lg:block">
              <SocialLinks />

              <ReplyInformation className="mt-5" />
            </div>
          </div>

          {/* Contact form */}
          <ContactForm onSubmit={handleSubmit} />

          {/* Mobile-only information */}
          <div className="space-y-4 lg:hidden">
            <SocialLinks />
            <ReplyInformation />
            <SecurityInformation />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-technical/40 bg-surface/80 p-4 shadow-lg shadow-technical/5 backdrop-blur-sm sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="fullName" name="fullName" label="Full name" placeholder="Full name" autoComplete="name" />

        <FormField id="email" name="email" type="email" label="Email address" placeholder="Email address" autoComplete="email" />
      </div>

      <div className="mt-4">
        <FormField id="subject" name="subject" label="Subject" placeholder="Subject" />
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
          Tell me about the opportunity...
        </label>

        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell me about the opportunity..."
          className="min-h-28 w-full resize-y rounded-md border border-input bg-background/60 px-3.5 py-3 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground/70 hover:border-technical/35 focus:border-technical focus:ring-2 focus:ring-ring/25"
        />
      </div>

      <button
        type="submit"
        className="group mt-4 flex min-h-11 w-full items-center justify-center gap-3 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-[transform,filter] outline-none hover:-translate-y-0.5 hover:brightness-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Send message
        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
      </button>

      <div className="mt-3 hidden justify-end lg:flex">
        <SecurityInformation />
      </div>
    </form>
  );
}

function FormField({
  id,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-11 w-full rounded-md border border-input bg-background/60 px-3.5 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground/70 hover:border-technical/35 focus:border-technical focus:ring-2 focus:ring-ring/25"
      />
    </div>
  );
}

function AvailabilityStatus() {
  return (
    <div className="mt-5 inline-flex items-center gap-2 border border-chart-4/20 bg-chart-4/10 px-3 py-2 text-xs font-medium text-chart-4">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-chart-4 opacity-50" />
        <span className="relative inline-flex size-2 rounded-full bg-chart-4" />
      </span>
      Open to backend opportunities
    </div>
  );
}

function SocialLinks() {
  return (
    <div aria-label="Social profiles" className="flex flex-wrap items-center gap-5">
      {socialLinks.map(({ label, href, icon: Icon }, index) => (
        <div key={label} className={`flex items-center gap-5 ${index !== socialLinks.length - 1 ? "after:h-5 after:w-px after:bg-border" : ""}`}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-technical focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Icon aria-hidden="true" className="size-5 text-technical" />

            {label}

            <ArrowRight aria-hidden="true" className="size-3.5 text-technical transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      ))}
    </div>
  );
}

function ReplyInformation({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-xs text-muted-foreground ${className}`}>
      <Clock3 aria-hidden="true" className="size-4 shrink-0 text-technical" />
      Usually replies within 24–48 hours
    </div>
  );
}

function SecurityInformation() {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <LockKeyhole aria-hidden="true" className="size-3.5 shrink-0" />
      Secure form • Spam protected
    </div>
  );
}

function BackgroundGlows() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute -top-20 -left-16 size-72 rounded-full bg-primary/12 blur-[100px]" />

      <div className="absolute -right-16 -bottom-24 size-80 rounded-full bg-primary/12 blur-[110px]" />
    </div>
  );
}
