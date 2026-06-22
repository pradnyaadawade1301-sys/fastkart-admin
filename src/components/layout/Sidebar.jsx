import './Sidebar.css';
const NAV = [
  { section: 'Overview' },
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'features', icon: '⚡', label: 'All Features' },
  { section: 'Orders & Bookings' },
  { id: 'orders', icon: '🍕', label: 'Food Orders' },
  { id: 'grocery', icon: '🛒', label: 'Grocery' },
  { id: 'movies', icon: '🎬', label: 'Movies' },
  { id: 'hotels', icon: '🏨', label: 'Hotels' },
  { id: 'rides', icon: '🚕', label: 'Rides & Cabs' },
  { id: 'bikes', icon: '🚲', label: 'Bike Rentals' },
  { id: 'travel', icon: '✈️', label: 'Flights' },
  { id: 'trains', icon: '🚂', label: 'Trains' },
  { id: 'medicine', icon: '💊', label: 'Medicine' },
  { id: 'leisure', icon: '🎭', label: 'Leisure & Events' },
  { section: 'Manage' },
  { id: 'restaurants', icon: '🏪', label: 'Restaurants' },
  { id: 'users', icon: '👥', label: 'Users' },
  { id: 'drivers', icon: '🚗', label: 'Drivers' },
  { id: 'offers', icon: '🎟️', label: 'Offers & Coupons' },
  { id: 'wallet', icon: '💳', label: 'Wallet & Payments' },
  { section: 'System' },
  { id: 'notifications', icon: '🔔', label: 'Notifications' },
  { id: 'chat', icon: '💬', label: 'Support Chat' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];
export default function Sidebar({ active, onNav }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">F</div>
        <div>
          <div className="logo-name">FastKart</div>
          <div className="logo-sub">Admin Panel</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {NAV.map((item, i) =>
          item.section ? (
            <div key={i} className="nav-section">{item.section}</div>
          ) : (
            <div key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => onNav(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>
          )
        )}
      </nav>
      <div className="sidebar-footer">FastKart v1.0 · India 🇮🇳</div>
    </aside>
  );
}