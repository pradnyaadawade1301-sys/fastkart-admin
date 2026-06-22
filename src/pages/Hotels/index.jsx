import { useState } from 'react';
import { Badge, Avatar, PageHeader, FilterTabs } from '../../components/ui';
import { HOTEL_BOOKINGS } from '../../data/mockData';
const TABS = [{id:'all',label:'All'},{id:'confirmed',label:'Confirmed'},{id:'pending',label:'Pending'},{id:'cancelled',label:'Cancelled'}];
export default function Hotels() {
  const [filter, setFilter] = useState('all');
  const data = filter === 'all' ? HOTEL_BOOKINGS : HOTEL_BOOKINGS.filter(b => b.status === filter);
  return (
    <div>
      <PageHeader title="Hotel Bookings" sub="431 bookings this month">
        <button className="btn btn-primary">+ Add Hotel</button>
      </PageHeader>
      <div className="grid-3">
        {[['431','Bookings','↑ +11%','#EFF6FF','🏨'],['₹98K','Revenue','↑ +16%','#ECFDF5','💰'],['68','Hotels Listed','↑ +4 new','#FFF0EB','🏢']].map(([v,l,c,bg,i]) => (
          <div key={l} className="stat-card"><div className="stat-icon" style={{background:bg}}>{i}</div><div className="stat-value">{v}</div><div className="stat-label">{l}</div><div className="stat-change up">{c}</div></div>
        ))}
      </div>
      <FilterTabs tabs={TABS} active={filter} onChange={setFilter}/>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Booking ID</th><th>Guest</th><th>Hotel</th><th>City</th><th>Nights</th><th>Amount</th><th>Check-In</th><th>Status</th></tr></thead>
            <tbody>{data.map(b => (
              <tr key={b.id}>
                <td style={{color:'var(--brand)',fontWeight:700}}>{b.id}</td>
                <td><div className="user-row"><Avatar name={b.guest}/><span style={{fontWeight:500}}>{b.guest}</span></div></td>
                <td style={{fontWeight:600}}>{b.hotel}</td>
                <td style={{color:'var(--text-secondary)'}}>{b.city}</td>
                <td style={{textAlign:'center',fontWeight:600}}>{b.nights}</td>
                <td style={{fontWeight:700}}>{b.amount}</td>
                <td style={{fontSize:11.5,color:'var(--text-secondary)'}}>{b.checkIn}</td>
                <td><Badge status={b.status}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
