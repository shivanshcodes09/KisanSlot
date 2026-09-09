import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getAppText, isRtl } from '../i18n/appText';
import '../styles/Bookings.css';

export default function Bookings({ userData }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [filter, setFilter] = useState('all');
  const t = getAppText(language);
  const chooseLanguage = () => { localStorage.removeItem('kisanslot-language'); window.location.reload(); };

  const bookings = [
    { id:'BKN-101', date:'12/09/2026', time:'10:00', center:'Haryana Regional Center', status:'upcoming' },
    { id:'BKN-098', date:'05/09/2026', time:'08:30', center:'Gurugram Hub', status:'completed' },
    { id:'BKN-082', date:'20/08/2026', time:'11:00', center:'Rohtak Center', status:'completed' },
  ];
  const filtered = bookings.filter(b => filter === 'all' || (filter === 'upcoming' ? b.status === 'upcoming' : b.status === 'completed'));

  return <div className="dashboard-layout" dir={isRtl(language) ? 'rtl' : 'ltr'}>
    <aside className="sidebar">
      <div className="sidebar-logo"><img src="/logo.png" alt=""/><span>KisanSlot</span></div>
      <nav className="sidebar-nav">
        <button className="nav-item" onClick={()=>navigate('/dashboard')}>🏠 {t.common.dashboard}</button>
        <button className="nav-item active" onClick={()=>navigate('/bookings')}>📋 {t.common.bookings}</button>
        <button className="nav-item" onClick={()=>navigate('/payments')}>💳 {t.common.payments}</button>
        <button className="nav-item" onClick={()=>navigate('/news')}>📰 {t.common.news}</button>
        <button className="nav-item" onClick={()=>navigate('/msp')}>📈 {t.common.rates}</button>
        <button className="nav-item" onClick={()=>navigate('/profile')}>👤 {t.common.profile}</button>
      </nav>
      <div className="sidebar-footer"><button className="lang-switch-btn" onClick={chooseLanguage}>🌐 {t.common.changeLanguage}</button><button className="logout-btn" onClick={()=>window.location.href='/'}>{t.common.logout} ➔</button></div>
    </aside>
    <main className="main-content">
      <header className="top-bar"><button className="nav-back-btn" onClick={()=>navigate('/dashboard')}>← {t.common.back}</button><div className="user-pill"><img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt=""/><span>{userData?.name || t.common.farmerUser}</span></div></header>
      <div className="bookings-central-container">
        <h1 className="page-title">{t.bookings.title}</h1>
        <div className="filter-tabs"><button className={`tab-btn ${filter==='all'?'active':''}`} onClick={()=>setFilter('all')}>{t.bookings.all}</button><button className={`tab-btn ${filter==='upcoming'?'active':''}`} onClick={()=>setFilter('upcoming')}>{t.common.upcoming}</button><button className={`tab-btn ${filter==='past'?'active':''}`} onClick={()=>setFilter('past')}>{t.bookings.past}</button></div>
        <div className="bookings-table-wrapper"><table className="bookings-table"><thead><tr><th>{t.common.date}</th><th>{t.common.center}</th><th>{t.common.time}</th><th>{t.common.status}</th><th>{t.common.action}</th></tr></thead><tbody>{filtered.map(b=><tr key={b.id}><td>{b.date}</td><td>{b.center}</td><td>{b.time}</td><td><span className={`status-badge ${b.status}`}>{b.status==='upcoming'?t.common.upcoming:t.common.completed}</span></td><td><button className="btn-details" onClick={()=>navigate(`/bookings/${b.id}`)}>{t.bookings.viewDetails}</button></td></tr>)}</tbody></table></div>
      </div>
    </main>
  </div>;
}
