import type { Issue } from '../types';

export const ISSUES: Issue[] = [
  { id: 'NCR-018', ref: 'P-001262', refType: 'part', severity: 'Critical', status: 'Open', opened: '2026-09-05', owner: 'QC · R. Zaki', title: 'Dimensional: hole pattern +1.8 mm out of tolerance', assembly: 'ASM-002' },
  { id: 'NCR-017', ref: 'P-001280', refType: 'part', severity: 'Major', status: 'In Rework', opened: '2026-09-03', owner: 'Welding · R. Hany', title: 'Weld porosity on 2 of 6 mesh guard frames', assembly: 'ASM-004' },
  { id: 'NCR-016', ref: 'SUP-04', refType: 'supplier', severity: 'Major', status: 'Open', opened: '2026-09-04', owner: 'Procurement', title: 'Late material delivery against RFQ-0266', assembly: null },
  { id: 'NCR-015', ref: 'P-001246', refType: 'part', severity: 'Minor', status: 'Closed', opened: '2026-08-29', owner: 'QC · N. Fahmy', title: 'Surface scratch on base plate — reworked & re-inspected', assembly: 'ASM-001.1' },
  { id: 'NCR-014', ref: 'S235JR-6', refType: 'material', severity: 'Major', status: 'Open', opened: '2026-09-02', owner: 'Procurement', title: 'Mill certificate missing on heat lot H2291', assembly: null },
  { id: 'NCR-013', ref: 'ASM-004', refType: 'assembly', severity: 'Major', status: 'Open', opened: '2026-09-06', owner: 'Production', title: '3 guard panels rejected at final dimensional QC', assembly: 'ASM-004' },
];

export function findIssue(id: string): Issue | undefined {
  return ISSUES.find((i) => i.id === id);
}
