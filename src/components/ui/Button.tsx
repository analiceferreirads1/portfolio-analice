'use client';

import { useState, type ButtonHTMLAttributes, type CSSProperties } from 'react';
import { Icon, type IconName } from './Icon';

const SIZES = {
  sm: { h: 32, px: 12, fs: 13, gap: 6, ic: 15 },
  md: { h: 40, px: 16, fs: 14, gap: 8, ic: 16 },
  lg: { h: 48, px: 22, fs: 16, gap: 10, ic: 18 },
};
const V = {
  primary: ['var(--accent)', 'var(--accent-hover)', 'var(--accent-press)', 'var(--fg-on-accent)', 'transparent'],
  secondary: ['var(--bg-surface)', 'var(--bg-raised)', 'var(--bg-subtle)', 'var(--fg-1)', 'var(--border-2)'],
  inverse: ['var(--bg-inverse)', 'var(--grafite-700)', 'var(--grafite-600)', 'var(--fg-inverse)', 'transparent'],
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof V;
  size?: keyof typeof SIZES;
  iconLeft?: IconName;
  iconRight?: IconName;
  fullWidth?: boolean;
  style?: CSSProperties;
};

export function Button({
  variant = 'primary', size = 'md', iconLeft, iconRight, disabled = false, fullWidth = false,
  type = 'button', children, style, ...rest
}: ButtonProps) {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);
  const s = SIZES[size];
  const v = V[variant];
  const bg = disabled ? v[0] : p ? v[2] : h ? v[1] : v[0];
  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => { setH(false); setP(false); }}
      onMouseDown={() => setP(true)}
      onMouseUp={() => setP(false)}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex', width: fullWidth ? '100%' : undefined, alignItems: 'center',
        justifyContent: 'center', gap: s.gap, height: s.h, padding: '0 ' + s.px + 'px', fontFamily: 'var(--font-sans)',
        fontSize: s.fs, fontWeight: 600, letterSpacing: '-0.005em', lineHeight: 1, color: v[3], background: bg,
        border: '1px solid ' + (variant === 'secondary' && h && !disabled ? 'var(--border-strong)' : v[4]),
        borderRadius: 'var(--radius-md)', boxShadow: variant === 'secondary' ? 'var(--shadow-1)' : 'none',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
        transform: p && !disabled ? 'translateY(1px)' : 'none',
        transition: 'background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast), transform var(--dur-fast)',
        whiteSpace: 'nowrap', ...style,
      }}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size={s.ic} />}{children}{iconRight && <Icon name={iconRight} size={s.ic} />}
    </button>
  );
}
