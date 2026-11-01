import { Card } from '@/components/ui/Card';
import { Icon, type IconName } from '@/components/ui/Icon';
import { H, siteW } from '@/lib/site';

const DIFS: [IconName, string, string][] = [
  ['layout-dashboard', 'Sistemas e aplicações web', 'Aplicações sob medida para organizar informações e tarefas que ferramentas prontas não atendem bem.'],
  ['bot', 'Agentes de IA', 'Agentes que leem, classificam, resumem e respondem, com regras claras e revisão humana onde precisa.'],
  ['workflow', 'Automações com n8n', 'Fluxos que tiram o trabalho repetitivo das pessoas e mantêm cada etapa andando sozinha.'],
  ['webhook', 'APIs e integrações', 'Sistemas, planilhas e plataformas conversando entre si, sem copiar e colar dados.'],
];

export function Differentials() {
  return (
    <section id="servicos" style={{ ...siteW, padding: '0 clamp(20px,5vw,40px) clamp(64px,10vw,96px)', display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 680, paddingTop: 'clamp(64px,10vw,96px)' }}>
        <span className="af-eyebrow">O que eu faço</span>
        <h2 style={H(44)}>Tecnologia que se adapta ao processo, não o contrário.</h2>
        <p style={{ font: 'var(--type-body-lg)', color: 'var(--fg-2)' }}>Cada solução pode ser uma aplicação, uma automação, uma integração, IA ou uma combinação delas. O problema decide.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
        {DIFS.map(([ic, t, d]) => (
          <Card key={t} padding="lg" className="dif" style={{ display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
            <span className="dif-ic" style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-accent)' }}><Icon name={ic} size={20} /></span>
            <h3 style={H(22)}>{t}</h3>
            <p style={{ font: 'var(--type-body-sm)', color: 'var(--fg-2)' }}>{d}</p>
            <span className="dif-ln" />
          </Card>
        ))}
      </div>
    </section>
  );
}
