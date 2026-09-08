import type { Supplier } from '../types';

export const SUPPLIERS: Supplier[] = [
  { id: 'SUP-01', name: 'Cairo Precision Fabrication', city: '6th of October City', processes: ['Laser Cutting', 'Press Brake'], rating: 4.6, onTime: 91, capacity: 78, contact: 'Eng. Karim Fouad', phone: '+20 100 442 8817', email: 'karim@cairoprecision.com.eg' },
  { id: 'SUP-02', name: 'Alexandria Steel Fabricators', city: 'Alexandria', processes: ['Welding', 'Assembly'], rating: 4.2, onTime: 84, capacity: 64, contact: 'Eng. Mostafa Zaghloul', phone: '+20 122 771 0043', email: 'ops@alexsteelfab.com' },
  { id: 'SUP-03', name: '10th of Ramadan Machining', city: '10th of Ramadan City', processes: ['CNC Machining'], rating: 4.7, onTime: 95, capacity: 59, contact: 'Eng. Hoda Nasr', phone: '+20 101 209 3355', email: 'hoda@tor-machining.com' },
  { id: 'SUP-04', name: 'Delta Metal Works', city: 'Tanta', processes: ['Laser Cutting', 'Punching'], rating: 3.9, onTime: 78, capacity: 81, contact: 'Mr. Sameh Ibrahim', phone: '+20 128 640 1192', email: 'sameh@deltametalworks.net' },
  { id: 'SUP-05', name: 'Helwan Heavy Industries', city: 'Helwan', processes: ['Plate Rolling', 'Heavy Fabrication'], rating: 4.4, onTime: 88, capacity: 47, contact: 'Eng. Tarek El-Deeb', phone: '+20 106 553 9027', email: 'tarek@hhi.com.eg' },
  { id: 'SUP-06', name: 'Borg El Arab Galvanizing', city: 'Borg El Arab', processes: ['Hot-Dip Galvanizing'], rating: 4.1, onTime: 82, capacity: 70, contact: 'Mr. Ayman Saad', phone: '+20 111 330 7744', email: 'ayman@beagalv.com' },
  { id: 'SUP-07', name: 'El Obour Powder Coating', city: 'El Obour City', processes: ['Powder Coating', 'Painting'], rating: 4.3, onTime: 86, capacity: 66, contact: 'Eng. Nourhan Adel', phone: '+20 109 884 2201', email: 'nourhan@obourcoat.com' },
  { id: 'SUP-08', name: 'Nasr Casting & Forging', city: 'Cairo', processes: ['Casting', 'Forging'], rating: 3.7, onTime: 72, capacity: 38, contact: 'Mr. Gamal Farid', phone: '+20 127 501 6690', email: 'gamal@nasrcasting.com' },
];

export function findSupplier(id: string): Supplier {
  return SUPPLIERS.find((s) => s.id === id) ?? SUPPLIERS[0];
}
