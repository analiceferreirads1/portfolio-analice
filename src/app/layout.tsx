import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CONTACT, SITE_URL } from '@/lib/site';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--nf-display', display: 'swap' });
const sans = Hanken_Grotesk({ subsets: ['latin'], variable: '--nf-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--nf-mono', display: 'swap' });

const title = 'Analice Ferreira | AI Automation Engineer';
const description = 'Não apenas uso IA. Eu construo com IA. Aplicações, agentes de IA e automações com n8n que resolvem problemas reais.';

// Dados estruturados (schema.org): dizem aos buscadores quem é a pessoa e qual serviço oferece.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Analice Ferreira',
      jobTitle: 'AI Automation Engineer',
      url: SITE_URL,
      sameAs: CONTACT.social.map(([, , url]) => url),
    },
    {
      '@type': 'ProfessionalService',
      name: title,
      description,
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      founder: { '@id': `${SITE_URL}/#person` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
<body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        {children}
      </body>
    </html>
  );
}
