import { Link, useNavigate, useParams } from 'react-router-dom';
import { hexA } from '../lib/cn';
import { OUT_STEPS, OUT_STATUS, toneColor } from '../lib/status';
import { findOut, findSupplier, findPart } from '../data';
import { daysFromToday, fmtDate, fmtEGP } from '../lib/format';
import { Icon } from '../components/Icon';
import { Panel, Empty, PageHead } from '../components/ui';
import { Pill } from '../components/ManufacturingStatus';
import { useToast } from '../layout/ToastProvider';

export function OutsourcingDetail() {
  const nav = useNavigate();
  const toast = useToast();
  const { id } = useParams<{ id: string }>();
  const o = findOut(id!);
  if (!o)
    return (
      <div className="page">
        <Empty icon="outsourcing" title="Job not found" hint={id} action={<Link to="/outsourcing" className="btn">Back</Link>} />
      </div>
    );
  const s = findSupplier(o.supplier);
  const st = OUT_STATUS[o.status];
  const curStep = st.step;
  const d = daysFromToday(o.due);
  const parts = o.parts.map(findPart).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <div className="page">
      <PageHead
        title={<span>{o.id} <span className="muted" style={{ fontWeight: 400 }}>· {o.process}</span></span>}
        sub={
          <span>
            <b className="dim">{s.name}</b> · <Link to={`/projects/${o.project}`} className="lnk">{o.project}</Link> · RFQ {o.rfq}
          </span>
        }
      >
        <button className="btn ghost" onClick={() => toast({ title: 'RFQ sent', desc: `${o.rfq} → ${s.name}` })}>
          <Icon n="outsourcing" />Send RFQ
        </button>
        <button className="btn ghost" onClick={() => toast('Documents uploaded to ' + o.id)}>
          <Icon n="upload" />Upload documents
        </button>
        <button
          className="btn primary"
          onClick={() => toast({ title: 'Marked received', desc: o.id + ' booked into incoming QC' })}
        >
          <Icon n="check" />Mark received
        </button>
      </PageHead>

      {o.note && (
        <div
          className="risk"
          style={{ marginBottom: 16, borderColor: hexA(toneColor(st.tone), 0.4), background: hexA(toneColor(st.tone), 0.06) }}
        >
          <span className="rdot" style={{ background: toneColor(st.tone) }} />
          <span className="rmain">
            <span className="rtitle">{st.label}</span>
            <span className="rmeta" style={{ display: 'block' }}>{o.note}</span>
          </span>
        </div>
      )}

      <Panel title="Job Progress">
        <div className="row" style={{ gap: 0, alignItems: 'stretch', overflowX: 'auto' }}>
          {OUT_STEPS.map((step, i) => {
            const done = curStep >= 0 && i < curStep;
            const cur = i === curStep;
            const c = done ? '#35C88F' : cur ? '#4C9AFF' : '#2F353F';
            return (
              <div
                key={step}
                style={{ flex: 1, minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative' }}
              >
                {i > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      left: '-50%',
                      top: 6,
                      width: '100%',
                      height: 2,
                      background: done || cur ? '#35C88F' : '#2F353F',
                    }}
                  />
                )}
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 9,
                    background: done ? c : 'var(--ground)',
                    border: '2px solid ' + c,
                    zIndex: 1,
                    boxShadow: cur ? '0 0 0 4px rgba(76,154,255,.16)' : 'none',
                  }}
                />
                <span style={{ fontSize: 10.5, textAlign: 'center', color: done || cur ? 'var(--ink)' : 'var(--ink-3)' }}>
                  {step.replace('_', ' ').replace(/\b\w/g, (m) => m.toUpperCase())}
                </span>
              </div>
            );
          })}
        </div>
      </Panel>

      <div className="c8-4" style={{ marginTop: 12 }}>
        <div className="stack">
          <Panel title="Scope" pad={false}>
            {parts.length ? (
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Part No</th><th>Description</th><th>Material</th><th className="num">Qty</th><th className="num">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {parts.map((pt) => (
                    <tr key={pt.id} onClick={() => nav(`/parts/${pt.id}`)}>
                      <td className="code">{pt.id}</td>
                      <td>{pt.desc}</td>
                      <td className="dim">{pt.grade} {pt.thk} mm</td>
                      <td className="num">{pt.qty}</td>
                      <td className="num">{pt.weightKg} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: 14 }}>
                <div className="muted" style={{ fontSize: 12, marginBottom: 8 }}>
                  {o.partsCount} parts on this order · itemised part list not yet linked in the MVP seed.
                </div>
                <div className="chip">Bulk scope · {o.partsCount} parts · {o.weightT} t</div>
              </div>
            )}
          </Panel>
          <Panel title="Documents">
            <div className="stack" style={{ gap: 8 }}>
              {[
                `RFQ package · ${o.rfq}.pdf`,
                `Drawing set · ${o.project}_outsource.zip`,
                'Material certificates · pending',
              ].map((f, i) => (
                <div key={i} className="between" style={{ fontSize: 12 }}>
                  <span className="row" style={{ gap: 8 }}>
                    <Icon n="file" size={14} className="muted" />
                    {f}
                  </span>
                  <button className="btn ghost sm" onClick={() => toast('Downloading ' + f.split(' · ')[0])}>
                    <Icon n="download" />
                  </button>
                </div>
              ))}
            </div>
          </Panel>
        </div>
        <div className="stack">
          <Panel title="Supplier">
            <dl className="kv">
              <dt>Company</dt><dd><Link to="/suppliers" className="lnk">{s.name}</Link></dd>
              <dt>Location</dt><dd>{s.city}</dd>
              <dt>Contact</dt><dd>{s.contact}</dd>
              <dt>Phone</dt><dd className="mono">{s.phone}</dd>
              <dt>On-time</dt><dd className="mono">{s.onTime}%</dd>
              <dt>Rating</dt><dd className="mono">{s.rating} / 5</dd>
            </dl>
          </Panel>
          <Panel title="Commercial">
            <dl className="kv">
              <dt>Process</dt><dd>{o.process}</dd>
              <dt>Parts</dt><dd className="mono">{o.partsCount}</dd>
              <dt>Weight</dt><dd className="mono">{o.weightT} t</dd>
              <dt>Quoted cost</dt><dd className="mono">{fmtEGP(o.value)}</dd>
              <dt>Actual cost</dt><dd className="mono">{o.actual ? fmtEGP(o.actual) : '—'}</dd>
              <dt>Sent</dt><dd className="mono">{fmtDate(o.sent)}</dd>
              <dt>Expected</dt><dd className="mono">{fmtDate(o.eta)}</dd>
              <dt>Need date</dt>
              <dd className="mono" style={{ color: d < 3 ? 'var(--crit)' : 'var(--ink)' }}>
                {fmtDate(o.due)} ({d < 0 ? Math.abs(d) + 'd late' : d + 'd'})
              </dd>
              <dt>Delivery</dt><dd><Pill tone={st.tone}>{st.label}</Pill></dd>
            </dl>
          </Panel>
        </div>
      </div>
    </div>
  );
}
