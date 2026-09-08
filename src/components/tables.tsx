import { useNavigate } from 'react-router-dom';
import type { Part, OutsourceOrder, QCInspection } from '../types';
import { findSupplier } from '../data';
import { OUT_STATUS } from '../lib/status';
import { fmtEGP, fmtDateShort, daysFromToday } from '../lib/format';
import { MfgStatus, Pill } from './ManufacturingStatus';

export function PartsTable({ rows }: { rows: Part[] }) {
  const nav = useNavigate();
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead>
          <tr>
            <th>Part No</th>
            <th>Description</th>
            <th>Project</th>
            <th>Assembly</th>
            <th>Material</th>
            <th className="num">Thk</th>
            <th className="num">Qty</th>
            <th>Operation</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((pt) => (
            <tr key={pt.id} onClick={() => nav(`/parts/${pt.id}`)}>
              <td><span className="code">{pt.id}</span></td>
              <td>{pt.desc}</td>
              <td className="mono dimc" style={{ fontSize: 11 }}>{pt.project}</td>
              <td className="mono dimc" style={{ fontSize: 11 }}>{pt.assembly}</td>
              <td className="dim">{pt.grade}</td>
              <td className="num">{pt.thk} mm</td>
              <td className="num">{pt.qty}</td>
              <td className="muted" style={{ fontSize: 11 }}>{pt.ops[pt.opIndex] ?? '—'}</td>
              <td><MfgStatus s={pt.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function OutsourceTable({ rows }: { rows: OutsourceOrder[] }) {
  const nav = useNavigate();
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead>
          <tr>
            <th>RFQ</th>
            <th>Supplier</th>
            <th>Project</th>
            <th>Process</th>
            <th className="num">Parts</th>
            <th className="num">Weight</th>
            <th className="num">Value</th>
            <th>Due</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => {
            const s = findSupplier(o.supplier);
            const d = daysFromToday(o.due);
            const st = OUT_STATUS[o.status];
            return (
              <tr key={o.id} onClick={() => nav(`/outsourcing/${o.id}`)}>
                <td>
                  <span className="code">{o.rfq}</span>
                  <div className="muted" style={{ fontSize: 10.5 }}>{o.id}</div>
                </td>
                <td>
                  {s.name}
                  <div className="muted" style={{ fontSize: 10.5 }}>{s.city}</div>
                </td>
                <td className="mono dimc" style={{ fontSize: 11 }}>{o.project}</td>
                <td className="dim">{o.process}</td>
                <td className="num">{o.partsCount}</td>
                <td className="num">{o.weightT} t</td>
                <td className="num">{fmtEGP(o.value)}</td>
                <td>
                  <span className="mono" style={{ fontSize: 11 }}>{fmtDateShort(o.due)}</span>{' '}
                  <span style={{ fontSize: 10.5, color: d < 3 ? 'var(--crit)' : d < 7 ? 'var(--warn)' : 'var(--ink-3)' }}>
                    {d < 0 ? Math.abs(d) + 'd' : d + 'd'}
                  </span>
                </td>
                <td><Pill tone={st.tone}>{st.label}</Pill></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function QcTable({ rows }: { rows: QCInspection[] }) {
  const nav = useNavigate();
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead>
          <tr>
            <th>Inspection</th>
            <th>Part</th>
            <th>Type</th>
            <th>Result</th>
            <th>Date</th>
            <th>Inspector</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((q) => {
            const tone = q.result === 'PASSED' ? 'ok' : q.result === 'FAILED' ? 'crit' : 'warn';
            return (
              <tr key={q.id} onClick={() => nav(`/parts/${q.part}`)}>
                <td className="code">{q.id}</td>
                <td><span className="code">{q.part}</span></td>
                <td className="dim">
                  {q.type}
                  {q.type === 'FINAL_DIM_QC' ? <span title="Mandatory final gate"> *</span> : ''}
                </td>
                <td><Pill tone={tone}>{q.result}</Pill></td>
                <td className="mono" style={{ fontSize: 11 }}>{fmtDateShort(q.date)}</td>
                <td className="dim">{q.inspector}</td>
                <td className="muted" style={{ fontSize: 11, maxWidth: 280 }}>{q.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
