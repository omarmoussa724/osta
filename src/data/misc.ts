import type { FlowStage, Risk, Kpi } from '../types';

export const FLOW: FlowStage[] = [
  { key: 'ENGINEERING', count: 38, delayed: 4, status: 'ok' },
  { key: 'MATERIAL', count: 210, delayed: 12, status: 'warn' },
  { key: 'NESTING', count: 96, delayed: 3, status: 'ok' },
  { key: 'CUTTING', count: 142, delayed: 18, status: 'crit' },
  { key: 'BENDING', count: 96, delayed: 7, status: 'ok' },
  { key: 'WELDING', count: 73, delayed: 4, status: 'ok' },
  { key: 'QC', count: 41, delayed: 6, status: 'warn' },
  { key: 'ASSEMBLY', count: 24, delayed: 2, status: 'ok' },
];

export const RISKS: Risk[] = [
  { sev: 'crit', title: 'Material shortage — 6 mm S235JR', meta: '1.7 t short · blocks 4× Side Plate at cut', tag: 'P-001245', href: '/parts/P-001245' },
  { sev: 'warn', title: 'Supplier delivery at risk', meta: 'Cairo Precision Fabrication · 2 days remaining', tag: 'OUT-0261', href: '/outsourcing/OUT-0261' },
  { sev: 'crit', title: 'QC failure — 3 parts rejected', meta: 'Guarding & Covers · dimensional non-conformance', tag: 'ASM-004', href: '/projects/PRJ-26001/asm/ASM-004' },
  { sev: 'warn', title: 'Nesting utilisation below target', meta: '68% vs 80% target · 2 mm S235JR', tag: 'PRJ-26003', href: '/nesting/NEST-0265' },
  { sev: 'crit', title: 'Material shortage — 3 mm SS316', meta: '0.3 t short · blocks Pressure Vessel Skid', tag: 'PRJ-26007', href: '/materials' },
  { sev: 'warn', title: 'Galvanizing job overdue risk', meta: 'Borg El Arab · bath 3 days past need date', tag: 'OUT-0265', href: '/outsourcing/OUT-0265' },
  { sev: 'warn', title: 'Open critical NCR', meta: 'Shaft Cover · hole pattern out of tolerance', tag: 'NCR-018', href: '/issues' },
];

export const KPIS: Kpi[] = [
  { label: 'Active Projects', value: '12', foot: '+2 vs last month', dir: 'up', spark: [8, 9, 9, 10, 10, 11, 11, 12] },
  { label: 'Parts in Production', value: '486', foot: '+34 this week', dir: 'up', spark: [410, 422, 431, 448, 455, 463, 470, 486] },
  { label: 'Outsourced Parts', value: '74', foot: 'across 9 RFQs', dir: 'flat', spark: [52, 58, 61, 63, 66, 68, 71, 74] },
  { label: 'Material Exposure', value: 'EGP 1.84M', foot: 'open reservations', dir: 'flat', spark: [1.4, 1.5, 1.55, 1.6, 1.7, 1.72, 1.8, 1.84] },
  { label: 'At Risk', value: '18', foot: '6 critical · 12 watch', dir: 'up', spark: [9, 11, 10, 13, 14, 15, 16, 18] },
  { label: 'On-Time Delivery', value: '87%', foot: '-3% vs target 90%', dir: 'down', spark: [82, 85, 84, 88, 90, 86, 89, 87] },
];

export const ONTIME_TREND = [82, 84, 83, 86, 88, 85, 89, 90, 86, 88, 89, 87];

export const OUT_SPEND = [
  { k: 'Plate Rolling', v: 210000 },
  { k: 'Laser Cutting', v: 230000 },
  { k: 'Welding', v: 176000 },
  { k: 'CNC Machining', v: 88000 },
  { k: 'Powder / Paint', v: 74000 },
  { k: 'Galvanizing', v: 61000 },
];

export const EXPOSURE_BY_GRADE = [
  { k: 'S235JR', v: 642000 },
  { k: 'S355JR', v: 548000 },
  { k: 'SS304', v: 398000 },
  { k: 'SS316', v: 252000 },
];

export const STOCK = [
  { mat: 'S235JR 6 mm', lot: 'H2291', loc: 'Rack A1', qty: 2100, state: 'Quarantine' },
  { mat: 'S235JR 6 mm', lot: 'H2264', loc: 'Rack A1', qty: 2100, state: 'Available' },
  { mat: 'S235JR 8 mm', lot: 'H2270', loc: 'Rack A2', qty: 1400, state: 'Available' },
  { mat: 'S235JR 8 mm', lot: 'H2270', loc: 'Rack A2', qty: 1400, state: 'Reserved' },
  { mat: 'S355JR 10 mm', lot: 'H3105', loc: 'Rack B1', qty: 2400, state: 'Available' },
  { mat: 'S355JR 10 mm', lot: 'H3105', loc: 'Rack B1', qty: 2600, state: 'Reserved' },
  { mat: 'S355JR 15 mm', lot: 'H3140', loc: 'Rack B3', qty: 1000, state: 'Available' },
  { mat: 'SS304 3 mm', lot: 'X8801', loc: 'Rack C1', qty: 700, state: 'Available' },
  { mat: 'SS316 3 mm', lot: 'X9203', loc: 'Rack C2', qty: 400, state: 'Available' },
];

export const MOVES = [
  { t: '2026-09-06', k: 'Issued', mat: 'S355JR 10 mm', qty: -620, ref: 'PJ-4103 · Cross Member' },
  { t: '2026-09-05', k: 'Received', mat: 'SS304 3 mm', qty: 700, ref: 'PO-1188 · Ezz Steel' },
  { t: '2026-09-05', k: 'Reserved', mat: 'S355JR 10 mm', qty: -2600, ref: 'PRJ-26004' },
  { t: '2026-09-04', k: 'Quarantine', mat: 'S235JR 6 mm', qty: -2100, ref: 'NCR-014 · missing cert' },
  { t: '2026-09-03', k: 'Issued', mat: 'S235JR 8 mm', qty: -410, ref: 'PJ-4102 · Base Plate' },
];

export const RULES: [string, string][] = [
  ['Work Order belongs to an Assembly', 'Every WO is created against exactly one assembly context (Project + Assembly code).'],
  ['WO requires at least one Part', 'A Work Order cannot be opened for an assembly that contains no released parts.'],
  ['Part number is consistent everywhere', 'The same Part No is used across BOM, Nesting, Production, Outsourcing and QC.'],
  ['Final dimensional QC is mandatory', 'FINAL_DIM_QC is a required gate on every part route.'],
  ['No "Ready for Assembly" before FINAL_DIM_QC', 'A part cannot be released to assembly until final QC passes.'],
  ['Material shortages surface as risks', 'Any negative net availability automatically raises an operational risk.'],
  ['Outsourced jobs carry a delivery state', 'Every subcontract order has an explicit Released -> Received state.'],
];
