import { Icon } from '../components/Icon';
import { PageHead } from '../components/ui';
import { BomTree } from '../components/BomTree';

export function Bom() {
  return (
    <div className="page">
      <PageHead
        title="BOM"
        sub="Project → Assembly → Sub-assembly → Part · manufacturing status rolls up the tree"
      >
        <button className="btn primary"><Icon n="upload" />Import BOM</button>
      </PageHead>
      <BomTree />
    </div>
  );
}
