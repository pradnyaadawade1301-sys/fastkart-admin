import { useState } from 'react';
import { Badge, Avatar, PageHeader, FilterTabs, useToast } from '../../components/ui';
import { USERS } from '../../data/mockData';
const TABS = [{id:'all',label:'All Users'},{id:'active',label:'Active'},{id:'blocked',label:'Blocked'}];
export default function Users() {
  const toast = useToast();
  const [users, setUsers] = useState(USERS);
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? users : users.filter(u => u.status === filter);
  function toggle(id) {
    setUsers(p => p.map(u => u.id === id ? {...u, status: u.status === 'blocked' ? 'active' : 'blocked'} : u));
    toast('User status updated!');
  }
  return (
    <div>
      <PageHeader title="Users" sub={`${users.length} registered customers`}>
        <FilterTabs tabs={TABS} active={filter} onChange={setFilter}/>
        <button className="btn btn-outline">⬇ Export</button>
      </PageHeader>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>User</th><th>Phone</th><th>Orders</th><th>Total Spent</th><th>Wallet</th><th>Joined</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{filtered.map(u => (
              <tr key={u.id}>
                <td><div className="user-row"><Avatar name={u.name}/><div><div className="td-bold">{u.name}</div><div className="td-sub">{u.email}</div></div></div></td>
                <td style={{color:'var(--text-secondary)',fontSize:11.5}}>{u.phone}</td>
                <td style={{fontWeight:700,textAlign:'center'}}>{u.orders}</td>
                <td style={{fontWeight:700,color:'var(--success)'}}>{u.spent}</td>
                <td style={{fontWeight:600,color:'var(--brand)'}}>{u.wallet}</td>
                <td style={{fontSize:11.5,color:'var(--text-secondary)'}}>{u.joined}</td>
                <td><Badge status={u.status}/></td>
                <td>
                  <div style={{display:'flex',gap:6}}>
                    <button className="btn btn-ghost btn-sm">👁</button>
                    <button className={`btn btn-sm ${u.status==='blocked'?'btn-success':'btn-danger'}`} onClick={() => toggle(u.id)}>
                      {u.status === 'blocked' ? 'Unblock' : 'Block'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
