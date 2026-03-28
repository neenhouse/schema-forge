// Core schema types
export interface Column {
  id: string;
  name: string;
  type: string;
  nullable: boolean;
  defaultValue?: string;
  isPrimaryKey: boolean;
  isUnique: boolean;
  isForeignKey: boolean;
  references?: {
    table: string;
    column: string;
  };
}

export interface TableIndex {
  id: string;
  name: string;
  columns: string[];
  unique: boolean;
  type: 'btree' | 'hash' | 'gin' | 'gist';
}

export interface Table {
  id: string;
  name: string;
  columns: Column[];
  indexes: TableIndex[];
  position: { x: number; y: number };
}

export interface Relation {
  id: string;
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

export interface Schema {
  id: string;
  name: string;
  tables: Table[];
  relations: Relation[];
  createdAt: string;
  updatedAt: string;
}

// Migration types
export interface Migration {
  id: string;
  name: string;
  upSql: string;
  downSql: string;
  createdAt: string;
  status: 'pending' | 'applied' | 'rolled_back';
}

// Compatibility types
export type DatabaseDialect = 'postgresql' | 'mysql' | 'sqlite';

export type CompatibilityLevel = 'compatible' | 'warning' | 'incompatible';

export interface CompatibilityIssue {
  table: string;
  column: string;
  type: string;
  dialect: DatabaseDialect;
  level: CompatibilityLevel;
  message: string;
  suggestion: string;
}

// Index optimizer types
export interface IndexRecommendation {
  id: string;
  table: string;
  columns: string[];
  type: 'single' | 'composite' | 'partial';
  reason: string;
  impact: 'high' | 'medium' | 'low';
  estimatedSizeKb: number;
  sql: string;
}

// Rehearsal types
export interface RehearsalStep {
  id: string;
  sql: string;
  status: 'pending' | 'running' | 'success' | 'error';
  duration?: number;
  error?: string;
  description: string;
}

export interface RehearsalResult {
  id: string;
  migrationId: string;
  steps: RehearsalStep[];
  totalDuration: number;
  status: 'success' | 'failed';
  createdAt: string;
}

// Version history types
export interface SchemaVersion {
  id: string;
  version: number;
  label?: string;
  author: string;
  createdAt: string;
  changeSummary: string;
  schema: Schema;
  diff?: SchemaDiff;
}

export interface SchemaDiff {
  added: { tables: string[]; columns: { table: string; column: string }[] };
  removed: { tables: string[]; columns: { table: string; column: string }[] };
  modified: { tables: string[]; columns: { table: string; column: string; change: string }[] };
}

// Review types
export type ReviewStatus = 'open' | 'changes_requested' | 'approved' | 'merged';

export interface ReviewComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  target?: {
    table?: string;
    column?: string;
  };
}

export interface Review {
  id: string;
  title: string;
  description: string;
  author: string;
  reviewer: string;
  status: ReviewStatus;
  comments: ReviewComment[];
  schemaVersionId: string;
  createdAt: string;
  updatedAt: string;
}
