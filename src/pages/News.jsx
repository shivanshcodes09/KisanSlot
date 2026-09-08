import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getAppText, isRtl } from '../i18n/appText';
import '../styles/Dashboard.css';

const fallback = [
  {
    title: 'Karnal farmers seek paddy procurement from September 15',
    source: 'The Tribune',
    pubDate: '2026-09-02T16:32:00+05:30',
    link: 'https://www.tribuneindia.com/news/haryana/karnal-farmers-demand-paddy-procurement-from-sept-15-milk-prices-at-rs-80-100-per-litre-sugarcane-at-rs-600-per-quintal/'
  },
  {
    title: 'Haryana farmer groups raise procurement and payment demands',
    source: 'The Times of India',
    pubDate: '2026-09-03T20:49:00+05:30',
    link: 'https://timesofindia.indiatimes.com/city/chandigarh/farmers-union-delegation-submits-memorandum-to-haryana-agriculture-minister/articleshow/133740130.cms'
  },
  {
    title: 'States review KMS 2026-27 paddy procurement and storage preparedness',
    source: 'Press Information Bureau',
    pubDate: '2026-09-01T20:39:00+05:30',
    link: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2305725&lang=2&reg=48'
  }
];

export default function News() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getAppText(language);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(null);

  const chooseLanguage = () => { localStorage.removeItem('kisanslot-language'); window.location.reload(); };

  const loadNews = async () => {
    setLoading(true); setError(false);
    try {
      const r = await fetch('/api/news');
      if (!r.ok) throw new Error('news fetch failed');
      const data = await r.json();
      setItems(Array.isArray(data.items) && data.items.length ? data.items : fallback);
      setUpdatedAt(data.updatedAt || new Date().toISOString());
    } catch (e) {
      setItems(fallback);
      setUpdatedAt(new Date().toISOString());
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadNews(); }, []);

  const visible = useMemo(() => items.slice(0, 9), [items]);
  const fmt = (d) => {
    try { return new Date(d).toLocaleString(undefined, { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' }); }
    catch { return d; }
  };

  return <div className="dashboard-layout" dir={isRtl(language)?'rtl':'ltr'}>
    <aside className="sidebar"><div className="sidebar-logo"><img src="/logo.png" alt=""/><span>KisanSlot</span></div><nav className="sidebar-nav">
      <button className="nav-item" onClick={()=>navigate('/dashboard')}>🏠 {t.common.dashboard}</button><button className="nav-item" onClick={()=>navigate('/bookings')}>📋 {t.common.bookings}</button><button className="nav-item" onClick={()=>navigate('/payments')}>💳 {t.common.payments}</button><button className="nav-item active" onClick={()=>navigate('/news')}>📰 {t.common.news}</button><button className="nav-item" onClick={()=>navigate('/msp')}>📈 {t.common.rates}</button><button className="nav-item" onClick={()=>navigate('/profile')}>👤 {t.common.profile}</button>
    </nav><div className="sidebar-footer"><button className="lang-switch-btn" onClick={chooseLanguage}>🌐 {t.common.changeLanguage}</button><button className="logout-btn" onClick={()=>window.location.href='/'}>{t.common.logout} ➔</button></div></aside>

    <main className="main-content"><header className="top-bar"><button className="nav-back-btn" onClick={()=>navigate('/dashboard')}>← {t.common.back}</button><div className="user-pill"><img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt=""/><span>{t.common.farmerUser}</span></div></header>
      <section className="welcome-section"><div style={{display:'flex',justifyContent:'space-between',gap:16,alignItems:'end',flexWrap:'wrap'}}><div><h1>{t.news.title} 📰</h1><p>{t.news.subtitle}</p></div><button onClick={loadNews} className="btn-small" style={{padding:'10px 16px'}}>↻ Refresh Live News</button></div></section>

      <div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center',margin:'10px 0 20px'}}>
        <span style={{background:'#e8f5ec',color:'#1B4D2E',padding:'7px 11px',borderRadius:18,fontWeight:700,fontSize:12}}>● LIVE AGRI FEED</span>
        <span style={{fontSize:12,color:'#7b8a82'}}>Agriculture • MSP • Procurement • Haryana</span>
        {updatedAt && <span style={{fontSize:12,color:'#7b8a82'}}>Updated {fmt(updatedAt)}</span>}
        {error && <span style={{fontSize:12,color:'#a05a00'}}>Live feed unavailable — showing verified fallback stories</span>}
      </div>

      {loading ? <div className="activity-card" style={{padding:30}}>Fetching latest agriculture news…</div> :
      <div className="news-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'20px',marginTop:'20px'}}>
        {visible.map((item,i)=><article key={`${item.title}-${i}`} className="activity-card" style={{marginBottom:0,display:'flex',flexDirection:'column',minHeight:250}}>
          <div className="card-header" style={{display:'flex',justifyContent:'space-between',gap:10,alignItems:'start'}}><span className="badge" style={{backgroundColor:'#e6f7ff',color:'#126c8c'}}>{item.source || 'News'}</span><span className="act-date">{fmt(item.pubDate)}</span></div>
          <h3 style={{margin:'15px 0',lineHeight:1.35}}>{item.title}</h3>
          <p style={{color:'#66756d',fontSize:'.9rem',lineHeight:1.5,flex:1}}>Fresh update related to farming, procurement, MSP or mandi operations. Open the source for full details.</p>
          <a href={item.link} target="_blank" rel="noreferrer" style={{marginTop:14,color:'#1B4D2E',fontWeight:800,textDecoration:'none'}}>Read source ↗</a>
        </article>)}
      </div>}
    </main>
  </div>;
}
