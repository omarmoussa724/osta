import { useState } from 'react';
import { cn } from '../lib/cn';
import { PARTS } from '../data';
import type { Part } from '../types';
import type { Tone } from '../lib/status';
import { Icon } from '../components/Icon';
import { Panel, PageHead } from '../components/ui';
import { Pill } from '../components/ManufacturingStatus';
import { useToast } from '../layout/ToastProvider';

function camStatus(pt: Part): { label: string; tone: Tone } {
  if (['READY', 'COMPLETE', 'QC'].includes(pt.status) || pt.opIndex > 4) return { label: 'Posted', tone: 'ok' };
  if (pt.opIndex >= 3) return { label: 'Programmed', tone: 'info' };
  return { label: 'Not programmed', tone: 'idle' };
}

export function CadCam() {
  const toast = useToast();
  const [sel, setSel] = useState(PARTS[0].id);
  const rows = PARTS.slice(0, 16);
  const p = PARTS.find((x) => x.id === sel) ?? PARTS[0];

  return (
    <div className="page">
      <PageHead title="CAD / CAM" sub="Model revisions, CAM programmes and machine posting status">
        <button className="btn ghost" onClick={() => toast('CAD sync queued')}><Icon n="refresh" />Sync PDM</button>
      </PageHead>
      <div className="c7-5">
        <Panel title="Programmes" pad={false}>
          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr><th>Part</th><th>CAD file</th><th>Rev</th><th>CAM</th><th>Machine</th></tr>
              </thead>
              <tbody>
                {rows.map((pt) => {
                  const c = camStatus(pt);
                  return (
                    <tr
                      key={pt.id}
                      onClick={() => setSel(pt.id)}
                      style={sel === pt.id ? { background: 'var(--panel-3)' } : undefined}
                    >
                      <td className="code">{pt.id}</td>
                      <td className="mono dimc" style={{ fontSize: 11 }}>{pt.cad}</td>
                      <td className="mono">{pt.rev}</td>
                      <td><Pill tone={c.tone}>{c.label}</Pill></td>
                      <td className="dim">{pt.machine ?? '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>
        <div className="stack">
          <Panel title={`Model · ${p.id}`}>
            <svg
              viewBox="0 0 220 150"
              width="100%"
              style={{ background: 'var(--ground-2)', border: '1px solid var(--line)', borderRadius: 6, maxHeight: 180 }}
            >
              <g stroke="#4C9AFF" strokeWidth="1.1" fill="none" strokeOpacity="0.85">
                <path d="M40 95 L120 95 L160 70 L80 70 Z" />
                <path d="M40 95 L40 55 L80 30 L80 70" />
                <path d="M120 95 L120 55 L160 30 L160 70" />
                <path d="M40 55 L120 55 L160 30 M80 30 L160 30" />
                <path d="M55 88 L55 62 M100 88 L100 62" strokeOpacity="0.4" />
              </g>
              <text x="12" y="140" fontSize="8" fill="#6D7681" fontFamily="var(--mono)">
                isometric preview · {p.cad}
              </text>
            </svg>
          </Panel>
          <Panel title="Revision History">
            <div className="tl">
              {['A', 'B', 'C']
                .filter((r) => r <= p.rev)
                .reverse()
                .map((r, i) => (
                  <div className="tl-step" key={r}>
                    <div className="tl-rail">
                      <span className={cn('tl-node', i === 0 ? 'cur' : 'done')} />
                      {i < 2 && <span className="tl-line done" />}
                    </div>
                    <div className="tl-body">
                      <div className="tl-name">
                        Rev {r} {i === 0 && <Pill tone="info">current</Pill>}
                      </div>
                      <div className="tl-when">
                        {r === 'A'
                          ? 'Initial release'
                          : r === 'B'
                            ? 'Tolerance update on mating faces'
                            : 'Weld prep revised'}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
