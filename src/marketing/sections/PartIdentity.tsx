import { ChevronRight } from 'lucide-react';

const STAGES = ['Engineering', 'BOM', 'Material', 'Nesting', 'Production', 'Outsourcing', 'QC', 'Assembly'];

export function PartIdentity() {
  return (
    <section className="mkt-section" id="identity">
      <div className="mkt-center" style={{ marginBottom: 44 }}>
        <h2 className="mkt-h2 mkt-mx-auto">One Part Number. One Manufacturing Identity.</h2>
      </div>
      <div className="mkt-shell mkt-pid">
        <div className="mkt-pid-badge">P-001245</div>
        <div className="mkt-pid-desc">Side Plate · S235JR 6 mm · the same record, every step</div>
        <div className="mkt-pid-row">
          {STAGES.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="mkt-pid-stage">
                <span className="dot" />
                <span>{s}</span>
              </div>
              {i < STAGES.length - 1 ? <ChevronRight size={14} color="var(--ink-4)" /> : null}
            </div>
          ))}
        </div>
        <div className="mkt-callout center" style={{ marginTop: 12 }}>
          <p>The part does not become a different object every time it moves between departments.</p>
          <p style={{ color: 'var(--ink-2)', fontWeight: 450, fontSize: 14 }}>
            OSTA preserves its identity throughout the manufacturing lifecycle.
          </p>
        </div>
      </div>
    </section>
  );
}
