import { Badge, Avatar, PageHeader } from '../../components/ui';
import { RIDE_BOOKINGS } from '../../data/mockData';
const typeBadge = { Mini:'badge-orange', Prime:'badge-purple', Auto:'badge-gray' };
export default function Rides() {
  return (
    <div>
      <PageHeader title="Rides & Cabs" sub="678 rides this month">
        <span className="badge badge-warning">⚠ Backend Partial</span>
      </PageHeader>
      <div className="grid-4">
        {[['678','Total Rides','↑ +8%','#FFF0EB','🚕'],['₹76K','Revenue','↑ +12%','#ECFDF5','💰'],['84','Active Drivers','12 offline','#EFF6FF','🚗'],['4.6','Avg Rating','● Good','#F5F3FF','⭐']].map(([v,l,c,bg,i]) => (
          <div key={l} className="stat-card"><div className="stat-icon" style={{background:bg}}>{i}</div><div className="stat-value">{v}</div><div className="stat-label">{l}</div><div className="stat-change up">{c}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Ride ID</th><th>Customer</th><th>Driver</th><th>Route</th><th>Fare</th><th>Type</th><th>Status</th></tr></thead>
            <tbody>{RIDE_BOOKINGS.map(r => (
              <tr key={r.id}>
                <td style={{color:'var(--brand)',fontWeight:700}}>{r.id}</td>
                <td><div className="user-row"><Avatar name={r.customer}/><span style={{fontWeight:500}}>{r.customer}</span></div></td>
                <td style={{color:'var(--text-secondary)'}}>{r.driver}</td>
                <td style={{fontWeight:500}}>{r.route}</td>
                <td style={{fontWeight:700}}>{r.fare}</td>
                <td><span className={`badge ${typeBadge[r.type]||'badge-gray'}`}>{r.type}</span></td>
                <td><Badge status={r.status}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
