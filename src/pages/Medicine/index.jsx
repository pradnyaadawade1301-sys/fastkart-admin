import { Badge, Avatar, PageHeader } from '../../components/ui';
import { MEDICINE_ORDERS } from '../../data/mockData';
const rxBadge = { uploaded:'badge-success', required:'badge-danger', otc:'badge-gray' };
export default function Medicine() {
  return (
    <div>
      <PageHeader title="Medicine Orders" sub="287 orders this month">
        <button className="btn btn-primary">+ Add Pharmacy</button>
      </PageHeader>
      <div className="grid-4">
        {[['287','Orders','↑ +32%','#ECFDF5','💊'],['₹1.8L','Revenue','↑ +28%','#FFF0EB','💰'],['24','Partner Pharmacies','↑ +2','#EFF6FF','🏥'],['38 min','Avg Delivery','Target: 30 min','#FFFBEB','⏱️']].map(([v,l,c,bg,i]) => (
          <div key={l} className="stat-card"><div className="stat-icon" style={{background:bg}}>{i}</div><div className="stat-value">{v}</div><div className="stat-label">{l}</div><div className="stat-change up">{c}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order</th><th>Customer</th><th>Pharmacy</th><th>Items</th><th>Prescription</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>{MEDICINE_ORDERS.map(o => (
              <tr key={o.id}>
                <td style={{color:'var(--brand)',fontWeight:700}}>{o.id}</td>
                <td><div className="user-row"><Avatar name={o.customer}/><span style={{fontWeight:500}}>{o.customer}</span></div></td>
                <td style={{color:'var(--text-secondary)'}}>{o.pharmacy}</td>
                <td style={{textAlign:'center',fontWeight:600}}>{o.items}</td>
                <td><span className={`badge ${rxBadge[o.prescription]||'badge-gray'}`}>{o.prescription}</span></td>
                <td style={{fontWeight:700}}>{o.amount}</td>
                <td><Badge status={o.status}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
