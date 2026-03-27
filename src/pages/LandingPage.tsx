import './LandingPage.css'

const features = [
  {
    title: 'Visual Schema Designer',
    description: 'Drag-and-drop canvas for creating tables, drawing relationships, and managing constraints visually.',
    icon: '&#9638;',
  },
  {
    title: 'Migration Generator',
    description: 'Auto-generate forward and rollback migrations by diffing schema states. Idiomatic SQL for every dialect.',
    icon: '&#9654;',
  },
  {
    title: 'Cross-DB Compatibility',
    description: 'Instant feedback on PostgreSQL, MySQL, SQLite, and SQL Server support with actionable alternatives.',
    icon: '&#10003;',
  },
  {
    title: 'Index Optimizer',
    description: 'AI-powered recommendations for index creation based on your query patterns and schema design.',
    icon: '&#9889;',
  },
  {
    title: 'Migration Rehearsal',
    description: 'Dry-run migrations against a sandboxed database. Validate correctness and measure execution time.',
    icon: '&#9881;',
  },
  {
    title: 'Version History',
    description: 'Visual timeline of every schema version with diffs, restore, and branch capabilities.',
    icon: '&#8634;',
  },
  {
    title: 'Team Review Workflow',
    description: 'Purpose-built review experience with real-time collaboration, inline comments, and approval gates.',
    icon: '&#9734;',
  },
]

export default function LandingPage() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-container">
          <a href="/" className="landing-logo">SchemaForge</a>
          <nav className="landing-nav">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="https://github.com/neenhouse/schema-forge" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="landing-container">
          <h1>Design schemas visually.<br />Deploy migrations safely.</h1>
          <p className="hero-subtitle">
            The all-in-one platform for database schema management. Design, diff, test, review, and deploy
            -- from whiteboard to production in minutes.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">View Demo</button>
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
                <span className="feature-icon" dangerouslySetInnerHTML={{ __html: feature.icon }} />
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
              <button className="btn btn-secondary">Get Started</button>
            </div>
            <div className="pricing-card featured">
              <h3>Pro</h3>
              <p className="price">$19<span>/mo</span></p>
              <ul>
                <li>Everything in Free</li>
                <li>Index optimization advisor</li>
                <li>Migration rehearsal</li>
                <li>Unlimited version history</li>
              </ul>
              <button className="btn btn-primary">Start Free Trial</button>
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
              <button className="btn btn-secondary">Contact Sales</button>
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
  )
}
