import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/cn';
import { toneColor, type Tone } from '../lib/status';
import { JOBS, findPart } from '../data';
import type { ProductionJob } from '../types';
import { fmtDateShort } from '../lib/format';
import { Icon } from '../components/Icon';
import { PageHead, Bar } from '../components/ui';
import { useToast } from '../layout/ToastProvider';

const COLS: { key: ProductionJob['col']; label: string; tone: Tone }[] = [
  { key: 'READY', label: 'Ready', tone: 'ok' },
  { key: 'IN_PRODUCTION', label: 'In Production', tone: 'info' },
  { key: 'QC', label: 'QC', tone: 'warn' },
  { key: 'COMPLETE', label: 'Complete', tone: 'ok' },
  { key: 'BLOCKED', label: 'Blocked', tone: 'crit' },
];

export function Production() {
  const nav = useNavigate();
  const toast = useToast();
  const [jobs, setJobs] = useState<ProductionJob[]>(JOBS);
  const [drag, setDrag] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);

  const move = (jid: string, col: ProductionJob['col']) => {
    setJobs((js) =>
      js.map((j) => {
        if (j.id !== jid) return j;
        if (col === 'COMPLETE') {
          const pt = findPart(j.part);
          if (pt && pt.qcState === 'FAILED') {
            toast({ tone: 'crit', title: 'Blocked by QC rule', desc: `FINAL_DIM_QC must pass before ${j.part} can complete` });
            return j;
          }
        }
        toast({ title: 'Job moved', desc: `${j.part} → ${COLS.find((c) => c.key === col)?.label}` });
        return { ...j, col };
      }),
    );
  };

  return (
    <div className="page">
      <PageHead title="Production Board" sub="Live shop-floor jobs · drag a card to move it between states">
        <button className="btn ghost" onClick={() => nav('/nesting')}><Icon n="nesting" />Nesting queue</button>
        <button className="btn ghost" onClick={() => toast('MES sync queued')}><Icon n="refresh" />Sync MES</button>
      </PageHead>
      <div className="board">
        {COLS.map((c) => {
          const list = jobs.filter((j) => j.col === c.key);
          return (
            <div
              key={c.key}
              className={cn('klane', over === c.key && 'drop')}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(c.key);
              }}
              onDragLeave={() => setOver((o) => (o === c.key ? null : o))}
              onDrop={(e) => {
                e.preventDefault();
                setOver(null);
                if (drag) move(drag, c.key);
                setDrag(null);
              }}
            >
              <div className="klane-h">
                <span className="kt">
                  <span
                    className="dot"
                    style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 9, background: toneColor(c.tone), marginRight: 6 }}
                  />
                  {c.label}
                </span>
                <span className="kn">{list.length}</span>
              </div>
              <div className="klane-b">
                {list.length === 0 && (
                  <div className="muted" style={{ fontSize: 11, padding: '8px 2px' }}>
                    {c.key === 'BLOCKED' ? 'Nothing blocked' : 'Empty'}
                  </div>
                )}
                {list.map((j) => {
                  const pt = findPart(j.part);
                  return (
                    <div
                      key={j.id}
                      className={cn('jcard', drag === j.id && 'drag')}
                      draggable
                      onDragStart={() => setDrag(j.id)}
                      onDragEnd={() => setDrag(null)}
                      onClick={() => nav(`/parts/${j.part}`)}
                    >
                      <div className="between">
                        <span className="jc-code">{j.part}</span>
                        <span className="mono muted" style={{ fontSize: 10 }}>{j.id}</span>
                      </div>
                      <div className="jc-desc">{pt ? pt.desc : '—'}</div>
                      <div className="jc-meta">
                        <span><b>{j.op}</b></span>
                        <span>{j.machine}</span>
                        <span>Op: {j.operator}</span>
                        <span>Qty {j.qty}</span>
                        <span>Due {fmtDateShort(j.due)}</span>
                      </div>
                      {j.block ? (
                        <div style={{ fontSize: 10.5, color: 'var(--crit)' }}>
                          <Icon n="lock" size={10} /> {j.block}
                        </div>
                      ) : (
                        <Bar value={j.progress} tone={j.progress === 100 ? 'ok' : c.tone} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="muted" style={{ fontSize: 11, marginTop: 12 }}>
        Rule enforced — a job cannot move to <b className="dim">Complete</b> while its part&rsquo;s FINAL_DIM_QC has failed.
      </div>
    </div>
  );
}
