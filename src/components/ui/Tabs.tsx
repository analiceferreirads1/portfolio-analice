'use client';

import type { KeyboardEvent } from 'react';

export type TabItem<T extends string> = { id: T; label: string };

type TabsProps<T extends string> = { items: TabItem<T>[]; value: T; onChange: (id: T) => void; idPrefix: string };

// Ids compartilhados entre as abas e o painel (aria-controls e aria-labelledby).
export const tabId = (prefix: string, id: string) => `${prefix}-tab-${id}`;
export const panelId = (prefix: string) => `${prefix}-panel`;

export function Tabs<T extends string>({ items, value, onChange, idPrefix }: TabsProps<T>) {
  // Setas, Home e End movem o foco e já selecionam a aba (padrão ARIA com ativação automática).
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = items.findIndex((it) => it.id === value);
    const last = items.length - 1;
    const keys: Record<string, number> = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    onChange(items[next].id);
    document.getElementById(tabId(idPrefix, items[next].id))?.focus();
  };

  return (
    <div role="tablist" onKeyDown={onKeyDown} style={{ display: 'flex', gap: 24, borderBottom: '1px solid var(--border-2)' }}>
      {items.map((it) => {
        const on = it.id === value;
        return (
          <button
            key={it.id}
            id={tabId(idPrefix, it.id)}
            role="tab"
            aria-selected={on}
            aria-controls={panelId(idPrefix)}
            tabIndex={on ? 0 : -1}
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
