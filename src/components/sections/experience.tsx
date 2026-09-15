import { client } from "@/sanity/lib/client";
import { EXPERIENCE_QUERY } from "@/sanity/lib/queries";
import { ContentRefresh } from "@/components/providers/content-refresh";
import { ExperienceContent, type ExperienceData } from "./experience-content";

export async function Experience() {
  const data = await client.fetch<ExperienceData | null>(EXPERIENCE_QUERY, {}, {
    perspective: "published",
    useCdn: false,
    cache: "no-store",
  });

  return (
    <>
      <ContentRefresh section="experience" initialRevision={data ? data._id + ":" + data._rev : null} />
      {data && <ExperienceContent data={data} />}
    </>
  );
}
