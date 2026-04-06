import { NavLink, Outlet } from 'react-router-dom';
import './AppLayout.css';

const navItems = [
  { to: '/app/designer', label: 'Schema Designer', icon: 'grid' },
  { to: '/app/migrations', label: 'Migrations', icon: 'code' },
  { to: '/app/compatibility', label: 'Compatibility', icon: 'check' },
  { to: '/app/indexes', label: 'Index Optimizer', icon: 'zap' },
  { to: '/app/rehearsal', label: 'Rehearsal', icon: 'play' },
  { to: '/app/history', label: 'Version History', icon: 'clock' },
  { to: '/app/reviews', label: 'Team Reviews', icon: 'users' },
];

const iconMap: Record<string, string> = {
  grid: '\u25A6',
  code: '\u2192',
  check: '\u2713',
  zap: '\u26A1',
  play: '\u25B6',
  clock: '\u25CB',
  users: '\u2605',
};

export default function AppLayout() {
  return (
    <div className="app-layout">
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <aside className="app-sidebar">
        <a href="/" className="sidebar-logo">
          <span className="logo-icon">{'\u2B23'}</span>
          SchemaForge
        </a>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="sidebar-icon">{iconMap[item.icon]}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-schema-name">E-Commerce Platform</div>
          <div className="sidebar-schema-meta">6 tables &middot; 7 relations</div>
        </div>
      </aside>
      <main id="main-content" className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
