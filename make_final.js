const fs = require('fs');

// Fix App.js - always show login
const app = `import { useState } from 'react';
import Login from './pages/Login';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import { ToastProvider } from './components/ui';
import Dashboard from './pages/Dashboard';
import Features from './pages/Features';
import Orders from './pages/Orders';
import Grocery from './pages/Grocery';
import Movies from './pages/Movies';
import Hotels from './pages/Hotels';
import Rides from './pages/Rides';
import Bikes from './pages/Bikes';
import Travel from './pages/Travel';
import Trains from './pages/Trains';
import Medicine from './pages/Medicine';
import Leisure from './pages/Leisure';
import Restaurants from './pages/Restaurants';
import Users from './pages/Users';
import Drivers from './pages/Drivers';
import Offers from './pages/Offers';
import Wallet from './pages/Wallet';
import Notifications from './pages/Notifications';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import './styles/globals.css';
import './App.css';
const PAGES = {
  dashboard:Dashboard, features:Features, orders:Orders,
  grocery:Grocery, movies:Movies, hotels:Hotels,
  rides:Rides, bikes:Bikes, travel:Travel,
  trains:Trains, medicine:Medicine, leisure:Leisure,
  restaurants:Restaurants, users:Users, drivers:Drivers,
  offers:Offers, wallet:Wallet, notifications:Notifications,
  chat:Chat, settings:Settings,
};
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState('dashboard');
  function handleLogout() {
    setIsLoggedIn(false);
    setPage('dashboard');
  }
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }
  const PageComponent = PAGES[page] || Dashboard;
  return (
    <ToastProvider>
      <div className="app-root">
        <Sidebar active={page} onNav={setPage} />
        <div className="app-main">
          <Topbar page={page} onNav={setPage} onLogout={handleLogout} />
          <main className="app-content">
            <PageComponent onNav={setPage} />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}`;

// Fix Dashboard - no fake stats
const dashboard = `import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, Avatar } from '../../components/ui';
const token = () => localStorage.getItem('fk_token') || '';
export default function Dashboard({ onNav }) {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      axios.get('https://fastkart-gt44.onrender.com/api/restaurants').catch(() => ({data:{data:[]}})),
      axios.get('https://fastkart-gt44.onrender.com/api/orders', {headers:{Authorization:'Bearer '+token()}}).catch(() => ({data:{orders:[]}})),
    ]).then(([rRes, oRes]) => {
      setRestaurants(rRes.data.data || []);
      setOrders(oRes.data.orders || []);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading ? (
        <div style={{textAlign:'center',padding:80,color:'var(--text-muted)'}}>
          <div style={{fontSize:40,marginBottom:12}}>⏳</div>
          <div style={{fontSize:15}}>Loading data...</div>
        </div>
      ) : (
        <>
          <div className="grid-2" style={{marginBottom:16}}>
            <div className="stat-card">
              <div className="stat-icon" style={{background:'#FFF0EB'}}>🏪</div>
              <div className="stat-value">{restaurants.length}</div>
              <div className="stat-label">Registered Restaurants</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{background:'#ECFDF5'}}>🛍️</div>
              <div className="stat-value">{orders.length}</div>
              <div className="stat-label">Total Orders</div>
            </div>
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="card-header">
                <span className="card-title">Recent Orders</span>
                <button className="btn btn-outline btn-sm" onClick={() => onNav('orders')}>View All</button>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Order ID</th><th>Restaurant</th><th>Amount</th><th>Status</th></tr></thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr><td colSpan={4} style={{textAlign:'center',padding:40,color:'var(--text-muted)'}}>
                        No orders yet. Orders will appear when customers place them.
                      </td></tr>
                    ) : orders.slice(0,5).map(o => (
                      <tr key={o.id}>
                        <td style={{color:'var(--brand)',fontWeight:700,fontSize:12}}>{o.id.slice(0,8).toUpperCase()}</td>
                        <td>{o.restaurant_name || '-'}</td>
                        <td style={{fontWeight:700}}>Rs. {o.total || 0}</td>
                        <td><Badge status={o.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <span className="card-title">Restaurants</span>
                <button className="btn btn-outline btn-sm" onClick={() => onNav('restaurants')}>View All</button>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Name</th><th>Rating</th><th>Status</th></tr></thead>
                  <tbody>
                    {restaurants.length === 0 ? (
                      <tr><td colSpan={3} style={{textAlign:'center',padding:40,color:'var(--text-muted)'}}>No restaurants yet.</td></tr>
                    ) : restaurants.slice(0,5).map(r => (
                      <tr key={r.id}>
                        <td><div className="user-row"><Avatar name={r.name}/><span style={{fontWeight:500}}>{r.name}</span></div></td>
                        <td style={{color:'var(--warning)',fontWeight:700}}>⭐ {r.rating}</td>
                        <td><Badge status={r.is_open ? 'active' : 'inactive'} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}`;

fs.writeFileSync('src/App.js', app, 'utf8');
fs.writeFileSync('src/pages/Dashboard/index.jsx', dashboard, 'utf8');
console.log('Done! Login fixed + fake stats removed.');