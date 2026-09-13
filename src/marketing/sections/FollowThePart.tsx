import { ArrowRight } from 'lucide-react';

const STEPS: { title: string; img: string; q: string; a: string }[] = [
  { title: 'Project', img: '/screenshots/project-detail.webp', q: 'What are we building?', a: 'PRJ-26001 · Industrial Conveyor, with real phase progress.' },
  { title: 'Assembly', img: '/screenshots/assembly.webp', q: 'What sub-unit does it belong to?', a: 'ASM-001.1 · Main Structure — the parts it contains and their state.' },
  { title: 'Part', img: '/screenshots/part-detail.webp', q: 'Where is this part in its lifecycle?', a: 'P-001245 · Side Plate — blocked at Material Reserved, with the reason.' },
  { title: 'BOM', img: '/screenshots/bom.webp', q: 'What does this assembly require?', a: 'The full Project → Assembly → Part structure, status rolled up.' },
  { title: 'Material', img: '/screenshots/materials.webp', q: 'Can we actually manufacture it?', a: 'Availability, reservation and shortage for the exact grade and thickness.' },
  { title: 'Nesting', img: '/screenshots/nesting.webp', q: 'How efficiently can we cut it?', a: 'Sheet layout and utilisation for the material this part is cut from.' },
  { title: 'Production', img: '/screenshots/production.webp', q: 'Where is it physically?', a: 'The live shop-floor board — ready, running, blocked or complete.' },
  { title: 'Outsourcing', img: '/screenshots/outsourcing.webp', q: 'Who is manufacturing it?', a: 'The subcontracted order, supplier and delivery state for this part.' },
  { title: 'QC', img: '/screenshots/qc.webp', q: 'Can it move forward?', a: 'Final dimensional QC — the gate before the part is ready for assembly.' },
];

export function FollowThePart() {
  return (
    <section className="mkt-section alt" id="part">
      <div className="mkt-shell">
        <div className="mkt-head-row">
          <div>
            <h2 className="mkt-h2">Follow the part.</h2>
            <p className="mkt-lead">
              Nine real screens, one part number. <span className="mono" style={{ color: 'var(--accent-ink)' }}>P-001245</span> keeps
              its identity from the project it belongs to through to its quality gate.
            </p>
          </div>
        </div>
        <div className="mkt-film">
          {STEPS.map((s, i) => (
            <div className="mkt-film-item" key={s.title}>
              <div className="mkt-film-head">
                <span className="mkt-film-num">{i + 1}</span>
                <span className="mkt-film-title">{s.title}</span>
              </div>
              <div className="mkt-film-shot">
                <img src={s.img} alt={`OSTA ${s.title} screen`} loading="lazy" />
              </div>
              <p className="mkt-film-q">{s.q}</p>
              <p className="mkt-film-a">{s.a}</p>
            </div>
          ))}
          <div className="mkt-film-arrow" aria-hidden="true"><ArrowRight size={18}/></div>
        </div>
      </div>
    </section>
  );
}
