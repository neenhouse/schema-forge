export interface Env {
  DB: D1Database
  SCHEMA_VERSIONS: KVNamespace
  REVIEW_SESSION: DurableObjectNamespace
  ENVIRONMENT: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    // API routes
    if (url.pathname.startsWith('/api/')) {
      return handleApiRequest(url, request, env)
    }

    // Fall through to static assets (handled by Cloudflare Pages)
    return new Response('Not Found', { status: 404 })
  },
}

async function handleApiRequest(
  url: URL,
  _request: Request,
  _env: Env,
): Promise<Response> {
  if (url.pathname === '/api/health') {
    return Response.json({ status: 'ok', timestamp: new Date().toISOString() })
  }

  return Response.json({ error: 'Not Found' }, { status: 404 })
}

// Durable Object stub for team review sessions
export class ReviewSession {
  constructor(private state: DurableObjectState, private env: Env) {}

  async fetch(_request: Request): Promise<Response> {
    return Response.json({ status: 'review session active' })
  }
}
