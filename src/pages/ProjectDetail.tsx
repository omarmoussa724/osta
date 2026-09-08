import { Link, useNavigate, useParams } from 'react-router-dom';
import { cn } from '../lib/cn';
import { toneColor } from '../lib/status';
import { daysFromToday, fmtDate, fmtDateShort, fmtEGP, fmtT } from '../lib/format';
import {
  findProject,
  projectParts,
  projectAssemblies,
  assemblyParts,
  findPart,
  OUTSOURCE,
  QC,
  JOBS,
  ISSUES,
} from '../data';
import { Icon } from '../components/Icon';
import { Panel, Bar, Empty, PageHead } from '../components/ui';
import { ProjStatus } from '../components/ManufacturingStatus';
import { PartsTable, OutsourceTable, QcTable } from '../components/tables';
import { BomTree } from '../components/BomTree';
import { useToast } from '../layout/ToastProvider';

const TABS = ['overview', 'assemblies', 'bom', 'parts', 'production', 'outsourcing', 'qc'];

function PhaseBars({ phases }: { phases: Record<string, number> }) {
  return (
    <div className="stack" style={{ gap: 9 }}>
      {Object.entries(phases).map(([k, v]) => (
        <div key={k} style={{ display: 'grid', gridTemplateColumns: '104px 1fr 40px', alignItems: 'center', gap: 12 }}>
          <span className="dim" style={{ fontSize: 12 }}>{k}</span>
          <Bar value={v} tone={v === 100 ? 'ok' : v === 0 ? 'idle' : 'info'} />
          <span className="mono tnum" style={{ fontSize: 11, textAlign: 'right', color: 'var(--ink-2)' }}>{v}%</span>
        </div>
      ))}
    </div>
  );
}

