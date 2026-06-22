import { Badge, Avatar, PageHeader } from '../../components/ui';
import { TRAIN_BOOKINGS } from '../../data/mockData';
export default function Trains() {
  return (
    <div>
      <PageHeader title="Train Bookings" sub="542 tickets this month"/>
      <div className="grid-3">
        {[['542','Tickets','↑ +18%','#EFF6FF','🚂'],['₹8.4L','Revenue','↑ +14%','#ECFDF5','💰'],['98%','Success Rate','● Excellent','#F5F3FF','✅']].map(([v,l,c,bg,i]) => (
          <div key={l} className="stat-card"><div className="stat-icon" style={{background:bg}}>{i}</div><div className="stat-value">{v}</div><div className="stat-label">{l}</div><div className="stat-change up">{c}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>PNR</th><th>Passenger</th><th>Train</th><th>Route</th><th>Class</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>{TRAIN_BOOKINGS.map(t => (
              <tr key={t.id}>
                <td style={{color:'var(--brand)',fontWeight:700}}>{t.id}</td>
                <td><div className="user-row"><Avatar name={t.passenger}/><span style={{fontWeight:500}}>{t.passenger}</span></div></td>
                <td style={{fontWeight:600}}>{t.train}</td>
                <td style={{color:'var(--text-secondary)'}}>{t.route}</td>
                <td><span className="badge badge-info">{t.cls}</span></td>
                <td style={{fontWeight:700}}>{t.amount}</td>
                <td><Badge status={t.status}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
