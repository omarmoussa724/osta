import { RotateCcw } from 'lucide-react';

const STEPS = [
  { n: '01', name: 'Engineering', sub: 'CAD, DFM, drawings, BOM / MTO' },
  { n: '02', name: 'Material', sub: 'Availability, reservation, shortage, traceability' },
  { n: '03', name: 'Manufacturing Data', sub: 'Part numbers, routing, operations, work orders' },
  { n: '04', name: 'Capacity', sub: 'Machines, internal capacity, supplier capacity' },
  { n: '05', name: 'Outsourcing', sub: 'RFQ, supplier selection, PO, dispatch, receipt' },
  { n: '06', name: 'Production', sub: 'Cutting, bending, welding, machining, coating' },
  { n: '07', name: 'Quality', sub: 'In-process QC, final dimension QC, NDT, documentation' },
  { n: '08', name: 'Assembly & Delivery', sub: 'Assembly readiness, documentation, delivery' },
  { n: '09', name: 'Intelligence', sub: 'Cost, time, quality, supplier and capacity performance' },
];

export function Loop() {
  return (
    <section className="mkt-section alt" id="loop">
      <div className="mkt-shell">
        <div className="mkt-center" style={{ marginBottom: 48 }}>
          <h2 className="mkt-h2 mkt-mx-auto">From design intent to delivered product.</h2>
          <p className="mkt-lead center mkt-mx-auto">The OSTA loop — every step captures data the next step depends on.</p>
        </div>
        <div className="mkt-loop-grid">
          {STEPS.map((s) => (
            <div className="mkt-loop-card" key={s.n}>
              <div className="mkt-loop-num">{s.n}</div>
              <div className="mkt-loop-name">{s.name}</div>
              <div className="mkt-loop-sub">{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="mkt-loop-foot">
          <RotateCcw/>
          <span>Intelligence feeds back into engineering &amp; planning — the loop closes.</span>
        </div>
      </div>
    </section>
  );
}
