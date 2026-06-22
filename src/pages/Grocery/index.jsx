import { Badge, Avatar, PageHeader } from '../../components/ui';
import { GROCERY_ORDERS } from '../../data/mockData';
const slotBadge = { '10am–12pm': 'badge-info', '2pm–4pm': 'badge-purple', '6pm–8pm': 'badge-gray', '8pm–10pm': 'badge-orange' };
export default function Grocery() {
  return (
    <div>
      <PageHeader title="Grocery Orders" sub="1,240 orders this month">
        <button className="btn btn-primary">+ Add Product</button>
      </PageHeader>
      <div className="grid-3">
        {[['1,240','Orders This Month','↑ +14%','#ECFDF5'],['₹2.8L','Revenue','↑ +18%','#FFF0EB'],['4,820','Products Listed','↑ +32 new','#EFF6FF']].map(([v,l,c,bg]) => (
          <div key={l} className="stat-card"><div className="stat-icon" style={{background:bg}}>🛒</div><div className="stat-value">{v}</div><div className="stat-label">{l}</div><div className="stat-change up">{c}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Delivery Slot</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{GROCERY_ORDERS.map(o => (
              <tr key={o.id}>
                <td style={{color:'var(--brand)',fontWeight:700}}>{o.id}</td>
                <td><div className="user-row"><Avatar name={o.customer}/><span style={{fontWeight:500}}>{o.customer}</span></div></td>
                <td>{o.items}</td>
                <td style={{fontWeight:700}}>{o.amount}</td>
                <td><span className={`badge ${slotBadge[o.slot]||'badge-gray'}`}>{o.slot}</span></td>
                <td><Badge status={o.status}/></td>
                <td><button className="btn btn-ghost btn-sm">👁 View</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
