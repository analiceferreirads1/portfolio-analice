import { NextResponse } from 'next/server';
import { ASSUNTOS } from '@/lib/contact';
import { getSupabase } from '@/lib/supabase';

export const runtime = 'nodejs';

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const MAX_BYTES = 16 * 1024;
const tooLarge = () => NextResponse.json({ ok: false, error: 'too_large' }, { status: 413 });

// Mesmo site = o host do Origin é igual ao host que recebeu o pedido (vale para produção, preview e localhost).
const isSameOrigin = (origin: string, host: string | null) => {
  try {
    return host !== null && new URL(origin).host === host;
  } catch {
    return false;
  }
};

export async function POST(req: Request) {
  // Navegadores sempre enviam Origin: outro site é recusado. Sem Origin (curl, scripts) segue para as demais validações.
  const origin = req.headers.get('origin');
  if (origin && !isSameOrigin(origin, req.headers.get('host'))) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }

  // Content-Length é declarado por quem envia: barra cedo os honestos; o tamanho real é medido logo abaixo.
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BYTES) return tooLarge();

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (new TextEncoder().encode(raw).length > MAX_BYTES) return tooLarge();
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) throw new Error('not an object');
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Honeypot: bots preenchem; responde como sucesso sem encaminhar nada.
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const nome = str(body.nome, 120);
  const email = str(body.email, 200);
  const assunto = str(body.assunto, 80);
  const mensagem = str(body.mensagem, 4000);
  if (!nome || !mensagem || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || (assunto && !ASSUNTOS.includes(assunto))) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

    const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ ok: false, error: 'off' }, { status: 503 });

  try {
    const r = await fetch(`${supabase.restUrl}/contact_messages`, {
      method: 'POST',
      headers: { ...supabase.headers, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ name: nome, email, subject: assunto || null, message: mensagem, page: str(body.pagina, 500) || null }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) throw new Error(String(r.status));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
  }
}
