import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getAppText, isRtl } from '../i18n/appText';
import '../styles/Dashboard.css';

export default function Dashboard({ userData }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const t = getAppText(language);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = currentTime.getHours() < 12 ? t.dash.morning : currentTime.getHours() < 17 ? t.dash.afternoon : t.dash.evening;
  const chooseLanguage = () => { localStorage.removeItem('kisanslot-language'); window.location.reload(); };
  const farmerName = userData?.name || t.common.farmerUser;

  return (
    <div className="dashboard-layout" dir={isRtl(language) ? 'rtl' : 'ltr'}>
      <aside className="sidebar">
        <div className="sidebar-logo"><img src="/logo.png" alt="" /><span>KisanSlot</span></div>
        <nav className="sidebar-nav">
          <button className="nav-item active" onClick={() => navigate('/dashboard')}>🏠 {t.common.dashboard}</button>
          <button className="nav-item" onClick={() => navigate('/bookings')}>📋 {t.common.bookings}</button>
          <button className="nav-item" onClick={() => navigate('/payments')}>💳 {t.common.payments}</button>
          <button className="nav-item" onClick={() => navigate('/news')}>📰 {t.common.news}</button>
          <button className="nav-item" onClick={() => navigate('/msp')}>📈 {t.common.rates}</button>
          <button className="nav-item" onClick={() => navigate('/profile')}>👤 {t.common.profile}</button>
        </nav>
        <div className="sidebar-footer">
          <button className="lang-switch-btn" onClick={chooseLanguage}>🌐 {t.common.changeLanguage}</button>
          <button className="logout-btn" onClick={() => window.location.href = '/'}>{t.common.logout} ➔</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="time-weather">
            <span className="current-time">{currentTime.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'})}</span>
            <span className="weather-widget">☀️ 32°C | {t.dash.weather}</span>
          </div>
          <div className="user-pill"><img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt="" /><span>{farmerName}</span></div>
        </header>

        <section className="welcome-section"><h1>{greeting}, {farmerName}! 👋</h1><p>{t.dash.welcome}</p></section>

        <div className="price-ticker" onClick={() => navigate('/msp')} style={{ cursor:'pointer' }}>
          <div className="ticker-label">{t.dash.price}:</div>
          <div className="ticker-wrap"><div className="ticker-content">
            <span>{t.dash.wheat}: ₹2,275{t.dash.unit} 🟢</span><span>{t.dash.paddy}: ₹2,183{t.dash.unit} 🟢</span><span>{t.dash.maize}: ₹2,090{t.dash.unit} 🔴</span><span>{t.dash.mustard}: ₹5,450{t.dash.unit} 🟢</span>
          </div></div>
        </div>

        <div className="stats-grid">
          <div className="stat-card priority"><div className="stat-icon">📅</div><div className="stat-info"><h3>{t.dash.nextSlot}</h3><p className="stat-value">12/09/2026, 10:00</p><span className="badge confirmed">{t.dash.confirmed}</span></div><button className="btn-small" onClick={() => navigate('/bookings')}>{t.common.details}</button></div>
          <div className="stat-card"><div className="stat-icon">💰</div><div className="stat-info"><h3>{t.dash.lastPayment}</h3><p className="stat-value">₹14,500</p><span className="status-badge completed">{t.common.paid}</span></div><button className="btn-small" onClick={() => navigate('/payments')}>{t.common.view}</button></div>
          <div className="stat-card action-card"><div className="stat-icon">🚀</div><h3>{t.dash.quickAction}</h3><button className="btn-primary-small" onClick={() => navigate('/bookings')}>{t.dash.bookNew}</button></div>
        </div>

        <div className="bottom-grid">
          <div className="activity-card"><div className="card-header"><h3>{t.dash.recent}</h3><button className="btn-text" onClick={() => navigate('/queue')}>{t.dash.viewQueue} ➔</button></div><div className="activity-list">
            <div className="activity-item"><div className="act-date">01/09</div><div className="act-detail">Haryana Regional Center <span className="act-amt">₹14,500</span></div><div className="act-status completed">{t.common.done}</div></div>
            <div className="activity-item"><div className="act-date">20/08</div><div className="act-detail">Gurugram Hub <span className="act-amt">₹11,200</span></div><div className="act-status completed">{t.common.done}</div></div>
            <div className="activity-item"><div className="act-date">12/09</div><div className="act-detail">Haryana Regional Center <span className="act-amt">-</span></div><div className="act-status pending">{t.common.upcoming}</div></div>
          </div></div>
          <div className="info-card"><h3>🌾 {t.dash.tipTitle}</h3><p>{t.dash.tip}</p></div>
        </div>
      </main>
    </div>
  );
}
