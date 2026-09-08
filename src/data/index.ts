import type { SearchEntry, Connection } from '../types';
import { PROJECTS, findProject } from './projects';
import { ASSEMBLIES, findAssembly } from './assemblies';
import { PARTS, findPart } from './parts';
import { MATERIALS, findMat } from './materials';
import { SUPPLIERS, findSupplier } from './suppliers';
import { OUTSOURCE, findOut } from './outsource';
import { NESTS } from './nesting';
import { JOBS } from './jobs';
import { QC } from './qc';
import { ISSUES } from './issues';

export * from './projects';
export * from './assemblies';
export * from './parts';
export * from './materials';
export * from './machines';
export * from './suppliers';
export * from './outsource';
export * from './jobs';
export * from './qc';
export * from './issues';
export * from './nesting';
export * from './misc';

/** Flat search index — one lookup surface across every module. */
export function buildSearchIndex(): SearchEntry[] {
  const idx: SearchEntry[] = [];
  PROJECTS.forEach((p) =>
    idx.push({ type: 'Project', label: p.code, sub: `${p.name} · ${p.customer}`, code: p.code, href: `/projects/${p.code}`, icon: 'projects' }),
  );
  ASSEMBLIES.forEach((a) =>
    idx.push({ type: 'Assembly', label: a.code, sub: `${a.name} · ${a.project}`, code: a.code, href: `/projects/${a.project}/asm/${a.code}`, icon: 'bom' }),
  );
  PARTS.forEach((p) =>
    idx.push({ type: 'Part', label: p.id, sub: `${p.desc} · ${p.grade} ${p.thk} mm · ${p.assembly}`, code: p.id, href: `/parts/${p.id}`, icon: 'parts' }),
  );
  OUTSOURCE.forEach((o) =>
    idx.push({ type: 'Outsourcing', label: o.id, sub: `${findSupplier(o.supplier).name} · ${o.process}`, code: o.rfq, href: `/outsourcing/${o.id}`, icon: 'outsourcing' }),
  );
  NESTS.forEach((n) =>
    idx.push({ type: 'Nesting', label: n.id, sub: `${n.grade} ${n.thk} mm · ${n.machine}`, code: n.id, href: `/nesting/${n.id}`, icon: 'nesting' }),
  );
  MATERIALS.forEach((m) =>
    idx.push({ type: 'Material', label: `${m.grade} · ${m.thk} mm`, sub: m.family + (m.shortage > 0 ? ` · shortage ${m.shortage} t` : ' · in stock'), code: m.key, href: '/materials', icon: 'materials' }),
  );
  SUPPLIERS.forEach((s) =>
    idx.push({ type: 'Supplier', label: s.name, sub: `${s.city} · ${s.processes.join(', ')}`, code: s.id, href: '/suppliers', icon: 'suppliers' }),
  );
  ISSUES.forEach((i) => idx.push({ type: 'Issue', label: i.id, sub: i.title, code: i.id, href: '/issues', icon: 'issues' }));
  return idx;
}

export const SEARCH_INDEX = buildSearchIndex();

/** Every module that references a given part number — the OSTA connective tissue. */
export function connectionsFor(pid: string): Connection[] {
  const part = findPart(pid);
  if (!part) return [];
  const out: Connection[] = [];
  const proj = findProject(part.project);
  const asm = findAssembly(part.assembly);
  if (proj) out.push({ type: 'Project', label: proj.code, sub: proj.name, href: `/projects/${proj.code}`, icon: 'projects' });
  if (asm) out.push({ type: 'Assembly', label: asm.code, sub: asm.name, href: `/projects/${part.project}/asm/${asm.code}`, icon: 'bom' });
  out.push({ type: 'BOM', label: 'BOM line', sub: `${part.qty}× · ${part.grade} ${part.thk} mm · Rev ${part.rev}`, href: '/bom', icon: 'bom' });
  const mat = findMat(part.grade, part.thk);
  if (mat)
    out.push({
      type: 'Material',
      label: `${mat.grade} ${mat.thk} mm`,
      sub: mat.shortage > 0 ? `Shortage ${mat.shortage} t` : `Available ${(mat.avail - mat.reserved).toFixed(1)} t`,
      href: '/materials',
      icon: 'materials',
    });
  const nest = NESTS.find((n) => n.grade === part.grade && n.thk === part.thk && n.project === part.project);
  if (nest) out.push({ type: 'Nesting', label: nest.id, sub: `${nest.util}% utilisation · ${nest.machine}`, href: `/nesting/${nest.id}`, icon: 'nesting' });
  const job = JOBS.find((j) => j.part === pid);
  if (job) out.push({ type: 'Production', label: job.id, sub: `${job.op} · ${job.machine} · ${job.progress}%`, href: '/production', icon: 'production' });
  if (part.outsource) {
    const o = findOut(part.outsource);
    if (o) out.push({ type: 'Outsourcing', label: o.id, sub: `${findSupplier(o.supplier).name} · ${o.process}`, href: `/outsourcing/${o.id}`, icon: 'outsourcing' });
  }
  QC.filter((q) => q.part === pid).forEach((q) => out.push({ type: 'QC', label: q.id, sub: `${q.type} · ${q.result}`, href: '/qc', icon: 'qc' }));
  ISSUES.filter((i) => i.ref === pid).forEach((i) => out.push({ type: 'Issue', label: i.id, sub: i.title, href: '/issues', icon: 'issues' }));
  return out;
}
