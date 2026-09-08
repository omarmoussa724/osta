import { hexA, mulberry32 } from '../lib/cn';
import type { Nest } from '../types';

/** Illustrative shelf-pack of a sheet — demonstrates the nesting concept, not a real nest. */
export function SheetView({ nest, big }: { nest: Nest; big?: boolean }) {
  const seed = parseInt(nest.id.replace(/\D/g, ''), 10) || 1;
  const rng = mulberry32(seed);
  const W = big ? 640 : 380;
  const scale = W / nest.sheetL;
  const H = nest.sheetW * scale;
  const pad = 6;
  const gap = 5;
  const rects: { x: number; y: number; pw: number; ph: number }[] = [];
  let x = pad;
  let y = pad;
  let rowH = 0;
  for (let i = 0; i < nest.parts; i++) {
    const pw = (28 + rng() * 70) * (big ? 1.5 : 1);
    const ph = (22 + rng() * 54) * (big ? 1.5 : 1);
    if (x + pw > W - pad) {
      x = pad;
      y += rowH + gap;
      rowH = 0;
    }
    if (y + ph > H - pad) break;
    rects.push({ x, y, pw, ph });
    x += pw + gap;
    rowH = Math.max(rowH, ph);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: big ? 320 : 200 }}>
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} fill="#0E1116" stroke="#2F353F" />
      {rects.map((r, i) => (
        <rect
          key={i}
          x={r.x}
          y={r.y}
          width={r.pw}
          height={r.ph}
          rx="1.5"
          fill={hexA('#4C9AFF', 0.16)}
          stroke="#4C9AFF"
          strokeWidth="1"
          strokeOpacity="0.55"
        />
      ))}
      <text x={W - 6} y={H - 6} textAnchor="end" fontSize="9" fill="#6D7681" fontFamily="var(--mono)">
        {nest.sheetW} × {nest.sheetL} mm · {nest.grade} {nest.thk} mm
      </text>
    </svg>
  );
}
