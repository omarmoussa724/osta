import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS, projectParts, projectAssemblies, OUTSOURCE } from '../data';
import { daysFromToday, fmtDateShort, fmtEGP, fmtT } from '../lib/format';
import { Icon } from '../components/Icon';
import { Panel, Bar, PageHead } from '../components/ui';
import { ProjStatus } from '../components/ManufacturingStatus';
import { cn } from '../lib/cn';

const FILTERS: [string, string][] = [
  ['all', 'All'],
  ['IN_PRODUCTION', 'In Production'],
  ['MATERIAL', 'Material'],
  ['QC', 'Quality'],
  ['ASSEMBLY', 'Assembly'],
  ['risk', 'At Risk'],
];

export function Projects() {
  const nav = useNavigate();
  const [f, setF] = useState('all');
  const rows = PROJECTS.filter((p) =>
    f === 'all'
      ? true
      : f === 'risk'
        ? p.status === 'MATERIAL' || p.status === 'DELAYED' || daysFromToday(p.due) < 10
        : p.status === f,
  );
  return (
    <div className="page">
      <PageHead
        title="Projects"
        sub={`${PROJECTS.length} projects · ${PROJECTS.filter((p) => p.status !== 'DELIVERY').length} in the shop`}
      >
        <button className="btn ghost"><Icon n="filter" />Filter</button>
        <button className="btn primary"><Icon n="plus" />New project</button>
      </PageHead>
      <div className="filterbar">
        <div className="seg">
          {FILTERS.map(([k, l]) => (
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
                <th>Project</th>
                <th>Customer</th>
                <th>Progress</th>
                <th className="num">Asm</th>
                <th className="num">Parts</th>
                <th className="num">Material</th>
                <th className="num">Outsourced</th>
                <th>Delivery</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => {
                const parts = projectParts(p.code);
                const wt = parts.reduce((s, x) => s + x.weightKg, 0);
                const outVal = OUTSOURCE.filter((o) => o.project === p.code).reduce((s, o) => s + o.value, 0);
                const asm = projectAssemblies(p.code).filter((a) => !a.parent).length;
                const d = daysFromToday(p.due);
                return (
                  <tr key={p.code} onClick={() => nav(`/projects/${p.code}`)}>
                    <td>
                      <span className="code">{p.code}</span>
                      <div className="muted" style={{ fontSize: 11 }}>{p.name}</div>
                    </td>
                    <td className="dim">{p.customer}</td>
                    <td style={{ minWidth: 160 }}>
                      <div className="between" style={{ gap: 8 }}>
                        <Bar value={p.progress} tone={p.progress > 80 ? 'ok' : 'info'} />
                        <span className="mono" style={{ fontSize: 11 }}>{p.progress}%</span>
                      </div>
                    </td>
                    <td className="num">{asm || '—'}</td>
                    <td className="num">{parts.length || '—'}</td>
                    <td className="num">{wt ? fmtT(wt) : '—'}</td>
                    <td className="num">{outVal ? fmtEGP(outVal) : '—'}</td>
                    <td>
                      <span className="mono" style={{ fontSize: 11.5 }}>{fmtDateShort(p.due)}</span>{' '}
                      <span style={{ fontSize: 10.5, color: d < 7 ? 'var(--crit)' : 'var(--ink-3)' }}>
                        {d < 0 ? Math.abs(d) + 'd late' : d + 'd'}
                      </span>
                    </td>
                    <td><ProjStatus s={p.status} /></td>
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
