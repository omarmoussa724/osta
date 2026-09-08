import { useState } from 'react';
import { cn } from '../lib/cn';
import { PARTS } from '../data';
import { Icon } from '../components/Icon';
import { Panel, Empty, PageHead } from '../components/ui';
import { PartsTable } from '../components/tables';

const STATES: [string, string][] = [
  ['all', 'All'],
  ['IN_PRODUCTION', 'In Production'],
  ['OUTSOURCED', 'Outsourced'],
  ['READY', 'Ready'],
  ['BLOCKED', 'Blocked'],
  ['FAILED', 'QC Failed'],
  ['NOT_STARTED', 'Not Started'],
];

export function Parts() {
  const [q, setQ] = useState('');
  const [st, setSt] = useState('all');
  const rows = PARTS.filter((p) => {
    if (st !== 'all' && p.status !== st) return false;
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return `${p.id} ${p.desc} ${p.grade} ${p.project} ${p.assembly}`.toLowerCase().includes(s);
  });
  return (
    <div className="page">
      <PageHead title="Parts" sub={`${PARTS.length} parts under management · one identity from BOM to assembly`}>
        <button className="btn ghost"><Icon n="download" />Export</button>
      </PageHead>
      <div className="filterbar">
        <input
          className="inp"
          placeholder="Search part number, description, grade…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="seg">
          {STATES.map(([k, l]) => (
            <button key={k} className={cn(st === k && 'on')} onClick={() => setSt(k)}>{l}</button>
          ))}
        </div>
        <span className="muted" style={{ fontSize: 11.5 }}>{rows.length} shown</span>
      </div>
      <Panel pad={false}>
        {rows.length ? <PartsTable rows={rows} /> : <Empty icon="parts" title="No parts match" hint="Adjust the filters or search term." />}
      </Panel>
    </div>
  );
}
