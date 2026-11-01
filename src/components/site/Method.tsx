'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { WorkflowNode } from '@/components/ui/WorkflowNode';
import { H, siteW } from '@/lib/site';

const STEPS = {
  dor: { n: '01', t: 'Entender o problema', d: 'Começo pela dor e pelo processo real: quem faz, quanto se repete, onde trava. Não automatizo algo só porque é possível.', items: ['Mapear o processo', 'Definir entrada e saída', 'Escolher a ferramenta'], kind: 'trigger' },
  construir: { n: '02', t: 'Construir e testar', d: 'Monto o workflow com n8n, agentes e integrações, e testo com dados reais antes de chamar de solução.', items: ['Workflow no n8n', 'Agente com Claude', 'Testes com dados reais'], kind: 'ai' },
  documentar: { n: '03', t: 'Validar e documentar', d: 'Explico o que melhorou, o que não resolve e os riscos. Diferencio protótipo, demonstração e produção.', items: ['Diagrama do fluxo', 'Limitações conhecidas', 'Próximos passos'], kind: 'action' },
} as const;

type StepId = keyof typeof STEPS;
const TABS: { id: StepId; label: string }[] = [
  { id: 'dor', label: '01 · Problema' },
  { id: 'construir', label: '02 · Construção' },
  { id: 'documentar', label: '03 · Validação' },
];

export function Method() {
  const [tab, setTab] = useState<StepId>('dor');
  const s = STEPS[tab];
  return (
    <section id="metodo" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-1)' }}>
      <div style={{ ...siteW, padding: 'clamp(64px,10vw,96px) clamp(20px,5vw,40px)', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 640 }}>
          <span className="af-eyebrow">Como construo</span>
          <h2 style={H(44)}>Da ideia ao workflow.</h2>
        </div>
        <div style={{ overflowX: 'auto', scrollbarWidth: 'none', margin: '0 -4px', padding: '0 4px' }}>
          <div style={{ minWidth: 'max-content' }}><Tabs items={TABS} value={tab} onChange={setTab} /></div>
        </div>
        <div className="ct" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 48, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={{ font: '600 clamp(44px,8vw,64px)/1 var(--font-mono)', color: 'var(--coral-200)' }}>{s.n}</span>
            <h3 style={H(32)}>{s.t}</h3>
            <p style={{ font: 'var(--type-body-lg)', color: 'var(--fg-2)' }}>{s.d}</p>
          </div>
          <Card variant="canvas" padding="md" style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            {s.items.map((it, i) => (
              <WorkflowNode
                key={it}
                kind={s.kind}
                title={it}
                runTone="claude"
                status={i === 0 ? 'success' : i === 1 ? 'running' : 'idle'}
                subtitle={`etapa ${s.n}.${i + 1}`}
                width={`min(320px, calc(100% - ${i * 20}px))`}
                style={{ marginLeft: i * 20 }}
              />
            ))}
          </Card>
        </div>
      </div>
    </section>
  );
}
