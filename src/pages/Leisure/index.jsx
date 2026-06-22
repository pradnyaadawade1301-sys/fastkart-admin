import { Badge, Avatar, PageHeader } from '../../components/ui';
import { LEISURE_BOOKINGS } from '../../data/mockData';
export default function Leisure() {
  return (
    <div>
      <PageHeader title="Leisure & Events" sub="156 bookings this month">
        <button className="btn btn-primary">+ Add Event</button>
      </PageHeader>
      <div className="grid-3">
        {[['156','Bookings','↑ +44%','#F5F3FF','🎭'],['₹42K','Revenue','↑ +38%','#ECFDF5','💰'],['28','Active Events','↑ +6 new','#FFF0EB','🎪']].map(([v,l,c,bg,i]) => (
          <div key={l} className="stat-card"><div className="stat-icon" style={{background:bg}}>{i}</div><div className="stat-value">{v}</div><div className="stat-label">{l}</div><div className="stat-change up">{c}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Booking ID</th><th>Customer</th><th>Event</th><th>Tickets</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>{LEISURE_BOOKINGS.map(b => (
              <tr key={b.id}>
                <td style={{color:'var(--brand)',fontWeight:700}}>{b.id}</td>
                <td><div className="user-row"><Avatar name={b.customer}/><span style={{fontWeight:500}}>{b.customer}</span></div></td>
                <td style={{fontWeight:600}}>{b.event}</td>
                <td style={{textAlign:'center',fontWeight:600}}>{b.tickets}</td>
                <td style={{fontWeight:700}}>{b.amount}</td>
                <td style={{fontSize:11.5,color:'var(--text-secondary)'}}>{b.date}</td>
                <td><Badge status={b.status}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
