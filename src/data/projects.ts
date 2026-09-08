import type { Project } from '../types';

export const PROJECTS: Project[] = [
  { code: 'PRJ-26001', name: 'Industrial Conveyor', customer: 'ABC Industrial Solutions', start: '2026-06-18', due: '2026-09-30', progress: 63, status: 'IN_PRODUCTION', phases: { Engineering: 100, Material: 90, Nesting: 82, Fabrication: 63, Assembly: 30, QC: 10, Delivery: 0 } },
  { code: 'PRJ-26002', name: 'Storage Tank Platform', customer: 'Suez Cement Company', start: '2026-07-02', due: '2026-10-20', progress: 48, status: 'IN_PRODUCTION', phases: { Engineering: 100, Material: 74, Nesting: 60, Fabrication: 44, Assembly: 20, QC: 6, Delivery: 0 } },
  { code: 'PRJ-26003', name: 'Factory Maintenance Package', customer: 'Delta Food Industries', start: '2026-08-11', due: '2026-10-05', progress: 22, status: 'NESTING', phases: { Engineering: 88, Material: 40, Nesting: 35, Fabrication: 12, Assembly: 0, QC: 0, Delivery: 0 } },
  { code: 'PRJ-26004', name: 'Dust Collector', customer: 'Ezz Steel', start: '2026-06-30', due: '2026-09-25', progress: 71, status: 'IN_PRODUCTION', phases: { Engineering: 100, Material: 96, Nesting: 90, Fabrication: 70, Assembly: 44, QC: 22, Delivery: 0 } },
  { code: 'PRJ-26005', name: 'Mezzanine Steel Structure', customer: 'Orascom Construction', start: '2026-08-20', due: '2026-11-15', progress: 15, status: 'MATERIAL', phases: { Engineering: 70, Material: 30, Nesting: 10, Fabrication: 2, Assembly: 0, QC: 0, Delivery: 0 } },
  { code: 'PRJ-26006', name: 'Bucket Elevator', customer: 'Juhayna Food Industries', start: '2026-07-14', due: '2026-10-12', progress: 55, status: 'IN_PRODUCTION', phases: { Engineering: 100, Material: 80, Nesting: 70, Fabrication: 52, Assembly: 24, QC: 8, Delivery: 0 } },
  { code: 'PRJ-26007', name: 'Pressure Vessel Skid', customer: 'El Sewedy Electric', start: '2026-05-28', due: '2026-09-18', progress: 88, status: 'QC', phases: { Engineering: 100, Material: 100, Nesting: 100, Fabrication: 94, Assembly: 82, QC: 58, Delivery: 10 } },
  { code: 'PRJ-26008', name: 'Screw Conveyor Set', customer: 'Nile Steel Works', start: '2026-06-05', due: '2026-09-22', progress: 79, status: 'ASSEMBLY', phases: { Engineering: 100, Material: 100, Nesting: 96, Fabrication: 88, Assembly: 64, QC: 30, Delivery: 4 } },
  { code: 'PRJ-26009', name: 'Cable Tray System', customer: 'Arab Contractors', start: '2026-07-25', due: '2026-10-30', progress: 34, status: 'OUTSOURCED', phases: { Engineering: 92, Material: 60, Nesting: 48, Fabrication: 22, Assembly: 6, QC: 0, Delivery: 0 } },
  { code: 'PRJ-26010', name: 'Machine Guarding Package', customer: 'Elaraby Group', start: '2026-08-01', due: '2026-10-08', progress: 42, status: 'IN_PRODUCTION', phases: { Engineering: 100, Material: 70, Nesting: 64, Fabrication: 38, Assembly: 14, QC: 4, Delivery: 0 } },
  { code: 'PRJ-26011', name: 'Hopper & Chute Assembly', customer: 'Alexandria Port Authority', start: '2026-08-24', due: '2026-11-20', progress: 12, status: 'MATERIAL', phases: { Engineering: 64, Material: 24, Nesting: 8, Fabrication: 0, Assembly: 0, QC: 0, Delivery: 0 } },
  { code: 'PRJ-26012', name: 'Access Platforms & Ladders', customer: 'EgyptAir Technical Services', start: '2026-05-12', due: '2026-09-12', progress: 94, status: 'DELIVERY', phases: { Engineering: 100, Material: 100, Nesting: 100, Fabrication: 100, Assembly: 96, QC: 88, Delivery: 60 } },
];

export function findProject(code: string): Project | undefined {
  return PROJECTS.find((p) => p.code === code);
}
