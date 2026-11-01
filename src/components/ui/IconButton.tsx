'use client';

import { useState, type ButtonHTMLAttributes, type CSSProperties } from 'react';
import { Icon, type IconName } from './Icon';

const SZ = { sm: [32, 16], md: [40, 18], lg: [48, 20] } as const;
const V = {
  ghost: ['transparent', 'var(--bg-hover)', 'var(--fg-2)', 'transparent'],
  inverse: ['var(--bg-inverse)', 'var(--grafite-700)', 'var(--fg-inverse)', 'transparent'],
};

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  icon: IconName;
  label: string;
  variant?: keyof typeof V;
  size?: keyof typeof SZ;
  style?: CSSProperties;
};

export function IconButton({ icon, label, variant = 'ghost', size = 'md', disabled = false, style, ...rest }: IconButtonProps) {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);
  const s = SZ[size];
  const v = V[variant];
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => { setH(false); setP(false); }}
      onMouseDown={() => setP(true)}
      onMouseUp={() => setP(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: s[0], height: s[0], padding: 0,
        borderRadius: 'var(--radius-md)', border: '1px solid ' + v[3], background: h && !disabled ? v[1] : v[0],
        color: h && variant === 'ghost' ? 'var(--fg-1)' : v[2], cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1, transform: p && !disabled ? 'scale(.96)' : 'none',
        transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast)', ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={s[1]} />
    </button>
  );
}
