import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '../lib/cn';
import { TODAY } from '../lib/format';
import { Icon } from '../components/Icon';
import { Crumbs } from '../components/ui';
import { CommandPalette } from '../components/CommandPalette';
import { Sidebar } from './Sidebar';
import { resolveCrumbs } from './crumbs';

export function AppLayout() {
  const loc = useLocation();
  const [cmd, setCmd] = useState(false);
  const [nav, setNav] = useState(false);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmd((c) => !c);
      }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, []);

  useEffect(() => {
    setNav(false);
  }, [loc.pathname]);

  const dateStr = TODAY.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className={cn('app', nav && 'nav-open')}>
      <Sidebar onNavigate={() => setNav(false)} />
      <div className="main">
        <header className="topbar">
          <button className="tb-ic" onClick={() => setNav((v) => !v)} aria-label="Menu" data-mobile>
            <Icon n="menu" />
          </button>
          <Crumbs items={resolveCrumbs(loc.pathname)} />
          <div className="spacer" />
          <span className="tb-date">{dateStr}</span>
          <div className="tb-search" role="button" tabIndex={0} onClick={() => setCmd(true)}>
            <Icon n="search" />
            <span>Search</span>
            <kbd>⌘K</kbd>
          </div>
          <button className="tb-ic" aria-label="Notifications">
            <Icon n="bell" />
            <span className="badge" />
          </button>
          <div className="avatar" title="Operations Manager">OM</div>
        </header>
        <Outlet />
      </div>
      <CommandPalette open={cmd} onClose={() => setCmd(false)} />
    </div>
  );
}
