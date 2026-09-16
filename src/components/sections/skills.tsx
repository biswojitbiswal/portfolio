import { client } from "@/sanity/lib/client";
import { SKILLS_QUERY } from "@/sanity/lib/queries";
import { ContentRefresh } from "@/components/providers/content-refresh";
import { SkillsContent, type SkillsData } from "./skills-content";

export async function Skills() {
  const data = await client.fetch<SkillsData | null>(SKILLS_QUERY, {}, {
    perspective: "published",
    useCdn: false,
    cache: "no-store",
  });

  return (
    <>
      <ContentRefresh section="skills" initialRevision={data ? data._id + ":" + data._rev : null} />
      {data && <SkillsContent data={data} />}
    </>
  );
}
