import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Capabilities />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
}
