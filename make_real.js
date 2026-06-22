const fs = require('fs');

// Restaurants page with real API
const restaurants = `import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, Avatar, PageHeader, FilterTabs, useToast } from '../../components/ui';

const TABS = [{id:'all',label:'All'},{id:'active',label:'Active'},{id:'inactive',label:'Inactive'}];
const API = 'http://localhost:8080/api';

export default function Restaurants() {
  const toast = useToast();
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API + '/restaurants')
      .then(r => setList(r.data.data || r.data || []))
      .catch(() => toast('Could not load restaurants'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? list : list.filter(r => r.status === filter);

  return (
    <div>
      <PageHeader title="Restaurants" sub={list.length + ' registered partners'}>
        <FilterTabs tabs={TABS} active={filter} onChange={setFilter} />
      </PageHeader>
      {loading ? <div style={{textAlign:'center',padding:48}}>Loading...</div> : (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Restaurant</th><th>Category</th><th>City</th><th>Rating</th><th>Status</th></tr></thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} style={{textAlign:'center',padding:32,color:'var(--text-muted)'}}>No restaurants found</td></tr>
                ) : filtered.map(r => (
                  <tr key={r.id}>
                    <td><div className="user-row"><Avatar name={r.name} /><div className="td-bold">{r.name}</div></div></td>
                    <td><span className="badge badge-orange">{r.category || 'Restaurant'}</span></td>
                    <td style={{color:'var(--text-secondary)'}}>{r.city || '-'}</td>
                    <td style={{fontWeight:700,color:'var(--warning)'}}>⭐ {r.rating || 'N/A'}</td>
                    <td><Badge status={r.status || 'active'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}`;

// Orders page with real API
const orders = `import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, Avatar, PageHeader, FilterTabs, useToast } from '../../components/ui';

const TABS = [{id:'all',label:'All'},{id:'placed',label:'Placed'},{id:'preparing',label:'Preparing'},{id:'out_for_delivery',label:'On Way'},{id:'delivered',label:'Delivered'},{id:'cancelled',label:'Cancelled'}];
const API = 'http://localhost:8080/api';
const token = () => localStorage.getItem('fk_token') || '';

export default function Orders() {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API + '/orders', { headers: { Authorization: 'Bearer ' + token() } })
      .then(r => setOrders(r.data.orders || r.data.data || []))
      .catch(() => toast('Could not load orders'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div>
      <PageHeader title="Food Orders" sub={orders.length + ' total orders'}>
        <button className="btn btn-outline">Export CSV</button>
      </PageHeader>
      <FilterTabs tabs={TABS} active={filter} onChange={setFilter} />
      {loading ? <div style={{textAlign:'center',padding:48}}>Loading...</div> : (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Order ID</th><th>Customer</th><th>Restaurant</th><th>Amount</th><th>Status</th><th>Time</th></tr></thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} style={{textAlign:'center',padding:32,color:'var(--text-muted)'}}>No orders found</td></tr>
                ) : filtered.map(o => (
                  <tr key={o.id}>
                    <td style={{color:'var(--brand)',fontWeight:700,fontSize:12}}>{o.id ? o.id.slice(0,8).toUpperCase() : '-'}</td>
                    <td><div className="user-row"><Avatar name={o.customer_name || 'User'} /><span>{o.customer_name || 'User'}</span></div></td>
                    <td style={{color:'var(--text-secondary)'}}>{o.restaurant_name || '-'}</td>
                    <td style={{fontWeight:700}}>Rs. {o.total || o.amount || 0}</td>
                    <td><Badge status={o.status || 'placed'} /></td>
                    <td style={{fontSize:11,color:'var(--text-muted)'}}>{o.created_at ? new Date(o.created_at).toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}`;

// Notifications page with real API
const notifications = `import { useState, useEffect } from 'react';
import axios from 'axios';
import { PageHeader, useToast } from '../../components/ui';

const API = 'http://localhost:8080/api';
const token = () => localStorage.getItem('fk_token') || '';
const TYPE = { info:{bg:'#EFF6FF',icon:'INFO'}, warning:{bg:'#FFFBEB',icon:'WARN'}, danger:{bg:'#FEF2F2',icon:'ALERT'}, success:{bg:'#ECFDF5',icon:'OK'} };

export default function Notifications() {
  const toast = useToast();
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API + '/notifications', { headers: { Authorization: 'Bearer ' + token() } })
      .then(r => setNotifs(r.data.notifications || []))
      .catch(() => toast('Could not load notifications'))
      .finally(() => setLoading(false));
  }, []);

  const unread = notifs.filter(n => !n.is_read).length;

  function markAll() {
    setNotifs(p => p.map(n => ({...n, is_read: true})));
    toast('All marked as read!');
  }

  return (
    <div>
      <PageHeader title="Notifications" sub={unread + ' unread'}>
        {unread > 0 && <button className="btn btn-outline" onClick={markAll}>Mark All Read</button>}
      </PageHeader>
      {loading ? <div style={{textAlign:'center',padding:48}}>Loading...</div> : (
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {notifs.length === 0 ? (
            <div style={{textAlign:'center',padding:48,color:'var(--text-muted)'}}>No notifications</div>
          ) : notifs.map(n => {
            const ts = TYPE[n.type] || TYPE.info;
            return (
              <div key={n.id} className="notif-card" style={{opacity: n.is_read ? 0.6 : 1}}>
                <div className="notif-inner">
                  <div className="notif-icon" style={{background:ts.bg,fontSize:11,fontWeight:700,color:'#666'}}>{ts.icon}</div>
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
}`;

// Offers page with real API  
const offers = `import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, PageHeader, useToast } from '../../components/ui';

const API = 'http://localhost:8080/api';
const token = () => localStorage.getItem('fk_token') || '';

export default function Offers() {
  const toast = useToast();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API + '/offers', { headers: { Authorization: 'Bearer ' + token() } })
      .then(r => setOffers(r.data.offers || []))
      .catch(() => toast('Could not load offers'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Offers and Coupons" sub={offers.length + ' coupons'} />
      {loading ? <div style={{textAlign:'center',padding:48}}>Loading...</div> : (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Code</th><th>Discount Type</th><th>Discount Value</th><th>Min Order</th><th>Status</th><th>Expires</th></tr></thead>
              <tbody>
                {offers.length === 0 ? (
                  <tr><td colSpan={6} style={{textAlign:'center',padding:32,color:'var(--text-muted)'}}>No offers found</td></tr>
                ) : offers.map(o => (
                  <tr key={o.id}>
                    <td><code>{o.code}</code></td>
                    <td><Badge status={o.discount_type || 'flat'} /></td>
                    <td style={{fontWeight:700,color:'var(--success)'}}>{o.discount_type === 'percent' ? o.discount_value + '%' : 'Rs. ' + o.discount_value}</td>
                    <td>Rs. {o.min_order || 0}</td>
                    <td><Badge status={o.is_active ? 'active' : 'inactive'} /></td>
                    <td style={{fontSize:11.5,color:'var(--text-secondary)'}}>{o.expires_at ? new Date(o.expires_at).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}`;

fs.writeFileSync('src/pages/Restaurants/index.jsx', restaurants, 'utf8');
fs.writeFileSync('src/pages/Orders/index.jsx', orders, 'utf8');
fs.writeFileSync('src/pages/Notifications/index.jsx', notifications, 'utf8');
fs.writeFileSync('src/pages/Offers/index.jsx', offers, 'utf8');
console.log('All pages updated with real API!');