// fetch now feed

import { getCollection } from "astro:content";

const allPosts = await getCollection("posts");
const isActive = (val: unknown) => {
  if (val === null || val === undefined) return true;
  if (typeof val === "boolean") return val;
  if (typeof val === "number") return val !== 0;
  if (typeof val === "string") {
    const v = String(val).trim().toLowerCase();
    if (v === "false" || v === "0") return false;
    return true;
  }
  return true;
};
const nowPosts = allPosts?.filter(post => post.data.category === "now" && isActive(post.data.active)).sort(
  (blogEntryA, blogEntryB) =>
    (blogEntryB.data.pubDate || new Date()).getTime() -
    (blogEntryA.data.pubDate || new Date()).getTime()
);

export async function GET({params, request}: {params: any, request: any}) {
  return new Response(
    JSON.stringify(nowPosts)
  )
}