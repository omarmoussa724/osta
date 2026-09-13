import { Link } from 'react-router-dom';
import {
  Pencil, Layers, DraftingCompass, Grid2x2, Gauge, Flame, ShieldCheck, Boxes, Truck,
  ArrowRight, MessageSquare,
} from 'lucide-react';

const STAGES = [
  { label: 'Engineering', icon: Pencil },
  { label: 'Material', icon: Layers },
  { label: 'CAD / CAM', icon: DraftingCompass },
  { label: 'Nesting', icon: Grid2x2 },
  { label: 'Capacity', icon: Gauge },
  { label: 'Fabrication', icon: Flame },
  { label: 'QC', icon: ShieldCheck },
  { label: 'Assembly', icon: Boxes },
  { label: 'Delivery', icon: Truck },
];

export function Hero() {
  return (
    <section className="mkt-section mkt-hero last">
      <div className="mkt-shell">
        <div className="mkt-kicker"><span className="dot" />Manufacturing Operations · Engineering · Outsourcing</div>
        <h1 className="mkt-h1">Where Engineering Becomes Production.</h1>
        <p className="mkt-lead">
          OSTA connects engineering, materials, manufacturing capacity and outsourced
          fabrication into one operational flow.
        </p>
        <div className="mkt-btn-row" style={{ marginTop: 30 }}>
          <Link to="/" className="mkt-btn primary">Explore OSTA<ArrowRight/></Link>
          <a href="mailto:omarmoussa724@gmail.com?subject=OSTA%20%E2%80%94%20Let%27s%20talk" className="mkt-btn">
            <MessageSquare/>Talk to Us
          </a>
        </div>
        <p className="mkt-hero-micro">Built for project-based and engineered manufacturing.</p>

        <div className="mkt-flow-wrap" aria-hidden="true">
          <div className="mkt-flow">
            <span className="mkt-chip">P-001245</span>
            {STAGES.map((s) => (
              <div className="mkt-flow-node pulse" key={s.label}>
                <span className="ring"><s.icon/></span>
                <span className="lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
