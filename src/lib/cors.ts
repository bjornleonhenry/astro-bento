export const ALLOWED_ORIGINS = new Set([
  'https://github.com',
  'https://avatars.githubusercontent.com',
]);

export function getCorsHeaders(request: Request) {
  const origin = request.headers.get('origin') ?? '';
  // If origin is allowed, echo it; otherwise return a safe default (no CORS)
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

export function corsOptionsResponse(request: Request) {
  const headers = getCorsHeaders(request);
  return new Response(null, { status: 204, headers });
}
