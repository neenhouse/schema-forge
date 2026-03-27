# SchemaForge -- Product Requirements Document

## Overview

SchemaForge is a database schema management platform that provides visual schema design, automated migration generation, cross-database compatibility checking, index optimization, migration rehearsal, version history, and team review workflows.

## Target Users

- Individual developers building side projects or early-stage products
- Backend engineering teams managing schema evolution across services
- DBAs and platform engineers responsible for database health and performance
- Engineering managers overseeing schema change governance

---

## Feature 1: Landing Page

### Summary
Marketing and product landing page that communicates SchemaForge's value proposition, showcases features, and drives sign-up.

### Requirements
- F1.1: Hero section with headline, subheadline, and primary CTA ("Get Started")
- F1.2: Feature grid showcasing 7 core capabilities with icons and short descriptions
- F1.3: Interactive demo preview -- animated schema designer mockup showing drag-and-drop
- F1.4: Pricing section with Free, Pro, and Team tiers
- F1.5: Social proof section (testimonials or usage stats)
- F1.6: Footer with navigation links, legal, and social links
- F1.7: Responsive design -- mobile, tablet, desktop breakpoints
- F1.8: SEO-optimized meta tags and Open Graph content

### Acceptance Criteria
- Page loads in < 2 seconds on 3G connection
- Lighthouse performance score >= 90
- All CTAs link to sign-up / app entry

---

## Feature 2: Visual Schema Designer

### Summary
Drag-and-drop canvas for creating and editing database schemas. Tables, columns, relationships, constraints, and indexes are represented as visual nodes and edges.

### Requirements
- F2.1: Canvas with pan, zoom, and minimap navigation
- F2.2: Create tables via double-click or toolbar -- name, columns, types
- F2.3: Column editor -- name, type, nullable, default, primary key, unique, check constraints
- F2.4: Draw relationships by dragging between columns (foreign keys)
- F2.5: Relationship types -- one-to-one, one-to-many, many-to-many (auto join table)
- F2.6: Auto-layout algorithm (force-directed or hierarchical)
- F2.7: Undo/redo with full history stack
- F2.8: Export schema as SQL DDL, JSON, or PNG image
- F2.9: Import existing schema from SQL DDL or database connection string
- F2.10: Keyboard shortcuts for common operations

### Acceptance Criteria
- Canvas handles 100+ tables without frame drops
- All standard SQL types supported for PostgreSQL, MySQL, SQLite
- Undo/redo stack persists across page refreshes

---

## Feature 3: Migration Generator

### Summary
Automatically generate database migrations by diffing the current schema state against the desired state from the visual designer.

### Requirements
- F3.1: Diff engine that compares two schema snapshots (before/after)
- F3.2: Generate forward migration (up) and rollback migration (down)
- F3.3: Support for CREATE TABLE, ALTER TABLE, DROP TABLE operations
- F3.4: Support for ADD/DROP/ALTER COLUMN, ADD/DROP INDEX, ADD/DROP CONSTRAINT
- F3.5: Generate idiomatic SQL for target database dialect
- F3.6: Migration preview with syntax highlighting
- F3.7: Copy migration to clipboard or download as `.sql` file
- F3.8: Migration ordering -- detect and resolve dependency order automatically
- F3.9: Batch multiple changes into a single migration or split into atomic steps

### Acceptance Criteria
- Generated migrations are syntactically valid for target dialect
- Rollback migration fully reverses the forward migration
- Dependency ordering is correct (e.g., create referenced table before FK)

---

## Feature 4: Cross-Database Compatibility Checker

### Summary
Real-time validation that a schema and its migrations are compatible across multiple database engines (PostgreSQL, MySQL, SQLite, SQL Server).

### Requirements
- F4.1: Select target databases from a checklist (multi-select)
- F4.2: Real-time compatibility indicators on each table/column (green/yellow/red)
- F4.3: Detailed warnings for unsupported types, syntax, or features
- F4.4: Suggested alternatives when a feature is unsupported (e.g., "MySQL does not support ARRAY -- use JSON instead")
- F4.5: Compatibility report exportable as JSON or PDF
- F4.6: Database-specific migration output for each selected target
- F4.7: Side-by-side SQL comparison across dialects

