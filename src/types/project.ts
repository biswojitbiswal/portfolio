export type ProjectStatus =
  | "Production"
  | "Development"
  | "Completed";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;
  role: string;
  description: string;
  image: string;
  imageAlt: string;
  technologies: string[];
  highlights: string[];
  caseStudyHref: string;
  liveSiteHref?: string;
};