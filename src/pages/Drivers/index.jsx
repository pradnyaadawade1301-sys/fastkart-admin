import { Badge, Avatar, PageHeader, useToast } from '../../components/ui';
import { DRIVERS } from '../../data/mockData';
export default function Drivers() {
  const toast = useToast();
  return (
    <div>
      <PageHeader title="Drivers" sub={`${DRIVERS.length} registered drivers`}>
        <button className="btn btn-primary">+ Add Driver</button>
      </PageHeader>
      <div className="grid-4">
        {[['84','Active Now','12 on trip','#ECFDF5','🚗'],['12','Offline Today','High today','#FFFBEB','😴'],['4.6','Avg Rating','● Good','#F5F3FF','⭐'],['₹2.4L','Driver Payouts','This month','#EFF6FF','💰']].map(([v,l,c,bg,i]) => (
          <div key={l} className="stat-card"><div className="stat-icon" style={{background:bg}}>{i}</div><div className="stat-value">{v}</div><div className="stat-label">{l}</div><div className="stat-change up">{c}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Driver</th><th>Phone</th><th>Vehicle No.</th><th>Trips</th><th>Rating</th><th>Earnings</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{DRIVERS.map(d => (
              <tr key={d.id}>
                <td><div className="user-row"><Avatar name={d.name}/><div className="td-bold">{d.name}</div></div></td>
                <td style={{color:'var(--text-secondary)',fontSize:11.5}}>{d.phone}</td>
                <td style={{fontFamily:'monospace',fontSize:12}}>{d.vehicle}</td>
                <td style={{fontWeight:600,textAlign:'center'}}>{d.trips}</td>
                <td style={{fontWeight:700,color:'var(--warning)'}}>⭐ {d.rating}</td>
                <td style={{fontWeight:700,color:'var(--success)'}}>{d.earnings}</td>
                <td><Badge status={d.status}/></td>
                <td><button className="btn btn-outline btn-sm" onClick={() => toast('Driver details!')}>View</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
