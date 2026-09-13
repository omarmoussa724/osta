import { Wrench } from 'lucide-react';

const BRING = [
  'A fabrication project',
  'A capacity bottleneck',
  'An outsourcing requirement',
  'A CAD/CAM challenge',
  'A material-efficiency problem',
  'A production-control problem',
  'A quality / traceability requirement',
];

const PROVIDE = [
  'Engineering',
  'CAD/CAM',
  'BOM / MTO',
  'Manufacturing planning',
  'Material analysis',
  'Nesting',
  'Supplier / factory sourcing',
  'Production coordination',
  'QC',
  'Delivery control',
];

export function AsAService() {
  return (
    <section className="mkt-section" id="service">
      <div className="mkt-shell">
        <div className="mkt-head-row">
          <div>
            <h2 className="mkt-h2">Don&rsquo;t just buy software. Solve the manufacturing problem.</h2>
            <p className="mkt-lead">
              OSTA operates as both a software platform and a manufacturing engineering,
              CAD/CAM, outsourcing and production-control service. The service can come
              first — the software becomes the operating infrastructure behind it.
            </p>
          </div>
        </div>

        <div className="mkt-service-grid">
          <div className="mkt-service-col">
            <h3>A customer can bring OSTA</h3>
            <ul className="mkt-service-list">
              {BRING.map((b) => (
                <li key={b}><Wrench/>{b}</li>
              ))}
            </ul>
          </div>
          <div className="mkt-service-col">
            <h3>OSTA can provide</h3>
            <div className="mkt-service-chain">
              {PROVIDE.map((p) => (
                <div className="step" key={p}>{p}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="mkt-service-pull">
          <p>
            OSTA can operate the process first, while the platform captures and structures
            the operational knowledge behind it.
          </p>
        </div>
      </div>
    </section>
  );
}
