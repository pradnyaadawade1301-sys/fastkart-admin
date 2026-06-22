const fs = require('fs');
const API = 'https://fastkart-gt44.onrender.com/api';

const restaurants = `import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, Avatar, PageHeader, FilterTabs, useToast } from '../../components/ui';
const TABS = [{id:'all',label:'All'},{id:'active',label:'Active'},{id:'inactive',label:'Inactive'}];
export default function Restaurants() {
  const toast = useToast();
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('https://fastkart-gt44.onrender.com/api/restaurants')
      .then(r => setList(r.data.data || []))
      .catch(() => toast('Could not load restaurants'))
      .finally(() => setLoading(false));
  }, []);
  const filtered = filter === 'all' ? list : list.filter(r => r.status === filter);
  return (
    <div>
      <PageHeader title="Restaurants" sub={list.length + ' registered partners'}>
        <FilterTabs tabs={TABS} active={filter} onChange={setFilter}/>
      </PageHeader>
      {loading ? <div style={{textAlign:'center',padding:48,fontSize:16}}>Loading real data...</div> : (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Restaurant</th><th>Address</th><th>Rating</th><th>Min Order</th><th>Delivery Time</th><th>Status</th></tr></thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} style={{textAlign:'center',padding:32,color:'var(--text-muted)'}}>No restaurants found</td></tr>
                ) : filtered.map(r => (
                  <tr key={r.id}>
                    <td><div className="user-row"><Avatar name={r.name}/><div><div className="td-bold">{r.name}</div><div className="td-sub">{(r.categories||[]).join(', ')}</div></div></div></td>
                    <td style={{color:'var(--text-secondary)',fontSize:12}}>{r.address}</td>
                    <td style={{fontWeight:700,color:'var(--warning)'}}>⭐ {r.rating}</td>
                    <td>₹{r.min_order}</td>
                    <td>{r.delivery_time}</td>
                    <td><Badge status={r.is_open ? 'active' : 'inactive'}/></td>
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

const orders = `import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, Avatar, PageHeader, FilterTabs, Modal, useToast } from '../../components/ui';
const TABS = [{id:'all',label:'All'},{id:'placed',label:'Placed'},{id:'preparing',label:'Preparing'},{id:'out_for_delivery',label:'On Way'},{id:'delivered',label:'Delivered'},{id:'cancelled',label:'Cancelled'}];
const token = () => localStorage.getItem('fk_token') || '';
export default function Orders() {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    axios.get('https://fastkart-gt44.onrender.com/api/orders', {headers:{Authorization:'Bearer '+token()}})
      .then(r => setOrders(r.data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);
  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);
  return (
    <div>
      <PageHeader title="Food Orders" sub={orders.length + ' total orders'}>
        <button className="btn btn-outline">Export CSV</button>
      </PageHeader>
      <FilterTabs tabs={TABS} active={filter} onChange={setFilter}/>
      {loading ? <div style={{textAlign:'center',padding:48,fontSize:16}}>Loading real data...</div> : (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Order ID</th><th>Customer</th><th>Restaurant</th><th>Amount</th><th>Status</th><th>Time</th></tr></thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} style={{textAlign:'center',padding:48,color:'var(--text-muted)'}}>
                    No orders yet. Orders will appear here when customers place them.
                  </td></tr>
                ) : filtered.map(o => (
                  <tr key={o.id} style={{cursor:'pointer'}} onClick={()=>setSelected(o)}>
                    <td style={{color:'var(--brand)',fontWeight:700,fontSize:12}}>{o.id.slice(0,8).toUpperCase()}</td>
                    <td><div className="user-row"><Avatar name={o.customer_name||'User'}/><span>{o.customer_name||'User'}</span></div></td>
                    <td>{o.restaurant_name||'-'}</td>
                    <td style={{fontWeight:700}}>₹{o.total||0}</td>
                    <td><Badge status={o.status}/></td>
                    <td style={{fontSize:11,color:'var(--text-muted)'}}>{new Date(o.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {selected && (
        <Modal title={'Order ' + selected.id.slice(0,8).toUpperCase()} onClose={()=>setSelected(null)} footer={<button className="btn btn-outline" onClick={()=>setSelected(null)}>Close</button>}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {[['Customer',selected.customer_name||'User'],['Restaurant',selected.restaurant_name||'-'],['Amount','Rs. '+(selected.total||0)],['Status',selected.status],['Payment',selected.payment_method||'-'],['Date',new Date(selected.created_at).toLocaleString()]].map(([k,v])=>(
              <div key={k} style={{background:'var(--bg)',borderRadius:8,padding:'10px 12px'}}>
                <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:3,textTransform:'uppercase'}}>{k}</div>
                <div style={{fontWeight:600}}>{v}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}`;

const dashboard = `import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, Avatar } from '../../components/ui';
const token = () => localStorage.getItem('fk_token') || '';
export default function Dashboard({ onNav }) {
  const [stats, setStats] = useState({restaurants:0, orders:0});
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      axios.get('https://fastkart-gt44.onrender.com/api/restaurants').catch(()=>({data:{data:[]}})),
      axios.get('https://fastkart-gt44.onrender.com/api/orders',{headers:{Authorization:'Bearer '+token()}}).catch(()=>({data:{orders:[]}})),
    ]).then(([rRes, oRes]) => {
      const r = rRes.data.data || [];
      const o = oRes.data.orders || [];
      setRestaurants(r);
      setOrders(o);
      setStats({restaurants: r.length, orders: o.length});
    }).finally(() => setLoading(false));
  }, []);
  const statCards = [
    {icon:'🏪', label:'Total Restaurants', value: stats.restaurants, bg:'#FFF0EB'},
    {icon:'🛍️', label:'Total Orders', value: stats.orders, bg:'#ECFDF5'},
    {icon:'⏳', label:'Pending Orders', value: orders.filter(o=>o.status==='placed'||o.status==='preparing').length, bg:'#FFFBEB'},
    {icon:'✅', label:'Delivered Today', value: orders.filter(o=>o.status==='delivered').length, bg:'#EFF6FF'},
  ];
  return (
    <div>
      {loading ? <div style={{textAlign:'center',padding:48,fontSize:16}}>Loading real data from database...</div> : (
        <>
          <div className="grid-4">
            {statCards.map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-icon" style={{background:s.bg}}>{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid-2">
            <div className="card">
              <div className="card-header">
                <span className="card-title">Recent Orders</span>
                <button className="btn btn-outline btn-sm" onClick={()=>onNav('orders')}>View All</button>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Order ID</th><th>Restaurant</th><th>Amount</th><th>Status</th></tr></thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr><td colSpan={4} style={{textAlign:'center',padding:32,color:'var(--text-muted)'}}>No orders yet. Orders will appear when customers place them.</td></tr>
                    ) : orders.slice(0,5).map(o => (
                      <tr key={o.id}>
                        <td style={{color:'var(--brand)',fontWeight:700,fontSize:12}}>{o.id.slice(0,8).toUpperCase()}</td>
                        <td>{o.restaurant_name||'-'}</td>
                        <td style={{fontWeight:700}}>Rs. {o.total||0}</td>
                        <td><Badge status={o.status}/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><span className="card-title">Restaurants</span></div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Name</th><th>Rating</th><th>Status</th></tr></thead>
                  <tbody>
                    {restaurants.slice(0,6).map(r => (
                      <tr key={r.id}>
                        <td><div className="user-row"><Avatar name={r.name}/><span style={{fontWeight:500}}>{r.name}</span></div></td>
                        <td style={{color:'var(--warning)',fontWeight:700}}>⭐ {r.rating}</td>
                        <td><Badge status={r.is_open ? 'active' : 'inactive'}/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}`;

fs.writeFileSync('src/pages/Dashboard/index.jsx', dashboard, 'utf8');
fs.writeFileSync('src/pages/Restaurants/index.jsx', restaurants, 'utf8');
fs.writeFileSync('src/pages/Orders/index.jsx', orders, 'utf8');
console.log('All pages connected to real API!');