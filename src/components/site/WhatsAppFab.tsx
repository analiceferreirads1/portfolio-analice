'use client';

import { CONTACT } from '@/lib/site';

export function WhatsAppFab() {
  return (
    <a
      href={CONTACT.wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
      className="af-fab"
      style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1000, width: 60, height: 60, borderRadius: 99, border: 0, cursor: 'pointer', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/whatsapp-ffffff.svg" width="32" height="32" alt="" />
    </a>
  );
}
