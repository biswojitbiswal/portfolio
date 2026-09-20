import { getProjects } from "@/sanity/lib/projects";
import { projectsRevision } from "@/sanity/lib/projects-revision";
import { ContentRefresh } from "@/components/providers/content-refresh";
import { ProjectsContent } from "./projects-content";

export async function Projects() {
  const data = await getProjects();

  return (
    <>
      <ContentRefresh section="projects" initialRevision={projectsRevision(data)} />
      {data.section && <ProjectsContent section={data.section} projects={data.projects.slice(0, 4)} />}
    </>
  );
}
