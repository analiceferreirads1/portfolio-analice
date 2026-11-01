import Image from 'next/image';
import { Tag } from '@/components/ui/Tag';
import { H, siteW } from '@/lib/site';

export function About() {
  return (
    <section id="sobre" className="ct" style={{ ...siteW, padding: 'clamp(64px,10vw,96px) clamp(20px,5vw,40px)', display: 'grid', gridTemplateColumns: 'minmax(0,400px) minmax(0,1fr)', gap: 64, alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 400, aspectRatio: '5 / 6', borderRadius: 16, overflow: 'hidden' }}>
        <Image src="/photos/analice-perfil-grafite.png" alt="Retrato de Analice Ferreira" fill sizes="(max-width: 860px) 100vw, 400px" style={{ objectFit: 'cover' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <span className="af-eyebrow">Sobre</span>
        <h2 style={H(44)}>Visão de negócio. Mão na tecnologia.</h2>
        <p style={{ font: 'var(--type-body-lg)', color: 'var(--fg-1)' }}>Sou Analice Ferreira, AI Automation Engineer.</p>
        <p style={{ font: 'var(--type-body)', color: 'var(--fg-2)' }}>Minha trajetória começou nos negócios, com vendas, processos e desenvolvimento comercial. Foi nesse contexto que aprendi a olhar além das tarefas: entender o problema, identificar oportunidades e buscar formas melhores de fazer as coisas.</p>
        <p style={{ font: 'var(--type-body)', color: 'var(--fg-2)' }}>Hoje, levo essa visão para a tecnologia. Construo aplicações, agentes de IA e automações combinando ferramentas, integrações e inteligência artificial para transformar problemas reais em soluções práticas.</p>
        <p style={{ font: 'var(--type-body)', color: 'var(--fg-2)' }}>Também compartilho o que construo e aprendo, mostrando como a IA pode sair do campo das possibilidades e ganhar aplicação no dia a dia.</p>
        <p style={{ font: '600 18px/1.5 var(--font-sans)', color: 'var(--fg-1)', paddingLeft: 16, borderLeft: '3px solid var(--accent)' }}>Meu foco é simples: entender o problema, construir a solução e demonstrar o que a tecnologia pode fazer.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag icon="workflow">n8n</Tag><Tag icon="sparkles">claude</Tag><Tag icon="bot">agentes</Tag><Tag icon="webhook">apis</Tag><Tag icon="database">dados</Tag>
        </div>
      </div>
    </section>
  );
}
