'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { scrollToId, siteW } from '@/lib/site';
import { Lockup } from './Lockup';

const NAV = [['O que faço', 'servicos'], ['Projetos', 'projetos'], ['Como construo', 'metodo'], ['Sobre', 'sobre'], ['FAQ', 'faq']] as const;

export function SiteNav() {
  const [act, setAct] = useState('');
  const [menu, setMenu] = useState(false);
  const toContact = () => scrollToId('contato');

  useEffect(() => {
    const els = NAV.map(([, id]) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) setAct(e.target.id); }); }, { rootMargin: '-45% 0px -50% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

    // Menu aberto: foco no primeiro link; Esc fecha e devolve o foco ao botão do menu.
  useEffect(() => {
    if (!menu) return;
    document.querySelector<HTMLElement>('#menu-mobile a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenu(false);
      document.getElementById('menu-toggle')?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menu]);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(244,243,238,.88)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-1)' }}>
      <div style={{ ...siteW, height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Lockup />
        <nav className="nv-desk" aria-label="Principal" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {NAV.map(([l, id]) => (
            <a key={id} href={'#' + id} className={'nv' + (act === id ? ' on' : '')} aria-current={act === id ? 'true' : undefined} style={{ font: '500 14px var(--font-sans)', color: 'var(--fg-2)', textDecoration: 'none', whiteSpace: 'nowrap' }}>{l}</a>
          ))}
          <span className="nv-cta" style={{ display: 'inline-flex' }}><Button size="sm" variant="inverse" onClick={toContact}>Contato</Button></span>
        </nav>
        <span className="nv-mob" style={{ display: 'none' }}>
                    <IconButton id="menu-toggle" aria-controls="menu-mobile" icon={menu ? 'x' : 'menu'} label={menu ? 'Fechar menu' : 'Abrir menu'} size="lg" aria-expanded={menu} onClick={() => setMenu((m) => !m)} />
        </span>
      </div>
      {menu && (
        <nav id="menu-mobile" className="nv-panel" aria-label="Menu" style={{ borderTop: '1px solid var(--border-1)', background: 'var(--bg-canvas)', padding: '8px clamp(20px,5vw,40px) 20px', display: 'flex', flexDirection: 'column' }}>
          {NAV.map(([l, id]) => (
            <a key={id} href={'#' + id} onClick={() => setMenu(false)} style={{ font: '500 17px var(--font-sans)', color: act === id ? 'var(--fg-1)' : 'var(--fg-2)', textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid var(--border-1)' }}>{l}</a>
          ))}
          <div style={{ paddingTop: 16 }}>
            <Button size="lg" variant="inverse" fullWidth onClick={() => { setMenu(false); toContact(); }}>Contato</Button>
          </div>
        </nav>
      )}
    </header>
  );
}
