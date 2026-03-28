import { Link } from 'react-router-dom';
import './LandingPage.css';

const features = [
  {
    title: 'Visual Schema Designer',
    description: 'Drag-and-drop canvas for creating tables, drawing relationships, and managing constraints visually.',
    icon: '\u25A6',
  },
  {
    title: 'Migration Generator',
    description: 'Auto-generate forward and rollback migrations by diffing schema states. Idiomatic SQL for every dialect.',
    icon: '\u2192',
  },
  {
    title: 'Cross-DB Compatibility',
    description: 'Instant feedback on PostgreSQL, MySQL, SQLite support with actionable alternatives.',
    icon: '\u2713',
  },
  {
    title: 'Index Optimizer',
    description: 'AI-powered recommendations for index creation based on your query patterns and schema design.',
    icon: '\u26A1',
  },
  {
    title: 'Migration Rehearsal',
    description: 'Dry-run migrations against a sandboxed database. Validate correctness and measure execution time.',
    icon: '\u25B6',
  },
  {
    title: 'Version History',
    description: 'Visual timeline of every schema version with diffs, restore, and branch capabilities.',
    icon: '\u25CB',
  },
  {
    title: 'Team Review Workflow',
    description: 'Purpose-built review experience with real-time collaboration, inline comments, and approval gates.',
    icon: '\u2605',
  },
];

export default function LandingPage() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-container">
          <a href="/" className="landing-logo">
            <span className="logo-mark">{'\u2B23'}</span>
            SchemaForge
          </a>
          <nav className="landing-nav">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="https://github.com/neenhouse/schema-forge" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-glow" />
        <div className="landing-container">
          <div className="hero-badge">Database schema management, reimagined</div>
          <h1>Schema management that<br />doesn't break production</h1>
          <p className="hero-subtitle">
            Design schemas visually, auto-generate migrations, catch cross-database issues, and rehearse changes
            before they touch production. From whiteboard to deployment in minutes.
          </p>
          <div className="hero-actions">
            <Link to="/app/designer" className="btn btn-primary">Get Started</Link>
            <Link to="/app/designer" className="btn btn-secondary">View Demo</Link>
          </div>
        </div>
      </section>

      <section className="hero-preview">
        <div className="landing-container">
          <div className="preview-window">
            <div className="preview-titlebar">
              <span className="preview-dot red" />
              <span className="preview-dot yellow" />
              <span className="preview-dot green" />
              <span className="preview-title">schema-designer.sf</span>
            </div>
            <div className="preview-canvas">
              <div className="preview-table" style={{ left: 40, top: 30 }}>
                <div className="preview-table-header">users</div>
                <div className="preview-table-col pk">id SERIAL PK</div>
                <div className="preview-table-col">email VARCHAR(255)</div>
                <div className="preview-table-col">name VARCHAR(128)</div>
              </div>
              <div className="preview-table" style={{ left: 300, top: 30 }}>
                <div className="preview-table-header">orders</div>
                <div className="preview-table-col pk">id SERIAL PK</div>
                <div className="preview-table-col fk">user_id INTEGER FK</div>
                <div className="preview-table-col">total DECIMAL</div>
              </div>
              <div className="preview-table" style={{ left: 300, top: 200 }}>
                <div className="preview-table-header">products</div>
                <div className="preview-table-col pk">id SERIAL PK</div>
                <div className="preview-table-col">name VARCHAR(255)</div>
                <div className="preview-table-col">price DECIMAL</div>
              </div>
              <svg className="preview-lines" viewBox="0 0 560 320">
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <path d="M0,0 L8,3 L0,6" fill="var(--brand-500)" />
                  </marker>
                </defs>
                <line x1="220" y1="70" x2="300" y2="70" stroke="var(--brand-500)" strokeWidth="2" markerEnd="url(#arrow)" opacity="0.7" />
                <line x1="400" y1="140" x2="400" y2="200" stroke="var(--brand-500)" strokeWidth="2" markerEnd="url(#arrow)" opacity="0.7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="landing-container">
          <h2>Everything you need for schema management</h2>
          <p className="section-subtitle">
            From visual design to production deployment, SchemaForge covers the entire schema lifecycle.
          </p>
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <div className="landing-container">
          <h2>Simple, transparent pricing</h2>
          <p className="section-subtitle">Start free. Scale as your team grows.</p>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Free</h3>
              <p className="price">$0</p>
              <ul>
                <li>Visual schema designer</li>
                <li>Migration generation</li>
                <li>Cross-DB compatibility</li>
                <li>5 schema versions</li>
              </ul>
              <Link to="/app/designer" className="btn btn-secondary">Get Started</Link>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-badge">Most Popular</div>
              <h3>Pro</h3>
              <p className="price">$19<span>/mo</span></p>
              <ul>
                <li>Everything in Free</li>
                <li>Index optimization advisor</li>
                <li>Migration rehearsal</li>
                <li>Unlimited version history</li>
              </ul>
              <Link to="/app/designer" className="btn btn-primary">Start Free Trial</Link>
            </div>
            <div className="pricing-card">
              <h3>Team</h3>
              <p className="price">$49<span>/mo</span></p>
              <ul>
                <li>Everything in Pro</li>
                <li>Team review workflow</li>
                <li>Real-time collaboration</li>
                <li>GitHub/GitLab integration</li>
              </ul>
              <Link to="/app/designer" className="btn btn-secondary">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-container">
          <p>SchemaForge -- Database schema management, simplified.</p>
        </div>
      </footer>
    </div>
  );
}
