import { NavLink, Link } from 'react-router-dom';
import { cn } from '../lib/cn';
import { Icon } from '../components/Icon';

const NAV = [
  {
    group: 'Command Center',
    items: [
      { label: 'Dashboard', icon: 'dashboard', href: '/' },
      { label: 'Projects', icon: 'projects', href: '/projects' },
      { label: 'Production', icon: 'production', href: '/production' },
      { label: 'Outsourcing', icon: 'outsourcing', href: '/outsourcing' },
    ],
  },
  {
    group: 'Engineering',
    items: [
      { label: 'BOM', icon: 'bom', href: '/bom' },
      { label: 'Parts', icon: 'parts', href: '/parts' },
      { label: 'CAD / CAM', icon: 'cadcam', href: '/cadcam' },
      { label: 'Nesting', icon: 'nesting', href: '/nesting' },
    ],
  },
  {
    group: 'Materials',
    items: [
      { label: 'Materials', icon: 'materials', href: '/materials' },
      { label: 'Inventory', icon: 'inventory', href: '/inventory' },
      { label: 'Suppliers', icon: 'suppliers', href: '/suppliers' },
    ],
  },
  {
    group: 'Quality',
    items: [
      { label: 'QC', icon: 'qc', href: '/qc' },
      { label: 'NCR / Issues', icon: 'issues', href: '/issues' },
    ],
  },
  {
    group: 'System',
    items: [
      { label: 'Analytics', icon: 'analytics', href: '/analytics' },
      { label: 'Settings', icon: 'settings', href: '/settings' },
    ],
  },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="side">
      <Link to="/" className="brand" onClick={onNavigate}>
        <span className="mark">O</span>
        <span>
          <b>OSTA</b>
          <span>Fabrication OS</span>
        </span>
      </Link>
      <nav className="nav">
        {NAV.map((g) => (
          <div className="navgroup" key={g.group}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>{g.group}</div>
            {g.items.map((it) => (
              <NavLink
                key={it.href}
                to={it.href}
                end={it.href === '/'}
                onClick={onNavigate}
                className={({ isActive }) => cn(isActive && 'on')}
              >
                <Icon n={it.icon} />
                <span>{it.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="side-foot">
        <b>OSTA MVP</b>
        <span>Operations System Assistant</span>
      </div>
    </aside>
  );
}
