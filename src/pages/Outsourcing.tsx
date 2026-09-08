import { useState } from 'react';
import { cn } from '../lib/cn';
import { OUTSOURCE } from '../data';
import { daysFromToday, fmtEGP } from '../lib/format';
import { Icon } from '../components/Icon';
import { Panel, Empty, PageHead } from '../components/ui';
import { OutsourceTable } from '../components/tables';

export function Outsourcing() {
  const [f, setF] = useState('active');
  const active = OUTSOURCE.filter((o) => o.status !== 'RECEIVED');
  const rows =
    f === 'active'
      ? active
      : f === 'risk'
        ? OUTSOURCE.filter((o) => o.status === 'AT_RISK' || daysFromToday(o.due) < 3)
        : OUTSOURCE;
  const totalVal = active.reduce((s, o) => s + o.value, 0);
  const totalT = active.reduce((s, o) => s + o.weightT, 0);

  return (
    <div className="page">
      <PageHead title="Outsourcing Control Center" sub="Subcontracted fabrication across every supplier, in one view">
        <button className="btn ghost"><Icon n="upload" />Upload documents</button>
        <button className="btn primary"><Icon n="plus" />New RFQ</button>
      </PageHead>

      <div className="kpi-row" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 14 }}>
        <div className="kpi"><span className="k-label">Active Jobs</span><span className="k-val">{active.length}</span></div>
        <div className="kpi"><span className="k-label">Outsourced Value</span><span className="k-val">{fmtEGP(totalVal)}</span></div>
        <div className="kpi"><span className="k-label">Weight Outsourced</span><span className="k-val">{totalT.toFixed(1)} t</span></div>
        <div className="kpi">
          <span className="k-label">At Risk</span>
          <span className="k-val" style={{ color: 'var(--crit)' }}>{OUTSOURCE.filter((o) => o.status === 'AT_RISK').length}</span>
        </div>
      </div>

      <div className="filterbar">
        <div className="seg">
          {[['active', 'Active'], ['risk', 'At Risk'], ['all', 'All jobs']].map(([k, l]) => (
            <button key={k} className={cn(f === k && 'on')} onClick={() => setF(k)}>{l}</button>
          ))}
        </div>
        <span className="muted" style={{ fontSize: 11.5 }}>{rows.length} jobs</span>
      </div>

      <Panel title="Active Outsourcing" pad={false}>
        {rows.length ? (
          <OutsourceTable rows={rows} />
        ) : (
          <Empty
            icon="outsourcing"
            title="No active outsourcing jobs"
            hint="Every project is currently fabricated in-house. New RFQs will appear here."
          />
        )}
      </Panel>
    </div>
  );
}
