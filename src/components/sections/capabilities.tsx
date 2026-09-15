import { client } from "@/sanity/lib/client";
import { CAPABILITIES_QUERY } from "@/sanity/lib/queries";
import { ContentRefresh } from "@/components/providers/content-refresh";
import { CapabilitiesContent, type CapabilitiesData } from "./capabilities-content";

export async function Capabilities() {
  const data = await client.fetch<CapabilitiesData | null>(CAPABILITIES_QUERY, {}, {
    perspective: "published",
    useCdn: false,
    cache: "no-store",
  });

  return (
    <>
      <ContentRefresh section="capabilities" initialRevision={data ? data._id + ":" + data._rev : null} />
      {data && <CapabilitiesContent data={data} />}
    </>
  );
}
