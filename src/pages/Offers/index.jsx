import { useState } from 'react';
import { Badge, PageHeader, Modal, useToast } from '../../components/ui';
import { OFFERS } from '../../data/mockData';
const featureBadge = { All:'badge-gray', Movies:'badge-purple', Rides:'badge-warning', Hotels:'badge-teal', Medicine:'badge-success', Food:'badge-orange' };
export default function Offers() {
  const toast = useToast();
  const [offers, setOffers] = useState(OFFERS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({code:'',title:'',feature:'All',type:'percent',discount:'',minOrder:'',expires:''});
  function deactivate(id) { setOffers(p => p.map(o => o.id === id ? {...o, status:'expired'} : o)); toast('Coupon deactivated!'); }
  function create() {
    if (!form.code || !form.title) { toast('Code and Title are required!'); return; }
    const n = {id:`C00${offers.length+1}`,code:form.code.toUpperCase(),feature:form.feature,discount:form.type==='percent'?`${form.discount}%`:`₹${form.discount}`,type:form.type,minOrder:`₹${form.minOrder||0}`,used:0,expires:form.expires||'Jul 31, 2026',status:'active'};
    setOffers(p => [n,...p]); toast('Coupon created!'); setShowAdd(false);
  }
  return (
    <div>
      <PageHeader title="Offers & Coupons" sub="Manage feature-wise discount codes">
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ New Coupon</button>
      </PageHeader>
      <div className="grid-4" style={{marginBottom:18}}>
        {[['🎟️','Total Coupons',offers.length,'#EFF6FF'],['✅','Active',offers.filter(o=>o.status==='active').length,'#ECFDF5'],['📊','Total Used',offers.reduce((s,o)=>s+o.used,0).toLocaleString(),'#FFF0EB'],['❌','Expired',offers.filter(o=>o.status==='expired').length,'#FEF2F2']].map(([i,l,v,bg]) => (
          <div key={l} className="stat-card"><div className="stat-icon" style={{background:bg}}>{i}</div><div className="stat-value">{v}</div><div className="stat-label">{l}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Code</th><th>Feature</th><th>Discount</th><th>Min Order</th><th>Used</th><th>Expires</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{offers.map(c => (
              <tr key={c.id}>
                <td><code>{c.code}</code></td>
                <td><span className={`badge ${featureBadge[c.feature]||'badge-gray'}`}>{c.feature}</span></td>
                <td style={{fontWeight:700,color:'var(--success)'}}>{c.discount}</td>
                <td style={{color:'var(--text-secondary)'}}>{c.minOrder}</td>
                <td style={{fontWeight:600}}>{c.used.toLocaleString()}</td>
                <td style={{fontSize:11.5,color:'var(--text-secondary)'}}>{c.expires}</td>
                <td><Badge status={c.status}/></td>
                <td>{c.status==='active' ? <button className="btn btn-danger btn-sm" onClick={() => deactivate(c.id)}>Deactivate</button> : <span style={{color:'var(--text-muted)',fontSize:11.5}}>—</span>}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      {showAdd && (
        <Modal title="Create New Coupon" onClose={() => setShowAdd(false)} footer={
          <><button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={create}>Create Coupon</button></>
        }>
          {[['Coupon Code','code','text','SAVE50'],['Title','title','text','50% off on first order'],['Discount Value','discount','number','50'],['Min Order (₹)','minOrder','number','99'],['Expiry Date','expires','date','']].map(([l,k,t,p]) => (
            <div key={k} className="form-group"><label className="form-label">{l}</label><input className="form-input" type={t} placeholder={p} value={form[k]} onChange={e => setForm(f => ({...f,[k]:e.target.value}))}/></div>
          ))}
          <div className="form-group"><label className="form-label">Feature</label>
            <select className="form-input" value={form.feature} onChange={e => setForm(f => ({...f,feature:e.target.value}))}>
              {['All','Food','Grocery','Movies','Hotels','Rides','Bikes','Travel','Trains','Medicine','Leisure'].map(f => <option key={f}>{f}</option>)}
            </select></div>
          <div className="form-group"><label className="form-label">Discount Type</label>
            <select className="form-input" value={form.type} onChange={e => setForm(f => ({...f,type:e.target.value}))}>
              <option value="percent">Percentage (%)</option><option value="flat">Flat Amount (₹)</option>
            </select></div>
        </Modal>
      )}
    </div>
  );
}
