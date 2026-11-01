'use client';

import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Fields';
import { Toast } from '@/components/ui/Toast';
import { CONTACT, H, openExternal, siteW } from '@/lib/site';

type ToastState = false | 'ok' | 'err' | 'off';

const taStyle: CSSProperties = { width: '100%', minHeight: 120, resize: 'vertical', padding: '10px 12px', font: 'var(--type-body)', color: 'var(--fg-1)', background: 'var(--bg-surface)', border: '1px solid var(--border-2)', borderRadius: 'var(--radius-md)' };

export function Contact() {
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<ToastState>(false);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(false), 6000);
    return () => clearTimeout(id);
  }, [toast]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setBusy(true);
    try {
      const r = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, pagina: window.location.href }),
      });
      if (r.status === 503) { setToast('off'); return; } // webhook não configurado: não simula envio
      if (!r.ok) throw new Error(String(r.status));
      setToast('ok');
      form.reset();
    } catch {
      setToast('err');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="contato" style={{ ...siteW, padding: 'clamp(64px,10vw,96px) clamp(20px,5vw,40px)' }}>
      <div className="ct" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span className="af-eyebrow">Contato</span>
          <h2 style={H(44)}>Vamos conversar sobre o que você quer construir.</h2>
          <p style={{ font: 'var(--type-body-lg)', color: 'var(--fg-2)', maxWidth: 480 }}>Conte a dor, a ideia ou a oportunidade. Respondo com o que dá para construir e o que não dá.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Button size="lg" iconLeft="message-circle" onClick={() => openExternal(CONTACT.wa)}>Falar no WhatsApp</Button>
          </div>
        </div>
        <Card padding="lg" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={H(22)}>Envie uma mensagem</h3>
            <Input label="Nome" name="nome" placeholder="Seu nome" required maxLength={120} />
            <Input label="E-mail" name="email" type="email" placeholder="voce@empresa.com" iconLeft="mail" required maxLength={200} />
            <Select label="Assunto" name="assunto" placeholder="Selecione" defaultValue="" options={['Automação para minha empresa', 'Oportunidade de trabalho', 'Conteúdo e parceria', 'Outro']} />
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, font: '500 13px var(--font-sans)', color: 'var(--fg-1)' }}>
              Mensagem
              <textarea className="af-ta" name="mensagem" required maxLength={4000} placeholder="Descreva o processo, a dor ou a ideia." style={taStyle} />
            </label>
            {/* Honeypot anti-spam: invisível para pessoas, preenchido por bots */}
            <div className="af-hp" aria-hidden="true"><label>Não preencha<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <Button type="submit" size="lg" iconRight="send" disabled={busy}>{busy ? 'Enviando…' : 'Enviar mensagem'}</Button>
          </form>
        </Card>
      </div>
      {toast && (
        <div style={{ position: 'fixed', right: 24, bottom: 92, zIndex: 1100, maxWidth: 'calc(100vw - 48px)' }}>
          {toast === 'off' ? (
            <Toast tone="warning" title="Formulário indisponível no momento" description={`Fale comigo pelo WhatsApp ou pelo e-mail ${CONTACT.email}.`} onClose={() => setToast(false)} />
          ) : toast === 'err' ? (
            <Toast tone="danger" title="Não foi possível enviar" description="Tente de novo ou fale pelo WhatsApp." onClose={() => setToast(false)} />
          ) : (
            <Toast tone="success" title="Mensagem enviada" description="Obrigada. Respondo em breve." onClose={() => setToast(false)} />
          )}
        </div>
      )}
    </section>
  );
}
