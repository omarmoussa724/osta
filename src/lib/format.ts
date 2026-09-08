/** The single reference date for the MVP data set. */
export const TODAY = new Date('2026-09-07T00:00:00');

export function fmtInt(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return '—';
  return Math.round(n).toLocaleString('en-US');
}

export function fmtEGP(n: number | null | undefined): string {
  if (n == null) return '—';
  if (n >= 1e6) return 'EGP ' + (n / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M';
  if (n >= 1e3) return 'EGP ' + Math.round(n).toLocaleString('en-US');
  return 'EGP ' + fmtInt(n);
}

export function fmtT(kg: number): string {
  const t = kg / 1000;
  return t.toFixed(t < 10 ? 2 : 1).replace(/\.0$/, '') + ' t';
}

export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function fmtDateShort(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
}

export function daysFromToday(iso: string): number {
  const d = new Date(iso + 'T00:00:00');
  return Math.round((d.getTime() - TODAY.getTime()) / 86400000);
}
