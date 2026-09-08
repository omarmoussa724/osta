export type Tone = 'ok' | 'info' | 'warn' | 'crit' | 'violet' | 'idle' | 'accent';

export const TONE_HEX: Record<Tone, string> = {
  ok: '#35C88F',
  info: '#4C9AFF',
  warn: '#E0A63C',
  crit: '#E5484D',
  violet: '#9A7CF0',
  idle: '#6D7681',
  accent: '#4C9AFF',
};

export function toneColor(t: Tone | string): string {
  return TONE_HEX[t as Tone] ?? TONE_HEX.idle;
}

/** Manufacturing status vocabulary — the required shared component reads from this. */
export type MfgStatusKey =
  | 'NOT_STARTED'
  | 'READY'
  | 'IN_PRODUCTION'
  | 'BLOCKED'
  | 'QC'
  | 'PASSED'
  | 'FAILED'
  | 'OUTSOURCED'
  | 'COMPLETE';

export const MFG: Record<MfgStatusKey, { label: string; tone: Tone }> = {
  NOT_STARTED: { label: 'Not Started', tone: 'idle' },
  READY: { label: 'Ready', tone: 'ok' },
  IN_PRODUCTION: { label: 'In Production', tone: 'info' },
  BLOCKED: { label: 'Blocked', tone: 'crit' },
  QC: { label: 'In QC', tone: 'warn' },
  PASSED: { label: 'QC Passed', tone: 'ok' },
  FAILED: { label: 'QC Failed', tone: 'crit' },
  OUTSOURCED: { label: 'Outsourced', tone: 'violet' },
  COMPLETE: { label: 'Complete', tone: 'ok' },
};

export type ProjStatusKey =
  | 'ENGINEERING'
  | 'MATERIAL'
  | 'NESTING'
  | 'IN_PRODUCTION'
  | 'OUTSOURCED'
  | 'QC'
  | 'ASSEMBLY'
  | 'DELIVERY'
  | 'DELAYED';

export const PROJ_STATUS: Record<ProjStatusKey, { label: string; tone: Tone }> = {
  ENGINEERING: { label: 'Engineering', tone: 'idle' },
  MATERIAL: { label: 'Material', tone: 'warn' },
  NESTING: { label: 'Nesting', tone: 'info' },
  IN_PRODUCTION: { label: 'In Production', tone: 'info' },
  OUTSOURCED: { label: 'Outsourced', tone: 'violet' },
  QC: { label: 'Quality', tone: 'warn' },
  ASSEMBLY: { label: 'Assembly', tone: 'info' },
  DELIVERY: { label: 'Delivery', tone: 'ok' },
  DELAYED: { label: 'Delayed', tone: 'crit' },
};

export const OUT_STEPS = [
  'RELEASED',
  'MATERIAL_CONFIRMED',
  'PRODUCTION',
  'QC',
  'DISPATCH',
  'RECEIVED',
] as const;

export type OutStatusKey =
  | 'RFQ_SENT'
  | 'RELEASED'
  | 'MATERIAL_CONFIRMED'
  | 'PRODUCTION'
  | 'QC'
  | 'DISPATCH'
  | 'RECEIVED'
  | 'AT_RISK';

export const OUT_STATUS: Record<OutStatusKey, { label: string; tone: Tone; step: number }> = {
  RFQ_SENT: { label: 'RFQ Sent', tone: 'idle', step: -1 },
  RELEASED: { label: 'Released', tone: 'idle', step: 0 },
  MATERIAL_CONFIRMED: { label: 'Material Confirmed', tone: 'info', step: 1 },
  PRODUCTION: { label: 'In Production', tone: 'info', step: 2 },
  QC: { label: 'In QC', tone: 'warn', step: 3 },
  DISPATCH: { label: 'Dispatched', tone: 'info', step: 4 },
  RECEIVED: { label: 'Received', tone: 'ok', step: 5 },
  AT_RISK: { label: 'At Risk', tone: 'crit', step: 2 },
};
