import { Badge, Avatar, PageHeader } from '../../components/ui';
import { BIKE_RENTALS } from '../../data/mockData';
export default function Bikes() {
  return (
    <div>
      <PageHeader title="Bike Rentals" sub="312 rentals this month">
        <button className="btn btn-primary">+ Add Bike</button>
      </PageHeader>
      <div className="grid-3">
        {[['312','Rentals','↑ +28%','#ECFDF5','🚲'],['142','Active Bikes','18 in repair','#FFFBEB','⚙️'],['₹31K','Revenue','↑ +22%','#FFF0EB','💰']].map(([v,l,c,bg,i]) => (
          <div key={l} className="stat-card"><div className="stat-icon" style={{background:bg}}>{i}</div><div className="stat-value">{v}</div><div className="stat-label">{l}</div><div className="stat-change up">{c}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Rental ID</th><th>Customer</th><th>Bike Model</th><th>Duration</th><th>Amount</th><th>Zone</th><th>Status</th></tr></thead>
            <tbody>{BIKE_RENTALS.map(b => (
              <tr key={b.id}>
                <td style={{color:'var(--brand)',fontWeight:700}}>{b.id}</td>
                <td><div className="user-row"><Avatar name={b.customer}/><span style={{fontWeight:500}}>{b.customer}</span></div></td>
                <td style={{fontWeight:600}}>{b.bike}</td>
                <td>{b.duration}</td>
                <td style={{fontWeight:700}}>{b.amount}</td>
                <td style={{color:'var(--text-secondary)'}}>{b.zone}</td>
                <td><Badge status={b.status}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
