'use client';

import { useId, useState, type CSSProperties, type InputHTMLAttributes, type SelectHTMLAttributes } from 'react';
import { Icon, type IconName } from './Icon';

const labelStyle: CSSProperties = { fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--fg-1)' };

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label?: string; iconLeft?: IconName };

export function Input({ label, iconLeft, id, ...rest }: InputProps) {
  const [f, setF] = useState(false);
  const auto = useId();
  const iid = id || auto;
  return (
    <label htmlFor={iid} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <span style={labelStyle}>{label}</span>}
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, height: 40, padding: '0 12px', background: 'var(--bg-surface)', border: '1px solid ' + (f ? 'var(--accent)' : 'var(--border-2)'), borderRadius: 'var(--radius-md)', boxShadow: f ? 'var(--ring-focus)' : 'none', color: 'var(--fg-3)', transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)' }}>
        {iconLeft && <Icon name={iconLeft} size={16} />}
        <input id={iid} onFocus={() => setF(true)} onBlur={() => setF(false)} style={{ flex: 1, minWidth: 0, height: '100%', border: 0, outline: 'none', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--fg-1)' }} {...rest} />
      </span>
    </label>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { label?: string; options: string[]; placeholder?: string };

export function Select({ label, options, placeholder, id, ...rest }: SelectProps) {
  const [f, setF] = useState(false);
  const auto = useId();
  const iid = id || auto;
  return (
    <label htmlFor={iid} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <span style={labelStyle}>{label}</span>}
      <span style={{ position: 'relative', display: 'flex' }}>
        <select id={iid} onFocus={() => setF(true)} onBlur={() => setF(false)} style={{ appearance: 'none', WebkitAppearance: 'none', width: '100%', height: 40, padding: '0 36px 0 12px', fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--fg-1)', background: 'var(--bg-surface)', border: '1px solid ' + (f ? 'var(--accent)' : 'var(--border-2)'), borderRadius: 'var(--radius-md)', boxShadow: f ? 'var(--ring-focus)' : 'none', outline: 'none', cursor: 'pointer' }} {...rest}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <Icon name="chevron-down" size={16} color="var(--fg-3)" style={{ position: 'absolute', right: 12, top: '50%', marginTop: -8, pointerEvents: 'none' }} />
      </span>
    </label>
  );
}
