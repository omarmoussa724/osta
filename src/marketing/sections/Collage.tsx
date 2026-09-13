const IMAGES = [
  '/screenshots/dashboard.webp',
  '/screenshots/bom.webp',
  '/screenshots/materials.webp',
  '/screenshots/nesting.webp',
  '/screenshots/production.webp',
  '/screenshots/outsourcing.webp',
  '/screenshots/qc.webp',
  '/screenshots/analytics.webp',
];

export function Collage() {
  return (
    <section className="mkt-section last" id="reality">
      <div className="mkt-shell">
        <p className="mkt-kicker" style={{ justifyContent: 'center', display: 'flex' }}>
          <span className="dot" />Built Around Manufacturing Reality
        </p>
        <div className="mkt-collage">
          <div className="mkt-collage-grid" aria-hidden="true">
            {IMAGES.map((src) => (
              <img key={src} src={src} alt="" loading="lazy" />
            ))}
          </div>
          <div className="mkt-collage-overlay">
            <p>Every manufacturing decision has consequences downstream.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
