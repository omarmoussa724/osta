import { Link, useNavigate, useParams } from 'react-router-dom';
import { findAssembly, findProject, assemblyParts } from '../data';
import { fmtT } from '../lib/format';
import { Icon } from '../components/Icon';
import { Panel, Empty, PageHead } from '../components/ui';
import { MfgStatus } from '../components/ManufacturingStatus';

export function AssemblyView() {
  const nav = useNavigate();
  const { code: project, asm } = useParams<{ code: string; asm: string }>();
  const a = findAssembly(asm!);
  const p = findProject(project!);
  if (!a)
    return (
      <div className="page">
        <Empty icon="bom" title="Assembly not found" hint={asm} />
      </div>
    );
  const parts = assemblyParts(a.code);
  const wt = parts.reduce((s, x) => s + x.weightKg, 0);
  const outCount = parts.filter((x) => x.status === 'OUTSOURCED').length;
  const ready = parts.filter((x) => x.status === 'READY').length;

  return (
    <div className="page">
      <PageHead
        title={<span>{a.code} <span className="muted" style={{ fontWeight: 400 }}>· {a.name}</span></span>}
        sub={
          <span>
            {p ? `${p.code} · ${p.name}` : project}
            {a.parent ? ` · sub-assembly of ${a.parent}` : ''}
          </span>
        }
      >
        <Link to={`/projects/${project}/assemblies`} className="btn ghost"><Icon n="arrowL" />All assemblies</Link>
      </PageHead>

      <div className="kpi-row" style={{ gridTemplateColumns: 'repeat(5,1fr)', marginBottom: 16 }}>
        <div className="kpi"><span className="k-label">Parts</span><span className="k-val">{parts.length}</span></div>
        <div className="kpi"><span className="k-label">Material Weight</span><span className="k-val">{fmtT(wt)}</span></div>
        <div className="kpi"><span className="k-label">Completion</span><span className="k-val">{a.completion}%</span></div>
        <div className="kpi"><span className="k-label">Current Operation</span><span className="k-val" style={{ fontSize: 16 }}>{a.currentOp}</span></div>
        <div className="kpi">
          <span className="k-label">Outsourced</span>
          <span className="k-val">{outCount}<span className="muted" style={{ fontSize: 13 }}> / {parts.length}</span></span>
        </div>
      </div>

      <Panel title="Parts" pad={false} actions={<span className="chip"><Icon n="check" size={12} /> {ready} ready for assembly</span>}>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Part No</th><th>Description</th><th>Material</th><th className="num">Thk</th>
                <th className="num">Qty</th><th>Operation route</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((pt) => (
                <tr key={pt.id} onClick={() => nav(`/parts/${pt.id}`)}>
                  <td><span className="code">{pt.id}</span></td>
                  <td>
                    {pt.desc}
                    <div className="muted" style={{ fontSize: 10.5 }}>Rev {pt.rev} · {pt.drawing}</div>
                  </td>
                  <td className="dim">{pt.grade}</td>
                  <td className="num">{pt.thk} mm</td>
                  <td className="num">{pt.qty}</td>
                  <td className="muted" style={{ fontSize: 11 }}>
                    {pt.ops.slice(4, -1).join(' → ') || pt.ops.slice(2, -1).join(' → ')}
                  </td>
                  <td><MfgStatus s={pt.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
