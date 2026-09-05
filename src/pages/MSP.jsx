import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Dashboard.css';

export default function MSP() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const t = {
    en: {
      title: 'Live Market Prices (MSP)',
      subtitle: 'Latest Minimum Support Prices for your crops',
      crop: 'Crop',
      price: 'MSP (per Quintal)',
      trend: 'Trend',
      back: 'Back to Dashboard',
      lastUpdated: 'Last Updated',
      myBookings: 'My Bookings',
      myPayments: 'Payment History',
      myProfile: 'My Profile',
      news: 'News & Updates',
      rates: 'Market Rates',
      langBtn: '🌐 Language',
    },
    hi: {
      title: 'लाइव बाजार मूल्य (एमएसपी)',
      subtitle: 'आपकी फसलों के लिए नवीनतम न्यूनतम समर्थन मूल्य',
      crop: 'फसल',
      price: 'एमएसपी (प्रति क्विंटल)',
      trend: 'रुझान',
      back: 'डैशबोर्ड पर वापस जाएं',
      lastUpdated: 'अंतिम अपडेट',
      myBookings: 'मेरी बुकिंग',
      myPayments: 'भुगतान इतिहास',
      myProfile: 'मेरी प्रोफाइल',
      news: 'समाचार और अपडेट',
      rates: 'बाजार दरें',
      langBtn: '🌐 भाषा',
    },
  }[language] || { title: 'Live Market Prices (MSP)', subtitle: 'Latest Minimum Support Prices for your crops', crop: 'Crop', price: 'MSP (per Quintal)', trend: 'Trend', back: 'Back to Dashboard', lastUpdated: 'Last Updated', myBookings: 'My Bookings', myPayments: 'Payment History', myProfile: 'My Profile', news: 'News & Updates', rates: 'Market Rates', langBtn: '🌐 Language' };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const mspData = [
    { name: { en: 'Wheat', hi: 'गेहूँ' }, price: '₹2,275', trend: '🟢 Up', color: 'green' },
    { name: { en: 'Paddy', hi: 'धान' }, price: '₹2,183', trend: '🟢 Up', color: 'green' },
    { name: { en: 'Maize', hi: 'मक्का' }, price: '₹2,090', trend: '🔴 Down', color: 'red' },
    { name: { en: 'Mustard', hi: 'सरसों' }, price: '₹5,450', trend: '🟢 Up', color: 'green' },
    { name: { en: 'Cotton', hi: 'कपास' }, price: '₹6,620', trend: '🟡 Stable', color: 'yellow' },
    { name: { en: 'Soybean', hi: 'सोयाबीन' }, price: '₹4,856', trend: '🟢 Up', color: 'green' },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Logo" />
          <span>KisanSlot</span>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item" onClick={() => navigate('/dashboard')}>🏠 Dashboard</button>
          <button className="nav-item" onClick={() => navigate('/bookings')}>📋 {t.myBookings}</button>
          <button className="nav-item" onClick={() => navigate('/payments')}>💳 {t.myPayments}</button>
          <button className="nav-item" onClick={() => navigate('/news')}>📰 {t.news}</button>
          <button className="nav-item active" onClick={() => navigate('/msp')}>📈 {t.rates}</button>
          <button className="nav-item" onClick={() => navigate('/profile')}>👤 {t.myProfile}</button>
        </nav>
        <div className="sidebar-footer">
          <button className="lang-switch-btn" onClick={toggleLanguage}>
            {t.langBtn} {language === 'en' ? '➔ HI' : '➔ EN'}
          </button>
          <button className="logout-btn" onClick={() => window.location.href = '/'}>Logout ➔</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <button className="nav-back-btn" onClick={() => navigate('/dashboard')}>← {t.back}</button>
          <div className="user-pill">
            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt="User" />
            <span>Farmer User</span>
          </div>
        </header>

        <section className="welcome-section">
          <h1>{t.title} 🌾</h1>
          <p>{t.subtitle}</p>
        </section>

        <div className="stats-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="activity-card" style={{ width: '100%' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{t.lastUpdated}: {new Date().toLocaleDateString()}</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead style={{ backgroundColor: '#f8f9fa' }}>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '12px' }}>{t.crop}</th>
                  <th style={{ padding: '12px' }}>{t.price}</th>
                  <th style={{ padding: '12px' }}>{t.trend}</th>
                </tr>
              </thead>
              <tbody>
                {mspData.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.name[language] || item.name.en}</td>
                    <td style={{ padding: '12px' }}>{item.price}</td>
                    <td style={{ padding: '12px', color: item.color }}>{item.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
