import type { Project } from "@/types/project";
import { ProjectsExplorer } from "./projects-explorer";

type ProjectsPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    technology?: string;
    page?: string;
  }>;
};



export const projects: Project[] = [
  {
    id: "edusphere",
    slug: "edusphere",
    title: "EduSphere",
    category: "EdTech",
    status: "Production",
    role: "Backend Developer",
    description:
      "A full-stack EdTech platform with course management, role-based workflows, secure payments, assignments and scheduled notifications.",
    image: "/images/projects/edusphere.webp",
    imageAlt: "EduSphere learning platform interface",
    technologies: [
      "Node.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
    ],
    highlights: [
      "Built scalable REST APIs for courses, users, assignments and payment workflows.",
      "Implemented secure authentication, authorization and scheduled notification systems.",
    ],
    caseStudyHref: "/projects/edusphere",
    liveSiteHref: "https://your-edusphere-site.com",
  },
  {
    id: "blink-brand-solutions",
    slug: "blink-brand-solutions",
    title: "Blink Brand Solutions",
    category: "CMS",
    status: "Production",
    role: "Backend Developer",
    description:
      "A custom CMS-powered corporate website with dynamic content management, enquiries, case studies, newsletters and SEO-focused publishing.",
    image: "/images/projects/blink-brand-solutions.webp",
    imageAlt: "Blink Brand Solutions website interface",
    technologies: [
      "Node.js",
      "NestJS",
      "TypeScript",
      "MongoDB",
      "Prisma",
      "Redis",
      "BullMQ",
    ],
    highlights: [
      "Developed flexible content APIs for pages, services, case studies, news and events.",
      "Improved performance using Redis caching and background job processing.",
    ],
    caseStudyHref: "/projects/blink-brand-solutions",
    liveSiteHref: "https://blinkbrandsolutions.com",
  },
  {
    id: "dalala",
    slug: "dalala",
    title: "Dalala",
    category: "Real Estate",
    status: "Production",
    role: "Backend Developer",
    description:
      "A real estate platform with role-based dashboards, property listings, advanced search, real-time chat and mobile push notifications.",
    image: "/images/projects/dalala.webp",
    imageAlt: "Dalala real estate platform interface",
    technologies: [
      "Node.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "WebSockets",
    ],
    highlights: [
      "Designed scalable property listing, search and filtering APIs.",
      "Implemented real-time chat, push notifications and search activity analytics.",
    ],
    caseStudyHref: "/projects/dalala",
    liveSiteHref: "https://your-dalala-site.com",
  },
  {
    id: "leather-world-news",
    slug: "leather-world-news",
    title: "Leather World News",
    category: "Publishing",
    status: "Production",
    role: "Backend Developer",
    description:
      "A content-rich publishing platform with article management, categories, newsletter subscriptions and SEO-friendly content delivery.",
    image: "/images/projects/leather-world-news.webp",
    imageAlt: "Leather World News publishing platform",
    technologies: [
      "Node.js",
      "NestJS",
      "TypeScript",
      "MongoDB",
      "Next.js",
      "SEO",
    ],
    highlights: [
      "Built content-management and publishing APIs for articles and categories.",
      "Implemented newsletter subscription and SEO-focused content workflows.",
    ],
    caseStudyHref: "/projects/leather-world-news",
    liveSiteHref: "https://your-leather-world-news-site.com",
  },
];

function getPageNumber(value?: string) {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-background">
      <ProjectsExplorer
        projects={projects}
        initialSearch={params.search ?? ""}
        initialCategory={params.category ?? "all"}
        initialTechnology={params.technology ?? "all"}
        initialPage={getPageNumber(params.page)}
      />
    </main>
  );
}