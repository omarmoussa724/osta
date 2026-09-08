import { FLOW, ONTIME_TREND, OUT_SPEND, EXPOSURE_BY_GRADE } from '../data';
import { fmtEGP } from '../lib/format';
import type { Tone } from '../lib/status';
import { Panel, PageHead } from '../components/ui';
import { AreaTrend, BarsH } from '../components/charts';

export function Analytics() {
  return (
    <div className="page">
      <PageHead title="Analytics" sub="Throughput, delivery performance and outsourcing spend" />
      <div className="two" style={{ marginBottom: 12 }}>
        <Panel title="On-Time Delivery · 12 weeks">
          <AreaTrend data={ONTIME_TREND} target={90} height={170} />
        </Panel>
        <Panel title="WIP by Stage">
          <BarsH
            rows={FLOW.map((s) => ({
              k: s.key,
              v: s.count,
              tone: (s.status === 'crit' ? 'crit' : s.status === 'warn' ? 'warn' : 'info') as Tone,
            }))}
          />
          <div className="muted" style={{ fontSize: 11, marginTop: 10 }}>
            Cutting carries the largest queue and 18 delayed items — the current bottleneck.
          </div>
        </Panel>
      </div>
      <div className="two">
        <Panel title="Outsourcing Spend by Process">
          <BarsH rows={OUT_SPEND} fmt={fmtEGP} />
        </Panel>
        <Panel title="Material Exposure by Grade">
          <BarsH rows={EXPOSURE_BY_GRADE} fmt={fmtEGP} />
          <div className="muted" style={{ fontSize: 11, marginTop: 10 }}>
            Open reservation value ≈ EGP 1.84M across four grades.
          </div>
        </Panel>
      </div>
    </div>
  );
}
