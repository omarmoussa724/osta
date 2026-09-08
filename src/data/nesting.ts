import type { Nest } from '../types';

export const NEST_TARGET = 80;

export const NESTS: Nest[] = [
  { id: 'NEST-0261', project: 'PRJ-26001', grade: 'S235JR', thk: 6, sheetW: 1500, sheetL: 3000, parts: 24, util: 86.4, machine: 'TRUMPF TruLaser 5030', status: 'READY' },
  { id: 'NEST-0262', project: 'PRJ-26001', grade: 'S235JR', thk: 8, sheetW: 1500, sheetL: 3000, parts: 12, util: 79.2, machine: 'TRUMPF TruLaser 5030', status: 'RUNNING' },
  { id: 'NEST-0263', project: 'PRJ-26004', grade: 'S355JR', thk: 10, sheetW: 2000, sheetL: 6000, parts: 8, util: 91.1, machine: 'Bystronic ByStar Fiber', status: 'QUEUED' },
  { id: 'NEST-0264', project: 'PRJ-26001', grade: 'SS304', thk: 3, sheetW: 1250, sheetL: 2500, parts: 40, util: 83.7, machine: 'TRUMPF TruLaser 3030', status: 'READY' },
  { id: 'NEST-0265', project: 'PRJ-26003', grade: 'S235JR', thk: 2, sheetW: 1250, sheetL: 2500, parts: 60, util: 68.0, machine: 'TRUMPF TruPunch 5000', status: 'BELOW_TARGET' },
  { id: 'NEST-0266', project: 'PRJ-26004', grade: 'S235JR', thk: 12, sheetW: 1500, sheetL: 3000, parts: 6, util: 74.5, machine: 'TRUMPF TruLaser 5030', status: 'RUNNING' },
];

export function findNest(id: string): Nest | undefined {
  return NESTS.find((n) => n.id === id);
}
