import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

export function Tag({ icon, children }: { icon?: IconName; children: ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 9px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-2)', background: 'var(--bg-surface)', color: 'var(--fg-2)', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, lineHeight: 1, whiteSpace: 'nowrap' }}>
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  );
}
