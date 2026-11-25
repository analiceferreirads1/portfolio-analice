import type { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) return Response.json({ ok: false, error: 'off' }, { status: 503 });

  try {
    const r = await fetch(`${supabase.restUrl}/contact_messages?select=id&limit=1`, {
      headers: supabase.headers,
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) throw new Error(String(r.status));
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: 'upstream' }, { status: 502 });
  }
}
