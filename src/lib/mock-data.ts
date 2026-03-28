import type {
  Schema,
  Table,
  Relation,
  Migration,
  CompatibilityIssue,
  IndexRecommendation,
  RehearsalResult,
  SchemaVersion,
  Review,
} from './types';

// ── E-Commerce Schema Tables ──

const usersTable: Table = {
  id: 'tbl-users',
  name: 'users',
  columns: [
    { id: 'col-u1', name: 'id', type: 'SERIAL', nullable: false, isPrimaryKey: true, isUnique: true, isForeignKey: false },
    { id: 'col-u2', name: 'email', type: 'VARCHAR(255)', nullable: false, isPrimaryKey: false, isUnique: true, isForeignKey: false },
    { id: 'col-u3', name: 'name', type: 'VARCHAR(128)', nullable: false, isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-u4', name: 'password_hash', type: 'VARCHAR(256)', nullable: false, isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-u5', name: 'role', type: 'VARCHAR(20)', nullable: false, defaultValue: "'customer'", isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-u6', name: 'created_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()', isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-u7', name: 'updated_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()', isPrimaryKey: false, isUnique: false, isForeignKey: false },
  ],
  indexes: [
    { id: 'idx-u1', name: 'idx_users_email', columns: ['email'], unique: true, type: 'btree' },
  ],
  position: { x: 60, y: 40 },
};

const categoriesTable: Table = {
  id: 'tbl-categories',
  name: 'categories',
  columns: [
    { id: 'col-cat1', name: 'id', type: 'SERIAL', nullable: false, isPrimaryKey: true, isUnique: true, isForeignKey: false },
    { id: 'col-cat2', name: 'name', type: 'VARCHAR(100)', nullable: false, isPrimaryKey: false, isUnique: true, isForeignKey: false },
    { id: 'col-cat3', name: 'slug', type: 'VARCHAR(100)', nullable: false, isPrimaryKey: false, isUnique: true, isForeignKey: false },
    { id: 'col-cat4', name: 'parent_id', type: 'INTEGER', nullable: true, isPrimaryKey: false, isUnique: false, isForeignKey: true, references: { table: 'categories', column: 'id' } },
    { id: 'col-cat5', name: 'description', type: 'TEXT', nullable: true, isPrimaryKey: false, isUnique: false, isForeignKey: false },
  ],
  indexes: [
    { id: 'idx-cat1', name: 'idx_categories_slug', columns: ['slug'], unique: true, type: 'btree' },
  ],
  position: { x: 480, y: 40 },
};

