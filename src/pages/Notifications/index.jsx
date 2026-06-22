import { useState, useEffect } from 'react';
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
}