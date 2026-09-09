import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getAppText, isRtl } from '../i18n/appText';
import '../styles/Profile.css';

export default function Profile({ userData }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getAppText(language);
  return <div className="profile-page" dir={isRtl(language)?'rtl':'ltr'}>
    <nav className="page-nav"><button className="nav-back-btn" onClick={()=>navigate('/dashboard')}>← {t.common.back}</button></nav>
    <div className="profile-container">
      <div className="profile-card-main">
        <div className="profile-avatar-section"><div className="avatar-wrapper"><img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt="" className="profile-img"/><div className="verified-badge-main">✓ {t.profile.verified}</div></div></div>
        <div className="profile-header-text"><h1 className="profile-name">{userData?.name || t.common.farmerUser}</h1><p className="profile-location">📍 {userData?.village || 'Haryana'}</p><div className="id-pill"><span className="pill-label">{t.profile.digitalId}:</span> <span className="pill-value">{userData?.farmerId || 'K-12345678'}</span></div></div>
        <button className="btn-profile-edit">{t.profile.edit}</button>
      </div>
      <div className="profile-details-grid">
        <div className="detail-box"><div className="box-header"><span className="box-icon">👤</span><h3 className="box-title">{t.profile.personal}</h3></div><div className="detail-content"><div className="detail-row"><span className="label">{t.profile.phone}:</span> <strong className="value">{userData?.phone || '9876543210'}</strong></div><div className="detail-row"><span className="label">{t.profile.aadhaar}:</span> <strong className="value">XXXX-XXXX-1234</strong></div><div className="detail-row"><span className="label">{t.profile.village}:</span> <strong className="value">{userData?.village || 'Haryana'}</strong></div></div></div>
        <div className="detail-box"><div className="box-header"><span className="box-icon">🛡️</span><h3 className="box-title">{t.profile.verification}</h3></div><div className="detail-content"><div className="kyc-status-wrapper"><div className="kyc-info"><span className="label">{t.profile.kyc}</span><span className="status-text">{t.profile.fullyVerified}</span></div><div className="progress-bar-outer"><div className="progress-bar-inner" style={{width:'100%'}}></div></div></div><div className="verify-item"><span className="v-label">{t.profile.land}</span><span className="status-pill done">{t.profile.linked} ✅</span></div><div className="verify-item"><span className="v-label">{t.profile.bank}</span><span className="status-pill done">{t.profile.linked} ✅</span></div></div></div>
        <div className="detail-box"><div className="box-header"><span className="box-icon">🌾</span><h3 className="box-title">{t.profile.farming}</h3></div><div className="detail-content"><div className="detail-row"><span className="label">{t.profile.crop}:</span> <strong className="value">{t.profile.wheatPaddy}</strong></div><div className="detail-row"><span className="label">{t.profile.area}:</span> <strong className="value">5.2 {t.profile.acres}</strong></div><div className="detail-row"><span className="label">{t.profile.experience}:</span> <strong className="value">12 {t.profile.years}</strong></div></div></div>
        <div className="detail-box"><div className="box-header"><span className="box-icon">⚙️</span><h3 className="box-title">{t.profile.account}</h3></div><div className="detail-content"><div className="detail-row"><span className="label">{t.profile.accountType}:</span> <strong className="value">{t.profile.premium}</strong></div><div className="detail-row"><span className="label">{t.profile.lastLogin}:</span> <strong className="value">{t.profile.today}, 10:30</strong></div><div className="detail-row"><span className="label">{t.profile.notifications}:</span> <strong className="value">{t.profile.enabled} 🔔</strong></div></div></div>
      </div>
    </div>
  </div>;
}
