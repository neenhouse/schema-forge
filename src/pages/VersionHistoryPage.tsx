import { useState } from 'react';
import { mockVersionHistory } from '@/lib/mock-data';
import type { SchemaVersion, SchemaDiff } from '@/lib/types';
import './VersionHistoryPage.css';

export default function VersionHistoryPage() {
  const [versions] = useState<SchemaVersion[]>(mockVersionHistory);
  const [selectedVersion, setSelectedVersion] = useState<SchemaVersion>(versions[versions.length - 1]);
  const [compareVersion, setCompareVersion] = useState<SchemaVersion | null>(
    versions.length > 1 ? versions[versions.length - 2] : null
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderDiff = (diff?: SchemaDiff) => {
    if (!diff) return <p className="no-diff">No diff available</p>;

    const hasChanges =
      diff.added.tables.length > 0 ||
      diff.added.columns.length > 0 ||
      diff.removed.tables.length > 0 ||
      diff.removed.columns.length > 0 ||
      diff.modified.tables.length > 0 ||
      diff.modified.columns.length > 0;

    if (!hasChanges) return <p className="no-diff">No changes in this version</p>;

    return (
      <div className="diff-content">
        {diff.added.tables.length > 0 && (
          <div className="diff-section">
            <div className="diff-label added">+ Added Tables</div>
            {diff.added.tables.map(t => (
              <div key={t} className="diff-item added">{t}</div>
            ))}
          </div>
        )}
        {diff.added.columns.length > 0 && (
          <div className="diff-section">
            <div className="diff-label added">+ Added Columns</div>
            {diff.added.columns.map((c, i) => (
              <div key={i} className="diff-item added">{c.table}.{c.column}</div>
            ))}
          </div>
        )}
        {diff.removed.tables.length > 0 && (
          <div className="diff-section">
            <div className="diff-label removed">- Removed Tables</div>
            {diff.removed.tables.map(t => (
              <div key={t} className="diff-item removed">{t}</div>
            ))}
          </div>
        )}
        {diff.removed.columns.length > 0 && (
          <div className="diff-section">
            <div className="diff-label removed">- Removed Columns</div>
            {diff.removed.columns.map((c, i) => (
              <div key={i} className="diff-item removed">{c.table}.{c.column}</div>
            ))}
          </div>
        )}
        {diff.modified.columns.length > 0 && (
          <div className="diff-section">
            <div className="diff-label modified">~ Modified Columns</div>
            {diff.modified.columns.map((c, i) => (
              <div key={i} className="diff-item modified">{c.table}.{c.column}: {c.change}</div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="history-page">
      <div className="page-header">
        <div>
          <h2>Version History</h2>
          <p className="page-subtitle">Timeline of schema versions with diffs between any two versions</p>
        </div>
      </div>

      <div className="history-layout">
        <div className="history-timeline">
          <div className="section-label">Timeline</div>
          {[...versions].reverse().map((ver, idx) => (
            <button
              key={ver.id}
              className={`timeline-item ${selectedVersion.id === ver.id ? 'active' : ''} ${compareVersion?.id === ver.id ? 'compare' : ''}`}
              onClick={() => {
                if (selectedVersion.id === ver.id) return;
                setCompareVersion(selectedVersion);
                setSelectedVersion(ver);
              }}
            >
              <div className="timeline-marker">
                <span className="timeline-dot" />
                {idx < versions.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-top">
                  <span className="timeline-version">v{ver.version}</span>
                  {ver.label && <span className="timeline-label">{ver.label}</span>}
                </div>
                <p className="timeline-summary">{ver.changeSummary}</p>
                <div className="timeline-meta">
                  <span className="timeline-author">{ver.author}</span>
                  <span className="timeline-date">{formatDate(ver.createdAt)}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="history-detail">
          <div className="detail-panel">
            <div className="detail-panel-header">
              <div>
                <div className="detail-version-row">
                  <span className="detail-version">Version {selectedVersion.version}</span>
                  {selectedVersion.label && (
                    <span className="detail-tag">{selectedVersion.label}</span>
                  )}
                </div>
                <p className="detail-summary">{selectedVersion.changeSummary}</p>
              </div>
              <div className="detail-meta-row">
                <span className="detail-author">{selectedVersion.author}</span>
                <span className="detail-date">{formatDate(selectedVersion.createdAt)}</span>
              </div>
            </div>

            <div className="detail-panel-body">
              <div className="section-label">Changes</div>
              {renderDiff(selectedVersion.diff)}
            </div>

            <div className="detail-panel-footer">
              <div className="schema-summary">
                <span className="summary-item">
                  {selectedVersion.schema.tables.length} tables
                </span>
                <span className="summary-item">
                  {selectedVersion.schema.relations.length} relations
                </span>
                <span className="summary-item">
                  {selectedVersion.schema.tables.reduce((sum, t) => sum + t.columns.length, 0)} columns
                </span>
              </div>
            </div>
          </div>

          {compareVersion && compareVersion.id !== selectedVersion.id && (
            <div className="compare-panel">
              <div className="compare-header">
                <span className="compare-title">
                  Comparing v{Math.min(selectedVersion.version, compareVersion.version)} {'\u2192'} v{Math.max(selectedVersion.version, compareVersion.version)}
                </span>
              </div>
              <div className="compare-body">
                <div className="compare-side">
                  <div className="compare-side-header">v{compareVersion.version}</div>
                  <div className="compare-tables">
                    {compareVersion.schema.tables.map(t => (
                      <span key={t.id} className="compare-table-chip">{t.name}</span>
                    ))}
                  </div>
                </div>
                <div className="compare-arrow">{'\u2192'}</div>
                <div className="compare-side">
                  <div className="compare-side-header">v{selectedVersion.version}</div>
                  <div className="compare-tables">
                    {selectedVersion.schema.tables.map(t => {
                      const isNew = !compareVersion.schema.tables.some(ct => ct.name === t.name);
                      return (
                        <span key={t.id} className={`compare-table-chip ${isNew ? 'new' : ''}`}>
                          {t.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
