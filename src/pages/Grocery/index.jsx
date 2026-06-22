import { PageHeader } from '../../components/ui';
export default function Page() {
  return (
    <div>
      <PageHeader title="Grocery Orders"/>
      <div className="card">
        <div style={{textAlign:'center',padding:80,color:'var(--text-muted)'}}>
          <div style={{fontSize:52,marginBottom:16}}>🛒</div>
          <div style={{fontSize:16,fontWeight:600,color:'var(--text-secondary)',marginBottom:8}}>No Data Yet</div>
          <div style={{fontSize:13}}>Records will appear here when customers use the FastKart app</div>
        </div>
      </div>
    </div>
  );
}