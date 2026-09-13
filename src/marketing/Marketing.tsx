import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './marketing.css';
import { Hero } from './sections/Hero';
import { Problem } from './sections/Problem';
import { DashboardProof } from './sections/DashboardProof';
import { Layer } from './sections/Layer';
import { Loop } from './sections/Loop';
import { FollowThePart } from './sections/FollowThePart';
import { PartIdentity } from './sections/PartIdentity';
import { QualityGate } from './sections/QualityGate';
import { AsAService } from './sections/AsAService';
import { Outcomes } from './sections/Outcomes';
import { Collage } from './sections/Collage';
import { Future } from './sections/Future';
import { FinalCta } from './sections/FinalCta';

const NAV_LINKS = [
  { id: 'problem', label: 'Problem' },
  { id: 'platform', label: 'Platform' },
  { id: 'product', label: 'Product' },
  { id: 'service', label: 'Service' },
  { id: 'contact', label: 'Contact' },
];

/**
 * The app runs on a HashRouter (routes live in window.location.hash), so a plain
 * href="#id" anchor would be swallowed by the router instead of scrolling. This
 * scrolls to the target section directly and never touches the URL hash.
 */
function SectionLink({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      {children}
    </a>
  );
}

export function Marketing() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'OSTA — Manufacturing Operations, Engineering & Outsourcing';
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="mkt">
      <header className="mkt-nav">
        <div className="mkt-nav-inner">
          <Link to="/marketing" className="mkt-brand">
            <span className="mark">O</span>
            <span><b>OSTA</b><span>Fabrication OS</span></span>
          </Link>
          <nav className="mkt-navlinks">
            {NAV_LINKS.map((l) => <SectionLink key={l.id} id={l.id}>{l.label}</SectionLink>)}
          </nav>
          <div className="mkt-nav-cta">
            <Link to="/" className="mkt-btn primary" style={{ padding: '8px 14px', fontSize: 12.5 }}>
              Explore OSTA<ArrowRight size={14}/>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Hero/>
        <Problem/>
        <DashboardProof/>
        <Layer/>
        <Loop/>
        <FollowThePart/>
        <PartIdentity/>
        <QualityGate/>
        <AsAService/>
        <Outcomes/>
        <Collage/>
        <Future/>
        <FinalCta/>
      </main>

      <footer className="mkt-footer">
        <div className="mkt-shell mkt-footer-row">
          <span className="mkt-footer-copy">OSTA — Operations System Assistant. Manufacturing operations MVP.</span>
          <div className="mkt-footer-links">
            <Link to="/">Product</Link>
            <SectionLink id="problem">Problem</SectionLink>
            <SectionLink id="service">Service</SectionLink>
            <a href="mailto:omarmoussa724@gmail.com">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
