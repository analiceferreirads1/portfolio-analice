'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Icon, type IconName } from '@/components/ui/Icon';

const N8N_GREEN = '#35B86A';
const SI = (n: string, c: string) => `/icons/${n}-${c}.svg`;

const rrPath = (x: number, y: number, w: number, h: number, r: number) =>
  `M ${x} ${y + h / 2} V ${y + r} Q ${x} ${y} ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x + r} Q ${x} ${y + h} ${x} ${y + h - r} Z`;
const dPath = (x: number, y: number, w: number, h: number, r: number) => {
  const R = h / 2;
  return `M ${x} ${y + R} A ${R} ${R} 0 0 1 ${x + R} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x + R} A ${R} ${R} 0 0 1 ${x} ${y + R} Z`;
};
const cPath = (cx: number, cy: number, r: number) =>
  `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`;

type Tool = { cx: number; t: string; t2: string; m?: string; icon?: string; lucide?: IconName; o: number };
type BoxKey = 'trigger' | 'agent' | 'reply';

const WF = {
  w: 760,
  h: 470,
  boxes: { trigger: [24, 40, 84, 84, 'd'], agent: [196, 40, 236, 84, 'r'], reply: [530, 40, 84, 84, 'r'] } as Record<BoxKey, [number, number, number, number, 'd' | 'r']>,
  tools: [
    { cx: 56, t: 'Claude', t2: 'Chat Model', icon: SI('anthropic', 'F4F3EE'), o: 0 },
    { cx: 186, t: 'Remember the', t2: 'conversation', lucide: 'database', o: 1 },
    { cx: 316, t: 'Read pricing', t2: 'and FAQ', m: 'search: page', icon: SI('notion', 'F4F3EE'), o: 2 },
    { cx: 446, t: 'Book a', t2: 'demo call', m: 'create: event', icon: SI('googlecalendar', '4285F4'), o: 2 },
    { cx: 576, t: 'Hand off to', t2: 'sales rep', m: 'post: message', lucide: 'slack', o: 2 },
    { cx: 706, t: 'Update lead', t2: 'in HubSpot', m: 'upsert: contact', icon: SI('hubspot', 'FF7A59'), o: 2 },
  ] as Tool[],
  cy: 318,
  r: 32,
  ports: [[236, 124, 'Chat Model'], [314, 124, 'Memory'], [392, 124, 'Tool']] as [number, number, string][],
};
const MAIN = ['M 108 82 C 150 82, 154 82, 196 82', 'M 432 82 C 480 82, 482 82, 530 82'];
const SUBS = WF.tools.map((tl) => {
  const [ox, oy] = WF.ports[tl.o];
  const ty = WF.cy - WF.r;
  return `M ${ox} ${oy + 26} C ${ox} ${oy + 90}, ${tl.cx} ${ty - 70}, ${tl.cx} ${ty}`;
});

// Linha do tempo: node 520ms, linha 420ms, círculo 480ms, ~8s + 2s de pausa
const WF_D = { node: 520, line: 420, circle: 480, hold: 2000 };
const WF_SEG = (() => {
  const seg: { k: string; s: number; d: number }[] = [];
  let t = 0;
  const add = (k: string, d: number) => { seg.push({ k, s: t, d }); t += d; };
  add('trigger', WF_D.node); add('m0', WF_D.line); add('agent', WF_D.node);
  WF.tools.forEach((_, i) => { add('s' + i, WF_D.line); add('c' + i, WF_D.circle); });
  add('m1', WF_D.line); add('reply', WF_D.node);
  return { seg, total: t + WF_D.hold };
})();

