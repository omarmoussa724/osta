import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';

export function FinalCta() {
  return (
    <section className="mkt-section mkt-final last" id="contact">
      <div className="mkt-shell">
        <h2 className="mkt-h1 mkt-mx-auto" style={{ maxWidth: '18ch' }}>
          Build the operational layer that understands how engineered parts become
          physical products.
        </h2>
        <p className="mkt-lead center mkt-mx-auto">OSTA — Manufacturing Operations, Engineering &amp; Outsourcing.</p>
        <div className="mkt-btn-row" style={{ justifyContent: 'center', marginTop: 28 }}>
          <a href="mailto:omarmoussa724@gmail.com?subject=OSTA%20%E2%80%94%20Start%20a%20conversation" className="mkt-btn primary">
            <MessageSquare/>Start a Conversation
          </a>
          <Link to="/" className="mkt-btn">Explore the Platform<ArrowRight/></Link>
        </div>
        <p className="mkt-final-tag">Where Skill Meets System.</p>
      </div>
    </section>
  );
}
