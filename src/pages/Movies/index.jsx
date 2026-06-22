import { useState } from 'react';
import { Badge, Avatar, PageHeader, FilterTabs } from '../../components/ui';
import { MOVIE_BOOKINGS } from '../../data/mockData';
const TABS = [{id:'all',label:'All'},{id:'confirmed',label:'Confirmed'},{id:'pending',label:'Pending'},{id:'cancelled',label:'Cancelled'}];
export default function Movies() {
  const [filter, setFilter] = useState('all');
  const data = filter === 'all' ? MOVIE_BOOKINGS : MOVIE_BOOKINGS.filter(b => b.status === filter);
  return (
    <div>
      <PageHeader title="Movie Bookings" sub="892 tickets this month">
        <button className="btn btn-primary">+ Add Show</button>
      </PageHeader>
      <div className="grid-4">
        {[['892','Tickets Sold','↑ +21%','#EFF6FF','🎬'],['₹1.4L','Revenue','↑ +19%','#ECFDF5','💰'],['42','Cinemas','↑ +3 new','#FFF0EB','🏟️'],['72%','Avg Occupancy','→ Stable','#F5F3FF','📊']].map(([v,l,c,bg,i]) => (
          <div key={l} className="stat-card"><div className="stat-icon" style={{background:bg}}>{i}</div><div className="stat-value">{v}</div><div className="stat-label">{l}</div><div className="stat-change up">{c}</div></div>
        ))}
      </div>
      <FilterTabs tabs={TABS} active={filter} onChange={setFilter}/>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Booking ID</th><th>Customer</th><th>Movie</th><th>Cinema</th><th>Seats</th><th>Amount</th><th>Show Time</th><th>Status</th></tr></thead>
            <tbody>{data.map(b => (
              <tr key={b.id}>
                <td style={{color:'var(--brand)',fontWeight:700}}>{b.id}</td>
                <td><div className="user-row"><Avatar name={b.customer}/><span style={{fontWeight:500}}>{b.customer}</span></div></td>
                <td style={{fontWeight:600}}>{b.movie}</td>
                <td style={{color:'var(--text-secondary)'}}>{b.cinema}</td>
                <td style={{textAlign:'center',fontWeight:600}}>{b.seats}</td>
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
