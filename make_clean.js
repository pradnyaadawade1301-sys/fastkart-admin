const fs = require('fs');

const empty = (title, sub, icon) => `import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, Avatar, PageHeader, useToast } from '../../components/ui';
const API = 'https://fastkart-gt44.onrender.com/api';
const token = () => localStorage.getItem('fk_token') || '';
export default function Page() {
  const toast = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <PageHeader title="${title}" sub="${sub}"/>
      <div className="card">
        <div style={{textAlign:'center',padding:64,color:'var(--text-muted)'}}>
          <div style={{fontSize:48,marginBottom:16}}>${icon}</div>
          <div style={{fontSize:16,fontWeight:600,color:'var(--text-secondary)',marginBottom:8}}>No ${title} Yet</div>
          <div style={{fontSize:13}}>Data will appear here when customers use the app</div>
        </div>
      </div>
    </div>
  );
}`;

// Pages with no backend yet - show empty state
fs.writeFileSync('src/pages/Grocery/index.jsx', empty('Grocery Orders','Real orders from app','🛒'), 'utf8');
fs.writeFileSync('src/pages/Movies/index.jsx', empty('Movie Bookings','Real bookings from app','🎬'), 'utf8');
fs.writeFileSync('src/pages/Hotels/index.jsx', empty('Hotel Bookings','Real bookings from app','🏨'), 'utf8');
fs.writeFileSync('src/pages/Rides/index.jsx', empty('Rides & Cabs','Real rides from app','🚕'), 'utf8');
fs.writeFileSync('src/pages/Bikes/index.jsx', empty('Bike Rentals','Real rentals from app','🚲'), 'utf8');
fs.writeFileSync('src/pages/Travel/index.jsx', empty('Flight Bookings','Real bookings from app','✈️'), 'utf8');
fs.writeFileSync('src/pages/Trains/index.jsx', empty('Train Bookings','Real tickets from app','🚂'), 'utf8');
fs.writeFileSync('src/pages/Medicine/index.jsx', empty('Medicine Orders','Real orders from app','💊'), 'utf8');
fs.writeFileSync('src/pages/Leisure/index.jsx', empty('Leisure & Events','Real bookings from app','🎭'), 'utf8');
fs.writeFileSync('src/pages/Drivers/index.jsx', empty('Drivers','Registered drivers','🚗'), 'utf8');
fs.writeFileSync('src/pages/Wallet/index.jsx', empty('Wallet & Payments','Real transactions from app','💳'), 'utf8');
fs.writeFileSync('src/pages/Chat/index.jsx', empty('Support Chat','Customer support tickets','💬'), 'utf8');

// Users - real from API
fs.writeFileSync('src/pages/Users/index.jsx', `import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, Avatar, PageHeader, FilterTabs, useToast } from '../../components/ui';
const TABS = [{id:'all',label:'All Users'},{id:'active',label:'Active'},{id:'blocked',label:'Blocked'}];
const token = () => localStorage.getItem('fk_token') || '';
export default function Users() {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('https://fastkart-gt44.onrender.com/api/me', {headers:{Authorization:'Bearer '+token()}})
      .then(r => {
        const user = r.data.data || r.data;
        if(user && user.id) setUsers([user]);
      })
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <PageHeader title="Users" sub={users.length + ' registered customers'}/>
      {loading ? <div style={{textAlign:'center',padding:48}}>Loading...</div> : (
        <div className="card">
          {users.length === 0 ? (
            <div style={{textAlign:'center',padding:64,color:'var(--text-muted)'}}>
              <div style={{fontSize:48,marginBottom:16}}>👥</div>
              <div style={{fontSize:16,fontWeight:600,color:'var(--text-secondary)',marginBottom:8}}>No Users Yet</div>
              <div style={{fontSize:13}}>Users will appear here when they register on the app</div>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>User</th><th>Phone</th><th>Status</th></tr></thead>
                <tbody>{users.map(u => (
                  <tr key={u.id}>
                    <td><div className="user-row"><Avatar name={u.name||'User'}/><div><div className="td-bold">{u.name||'User'}</div><div className="td-sub">{u.email||''}</div></div></div></td>
                    <td>{u.phone||'-'}</td>
                    <td><Badge status="active"/></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}`, 'utf8');

