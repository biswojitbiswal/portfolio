import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Biswojit Biswal — Backend Developer",
    template: "%s | Biswojit Biswal",
  },
  description: "Backend Developer building scalable APIs and production-ready systems using Node.js, NestJS, TypeScript, PostgreSQL, MongoDB, and Redis.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange storageKey="portfolio-theme">
          <TooltipProvider delay={300}>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
