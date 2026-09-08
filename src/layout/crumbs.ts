import type { Crumb } from '../components/ui';
import { findProject, findAssembly, findPart } from '../data';

const LABELS: Record<string, string> = {
  projects: 'Projects',
  production: 'Production',
  outsourcing: 'Outsourcing',
  bom: 'BOM',
  parts: 'Parts',
  cadcam: 'CAD / CAM',
  nesting: 'Nesting',
  materials: 'Materials',
  inventory: 'Inventory',
  suppliers: 'Suppliers',
  qc: 'QC',
  issues: 'NCR / Issues',
  analytics: 'Analytics',
  settings: 'Settings',
};

/** Build breadcrumbs from the hash path — every crumb resolves to its object. */
export function resolveCrumbs(pathname: string): Crumb[] {
  const segs = pathname.split('/').filter(Boolean);
  const base: Crumb[] = [{ label: 'OSTA', href: '/' }];
  if (segs.length === 0) return [{ label: 'Command Center' }];
  const [a, b, c, d] = segs;

  if (a === 'projects') {
    const out: Crumb[] = [...base, { label: 'Projects', href: '/projects' }];
    if (b) {
      const p = findProject(b);
      out.push({ label: p ? p.code : b, href: `/projects/${b}` });
      if (c === 'asm' && d) {
        const asm = findAssembly(d);
        out.push({ label: asm ? asm.code : d });
      } else if (c && c !== 'overview') {
        out.push({ label: c.charAt(0).toUpperCase() + c.slice(1) });
      }
    }
    return out;
  }
  if (a === 'parts' && b) {
    const p = findPart(b);
    const out: Crumb[] = [...base, { label: 'Parts', href: '/parts' }];
    if (p) {
      out.push({ label: p.project, href: `/projects/${p.project}` });
      out.push({ label: p.assembly, href: `/projects/${p.project}/asm/${p.assembly}` });
    }
    out.push({ label: b });
    return out;
  }
  if (a === 'outsourcing') {
    const out: Crumb[] = [...base, { label: 'Outsourcing', href: '/outsourcing' }];
    if (b) out.push({ label: b });
    return out;
  }
  if (a === 'nesting') {
    const out: Crumb[] = [...base, { label: 'Nesting', href: '/nesting' }];
    if (b) out.push({ label: b });
    return out;
  }
  return [...base, { label: LABELS[a] ?? a }];
}
