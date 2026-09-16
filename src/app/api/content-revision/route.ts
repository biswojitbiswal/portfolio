import { projectsRevision } from "@/sanity/lib/projects-revision";
import { client } from "@/sanity/lib/client";
import { ABOUT_REVISION_QUERY, CAPABILITIES_REVISION_QUERY, CONTACT_REVISION_QUERY, EDUCATION_REVISION_QUERY, EXPERIENCE_REVISION_QUERY, FOOTER_REVISION_QUERY, HEADER_REVISION_QUERY, HERO_REVISION_QUERY, PROJECTS_REVISION_QUERY, SKILLS_REVISION_QUERY } from "@/sanity/lib/queries";

export async function GET(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  const section = new URL(request.url).searchParams.get("section") ?? "hero";
  if (section !== "hero" && section !== "about" && section !== "capabilities" && section !== "experience" && section !== "projects" && section !== "skills" && section !== "education" && section !== "contact" && section !== "footer" && section !== "header") {
    return Response.json({ error: "Unknown content section" }, { status: 400, headers });
  }
  try {
    if (section === "projects") {
      const data = await client.fetch<Parameters<typeof projectsRevision>[0]>(PROJECTS_REVISION_QUERY, {}, {
        perspective: "published", useCdn: false, cache: "no-store", timeout: 8_000,
      });
      return Response.json({ revision: projectsRevision(data) }, { headers });
    }
    const document = await client.fetch<{ _id: string; _rev: string } | null>(
      section === "header" ? HEADER_REVISION_QUERY : section === "footer" ? FOOTER_REVISION_QUERY : section === "contact" ? CONTACT_REVISION_QUERY : section === "education" ? EDUCATION_REVISION_QUERY : section === "skills" ? SKILLS_REVISION_QUERY : section === "experience" ? EXPERIENCE_REVISION_QUERY : section === "capabilities" ? CAPABILITIES_REVISION_QUERY : section === "about" ? ABOUT_REVISION_QUERY : HERO_REVISION_QUERY,
      {},
      { perspective: "published", useCdn: false, cache: "no-store", timeout: 8_000 },
    );
    return Response.json({ revision: document ? document._id + ":" + document._rev : null }, { headers });
  } catch {
    return Response.json({ error: "Content check temporarily unavailable" }, { status: 503, headers });
  }
}
