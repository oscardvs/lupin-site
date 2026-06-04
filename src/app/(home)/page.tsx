import {
  Demos,
  Features,
  FinalCTA,
  Hardware,
  Hero,
  Highlights,
  Problem,
  StatStrip,
  SystemFlow,
  Team,
} from '@/components/landing/sections';
import { SiteFooter } from '@/components/site-footer';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <StatStrip />
      <Problem />
      <Features />
      <SystemFlow />
      <Demos />
      <Hardware />
      <Highlights />
      <Team />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}
