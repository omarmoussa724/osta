import { STOCK, MOVES } from '../data';
import type { Tone } from '../lib/status';
import { fmtInt } from '../lib/format';
import { Icon } from '../components/Icon';
import { Panel, PageHead } from '../components/ui';
import { Pill } from '../components/ManufacturingStatus';

const stateTone = (s: string): Tone =>
  s === 'Available' ? 'ok' : s === 'Reserved' ? 'info' : s === 'Quarantine' ? 'crit' : 'idle';

export function Inventory() {
  return (
    <div className="page">
      <PageHead title="Inventory" sub="Physical stock by rack, heat lot and allocation state">
        <button className="btn ghost"><Icon n="upload" />Stock count</button>
      </PageHead>
      <div className="c7-5">
        <Panel title="Stock on Hand" pad={false}>
          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr><th>Material</th><th>Heat / Lot</th><th>Location</th><th className="num">Qty</th><th>State</th></tr>
              </thead>
              <tbody>
                {STOCK.map((s, i) => (
                  <tr key={i} className="norow">
                    <td className="code">{s.mat}</td>
                    <td className="mono dimc" style={{ fontSize: 11 }}>{s.lot}</td>
                    <td className="dim">{s.loc}</td>
                    <td className="num">{fmtInt(s.qty)} kg</td>
                    <td><Pill tone={stateTone(s.state)}>{s.state}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="Recent Movements">
          <div className="stack" style={{ gap: 9 }}>
            {MOVES.map((m, i) => (
              <div key={i} className="between" style={{ fontSize: 12 }}>
                <span className="row" style={{ gap: 8 }}>
                  <Icon n={m.qty > 0 ? 'download' : 'upload'} size={13} style={{ color: m.qty > 0 ? 'var(--ok)' : 'var(--warn)' }} />
                  <span>
                    <b className="dim">{m.k}</b> · {m.mat}
                    <div className="muted" style={{ fontSize: 10.5 }}>{m.ref}</div>
                  </span>
                </span>
                <span className="mono tnum" style={{ color: m.qty > 0 ? 'var(--ok)' : 'var(--ink-2)' }}>
                  {m.qty > 0 ? '+' : ''}
                  {fmtInt(m.qty)}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
