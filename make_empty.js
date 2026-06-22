const fs = require('fs');

// Empty state component template
function emptyPage(title, icon) {
  return `import { PageHeader } from '../../components/ui';
export default function Page() {
  return (
    <div>
      <PageHeader title="${title}"/>
      <div className="card">
        <div style={{textAlign:'center',padding:80,color:'var(--text-muted)'}}>
          <div style={{fontSize:52,marginBottom:16}}>${icon}</div>
          <div style={{fontSize:16,fontWeight:600,color:'var(--text-secondary)',marginBottom:8}}>No Data Yet</div>
          <div style={{fontSize:13}}>Records will appear here when customers use the FastKart app</div>
        </div>
      </div>
    </div>
  );
}`;
}

// All feature pages - empty until real data
const pages = [
  ['Grocery','Grocery Orders','🛒'],
  ['Movies','Movie Bookings','🎬'],
  ['Hotels','Hotel Bookings','🏨'],
  ['Rides','Rides & Cabs','🚕'],
  ['Bikes','Bike Rentals','🚲'],
  ['Travel','Flight Bookings','✈️'],
  ['Trains','Train Bookings','🚂'],
  ['Medicine','Medicine Orders','💊'],
  ['Leisure','Leisure & Events','🎭'],
  ['Drivers','Drivers','🚗'],
  ['Wallet','Wallet & Payments','💳'],
  ['Chat','Support Chat','💬'],
];

pages.forEach(([folder, title, icon]) => {
  fs.writeFileSync(`src/pages/${folder}/index.jsx`, emptyPage(title, icon), 'utf8');
});

// Features page - empty
fs.writeFileSync('src/pages/Features/index.jsx', `import { PageHeader } from '../../components/ui';
const FEATURES = [
  {icon:'🍕',name:'Food Delivery'},{icon:'🛒',name:'Grocery'},
  {icon:'🎬',name:'Movies'},{icon:'🏨',name:'Hotels'},
  {icon:'🚕',name:'Rides & Cabs'},{icon:'🚲',name:'Bike Rentals'},
  {icon:'✈️',name:'Flights'},{icon:'🚂',name:'Trains'},
  {icon:'💊',name:'Medicine'},{icon:'🎭',name:'Leisure'},
];
export default function Features() {
  return (
    <div>
      <PageHeader title="All Features" sub="10 active features"/>
      <div className="feature-grid">
        {FEATURES.map(f => (
          <div key={f.name} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-name">{f.name}</div>
            <div className="feature-count" style={{color:'var(--text-muted)'}}>No data yet</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div style={{textAlign:'center',padding:48,color:'var(--text-muted)'}}>
          <div style={{fontSize:40,marginBottom:12}}>📊</div>
          <div style={{fontSize:15,fontWeight:600,color:'var(--text-secondary)',marginBottom:8}}>No Activity Yet</div>
          <div style={{fontSize:13}}>Feature statistics will appear when customers start using the app</div>
        </div>
      </div>
    </div>
  );
}`, 'utf8');

// Sidebar without fake badges
fs.writeFileSync('src/components/layout/Sidebar.jsx', `import './Sidebar.css';
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
            <div key={item.id} className={\`nav-item \${active === item.id ? 'active' : ''}\`} onClick={() => onNav(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>
          )
        )}
      </nav>
      <div className="sidebar-footer">FastKart v1.0 · India 🇮🇳</div>
    </aside>
  );
}`, 'utf8');

console.log('All pages emptied! No fake data anywhere.');