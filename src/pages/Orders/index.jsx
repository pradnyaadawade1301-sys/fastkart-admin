import { useState, useEffect } from 'react';
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
}