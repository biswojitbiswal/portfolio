import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Capabilities />
      <Experience />
      <Projects />
    </main>
  );
}
