'use client';

import { Icon, type IconName } from './Icon';
import { IconButton } from './IconButton';

const T: Record<'success' | 'warning' | 'danger', [IconName, string]> = {
  success: ['circle-check', '#6BC28F'],
  warning: ['triangle-alert', 'var(--amarelo-300)'],
  danger: ['circle-x', '#E57A6E'],
};

type ToastProps = { tone: keyof typeof T; title: string; description: string; onClose: () => void };

export function Toast({ tone, title, description, onClose }: ToastProps) {
  const t = T[tone];
  return (
    <div role={tone === 'danger' ? 'alert' : 'status'} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, width: 360, maxWidth: '100%', padding: '14px 14px 14px 16px', background: 'var(--bg-inverse)', color: 'var(--fg-inverse)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--grafite-700)', boxShadow: 'var(--shadow-inverse)', fontFamily: 'var(--font-sans)' }}>
      <Icon name={t[0]} size={18} color={t[1]} style={{ marginTop: 1 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{title}</span>
        <span style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--fg-inverse-2)' }}>{description}</span>
      </div>
      <IconButton icon="x" label="Fechar" size="sm" variant="inverse" onClick={onClose} style={{ width: 24, height: 24, marginTop: -2 }} />
    </div>
  );
}
