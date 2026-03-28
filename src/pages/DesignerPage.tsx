import { useState, useRef, useCallback, useEffect } from 'react';
import { ecommerceSchema } from '@/lib/mock-data';
import type { Table, Relation } from '@/lib/types';
import './DesignerPage.css';

interface DragState {
  tableId: string;
  offsetX: number;
  offsetY: number;
}

export default function DesignerPage() {
  const [tables, setTables] = useState<Table[]>(ecommerceSchema.tables);
  const [relations] = useState<Relation[]>(ecommerceSchema.relations);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const dragRef = useRef<DragState | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, tableId: string) => {
    e.stopPropagation();
    const table = tables.find(t => t.id === tableId);
    if (!table) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = (e.clientX - rect.left - pan.x) / zoom;
    const mouseY = (e.clientY - rect.top - pan.y) / zoom;
    dragRef.current = {
      tableId,
      offsetX: mouseX - table.position.x,
      offsetY: mouseY - table.position.y,
    };
    setSelectedTable(tableId);
  }, [tables, pan, zoom]);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).classList.contains('designer-canvas-inner')) {
      setSelectedTable(null);
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    }
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragRef.current) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mouseX = (e.clientX - rect.left - pan.x) / zoom;
      const mouseY = (e.clientY - rect.top - pan.y) / zoom;
      const newX = mouseX - dragRef.current.offsetX;
      const newY = mouseY - dragRef.current.offsetY;
      setTables(prev =>
        prev.map(t =>
          t.id === dragRef.current!.tableId
            ? { ...t, position: { x: Math.max(0, newX), y: Math.max(0, newY) } }
            : t
        )
      );
    } else if (isPanning) {
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setPan({ x: panStart.current.panX + dx, y: panStart.current.panY + dy });
    }
  }, [pan, zoom, isPanning]);

  const handleMouseUp = useCallback(() => {
    dragRef.current = null;
    setIsPanning(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(2, Math.max(0.3, prev * delta)));
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const preventDefault = (e: WheelEvent) => e.preventDefault();
    el.addEventListener('wheel', preventDefault, { passive: false });
    return () => el.removeEventListener('wheel', preventDefault);
  }, []);

  const getTableCenter = (tableName: string): { x: number; y: number } | null => {
    const table = tables.find(t => t.name === tableName);
    if (!table) return null;
    return {
      x: table.position.x + 100,
      y: table.position.y + 20 + (table.columns.length * 12),
    };
  };

  const getColumnY = (tableName: string, colName: string): { x: number; y: number } | null => {
    const table = tables.find(t => t.name === tableName);
    if (!table) return null;
    const colIdx = table.columns.findIndex(c => c.name === colName);
    if (colIdx === -1) return null;
    return {
      x: table.position.x + 200,
      y: table.position.y + 36 + (colIdx * 28) + 14,
    };
  };

  const getColumnYLeft = (tableName: string, colName: string): { x: number; y: number } | null => {
    const table = tables.find(t => t.name === tableName);
    if (!table) return null;
    const colIdx = table.columns.findIndex(c => c.name === colName);
    if (colIdx === -1) return null;
    return {
      x: table.position.x,
      y: table.position.y + 36 + (colIdx * 28) + 14,
    };
  };

  return (
    <div className="designer-page">
      <div className="designer-toolbar">
        <h3>Schema Designer</h3>
        <div className="toolbar-actions">
          <span className="toolbar-info">{tables.length} tables &middot; {relations.length} relations</span>
          <button className="btn-tool" onClick={() => setZoom(1)}>Reset Zoom</button>
          <span className="zoom-label">{Math.round(zoom * 100)}%</span>
        </div>
      </div>
      <div
        ref={canvasRef}
        className={`designer-canvas ${isPanning ? 'panning' : ''}`}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div
          className="designer-canvas-inner"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
          }}
        >
          {/* Relation lines */}
          <svg className="relation-lines" viewBox="0 0 2000 2000">
            <defs>
              <marker id="rel-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="var(--brand-500)" />
              </marker>
            </defs>
            {relations.map(rel => {
              const from = getColumnY(rel.fromTable, rel.fromColumn);
              const to = getColumnYLeft(rel.toTable, rel.toColumn) || getTableCenter(rel.toTable);
              if (!from || !to) return null;
              const midX = (from.x + to.x) / 2;
              return (
                <g key={rel.id}>
                  <path
                    d={`M${from.x},${from.y} C${midX},${from.y} ${midX},${to.y} ${to.x},${to.y}`}
                    fill="none"
                    stroke="var(--brand-500)"
                    strokeWidth="1.5"
                    strokeDasharray={rel.fromTable === rel.toTable ? '4,4' : 'none'}
                    opacity="0.5"
                    markerEnd="url(#rel-arrow)"
                  />
                </g>
              );
            })}
          </svg>

          {/* Table boxes */}
          {tables.map(table => (
            <div
              key={table.id}
              className={`table-box ${selectedTable === table.id ? 'selected' : ''}`}
              style={{ left: table.position.x, top: table.position.y }}
              onMouseDown={e => handleMouseDown(e, table.id)}
            >
              <div className="table-header">
                <span className="table-icon">{'\u25A6'}</span>
                {table.name}
                <span className="table-count">{table.columns.length} cols</span>
              </div>
              <div className="table-columns">
                {table.columns.map(col => (
                  <div
                    key={col.id}
                    className={`table-col ${col.isPrimaryKey ? 'pk' : ''} ${col.isForeignKey ? 'fk' : ''}`}
                  >
                    <span className="col-name">{col.name}</span>
                    <span className="col-type">{col.type}</span>
                    <span className="col-badges">
                      {col.isPrimaryKey && <span className="badge badge-pk">PK</span>}
                      {col.isForeignKey && <span className="badge badge-fk">FK</span>}
                      {col.isUnique && !col.isPrimaryKey && <span className="badge badge-uq">UQ</span>}
                      {!col.nullable && <span className="badge badge-nn">NN</span>}
                    </span>
                  </div>
                ))}
              </div>
              {table.indexes.length > 0 && (
                <div className="table-indexes">
                  {table.indexes.map(idx => (
                    <div key={idx.id} className="table-index">
                      IDX: {idx.columns.join(', ')} {idx.unique ? '(unique)' : ''}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
