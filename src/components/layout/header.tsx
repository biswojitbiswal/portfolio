import { client } from "@/sanity/lib/client";
import { HEADER_QUERY } from "@/sanity/lib/queries";
import { ContentRefresh } from "@/components/providers/content-refresh";
import { HeaderContent, type HeaderData } from "./header-content";

export async function Header() {
  const data = await client.fetch<HeaderData | null>(HEADER_QUERY, {}, {
    perspective: "published",
    useCdn: false,
    cache: "no-store",
  });

  return (
    <>
      <ContentRefresh section="header" initialRevision={data ? data._id + ":" + data._rev : null} />
      {data && <HeaderContent data={data} />}
    </>
  );
}
