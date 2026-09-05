import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Dashboard.css';

export default function LiveQueue() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const t = {
    en: {
      title: 'Live Procurement Queue',
      subtitle: 'Real-time status of farmers at the procurement center',
      nowServing: 'Now Serving',
      upNext: 'Up Next',
      farmer: 'Farmer',
      token: 'Token',
      crop: 'Crop',
      estimatedTime: 'Est. Time',
      back: 'Back to Dashboard',
      myBookings: 'My Bookings',
      myPayments: 'Payment History',
      myProfile: 'My Profile',
      news: 'News & Updates',
      rates: 'Market Rates',
      langBtn: '🌐 Language',
    },
    hi: {
      title: 'लाइव खरीद कतार',
      subtitle: 'खरीद केंद्र पर किसानों की वास्तविक समय की स्थिति',
      nowServing: 'अभी सेवा दी जा रही है',
      upNext: 'अगला नंबर',
      farmer: 'किसान',
      token: 'टोकन',
      crop: 'फसल',
      estimatedTime: 'अनुमानित समय',
      back: 'डैशबोर्ड पर वापस जाएं',
      myBookings: 'मेरी बुकिंग',
      myPayments: 'भुगतान इतिहास',
      myProfile: 'मेरी प्रोफाइल',
      news: 'समाचार और अपडेट',
      rates: 'बाजार दरें',
      langBtn: '🌐 भाषा',
    },
  }[language] || { title: 'Live Procurement Queue', subtitle: 'Real-time status of farmers at the procurement center', nowServing: 'Now Serving', upNext: 'Up Next', farmer: 'Farmer', token: 'Token', crop: 'Crop', estimatedTime: 'Est. Time', back: 'Back to Dashboard', myBookings: 'My Bookings', myPayments: 'Payment History', myProfile: 'My Profile', news: 'News & Updates', rates: 'Market Rates', langBtn: '🌐 Language' };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const queueData = {
    nowServing: [
      { token: 'T-101', name: 'Rajesh Kumar', crop: 'Wheat', counter: 'Counter 1' },
      { token: 'T-102', name: 'Suresh Singh', crop: 'Paddy', counter: 'Counter 2' },
    ],
    upNext: [
      { token: 'T-103', name: 'Amit Sharma', crop: 'Wheat', estTime: '15 mins' },
      { token: 'T-104', name: 'Vijay Pal', crop: 'Maize', estTime: '30 mins' },
      { token: 'T-105', name: 'Sanjay Dev', crop: 'Mustard', estTime: '45 mins' },
      { token: 'T-106', name: 'Om Prakash', crop: 'Wheat', estTime: '60 mins' },
    ]
  };

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

      <main className="main-content">
        <header className="top-bar">
          <button className="nav-back-btn" onClick={() => navigate('/dashboard')}>← {t.back}</button>
          <div className="user-pill">
            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt="User" />
            <span>Farmer User</span>
          </div>
        </header>

        <section className="welcome-section">
          <h1>{t.title} ⏳</h1>
          <p>{t.subtitle}</p>
        </section>

        <div className="stats-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="activity-card" style={{ borderLeft: '5px solid #4caf50', marginBottom: '30px' }}>
            <div className="card-header">
              <h3 style={{ color: '#4caf50' }}>🟢 {t.nowServing}</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginTop: '20px' }}>
              {queueData.nowServing.map((item, index) => (
                <div key={index} style={{ padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '10px', border: '1px solid #dcfce7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{item.name}</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{t.crop}: {item.crop}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: '#4caf50' }}>{item.token}</div>
                    <div style={{ fontSize: '0.8rem' }}>{item.counter}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="activity-card">
            <div className="card-header">
              <h3 style={{ color: '#ff9800' }}>🕒 {t.upNext}</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead style={{ backgroundColor: '#fffbf2' }}>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '12px' }}>{t.token}</th>
                  <th style={{ padding: '12px' }}>{t.farmer}</th>
                  <th style={{ padding: '12px' }}>{t.crop}</th>
                  <th style={{ padding: '12px' }}>{t.estimatedTime}</th>
                </tr>
              </thead>
              <tbody>
                {queueData.upNext.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.token}</td>
                    <td style={{ padding: '12px' }}>{item.name}</td>
                    <td style={{ padding: '12px' }}>{item.crop}</td>
                    <td style={{ padding: '12px', color: '#666' }}>{item.estTime}</td>
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
