const CASCADES: { title: string; steps: string[] }[] = [
  {
    title: 'A revision travels downstream',
    steps: [
      'Engineering revision',
      'BOM changes',
      'Material impact',
      'Nesting impact',
      'Production impact',
      'Outsourcing impact',
      'Delivery risk',
    ],
  },
  {
    title: 'A shortage travels downstream',
    steps: [
      'Material shortage',
      'Affected parts',
      'Affected assemblies',
      'Affected work orders',
      'Project risk',
    ],
  },
  {
    title: 'A failure travels downstream',
    steps: [
      'QC failure',
      'Blocked part',
      'Blocked assembly',
      'Rework',
      'Delivery risk',
    ],
  },
];

export function Problem() {
  return (
    <section className="mkt-section alt" id="problem">
      <div className="mkt-shell">
        <div className="mkt-head-row">
          <div>
            <h2 className="mkt-h2">Manufacturing doesn&rsquo;t fail because the data doesn&rsquo;t exist.</h2>
            <p className="mkt-lead">
              It fails when engineering, materials, capacity, suppliers, production and
              quality operate as disconnected decisions.
            </p>
          </div>
        </div>
        <div className="mkt-cascades">
          {CASCADES.map((c) => (
            <div className="mkt-cascade" key={c.title}>
              <div className="mkt-cascade-title">{c.title}</div>
              <div className="mkt-cascade-chain">
                {c.steps.map((s, i) => (
                  <div key={s} className={'mkt-cascade-step' + (i === c.steps.length - 1 ? ' risk' : '')}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