export function LiveWorkflow({ maxWidth = 760 }: { maxWidth?: number }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setT(WF_SEG.total - 1); return; }
    let raf = 0;
    const t0 = performance.now();
    const loop = (now: number) => { setT((now - t0) % WF_SEG.total); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const P: Record<string, number> = {};
  const END: Record<string, number> = {};
  WF_SEG.seg.forEach((g) => { P[g.k] = Math.max(0, Math.min(1, (t - g.s) / g.d)); END[g.k] = g.s + g.d; });
  const showCheck = (k: string) => t >= END[k];
  const ease = (p: number) => 1 - Math.pow(1 - p, 2);
  const G = { stroke: N8N_GREEN, fill: 'none', strokeLinecap: 'round' as const, style: { filter: 'drop-shadow(0 0 4px rgba(53,184,106,.6))' } };
  const prog = (k: string, d: string, w = 2.5) =>
    P[k] <= 0 || P[k] >= 1 ? null : <path d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - ease(P[k])} strokeWidth={w} {...G} />;
  const check = (x: number, y: number, k: string) =>
    showCheck(k) ? <path d={`M ${x - 5} ${y} l 3.5 3.5 l 7 -7`} fill="none" stroke={N8N_GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /> : null;
  const txt = { fontFamily: 'var(--font-sans)', fill: '#E3E0D5' };
  const mono = { fontFamily: 'var(--font-mono)', fill: '#8F8B80' };
  const NODE = { fill: '#262523', stroke: '#3E3C38', strokeWidth: 1.5 };
  const box = (k: BoxKey, extra: ReactNode) => {
    const [x, y, w, h, sh] = WF.boxes[k];
    const d = sh === 'd' ? dPath(x, y, w, h, 10) : rrPath(x, y, w, h, 10);
    return <g key={k}><path d={d} {...NODE} />{extra}{prog(k, d)}{check(x + w - 14, y + h - 14, k)}</g>;
  };
  const icon = (href: string, x: number, y: number, sz: number) => <image href={href} x={x} y={y} width={sz} height={sz} />;
  const dot = (x: number, y: number) => <circle cx={x} cy={y} r="4" fill="#6B6860" />;

  return (
    <div style={{ width: '100%', maxWidth, margin: '0 auto' }}>
      <svg viewBox={`0 0 ${WF.w} ${WF.h}`} width="100%" role="img" aria-label="Workflow no n8n: agente de IA que qualifica e responde leads no WhatsApp" style={{ display: 'block', overflow: 'visible' }}>
        {MAIN.map((d, i) => <path key={'mb' + i} d={d} stroke="#55534D" strokeWidth="1.5" fill="none" />)}
        {SUBS.map((d, i) => <path key={'sb' + i} d={d} stroke="#55534D" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />)}
        {MAIN.map((d, i) => <g key={'mp' + i}>{prog('m' + i, d)}</g>)}
        {SUBS.map((d, i) => <g key={'sp' + i}>{prog('s' + i, d, 2.2)}</g>)}
        {box('trigger', icon(SI('whatsapp', '25D366'), 48, 64, 40))}
        {box('agent', (
          <g>
            <svg x="214" y="63" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#F4F3EE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
            </svg>
            <text x="264" y="78" style={txt} fontSize="17" fontWeight="600">AI Agent</text>
            <text x="264" y="99" style={mono} fontSize="13">Qualify and answer lead</text>
          </g>
        ))}
        {box('reply', icon(SI('whatsapp', '25D366'), 552, 62, 40))}
        {dot(108, 82)}{dot(196, 82)}{dot(432, 82)}{dot(530, 82)}{dot(614, 82)}
        <text x="66" y="150" textAnchor="middle" style={txt} fontSize="15">New message</text>
        <text x="572" y="150" textAnchor="middle" style={txt} fontSize="15">Reply on WhatsApp</text>
        <text x="572" y="169" textAnchor="middle" style={mono} fontSize="12.5">message: send</text>
        {WF.ports.map(([x, y, l]) => (
          <g key={l}>
            <rect x={x - 4.5} y={y - 4.5} width="9" height="9" transform={`rotate(45 ${x} ${y})`} fill="#6B6860" />
            <text x={x} y={y + 22} textAnchor="middle" style={mono} fontSize="12.5">{l}</text>
          </g>
        ))}
        {WF.tools.map((tl, i) => (
          <g key={'t' + i}>
            <circle cx={tl.cx} cy={WF.cy} r={WF.r} {...NODE} />
            {tl.icon ? icon(tl.icon, tl.cx - 15, WF.cy - 15, 30) : tl.lucide && <Icon name={tl.lucide} size={28} color="#F4F3EE" strokeWidth={1.6} x={tl.cx - 14} y={WF.cy - 14} />}
            {prog('c' + i, cPath(tl.cx, WF.cy, WF.r))}
            {check(tl.cx + 24, WF.cy + 24, 'c' + i)}
            <text x={tl.cx} y={WF.cy + 58} textAnchor="middle" style={txt} fontSize="14.5">{tl.t}</text>
            <text x={tl.cx} y={WF.cy + 77} textAnchor="middle" style={txt} fontSize="14.5">{tl.t2}</text>
            {tl.m && <text x={tl.cx} y={WF.cy + 96} textAnchor="middle" style={mono} fontSize="12">{tl.m}</text>}
          </g>
        ))}
      </svg>
    </div>
  );
}
