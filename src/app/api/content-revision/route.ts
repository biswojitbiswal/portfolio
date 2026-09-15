import { client } from "@/sanity/lib/client";
import { ABOUT_REVISION_QUERY, CAPABILITIES_REVISION_QUERY, EXPERIENCE_REVISION_QUERY, HERO_REVISION_QUERY } from "@/sanity/lib/queries";

export async function GET(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  const section = new URL(request.url).searchParams.get("section") ?? "hero";
  if (section !== "hero" && section !== "about" && section !== "capabilities" && section !== "experience") {
    return Response.json({ error: "Unknown content section" }, { status: 400, headers });
  }
  try {
    const document = await client.fetch<{ _id: string; _rev: string } | null>(
      section === "experience" ? EXPERIENCE_REVISION_QUERY : section === "capabilities" ? CAPABILITIES_REVISION_QUERY : section === "about" ? ABOUT_REVISION_QUERY : HERO_REVISION_QUERY,
      {},
      { perspective: "published", useCdn: false, cache: "no-store", timeout: 8_000 },
    );
    return Response.json({ revision: document ? document._id + ":" + document._rev : null }, { headers });
  } catch {
    return Response.json({ error: "Content check temporarily unavailable" }, { status: 503, headers });
  }
}
