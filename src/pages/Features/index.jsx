import { PageHeader } from '../../components/ui';
const FEATURES = [
  {icon:'🍕',name:'Food Delivery'},{icon:'🛒',name:'Grocery'},
  {icon:'🎬',name:'Movies'},{icon:'🏨',name:'Hotels'},
  {icon:'🚕',name:'Rides & Cabs'},{icon:'🚲',name:'Bike Rentals'},
  {icon:'✈️',name:'Flights'},{icon:'🚂',name:'Trains'},
  {icon:'💊',name:'Medicine'},{icon:'🎭',name:'Leisure'},
];
export default function Features() {
  return (
    <div>
      <PageHeader title="All Features" sub="10 active features"/>
      <div className="feature-grid">
        {FEATURES.map(f => (
          <div key={f.name} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-name">{f.name}</div>
            <div className="feature-count" style={{color:'var(--text-muted)'}}>No data yet</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div style={{textAlign:'center',padding:48,color:'var(--text-muted)'}}>
          <div style={{fontSize:40,marginBottom:12}}>📊</div>
          <div style={{fontSize:15,fontWeight:600,color:'var(--text-secondary)',marginBottom:8}}>No Activity Yet</div>
          <div style={{fontSize:13}}>Feature statistics will appear when customers start using the app</div>
        </div>
      </div>
    </div>
  );
}