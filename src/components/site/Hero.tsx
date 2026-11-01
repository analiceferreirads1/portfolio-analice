'use client';

import { Button } from '@/components/ui/Button';
import { H, scrollToId, siteW } from '@/lib/site';
import { LiveWorkflow } from './LiveWorkflow';

export function Hero() {
  return (
    <section id="top" className="af-canvas-inverse" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--grafite-700)' }}>
      <div className="ct" style={{ ...siteW, display: 'grid', gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)', gap: 48, alignItems: 'center', padding: 'clamp(40px,8vw,64px) clamp(20px,5vw,40px)' }}>
        <div className="hero-anim" style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'heroIn .8s cubic-bezier(.2,.7,.2,1) both' }}>
          <span className="af-eyebrow" style={{ color: 'var(--grafite-300)' }}>AI Automation Engineer</span>
          <h1 style={H(52, { color: 'var(--areia-50)' })}>Não apenas uso IA. Eu <em style={{ color: '#F0668B' }}>construo</em> com IA.</h1>
          <p style={{ font: 'var(--type-body-lg)', color: 'var(--grafite-300)' }}>Construo aplicações e automações com inteligência artificial, conectando ferramentas, agentes e sistemas para resolver problemas reais.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
            <Button size="lg" iconRight="arrow-right" onClick={() => scrollToId('projetos')}>Ver projetos</Button>
            <Button size="lg" variant="secondary" iconRight="arrow-down" onClick={() => scrollToId('contato')}>Fale comigo</Button>
          </div>
        </div>
        <div className="hero-anim" style={{ minWidth: 0, animation: 'heroIn .9s .2s cubic-bezier(.2,.7,.2,1) both' }}><LiveWorkflow /></div>
      </div>
    </section>
  );
}
