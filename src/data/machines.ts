import type { Machine } from '../types';

export const MACHINES: Machine[] = [
  { id: 'M-L01', name: 'TRUMPF TruLaser 5030', group: 'Laser Cutting', util: 82, queue: 142 },
  { id: 'M-L02', name: 'TRUMPF TruLaser 3030', group: 'Laser Cutting', util: 68, queue: 61 },
  { id: 'M-L03', name: 'Bystronic ByStar Fiber', group: 'Laser Cutting', util: 59, queue: 40 },
  { id: 'M-P01', name: 'TRUMPF TruPunch 5000', group: 'Punching', util: 74, queue: 88 },
  { id: 'M-B01', name: 'TRUMPF TruBend 7036', group: 'Press Brake', util: 77, queue: 96 },
  { id: 'M-B02', name: 'Amada HG 1303', group: 'Press Brake', util: 55, queue: 44 },
  { id: 'M-C01', name: 'DMG MORI CLX 450', group: 'CNC Turning', util: 41, queue: 12 },
  { id: 'M-C02', name: 'Haas VF-4', group: 'CNC Milling', util: 63, queue: 19 },
  { id: 'M-W01', name: 'Welding Cell 1 · MIG', group: 'Welding', util: 71, queue: 73 },
  { id: 'M-W02', name: 'Welding Cell 2 · TIG', group: 'Welding', util: 48, queue: 22 },
  { id: 'M-W03', name: 'Robotic Welding Cell', group: 'Welding', util: 66, queue: 31 },
  { id: 'M-Q01', name: 'CMM Inspection Bench', group: 'Quality', util: 52, queue: 41 },
];

export function findMachine(name: string): Machine {
  return (
    MACHINES.find((m) => m.name === name) ?? {
      id: '—',
      name,
      group: '—',
      util: 0,
      queue: 0,
    }
  );
}
