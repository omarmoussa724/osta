import { hexA } from '../lib/cn';
import { toneColor } from '../lib/status';
import { RULES } from '../data';
import { Icon } from '../components/Icon';
import { Panel, PageHead } from '../components/ui';
import { Pill } from '../components/ManufacturingStatus';
import { useToast } from '../layout/ToastProvider';

export function Settings() {
  const toast = useToast();
  return (
    <div className="page">
      <PageHead title="Settings" sub="Workspace configuration and OSTA manufacturing rules" />
      <div className="c7-5">
        <div className="stack">
          <Panel title="Organisation">
            <dl className="kv">
              <dt>Workspace</dt><dd>OSTA — Fabrication OS</dd>
              <dt>Company</dt><dd>Demo Fabrication Co.</dd>
              <dt>Location</dt><dd>Cairo, Egypt</dd>
              <dt>Units</dt><dd>Metric · tonnes · mm</dd>
              <dt>Currency</dt><dd>EGP (Egyptian Pound)</dd>
              <dt>Fiscal year</dt><dd>January – December</dd>
            </dl>
          </Panel>
          <Panel title="Integrations">
            <div className="stack" style={{ gap: 8 }}>
              {['ERP · finance & purchasing', 'PDM · CAD vault', 'MES · shop-floor terminals', 'MRP · material planning'].map(
                (x) => (
                  <div key={x} className="between" style={{ fontSize: 12 }}>
                    <span className="row" style={{ gap: 8 }}>
                      <Icon n="ext" size={13} className="muted" />
                      {x}
                    </span>
                    <button className="btn ghost sm" onClick={() => toast('Connector coming soon')}>Connect</button>
                  </div>
                ),
              )}
            </div>
          </Panel>
        </div>
        <Panel title="Manufacturing Rules">
          <div className="stack" style={{ gap: 10 }}>
            {RULES.map(([t, d], i) => (
              <div key={i} className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
                <span
                  className="chip"
                  style={{ background: hexA(toneColor('ok'), 0.12), borderColor: hexA(toneColor('ok'), 0.3), color: 'var(--ok)' }}
                >
                  <Icon n="lock" size={11} /> Rule {i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500 }}>{t}</div>
                  <div className="muted" style={{ fontSize: 11 }}>{d}</div>
                </div>
                <Pill tone="ok">Enforced</Pill>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
