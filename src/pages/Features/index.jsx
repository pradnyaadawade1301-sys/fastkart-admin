// src/pages/Features/index.jsx
import { FEATURES } from '../../data/mockData';

const QUICK_STATS = [
  { icon: '🍕', label: 'Food — Today',   items: [['Orders placed','142'],['Revenue','₹71,200'],['Avg delivery time','28 min'],['Cancellations','8']] },
  { icon: '🎬', label: 'Movies — Today', items: [['Tickets sold','341'],['Revenue','₹34,100'],['Shows today','24'],['Avg occupancy','72%']] },
  { icon: '🏨', label: 'Hotels — Today', items: [['Check-ins','18'],['Revenue','₹89,400'],['Avg stay','2.3 nights'],['Cancellations','2']] },
];

export default function Features({ onNav }) {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div className="page-title">All Features</div>
        <div className="page-sub">Click any feature card to manage it</div>
      </div>

      <div className="feature-grid">
        {FEATURES.map((f) => (
          <div key={f.id} className="feature-card" onClick={() => onNav(f.id)}>
            <span
              className="feature-dot"
              style={{ background: f.status === 'live' ? 'var(--success)' : 'var(--warning)' }}
            />
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-name">{f.name}</div>
            <div className="feature-count">{f.count}</div>
          </div>
        ))}
      </div>

      <div className="grid-3">
        {QUICK_STATS.map((s) => (
          <div key={s.label} className="card">
            <div className="card-header"><span className="card-title">{s.icon} {s.label}</span></div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              {s.items.map(([k, v]) => (
                <div key={k} className="mini-stat">
                  <span>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
