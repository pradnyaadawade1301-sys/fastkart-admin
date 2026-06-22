import { PageHeader, useToast } from '../../components/ui';
import { SUPPORT_TICKETS } from '../../data/mockData';
const priorityBadge = { urgent:'badge-danger', medium:'badge-warning', low:'badge-gray' };
export default function Chat() {
  const toast = useToast();
  return (
    <div>
      <PageHeader title="Support Chat" sub={`${SUPPORT_TICKETS.length} open tickets`}/>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">💬 Open Tickets</span></div>
          {SUPPORT_TICKETS.map(t => (
            <div key={t.id} style={{display:'flex',alignItems:'center',gap:12,padding:'13px 18px',borderBottom:'1px solid var(--border)',cursor:'pointer'}} onClick={() => toast('Chat opened!')}>
              <div style={{width:38,height:38,borderRadius:9,background:'var(--brand-soft)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:'var(--brand)',fontSize:12.5,flexShrink:0}}>
                {t.user.split(' ').map(w=>w[0]).join('')}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:13}}>{t.user}</div>
                <div style={{fontSize:11.5,color:'var(--text-secondary)',marginTop:1}}>{t.issue}</div>
                <div style={{fontSize:10.5,color:'var(--text-muted)',marginTop:2}}>{t.feature} · {t.time}</div>
              </div>
              <span className={`badge ${priorityBadge[t.priority]}`}>{t.priority}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">📊 Support Stats</span></div>
          <div className="card-body">
            {[['Open Tickets','3','var(--danger)'],['Resolved Today','28','var(--success)'],['Avg Response Time','4.2 min','var(--text-primary)'],['Customer Satisfaction','94%','var(--success)'],['Top Issue Category','Refunds','var(--text-primary)']].map(([l,v,c]) => (
              <div key={l} className="mini-stat"><span>{l}</span><span style={{fontWeight:700,color:c}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
