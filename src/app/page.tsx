import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Hero } from "@/components/sections/hero";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function Home() {
  return (
      <main>
        <Hero />
        <About />
        <Capabilities />
      </main>
  );
}

function ButtonPreview() {
  return (
    <button className="mt-6 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground">
      Primary button
    </button>
  );
}