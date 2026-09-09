import { Hero } from "@/components/sections/hero";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function Home() {
  return (
    // <main className="min-h-screen bg-background p-6 text-foreground sm:p-12">
      <main>
        <Hero />
      </main>
    // </main>
  );
}

function ButtonPreview() {
  return (
    <button className="mt-6 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground">
      Primary button
    </button>
  );
}