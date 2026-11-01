'use client';

export type TabItem<T extends string> = { id: T; label: string };

export function Tabs<T extends string>({ items, value, onChange }: { items: TabItem<T>[]; value: T; onChange: (id: T) => void }) {
  return (
    <div role="tablist" style={{ display: 'flex', gap: 24, borderBottom: '1px solid var(--border-2)' }}>
      {items.map((it) => {
        const on = it.id === value;
        return (
          <button
            key={it.id}
            role="tab"
            aria-selected={on}
            type="button"
            onClick={() => onChange(it.id)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: 0, marginBottom: -1, border: 0, borderBottom: '2px solid ' + (on ? 'var(--accent)' : 'transparent'), background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: on ? 600 : 500, color: on ? 'var(--fg-1)' : 'var(--fg-3)', cursor: 'pointer', transition: 'color var(--dur-fast), background var(--dur-fast)' }}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
