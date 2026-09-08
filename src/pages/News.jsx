import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getAppText, isRtl } from '../i18n/appText';
import '../styles/Dashboard.css';

export default function News() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getAppText(language);
  const chooseLanguage = () => { localStorage.removeItem('kisanslot-language'); window.location.reload(); };
  const items = [
    {id:1,title:t.news.n1,description:t.news.d1,date:'05/09/2026',location:'Haryana',category:t.news.subsidy,urgent:false},
    {id:2,title:t.news.n2,description:t.news.d2,date:'03/09/2026',location:'India',category:t.news.msp,urgent:false},
    {id:3,title:t.news.n3,description:t.news.d3,date:'04/09/2026',location:'Gurugram',category:t.news.weather,urgent:true},
  ];
  return <div className="dashboard-layout" dir={isRtl(language)?'rtl':'ltr'}>
    <aside className="sidebar"><div className="sidebar-logo"><img src="/logo.png" alt=""/><span>KisanSlot</span></div><nav className="sidebar-nav">
      <button className="nav-item" onClick={()=>navigate('/dashboard')}>🏠 {t.common.dashboard}</button><button className="nav-item" onClick={()=>navigate('/bookings')}>📋 {t.common.bookings}</button><button className="nav-item" onClick={()=>navigate('/payments')}>💳 {t.common.payments}</button><button className="nav-item active" onClick={()=>navigate('/news')}>📰 {t.common.news}</button><button className="nav-item" onClick={()=>navigate('/msp')}>📈 {t.common.rates}</button><button className="nav-item" onClick={()=>navigate('/profile')}>👤 {t.common.profile}</button>
    </nav><div className="sidebar-footer"><button className="lang-switch-btn" onClick={chooseLanguage}>🌐 {t.common.changeLanguage}</button><button className="logout-btn" onClick={()=>window.location.href='/'}>{t.common.logout} ➔</button></div></aside>
    <main className="main-content"><header className="top-bar"><button className="nav-back-btn" onClick={()=>navigate('/dashboard')}>← {t.common.back}</button><div className="user-pill"><img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt=""/><span>{t.common.farmerUser}</span></div></header>
      <section className="welcome-section"><h1>{t.news.title} 📰</h1><p>{t.news.subtitle}</p></section>
      <div className="news-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'20px',marginTop:'20px'}}>{items.map(item=><div key={item.id} className="activity-card" style={{marginBottom:0}}><div className="card-header"><span className="badge" style={{backgroundColor:item.urgent?'#ff4d4f':'#e6f7ff',color:item.urgent?'white':'#1890ff'}}>{item.category}</span><span className="act-date">{item.date}</span></div><h3 style={{margin:'15px 0'}}>{item.title}</h3><p style={{color:'#666',fontSize:'.9rem',lineHeight:1.5}}>{item.description}</p><div style={{marginTop:'15px',fontSize:'.8rem',color:'#999'}}>📍 {t.news.location}: {item.location}</div></div>)}</div>
    </main>
  </div>;
}
