import { cn } from '../lib/cn';
import { toneColor } from '../lib/status';
import { FLOW } from '../data';
import { Icon } from './Icon';
import { Bar } from './ui';

/** Horizontal manufacturing flow: Engineering -> Material -> ... -> Assembly. */
export function FlowStages() {
  return (
    <div className="flow">
      {FLOW.map((s, i) => {
        const c = toneColor(s.status);
        const pct = Math.max(8, 100 - (s.delayed / s.count) * 320);
        return (
          <div key={s.key} className={cn('stage', s.status === 'crit' && 'bottleneck')}>
            <span className="s-top" style={{ background: c }} />
            {i > 0 ? (
              <span className="arrow">
                <Icon n="chevR" />
              </span>
            ) : null}
            <span className="s-name">{s.key}</span>
            <span className="s-count tnum">{s.count}</span>
            <span
              className="s-delay"
              style={{ color: s.delayed > 8 ? 'var(--crit)' : s.delayed > 0 ? 'var(--warn)' : 'var(--ink-3)' }}
            >
              {s.delayed} delayed
            </span>
            <Bar value={pct} tone={s.status === 'crit' ? 'crit' : s.status === 'warn' ? 'warn' : 'ok'} />
          </div>
        );
      })}
    </div>
  );
}
