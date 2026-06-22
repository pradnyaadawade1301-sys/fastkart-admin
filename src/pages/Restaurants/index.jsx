import { useState, useEffect } from 'react';
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
}