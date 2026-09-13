import { ArrowUpDown } from 'lucide-react';

export function Layer() {
  return (
    <section className="mkt-section" id="platform">
      <div className="mkt-shell">
        <div className="mkt-center" style={{ marginBottom: 48 }}>
          <h2 className="mkt-h2 mkt-mx-auto">One operational layer across the physical manufacturing flow.</h2>
        </div>

        <div className="mkt-layer-stack">
          <div className="mkt-layer">
            <div className="lname">Enterprise ERP</div>
            <div className="lsub">SAP · Oracle · other enterprise systems</div>
          </div>
          <div className="mkt-layer-link">
            <ArrowUpDown size={16}/>
            <span>API / Integration</span>
          </div>
          <div className="mkt-layer osta">
            <div className="lname">OSTA</div>
            <div className="lsub">Manufacturing Operations Layer</div>
          </div>
          <div className="mkt-layer-link">
            <ArrowUpDown size={16}/>
            <span>Capacity &amp; Execution</span>
          </div>
          <div className="mkt-layer">
            <div className="lname">Physical Manufacturing</div>
            <div className="lsub">Factories · suppliers · subcontractors</div>
          </div>
        </div>

        <div className="mkt-layer-notes">
          <div className="mkt-layer-note">ERP systems manage enterprise transactions &mdash; orders, finance, procurement.</div>
          <div className="mkt-layer-note">Factories provide machines, people and physical capacity.</div>
          <div className="mkt-layer-note">OSTA connects the manufacturing intelligence between them.</div>
        </div>

        <div className="mkt-callout center">
          <p>OSTA does not need to replace your ERP.</p>
          <p style={{ color: 'var(--ink-2)', fontWeight: 450, fontSize: 14 }}>OSTA complements the systems you already use.</p>
        </div>
      </div>
    </section>
  );
}
