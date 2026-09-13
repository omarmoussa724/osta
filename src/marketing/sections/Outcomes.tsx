import { Eye, SlidersHorizontal, Gauge, Route, LineChart } from 'lucide-react';

const OUTCOMES = [
  { icon: Eye, name: 'Visibility', sub: 'Know where every critical part is.' },
  { icon: SlidersHorizontal, name: 'Control', sub: 'Know what is blocking production.' },
  { icon: Gauge, name: 'Capacity', sub: 'Know where work can actually be manufactured.' },
  { icon: Route, name: 'Traceability', sub: 'Follow the part from engineering to delivery.' },
  { icon: LineChart, name: 'Intelligence', sub: 'Understand cost, time, quality and supplier performance.' },
];

export function Outcomes() {
  return (
    <section className="mkt-section alt" id="outcomes">
      <div className="mkt-shell">
        <div className="mkt-center" style={{ marginBottom: 44 }}>
          <h2 className="mkt-h2 mkt-mx-auto">Turn manufacturing data into manufacturing decisions.</h2>
        </div>
        <div className="mkt-outcomes">
          {OUTCOMES.map((o) => (
            <div className="mkt-outcome" key={o.name}>
              <div className="ic"><o.icon/></div>
              <h3>{o.name}</h3>
              <p>{o.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
