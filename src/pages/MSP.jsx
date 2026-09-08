import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getAppText, isRtl } from '../i18n/appText';
import '../styles/Dashboard.css';

export default function MSP() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getAppText(language);
  const chooseLanguage = () => { localStorage.removeItem('kisanslot-language'); window.location.reload(); };
  const data = [
    {name:t.dash.wheat, price:'₹2,275', trend:`🟢 ${t.msp.up}`},
    {name:t.dash.paddy, price:'₹2,183', trend:`🟢 ${t.msp.up}`},
    {name:t.dash.maize, price:'₹2,090', trend:`🔴 ${t.msp.down}`},
    {name:t.dash.mustard, price:'₹5,450', trend:`🟢 ${t.msp.up}`},
    {name:t.msp.cotton, price:'₹6,620', trend:`🟡 ${t.msp.stable}`},
    {name:t.msp.soybean, price:'₹4,856', trend:`🟢 ${t.msp.up}`},
  ];
  return <div className="dashboard-layout" dir={isRtl(language)?'rtl':'ltr'}>
    <aside className="sidebar"><div className="sidebar-logo"><img src="/logo.png" alt=""/><span>KisanSlot</span></div><nav className="sidebar-nav">
      <button className="nav-item" onClick={()=>navigate('/dashboard')}>🏠 {t.common.dashboard}</button><button className="nav-item" onClick={()=>navigate('/bookings')}>📋 {t.common.bookings}</button><button className="nav-item" onClick={()=>navigate('/payments')}>💳 {t.common.payments}</button><button className="nav-item" onClick={()=>navigate('/news')}>📰 {t.common.news}</button><button className="nav-item active" onClick={()=>navigate('/msp')}>📈 {t.common.rates}</button><button className="nav-item" onClick={()=>navigate('/profile')}>👤 {t.common.profile}</button>
    </nav><div className="sidebar-footer"><button className="lang-switch-btn" onClick={chooseLanguage}>🌐 {t.common.changeLanguage}</button><button className="logout-btn" onClick={()=>window.location.href='/'}>{t.common.logout} ➔</button></div></aside>
    <main className="main-content"><header className="top-bar"><button className="nav-back-btn" onClick={()=>navigate('/dashboard')}>← {t.common.back}</button><div className="user-pill"><img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt=""/><span>{t.common.farmerUser}</span></div></header>
      <section className="welcome-section"><h1>{t.msp.title} 🌾</h1><p>{t.msp.subtitle}</p></section>
      <div className="stats-grid" style={{gridTemplateColumns:'1fr'}}><div className="activity-card" style={{width:'100%'}}><div className="card-header"><h3>{t.msp.lastUpdated}: {new Date().toLocaleDateString()}</h3></div><table style={{width:'100%',borderCollapse:'collapse',marginTop:'20px'}}><thead style={{backgroundColor:'#f8f9fa'}}><tr style={{textAlign:'left',borderBottom:'2px solid #eee'}}><th style={{padding:'12px'}}>{t.msp.crop}</th><th style={{padding:'12px'}}>{t.msp.price}</th><th style={{padding:'12px'}}>{t.msp.trend}</th></tr></thead><tbody>{data.map((x,i)=><tr key={i} style={{borderBottom:'1px solid #eee'}}><td style={{padding:'12px',fontWeight:'bold'}}>{x.name}</td><td style={{padding:'12px'}}>{x.price}</td><td style={{padding:'12px'}}>{x.trend}</td></tr>)}</tbody></table></div></div>
    </main>
  </div>;
}
