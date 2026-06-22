import { useState } from 'react';
import { Badge, Avatar, PageHeader, FilterTabs, Modal, FormField, useToast } from '../../components/ui';
import { RESTAURANTS } from '../../data/mockData';
const TABS = [{id:'all',label:'All'},{id:'active',label:'Active'},{id:'inactive',label:'Inactive'}];
export default function Restaurants() {
  const toast = useToast();
  const [list, setList] = useState(RESTAURANTS);
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const filtered = filter === 'all' ? list : list.filter(r => r.status === filter);
  function toggle(id) {
    setList(p => p.map(r => r.id === id ? {...r, status: r.status === 'active' ? 'inactive' : 'active'} : r));
    toast('Restaurant status updated!');
  }
  return (
    <div>
      <PageHeader title="Restaurants" sub={`${list.length} registered partners`}>
        <FilterTabs tabs={TABS} active={filter} onChange={setFilter}/>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Add Restaurant</button>
      </PageHeader>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Restaurant</th><th>Category</th><th>City</th><th>Rating</th><th>Orders</th><th>Revenue</th><th>Owner</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{filtered.map(r => (
              <tr key={r.id}>
                <td><div className="user-row"><Avatar name={r.name}/><div className="td-bold">{r.name}</div></div></td>
                <td><span className="badge badge-orange">{r.category}</span></td>
                <td style={{color:'var(--text-secondary)'}}>{r.city}</td>
                <td style={{fontWeight:700,color:'var(--warning)'}}>⭐ {r.rating}</td>
                <td style={{fontWeight:600}}>{r.orders}</td>
                <td style={{fontWeight:700,color:'var(--success)'}}>{r.revenue}</td>
                <td style={{fontSize:11.5,color:'var(--text-secondary)'}}>{r.owner}</td>
                <td><Badge status={r.status}/></td>
                <td>
                  <div style={{display:'flex',gap:6}}>
                    <button className="btn btn-ghost btn-sm">✏️</button>
                    <button className={`btn btn-sm ${r.status==='active'?'btn-danger':'btn-success'}`} onClick={() => toggle(r.id)}>
                      {r.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      {showAdd && (
        <Modal title="Add New Restaurant" onClose={() => setShowAdd(false)} footer={
          <><button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={() => {toast('Restaurant added!'); setShowAdd(false);}}>Add Restaurant</button></>
        }>
          <FormField label="Restaurant Name" placeholder="e.g. Biryani Blues"/>
          <FormField label="Owner Phone" placeholder="+91 98765 43210"/>
          <FormField label="City" placeholder="Mumbai, Delhi, Bangalore..."/>
          <FormField label="Category" placeholder="North Indian, Fast Food, Biryani..."/>
          <FormField label="Full Address" placeholder="Shop 12, MG Road..."/>
          <FormField label="Minimum Order (₹)" type="number" placeholder="100"/>
        </Modal>
      )}
    </div>
  );
}
