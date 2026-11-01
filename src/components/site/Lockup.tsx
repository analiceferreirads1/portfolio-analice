export function Lockup({ inverse = false, sub = true }: { inverse?: boolean; sub?: boolean }) {
  return (
    <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={inverse ? '/logo-inverse.svg' : '/logo.svg'} width="36" height="24" alt="" />
      <span style={{ font: '600 19px/1 var(--font-display)', letterSpacing: '-0.035em', color: inverse ? 'var(--areia-50)' : 'var(--fg-1)', whiteSpace: 'nowrap' }}>Analice Ferreira</span>
      {sub && <span className="af-lockup-sub" style={{ font: '500 12px var(--font-mono)', color: inverse ? 'var(--grafite-300)' : 'var(--fg-2)', whiteSpace: 'nowrap' }}>| AI Automation Engineer</span>}
    </a>
  );
}
