import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getAppText, isRtl } from '../i18n/appText';
import '../styles/Dashboard.css';

export default function News() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getAppText(language);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatedAt, setUpdatedAt] = useState(null);
  const [live, setLive] = useState(false);

  const chooseLanguage = () => {
    localStorage.removeItem('kisanslot-language');
    window.location.reload();
  };

  const loadNews = async () => {
    setLoading(true);
    setError('');
    try {
      const r = await fetch(`/api/news?t=${Date.now()}`, { cache: 'no-store' });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || 'Live feed failed');
      const fresh = Array.isArray(data.items) ? data.items : [];
      setItems(fresh);
      setUpdatedAt(data.updatedAt || new Date().toISOString());
      setLive(Boolean(data.live && fresh.length));
      if (!fresh.length) setError('No fresh agriculture stories were returned right now.');
    } catch (e) {
      setItems([]);
      setLive(false);
      setUpdatedAt(new Date().toISOString());
      setError('Live agriculture feed is temporarily unavailable. Please refresh in a moment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadNews(); }, []);

  const visible = useMemo(() => items.slice(0, 12), [items]);
  const fmt = (d) => {
    try {
      return new Date(d).toLocaleString(undefined, {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return d;
    }
  };

  return <div className="dashboard-layout" dir={isRtl(language) ? 'rtl' : 'ltr'}>
    <aside className="sidebar">
      <div className="sidebar-logo"><img src="/logo.png" alt=""/><span>KisanSlot</span></div>
      <nav className="sidebar-nav">
        <button className="nav-item" onClick={()=>navigate('/dashboard')}>🏠 {t.common.dashboard}</button>
        <button className="nav-item" onClick={()=>navigate('/bookings')}>📋 {t.common.bookings}</button>
        <button className="nav-item" onClick={()=>navigate('/payments')}>💳 {t.common.payments}</button>
        <button className="nav-item active" onClick={()=>navigate('/news')}>📰 {t.common.news}</button>
        <button className="nav-item" onClick={()=>navigate('/msp')}>📈 {t.common.rates}</button>
        <button className="nav-item" onClick={()=>navigate('/profile')}>👤 {t.common.profile}</button>
      </nav>
      <div className="sidebar-footer">
        <button className="lang-switch-btn" onClick={chooseLanguage}>🌐 {t.common.changeLanguage}</button>
        <button className="logout-btn" onClick={()=>window.location.href='/'}>{t.common.logout} ➔</button>
      </div>
    </aside>

    <main className="main-content">
      <header className="top-bar">
        <button className="nav-back-btn" onClick={()=>navigate('/dashboard')}>← {t.common.back}</button>
        <div className="user-pill"><img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt=""/><span>{t.common.farmerUser}</span></div>
      </header>

      <section className="welcome-section">
        <div style={{display:'flex',justifyContent:'space-between',gap:16,alignItems:'end',flexWrap:'wrap'}}>
          <div>
            <h1>{t.news.title} 📰</h1>
            <p>{t.news.subtitle}</p>
          </div>
          <button onClick={loadNews} className="btn-small" style={{padding:'10px 16px'}}>↻ Refresh Live News</button>
        </div>
      </section>

      <div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center',margin:'10px 0 22px'}}>
        <span style={{background:live?'#e8f5ec':'#fff3e5',color:live?'#1B4D2E':'#9a5a00',padding:'7px 11px',borderRadius:18,fontWeight:800,fontSize:12}}>
          {live ? '● LIVE • LAST 7 DAYS' : '● LIVE FEED CHECK'}
        </span>
        <span style={{fontSize:12,color:'#7b8a82'}}>Agriculture • MSP • Procurement • Haryana • FCI</span>
        {updatedAt && <span style={{fontSize:12,color:'#7b8a82'}}>Updated {fmt(updatedAt)}</span>}
      </div>

      {loading && <div className="activity-card" style={{padding:30,fontWeight:700}}>Fetching fresh agriculture news…</div>}

      {!loading && error && <div className="activity-card" style={{padding:26,border:'1px solid #f0c98b',background:'#fffaf2'}}>
        <div style={{fontWeight:900,color:'#8a4f00',marginBottom:8}}>Live feed status</div>
        <div style={{color:'#6f6558'}}>{error}</div>
        <button onClick={loadNews} className="btn-small" style={{marginTop:14,padding:'9px 14px'}}>Try Again</button>
      </div>}

      {!loading && visible.length > 0 && <div className="news-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'20px',marginTop:'20px'}}>
        {visible.map((item,i)=><article key={`${item.title}-${i}`} className="activity-card" style={{marginBottom:0,display:'flex',flexDirection:'column',minHeight:245}}>
          <div className="card-header" style={{display:'flex',justifyContent:'space-between',gap:10,alignItems:'start'}}>
            <span className="badge" style={{backgroundColor:'#e6f7ff',color:'#126c8c'}}>{item.source || 'News source'}</span>
            <span className="act-date">{fmt(item.pubDate)}</span>
          </div>
          <h3 style={{margin:'15px 0',lineHeight:1.35}}>{item.title}</h3>
          <div style={{marginTop:'auto',display:'flex',justifyContent:'space-between',gap:12,alignItems:'center'}}>
            <span style={{fontSize:12,color:'#7b8a82'}}>Fresh agriculture update</span>
            <a href={item.link} target="_blank" rel="noreferrer" style={{color:'#1B4D2E',fontWeight:900,textDecoration:'none'}}>Read full story ↗</a>
          </div>
        </article>)}
      </div>}
    </main>
  </div>;
}
