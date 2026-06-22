// src/pages/Login/index.jsx
import { useState } from 'react';
import './Login.css';

const VALID_EMAIL    = 'fastkart@gmail.com';
const VALID_PASSWORD = 'admin123';

export default function Login({ onLogin }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    if (email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
      localStorage.setItem('fk_admin_auth', 'true');
      onLogin();
    } else {
      setError('Incorrect email or password. Please try again.');
    }
    setLoading(false);
  }

  function autofillEmail()    { setEmail(VALID_EMAIL); }
  function autofillPassword() { setPassword(VALID_PASSWORD); }

  return (
    <div className="login-root">
      {/* Left Panel */}
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo-icon">F</div>
          <div>
            <div className="login-brand-name">FastKart</div>
            <div className="login-brand-sub">Admin Panel</div>
          </div>
        </div>

        <div className="login-headline">
          <h1>Manage your entire<br />platform from<br />one place.</h1>
          <p>Food, Grocery, Movies, Hotels, Rides, and more — all in one powerful dashboard.</p>
        </div>

        <div className="login-chips">
          {['🍕 Food Delivery','🛒 Grocery','🎬 Movies','🏨 Hotels','🚕 Rides & Cabs','🚲 Bike Rentals','✈️ Flights','🚂 Trains','💊 Medicine','🎭 Leisure'].map((f) => (
            <span key={f} className="login-chip">{f}</span>
          ))}
        </div>

        <div className="login-left-footer">FastKart · India 🇮🇳 · v1.0</div>
      </div>

      {/* Right Panel */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-card-top">
            <div className="login-card-icon">🔐</div>
            <h2>Admin Login</h2>
            <p>Sign in to your admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {/* Email */}
            <div className="lf-group">
              <label className="lf-label">Email Address</label>
              <div className="lf-field">
                <span className="lf-field-icon">✉️</span>
                <input
                  className="lf-input"
                  type="email"
                  placeholder="fastkart@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div className="lf-group">
              <label className="lf-label">Password</label>
              <div className="lf-field">
                <span className="lf-field-icon">🔑</span>
                <input
                  className="lf-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lf-eye-btn"
                  onClick={() => setShowPass((s) => !s)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && <div className="lf-error">⚠️ {error}</div>}

            <button type="submit" className="lf-submit-btn" disabled={loading}>
              {loading ? <><span className="lf-spinner" /> Verifying...</> : '🚀 Login to Dashboard'}
            </button>
          </form>

          {/* Hint Box */}
          <div className="login-hint">
            <div className="hint-label">Demo Credentials</div>
            <div className="hint-row">
              <span>Email</span>
              <code onClick={autofillEmail} title="Click to autofill">fastkart@gmail.com</code>
            </div>
            <div className="hint-row">
              <span>Password</span>
              <code onClick={autofillPassword} title="Click to autofill">admin123</code>
            </div>
            <div className="hint-tip">👆 Click to autofill credentials</div>
          </div>
        </div>
      </div>
    </div>
  );
}
