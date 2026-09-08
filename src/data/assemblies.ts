import type { Assembly } from '../types';

export const ASSEMBLIES: Assembly[] = [
  { code: 'ASM-001', name: 'Conveyor Frame', project: 'PRJ-26001', parent: null, completion: 58, currentOp: 'Welding' },
  { code: 'ASM-001.1', name: 'Main Structure', project: 'PRJ-26001', parent: 'ASM-001', completion: 64, currentOp: 'Bending' },
  { code: 'ASM-001.2', name: 'Leg Sets', project: 'PRJ-26001', parent: 'ASM-001', completion: 41, currentOp: 'Laser Cut' },
  { code: 'ASM-002', name: 'Drive Unit Housing', project: 'PRJ-26001', parent: null, completion: 47, currentOp: 'Machining' },
  { code: 'ASM-003', name: 'Belt Support Rollers Frame', project: 'PRJ-26001', parent: null, completion: 72, currentOp: 'QC' },
  { code: 'ASM-004', name: 'Guarding & Covers', project: 'PRJ-26001', parent: null, completion: 33, currentOp: 'Powder Coat' },
  { code: 'ASM-020', name: 'Collector Body', project: 'PRJ-26004', parent: null, completion: 68, currentOp: 'Welding' },
  { code: 'ASM-021', name: 'Hopper', project: 'PRJ-26004', parent: null, completion: 55, currentOp: 'Rolling' },
  { code: 'ASM-022', name: 'Support Frame', project: 'PRJ-26004', parent: null, completion: 40, currentOp: 'Laser Cut' },
];

export function findAssembly(code: string): Assembly | undefined {
  return ASSEMBLIES.find((a) => a.code === code);
}

export function projectAssemblies(projectCode: string): Assembly[] {
  return ASSEMBLIES.filter((a) => a.project === projectCode);
}
