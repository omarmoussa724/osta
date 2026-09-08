import type { Part, PartInput } from '../types';
import { findMat } from './materials';

function mkPart(o: PartInput): Part {
  const mat = findMat(o.grade, o.thk);
  return {
    id: o.id,
    desc: o.desc,
    project: o.project,
    assembly: o.assembly,
    grade: o.grade,
    thk: o.thk,
    qty: o.qty,
    unitKg: o.unitKg,
    weightKg: +(o.unitKg * o.qty).toFixed(1),
    rev: o.rev,
    drawing: o.drawing ?? `DRW-${o.project.slice(4)}-${o.id.slice(2)}`,
    cad: o.cad ?? `${o.id}_rev${o.rev}.step`,
    ops: o.ops,
    opIndex: o.opIndex,
    status: o.status,
    machine: o.machine ?? null,
    outsource: o.outsource ?? null,
    qcState: o.qcState ?? 'NONE',
    note: o.note ?? null,
    matKey: mat ? mat.key : null,
  };
}

const STD = ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'Bend', 'Weld', 'FINAL_DIM_QC', 'Ready for Assembly'];

export const PARTS: Part[] = [
  mkPart({ id: 'P-001245', desc: 'Side Plate', project: 'PRJ-26001', assembly: 'ASM-001.1', grade: 'S235JR', thk: 6, qty: 4, unitKg: 18.4, rev: 'B', ops: STD, opIndex: 2, status: 'BLOCKED', machine: 'TRUMPF TruLaser 5030', qcState: 'NONE', note: 'Blocked at Material Reserved — 6 mm S235JR shortage of 1.7 t. Heat lot pending mill certificate.' }),
  mkPart({ id: 'P-001246', desc: 'Base Plate', project: 'PRJ-26001', assembly: 'ASM-001.1', grade: 'S235JR', thk: 8, qty: 2, unitKg: 42.1, rev: 'A', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'Weld', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 5, status: 'IN_PRODUCTION', machine: 'Welding Cell 1 · MIG', qcState: 'NONE' }),
  mkPart({ id: 'P-001247', desc: 'Corner Gusset', project: 'PRJ-26001', assembly: 'ASM-001.1', grade: 'S235JR', thk: 6, qty: 8, unitKg: 2.3, rev: 'A', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'Bend', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 7, status: 'READY', qcState: 'PASSED' }),
  mkPart({ id: 'P-001248', desc: 'Cross Member', project: 'PRJ-26001', assembly: 'ASM-001.1', grade: 'S355JR', thk: 10, qty: 6, unitKg: 27.8, rev: 'C', ops: STD, opIndex: 5, status: 'IN_PRODUCTION', machine: 'TRUMPF TruBend 7036', qcState: 'NONE' }),
  mkPart({ id: 'P-001249', desc: 'Top Rail', project: 'PRJ-26001', assembly: 'ASM-001.1', grade: 'S355JR', thk: 10, qty: 2, unitKg: 33.5, rev: 'B', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'Bend', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 6, status: 'QC', machine: 'CMM Inspection Bench', qcState: 'PENDING' }),
  mkPart({ id: 'P-001250', desc: 'Foot Pad', project: 'PRJ-26001', assembly: 'ASM-001.2', grade: 'S235JR', thk: 12, qty: 8, unitKg: 5.1, rev: 'A', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Outsourced · Laser Cut', 'Drill', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 3, status: 'OUTSOURCED', outsource: 'OUT-0261', qcState: 'NONE' }),
  mkPart({ id: 'P-001251', desc: 'Angle Bracket', project: 'PRJ-26001', assembly: 'ASM-001.2', grade: 'SS304', thk: 3, qty: 12, unitKg: 0.8, rev: 'A', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'Bend', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 1, status: 'NOT_STARTED', qcState: 'NONE' }),
  mkPart({ id: 'P-001252', desc: 'Cover Panel', project: 'PRJ-26001', assembly: 'ASM-004', grade: 'S235JR', thk: 2, qty: 4, unitKg: 6.2, rev: 'B', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Punch', 'Bend', 'Outsourced · Powder Coat', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 6, status: 'OUTSOURCED', outsource: 'OUT-0263', qcState: 'NONE' }),
  mkPart({ id: 'P-001260', desc: 'Housing Wall', project: 'PRJ-26001', assembly: 'ASM-002', grade: 'S235JR', thk: 8, qty: 4, unitKg: 21.0, rev: 'A', ops: STD, opIndex: 4, status: 'IN_PRODUCTION', machine: 'TRUMPF TruLaser 3030', qcState: 'NONE' }),
  mkPart({ id: 'P-001261', desc: 'Motor Mount Plate', project: 'PRJ-26001', assembly: 'ASM-002', grade: 'S355JR', thk: 15, qty: 1, unitKg: 48.0, rev: 'B', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Outsourced · CNC Machining', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 3, status: 'OUTSOURCED', outsource: 'OUT-0262', qcState: 'NONE' }),
  mkPart({ id: 'P-001262', desc: 'Shaft Cover', project: 'PRJ-26001', assembly: 'ASM-002', grade: 'SS304', thk: 3, qty: 2, unitKg: 3.4, rev: 'A', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Punch', 'Bend', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 6, status: 'FAILED', machine: 'CMM Inspection Bench', qcState: 'FAILED', note: 'FINAL_DIM_QC failed — hole pattern +1.8 mm out of position. NCR-018 raised, rework in progress.' }),
  mkPart({ id: 'P-001263', desc: 'Bearing Bracket', project: 'PRJ-26001', assembly: 'ASM-002', grade: 'S355JR', thk: 12, qty: 2, unitKg: 9.7, rev: 'A', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'CNC Machining', 'Weld', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 5, status: 'IN_PRODUCTION', machine: 'Haas VF-4', qcState: 'NONE' }),
  mkPart({ id: 'P-001280', desc: 'Mesh Guard Frame', project: 'PRJ-26001', assembly: 'ASM-004', grade: 'S235JR', thk: 3, qty: 6, unitKg: 7.9, rev: 'B', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'Bend', 'Weld', 'Outsourced · Painting', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 6, status: 'IN_PRODUCTION', machine: 'Welding Cell 2 · TIG', qcState: 'NONE', note: 'NCR-017 open — weld porosity on 2 of 6 frames, in rework.' }),
  mkPart({ id: 'P-001281', desc: 'Side Guard Panel', project: 'PRJ-26001', assembly: 'ASM-004', grade: 'S235JR', thk: 2, qty: 10, unitKg: 4.6, rev: 'A', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Punch', 'Bend', 'Outsourced · Powder Coat', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 4, status: 'IN_PRODUCTION', machine: 'TRUMPF TruPunch 5000', qcState: 'NONE' }),
  mkPart({ id: 'P-001282', desc: 'Access Door', project: 'PRJ-26001', assembly: 'ASM-004', grade: 'S235JR', thk: 2, qty: 2, unitKg: 9.1, rev: 'A', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Punch', 'Bend', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 7, status: 'READY', qcState: 'PASSED' }),
  mkPart({ id: 'P-002010', desc: 'Body Panel', project: 'PRJ-26004', assembly: 'ASM-020', grade: 'S235JR', thk: 3, qty: 8, unitKg: 14.2, rev: 'B', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'Bend', 'Weld', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 6, status: 'IN_PRODUCTION', machine: 'Welding Cell 1 · MIG', qcState: 'NONE' }),
  mkPart({ id: 'P-002011', desc: 'Tube Sheet', project: 'PRJ-26004', assembly: 'ASM-020', grade: 'S235JR', thk: 10, qty: 1, unitKg: 88.0, rev: 'A', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'Drill', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 6, status: 'QC', machine: 'CMM Inspection Bench', qcState: 'PENDING' }),
  mkPart({ id: 'P-002012', desc: 'Stiffener', project: 'PRJ-26004', assembly: 'ASM-020', grade: 'S235JR', thk: 5, qty: 16, unitKg: 3.1, rev: 'A', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'Bend', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 7, status: 'READY', qcState: 'PASSED' }),
  mkPart({ id: 'P-002020', desc: 'Hopper Cone Segment', project: 'PRJ-26004', assembly: 'ASM-021', grade: 'S235JR', thk: 4, qty: 6, unitKg: 22.6, rev: 'C', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'Outsourced · Plate Rolling', 'Weld', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 5, status: 'OUTSOURCED', outsource: 'OUT-0268', qcState: 'NONE' }),
  mkPart({ id: 'P-002021', desc: 'Flange Ring', project: 'PRJ-26004', assembly: 'ASM-021', grade: 'S235JR', thk: 12, qty: 2, unitKg: 31.4, rev: 'A', ops: STD, opIndex: 4, status: 'IN_PRODUCTION', machine: 'TRUMPF TruLaser 5030', qcState: 'NONE' }),
  mkPart({ id: 'P-002030', desc: 'Support Leg', project: 'PRJ-26004', assembly: 'ASM-022', grade: 'S355JR', thk: 10, qty: 4, unitKg: 41.0, rev: 'A', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'Bend', 'Weld', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 4, status: 'IN_PRODUCTION', machine: 'TRUMPF TruBend 7036', qcState: 'NONE' }),
  mkPart({ id: 'P-002031', desc: 'Base Plate', project: 'PRJ-26004', assembly: 'ASM-022', grade: 'S355JR', thk: 15, qty: 4, unitKg: 19.8, rev: 'A', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'Drill', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 1, status: 'NOT_STARTED', qcState: 'NONE' }),
  mkPart({ id: 'P-002032', desc: 'Diagonal Brace', project: 'PRJ-26004', assembly: 'ASM-022', grade: 'S235JR', thk: 6, qty: 8, unitKg: 7.2, rev: 'A', ops: ['Engineering', 'BOM Released', 'Material Reserved', 'Nested', 'Laser Cut', 'FINAL_DIM_QC', 'Ready for Assembly'], opIndex: 0, status: 'NOT_STARTED', qcState: 'NONE' }),
];

export function findPart(id: string): Part | undefined {
  return PARTS.find((p) => p.id === id);
}
export function assemblyParts(code: string): Part[] {
  return PARTS.filter((p) => p.assembly === code);
}
export function projectParts(projectCode: string): Part[] {
  return PARTS.filter((p) => p.project === projectCode);
}
