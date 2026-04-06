import { useState, useEffect, useCallback } from 'react';
import { mockRehearsalResult, mockMigrations } from '@/lib/mock-data';
import type { RehearsalStep } from '@/lib/types';
import './RehearsalPage.css';

export default function RehearsalPage() {
  const migration = mockMigrations[mockMigrations.length - 1];
  const [steps, setSteps] = useState<RehearsalStep[]>(
    mockRehearsalResult.steps.map(s => ({ ...s, status: 'pending', duration: undefined }))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [totalDuration, setTotalDuration] = useState(0);
  const [overallStatus, setOverallStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');

  const runRehearsal = useCallback(() => {
    setIsRunning(true);
    setOverallStatus('running');
    setTotalDuration(0);
    setCurrentStep(0);
    setSteps(mockRehearsalResult.steps.map((s, i) => ({ ...s, status: i === 0 ? 'running' : 'pending', duration: undefined })));
  }, []);

  useEffect(() => {
    if (!isRunning || currentStep < 0 || currentStep >= steps.length) return;

    const originalStep = mockRehearsalResult.steps[currentStep];
    const timeout = setTimeout(() => {
      setSteps(prev => prev.map((s, i) => {
        if (i === currentStep) {
          return { ...s, status: originalStep.status as RehearsalStep['status'], duration: originalStep.duration };
        }
        if (i === currentStep + 1) {
          return { ...s, status: 'running' };
        }
        return s;
      }));
      setTotalDuration(prev => prev + (originalStep.duration ?? 0));

      if (currentStep + 1 >= steps.length) {
        setIsRunning(false);
        setOverallStatus('success');
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }, 600 + Math.random() * 400);

    return () => clearTimeout(timeout);
  }, [isRunning, currentStep, steps.length]);

  const resetRehearsal = () => {
    setSteps(mockRehearsalResult.steps.map(s => ({ ...s, status: 'pending', duration: undefined })));
    setCurrentStep(-1);
    setIsRunning(false);
    setTotalDuration(0);
    setOverallStatus('idle');
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'success': return '\u2713';
      case 'error': return '\u2717';
      case 'running': return '\u25CB';
      default: return '\u2022';
    }
  };

  return (
    <div className="rehearsal-page">
      <div className="page-header">
        <div>
          <h2>Migration Rehearsal</h2>
          <p className="page-subtitle">Step-by-step dry-run showing what would happen</p>
        </div>
      </div>

      <div className="rehearsal-layout">
        <div className="rehearsal-main">
          <div className="rehearsal-target">
            <div className="target-header">
              <div className="target-info">
                <h4>Target Migration</h4>
                <span className="target-name">{migration.name}</span>
              </div>
              <div className="target-actions">
                {overallStatus === 'idle' && (
                  <button className="btn-rehearse" onClick={runRehearsal}>
                    {'\u25B6'} Run Rehearsal
                  </button>
                )}
                {overallStatus === 'running' && (
                  <span className="running-indicator">
                    <span className="spinner" /> Running...
                  </span>
                )}
                {(overallStatus === 'success' || overallStatus === 'failed') && (
                  <button className="btn-reset" onClick={resetRehearsal}>
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="rehearsal-steps">
            <div className="section-label">Execution Steps</div>
            {steps.map((step, idx) => (
              <div key={step.id} className={`step-card step-${step.status}`}>
                <div className="step-number">
                  <span className={`step-icon step-icon-${step.status}`}>
                    {statusIcon(step.status)}
                  </span>
                  {idx < steps.length - 1 && <div className="step-connector" />}
                </div>
                <div className="step-content">
                  <div className="step-top">
                    <span className="step-desc">{step.description}</span>
                    {step.duration !== undefined && (
                      <span className="step-duration">{step.duration}ms</span>
                    )}
                  </div>
                  <pre className="step-sql"><code>{step.sql}</code></pre>
                  {step.status === 'running' && (
                    <div className="step-progress">
                      <div className="step-progress-bar" />
                    </div>
                  )}
                  {step.error && (
                    <div className="step-error">{step.error}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rehearsal-sidebar">
          <div className="section-label">Rehearsal Summary</div>
          <div className="summary-card">
            <div className="summary-row">
              <span className="summary-key">Status</span>
              <span className={`summary-val status-${overallStatus}`}>
                {overallStatus === 'idle' ? 'Ready' : overallStatus}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-key">Total Steps</span>
              <span className="summary-val">{steps.length}</span>
            </div>
            <div className="summary-row">
              <span className="summary-key">Completed</span>
              <span className="summary-val">
                {steps.filter(s => s.status === 'success').length}/{steps.length}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-key">Duration</span>
              <span className="summary-val">{totalDuration}ms</span>
            </div>
            <div className="summary-row">
              <span className="summary-key">Database</span>
              <span className="summary-val">Sandbox (SQLite)</span>
            </div>
          </div>

          <div className="section-label" style={{ marginTop: 'var(--space-lg)' }}>Migration SQL</div>
          <div className="migration-preview">
            <div className="preview-label">UP</div>
            <pre><code>{migration.upSql}</code></pre>
          </div>
          <div className="migration-preview">
            <div className="preview-label">DOWN</div>
            <pre><code>{migration.downSql}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}
