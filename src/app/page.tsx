import { About } from '@/components/site/About';
import { Contact } from '@/components/site/Contact';
import { Differentials } from '@/components/site/Differentials';
import { Faq } from '@/components/site/Faq';
import { Hero } from '@/components/site/Hero';
import { Method } from '@/components/site/Method';
import { Projects } from '@/components/site/Projects';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteNav } from '@/components/site/SiteNav';
import { WhatsAppFab } from '@/components/site/WhatsAppFab';

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Differentials />
        <Projects />
        <Method />
        <About />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
