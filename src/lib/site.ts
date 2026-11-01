import type { CSSProperties } from 'react';

export const siteW: CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,40px)', boxSizing: 'border-box' };

/** Títulos fluidos: acima de 26px o tamanho encolhe com a viewport (h1 52px → ~34px em 390px). */
export const H = (size: number, extra?: CSSProperties): CSSProperties => ({
  font: size > 26
    ? `600 clamp(${Math.round(size * 0.66)}px, ${(size / 14).toFixed(2)}vw + 12px, ${size}px)/1.08 var(--font-display)`
    : `600 ${size}px/1.15 var(--font-display)`,
  letterSpacing: '-0.035em',
  ...extra,
});

export const CONTACT = {
  email: 'contato@analiceferreira.com.br',
  wa: 'https://wa.me/5511939443029?text=' + encodeURIComponent('Olá, Analice! Vim pelo seu site e gostaria de conversar.'),
  social: [
    ['linkedin', 'LinkedIn', 'https://www.linkedin.com/in/analiceferreirads/'],
    ['instagram', 'Instagram', 'https://www.instagram.com/analiceferreira_tech/'],
  ] as const,
};

/** Rola até a seção descontando a altura do header sticky (68px). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: 'smooth' });
}

export const openExternal = (u: string) => window.open(u, '_blank', 'noopener');
