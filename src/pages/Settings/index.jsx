import { PageHeader, useToast } from '../../components/ui';
export default function Settings() {
  const toast = useToast();
  const Field = ({label, type='text', val, ph}) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input className="form-input" type={type} defaultValue={val} placeholder={ph}/>
    </div>
  );
  return (
    <div>
      <PageHeader title="Settings"/>
      <div className="grid-2">
        <div>
          <div className="card" style={{marginBottom:16}}>
            <div className="card-header"><span className="card-title">🌐 API Configuration</span></div>
            <div className="card-body">
              <Field label="Backend URL" val="https://api.fastkart.in"/>
              <Field label="API Version" val="v1"/>
              <Field label="Request Timeout (seconds)" type="number" val="30"/>
              <button className="btn btn-primary" onClick={() => toast('API settings saved!')}>Save Changes</button>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">💳 Payment Keys</span></div>
            <div className="card-body">
              <Field label="Stripe Secret Key" type="password" ph="sk_live_..."/>
              <Field label="Razorpay Key ID" type="password" ph="rzp_live_..."/>
              <Field label="FCM Server Key" type="password" ph="AAAA..."/>
              <button className="btn btn-primary" onClick={() => toast('Payment keys saved!')}>Update Keys</button>
            </div>
          </div>
        </div>
        <div>
          <div className="card" style={{marginBottom:16}}>
            <div className="card-header"><span className="card-title">🔧 Feature Toggles</span></div>
            <div className="card-body">
              {['🍕 Food Delivery','🛒 Grocery','🎬 Movies','🏨 Hotels','🚕 Rides & Cabs','🚲 Bike Rentals','✈️ Flights','🚂 Trains','💊 Medicine','🎭 Leisure & Events'].map(f => (
                <div key={f} className="mini-stat">
                  <span style={{fontSize:12.5}}>{f}</span>
                  <select className="form-select-sm"><option>Enabled</option><option>Disabled</option></select>
                </div>
              ))}
              <button className="btn btn-primary" style={{marginTop:14}} onClick={() => toast('Feature settings saved!')}>Save Feature Settings</button>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">🛡️ Admin Profile</span></div>
            <div className="card-body">
              <Field label="Admin Name" val="FastKart Admin"/>
              <Field label="Email Address" val="fastkart@gmail.com"/>
              <Field label="New Password" type="password" ph="Leave blank to keep current"/>
              <button className="btn btn-primary" onClick={() => toast('Profile updated successfully!')}>Update Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
