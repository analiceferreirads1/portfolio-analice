import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const ASSUNTOS = ['Automação para minha empresa', 'Oportunidade de trabalho', 'Conteúdo e parceria', 'Outro'];
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

  // Variáveis só do servidor: a chave secreta nunca vai para o navegador.
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return NextResponse.json({ ok: false, error: 'off' }, { status: 503 });

  // Chaves novas (sb_secret_...) vão só no header apikey; a legada service_role (JWT) também precisa do Bearer.
  const headers: Record<string, string> = { 'Content-Type': 'application/json', apikey: key, Prefer: 'return=minimal' };
  if (!key.startsWith('sb_')) headers.Authorization = `Bearer ${key}`;

  try {
    const r = await fetch(`${url.replace(/\/+$/, '')}/rest/v1/contact_messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: nome, email, subject: assunto || null, message: mensagem, page: str(body.pagina, 500) || null }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) throw new Error(String(r.status));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
  }
}
