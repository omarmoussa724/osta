import { ArrowDown } from 'lucide-react';

export function Future() {
  return (
    <section className="mkt-section alt" id="future">
      <div className="mkt-shell mkt-center">
        <h2 className="mkt-h2 mkt-mx-auto">From one operation to a connected manufacturing network.</h2>

        <div className="mkt-network" aria-hidden="true">
          <div className="mkt-net-node">Customer</div>
          <ArrowDown size={16} color="var(--ink-4)" style={{ margin: '10px 0' }}/>
          <div className="mkt-net-node osta">OSTA</div>
          <ArrowDown size={16} color="var(--ink-4)" style={{ margin: '10px 0' }}/>
          <div className="mkt-net-branches">
            <div className="mkt-net-leaf">Factory</div>
            <div className="mkt-net-leaf">Supplier</div>
            <div className="mkt-net-leaf">Engineering Partner</div>
          </div>
          <ArrowDown size={16} color="var(--ink-4)" style={{ margin: '10px 0' }}/>
          <div className="mkt-net-node">Manufacturing Capacity</div>
        </div>

        <p className="mkt-lead center mkt-mx-auto mkt-net-note">
          Over time, OSTA can become the operating layer connecting companies that need
          manufacturing with the engineering and physical capacity capable of delivering it.
        </p>
      </div>
    </section>
  );
}
