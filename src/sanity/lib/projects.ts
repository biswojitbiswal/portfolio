import { client } from "./client";
import { PROJECTS_QUERY } from "./queries";
import type { Project } from "@/types/project";
import type { ProjectsSection } from "@/components/sections/projects-content";

export function getProjects() {
  return client.fetch<{ section: ProjectsSection | null; projects: Project[] }>(PROJECTS_QUERY, {}, {
    perspective: "published",
    useCdn: false,
    cache: "no-store",
  });
}
