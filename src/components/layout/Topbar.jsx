// src/components/layout/Topbar.jsx
import './Topbar.css';

const TITLES = {
  dashboard: 'Dashboard', features: 'All Features',
  orders: 'Food Orders', grocery: 'Grocery Orders', movies: 'Movie Bookings',
  hotels: 'Hotel Bookings', rides: 'Rides & Cabs', bikes: 'Bike Rentals',
  travel: 'Flight Bookings', trains: 'Train Bookings', medicine: 'Medicine Orders',
  leisure: 'Leisure & Events', restaurants: 'Restaurants', users: 'Users',
  drivers: 'Drivers', offers: 'Offers & Coupons', wallet: 'Wallet & Payments',
  notifications: 'Notifications', chat: 'Support Chat', settings: 'Settings',
};

export default function Topbar({ page, onNav, onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar-title">{TITLES[page] || 'Dashboard'}</div>

      <div className="topbar-search">
        <span className="search-icon">🔍</span>
        <input placeholder="Search orders, users, restaurants..." />
      </div>

      <button
        className="topbar-notif-btn"
        onClick={() => onNav('notifications')}
        aria-label="Notifications"
      >
        🔔
        <span className="notif-dot" />
      </button>

      <div className="topbar-user">
        <div className="topbar-avatar">AD</div>
        <div className="topbar-user-info">
          <div className="topbar-name">FastKart Admin</div>
          <div className="topbar-email">fastkart@gmail.com</div>
        </div>
        <button className="topbar-logout-btn" onClick={onLogout} title="Logout">
          🚪
        </button>
      </div>
    </header>
  );
}
