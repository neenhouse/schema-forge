import { useState } from 'react';
import { mockIndexRecommendations, ecommerceSchema } from '@/lib/mock-data';
import type { IndexRecommendation } from '@/lib/types';
import './IndexOptimizerPage.css';

export default function IndexOptimizerPage() {
  const [recommendations] = useState<IndexRecommendation[]>(mockIndexRecommendations);
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(recommendations[0]?.id ?? null);

  const handleApply = (id: string) => {
    setAppliedIds(prev => new Set(prev).add(id));
  };

  const impactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'impact-high';
      case 'medium': return 'impact-medium';
      case 'low': return 'impact-low';
      default: return '';
    }
  };

  const existingIndexes = ecommerceSchema.tables.flatMap(t =>
    t.indexes.map(idx => ({ table: t.name, ...idx }))
  );

  return (
    <div className="optimizer-page">
      <div className="page-header">
        <div>
          <h2>Index Optimization Advisor</h2>
          <p className="page-subtitle">
            AI-powered index recommendations based on foreign keys and query patterns
          </p>
        </div>
        <div className="optimizer-stats">
          <div className="stat-card">
            <span className="stat-value">{existingIndexes.length}</span>
            <span className="stat-label">Current Indexes</span>
          </div>
          <div className="stat-card stat-recommended">
            <span className="stat-value">{recommendations.length}</span>
            <span className="stat-label">Recommended</span>
          </div>
          <div className="stat-card stat-applied">
            <span className="stat-value">{appliedIds.size}</span>
            <span className="stat-label">Applied</span>
          </div>
        </div>
      </div>

      <div className="optimizer-layout">
        <div className="optimizer-main">
          <div className="section-label">Recommendations</div>
          {recommendations.map(rec => {
            const isApplied = appliedIds.has(rec.id);
            const isExpanded = expandedId === rec.id;
            return (
              <div
                key={rec.id}
                className={`rec-card ${isApplied ? 'applied' : ''} ${isExpanded ? 'expanded' : ''}`}
              >
                <button
                  className="rec-header"
                  onClick={() => setExpandedId(isExpanded ? null : rec.id)}
                >
                  <div className="rec-header-left">
                    <span className={`rec-impact ${impactColor(rec.impact)}`}>{rec.impact}</span>
                    <span className="rec-table">{rec.table}</span>
                    <span className="rec-columns">({rec.columns.join(', ')})</span>
                  </div>
                  <div className="rec-header-right">
                    <span className="rec-type">{rec.type}</span>
                    <span className="rec-size">~{rec.estimatedSizeKb} KB</span>
                    <span className="rec-chevron">{isExpanded ? '\u25B2' : '\u25BC'}</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="rec-body">
                    <div className="rec-reason">
                      <div className="rec-section-label">Why this index?</div>
                      <p>{rec.reason}</p>
                    </div>
                    <div className="rec-sql">
                      <div className="rec-section-label">SQL</div>
                      <pre><code>{rec.sql}</code></pre>
                    </div>
                    <div className="rec-meta">
                      <div className="meta-chip">
                        <span className="meta-key">Table</span>
                        <span className="meta-val">{rec.table}</span>
                      </div>
                      <div className="meta-chip">
                        <span className="meta-key">Type</span>
                        <span className="meta-val">{rec.type}</span>
                      </div>
                      <div className="meta-chip">
                        <span className="meta-key">Est. Size</span>
                        <span className="meta-val">{rec.estimatedSizeKb} KB</span>
                      </div>
                    </div>
                    <div className="rec-actions">
                      {isApplied ? (
                        <span className="applied-badge">Applied</span>
                      ) : (
                        <button className="btn-apply" onClick={() => handleApply(rec.id)}>
                          Apply Recommendation
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="optimizer-sidebar">
          <div className="section-label">Current Indexes</div>
          <div className="existing-indexes">
            {ecommerceSchema.tables.map(table => (
              table.indexes.length > 0 && (
                <div key={table.id} className="index-group">
                  <div className="index-group-header">{table.name}</div>
                  {table.indexes.map(idx => (
                    <div key={idx.id} className="existing-index">
                      <span className="index-name">{idx.name}</span>
                      <span className="index-cols">{idx.columns.join(', ')}</span>
                      {idx.unique && <span className="index-unique">UNIQUE</span>}
                    </div>
                  ))}
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
