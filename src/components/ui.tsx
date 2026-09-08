import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/cn';
import { toneColor, type Tone } from '../lib/status';
import { Icon } from './Icon';

export function Panel({
  title,
  actions,
  children,
  pad = true,
}: {
  title?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  pad?: boolean;
}) {
  return (
    <section className="panel">
      {title ? (
        <div className="panel-h">
          <h3>{title}</h3>
          {actions ? <div className="row" style={{ gap: 8 }}>{actions}</div> : null}
        </div>
      ) : null}
      <div className={cn('panel-b', !pad && 'flush')}>{children}</div>
    </section>
  );
}

export function Bar({ value, tone, tall }: { value: number; tone?: Tone; tall?: boolean }) {
  const c = tone ? toneColor(tone) : 'var(--accent)';
  return (
    <div className={cn('bar', tall && 'tall')}>
      <i style={{ width: Math.max(0, Math.min(100, value)) + '%', background: c }} />
    </div>
  );
}

export function Empty({
  icon = 'parts',
  title,
  hint,
  action,
}: {
  icon?: string;
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty">
      <Icon n={icon} size={26} />
      <b>{title}</b>
      {hint ? <p>{hint}</p> : null}
      {action ?? null}
    </div>
  );
}

export function PageHead({
  title,
  sub,
  children,
}: {
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="page-head">
      <div>
        <h1 className="h1">{title}</h1>
        {sub ? <div className="sub">{sub}</div> : null}
      </div>
      {children ? <div className="actions">{children}</div> : null}
    </div>
  );
}

export interface Crumb {
  label: string;
  href?: string;
}

export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs">
      {items.map((c, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {i > 0 ? <Icon n="chevR" /> : null}
          {c.href && i < items.length - 1 ? (
            <Link to={c.href}>{c.label}</Link>
          ) : (
            <span className="cur">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
