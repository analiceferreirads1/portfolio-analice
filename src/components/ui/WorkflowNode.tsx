import type { CSSProperties } from 'react';
import { Icon, type IconName } from './Icon';

const KIND = {
  trigger: { bg: 'var(--argila-50)', fg: 'var(--argila-700)', icon: 'zap' as IconName },
  action: { bg: 'var(--bg-subtle)', fg: 'var(--fg-2)', icon: 'workflow' as IconName },
  ai: { bg: 'var(--coral-50)', fg: 'var(--coral-700)', icon: 'sparkles' as IconName },
};
const STATUS = {
  idle: ['var(--areia-300)', 'Aguardando'],
  running: ['var(--signal)', 'Executando'],
  success: ['var(--success)', 'Concluído'],
};
const RUN = { n8n: ['var(--lima-400)', '166,226,46'], claude: ['var(--argila-500)', '217,119,87'] };

const port = (side: 'left' | 'right', run: boolean): CSSProperties => ({
  position: 'absolute', top: '50%', [side]: -6, width: 11, height: 11, marginTop: -5.5, borderRadius: 99,
  background: run ? 'var(--af-run)' : 'var(--bg-surface)', border: '2px solid ' + (run ? 'var(--af-run)' : 'var(--border-strong)'),
});

type WorkflowNodeProps = {
  kind?: keyof typeof KIND;
  title: string;
  subtitle?: string;
  status?: keyof typeof STATUS;
  runTone?: keyof typeof RUN;
  width?: string | number;
  style?: CSSProperties;
};

export function WorkflowNode({ kind = 'action', title, subtitle, status = 'idle', runTone = 'n8n', width = 248, style }: WorkflowNodeProps) {
  const k = KIND[kind];
  const s = STATUS[status];
  const run = status === 'running';
  const rt = RUN[runTone];
  const vars = { '--af-run': rt[0], '--af-run-rgb': rt[1] } as CSSProperties;
  return (
    <div
      className={run ? 'af-node-anim' : undefined}
      style={{
        position: 'relative', width, background: 'var(--bg-surface)', ...vars,
        border: run ? '1.5px solid var(--af-run)' : '1px solid var(--border-2)', borderRadius: 'var(--radius-lg)',
        boxShadow: run ? '0 0 0 3px rgba(var(--af-run-rgb),.25), var(--shadow-1)' : 'var(--shadow-1)', padding: 12,
        display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-sans)', overflow: 'visible',
        animation: run ? 'afNodeGlow 1.6s ease-in-out infinite' : 'none', ...style,
      }}
    >
      {run && (
        <span style={{ position: 'absolute', left: 12, right: 12, bottom: -1, height: 2, borderRadius: 2, overflow: 'hidden' }}>
          <span className="af-node-anim" style={{ display: 'block', width: '40%', height: '100%', background: 'var(--af-run)', borderRadius: 2, animation: 'afNodeBar 1.2s cubic-bezier(.4,0,.2,1) infinite' }} />
        </span>
      )}
      {kind !== 'trigger' && <span style={port('left', run)} />}
      <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: k.bg, color: k.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={k.icon} size={20} />
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0, flex: 1 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', lineHeight: 1.2 }}>
          <span className={run ? 'af-node-anim' : undefined} style={{ width: 6, height: 6, borderRadius: 99, background: run ? 'var(--af-run)' : s[0], flexShrink: 0, animation: run ? 'afNodeDot 1s ease-in-out infinite' : 'none' }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{subtitle || s[1]}</span>
        </span>
      </span>
      <span style={port('right', run)} />
    </div>
  );
}