const productsTable: Table = {
  id: 'tbl-products',
  name: 'products',
  columns: [
    { id: 'col-p1', name: 'id', type: 'SERIAL', nullable: false, isPrimaryKey: true, isUnique: true, isForeignKey: false },
    { id: 'col-p2', name: 'name', type: 'VARCHAR(255)', nullable: false, isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-p3', name: 'description', type: 'TEXT', nullable: true, isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-p4', name: 'price', type: 'DECIMAL(10,2)', nullable: false, isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-p5', name: 'sku', type: 'VARCHAR(50)', nullable: false, isPrimaryKey: false, isUnique: true, isForeignKey: false },
    { id: 'col-p6', name: 'stock_quantity', type: 'INTEGER', nullable: false, defaultValue: '0', isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-p7', name: 'category_id', type: 'INTEGER', nullable: true, isPrimaryKey: false, isUnique: false, isForeignKey: true, references: { table: 'categories', column: 'id' } },
    { id: 'col-p8', name: 'is_active', type: 'BOOLEAN', nullable: false, defaultValue: 'true', isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-p9', name: 'created_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()', isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-p10', name: 'tags', type: 'TEXT[]', nullable: true, isPrimaryKey: false, isUnique: false, isForeignKey: false },
  ],
  indexes: [
    { id: 'idx-p1', name: 'idx_products_sku', columns: ['sku'], unique: true, type: 'btree' },
    { id: 'idx-p2', name: 'idx_products_category', columns: ['category_id'], unique: false, type: 'btree' },
  ],
  position: { x: 480, y: 300 },
};

const ordersTable: Table = {
  id: 'tbl-orders',
  name: 'orders',
  columns: [
    { id: 'col-o1', name: 'id', type: 'SERIAL', nullable: false, isPrimaryKey: true, isUnique: true, isForeignKey: false },
    { id: 'col-o2', name: 'user_id', type: 'INTEGER', nullable: false, isPrimaryKey: false, isUnique: false, isForeignKey: true, references: { table: 'users', column: 'id' } },
    { id: 'col-o3', name: 'status', type: 'VARCHAR(20)', nullable: false, defaultValue: "'pending'", isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-o4', name: 'total_amount', type: 'DECIMAL(10,2)', nullable: false, isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-o5', name: 'shipping_address', type: 'JSONB', nullable: true, isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-o6', name: 'created_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()', isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-o7', name: 'updated_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()', isPrimaryKey: false, isUnique: false, isForeignKey: false },
  ],
  indexes: [
    { id: 'idx-o1', name: 'idx_orders_user', columns: ['user_id'], unique: false, type: 'btree' },
    { id: 'idx-o2', name: 'idx_orders_status', columns: ['status'], unique: false, type: 'btree' },
  ],
  position: { x: 60, y: 300 },
};

const orderItemsTable: Table = {
  id: 'tbl-order-items',
  name: 'order_items',
  columns: [
    { id: 'col-oi1', name: 'id', type: 'SERIAL', nullable: false, isPrimaryKey: true, isUnique: true, isForeignKey: false },
    { id: 'col-oi2', name: 'order_id', type: 'INTEGER', nullable: false, isPrimaryKey: false, isUnique: false, isForeignKey: true, references: { table: 'orders', column: 'id' } },
    { id: 'col-oi3', name: 'product_id', type: 'INTEGER', nullable: false, isPrimaryKey: false, isUnique: false, isForeignKey: true, references: { table: 'products', column: 'id' } },
    { id: 'col-oi4', name: 'quantity', type: 'INTEGER', nullable: false, isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-oi5', name: 'unit_price', type: 'DECIMAL(10,2)', nullable: false, isPrimaryKey: false, isUnique: false, isForeignKey: false },
  ],
  indexes: [
    { id: 'idx-oi1', name: 'idx_order_items_order', columns: ['order_id'], unique: false, type: 'btree' },
    { id: 'idx-oi2', name: 'idx_order_items_product', columns: ['product_id'], unique: false, type: 'btree' },
  ],
  position: { x: 270, y: 560 },
};

const reviewsTable: Table = {
  id: 'tbl-reviews',
  name: 'reviews',
  columns: [
    { id: 'col-r1', name: 'id', type: 'SERIAL', nullable: false, isPrimaryKey: true, isUnique: true, isForeignKey: false },
    { id: 'col-r2', name: 'user_id', type: 'INTEGER', nullable: false, isPrimaryKey: false, isUnique: false, isForeignKey: true, references: { table: 'users', column: 'id' } },
    { id: 'col-r3', name: 'product_id', type: 'INTEGER', nullable: false, isPrimaryKey: false, isUnique: false, isForeignKey: true, references: { table: 'products', column: 'id' } },
    { id: 'col-r4', name: 'rating', type: 'SMALLINT', nullable: false, isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-r5', name: 'title', type: 'VARCHAR(255)', nullable: true, isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-r6', name: 'body', type: 'TEXT', nullable: true, isPrimaryKey: false, isUnique: false, isForeignKey: false },
    { id: 'col-r7', name: 'created_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()', isPrimaryKey: false, isUnique: false, isForeignKey: false },
  ],
  indexes: [
    { id: 'idx-r1', name: 'idx_reviews_product', columns: ['product_id'], unique: false, type: 'btree' },
    { id: 'idx-r2', name: 'idx_reviews_user_product', columns: ['user_id', 'product_id'], unique: true, type: 'btree' },
  ],
  position: { x: 700, y: 560 },
};

// ── Relations ──

const relations: Relation[] = [
  { id: 'rel-1', fromTable: 'orders', fromColumn: 'user_id', toTable: 'users', toColumn: 'id', type: 'one-to-many' },
  { id: 'rel-2', fromTable: 'order_items', fromColumn: 'order_id', toTable: 'orders', toColumn: 'id', type: 'one-to-many' },
  { id: 'rel-3', fromTable: 'order_items', fromColumn: 'product_id', toTable: 'products', toColumn: 'id', type: 'one-to-many' },
  { id: 'rel-4', fromTable: 'products', fromColumn: 'category_id', toTable: 'categories', toColumn: 'id', type: 'one-to-many' },
  { id: 'rel-5', fromTable: 'reviews', fromColumn: 'user_id', toTable: 'users', toColumn: 'id', type: 'one-to-many' },
  { id: 'rel-6', fromTable: 'reviews', fromColumn: 'product_id', toTable: 'products', toColumn: 'id', type: 'one-to-many' },
  { id: 'rel-7', fromTable: 'categories', fromColumn: 'parent_id', toTable: 'categories', toColumn: 'id', type: 'one-to-many' },
];

// ── Main Schema ──

export const ecommerceSchema: Schema = {
  id: 'schema-ecommerce',
  name: 'E-Commerce Platform',
  tables: [usersTable, categoriesTable, productsTable, ordersTable, orderItemsTable, reviewsTable],
  relations,
  createdAt: '2025-12-01T10:00:00Z',
  updatedAt: '2026-03-27T14:30:00Z',
};

// ── Migrations ──

export const mockMigrations: Migration[] = [
  {
    id: 'mig-001',
    name: '001_create_users',
    upSql: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(128) NOT NULL,
  password_hash VARCHAR(256) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_users_email ON users (email);`,
    downSql: `DROP INDEX IF EXISTS idx_users_email;
DROP TABLE IF EXISTS users;`,
    createdAt: '2025-12-01T10:00:00Z',
    status: 'applied',
  },
  {
    id: 'mig-002',
    name: '002_create_categories',
    upSql: `CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  parent_id INTEGER REFERENCES categories(id),
  description TEXT
);

CREATE UNIQUE INDEX idx_categories_slug ON categories (slug);`,
    downSql: `DROP INDEX IF EXISTS idx_categories_slug;
DROP TABLE IF EXISTS categories;`,
    createdAt: '2025-12-01T10:05:00Z',
    status: 'applied',
  },
  {
    id: 'mig-003',
    name: '003_create_products',
    upSql: `CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  sku VARCHAR(50) NOT NULL UNIQUE,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  category_id INTEGER REFERENCES categories(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  tags TEXT[]
);

CREATE UNIQUE INDEX idx_products_sku ON products (sku);
CREATE INDEX idx_products_category ON products (category_id);`,
    downSql: `DROP INDEX IF EXISTS idx_products_category;
DROP INDEX IF EXISTS idx_products_sku;
DROP TABLE IF EXISTS products;`,
    createdAt: '2025-12-01T10:10:00Z',
    status: 'applied',
  },
  {
    id: 'mig-004',
    name: '004_create_orders_and_items',
    upSql: `CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders (user_id);
CREATE INDEX idx_orders_status ON orders (status);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL
);

CREATE INDEX idx_order_items_order ON order_items (order_id);
CREATE INDEX idx_order_items_product ON order_items (product_id);`,
    downSql: `DROP INDEX IF EXISTS idx_order_items_product;
DROP INDEX IF EXISTS idx_order_items_order;
DROP TABLE IF EXISTS order_items;
DROP INDEX IF EXISTS idx_orders_status;
DROP INDEX IF EXISTS idx_orders_user;
DROP TABLE IF EXISTS orders;`,
    createdAt: '2025-12-02T09:00:00Z',
    status: 'applied',
  },
  {
    id: 'mig-005',
    name: '005_create_reviews',
    upSql: `CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  body TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_product ON reviews (product_id);
CREATE UNIQUE INDEX idx_reviews_user_product ON reviews (user_id, product_id);`,
    downSql: `DROP INDEX IF EXISTS idx_reviews_user_product;
DROP INDEX IF EXISTS idx_reviews_product;
DROP TABLE IF EXISTS reviews;`,
    createdAt: '2025-12-03T11:00:00Z',
    status: 'applied',
  },
  {
    id: 'mig-006',
    name: '006_add_product_weight',
    upSql: `ALTER TABLE products ADD COLUMN weight_kg DECIMAL(8,3);
ALTER TABLE products ADD COLUMN dimensions JSONB;`,
    downSql: `ALTER TABLE products DROP COLUMN IF EXISTS dimensions;
ALTER TABLE products DROP COLUMN IF EXISTS weight_kg;`,
    createdAt: '2026-03-27T14:30:00Z',
    status: 'pending',
  },
];

// ── Compatibility Issues ──

export const mockCompatibilityIssues: CompatibilityIssue[] = [
  {
    table: 'products',
    column: 'tags',
    type: 'TEXT[]',
    dialect: 'mysql',
    level: 'incompatible',
    message: 'MySQL does not support ARRAY types.',
    suggestion: 'Use JSON column type instead: tags JSON',
  },
  {
    table: 'products',
    column: 'tags',
    type: 'TEXT[]',
    dialect: 'sqlite',
    level: 'incompatible',
    message: 'SQLite does not support ARRAY types.',
    suggestion: 'Store as comma-separated TEXT or JSON string.',
  },
  {
    table: 'orders',
    column: 'shipping_address',
    type: 'JSONB',
    dialect: 'mysql',
    level: 'warning',
    message: 'MySQL supports JSON but not JSONB. Binary storage optimization differs.',
    suggestion: 'Use JSON type. MySQL optimizes JSON storage internally.',
  },
  {
    table: 'orders',
    column: 'shipping_address',
    type: 'JSONB',
    dialect: 'sqlite',
    level: 'incompatible',
    message: 'SQLite does not have a native JSON column type.',
    suggestion: 'Store as TEXT and use json_extract() functions for queries.',
  },
  {
    table: 'users',
    column: 'id',
    type: 'SERIAL',
    dialect: 'sqlite',
    level: 'warning',
    message: 'SQLite uses INTEGER PRIMARY KEY AUTOINCREMENT instead of SERIAL.',
    suggestion: 'Use INTEGER PRIMARY KEY AUTOINCREMENT for SQLite.',
  },
  {
    table: 'users',
    column: 'id',
    type: 'SERIAL',
    dialect: 'mysql',
    level: 'warning',
    message: 'MySQL uses AUTO_INCREMENT instead of SERIAL.',
    suggestion: 'Use INT AUTO_INCREMENT for MySQL compatibility.',
  },
  {
    table: 'reviews',
    column: 'rating',
    type: 'SMALLINT',
    dialect: 'sqlite',
    level: 'warning',
    message: 'SQLite treats all integer types as INTEGER. SMALLINT is accepted but stored as INTEGER.',
    suggestion: 'Use INTEGER with a CHECK constraint for range validation.',
  },
  {
    table: 'products',
    column: 'price',
    type: 'DECIMAL(10,2)',
    dialect: 'sqlite',
    level: 'warning',
    message: 'SQLite does not enforce DECIMAL precision. Values are stored as REAL.',
    suggestion: 'Store monetary values as INTEGER cents (e.g., 1999 = $19.99) for precision.',
  },
];

// ── Index Recommendations ──

export const mockIndexRecommendations: IndexRecommendation[] = [
  {
    id: 'rec-1',
    table: 'orders',
    columns: ['user_id', 'created_at'],
    type: 'composite',
    reason: 'Queries filtering orders by user and sorting by date are very common in e-commerce. A composite index on (user_id, created_at) avoids a second sort pass.',
    impact: 'high',
    estimatedSizeKb: 256,
    sql: 'CREATE INDEX idx_orders_user_created ON orders (user_id, created_at DESC);',
  },
  {
    id: 'rec-2',
    table: 'products',
    columns: ['is_active', 'category_id'],
    type: 'composite',
    reason: 'Product listing pages filter by active status and category. This composite index covers both conditions efficiently.',
    impact: 'high',
    estimatedSizeKb: 128,
    sql: 'CREATE INDEX idx_products_active_category ON products (is_active, category_id) WHERE is_active = true;',
  },
  {
    id: 'rec-3',
    table: 'reviews',
    columns: ['product_id', 'rating'],
    type: 'composite',
    reason: 'Product pages showing average rating and rating distribution benefit from this index. Avoids full table scan for aggregations.',
    impact: 'medium',
    estimatedSizeKb: 64,
    sql: 'CREATE INDEX idx_reviews_product_rating ON reviews (product_id, rating);',
  },
  {
    id: 'rec-4',
    table: 'orders',
    columns: ['status', 'created_at'],
    type: 'composite',
    reason: 'Admin dashboard queries filtering by order status and date range. Composite index enables efficient range scans.',
    impact: 'medium',
    estimatedSizeKb: 192,
    sql: 'CREATE INDEX idx_orders_status_created ON orders (status, created_at DESC);',
  },
  {
    id: 'rec-5',
    table: 'products',
    columns: ['name'],
    type: 'single',
    reason: 'Product search by name requires text matching. A B-tree index on name improves LIKE prefix queries.',
    impact: 'low',
    estimatedSizeKb: 320,
    sql: 'CREATE INDEX idx_products_name ON products (name);',
  },
];

// ── Rehearsal Results ──

export const mockRehearsalResult: RehearsalResult = {
  id: 'reh-001',
  migrationId: 'mig-006',
  steps: [
    {
      id: 'step-1',
      sql: 'ALTER TABLE products ADD COLUMN weight_kg DECIMAL(8,3);',
      status: 'success',
      duration: 12,
      description: 'Add weight_kg column to products table',
    },
    {
      id: 'step-2',
      sql: 'ALTER TABLE products ADD COLUMN dimensions JSONB;',
      status: 'success',
      duration: 8,
      description: 'Add dimensions column (JSONB) to products table',
    },
    {
      id: 'step-3',
      sql: 'ALTER TABLE products DROP COLUMN IF EXISTS dimensions;',
      status: 'success',
      duration: 5,
      description: 'Rollback: Drop dimensions column',
    },
    {
      id: 'step-4',
      sql: 'ALTER TABLE products DROP COLUMN IF EXISTS weight_kg;',
      status: 'success',
      duration: 4,
      description: 'Rollback: Drop weight_kg column',
    },
  ],
  totalDuration: 29,
  status: 'success',
  createdAt: '2026-03-27T15:00:00Z',
};

// ── Version History ──

export const mockVersionHistory: SchemaVersion[] = [
  {
    id: 'ver-1',
    version: 1,
    label: 'Initial schema',
    author: 'Chris Nienhuis',
    createdAt: '2025-12-01T10:00:00Z',
    changeSummary: 'Created users and categories tables',
    schema: { ...ecommerceSchema, tables: [usersTable, categoriesTable], relations: [] },
    diff: {
      added: { tables: ['users', 'categories'], columns: [] },
      removed: { tables: [], columns: [] },
      modified: { tables: [], columns: [] },
    },
  },
  {
    id: 'ver-2',
    version: 2,
    author: 'Chris Nienhuis',
    createdAt: '2025-12-01T10:10:00Z',
    changeSummary: 'Added products table with category relation',
    schema: { ...ecommerceSchema, tables: [usersTable, categoriesTable, productsTable], relations: relations.filter(r => r.id === 'rel-4') },
    diff: {
      added: { tables: ['products'], columns: [] },
      removed: { tables: [], columns: [] },
      modified: { tables: [], columns: [] },
    },
  },
  {
    id: 'ver-3',
    version: 3,
    author: 'Sarah Kim',
    createdAt: '2025-12-02T09:00:00Z',
    changeSummary: 'Added orders and order_items tables',
    schema: { ...ecommerceSchema, tables: [usersTable, categoriesTable, productsTable, ordersTable, orderItemsTable], relations: relations.filter(r => ['rel-1', 'rel-2', 'rel-3', 'rel-4'].includes(r.id)) },
    diff: {
      added: { tables: ['orders', 'order_items'], columns: [] },
      removed: { tables: [], columns: [] },
      modified: { tables: [], columns: [] },
    },
  },
  {
    id: 'ver-4',
    version: 4,
    label: 'v1.0 release',
    author: 'Chris Nienhuis',
    createdAt: '2025-12-03T11:00:00Z',
    changeSummary: 'Added reviews table for product ratings',
    schema: ecommerceSchema,
    diff: {
      added: { tables: ['reviews'], columns: [] },
      removed: { tables: [], columns: [] },
      modified: { tables: [], columns: [] },
    },
  },
  {
    id: 'ver-5',
    version: 5,
    author: 'Sarah Kim',
    createdAt: '2026-01-15T16:00:00Z',
    changeSummary: 'Added JSONB shipping_address to orders',
    schema: ecommerceSchema,
    diff: {
      added: { tables: [], columns: [{ table: 'orders', column: 'shipping_address' }] },
      removed: { tables: [], columns: [] },
      modified: { tables: [], columns: [] },
    },
  },
  {
    id: 'ver-6',
    version: 6,
    author: 'Chris Nienhuis',
    createdAt: '2026-03-27T14:30:00Z',
    changeSummary: 'Adding weight and dimensions to products',
    schema: ecommerceSchema,
    diff: {
      added: { tables: [], columns: [{ table: 'products', column: 'weight_kg' }, { table: 'products', column: 'dimensions' }] },
      removed: { tables: [], columns: [] },
      modified: { tables: [], columns: [] },
    },
  },
];

// ── Reviews ──

export const mockReviews: Review[] = [
  {
    id: 'rev-001',
    title: 'Add weight and dimensions to products',
    description: 'Adds weight_kg (DECIMAL) and dimensions (JSONB) columns to support shipping calculations.',
    author: 'Chris Nienhuis',
    reviewer: 'Sarah Kim',
    status: 'open',
    schemaVersionId: 'ver-6',
    createdAt: '2026-03-27T14:35:00Z',
    updatedAt: '2026-03-27T15:10:00Z',
    comments: [
      {
        id: 'cmt-1',
        author: 'Sarah Kim',
        content: 'Should weight_kg be NOT NULL with a default? Existing products will have NULL values.',
        createdAt: '2026-03-27T15:00:00Z',
        target: { table: 'products', column: 'weight_kg' },
      },
      {
        id: 'cmt-2',
        author: 'Chris Nienhuis',
        content: 'Good point. We can backfill later, but for now NULL is fine since not all products ship physically (e.g., digital goods).',
        createdAt: '2026-03-27T15:05:00Z',
        target: { table: 'products', column: 'weight_kg' },
      },
      {
        id: 'cmt-3',
        author: 'Sarah Kim',
        content: 'Makes sense. Consider adding a CHECK constraint for weight_kg > 0 when NOT NULL.',
        createdAt: '2026-03-27T15:10:00Z',
      },
    ],
  },
  {
    id: 'rev-002',
    title: 'Add product tags array',
    description: 'Adds tags TEXT[] column for flexible product tagging.',
    author: 'Sarah Kim',
    reviewer: 'Chris Nienhuis',
    status: 'approved',
    schemaVersionId: 'ver-4',
    createdAt: '2025-12-03T12:00:00Z',
    updatedAt: '2025-12-03T14:00:00Z',
    comments: [
      {
        id: 'cmt-4',
        author: 'Chris Nienhuis',
        content: 'LGTM. Consider adding a GIN index on tags for efficient array lookups.',
        createdAt: '2025-12-03T13:00:00Z',
        target: { table: 'products', column: 'tags' },
      },
    ],
  },
  {
    id: 'rev-003',
    title: 'Add user roles and permissions',
    description: 'Updates user role to use enum and adds a permissions table.',
    author: 'Chris Nienhuis',
    reviewer: 'Sarah Kim',
    status: 'changes_requested',
    schemaVersionId: 'ver-5',
    createdAt: '2026-02-10T09:00:00Z',
    updatedAt: '2026-02-11T11:00:00Z',
    comments: [
      {
        id: 'cmt-5',
        author: 'Sarah Kim',
        content: 'Using an ENUM for roles is problematic for cross-DB compatibility. Consider a separate roles table instead.',
        createdAt: '2026-02-10T10:00:00Z',
        target: { table: 'users', column: 'role' },
      },
      {
        id: 'cmt-6',
        author: 'Sarah Kim',
        content: 'Also, the permissions table needs a unique constraint on (role_id, permission_name).',
        createdAt: '2026-02-10T10:05:00Z',
      },
    ],
  },
];