### Acceptance Criteria
- All standard SQL type mappings covered for PG, MySQL, SQLite, SQL Server
- Warnings are actionable with specific alternatives
- Zero false negatives on known incompatibilities

---

## Feature 5: Index Optimization Advisor

### Summary
AI-powered analysis of schema design and query patterns to recommend index creation, modification, or removal.

### Requirements
- F5.1: Analyze current schema indexes and flag missing or redundant indexes
- F5.2: Accept query patterns (SQL queries or ORM query descriptions) as input
- F5.3: Recommend indexes based on WHERE, JOIN, ORDER BY, and GROUP BY clauses
- F5.4: Estimate index size impact and write performance tradeoffs
- F5.5: One-click "apply recommendation" to add index to schema
- F5.6: Composite index recommendations with column ordering rationale
- F5.7: Partial index and expression index suggestions (where supported)
- F5.8: Advisor explains recommendations in plain English

### Acceptance Criteria
- Recommendations are specific (table, columns, type) not generic
- Size estimates are within 2x of actual for standard data distributions
- Plain-English explanations are clear to non-DBA users

---

## Feature 6: Migration Rehearsal / Dry-Run

### Summary
Execute migrations against a sandboxed copy of the target database to validate correctness, measure execution time, and detect potential issues before production deployment.

### Requirements
- F6.1: One-click "Rehearse" button on any pending migration
- F6.2: Spin up ephemeral database instance (in-browser SQLite or remote sandbox)
- F6.3: Execute migration and report success/failure with detailed error messages
- F6.4: Measure execution time and estimate production duration
- F6.5: Detect locking behavior and flag long-running operations
- F6.6: Validate rollback by executing down migration after up
- F6.7: Show before/after schema comparison post-rehearsal
- F6.8: Rehearsal history log with timestamps and results

### Acceptance Criteria
- Rehearsal completes in < 30 seconds for schemas up to 200 tables
- Errors are presented with line-level detail in the migration SQL
- No data from rehearsal leaks to production

---

## Feature 7: Version History Timeline

### Summary
Visual timeline showing every schema version, with diffs between any two versions and the ability to restore or fork from any historical state.

### Requirements
- F7.1: Chronological timeline view with version markers
- F7.2: Each version shows author, timestamp, and change summary
- F7.3: Visual diff between any two versions (table-level and column-level)
- F7.4: Side-by-side schema comparison view
- F7.5: Restore schema to any previous version (creates new version, non-destructive)
- F7.6: Fork from any version to create a branch
- F7.7: Tag versions with labels (e.g., "v1.0 release", "pre-migration")
- F7.8: Search and filter by date range, author, or change type

### Acceptance Criteria
- Timeline loads in < 1 second for up to 500 versions
- Diffs are accurate at the column/constraint level
- Restore creates a new version (never mutates history)

---

## Feature 8: Team Review Workflow

### Summary
Purpose-built review experience for schema changes, with real-time collaboration, inline comments, approval gates, and integration with existing development workflows.

### Requirements
- F8.1: Create review request from any schema change (analogous to a PR)
- F8.2: Reviewer sees visual schema diff with added/removed/modified highlights
- F8.3: Inline comments on specific tables, columns, or relationships
- F8.4: Real-time presence indicators showing who is viewing the review
- F8.5: Approval workflow -- configurable required approvers count
- F8.6: Review status tracking (open, changes requested, approved, merged)
- F8.7: Notification system (in-app and email) for review events
- F8.8: Integration hooks for GitHub/GitLab -- auto-create PR with migration files
- F8.9: Audit log of all review actions

### Acceptance Criteria
- Real-time updates appear within 500ms for all connected reviewers
- Approval gates block merge until requirements are met
- Audit log captures all actions with actor, timestamp, and detail

---

## Non-Functional Requirements

| Category | Requirement |
|----------|------------|
| Performance | Initial page load < 2s, canvas interaction < 16ms frame time |
| Accessibility | WCAG 2.1 AA compliance |
| Security | All data encrypted in transit (TLS) and at rest |
| Scalability | Support 100+ concurrent users in review sessions |
| Reliability | 99.9% uptime SLA for production deployments |
| Browser Support | Latest 2 versions of Chrome, Firefox, Safari, Edge |
