import { Link } from 'react-router-dom';
import { NESTS, NEST_TARGET } from '../data';
import type { Nest } from '../types';
import { Icon } from '../components/Icon';
import { PageHead } from '../components/ui';
import { Pill } from '../components/ManufacturingStatus';
import { SheetView } from '../components/SheetView';
import type { Tone } from '../lib/status';

const NEST_ST: Record<Nest['status'], Tone> = {
  READY: 'ok',
  RUNNING: 'info',
  QUEUED: 'idle',
  BELOW_TARGET: 'warn',
};

export function Nesting() {
  return (
    <div className="page">
      <PageHead title="Nesting" sub="Sheet layouts feeding the cutting machines · utilisation vs 80% target">
        <button className="btn"><Icon n="nesting" />Auto-nest queue</button>
      </PageHead>
      <div className="three">
        {NESTS.map((n) => (
          <Link key={n.id} to={`/nesting/${n.id}`} className="panel" style={{ display: 'block' }}>
            <div className="panel-h">
              <h3>{n.id}</h3>
              <Pill tone={NEST_ST[n.status]}>{n.status.replace('_', ' ')}</Pill>
            </div>
            <div className="panel-b">
              <SheetView nest={n} />
              <div className="between" style={{ marginTop: 10, fontSize: 11.5 }}>
                <span className="dim">{n.grade} · {n.thk} mm</span>
                <span className="mono">{n.parts} parts</span>
              </div>
              <div className="between" style={{ marginTop: 6 }}>
                <div className="bar" style={{ flex: 1, marginRight: 10 }}>
                  <i style={{ width: n.util + '%', background: n.util >= NEST_TARGET ? 'var(--ok)' : 'var(--warn)' }} />
                </div>
                <span className="mono" style={{ fontSize: 11, color: n.util >= NEST_TARGET ? 'var(--ok)' : 'var(--warn)' }}>
                  {n.util}%
                </span>
              </div>
              <div className="muted" style={{ fontSize: 10.5, marginTop: 6 }}>
                {n.machine} · scrap {(100 - n.util).toFixed(1)}%
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
