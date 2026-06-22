import { Badge, PageHeader } from '../../components/ui';
import { WALLET_TXN } from '../../data/mockData';
export default function Wallet() {
  return (
    <div>
      <PageHeader title="Wallet & Payments" sub="All transactions across all features"/>
      <div className="grid-4">
        {[['💰','Total Collected','₹12.4L','This month','#FFF0EB'],['📱','UPI Payments','₹8.2L','66% of total','#ECFDF5'],['💳','Card Payments','₹2.4L','19% of total','#EFF6FF'],['👛','User Wallets','₹1.8L','Active balance','#FFFBEB']].map(([i,l,v,c,bg]) => (
          <div key={l} className="stat-card"><div className="stat-icon" style={{background:bg}}>{i}</div><div className="stat-value">{v}</div><div className="stat-label">{l}</div><div className="stat-change up">{c}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Transaction ID</th><th>User</th><th>Feature</th><th>Amount</th><th>Method</th><th>Date & Time</th><th>Status</th></tr></thead>
            <tbody>{WALLET_TXN.map(t => (
              <tr key={t.id}>
                <td style={{color:'var(--brand)',fontWeight:700,fontSize:11.5}}>{t.id}</td>
                <td style={{fontWeight:500}}>{t.user}</td>
                <td><span className={`badge ${t.badge}`}>{t.feature}</span></td>
                <td style={{fontWeight:700}}>{t.amount}</td>
                <td><span className="badge badge-info">{t.method}</span></td>
                <td style={{fontSize:11.5,color:'var(--text-secondary)'}}>{t.date}</td>
                <td><Badge status={t.status}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
