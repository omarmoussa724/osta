import { toneColor, type Tone } from '../lib/status';
import { fmtInt } from '../lib/format';

export function Spark({
  data,
  w = 72,
  h = 22,
  color = 'var(--accent)',
}: {
  data: number[];
  w?: number;
  h?: number;
  color?: string;
}) {
  const mn = Math.min(...data);
  const mx = Math.max(...data);
  const rng = mx - mn || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - mn) / rng) * (h - 3) - 1.5,
  ]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2" fill={color} />
    </svg>
  );
}

export function BarsH({
  rows,
  unit,
  fmt,
}: {
  rows: { k: string; v: number; tone?: Tone }[];
  unit?: string;
  fmt?: (n: number) => string;
}) {
  const mx = Math.max(...rows.map((r) => r.v)) || 1;
  return (
    <div className="stack" style={{ gap: 10 }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 82px', alignItems: 'center', gap: 12 }}>
          <span className="dim" style={{ fontSize: 12 }}>{r.k}</span>
          <div className="bar tall">
            <i style={{ width: (r.v / mx) * 100 + '%', background: r.tone ? toneColor(r.tone) : 'var(--accent)' }} />
          </div>
          <span className="mono tnum" style={{ fontSize: 11, textAlign: 'right', color: 'var(--ink-2)' }}>
            {fmt ? fmt(r.v) : fmtInt(r.v) + (unit ? ' ' + unit : '')}
          </span>
        </div>
      ))}
    </div>
  );
}

export function AreaTrend({
  data,
  target,
  height = 150,
}: {
  data: number[];
  target?: number;
  height?: number;
}) {
  const w = 520;
  const h = height;
  const pl = 6;
  const pr = 6;
  const pt = 10;
  const pb = 18;
  const mn = Math.min(...data, target ?? Infinity) - 4;
  const mx = Math.max(...data, target ?? 0) + 4;
  const rng = mx - mn || 1;
  const X = (i: number) => pl + (i / (data.length - 1)) * (w - pl - pr);
  const Y = (v: number) => pt + (1 - (v - mn) / rng) * (h - pt - pb);
  const line = data.map((v, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1)).join(' ');
  const area = `${line} L ${X(data.length - 1).toFixed(1)} ${h - pb} L ${X(0).toFixed(1)} ${h - pb} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4C9AFF" stopOpacity="0.28" />
          <stop offset="1" stopColor="#4C9AFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((f, i) => (
        <line key={i} x1={pl} x2={w - pr} y1={pt + f * (h - pt - pb)} y2={pt + f * (h - pt - pb)} stroke="#252A32" strokeWidth="1" />
      ))}
      {target ? <line x1={pl} x2={w - pr} y1={Y(target)} y2={Y(target)} stroke="#35C88F" strokeWidth="1" strokeDasharray="4 4" /> : null}
      {target ? (
        <text x={w - pr} y={Y(target) - 4} textAnchor="end" fontSize="9" fill="#35C88F">
          target {target}%
        </text>
      ) : null}
      <path d={area} fill="url(#ag)" />
      <path d={line} fill="none" stroke="#4C9AFF" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={X(data.length - 1)} cy={Y(data[data.length - 1])} r="3" fill="#4C9AFF" />
      <text x={pl} y={h - 5} fontSize="9" fill="#6D7681">12 weeks ago</text>
      <text x={w - pr} y={h - 5} textAnchor="end" fontSize="9" fill="#6D7681">now</text>
    </svg>
  );
}
