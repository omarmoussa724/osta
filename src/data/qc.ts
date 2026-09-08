import type { QCInspection } from '../types';

export const QC: QCInspection[] = [
  { id: 'QC-3301', part: 'P-001247', type: 'FINAL_DIM_QC', result: 'PASSED', date: '2026-09-06', inspector: 'R. Zaki', note: 'All critical dims within ±0.3 mm. Released to assembly.' },
  { id: 'QC-3302', part: 'P-001249', type: 'FINAL_DIM_QC', result: 'PENDING', date: '2026-09-08', inspector: 'R. Zaki', note: 'Scheduled — CMM programme loaded.' },
  { id: 'QC-3303', part: 'P-001262', type: 'FINAL_DIM_QC', result: 'FAILED', date: '2026-09-05', inspector: 'R. Zaki', note: 'Hole pattern +1.8 mm out of position. NCR-018.' },
  { id: 'QC-3304', part: 'P-001246', type: 'IN_PROCESS', result: 'PASSED', date: '2026-09-06', inspector: 'N. Fahmy', note: 'Weld visual + root pass verified.' },
  { id: 'QC-3305', part: 'P-001250', type: 'INCOMING', result: 'PENDING', date: '2026-09-11', inspector: 'N. Fahmy', note: 'Awaiting delivery from Cairo Precision (OUT-0261).' },
  { id: 'QC-3306', part: 'P-001261', type: 'INCOMING', result: 'PASSED', date: '2026-09-04', inspector: 'N. Fahmy', note: 'Machined faces within drawing. Cert received.' },
  { id: 'QC-3307', part: 'P-001280', type: 'IN_PROCESS', result: 'PENDING', date: '2026-09-07', inspector: 'N. Fahmy', note: 'Re-inspect after porosity rework.' },
  { id: 'QC-3308', part: 'P-002011', type: 'FINAL_DIM_QC', result: 'PENDING', date: '2026-09-09', inspector: 'R. Zaki', note: 'Tube sheet drill pattern — full CMM report required.' },
  { id: 'QC-3309', part: 'P-002012', type: 'FINAL_DIM_QC', result: 'PASSED', date: '2026-09-05', inspector: 'R. Zaki', note: 'Batch of 16 sampled per AQL. Pass.' },
  { id: 'QC-3310', part: 'P-001282', type: 'FINAL_DIM_QC', result: 'PASSED', date: '2026-09-04', inspector: 'R. Zaki', note: 'Door fit & hinge line verified.' },
];

export const QC_KPI = { pending: 14, passed30: 212, failed30: 9, ncrOpen: 6, rework: 5 };
