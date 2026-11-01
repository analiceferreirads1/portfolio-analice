'use client';

import { IconButton } from '@/components/ui/IconButton';
import { CONTACT, openExternal, siteW } from '@/lib/site';
import { DotTrail } from './DotTrail';
import { Lockup } from './Lockup';

export function SiteFooter() {
  return (
    <footer style={{ background: 'var(--grafite-900)', color: 'var(--fg-inverse-2)' }}>
      <div className="af-canvas-inverse" style={{ position: 'relative', height: 'clamp(240px,45vw,400px)', overflow: 'hidden', borderBottom: '1px solid var(--grafite-700)', cursor: 'crosshair', touchAction: 'pan-y' }}>
        <DotTrail size={14} hold={1200} fade={800} />
      </div>
      <div style={{ ...siteW, padding: '36px clamp(20px,5vw,40px)', display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup inverse />
        <a href={'mailto:' + CONTACT.email} style={{ font: '500 13px var(--font-mono)', color: 'var(--areia-50)', textDecoration: 'none' }}>{CONTACT.email}</a>
        <div style={{ display: 'flex', gap: 8 }}>
          {CONTACT.social.map(([ic, l, u]) => <IconButton key={l} icon={ic} label={l} variant="inverse" onClick={() => openExternal(u)} />)}
        </div>
      </div>
    </footer>
  );
}
