import type { Material } from '../types';

const RAW = [
  { grade: 'S235JR', thk: 6, family: 'Structural Steel', avail: 4.2, reserved: 2.1, required: 3.8, price: 48000 },
  { grade: 'S235JR', thk: 8, family: 'Structural Steel', avail: 2.8, reserved: 1.4, required: 2.1, price: 48000 },
  { grade: 'S235JR', thk: 10, family: 'Structural Steel', avail: 6.5, reserved: 2.0, required: 3.1, price: 48000 },
  { grade: 'S235JR', thk: 12, family: 'Structural Steel', avail: 3.1, reserved: 0.9, required: 1.2, price: 49500 },
  { grade: 'S235JR', thk: 3, family: 'Structural Steel', avail: 2.4, reserved: 0.7, required: 1.0, price: 47000 },
  { grade: 'S235JR', thk: 2, family: 'Structural Steel', avail: 1.9, reserved: 1.1, required: 1.6, price: 47000 },
  { grade: 'S355JR', thk: 10, family: 'High-Strength Steel', avail: 5.0, reserved: 2.6, required: 4.2, price: 62000 },
  { grade: 'S355JR', thk: 12, family: 'High-Strength Steel', avail: 2.2, reserved: 1.0, required: 1.4, price: 63500 },
  { grade: 'S355JR', thk: 15, family: 'High-Strength Steel', avail: 1.6, reserved: 0.6, required: 0.9, price: 64000 },
  { grade: 'SS304', thk: 2, family: 'Stainless Steel', avail: 0.9, reserved: 0.3, required: 0.5, price: 210000 },
  { grade: 'SS304', thk: 3, family: 'Stainless Steel', avail: 1.2, reserved: 0.5, required: 0.8, price: 212000 },
  { grade: 'SS316', thk: 3, family: 'Stainless Steel', avail: 0.6, reserved: 0.2, required: 0.7, price: 340000 },
];

export const MATERIALS: Material[] = RAW.map((m) => ({
  ...m,
  key: `${m.grade}-${m.thk}`,
  shortage: Math.max(0, +(m.required - (m.avail - m.reserved)).toFixed(1)),
}));

export function findMat(grade: string, thk: number): Material | undefined {
  return MATERIALS.find((m) => m.grade === grade && m.thk === thk);
}
