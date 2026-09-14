// Optional cached-fetch integration. The portfolio uses ContentRefresh with uncached SSR.
import { defineLive } from "next-sanity/live";
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});
