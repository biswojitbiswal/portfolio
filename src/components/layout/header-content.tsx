"use client";

import Link from "next/link";
import { Download, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { BrandLogo } from "../shared/brand-logo";

export type HeaderData = {
  _id: string;
  _rev: string;
  brandName: string;
  specialization: string;
  showSpecialization: boolean;
  navigation: { _key: string; label: string; href: string }[];
  resume: { label: string; mobileLabel: string; url: string | null; downloadFileName: string | null } | null;
  cta: { label: string; href: string } | null;
  mobileMenu: { title: string; description: string } | null;
};

export function HeaderContent({ data }: { data: HeaderData }) {
  const navigation = data.navigation;
  const resumeHref = data.resume?.url ? new URL(data.resume.url) : null;
  // Sanity sets the attachment header; browser download attributes alone do not work across origins.
  if (resumeHref) resumeHref.searchParams.set("dl", data.resume?.downloadFileName || "resume.pdf");
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Home */}
        <Link
          href="/"
          aria-label={data.brandName + " - Home"}
          className="group inline-flex"
        >
          <BrandLogo
            name={data.brandName}
            specialization={data.specialization}
            showSpecialization={data.showSpecialization}
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item._key}
              href={item.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          {resumeHref && <a
            href={resumeHref?.toString()}
            download={data.resume?.downloadFileName || true}
            className="ml-2 inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Download className="size-4" aria-hidden="true" />
            {data.resume?.label}
          </a>}

          {data.cta?.href && <Link
            href={data.cta!.href}
            className="ml-1 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {data.cta?.label}
          </Link>}

          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger render={<Button type="button" variant="outline" size="icon" className="rounded-full" aria-label="Open navigation menu" />}>
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[min(88vw,22rem)] gap-0 border-border/70 bg-background/95 p-0 backdrop-blur-xl">
              <SheetHeader className="border-b px-6 py-5">
                <SheetTitle>{data.mobileMenu?.title || data.brandName}</SheetTitle>

                <SheetDescription>{data.mobileMenu?.description || data.specialization}</SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col gap-2 px-4 py-6" aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <SheetClose
                    key={item._key}
                    nativeButton={false}
                    render={<Link href={item.href} className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent" />}
                  >
                    {item.label}
                  </SheetClose>
                ))}

                {resumeHref && <SheetClose
                  nativeButton={false}
                  render={
                    <a
                      href={resumeHref?.toString()}
                      download={data.resume?.downloadFileName || true}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                    />
                  }
                >
                  <Download className="size-5 text-primary" />
                  {data.resume?.mobileLabel}
                </SheetClose>}
              </nav>

              {data.cta?.href && <div className="mt-auto border-t p-4">
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href={data.cta!.href}
                      className="flex h-11 w-full items-center justify-center rounded-xl bg-primary px-5 font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    />
                  }
                >
                  {data.cta?.label}
                </SheetClose>
              </div>}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
