import { useState } from 'react';
import { mockMigrations } from '@/lib/mock-data';
import type { Migration } from '@/lib/types';
import './MigrationsPage.css';

export default function MigrationsPage() {
  const [migrations] = useState<Migration[]>(mockMigrations);
  const [selectedMigration, setSelectedMigration] = useState<Migration>(mockMigrations[mockMigrations.length - 1]);
  const [activeTab, setActiveTab] = useState<'up' | 'down'>('up');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const sql = activeTab === 'up' ? selectedMigration.upSql : selectedMigration.downSql;
    navigator.clipboard.writeText(sql).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const statusColors: Record<string, string> = {
    applied: 'status-applied',
    pending: 'status-pending',
    rolled_back: 'status-rolled-back',
  };

  return (
    <div className="migrations-page">
      <div className="page-header">
        <div>
          <h2>Migration Generator</h2>
          <p className="page-subtitle">Auto-generated UP and DOWN SQL from schema changes</p>
        </div>
      </div>

      <div className="migrations-layout">
        <div className="migrations-list">
          <div className="list-header">
            <h4>Migrations ({migrations.length})</h4>
          </div>
          {migrations.map(mig => (
            <button
              key={mig.id}
              className={`migration-item ${selectedMigration.id === mig.id ? 'active' : ''}`}
              onClick={() => setSelectedMigration(mig)}
            >
              <div className="migration-item-top">
                <span className="migration-name">{mig.name}</span>
                <span className={`migration-status ${statusColors[mig.status]}`}>
                  {mig.status.replace('_', ' ')}
                </span>
              </div>
              <div className="migration-date">
                {new Date(mig.createdAt).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
                })}
              </div>
            </button>
          ))}
        </div>

        <div className="migration-detail">
          <div className="detail-header">
            <h3>{selectedMigration.name}</h3>
            <span className={`migration-status ${statusColors[selectedMigration.status]}`}>
              {selectedMigration.status.replace('_', ' ')}
            </span>
          </div>

          <div className="sql-tabs">
            <button
              className={`sql-tab ${activeTab === 'up' ? 'active' : ''}`}
              onClick={() => setActiveTab('up')}
            >
              UP Migration
            </button>
            <button
              className={`sql-tab ${activeTab === 'down' ? 'active' : ''}`}
              onClick={() => setActiveTab('down')}
            >
              DOWN Migration (Rollback)
            </button>
            <button className="btn-tool copy-btn" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy SQL'}
            </button>
          </div>

          <div className="sql-preview">
            <pre>
              <code>{activeTab === 'up' ? selectedMigration.upSql : selectedMigration.downSql}</code>
            </pre>
          </div>

          <div className="migration-meta">
            <div className="meta-item">
              <span className="meta-label">Created</span>
              <span className="meta-value">
                {new Date(selectedMigration.createdAt).toLocaleDateString('en-US', {
                  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                })}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Status</span>
              <span className="meta-value">{selectedMigration.status.replace('_', ' ')}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Lines</span>
              <span className="meta-value">
                UP: {selectedMigration.upSql.split('\n').length} | DOWN: {selectedMigration.downSql.split('\n').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
