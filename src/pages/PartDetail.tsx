import { Link, useParams } from 'react-router-dom';
import { cn, hexA } from '../lib/cn';
import { toneColor } from '../lib/status';
import { findPart, findMat, connectionsFor } from '../data';
import { Icon } from '../components/Icon';
import { Panel, Empty, PageHead } from '../components/ui';
import { MfgStatus, Pill } from '../components/ManufacturingStatus';
import { useToast } from '../layout/ToastProvider';

export function PartDetail() {
  const toast = useToast();
  const { id } = useParams<{ id: string }>();
  const p = findPart(id!);
  if (!p)
    return (
      <div className="page">
        <Empty
          icon="parts"
          title="Part not found"
          hint={`No part matches ${id}`}
          action={<Link to="/parts" className="btn">All parts</Link>}
        />
      </div>
    );

  const mat = findMat(p.grade, p.thk);
  const conns = connectionsFor(p.id);
  const finalIdx = p.ops.indexOf('FINAL_DIM_QC');
  const qcPassed = p.qcState === 'PASSED';
  const blocked = p.status === 'BLOCKED' || p.status === 'FAILED';

  return (
    <div className="page">
      <PageHead
        title={<span>{p.id} <span className="muted" style={{ fontWeight: 400 }}>· {p.desc}</span></span>}
        sub={
          <span>
            <Link to={`/projects/${p.project}`} className="lnk">{p.project}</Link> /{' '}
            <Link to={`/projects/${p.project}/asm/${p.assembly}`} className="lnk">{p.assembly}</Link> · Rev {p.rev}
          </span>
        }
      >
        <button className="btn ghost" onClick={() => toast('Drawing ' + p.drawing + ' opened')}>
          <Icon n="file" />{p.drawing}
        </button>
        <MfgStatus s={p.status} />
      </PageHead>

      {blocked && (
        <div
          className="risk"
          style={{ marginBottom: 16, borderColor: hexA(toneColor('crit'), 0.4), background: hexA(toneColor('crit'), 0.06) }}
        >
          <span className="rdot" style={{ background: 'var(--crit)' }} />
          <span className="rmain">
            <span className="rtitle">{p.status === 'FAILED' ? 'Failed final dimensional QC' : 'Part is blocked'}</span>
            <span className="rmeta" style={{ display: 'block' }}>{p.note}</span>
          </span>
        </div>
      )}

      <div className="c8-4">
        <div className="stack">
          <Panel title="Manufacturing Timeline">
            <div className="tl">
              {p.ops.map((op, i) => {
                const done = i < p.opIndex || (p.status === 'READY' && i <= p.opIndex) || p.status === 'COMPLETE';
                const cur = i === p.opIndex && p.status !== 'READY' && p.status !== 'COMPLETE';
                const fail = op === 'FINAL_DIM_QC' && p.qcState === 'FAILED';
                const last = i === p.ops.length - 1;
                return (
                  <div className="tl-step" key={op}>
                    <div className="tl-rail">
                      <span className={cn('tl-node', fail ? 'fail' : done ? 'done' : cur ? 'cur' : '')} />
                      {!last && <span className={cn('tl-line', done && 'done')} />}
                    </div>
                    <div className="tl-body">
                      <div className={cn('tl-name', !done && !cur && 'muted2')}>
                        {op}
                        {op === 'FINAL_DIM_QC' && <span className="muted" style={{ fontSize: 10.5 }}>  · mandatory gate</span>}
                        {cur && <span style={{ marginLeft: 8 }}><Pill tone="info">Current operation</Pill></span>}
                        {fail && <span style={{ marginLeft: 8 }}><Pill tone="crit">Failed</Pill></span>}
                      </div>
                      {cur && p.machine && <div className="tl-when">on {p.machine}</div>}
                      {op === 'Ready for Assembly' && !qcPassed && (
                        <div className="tl-when" style={{ color: 'var(--warn)' }}>
                          gated — FINAL_DIM_QC must pass first
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Workflow Connections" actions={<span className="chip">{p.id} across {conns.length} modules</span>}>
            <div className="two" style={{ gap: 8 }}>
              {conns.map((c, i) => (
                <Link key={i} to={c.href} className="risk" style={{ padding: '9px 11px' }}>
                  <Icon n={c.icon} size={14} style={{ color: 'var(--ink-3)', marginTop: 2 }} />
                  <span className="rmain">
                    <span style={{ fontSize: 11.5, fontWeight: 500 }}>{c.type}</span>
                    <span className="rmeta" style={{ display: 'block' }}>
                      <span className="mono">{c.label}</span> · {c.sub}
                    </span>
                  </span>
                  <Icon n="chevR" size={13} className="muted" />
                </Link>
              ))}
            </div>
          </Panel>
        </div>

        <div className="stack">
          <Panel title="Specification">
            <dl className="kv">
              <dt>Project</dt><dd><Link to={`/projects/${p.project}`} className="lnk mono">{p.project}</Link></dd>
              <dt>Assembly</dt><dd><Link to={`/projects/${p.project}/asm/${p.assembly}`} className="lnk mono">{p.assembly}</Link></dd>
              <dt>Material</dt><dd><Link to="/materials" className="lnk">{p.grade}</Link></dd>
              <dt>Thickness</dt><dd className="mono">{p.thk} mm</dd>
              <dt>Quantity</dt><dd className="mono">{p.qty}</dd>
              <dt>Unit weight</dt><dd className="mono">{p.unitKg} kg</dd>
              <dt>Total weight</dt><dd className="mono">{p.weightKg} kg</dd>
              <dt>Revision</dt><dd className="mono">{p.rev}</dd>
              <dt>Drawing</dt><dd className="mono">{p.drawing}</dd>
              <dt>CAD file</dt><dd className="mono">{p.cad}</dd>
              <dt>Current status</dt><dd><MfgStatus s={p.status} /></dd>
            </dl>
          </Panel>

          <Panel title="Final Gate">
            <div className="stack" style={{ gap: 10 }}>
              <div className="between">
                <span style={{ fontSize: 12.5 }}>FINAL_DIM_QC</span>
                <Pill
                  tone={
                    p.qcState === 'PASSED' ? 'ok' : p.qcState === 'FAILED' ? 'crit' : p.qcState === 'PENDING' ? 'warn' : 'idle'
                  }
                >
                  {p.qcState === 'NONE' ? 'Not reached' : p.qcState}
                </Pill>
              </div>
              <div className="muted" style={{ fontSize: 11.5, lineHeight: 1.5 }}>
                OSTA business rule — a part cannot become <b className="dim">Ready for Assembly</b> until final dimensional
                QC passes. {finalIdx >= 0 ? p.ops.length - 1 - finalIdx : 1} step(s) remain after the gate.
              </div>
              <div className="between" style={{ paddingTop: 4, borderTop: '1px solid var(--line)' }}>
                <span style={{ fontSize: 12.5 }}>Ready for Assembly</span>
                {qcPassed ? <Pill tone="ok">Released</Pill> : <span className="chip"><Icon n="lock" size={11} /> Locked</span>}
              </div>
            </div>
          </Panel>

          {mat && (
            <Panel title="Material Position">
              <dl className="kv">
                <dt>Grade</dt><dd className="mono">{mat.grade} · {mat.thk} mm</dd>
                <dt>Available</dt><dd className="mono">{(mat.avail - mat.reserved).toFixed(1)} t</dd>
                <dt>Required</dt><dd className="mono">{mat.required} t</dd>
                <dt>Shortage</dt>
                <dd className="mono" style={{ color: mat.shortage > 0 ? 'var(--crit)' : 'var(--ok)' }}>
                  {mat.shortage > 0 ? mat.shortage + ' t' : 'none'}
                </dd>
              </dl>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
