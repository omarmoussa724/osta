import { Link, useParams } from 'react-router-dom';
import { hexA } from '../lib/cn';
import { toneColor, type Tone } from '../lib/status';
import { findNest, NEST_TARGET, PARTS } from '../data';
import type { Nest } from '../types';
import { Panel, Empty, PageHead } from '../components/ui';
import { Pill } from '../components/ManufacturingStatus';
import { SheetView } from '../components/SheetView';
import { PartsTable } from '../components/tables';

const NEST_ST: Record<Nest['status'], Tone> = {
  READY: 'ok',
  RUNNING: 'info',
  QUEUED: 'idle',
  BELOW_TARGET: 'warn',
};

export function NestingDetail() {
  const { id } = useParams<{ id: string }>();
  const n = findNest(id!);
  if (!n)
    return (
      <div className="page">
        <Empty icon="nesting" title="Nest not found" hint={id} action={<Link to="/nesting" className="btn">Back</Link>} />
      </div>
    );
  const relatedParts = PARTS.filter((p) => p.grade === n.grade && p.thk === n.thk && p.project === n.project);

  return (
    <div className="page">
      <PageHead
        title={<span>{n.id} <span className="muted" style={{ fontWeight: 400 }}>· {n.grade} {n.thk} mm</span></span>}
        sub={<span><Link to={`/projects/${n.project}`} className="lnk">{n.project}</Link> · {n.machine}</span>}
      >
        <Pill tone={NEST_ST[n.status]}>{n.status.replace('_', ' ')}</Pill>
      </PageHead>

      <div className="c8-4">
        <Panel title="Sheet Layout">
          <div className="sheet-box"><SheetView nest={n} big /></div>
          <div className="muted" style={{ fontSize: 11, marginTop: 8 }}>
            Illustrative layout — demonstrates part packing on a {n.sheetW} × {n.sheetL} mm sheet. Actual nesting is
            produced by the CAM system.
          </div>
        </Panel>
        <div className="stack">
          <Panel title="Nest Data">
            <dl className="kv">
              <dt>Nest ID</dt><dd className="mono">{n.id}</dd>
              <dt>Material</dt><dd className="mono">{n.grade}</dd>
              <dt>Thickness</dt><dd className="mono">{n.thk} mm</dd>
              <dt>Sheet size</dt><dd className="mono">{n.sheetW} × {n.sheetL}</dd>
              <dt>Parts</dt><dd className="mono">{n.parts}</dd>
              <dt>Utilisation</dt>
              <dd className="mono" style={{ color: n.util >= NEST_TARGET ? 'var(--ok)' : 'var(--warn)' }}>{n.util}%</dd>
              <dt>Scrap</dt><dd className="mono">{(100 - n.util).toFixed(1)}%</dd>
              <dt>Machine</dt><dd>{n.machine}</dd>
              <dt>Status</dt><dd><Pill tone={NEST_ST[n.status]}>{n.status.replace('_', ' ')}</Pill></dd>
            </dl>
          </Panel>
          {n.util < NEST_TARGET && (
            <div className="risk" style={{ borderColor: hexA(toneColor('warn'), 0.35) }}>
              <span className="rdot" style={{ background: 'var(--warn)' }} />
              <span className="rmain">
                <span className="rtitle">Below utilisation target</span>
                <span className="rmeta" style={{ display: 'block' }}>
                  {n.util}% vs {NEST_TARGET}% — consider combining with another order on the same grade.
                </span>
              </span>
            </div>
          )}
        </div>
      </div>

      {relatedParts.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <Panel title="Parts on this material" pad={false}>
            <PartsTable rows={relatedParts} />
          </Panel>
        </div>
      )}
    </div>
  );
}
