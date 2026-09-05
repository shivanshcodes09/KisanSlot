import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Dashboard.css';

export default function News() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const t = {
    en: {
      title: 'Agricultural News',
      subtitle: 'Stay updated with the latest farming news and government schemes',
      date: 'Date',
      location: 'Location',
      category: 'Category',
      back: 'Back to Dashboard',
      myBookings: 'My Bookings',
      myPayments: 'Payment History',
      myProfile: 'My Profile',
      news: 'News & Updates',
      rates: 'Market Rates',
      langBtn: '🌐 Language',
    },
    hi: {
      title: 'कृषि समाचार',
      subtitle: 'नवीनतम कृषि समाचार और सरकारी योजनाओं से अपडेट रहें',
      date: 'दिनांक',
      location: 'स्थान',
      category: 'श्रेणी',
      back: 'डैशबोर्ड पर वापस जाएं',
      myBookings: 'मेरी बुकिंग',
      myPayments: 'भुगतान इतिहास',
      myProfile: 'मेरी प्रोफाइल',
      news: 'समाचार और अपडेट',
      rates: 'बाजार दरें',
      langBtn: '🌐 भाषा',
    },
  }[language] || { title: 'Agricultural News', subtitle: 'Stay updated with the latest farming news and government schemes', date: 'Date', location: 'Location', category: 'Category', back: 'Back to Dashboard', myBookings: 'My Bookings', myPayments: 'Payment History', myProfile: 'My Profile', news: 'News & Updates', rates: 'Market Rates', langBtn: '🌐 Language' };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const newsItems = [
    {
      id: 1,
      title: { en: 'New Organic Farming Subsidy announced for Haryana', hi: 'हरियाणा के लिए नई जैविक खेती सब्सिडी की घोषणा' },
      description: { en: 'The state government has increased the subsidy for organic fertilizers by 20% for the next season.', hi: 'राज्य सरकार ने अगले सीजन के लिए जैविक उर्वरकों पर सब्सिडी 20% बढ़ा दी है।' },
      date: '2026-09-05',
      location: 'Haryana',
      category: 'Subsidy',
      impact: 'Positive'
    },
    {
      id: 2,
      title: { en: 'Wheat MSP increased for 2026-27 crop year', hi: '2026-27 फसल वर्ष के लिए गेहूं एमएसपी में वृद्धि' },
      description: { en: 'Central government announces a hike in MSP to support wheat farmers against inflation.', hi: 'केंद्र सरकार ने मुद्रास्फीति के खिलाफ गेहूं किसानों की सहायता के लिए एमएसपी में वृद्धि की घोषणा की।' },
      date: '2026-09-03',
      location: 'National',
      category: 'MSP',
      impact: 'High'
    },
    {
      id: 3,
      title: { en: 'Weather Alert: Heavy rainfall expected in Gurugram region', hi: 'मौसम अलर्ट: गुरुग्राम क्षेत्र में भारी बारिश की संभावना' },
      description: { en: 'Farmers are advised to secure harvested crops and avoid spraying pesticides for the next 48 hours.', hi: 'किसानों को कटी हुई फसलों को सुरक्षित करने और अगले 48 घंटों तक कीटनाशकों का छिड़काव न करने की सलाह दी जाती है।' },
      date: '2026-09-04',
      location: 'Gurugram',
      category: 'Weather',
      impact: 'Urgent'
    },
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
          <button className="nav-item active" onClick={() => navigate('/news')}>📰 {t.news}</button>
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
          <h1>{t.title} 📰</h1>
          <p>{t.subtitle}</p>
        </section>

        <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {newsItems.map(item => (
            <div key={item.id} className="activity-card" style={{ marginBottom: '0' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="badge" style={{ backgroundColor: item.impact === 'Urgent' ? '#ff4d4f' : '#e6f7ff', color: item.impact === 'Urgent' ? 'white' : '#1890ff' }}>
                  {item.category}
                </span>
                <span className="act-date">{item.date}</span>
              </div>
              <h3 style={{ margin: '15px 0' }}>{item.title[language] || item.title.en}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>{item.description[language] || item.description.en}</p>
              <div style={{ marginTop: '15px', fontSize: '0.8rem', color: '#999', display: 'flex', justifyContent: 'space-between' }}>
                <span>📍 {item.location}</span>
                <span>{t.location}: {item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
