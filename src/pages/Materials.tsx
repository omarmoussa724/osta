import { hexA } from '../lib/cn';
import { toneColor } from '../lib/status';
import { MATERIALS } from '../data';
import { fmtEGP } from '../lib/format';
import { Icon } from '../components/Icon';
import { Panel, Bar, PageHead } from '../components/ui';

export function Materials() {
  const alerts = MATERIALS.filter((m) => m.shortage > 0);
  const exposure = MATERIALS.reduce((s, m) => s + m.reserved * m.price, 0);

  return (
    <div className="page">
      <PageHead title="Materials" sub="Stock, reservations and shortage exposure by grade & thickness">
        <button className="btn ghost"><Icon n="upload" />Import stock</button>
        <button className="btn"><Icon n="outsourcing" />Raise purchase</button>
      </PageHead>

      <div className="kpi-row" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 14 }}>
        <div className="kpi"><span className="k-label">Grades tracked</span><span className="k-val">{MATERIALS.length}</span></div>
        <div className="kpi"><span className="k-label">Shortage lines</span><span className="k-val" style={{ color: 'var(--crit)' }}>{alerts.length}</span></div>
        <div className="kpi"><span className="k-label">Total shortage</span><span className="k-val">{alerts.reduce((s, m) => s + m.shortage, 0).toFixed(1)} t</span></div>
        <div className="kpi"><span className="k-label">Reserved exposure</span><span className="k-val">{fmtEGP(exposure)}</span></div>
      </div>

      {alerts.length > 0 && (
        <div className="stack" style={{ gap: 8, marginBottom: 14 }}>
          {alerts.map((m) => (
            <div key={m.key} className="risk" style={{ borderColor: hexA(toneColor('crit'), 0.35) }}>
              <span className="rdot" style={{ background: 'var(--crit)' }} />
              <span className="rmain">
                <span className="rtitle">Material shortage · {m.grade} {m.thk} mm</span>
                <span className="rmeta" style={{ display: 'block' }}>
                  Required {m.required} t · available {(m.avail - m.reserved).toFixed(1)} t · short{' '}
                  <b style={{ color: 'var(--crit)' }}>{m.shortage} t</b>
                </span>
              </span>
              <span className="rtag">{fmtEGP(m.shortage * m.price)}</span>
            </div>
          ))}
        </div>
      )}

      <Panel title="Material Inventory" pad={false}>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Material</th><th>Family</th><th className="num">Thk</th><th className="num">Available</th>
                <th className="num">Reserved</th><th className="num">Required</th><th className="num">Shortage</th><th>Coverage</th>
              </tr>
            </thead>
            <tbody>
              {MATERIALS.map((m) => {
                const free = m.avail - m.reserved;
                const cover = Math.max(0, Math.min(100, (free / m.required) * 100));
                return (
                  <tr key={m.key} className="norow">
                    <td className="code">{m.grade}</td>
                    <td className="dim">{m.family}</td>
                    <td className="num">{m.thk} mm</td>
                    <td className="num">{m.avail.toFixed(1)} t</td>
                    <td className="num">{m.reserved.toFixed(1)} t</td>
                    <td className="num">{m.required.toFixed(1)} t</td>
                    <td className="num" style={{ color: m.shortage > 0 ? 'var(--crit)' : 'var(--ink-3)' }}>
                      {m.shortage > 0 ? m.shortage.toFixed(1) + ' t' : '—'}
                    </td>
                    <td style={{ width: 120 }}>
                      <Bar value={cover} tone={cover >= 100 ? 'ok' : cover > 50 ? 'warn' : 'crit'} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
