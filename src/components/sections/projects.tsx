import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { projectsRevision } from "@/sanity/lib/projects-revision";
import { ContentRefresh } from "@/components/providers/content-refresh";
import { ProjectsContent, type Project, type ProjectsSection } from "./projects-content";

export async function Projects() {
  const data = await client.fetch<{ section: ProjectsSection | null; projects: Project[] }>(PROJECTS_QUERY, {}, {
    perspective: "published",
    useCdn: false,
    cache: "no-store",
  });

  return (
    <>
      <ContentRefresh section="projects" initialRevision={projectsRevision(data)} />
      {data.section && <ProjectsContent section={data.section} projects={data.projects} />}
    </>
  );
}
