import { useState, useEffect } from 'react';
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
}