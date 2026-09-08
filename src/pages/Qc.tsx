import { useState } from 'react';
import { cn } from '../lib/cn';
import { QC, QC_KPI } from '../data';
import { Icon } from '../components/Icon';
import { Panel, PageHead } from '../components/ui';
import { QcTable } from '../components/tables';

export function Qc() {
  const [f, setF] = useState('all');
  const rows = QC.filter((q) =>
    f === 'all'
      ? true
      : f === 'pending'
        ? q.result === 'PENDING'
        : f === 'failed'
          ? q.result === 'FAILED'
          : q.result === 'PASSED',
  );
  return (
    <div className="page">
      <PageHead
        title="Quality Control"
        sub="FINAL_DIM_QC is the mandatory gate before any part is released for assembly"
      >
        <button className="btn ghost"><Icon n="download" />QC report</button>
      </PageHead>
      <div className="kpi-row" style={{ gridTemplateColumns: 'repeat(5,1fr)', marginBottom: 14 }}>
        <div className="kpi"><span className="k-label">Pending Inspections</span><span className="k-val">{QC_KPI.pending}</span></div>
        <div className="kpi"><span className="k-label">Passed · 30d</span><span className="k-val" style={{ color: 'var(--ok)' }}>{QC_KPI.passed30}</span></div>
        <div className="kpi"><span className="k-label">Failed · 30d</span><span className="k-val" style={{ color: 'var(--crit)' }}>{QC_KPI.failed30}</span></div>
        <div className="kpi"><span className="k-label">Open NCRs</span><span className="k-val" style={{ color: 'var(--warn)' }}>{QC_KPI.ncrOpen}</span></div>
        <div className="kpi"><span className="k-label">In Rework</span><span className="k-val">{QC_KPI.rework}</span></div>
      </div>
      <div className="filterbar">
        <div className="seg">
          {[['all', 'All'], ['pending', 'Pending'], ['passed', 'Passed'], ['failed', 'Failed']].map(([k, l]) => (
            <button key={k} className={cn(f === k && 'on')} onClick={() => setF(k)}>{l}</button>
          ))}
        </div>
        <span className="muted" style={{ fontSize: 11.5 }}>
          {rows.length} inspections · <span style={{ color: 'var(--ink-2)' }}>*</span> mandatory final gate
        </span>
      </div>
      <Panel pad={false}><QcTable rows={rows} /></Panel>
    </div>
  );
}
