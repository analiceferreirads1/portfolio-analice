import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return Response.json({ ok: false, error: 'off' }, { status: 503 });

  const headers: Record<string, string> = { apikey: key };
  if (!key.startsWith('sb_')) headers.Authorization = `Bearer ${key}`;

  try {
    const r = await fetch(`${url.replace(/\/+$/, '')}/rest/v1/contact_messages?select=id&limit=1`, {
      headers,
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) throw new Error(String(r.status));
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: 'upstream' }, { status: 502 });
  }
}