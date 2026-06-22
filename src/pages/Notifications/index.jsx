import { useState } from 'react';
import { PageHeader, useToast } from '../../components/ui';
import { NOTIFICATIONS } from '../../data/mockData';
const TYPE = { info:{bg:'#EFF6FF',icon:'ℹ️'}, warning:{bg:'#FFFBEB',icon:'⚠️'}, danger:{bg:'#FEF2F2',icon:'🚨'}, success:{bg:'#ECFDF5',icon:'✅'} };
export default function Notifications() {
  const toast = useToast();
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const unread = notifs.filter(n => !n.read).length;
  function mark(id) { setNotifs(p => p.map(n => n.id === id ? {...n, read:true} : n)); }
  function markAll() { setNotifs(p => p.map(n => ({...n, read:true}))); toast('All notifications marked as read!'); }
  return (
    <div>
      <PageHeader title="Notifications" sub={`${unread} unread notification${unread !== 1 ? 's' : ''}`}>
        {unread > 0 && <button className="btn btn-outline" onClick={markAll}>✓ Mark All as Read</button>}
      </PageHeader>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {notifs.map(n => {
          const ts = TYPE[n.type] || TYPE.info;
          return (
            <div key={n.id} className="notif-card" style={{opacity: n.read ? 0.6 : 1}}>
              <div className="notif-inner">
                <div className="notif-icon" style={{background:ts.bg}}>{ts.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:10}}>
                    <div style={{fontWeight:600,fontSize:13.5}}>{n.title}</div>
                    <div style={{fontSize:11,color:'var(--text-muted)',flexShrink:0}}>{n.time}</div>
                  </div>
                  <div style={{fontSize:12.5,color:'var(--text-secondary)',marginTop:4}}>{n.body}</div>
                </div>
                {!n.read && <button className="btn btn-outline btn-sm" onClick={() => mark(n.id)}>Mark Read</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
