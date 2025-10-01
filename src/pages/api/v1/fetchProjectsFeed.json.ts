// fetch now feed

import { getCollection } from "astro:content";

const ALLOWED_ORIGINS = new Set([
  'https://github.com',
  'https://avatars.githubusercontent.com',
]);

function getCorsHeaders(request: Request) {
  const origin = request.headers.get('origin') ?? '';
  if (ALLOWED_ORIGINS.has(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    } as Record<string, string>;
  }
  return {};
}

function corsOptionsResponse(request: Request) {
  const headers = getCorsHeaders(request);
  return new Response(null, { status: 204, headers });
}

export async function OPTIONS({ request }: { params: any; request: any }) {
  return corsOptionsResponse(request as Request);
}

export async function GET({ params, request }: { params: any; request: any }) {
  try {
    try {
      const ua = request?.headers?.get ? request.headers.get('user-agent') : undefined;
      const origin = request?.headers?.get ? request.headers.get('origin') : undefined;
      console.log('fetchProjectsFeed GET called - ua:', ua, 'origin:', origin);
    } catch (e) {
      console.warn('Could not log request headers for fetchProjectsFeed', e);
    }
    const allPosts = await getCollection("posts");
    const url = new URL(request.url);
    const featuredOnly = url.searchParams.get('featured') === 'true';

    const nowPosts = allPosts
      ?.filter((post: any) =>
        post.data.category === "projects" && post.data.active !== false
      )
      .filter((post: any) => (featuredOnly ? post.data.featured === true : true))
      .sort(
        (blogEntryA: any, blogEntryB: any) =>
          (blogEntryB.data.pubDate || new Date()).getTime() -
          (blogEntryA.data.pubDate || new Date()).getTime()
      );

    console.log('fetchProjectsFeed returning', Array.isArray(nowPosts) ? nowPosts.length : 0, 'items');
    const headers = {
      'Content-Type': 'application/json',
      ...getCorsHeaders(request as Request),
    } as Record<string, string>;
    return new Response(JSON.stringify(nowPosts), { status: 200, headers });
  } catch (err) {
    console.error('Error in fetchProjectsFeed GET:', err);
    const headers = {
      'Content-Type': 'application/json',
      ...getCorsHeaders(request as Request),
    } as Record<string, string>;
    return new Response(JSON.stringify([]), { status: 200, headers });
  }
}