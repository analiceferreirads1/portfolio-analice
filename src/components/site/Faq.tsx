import { Icon } from '@/components/ui/Icon';
import { H, siteW } from '@/lib/site';

const FAQS = [
  ['O que é o n8n?', 'Uma ferramenta para montar automações conectando aplicativos, APIs e IA em um fluxo visual. É onde eu desenho e coloco para rodar boa parte dos workflows.'],
  ['Preciso trocar as ferramentas que já uso?', 'Normalmente não. O caminho mais comum é conectar o que já existe, como planilhas, CRM e e-mail, e automatizar entre eles.'],
  ['Onde a IA realmente faz sentido?', 'Em tarefas que exigem ler, classificar, resumir ou responder com base em contexto. Para regras fixas, uma automação simples costuma resolver melhor.'],
  ['Como funciona um projeto?', 'Entendo o processo, desenho o fluxo, construo e testo com dados reais. No fim, explico o que melhorou, o que ainda não resolve e os próximos passos.'],
  ['E a segurança dos dados?', 'Os dados ficam nas ferramentas que você já controla, com acesso restrito ao necessário. Cada integração é definida com você antes de entrar em uso.'],
];

export function Faq() {
  return (
    <section id="faq" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-1)', borderBottom: '1px solid var(--border-1)' }}>
      <div className="ct" style={{ ...siteW, padding: 'clamp(64px,10vw,96px) clamp(20px,5vw,40px)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)', gap: 64 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="af-eyebrow">FAQ</span>
          <h2 style={H(44)}>Perguntas frequentes.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FAQS.map(([q, a], i) => (
            <details key={q} className="af-faq" open={i === 0} style={{ borderTop: '1px solid var(--border-1)', padding: '20px 0' }}>
              <summary style={{ listStyle: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, font: '600 18px/1.3 var(--font-sans)', color: 'var(--fg-1)' }}>
                {q}<Icon name="plus" size={18} className="af-faq-ic" />
              </summary>
              <p style={{ font: 'var(--type-body)', color: 'var(--fg-2)', marginTop: 12, maxWidth: 620 }}>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