// Notifications - real from API
fs.writeFileSync('src/pages/Notifications/index.jsx', `import { useState, useEffect } from 'react';
import axios from 'axios';
import { PageHeader, useToast } from '../../components/ui';
const token = () => localStorage.getItem('fk_token') || '';
const TYPE = { info:{bg:'#EFF6FF',icon:'ℹ️'}, warning:{bg:'#FFFBEB',icon:'⚠️'}, danger:{bg:'#FEF2F2',icon:'🚨'}, success:{bg:'#ECFDF5',icon:'✅'} };
export default function Notifications() {
  const toast = useToast();
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('https://fastkart-gt44.onrender.com/api/notifications', {headers:{Authorization:'Bearer '+token()}})
      .then(r => setNotifs(r.data.notifications || []))
      .catch(() => setNotifs([]))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <PageHeader title="Notifications" sub={notifs.filter(n=>!n.is_read).length + ' unread'}/>
      {loading ? <div style={{textAlign:'center',padding:48}}>Loading...</div> : notifs.length === 0 ? (
        <div className="card"><div style={{textAlign:'center',padding:64,color:'var(--text-muted)'}}>
          <div style={{fontSize:48,marginBottom:16}}>🔔</div>
          <div style={{fontSize:16,fontWeight:600,color:'var(--text-secondary)'}}>No Notifications</div>
        </div></div>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {notifs.map(n => {
            const ts = TYPE[n.type] || TYPE.info;
            return (
              <div key={n.id} className="notif-card" style={{opacity:n.is_read?0.6:1}}>
                <div className="notif-inner">
                  <div className="notif-icon" style={{background:ts.bg}}>{ts.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:13.5}}>{n.title}</div>
                    <div style={{fontSize:12.5,color:'var(--text-secondary)',marginTop:4}}>{n.body}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}`, 'utf8');

// Offers - real from API
fs.writeFileSync('src/pages/Offers/index.jsx', `import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, PageHeader, useToast } from '../../components/ui';
const token = () => localStorage.getItem('fk_token') || '';
export default function Offers() {
  const toast = useToast();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('https://fastkart-gt44.onrender.com/api/offers', {headers:{Authorization:'Bearer '+token()}})
      .then(r => setOffers(r.data.offers || []))
      .catch(() => setOffers([]))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <PageHeader title="Offers & Coupons" sub={offers.length + ' active coupons'}/>
      {loading ? <div style={{textAlign:'center',padding:48}}>Loading...</div> : offers.length === 0 ? (
        <div className="card"><div style={{textAlign:'center',padding:64,color:'var(--text-muted)'}}>
          <div style={{fontSize:48,marginBottom:16}}>🎟️</div>
          <div style={{fontSize:16,fontWeight:600,color:'var(--text-secondary)'}}>No Offers Yet</div>
          <div style={{fontSize:13,marginTop:8}}>Add coupons from the database to display here</div>
        </div></div>
      ) : (
        <div className="card"><div className="table-wrap"><table>
          <thead><tr><th>Code</th><th>Type</th><th>Value</th><th>Min Order</th><th>Status</th><th>Expires</th></tr></thead>
          <tbody>{offers.map(o => (
            <tr key={o.id}>
              <td><code>{o.code}</code></td>
              <td><Badge status={o.discount_type||'flat'}/></td>
              <td style={{fontWeight:700,color:'var(--success)'}}>{o.discount_type==='percent'?o.discount_value+'%':'Rs.'+o.discount_value}</td>
              <td>Rs. {o.min_order||0}</td>
              <td><Badge status={o.is_active?'active':'inactive'}/></td>
              <td style={{fontSize:11.5,color:'var(--text-secondary)'}}>{o.expires_at?new Date(o.expires_at).toLocaleDateString():'-'}</td>
            </tr>
          ))}</tbody>
        </table></div></div>
      )}
    </div>
  );
}`, 'utf8');

console.log('All pages cleaned! No more fake data.');