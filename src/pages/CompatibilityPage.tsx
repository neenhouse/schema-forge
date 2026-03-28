import { useState } from 'react';
import { mockCompatibilityIssues, ecommerceSchema } from '@/lib/mock-data';
import type { DatabaseDialect, CompatibilityIssue, CompatibilityLevel } from '@/lib/types';
import './CompatibilityPage.css';

const dialects: { id: DatabaseDialect; label: string }[] = [
  { id: 'postgresql', label: 'PostgreSQL' },
  { id: 'mysql', label: 'MySQL' },
  { id: 'sqlite', label: 'SQLite' },
];

export default function CompatibilityPage() {
  const [selectedDialects, setSelectedDialects] = useState<DatabaseDialect[]>(['postgresql', 'mysql', 'sqlite']);
  const [issues] = useState<CompatibilityIssue[]>(mockCompatibilityIssues);
  const [filterLevel, setFilterLevel] = useState<CompatibilityLevel | 'all'>('all');

  const toggleDialect = (d: DatabaseDialect) => {
    setSelectedDialects(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    );
  };

  const filteredIssues = issues.filter(issue => {
    if (!selectedDialects.includes(issue.dialect)) return false;
    if (filterLevel !== 'all' && issue.level !== filterLevel) return false;
    return true;
  });

  const countByLevel = (level: CompatibilityLevel) =>
    issues.filter(i => selectedDialects.includes(i.dialect) && i.level === level).length;

  const getTableIssues = (tableName: string) =>
    filteredIssues.filter(i => i.table === tableName);

  const getTableStatus = (tableName: string): CompatibilityLevel => {
    const tableIssues = issues.filter(i => i.table === tableName && selectedDialects.includes(i.dialect));
    if (tableIssues.some(i => i.level === 'incompatible')) return 'incompatible';
    if (tableIssues.some(i => i.level === 'warning')) return 'warning';
    return 'compatible';
  };

  return (
    <div className="compat-page">
      <div className="page-header">
        <div>
          <h2>Cross-Database Compatibility</h2>
          <p className="page-subtitle">Check schema compatibility across PostgreSQL, MySQL, and SQLite</p>
        </div>
      </div>

      <div className="compat-controls">
        <div className="dialect-selector">
          <span className="control-label">Target Databases:</span>
          {dialects.map(d => (
            <button
              key={d.id}
              className={`dialect-btn ${selectedDialects.includes(d.id) ? 'active' : ''}`}
              onClick={() => toggleDialect(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="compat-summary">
          <div className="summary-badge compat-ok" onClick={() => setFilterLevel(filterLevel === 'compatible' ? 'all' : 'compatible')}>
            {countByLevel('compatible')} compatible
          </div>
          <div className="summary-badge compat-warn" onClick={() => setFilterLevel(filterLevel === 'warning' ? 'all' : 'warning')}>
            {countByLevel('warning')} warnings
          </div>
          <div className="summary-badge compat-err" onClick={() => setFilterLevel(filterLevel === 'incompatible' ? 'all' : 'incompatible')}>
            {countByLevel('incompatible')} incompatible
          </div>
        </div>
      </div>

      <div className="compat-grid">
        <div className="compat-tables">
          <h4>Tables</h4>
          {ecommerceSchema.tables.map(table => {
            const status = getTableStatus(table.name);
            const tableIssueList = getTableIssues(table.name);
            return (
              <div key={table.id} className={`compat-table-card ${status}`}>
                <div className="compat-table-header">
                  <span className={`compat-dot ${status}`} />
                  <span className="compat-table-name">{table.name}</span>
                  <span className="compat-table-count">
                    {tableIssueList.length} {tableIssueList.length === 1 ? 'issue' : 'issues'}
                  </span>
                </div>
                {tableIssueList.length > 0 && (
                  <div className="compat-issues-list">
                    {tableIssueList.map((issue, idx) => (
                      <div key={idx} className={`compat-issue ${issue.level}`}>
                        <div className="issue-top">
                          <span className="issue-col">{issue.column}</span>
                          <span className="issue-type">{issue.type}</span>
                          <span className="issue-dialect">{issue.dialect}</span>
                          <span className={`issue-level ${issue.level}`}>
                            {issue.level}
                          </span>
                        </div>
                        <p className="issue-message">{issue.message}</p>
                        <p className="issue-suggestion">{issue.suggestion}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="compat-side-by-side">
          <h4>SQL Comparison</h4>
          <div className="sql-compare-grid">
            {selectedDialects.map(dialect => (
              <div key={dialect} className="sql-compare-panel">
                <div className="sql-compare-header">{dialect}</div>
                <pre className="sql-compare-code">
                  <code>{generateCreateTable(dialect)}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function generateCreateTable(dialect: DatabaseDialect): string {
  const serial = dialect === 'postgresql' ? 'SERIAL' : dialect === 'mysql' ? 'INT AUTO_INCREMENT' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
  const jsonType = dialect === 'postgresql' ? 'JSONB' : dialect === 'mysql' ? 'JSON' : 'TEXT';
  const arrayType = dialect === 'postgresql' ? 'TEXT[]' : dialect === 'mysql' ? 'JSON' : 'TEXT';
  const timestamp = dialect === 'sqlite' ? 'TEXT' : 'TIMESTAMP';
  const now = dialect === 'sqlite' ? "datetime('now')" : 'NOW()';
  const bool = dialect === 'sqlite' ? 'INTEGER' : 'BOOLEAN';

  return `-- ${dialect.toUpperCase()} dialect

CREATE TABLE users (
  id ${serial}${dialect !== 'sqlite' ? ' PRIMARY KEY' : ''},
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(128) NOT NULL,
  role VARCHAR(20) DEFAULT 'customer',
  created_at ${timestamp} DEFAULT ${now}
);

CREATE TABLE products (
  id ${serial}${dialect !== 'sqlite' ? ' PRIMARY KEY' : ''},
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  sku VARCHAR(50) NOT NULL UNIQUE,
  category_id INTEGER REFERENCES categories(id),
  is_active ${bool} DEFAULT ${dialect === 'sqlite' ? '1' : 'true'},
  tags ${arrayType}
);

CREATE TABLE orders (
  id ${serial}${dialect !== 'sqlite' ? ' PRIMARY KEY' : ''},
  user_id INTEGER NOT NULL REFERENCES users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address ${jsonType},
  created_at ${timestamp} DEFAULT ${now}
);`;
}
