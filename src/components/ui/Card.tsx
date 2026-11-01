import type { CSSProperties, HTMLAttributes } from 'react';

const VAR: Record<string, CSSProperties & { bc: string }> = {
  surface: { background: 'var(--bg-surface)', bc: 'var(--border-1)', boxShadow: 'var(--shadow-1)', color: 'var(--fg-1)' },
  inverse: { background: 'var(--bg-inverse)', bc: 'var(--grafite-700)', boxShadow: 'none', color: 'var(--fg-inverse)' },
  canvas: { backgroundColor: 'var(--bg-canvas)', backgroundImage: 'var(--pattern-dots)', backgroundSize: 'var(--pattern-dots-size)', bc: 'var(--border-2)', boxShadow: 'none', color: 'var(--fg-1)' },
};
const PAD = { sm: 16, md: 24, lg: 32 };

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof VAR;
  padding?: keyof typeof PAD;
};

export function Card({ variant = 'surface', padding = 'md', children, style, ...rest }: CardProps) {
  const { bc, ...vs } = VAR[variant];
  return (
    <div
      style={{
        ...vs, border: '1px solid ' + bc, borderRadius: 'var(--radius-lg)', padding: PAD[padding],
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
