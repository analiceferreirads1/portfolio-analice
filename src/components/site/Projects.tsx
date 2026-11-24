'use client';

import type { MouseEvent } from 'react';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { H, siteW } from '@/lib/site';

// Projetos de exemplo, sem links (pendência: projetos reais).
type Project = { t: string; p: string; d: string; href?: string };
const PROJECTS: Project[] = [
  { t: 'SDR Virtual com IA', p: 'IA + Automação', d: 'Atende e qualifica leads automaticamente, para o time comercial falar com quem está pronto para conversar.' },
  { t: 'Cadência comercial automatizada', p: 'Automação n8n', d: 'Acompanha cada lead no tempo certo, sem depender de lembrete manual ou planilha.' },
  { t: 'IA e automação para o jurídico', p: 'IA + Automação', d: 'Organiza documentos e demandas e tira tarefas operacionais da equipe, que fica com a análise.' },
  { t: 'Automação para RH', p: 'IA + Automação', d: 'Recebe, organiza e acompanha candidatos, acelerando a triagem no recrutamento.' },
];

const trackMouse = (e: MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', e.clientX - r.left + 'px');
  el.style.setProperty('--my', e.clientY - r.top + 'px');
};

export function Projects() {
  return (
    <section id="projetos" className="af-canvas-inverse" style={{ color: 'var(--fg-inverse)' }}>
      <div style={{ ...siteW, padding: 'clamp(64px,10vw,96px) clamp(20px,5vw,40px)', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 680 }}>
          <span className="af-eyebrow" style={{ color: 'var(--argila-400)' }}>Projetos</span>
          <h2 style={H(44, { color: 'var(--areia-50)' })}>Menos demonstração mágica. Mais solução funcionando.</h2>
          <p style={{ font: 'var(--type-body-lg)', color: 'var(--grafite-300)' }}>Cada projeto começou com um problema específico de uma área do negócio.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
          {PROJECTS.map((p) => (
            <Card key={p.t} variant="inverse" padding="lg" className="prj" onMouseMove={trackMouse} style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 220 }}>
              <span className="prj-bd" />
              {p.href && <span className="prj-go"><Icon name="arrow-up-right" size={16} /></span>}
              <span className="prj-tag" style={{ position: 'relative', font: '500 11px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--grafite-300)' }}>{p.p}</span>
              <h3 style={H(22, { position: 'relative', color: 'var(--areia-50)', paddingRight: 40 })}>{p.t}</h3>
              <p style={{ position: 'relative', font: 'var(--type-body-sm)', color: 'var(--fg-inverse-2)' }}>{p.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
