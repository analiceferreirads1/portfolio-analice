import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const ASSUNTOS = ['Automação para minha empresa', 'Oportunidade de trabalho', 'Conteúdo e parceria', 'Outro'];
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
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

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ ok: false, error: 'off' }, { status: 503 });

  try {
    const r = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, assunto, mensagem, origem: 'site', pagina: str(body.pagina, 500), enviado_em: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) throw new Error(String(r.status));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
  }
}
