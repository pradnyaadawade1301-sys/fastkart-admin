import { useState, useEffect } from 'react';
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
}