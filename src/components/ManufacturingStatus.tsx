import type { ReactNode } from 'react';
import { cn, hexA } from '../lib/cn';
import {
  MFG,
  PROJ_STATUS,
  toneColor,
  type Tone,
  type MfgStatusKey,
  type ProjStatusKey,
} from '../lib/status';

interface PillProps {
  tone: Tone | string;
  children: ReactNode;
  sq?: boolean;
}

/** Status pill — consistent visual treatment for every state in the app. */
export function Pill({ tone, children, sq }: PillProps) {
  const c = toneColor(tone);
  return (
    <span
      className={cn('pill', sq && 'sq')}
      style={{ color: c, background: hexA(c, 0.13), borderColor: hexA(c, 0.3) }}
    >
      <span className="dot" style={{ background: c }} />
      {children}
    </span>
  );
}

/**
 * ManufacturingStatus — the reusable status component.
 * States: NOT_STARTED · READY · IN_PRODUCTION · BLOCKED · QC · PASSED · FAILED · OUTSOURCED · COMPLETE
 */
export function MfgStatus({ s, sq }: { s: MfgStatusKey | string; sq?: boolean }) {
  const m = MFG[s as MfgStatusKey] ?? { label: s, tone: 'idle' as Tone };
  return (
    <Pill tone={m.tone} sq={sq}>
      {m.label}
    </Pill>
  );
}

export function ProjStatus({ s }: { s: ProjStatusKey | string }) {
  const m = PROJ_STATUS[s as ProjStatusKey] ?? { label: s, tone: 'idle' as Tone };
  return <Pill tone={m.tone}>{m.label}</Pill>;
}
