import { ArrowDown, CircleCheck, CircleX } from 'lucide-react';
import { ScreenshotFrame } from '../ScreenshotFrame';

export function QualityGate() {
  return (
    <section className="mkt-section alt" id="quality">
      <div className="mkt-shell">
        <div className="mkt-head-row">
          <div>
            <h2 className="mkt-h2">Quality is a gate, not a checkbox.</h2>
            <p className="mkt-lead">
              Final dimensional QC (<span className="mono">FINAL_DIM_QC</span>) sits on every part&rsquo;s route. A part
              cannot be marked ready for assembly until it passes.
            </p>
          </div>
        </div>

        <div className="mkt-gate">
          <ScreenshotFrame
            src="/screenshots/qc.webp"
            alt="OSTA quality control dashboard with pending, passed and failed inspections"
            question="Can it move forward?"
            answer="Every inspection is logged against the part it belongs to, with the final dimensional gate marked explicitly."
          />
          <div className="mkt-gate-branch">
            <div className="mkt-gate-step">
              <b>Production complete</b>
              Part reaches FINAL_DIM_QC.
            </div>
            <div className="mkt-gate-arrow"><ArrowDown size={16}/></div>
            <div className="mkt-gate-step pass">
              <b><CircleCheck size={14} style={{ verticalAlign: -2, marginRight: 6 }}/>Passes inspection</b>
              Released — Ready for Assembly.
            </div>
            <div className="mkt-gate-step fail">
              <b><CircleX size={14} style={{ verticalAlign: -2, marginRight: 6 }}/>Fails inspection</b>
              Blocked. An NCR is raised and the part cannot proceed until it is resolved.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
