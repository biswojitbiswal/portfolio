import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { connection } from "next/server";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.biswojit.site/#website",
  url: "https://www.biswojit.site/",
  name: "Biswojit Biswal",
  alternateName: "Biswojit Biswal Portfolio",
  about: { "@id": "https://www.biswojit.site/#person" },
};

export default async function Home() {
  await connection();
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c") }} />
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
