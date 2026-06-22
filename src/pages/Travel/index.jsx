import { Badge, Avatar, PageHeader } from '../../components/ui';
import { FLIGHT_BOOKINGS } from '../../data/mockData';
export default function Travel() {
  return (
    <div>
      <PageHeader title="Flight Bookings" sub="198 bookings this month">
        <span className="badge badge-warning">⚠ Backend Partial</span>
      </PageHeader>
      <div className="grid-3">
        {[['198','Bookings','↑ +6%','#EFF6FF','✈️'],['₹12.4L','Revenue','↑ +9%','#ECFDF5','💰'],['24','Partner Airlines','↑ +2','#FFF0EB','🛫']].map(([v,l,c,bg,i]) => (
          <div key={l} className="stat-card"><div className="stat-icon" style={{background:bg}}>{i}</div><div className="stat-value">{v}</div><div className="stat-label">{l}</div><div className="stat-change up">{c}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>PNR</th><th>Passenger</th><th>Route</th><th>Airline</th><th>Seats</th><th>Amount</th><th>Travel Date</th><th>Status</th></tr></thead>
            <tbody>{FLIGHT_BOOKINGS.map(f => (
              <tr key={f.id}>
                <td style={{color:'var(--brand)',fontWeight:700}}>{f.id}</td>
                <td><div className="user-row"><Avatar name={f.passenger}/><span style={{fontWeight:500}}>{f.passenger}</span></div></td>
                <td style={{fontWeight:600}}>{f.route}</td>
                <td style={{color:'var(--text-secondary)'}}>{f.airline}</td>
                <td style={{textAlign:'center',fontWeight:600}}>{f.seats}</td>
                <td style={{fontWeight:700}}>{f.amount}</td>
                <td style={{fontSize:11.5,color:'var(--text-secondary)'}}>{f.date}</td>
                <td><Badge status={f.status}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
