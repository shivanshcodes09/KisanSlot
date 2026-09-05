import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Bookings.css';

export default function Bookings({ userData }) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [filter, setFilter] = useState('all');

  const t = {
    en: { 
      title: 'My Procurement Schedule', 
      back: 'Back to Dashboard', 
      date: 'Date', 
      center: 'Center', 
      time: 'Time', 
      status: 'Status', 
      all: 'All', 
      upcoming: 'Upcoming', 
      past: 'Past',
      myBookings: 'My Bookings',
      myPayments: 'Payment History',
      myProfile: 'My Profile',
      news: 'News & Updates',
      rates: 'Market Rates',
      langBtn: '🌐 Language'
    },
    hi: { 
      title: 'मेरी बुकिंग अनुसूची', 
      back: 'डैशबोर्ड पर वापस जाएं', 
      date: 'तारीख', 
      center: 'केंद्र', 
      time: 'समय', 
      status: 'स्थिति', 
      all: 'सभी', 
      upcoming: 'आगामी', 
      past: 'बीत चुके',
      myBookings: 'मेरी बुकिंग',
      myPayments: 'भुगतान इतिहास',
      myProfile: 'मेरी प्रोफाइल',
      news: 'समाचार और अपडेट',
      rates: 'बाजार दरें',
      langBtn: '🌐 भाषा'
    },
  }[language] || { title: 'My Bookings', back: 'Back to Dashboard', date: 'Date', center: 'Center', time: 'Time', status: 'Status', all: 'All', upcoming: 'Upcoming', past: 'Past', myBookings: 'My Bookings', myPayments: 'Payment History', myProfile: 'My Profile', news: 'News & Updates', rates: 'Market Rates', langBtn: '🌐 Language' };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const bookings = [
    { id: 'BKN-101', date: 'Sept 12, 2026', time: '10:00 AM', center: 'Haryana Regional Center', status: 'Upcoming', statusClass: 'upcoming' },
    { id: 'BKN-098', date: 'Sept 5, 2026', time: '08:30 AM', center: 'Gurugram Hub', status: 'Completed', statusClass: 'completed' },
    { id: 'BKN-082', date: 'Aug 20, 2026', time: '11:00 AM', center: 'Rohtak Center', status: 'Completed', statusClass: 'completed' },
  ];

  const filteredBookings = bookings.filter(b => {
    if (filter === 'upcoming') return b.status === 'Upcoming';
    if (filter === 'past') return b.status === 'Completed';
    return true;
  });

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Logo" />
          <span>KisanSlot</span>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item" onClick={() => navigate('/dashboard')}>🏠 Dashboard</button>
          <button className="nav-item active" onClick={() => navigate('/bookings')}>📋 {t.myBookings}</button>
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

        <div className="bookings-central-container">
          <h1 className="page-title">{t.title}</h1>
          
          <div className="filter-tabs">
            <button className={`tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>{t.all}</button>
            <button className={`tab-btn ${filter === 'upcoming' ? 'active' : ''}`} onClick={() => setFilter('upcoming')}>{t.upcoming}</button>
            <button className={`tab-btn ${filter === 'past' ? 'active' : ''}`} onClick={() => setFilter('past')}>{t.past}</button>
          </div>

          <div className="bookings-table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>{t.date}</th>
                  <th>{t.center}</th>
                  <th>{t.time}</th>
                  <th>{t.status}</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(b => (
                  <tr key={b.id}>
                    <td>{b.date}</td>
                    <td>{b.center}</td>
                    <td>{b.time}</td>
                    <td><span className={`status-badge ${b.statusClass}`}>{b.status}</span></td>
                    <td>
                      <button className="btn-details" onClick={() => navigate(`/bookings/${b.id}`)}>
                        View Details
                      </button>
                    </td>
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
