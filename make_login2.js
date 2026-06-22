const fs = require('fs');
const jsx = `import { useState } from 'react';
import './Login.css';
const E = 'fastkart@gmail.com';
const P = 'admin123';
export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (email.trim().toLowerCase() === E && password === P) {
      localStorage.setItem('fk_admin_auth', 'true');
      onLogin();
    } else {
      setError('Incorrect email or password.');
    }
    setLoading(false);
  }
  return (
    <div className="login-root">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo-icon">F</div>
          <div>
            <div className="login-brand-name">FastKart</div>
            <div className="login-brand-sub">Admin Panel</div>
          </div>
        </div>
        <div className="login-headline">
          <h1>Manage your entire platform from one place.</h1>
          <p>Food, Grocery, Movies, Hotels, Rides, and more in one powerful dashboard.</p>
        </div>
        <div className="login-chips">
          {['Food','Grocery','Movies','Hotels','Rides','Bikes','Flights','Trains','Medicine','Leisure'].map(f => (
            <span key={f} className="login-chip">{f}</span>
          ))}
        </div>
        <div className="login-stats">
          <div className="login-stat"><div className="login-stat-value">28.4K</div><div className="login-stat-label">Users</div></div>
          <div className="login-stat-divider"/>
          <div className="login-stat"><div className="login-stat-value">142</div><div className="login-stat-label">Restaurants</div></div>
          <div className="login-stat-divider"/>
          <div className="login-stat"><div className="login-stat-value">12.4L</div><div className="login-stat-label">Revenue</div></div>
        </div>
        <div className="login-left-footer">FastKart India v1.0</div>
      </div>
      <div className="login-right">
        <div className="login-card">
          <div className="login-card-top">
            <div className="login-card-logo-icon">F</div>
            <h2>Welcome Back</h2>
            <p>Sign in to your admin account</p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="lf-group">
              <label className="lf-label">Email Address</label>
              <div className="lf-field">
                <input className="lf-input" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} autoFocus/>
              </div>
            </div>
            <div className="lf-group">
              <label className="lf-label">Password</label>
              <div className="lf-field">
                <input className="lf-input" type={showPass ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="button" className="lf-eye-btn" onClick={() => setShowPass(s => !s)}>
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            {error && <div className="lf-error">{error}</div>}
            <button type="submit" className="lf-submit-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In to Dashboard'}
            </button>
          </form>
          <div className="login-secure">Secured and encrypted admin access</div>
        </div>
      </div>
    </div>
  );
}`;
fs.writeFileSync('src/pages/Login/index.jsx', jsx, 'utf8');
console.log('Login updated - demo credentials removed!');