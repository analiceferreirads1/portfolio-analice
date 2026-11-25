'use client';

import Image from 'next/image';
import type { CSSProperties, MouseEvent } from 'react';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { H, siteW } from '@/lib/site';

type Project = { t: string; p: string; problem: string; result: string; img: string; alt: string; href?: string };

// Projetos reais: problema, resultado, print e link para o código.
const PROJECTS: Project[] = [
  {
    t: 'Extração de notas fiscais com IA',
    p: 'IA + Automação',
    problem: 'A digitação manual de NFS-e leva cerca de 10 minutos por nota, e erros em valor ou CNPJ só aparecem na conciliação.',
    result: 'Pipeline em cascata: regras determinísticas extraem os campos e a IA preenche apenas os que ficaram vazios. Na avaliação, 100% de acerto por campo, zero valores incorretos e 29% menos tokens do que usar só a IA.',
    img: '/projects/nfse-extraction-eval.png',
    alt: 'Resultado da avaliação: linha de base com 50% de acerto; IA e cascata com 100%, com a cascata usando menos tokens.',
    href: 'https://github.com/analiceferreirads1/nfse-extraction',
  },
  {
    t: 'Site profissional de ponta a ponta',
    p: 'Desenvolvimento Web',
    problem: 'Um site que só é bonito não basta: ele precisa ser encontrado no Google, funcionar para todas as pessoas, carregar rápido e proteger os dados de quem entra em contato.',
    result: 'Next.js na Vercel com formulário gravando no Supabase pelo servidor (RLS, privilégio mínimo e chaves fora do navegador), CSP e proteção contra abuso validadas em produção, SEO técnico com sitemap, URL canônica e dados estruturados sem erros, além de ajustes de acessibilidade e performance. Cada decisão está documentada em ADRs e cada mudança está ligada a uma issue.',
    img: '/projects/portfolio-schema-validator.png',
    alt: 'Validador do schema.org mostrando os dados estruturados do site sem erros e sem avisos.',
    href: 'https://github.com/analiceferreirads1/portfolio-analice',
  },
];

const label: CSSProperties = { font: '500 11px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--argila-400)' };
const text: CSSProperties = { font: 'var(--type-body-sm)', color: 'var(--fg-inverse-2)' };

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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 20 }}>
          {PROJECTS.map((p) => (
                        <Card key={p.t} variant="inverse" padding="lg" className="prj" onMouseMove={trackMouse} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span className="prj-bd" />
              <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--grafite-700)' }}>
                <Image src={p.img} alt={p.alt} fill sizes="(max-width: 900px) 100vw, 560px" style={{ objectFit: 'cover', objectPosition: 'top left' }} />
              </div>
              <span className="prj-tag" style={{ position: 'relative', font: '500 11px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--grafite-300)' }}>{p.p}</span>
              <h3 style={H(22, { position: 'relative', color: 'var(--areia-50)' })}>{p.t}</h3>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={label}>Problema</span>
                <p style={text}>{p.problem}</p>
              </div>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={label}>Resultado</span>
                <p style={text}>{p.result}</p>
              </div>
              {p.href && (
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="prj-link">
                  Ver o código no GitHub <Icon name="arrow-up-right" size={16} />
                </a>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
