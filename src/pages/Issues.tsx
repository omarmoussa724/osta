import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/cn';
import { ISSUES } from '../data';
import type { Issue } from '../types';
import { fmtDateShort } from '../lib/format';
import { Icon } from '../components/Icon';
import { Panel, PageHead } from '../components/ui';
import { Pill } from '../components/ManufacturingStatus';

function hrefFor(i: Issue): string {
  if (i.refType === 'part') return `/parts/${i.ref}`;
  if (i.refType === 'supplier') return '/suppliers';
  if (i.refType === 'material') return '/materials';
  if (i.assembly) return `/projects/PRJ-26001/asm/${i.ref}`;
  return '/issues';
}

export function Issues() {
  const nav = useNavigate();
  const [f, setF] = useState('open');
  const rows = ISSUES.filter((i) => (f === 'all' ? true : f === 'open' ? i.status !== 'Closed' : i.status === 'Closed'));
  const sevTone = (s: Issue['severity']) => (s === 'Critical' ? 'crit' : s === 'Major' ? 'warn' : 'idle');

  return (
    <div className="page">
      <PageHead title="NCR / Issues" sub="Non-conformance reports and operational blockers">
        <button className="btn primary"><Icon n="plus" />Raise NCR</button>
      </PageHead>
      <div className="filterbar">
        <div className="seg">
          {[['open', 'Open'], ['closed', 'Closed'], ['all', 'All']].map(([k, l]) => (
            <button key={k} className={cn(f === k && 'on')} onClick={() => setF(k)}>{l}</button>
          ))}
        </div>
        <span className="muted" style={{ fontSize: 11.5 }}>{rows.length} shown</span>
      </div>
      <Panel pad={false}>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>NCR</th><th>Against</th><th>Title</th><th>Severity</th><th>Status</th><th>Owner</th><th>Opened</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((i) => (
                <tr key={i.id} onClick={() => nav(hrefFor(i))}>
                  <td className="code">{i.id}</td>
                  <td className="mono dimc" style={{ fontSize: 11 }}>{i.ref}</td>
                  <td>{i.title}</td>
                  <td><Pill tone={sevTone(i.severity)}>{i.severity}</Pill></td>
                  <td><Pill tone={i.status === 'Closed' ? 'ok' : i.status === 'In Rework' ? 'info' : 'crit'}>{i.status}</Pill></td>
                  <td className="dim">{i.owner}</td>
                  <td className="mono" style={{ fontSize: 11 }}>{fmtDateShort(i.opened)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