export function ProjectDetail() {
  const nav = useNavigate();
  const toast = useToast();
  const params = useParams<{ code: string; tab?: string }>();
  const code = params.code!;
  const p = findProject(code);
  if (!p)
    return (
      <div className="page">
        <Empty
          icon="projects"
          title="Project not found"
          hint={`No project matches ${code}`}
          action={<Link to="/projects" className="btn">Back to projects</Link>}
        />
      </div>
    );
  const tab = TABS.includes(params.tab ?? '') ? params.tab! : 'overview';
  const parts = projectParts(code);
  const asms = projectAssemblies(code).filter((a) => !a.parent);
  const allAsm = projectAssemblies(code);
  const outs = OUTSOURCE.filter((o) => o.project === code);
  const qcs = QC.filter((q) => parts.some((pp) => pp.id === q.part));
  const wt = parts.reduce((s, x) => s + x.weightKg, 0);
  const d = daysFromToday(p.due);
  const openNcr = ISSUES.filter(
    (i) => i.assembly && allAsm.some((a) => a.code === i.assembly) && i.status !== 'Closed',
  ).length;

  return (
    <div className="page">
      <PageHead
        title={<span>{p.code} <span className="muted" style={{ fontWeight: 400 }}>· {p.name}</span></span>}
        sub={
          <span>
            Customer <b className="dim">{p.customer}</b> · Start {fmtDate(p.start)} · Delivery {fmtDate(p.due)} ·{' '}
            <span style={{ color: d < 7 ? 'var(--crit)' : 'var(--ink-3)' }}>
              {d < 0 ? Math.abs(d) + ' days late' : d + ' days remaining'}
            </span>
          </span>
        }
      >
        <button
          className="btn ghost"
          onClick={() => toast({ title: 'Report exported', desc: p.code + ' status pack (PDF)' })}
        >
          <Icon n="download" />Status pack
        </button>
        <ProjStatus s={p.status} />
      </PageHead>

      <div className="c8-4" style={{ marginBottom: 16 }}>
        <Panel title="Project Progress"><PhaseBars phases={p.phases} /></Panel>
        <Panel title="At a glance">
          <dl className="kv">
            <dt>Assemblies</dt><dd className="mono">{asms.length || '—'}</dd>
            <dt>Parts</dt><dd className="mono">{parts.length || '—'}</dd>
            <dt>Material weight</dt><dd className="mono">{wt ? fmtT(wt) : '—'}</dd>
            <dt>Outsourced value</dt>
            <dd className="mono">{outs.length ? fmtEGP(outs.reduce((s, o) => s + o.value, 0)) : '—'}</dd>
            <dt>Open NCRs</dt><dd className="mono">{openNcr}</dd>
          </dl>
        </Panel>
      </div>

      <div className="tabs">
        {TABS.map((t) => (
          <Link
            key={t}
            to={`/projects/${code}${t === 'overview' ? '' : '/' + t}`}
            className={cn(tab === t && 'on')}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Link>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="two">
          <Panel title="Assemblies" pad={false}>
            {asms.length === 0 ? (
              <Empty
                icon="bom"
                title="No assemblies imported"
                hint="Assembly breakdown for this project has not been released from engineering yet."
              />
            ) : (
              <table className="tbl">
                <tbody>
                  {asms.map((a) => (
                    <tr key={a.code} onClick={() => nav(`/projects/${code}/asm/${a.code}`)}>
                      <td>
                        <span className="code">{a.code}</span>
                        <div className="muted" style={{ fontSize: 11 }}>{a.name}</div>
                      </td>
                      <td style={{ width: 130 }}>
                        <Bar value={a.completion} tone={a.completion > 80 ? 'ok' : 'info'} />
                      </td>
                      <td className="num">{assemblyParts(a.code).length}p</td>
                      <td style={{ width: 60 }}><Icon n="chevR" size={14} className="muted" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Panel>
          <Panel title="Recent activity">
            <div className="stack" style={{ gap: 10 }}>
              {[
                { i: 'check', t: 'P-001247 passed FINAL_DIM_QC', s: '2 days ago · released to assembly', c: 'ok' },
                { i: 'issues', t: 'NCR-018 raised on P-001262', s: '2 days ago · hole pattern out of tolerance', c: 'crit' },
                { i: 'outsourcing', t: 'OUT-0263 dispatched from El Obour', s: '3 days ago · 60 parts powder coated', c: 'info' },
                { i: 'materials', t: '6 mm S235JR reservation shortfall', s: '4 days ago · 1.7 t short for cutting', c: 'warn' },
                { i: 'nesting', t: 'NEST-0261 released to TruLaser 5030', s: '5 days ago · 86.4% utilisation', c: 'info' },
              ].map((x, i) => (
                <div key={i} className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
                  <Icon n={x.i} size={14} style={{ color: toneColor(x.c), marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 12.5 }}>{x.t}</div>
                    <div className="muted" style={{ fontSize: 11 }}>{x.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {tab === 'assemblies' &&
        (asms.length === 0 ? (
          <Panel>
            <Empty
              icon="bom"
              title="No assemblies imported"
              hint="Release the assembly breakdown from engineering to populate work orders."
              action={
                <button className="btn" onClick={() => toast('Import dialog is a stub in the MVP')}>
                  <Icon n="upload" />Import assemblies
                </button>
              }
            />
          </Panel>
        ) : (
          <div className="stack">
            {asms.map((a) => {
              const ap = assemblyParts(a.code);
              const subs = allAsm.filter((x) => x.parent === a.code);
              const subPartCount = subs.reduce((s, x) => s + assemblyParts(x.code).length, 0);
              return (
                <Panel
                  key={a.code}
                  title={<span>{a.code} · {a.name}</span>}
                  pad={false}
                  actions={
                    <>
                      <span className="chip">WO required · {ap.length + subPartCount > 0 ? 'active' : 'blocked'}</span>
                      <Link to={`/projects/${code}/asm/${a.code}`} className="btn ghost sm">Open<Icon n="arrowR" /></Link>
                    </>
                  }
                >
                  <div style={{ padding: '12px 14px', display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 12 }}>
                    <span className="muted">Parts <b className="dim">{ap.length}</b></span>
                    <span className="muted">Weight <b className="dim">{fmtT(ap.reduce((s, x) => s + x.weightKg, 0))}</b></span>
                    <span className="muted">Completion <b className="dim">{a.completion}%</b></span>
                    <span className="muted">Current op <b className="dim">{a.currentOp}</b></span>
                  </div>
                  {subs.length > 0 && (
                    <div style={{ padding: '0 14px 12px' }}>
                      {subs.map((su) => (
                        <Link
                          key={su.code}
                          to={`/projects/${code}/asm/${su.code}`}
                          className="row"
                          style={{ gap: 8, padding: '6px 0', fontSize: 12, color: 'var(--ink-2)' }}
                        >
                          <Icon n="cornerR" size={13} />
                          <span className="code">{su.code}</span> {su.name}
                          <span className="muted">· {assemblyParts(su.code).length} parts</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </Panel>
              );
            })}
          </div>
        ))}

      {tab === 'bom' && <BomTree only={code} />}

      {tab === 'parts' &&
        (parts.length === 0 ? (
          <Panel><Empty icon="parts" title="No parts released" hint="Parts appear here once the BOM is released from engineering." /></Panel>
        ) : (
          <Panel pad={false}><PartsTable rows={parts} /></Panel>
        ))}

      {tab === 'production' && (
        <Panel pad={false}>
          {(() => {
            const pj = JOBS.filter((j) => parts.some((pp) => pp.id === j.part));
            if (!pj.length)
              return (
                <Empty
                  icon="production"
                  title="No active production jobs"
                  hint="Work orders will appear once parts are released to the shop floor."
                />
              );
            return (
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Job</th><th>Part</th><th>Operation</th><th>Machine</th><th>Operator</th>
                    <th className="num">Qty</th><th>Due</th><th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {pj.map((j) => {
                    const pt = findPart(j.part);
                    return (
                      <tr key={j.id} onClick={() => nav(`/parts/${j.part}`)}>
                        <td className="code">{j.id}</td>
                        <td>
                          <span className="code">{j.part}</span>{' '}
                          <span className="muted" style={{ fontSize: 11 }}>{pt?.desc}</span>
                        </td>
                        <td className="dim">{j.op}</td>
                        <td className="dim">{j.machine}</td>
                        <td className="dim">{j.operator}</td>
                        <td className="num">{j.qty}</td>
                        <td className="mono" style={{ fontSize: 11 }}>{fmtDateShort(j.due)}</td>
                        <td style={{ width: 120 }}>
                          <Bar value={j.progress} tone={j.col === 'BLOCKED' ? 'crit' : j.progress === 100 ? 'ok' : 'info'} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })()}
        </Panel>
      )}

      {tab === 'outsourcing' &&
        (outs.length === 0 ? (
          <Panel><Empty icon="outsourcing" title="No active outsourcing jobs" hint="This project is fully fabricated in-house." /></Panel>
        ) : (
          <Panel pad={false}><OutsourceTable rows={outs} /></Panel>
        ))}

      {tab === 'qc' &&
        (qcs.length === 0 ? (
          <Panel><Empty icon="qc" title="No inspections logged" hint="QC records appear as parts reach in-process and final gates." /></Panel>
        ) : (
          <Panel pad={false}><QcTable rows={qcs} /></Panel>
        ))}
    </div>
  );
}
