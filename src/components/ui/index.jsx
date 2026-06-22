// src/components/ui/index.jsx
import { useState, useEffect, useContext, createContext, useCallback } from 'react';

// ─── Toast Context ────────────────────────────────────────────────────────────
const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null);
  const show = useCallback((m) => setMsg(m), []);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 2800);
    return () => clearTimeout(t);
  }, [msg]);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      {msg && (
        <div className="toast">
          <span>✓</span> {msg}
        </div>
      )}
    </ToastCtx.Provider>
  );
}
export const useToast = () => useContext(ToastCtx);

// ─── Badge ────────────────────────────────────────────────────────────────────
const STATUS_MAP = {
  delivered:        ['badge-success', '✓ Delivered'],
  confirmed:        ['badge-success', '✓ Confirmed'],
  completed:        ['badge-success', '✓ Completed'],
  returned:         ['badge-success', '✓ Returned'],
  success:          ['badge-success', '✓ Success'],
  live:             ['badge-success', '● Live'],
  active:           ['badge-success', '● Active'],
  available:        ['badge-success', '● Available'],
  preparing:        ['badge-warning', '⏳ Preparing'],
  packing:          ['badge-warning', '⏳ Packing'],
  pending:          ['badge-warning', '⏳ Pending'],
  pending_rx:       ['badge-warning', '📋 Pending Rx'],
  processing:       ['badge-warning', '⟳ Processing'],
  waitlist:         ['badge-warning', '⏳ Waitlist'],
  partial:          ['badge-warning', '⚠ Partial'],
  on_way:           ['badge-info',    '🛵 On Way'],
  out_for_delivery: ['badge-info',    '🛵 On Way'],
  on_trip:          ['badge-info',    '🚕 On Trip'],
  searching:        ['badge-warning', '🔍 Searching'],
  placed:           ['badge-purple',  '📋 Placed'],
  overdue:          ['badge-danger',  '⚠ Overdue'],
  cancelled:        ['badge-danger',  '✗ Cancelled'],
  inactive:         ['badge-gray',    '● Inactive'],
  offline:          ['badge-gray',    '● Offline'],
  blocked:          ['badge-danger',  '⊘ Blocked'],
  expired:          ['badge-gray',    'Expired'],
  uploaded:         ['badge-success', '✓ Uploaded'],
  required:         ['badge-danger',  '⚠ Required'],
  otc:              ['badge-gray',    'OTC'],
  percent:          ['badge-info',    'Percent %'],
  flat:             ['badge-purple',  'Flat ₹'],
};

export function Badge({ status }) {
  const [cls, label] = STATUS_MAP[status] || ['badge-gray', status];
  return <span className={`badge ${cls}`}>{label}</span>;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ name, size = 30 }) {
  const initials = (name || '?').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.37 }}>
      {initials}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export function Modal({ title, onClose, footer, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
export function StatCard({ icon, label, value, change, up, iconBg }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: iconBg }}>{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className={`stat-change ${up ? 'up' : 'down'}`}>
        {up ? '↑' : '↓'} {change} this month
      </div>
    </div>
  );
}

// ─── FilterTabs ───────────────────────────────────────────────────────────────
export function FilterTabs({ tabs, active, onChange }) {
  return (
    <div className="filter-tabs">
      {tabs.map((t) => (
        <div
          key={t.id}
          className={`filter-tab ${active === t.id ? 'active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </div>
      ))}
    </div>
  );
}

// ─── PageHeader ───────────────────────────────────────────────────────────────
export function PageHeader({ title, sub, children }) {
  return (
    <div className="page-header">
      <div>
        <div className="page-title">{title}</div>
        {sub && <div className="page-sub">{sub}</div>}
      </div>
      {children && <div className="page-actions">{children}</div>}
    </div>
  );
}

// ─── FormField ────────────────────────────────────────────────────────────────
export function FormField({ label, type = 'text', placeholder, value, onChange, defaultValue }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        className="form-input"
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
export function EmptyState({ icon = '📭', text, sub }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 20px' }}>
      <div style={{ fontSize: 44, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: 14 }}>{text}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}
