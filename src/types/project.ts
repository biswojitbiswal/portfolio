export type ProjectStatus =
  | "Production"
  | "Development"
  | "Completed";

export type Project = {
  id: string;
  _rev: string;
  href: string;
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus | null;
  role: string;
  description: string;
  image: string | null;
  imageAlt: string | null;
  technologies: string[];
  highlights: string[];
  caseStudyHref: string;
  liveSiteHref?: string | null;
};