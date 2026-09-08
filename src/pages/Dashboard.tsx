import { Link, useNavigate } from 'react-router-dom';
import { PROJECTS, projectParts, OUTSOURCE, KPIS, RISKS, ONTIME_TREND } from '../data';
import { daysFromToday, fmtDateShort } from '../lib/format';
import { toneColor } from '../lib/status';
import { Icon } from '../components/Icon';
import { Panel, Bar, PageHead } from '../components/ui';
import { Pill, ProjStatus } from '../components/ManufacturingStatus';
import { Spark, AreaTrend } from '../components/charts';
import { FlowStages } from '../components/FlowStages';

export function Dashboard() {
  const nav = useNavigate();
  return (
    <div className="page">
      <PageHead title="Command Center" sub="Manufacturing operations at a glance">
        <Link to="/projects" className="btn ghost"><Icon n="projects" />All projects</Link>
        <Link to="/analytics" className="btn"><Icon n="analytics" />Analytics</Link>
      </PageHead>

      <div className="kpi-row" style={{ marginBottom: 12 }}>
        {KPIS.map((k) => (
          <div className="kpi" key={k.label}>
            <span className="k-label">{k.label}</span>
            <span className="k-val">{k.value}</span>
            <span className="k-foot">
              <span className={k.dir === 'up' ? 'up' : k.dir === 'down' ? 'down' : ''}>
                {k.dir === 'up' ? <Icon n="trendUp" /> : k.dir === 'down' ? <Icon n="trendDown" /> : <Icon n="dot" />}
              </span>
              {k.foot}
            </span>
            <span className="k-spark">
              <Spark data={k.spark} color={k.dir === 'down' ? '#E0A63C' : '#4C9AFF'} />
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        <Panel
          title="Production Flow"
          actions={
            <span className="chip">
              <span className="dot" style={{ width: 6, height: 6, borderRadius: 9, background: 'var(--crit)' }} />
              Bottleneck · Cutting
            </span>
          }
        >
          <FlowStages />
          <div className="muted" style={{ fontSize: 11.5, marginTop: 12 }}>
            Engineering → Material → Nesting → Cutting → Bending → Welding → QC → Assembly · counts are work items
            currently at each stage
          </div>
        </Panel>
      </div>

      <div className="c7-5" style={{ marginBottom: 12 }}>
        <Panel
          title="Operational Risks"
          actions={<Link to="/issues" className="btn ghost sm">Open register<Icon n="arrowR" /></Link>}
        >
          <div className="stack" style={{ gap: 8 }}>
            {RISKS.map((r, i) => (
              <Link key={i} to={r.href} className="risk">
                <span className="rdot" style={{ background: toneColor(r.sev) }} />
                <span className="rmain">
                  <span className="rtitle">{r.title}</span>
                  <span className="rmeta" style={{ display: 'block' }}>{r.meta}</span>
                </span>
                <span className="rtag">{r.tag}</span>
                <Icon n="chevR" size={14} className="muted" />
              </Link>
            ))}
          </div>
        </Panel>
        <div className="stack">
          <Panel title="On-Time Delivery">
            <AreaTrend data={ONTIME_TREND} target={90} height={130} />
            <div className="between" style={{ marginTop: 8 }}>
              <span className="muted" style={{ fontSize: 11.5 }}>Rolling 12-week completion vs promised date</span>
              <span className="mono" style={{ fontSize: 12 }}>87%</span>
            </div>
          </Panel>
          <Panel title="Outsourcing Snapshot">
            <div className="stack" style={{ gap: 9 }}>
              {[
                { k: 'In production', v: 2, tone: 'info' as const },
                { k: 'Awaiting material', v: 2, tone: 'warn' as const },
                { k: 'In QC / dispatch', v: 2, tone: 'info' as const },
                { k: 'At risk / overdue', v: 2, tone: 'crit' as const },
                { k: 'RFQ sent', v: 1, tone: 'idle' as const },
              ].map((r) => (
                <div className="between" key={r.k}>
                  <span style={{ fontSize: 12 }}><Pill tone={r.tone}>{r.k}</Pill></span>
                  <span className="mono tnum" style={{ fontSize: 12 }}>{r.v}</span>
                </div>
              ))}
              <Link to="/outsourcing" className="btn ghost sm" style={{ marginTop: 2 }}>
                Outsourcing Control Center<Icon n="arrowR" />
              </Link>
            </div>
          </Panel>
        </div>
      </div>

      <Panel
        title="Active Projects"
        pad={false}
        actions={<Link to="/projects" className="btn ghost sm">View all 12<Icon n="arrowR" /></Link>}
      >
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Project</th>
                <th>Customer</th>
                <th>Progress</th>
                <th className="num">Parts</th>
                <th className="num">Outsourced</th>
                <th>Delivery</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.slice(0, 6).map((p) => {
                const d = daysFromToday(p.due);
                return (
                  <tr key={p.code} onClick={() => nav(`/projects/${p.code}`)}>
                    <td>
                      <span className="code">{p.code}</span>
                      <div className="muted" style={{ fontSize: 11 }}>{p.name}</div>
                    </td>
                    <td className="dim">{p.customer}</td>
                    <td style={{ minWidth: 150 }}>
                      <div className="between" style={{ gap: 8 }}>
                        <Bar value={p.progress} tone={p.progress > 80 ? 'ok' : 'info'} />
                        <span className="mono" style={{ fontSize: 11 }}>{p.progress}%</span>
                      </div>
                    </td>
                    <td className="num">{projectParts(p.code).length || '—'}</td>
                    <td className="num">{OUTSOURCE.filter((o) => o.project === p.code).length || '—'}</td>
                    <td>
                      <span className="mono" style={{ fontSize: 11.5 }}>{fmtDateShort(p.due)}</span>{' '}
                      <span style={{ fontSize: 10.5, color: d < 7 ? 'var(--crit)' : 'var(--ink-3)' }}>
                        {d < 0 ? Math.abs(d) + 'd late' : d + 'd'}
                      </span>
                    </td>
                    <td><ProjStatus s={p.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
