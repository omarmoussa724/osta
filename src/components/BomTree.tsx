import { Fragment, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  PROJECTS,
  projectAssemblies,
  projectParts,
  assemblyParts,
  findProject,
} from '../data';
import { Icon } from './Icon';
import { Panel } from './ui';
import { MfgStatus } from './ManufacturingStatus';
import { useToast } from '../layout/ToastProvider';

function Row({
  depth,
  children,
  onToggle,
  isOpen,
  hasKids,
  meta,
}: {
  depth: number;
  children: ReactNode;
  onToggle?: () => void;
  isOpen?: boolean;
  hasKids?: boolean;
  meta: ReactNode;
}) {
  return (
    <div
      className="between"
      style={{ padding: '7px 12px', borderBottom: '1px solid var(--line-soft)', cursor: hasKids ? 'pointer' : 'default' }}
      onClick={hasKids ? onToggle : undefined}
    >
      <span className="row" style={{ gap: 7, alignItems: 'center', paddingLeft: depth * 20, minWidth: 0 }}>
        {hasKids ? (
          <Icon n={isOpen ? 'chevD' : 'chevR'} size={13} className="muted" />
        ) : (
          <span style={{ width: 13, display: 'inline-block' }} />
        )}
        {children}
      </span>
      {meta}
    </div>
  );
}

export function BomTree({ only }: { only?: string }) {
  const toast = useToast();
  const projects = only
    ? [findProject(only)].filter(Boolean).map((p) => p!)
    : PROJECTS.filter((p) => projectAssemblies(p.code).length);

  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const o: Record<string, boolean> = {};
    projects.forEach((p) => (o[p.code] = true));
    if (only) projectAssemblies(only).forEach((a) => (o[a.code] = true));
    return o;
  });
  const tog = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  const partMeta = (pt: { qty: number; grade: string; thk: number; rev: string; status: string }) => (
    <span className="row" style={{ gap: 10, alignItems: 'center' }}>
      <span className="mono muted" style={{ fontSize: 10.5 }}>
        {pt.qty}× · {pt.grade} · {pt.thk}mm · R{pt.rev}
      </span>
      <MfgStatus s={pt.status} />
    </span>
  );

  return (
    <Panel
      title={only ? 'Bill of Materials' : 'Bill of Materials · all projects'}
      pad={false}
      actions={
        <button className="btn ghost sm" onClick={() => toast('BOM import is a stub in the MVP')}>
          <Icon n="upload" />Import BOM
        </button>
      }
    >
      <div style={{ fontSize: 12.5 }}>
        <div
          className="between"
          style={{
            padding: '9px 12px',
            borderBottom: '1px solid var(--line)',
            color: 'var(--ink-3)',
            fontSize: 10,
            letterSpacing: '.09em',
            textTransform: 'uppercase',
          }}
        >
          <span>Item · Description</span>
          <span>Qty · Material · Thk · Rev · Status</span>
        </div>
        {projects.map((p) => (
          <Fragment key={p.code}>
            <Row
              depth={0}
              hasKids
              isOpen={open[p.code]}
              onToggle={() => tog(p.code)}
              meta={<span className="muted mono" style={{ fontSize: 10.5 }}>{projectParts(p.code).length} parts</span>}
            >
              <span className="code" style={{ fontWeight: 500 }}>{p.code}</span>
              <span className="muted">{p.name}</span>
            </Row>
            {open[p.code] &&
              projectAssemblies(p.code)
                .filter((a) => !a.parent)
                .map((a) => {
                  const subs = projectAssemblies(p.code).filter((x) => x.parent === a.code);
                  return (
                    <Fragment key={a.code}>
                      <Row
                        depth={1}
                        hasKids
                        isOpen={open[a.code]}
                        onToggle={() => tog(a.code)}
                        meta={<span className="muted mono" style={{ fontSize: 10.5 }}>{a.completion}%</span>}
                      >
                        <Icon n="bom" size={13} className="muted" />
                        <Link
                          to={`/projects/${p.code}/asm/${a.code}`}
                          className="code lnk"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {a.code}
                        </Link>
                        <span className="muted">{a.name}</span>
                      </Row>
                      {open[a.code] &&
                        subs.map((su) => (
                          <Fragment key={su.code}>
                            <Row
                              depth={2}
                              hasKids
                              isOpen={open[su.code]}
                              onToggle={() => tog(su.code)}
                              meta={<span className="muted mono" style={{ fontSize: 10.5 }}>{su.completion}%</span>}
                            >
                              <Icon n="cornerR" size={12} className="muted" />
                              <Link
                                to={`/projects/${p.code}/asm/${su.code}`}
                                className="code lnk"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {su.code}
                              </Link>
                              <span className="muted">{su.name}</span>
                            </Row>
                            {open[su.code] &&
                              assemblyParts(su.code).map((pt) => (
                                <Row key={pt.id} depth={3} meta={partMeta(pt)}>
                                  <Link
                                    to={`/parts/${pt.id}`}
                                    className="code lnk"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {pt.id}
                                  </Link>
                                  <span>{pt.desc}</span>
                                </Row>
                              ))}
                          </Fragment>
                        ))}
                      {open[a.code] &&
                        assemblyParts(a.code).map((pt) => (
                          <Row key={pt.id} depth={2} meta={partMeta(pt)}>
                            <Link
                              to={`/parts/${pt.id}`}
                              className="code lnk"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {pt.id}
                            </Link>
                            <span>{pt.desc}</span>
                          </Row>
                        ))}
                    </Fragment>
                  );
                })}
          </Fragment>
        ))}
      </div>
    </Panel>
  );
}
