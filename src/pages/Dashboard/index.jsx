// src/pages/Dashboard/index.jsx
import { StatCard, Badge, Avatar } from '../../components/ui';
import { STATS, FEATURE_REVENUE, ACTIVITY, FEATURE_STATUS, FOOD_ORDERS } from '../../data/mockData';

export default function Dashboard({ onNav }) {
  return (
    <div>
      <div className="grid-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid-3-1">
        {/* Revenue Bar Chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📈 Revenue by Feature</span>
            <select className="form-select-sm">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="card-body">
            <div className="bar-chart">
              {FEATURE_REVENUE.map((f) => (
                <div key={f.name} className="bar-item" style={{ height: f.height, background: f.color }}>
                  <span className="bar-label">{f.name}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
              {FEATURE_REVENUE.map((f) => (
                <span key={f.name} style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: f.color, display: 'inline-block' }} />
                  {f.name} ₹{(f.value / 1000).toFixed(0)}K
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Status */}
        <div className="card">
          <div className="card-header"><span className="card-title">⚡ Feature Status</span></div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            {FEATURE_STATUS.map((f) => (
              <div key={f.name} className="mini-stat">
                <span style={{ fontSize: 12.5 }}>{f.name}</span>
                {f.status === 'live'
                  ? <span className="badge badge-success">● Live</span>
                  : <span className="badge badge-warning">⚠ Partial</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Recent Orders */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🛍️ Recent Food Orders</span>
            <button className="btn btn-outline btn-sm" onClick={() => onNav('orders')}>View All →</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {FOOD_ORDERS.slice(0, 5).map((o) => (
                  <tr key={o.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: 11.5, color: 'var(--brand)' }}>{o.id}</div>
                      <div className="td-sub">{o.time}</div>
                    </td>
                    <td>
                      <div className="user-row">
                        <Avatar name={o.customer} />
                        <span style={{ fontWeight: 500 }}>{o.customer}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700 }}>{o.amount}</td>
                    <td><Badge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🔔 Live Activity</span>
            <span className="badge badge-success" style={{ fontSize: 10 }}>● Live</span>
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} className="activity-item">
                <div className="activity-icon" style={{ background: a.bg }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500 }}>{a.text}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
