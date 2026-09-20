import { getProjects } from "@/sanity/lib/projects";
import { projectsRevision } from "@/sanity/lib/projects-revision";
import { ContentRefresh } from "@/components/providers/content-refresh";
import { ProjectsExplorer } from "./projects-explorer";

type ProjectsPageProps = {
  searchParams: Promise<{ search?: string | string[]; category?: string | string[]; technology?: string | string[]; project?: string | string[] }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const [params, data] = await Promise.all([searchParams, getProjects()]);
  const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;
  return (
    <main className="min-h-screen bg-background">
      <ContentRefresh section="projects" initialRevision={projectsRevision(data)} />
      <ProjectsExplorer
        key={first(params.project) ?? "all-projects"}
        selectedProjectId={first(params.project)}
        projects={data.projects}
        section={data.section}
        initialSearch={first(params.search) ?? ""}
        initialCategory={first(params.category) ?? "all"}
        initialTechnology={first(params.technology) ?? "all"}
      />
    </main>
  );
}
