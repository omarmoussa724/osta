import type { ProductionJob } from '../types';

export const JOBS: ProductionJob[] = [
  { id: 'PJ-4101', part: 'P-001247', op: 'Bend', machine: 'TRUMPF TruBend 7036', operator: 'A. Salah', qty: 8, due: '2026-09-06', progress: 100, col: 'COMPLETE' },
  { id: 'PJ-4114', part: 'P-001282', op: 'Punch', machine: 'TRUMPF TruPunch 5000', operator: 'K. Emad', qty: 2, due: '2026-09-05', progress: 100, col: 'COMPLETE' },
  { id: 'PJ-4102', part: 'P-001246', op: 'Weld', machine: 'Welding Cell 1 · MIG', operator: 'M. Adel', qty: 2, due: '2026-09-09', progress: 60, col: 'IN_PRODUCTION' },
  { id: 'PJ-4103', part: 'P-001248', op: 'Bend', machine: 'TRUMPF TruBend 7036', operator: 'H. Nabil', qty: 6, due: '2026-09-10', progress: 45, col: 'IN_PRODUCTION' },
  { id: 'PJ-4106', part: 'P-001260', op: 'Laser Cut', machine: 'TRUMPF TruLaser 3030', operator: 'S. Wael', qty: 4, due: '2026-09-11', progress: 30, col: 'IN_PRODUCTION' },
  { id: 'PJ-4107', part: 'P-001263', op: 'Machining', machine: 'Haas VF-4', operator: 'T. Gomaa', qty: 2, due: '2026-09-12', progress: 20, col: 'IN_PRODUCTION' },
  { id: 'PJ-4108', part: 'P-001281', op: 'Punch', machine: 'TRUMPF TruPunch 5000', operator: 'K. Emad', qty: 10, due: '2026-09-10', progress: 55, col: 'IN_PRODUCTION' },
  { id: 'PJ-4112', part: 'P-001280', op: 'Weld', machine: 'Welding Cell 2 · TIG', operator: 'R. Hany', qty: 6, due: '2026-09-13', progress: 40, col: 'IN_PRODUCTION' },
  { id: 'PJ-4120', part: 'P-002010', op: 'Weld', machine: 'Welding Cell 1 · MIG', operator: 'M. Adel', qty: 8, due: '2026-09-14', progress: 35, col: 'IN_PRODUCTION' },
  { id: 'PJ-4104', part: 'P-001249', op: 'FINAL_DIM_QC', machine: 'CMM Inspection Bench', operator: 'R. Zaki', qty: 2, due: '2026-09-08', progress: 80, col: 'QC' },
  { id: 'PJ-4121', part: 'P-002011', op: 'FINAL_DIM_QC', machine: 'CMM Inspection Bench', operator: 'R. Zaki', qty: 1, due: '2026-09-09', progress: 65, col: 'QC' },
  { id: 'PJ-4109', part: 'P-001251', op: 'Laser Cut', machine: 'TRUMPF TruLaser 5030', operator: '—', qty: 12, due: '2026-09-16', progress: 0, col: 'READY' },
  { id: 'PJ-4110', part: 'P-002031', op: 'Laser Cut', machine: 'Bystronic ByStar Fiber', operator: '—', qty: 4, due: '2026-09-17', progress: 0, col: 'READY' },
  { id: 'PJ-4122', part: 'P-002032', op: 'Laser Cut', machine: 'Bystronic ByStar Fiber', operator: '—', qty: 8, due: '2026-09-18', progress: 0, col: 'READY' },
  { id: 'PJ-4105', part: 'P-001245', op: 'Laser Cut', machine: 'TRUMPF TruLaser 5030', operator: '—', qty: 4, due: '2026-09-11', progress: 0, col: 'BLOCKED', block: 'Material shortage — 6 mm S235JR' },
  { id: 'PJ-4111', part: 'P-001262', op: 'FINAL_DIM_QC', machine: 'CMM Inspection Bench', operator: 'R. Zaki', qty: 2, due: '2026-09-05', progress: 100, col: 'BLOCKED', block: 'FINAL_DIM_QC failed — NCR-018' },
];
