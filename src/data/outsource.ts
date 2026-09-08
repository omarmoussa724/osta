import type { OutsourceOrder } from '../types';

export const OUTSOURCE: OutsourceOrder[] = [
  { id: 'OUT-0261', rfq: 'RFQ-0261', supplier: 'SUP-01', project: 'PRJ-26001', process: 'Laser Cutting', partsCount: 42, parts: ['P-001250'], weightT: 1.8, value: 145000, actual: null, due: '2026-09-09', status: 'AT_RISK', sent: '2026-08-22', eta: '2026-09-11', note: 'Supplier delivery at risk — 2 days remaining. Nesting confirmed, machine time slipped one shift.' },
  { id: 'OUT-0262', rfq: 'RFQ-0262', supplier: 'SUP-03', project: 'PRJ-26001', process: 'CNC Machining', partsCount: 6, parts: ['P-001261'], weightT: 0.9, value: 88000, actual: 86400, due: '2026-09-15', status: 'QC', sent: '2026-08-25', eta: '2026-09-14' },
  { id: 'OUT-0263', rfq: 'RFQ-0263', supplier: 'SUP-07', project: 'PRJ-26001', process: 'Powder Coating', partsCount: 60, parts: ['P-001252', 'P-001281'], weightT: 0.6, value: 32000, actual: null, due: '2026-09-10', status: 'DISPATCH', sent: '2026-08-28', eta: '2026-09-09' },
  { id: 'OUT-0264', rfq: 'RFQ-0264', supplier: 'SUP-02', project: 'PRJ-26004', process: 'Welding', partsCount: 28, parts: [], weightT: 2.4, value: 176000, actual: null, due: '2026-09-18', status: 'MATERIAL_CONFIRMED', sent: '2026-08-30', eta: '2026-09-17' },
  { id: 'OUT-0265', rfq: 'RFQ-0265', supplier: 'SUP-06', project: 'PRJ-26009', process: 'Hot-Dip Galvanizing', partsCount: 120, parts: [], weightT: 3.1, value: 61000, actual: null, due: '2026-09-09', status: 'RELEASED', sent: '2026-09-01', eta: '2026-09-12', note: 'Overdue risk — bath scheduled 12 Sep, 3 days past customer need date.' },
  { id: 'OUT-0266', rfq: 'RFQ-0266', supplier: 'SUP-04', project: 'PRJ-26003', process: 'Laser Cutting', partsCount: 54, parts: [], weightT: 1.2, value: 47000, actual: null, due: '2026-09-22', status: 'RFQ_SENT', sent: '2026-09-05', eta: null },
  { id: 'OUT-0267', rfq: 'RFQ-0267', supplier: 'SUP-07', project: 'PRJ-26001', process: 'Painting', partsCount: 18, parts: ['P-001280'], weightT: 0.4, value: 21000, actual: null, due: '2026-09-20', status: 'RELEASED', sent: '2026-09-04', eta: '2026-09-19' },
  { id: 'OUT-0268', rfq: 'RFQ-0268', supplier: 'SUP-05', project: 'PRJ-26004', process: 'Plate Rolling', partsCount: 8, parts: ['P-002020'], weightT: 4.6, value: 210000, actual: null, due: '2026-09-25', status: 'MATERIAL_CONFIRMED', sent: '2026-08-27', eta: '2026-09-24' },
  { id: 'OUT-0269', rfq: 'RFQ-0269', supplier: 'SUP-01', project: 'PRJ-26006', process: 'Press Brake', partsCount: 36, parts: [], weightT: 0.7, value: 29500, actual: null, due: '2026-09-14', status: 'PRODUCTION', sent: '2026-08-24', eta: '2026-09-13' },
  { id: 'OUT-0270', rfq: 'RFQ-0270', supplier: 'SUP-04', project: 'PRJ-26010', process: 'Laser Cutting', partsCount: 40, parts: [], weightT: 1.1, value: 38000, actual: 37200, due: '2026-08-30', status: 'RECEIVED', sent: '2026-08-10', eta: '2026-08-29' },
];

export function findOut(id: string): OutsourceOrder | undefined {
  return OUTSOURCE.find((o) => o.id === id || o.rfq === id);
}
