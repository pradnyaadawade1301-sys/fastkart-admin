import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, PageHeader, useToast } from '../../components/ui';
const token = () => localStorage.getItem('fk_token') || '';
export default function Offers() {
  const toast = useToast();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('https://fastkart-gt44.onrender.com/api/offers', {headers:{Authorization:'Bearer '+token()}})
      .then(r => setOffers(r.data.offers || []))
      .catch(() => setOffers([]))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <PageHeader title="Offers & Coupons" sub={offers.length + ' active coupons'}/>
      {loading ? <div style={{textAlign:'center',padding:48}}>Loading...</div> : offers.length === 0 ? (
        <div className="card"><div style={{textAlign:'center',padding:64,color:'var(--text-muted)'}}>
          <div style={{fontSize:48,marginBottom:16}}>🎟️</div>
          <div style={{fontSize:16,fontWeight:600,color:'var(--text-secondary)'}}>No Offers Yet</div>
          <div style={{fontSize:13,marginTop:8}}>Add coupons from the database to display here</div>
        </div></div>
      ) : (
        <div className="card"><div className="table-wrap"><table>
          <thead><tr><th>Code</th><th>Type</th><th>Value</th><th>Min Order</th><th>Status</th><th>Expires</th></tr></thead>
          <tbody>{offers.map(o => (
            <tr key={o.id}>
              <td><code>{o.code}</code></td>
              <td><Badge status={o.discount_type||'flat'}/></td>
              <td style={{fontWeight:700,color:'var(--success)'}}>{o.discount_type==='percent'?o.discount_value+'%':'Rs.'+o.discount_value}</td>
              <td>Rs. {o.min_order||0}</td>
              <td><Badge status={o.is_active?'active':'inactive'}/></td>
              <td style={{fontSize:11.5,color:'var(--text-secondary)'}}>{o.expires_at?new Date(o.expires_at).toLocaleDateString():'-'}</td>
            </tr>
          ))}</tbody>
        </table></div></div>
      )}
    </div>
  );
}