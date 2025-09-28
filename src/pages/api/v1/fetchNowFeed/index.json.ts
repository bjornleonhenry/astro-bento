// fetch now feed

import { getCollection } from "astro:content";

const allPosts = await getCollection("posts");
const nowPosts = allPosts?.filter(post => post.data.category === "now").sort(
  (blogEntryA, blogEntryB) =>
    (blogEntryB.data.pubDate || new Date()).getTime() -
    (blogEntryA.data.pubDate || new Date()).getTime()
);

export async function GET({params, request}: {params: any, request: any}) {
  return new Response(
    JSON.stringify(nowPosts)
  )
}