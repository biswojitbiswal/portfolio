"use client";

import Link from "next/link";
import { Download, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const navigation = [
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Home */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-semibold tracking-tight"
          aria-label="Biswojit Biswal — Home"
        >
          <span className="flex size-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 font-mono text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            BB
          </span>

          <span className="hidden text-sm sm:inline-block">
            Biswojit Biswal
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          <a
            href="/documents/biswojit-biswal-resume.pdf"
            download
            className="ml-2 inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Download className="size-4" aria-hidden="true" />
            Resume
          </a>

          <Link
            href="/#contact"
            className="ml-1 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Let&apos;s talk
          </Link>

          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[min(88vw,22rem)] gap-0 border-border/70 bg-background/95 p-0 backdrop-blur-xl"
            >
              <SheetHeader className="border-b px-6 py-5">
                <SheetTitle>Biswojit Biswal</SheetTitle>

                <SheetDescription>
                  Backend Developer
                </SheetDescription>
              </SheetHeader>

              <nav
                className="flex flex-col gap-2 px-4 py-6"
                aria-label="Mobile navigation"
              >
                {navigation.map((item) => (
                  <SheetClose
                    key={item.label}
                    render={
                      <Link
                        href={item.href}
                        className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}

                <SheetClose
                  render={
                    <a
                      href="/documents/biswojit_backend_developer.pdf"
                      download
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                    />
                  }
                >
                  <Download className="size-5 text-primary" />
                  Download Resume
                </SheetClose>
              </nav>

              <div className="mt-auto border-t p-4">
                <SheetClose
                  render={
                    <Link
                      href="/#contact"
                      className="flex h-11 w-full items-center justify-center rounded-xl bg-primary px-5 font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    />
                  }
                >
                  Let&apos;s work together
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}