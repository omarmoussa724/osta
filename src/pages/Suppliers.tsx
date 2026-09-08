import { SUPPLIERS, OUTSOURCE } from '../data';
import { Icon } from '../components/Icon';
import { PageHead, Bar } from '../components/ui';

export function Suppliers() {
  return (
    <div className="page">
      <PageHead
        title="Suppliers"
        sub="Subcontractor network · capability, capacity and delivery performance"
      >
        <button className="btn primary"><Icon n="plus" />Add supplier</button>
      </PageHead>
      <div className="three">
        {SUPPLIERS.map((s) => {
          const jobs = OUTSOURCE.filter((o) => o.supplier === s.id && o.status !== 'RECEIVED').length;
          return (
            <div key={s.id} className="panel">
              <div className="panel-b">
                <div className="between">
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                    <div className="muted" style={{ fontSize: 11 }}>{s.city}</div>
                  </div>
                  <span
                    className="mono"
                    style={{ fontSize: 12, color: s.rating >= 4.5 ? 'var(--ok)' : s.rating >= 4 ? 'var(--ink)' : 'var(--warn)' }}
                  >
                    ★ {s.rating}
                  </span>
                </div>
                <div className="row wrap" style={{ gap: 5, margin: '10px 0' }}>
                  {s.processes.map((pr) => (
                    <span key={pr} className="chip" style={{ fontSize: 10.5 }}>{pr}</span>
                  ))}
                </div>
                <dl className="kv" style={{ gridTemplateColumns: '90px 1fr', fontSize: 12 }}>
                  <dt>On-time</dt>
                  <dd className="mono" style={{ color: s.onTime >= 90 ? 'var(--ok)' : s.onTime >= 80 ? 'var(--ink)' : 'var(--warn)' }}>
                    {s.onTime}%
                  </dd>
                  <dt>Active jobs</dt><dd className="mono">{jobs}</dd>
                  <dt>Contact</dt><dd>{s.contact}</dd>
                </dl>
                <div style={{ marginTop: 8 }}>
                  <div className="between" style={{ fontSize: 10.5, color: 'var(--ink-3)', marginBottom: 3 }}>
                    <span>Load</span>
                    <span>{s.capacity}%</span>
                  </div>
                  <Bar value={s.capacity} tone={s.capacity > 80 ? 'warn' : 'info'} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
