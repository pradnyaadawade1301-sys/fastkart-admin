// src/pages/Orders/index.jsx
import { useState } from 'react';
import { Badge, Avatar, FilterTabs, PageHeader, Modal, useToast } from '../../components/ui';
import { FOOD_ORDERS } from '../../data/mockData';

const TABS = [
  { id: 'all', label: 'All Orders' },
  { id: 'placed', label: 'Placed' },
  { id: 'preparing', label: 'Preparing' },
  { id: 'out_for_delivery', label: 'On Way' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'cancelled', label: 'Cancelled' },
];

export default function Orders() {
  const toast = useToast();
  const [filter, setFilter] = useState('all');
  const [orders, setOrders] = useState(FOOD_ORDERS);
  const [selected, setSelected] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  function updateStatus() {
    setOrders((prev) => prev.map((o) => o.id === selected.id ? { ...o, status: newStatus } : o));
    toast('Order status updated successfully!');
    setSelected(null);
  }

  return (
    <div>
      <PageHeader title="Food Orders" sub={`${orders.length} total orders today`}>
        <button className="btn btn-outline">⬇ Export CSV</button>
        <button className="btn btn-primary">+ Manual Order</button>
      </PageHeader>

      <FilterTabs tabs={TABS} active={filter} onChange={setFilter} />

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th><th>Customer</th><th>Restaurant</th>
                <th>Items</th><th>Amount</th><th>Payment</th>
                <th>Status</th><th>Time</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id}>
                  <td><div style={{ fontWeight: 700, fontSize: 12, color: 'var(--brand)' }}>{o.id}</div></td>
                  <td><div className="user-row"><Avatar name={o.customer} /><span style={{ fontWeight: 500 }}>{o.customer}</span></div></td>
                  <td style={{ color: 'var(--text-secondary)' }}>{o.restaurant}</td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{o.items}</td>
                  <td style={{ fontWeight: 700, color: 'var(--brand-dark)' }}>{o.amount}</td>
                  <td><span className="badge badge-gray">{o.payment}</span></td>
                  <td><Badge status={o.status} /></td>
                  <td style={{ fontSize: 11, color: 'var(--text-muted)' }}>{o.time}</td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setSelected(o); setNewStatus(o.status); }}>
                      👁 View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <Modal
          title={`Order ${selected.id}`}
          onClose={() => setSelected(null)}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={updateStatus}>Update Status</button>
            </>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
            {[['Customer', selected.customer], ['Restaurant', selected.restaurant], ['Amount', selected.amount], ['Payment', selected.payment], ['Items', selected.items + ' items'], ['Time', selected.time]].map(([k, v]) => (
              <div key={k} style={{ background: 'var(--bg)', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '.04em' }}>{k}</div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{v}</div>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label className="form-label">Update Order Status</label>
            <select className="form-input" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              {['placed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'].map((s) => (
                <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</option>
              ))}
            </select>
          </div>
        </Modal>
      )}
    </div>
  );
}
