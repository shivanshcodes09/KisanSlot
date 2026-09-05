import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Dashboard.css';

export default function Dashboard({ userData }) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const t = {
    en: {
      welcome: 'Welcome back',
      upcoming: 'Next Procurement Slot',
      recentPayment: 'Last Payment Received',
      quickActions: 'Quick Actions',
      myBookings: 'My Bookings',
      myPayments: 'Payment History',
      myProfile: 'My Profile',
      bookNow: 'Book New Slot',
      statusConfirmed: 'Confirmed',
      activity: 'Recent Activity',
      weather: 'Local Weather',
      price: 'Current MSP (Market Price)',
      liveQueue: 'Live Queue Status',
      langSwitch: 'Switch to Hindi',
      langBtn: '🌐 Language',
      tipTitle: '🌾 Farmer Tip of the Day',
      tipText: '"Using organic fertilizers can increase your crop yield by 15% and improve soil health long-term."',
      tipFooter: 'Learn more at Kisan Knowledge Hub ➔',
      news: 'News & Updates',
      rates: 'Market Rates',
      crops: {
        wheat: 'Wheat',
        paddy: 'Paddy',
        maize: 'Maize',
        mustard: 'Mustard',
        unit: '/quintal'
      }
    },
    hi: {
      welcome: 'आपका स्वागत है',
      upcoming: 'आगामी स्लॉट',
      recentPayment: 'अंतिम भुगतान',
      quickActions: 'त्वरित कार्य',
      myBookings: 'मेरी बुकिंग',
      myPayments: 'भुगतान इतिहास',
      myProfile: 'मेरी प्रोफाइल',
      bookNow: 'नया स्लॉट बुक करें',
      statusConfirmed: 'पुष्टि की गई',
      activity: 'हाल की गतिविधियां',
      weather: 'स्थानीय मौसम',
      price: 'वर्तमान एमएसपी (बाजार मूल्य)',
      liveQueue: 'लाइव कतार स्थिति',
      langSwitch: 'English में बदलें',
      langBtn: '🌐 भाषा',
      tipTitle: '🌾 आज का किसान सुझाव',
      tipText: '"जैविक उर्वरकों का उपयोग करने से आपकी फसल की पैदावार 15% तक बढ़ सकती है और लंबे समय तक मिट्टी का स्वास्थ्य बेहतर हो सकता है।"',
      tipFooter: 'किसान नॉलेज हब पर और जानें ➔',
      news: 'समाचार और अपडेट',
      rates: 'बाजार दरें',
      crops: {
        wheat: 'गेहूँ',
        paddy: 'धान',
        maize: 'मक्का',
        mustard: 'सरसों',
        unit: '/क्विंटल'
      }
    },
  }[language] || { welcome: 'Welcome back', upcoming: 'Next Procurement Slot', recentPayment: 'Last Payment Received', quickActions: 'Quick Actions', myBookings: 'My Bookings', myPayments: 'Payment History', myProfile: 'My Profile', bookNow: 'Book New Slot', statusConfirmed: 'Confirmed', activity: 'Recent Activity', weather: 'Local Weather', price: 'Current MSP', liveQueue: 'Live Queue Status', langSwitch: 'Switch to Hindi', langBtn: '🌐 Language', tipTitle: '🌾 Farmer Tip of the Day', tipText: '"Using organic fertilizers can increase your crop yield by 15% and improve soil health long-term."', tipFooter: 'Learn more at Kisan Knowledge Hub ➔', news: 'News & Updates', rates: 'Market Rates', crops: { wheat: 'Wheat', paddy: 'Paddy', maize: 'Maize', mustard: 'Mustard', unit: '/quintal' } };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return language === 'hi' ? 'सुप्रभात' : 'Good Morning';
    if (hour < 17) return language === 'hi' ? 'नमस्कार' : 'Good Afternoon';
    return language === 'hi' ? 'शुभ संध्या' : 'Good Evening';
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Logo" />
          <span>KisanSlot</span>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active" onClick={() => navigate('/dashboard')}>🏠 Dashboard</button>
          <button className="nav-item" onClick={() => navigate('/bookings')}>📋 {t.myBookings}</button>
          <button className="nav-item" onClick={() => navigate('/payments')}>💳 {t.myPayments}</button>
          <button className="nav-item" onClick={() => navigate('/news')}>📰 {t.news}</button>
          <button className="nav-item" onClick={() => navigate('/msp')}>📈 {t.rates}</button>
          <button className="nav-item" onClick={() => navigate('/profile')}>👤 {t.myProfile}</button>
        </nav>
        <div className="sidebar-footer">
          <button className="lang-switch-btn" onClick={toggleLanguage}>
            {t.langBtn} {language === 'en' ? '➔ HI' : '➔ EN'}
          </button>
          <button className="logout-btn" onClick={() => window.location.href = '/'}>Logout ➔</button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <header className="top-bar">
          <div className="time-weather">
            <span className="current-time">{currentTime.toLocaleTimeString()}</span>
            <span className="weather-widget">☀️ 32°C | Gurugram</span>
          </div>
          <div className="user-pill">
            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt="User" />
            <span>{userData?.name || 'Farmer User'}</span>
          </div>
        </header>

        <section className="welcome-section">
          <h1>{getGreeting()}, {userData?.name || 'Farmer'}! 👋</h1>
          <p>{language === 'hi' ? 'आपका खरीद केंद्र जल्द ही आपका स्वागत करेगा। सब कुछ ठीक है।' : 'Your procurement center is expecting you soon. Everything is on track.'}</p>
        </section>

        <div className="price-ticker" onClick={() => navigate('/msp')} style={{ cursor: 'pointer' }}>
          <div className="ticker-label">{t.price}:</div>
          <div className="ticker-wrap">
            <div className="ticker-content">
              <span>{t.crops.wheat}: ₹2,275{t.crops.unit} 🟢</span>
              <span>{t.crops.paddy}: ₹2,183{t.crops.unit} 🟢</span>
              <span>{t.crops.maize}: ₹2,090{t.crops.unit} 🔴</span>
              <span>{t.crops.mustard}: ₹5,450{t.crops.unit} 🟢</span>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card priority">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{t.upcoming}</h3>
              <p className="stat-value">Sept 12, 10:00 AM</p>
              <span className="badge confirmed">{t.statusConfirmed}</span>
            </div>
            <button className="btn-small" onClick={() => navigate('/bookings')}>Details</button>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>{t.recentPayment}</h3>
              <p className="stat-value">₹14,500</p>
              <span className="status-badge completed">Paid</span>
            </div>
            <button className="btn-small" onClick={() => navigate('/payments')}>View</button>
          </div>

          <div className="stat-card action-card">
            <div className="stat-icon">🚀</div>
            <h3>Quick Action</h3>
            <button className="btn-primary-small" onClick={() => navigate('/home')}>
              {t.bookNow}
            </button>
          </div>
        </div>

        <div className="bottom-grid">
          <div className="activity-card">
            <div className="card-header">
              <h3>{t.activity}</h3>
              <button className="btn-text" onClick={() => navigate('/queue')}>View {t.liveQueue} ➔</button>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="act-date">Sept 1</div>
                <div className="act-detail">Haryana Regional Center <span className="act-amt">₹14,500</span></div>
                <div className="act-status completed">Done</div>
              </div>
              <div className="activity-item">
                <div className="act-date">Aug 20</div>
                <div className="act-detail">Gurugram Hub <span className="act-amt">₹11,200</span></div>
                <div className="act-status completed">Done</div>
              </div>
              <div className="activity-item">
                <div className="act-date">Sept 12</div>
                <div className="act-detail">Haryana Regional Center <span className="act-amt">-</span></div>
                <div className="act-status pending">Upcoming</div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>{t.tipTitle}</h3>
            <p>{t.tipText}</p>
            <div className="tip-footer">{t.tipFooter}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
