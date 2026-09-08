import type { MfgStatusKey, ProjStatusKey, OutStatusKey, Tone } from '../lib/status';

export interface Project {
  code: string;
  name: string;
  customer: string;
  start: string;
  due: string;
  progress: number;
  status: ProjStatusKey;
  phases: Record<string, number>;
}

export interface Assembly {
  code: string;
  name: string;
  project: string;
  parent: string | null;
  completion: number;
  currentOp: string;
}

export interface Part {
  id: string;
  desc: string;
  project: string;
  assembly: string;
  grade: string;
  thk: number;
  qty: number;
  unitKg: number;
  weightKg: number;
  rev: string;
  drawing: string;
  cad: string;
  ops: string[];
  opIndex: number;
  status: MfgStatusKey;
  machine: string | null;
  outsource: string | null;
  qcState: 'NONE' | 'PENDING' | 'PASSED' | 'FAILED';
  note: string | null;
  matKey: string | null;
}

export interface PartInput {
  id: string;
  desc: string;
  project: string;
  assembly: string;
  grade: string;
  thk: number;
  qty: number;
  unitKg: number;
  rev: string;
  drawing?: string;
  cad?: string;
  ops: string[];
  opIndex: number;
  status: MfgStatusKey;
  machine?: string | null;
  outsource?: string | null;
  qcState?: Part['qcState'];
  note?: string | null;
}

export interface Material {
  grade: string;
  thk: number;
  family: string;
  avail: number;
  reserved: number;
  required: number;
  price: number;
  key: string;
  shortage: number;
}

export interface Machine {
  id: string;
  name: string;
  group: string;
  util: number;
  queue: number;
}

export interface Supplier {
  id: string;
  name: string;
  city: string;
  processes: string[];
  rating: number;
  onTime: number;
  capacity: number;
  contact: string;
  phone: string;
  email: string;
}

export interface OutsourceOrder {
  id: string;
  rfq: string;
  supplier: string;
  project: string;
  process: string;
  partsCount: number;
  parts: string[];
  weightT: number;
  value: number;
  actual: number | null;
  due: string;
  status: OutStatusKey;
  sent: string;
  eta: string | null;
  note?: string;
}

export interface ProductionJob {
  id: string;
  part: string;
  op: string;
  machine: string;
  operator: string;
  qty: number;
  due: string;
  progress: number;
  col: 'READY' | 'IN_PRODUCTION' | 'QC' | 'COMPLETE' | 'BLOCKED';
  block?: string;
}

export interface QCInspection {
  id: string;
  part: string;
  type: 'INCOMING' | 'IN_PROCESS' | 'FINAL_DIM_QC';
  result: 'PASSED' | 'FAILED' | 'PENDING';
  date: string;
  inspector: string;
  note: string;
}

export interface Issue {
  id: string;
  ref: string;
  refType: 'part' | 'assembly' | 'supplier' | 'material';
  severity: 'Critical' | 'Major' | 'Minor';
  status: 'Open' | 'In Rework' | 'Closed';
  opened: string;
  owner: string;
  title: string;
  assembly: string | null;
}

export interface Nest {
  id: string;
  project: string;
  grade: string;
  thk: number;
  sheetW: number;
  sheetL: number;
  parts: number;
  util: number;
  machine: string;
  status: 'READY' | 'RUNNING' | 'QUEUED' | 'BELOW_TARGET';
}

export interface FlowStage {
  key: string;
  count: number;
  delayed: number;
  status: 'ok' | 'warn' | 'crit';
}

export interface Risk {
  sev: Tone;
  title: string;
  meta: string;
  tag: string;
  href: string;
}

export interface Kpi {
  label: string;
  value: string;
  foot: string;
  dir: 'up' | 'down' | 'flat';
  spark: number[];
}

export interface SearchEntry {
  type: string;
  label: string;
  sub: string;
  code: string;
  href: string;
  icon: string;
}

export interface Connection {
  type: string;
  label: string;
  sub: string;
  href: string;
  icon: string;
}
