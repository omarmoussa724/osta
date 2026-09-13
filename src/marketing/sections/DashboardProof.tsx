import { ScreenshotFrame } from '../ScreenshotFrame';

export function DashboardProof() {
  return (
    <section className="mkt-section" id="product">
      <div className="mkt-shell">
        <div className="mkt-head-row">
          <div>
            <h2 className="mkt-h2">See the manufacturing flow.</h2>
            <p className="mkt-lead">A real screen from the OSTA application &mdash; not a mockup.</p>
          </div>
        </div>
        <ScreenshotFrame
          src="/screenshots/dashboard.webp"
          alt="OSTA Command Center dashboard showing active projects, production flow and operational risks"
          question="What is happening across manufacturing?"
          answer="One operational view across projects, materials, production, outsourcing and quality — including where the current bottleneck is and what needs attention first."
        />
      </div>
    </section>
  );
}
