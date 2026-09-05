import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Profile.css';

export default function Profile({ userData }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = {
    en: { 
      title: 'Farmer Digital Profile', 
      edit: 'Edit Profile', 
      back: 'Back to Dashboard', 
      personal: 'Personal Information', 
      verification: 'Verification & KYC', 
      farming: 'Farming Details', 
      account: 'Account Settings',
      phone: 'Phone Number', 
      aadhaar: 'Aadhaar Number', 
      village: 'Village/City', 
      kyc: 'KYC Status', 
      land: 'Land Records', 
      bank: 'Bank Account',
      crop: 'Primary Crop',
      area: 'Cultivated Area',
      experience: 'Experience'
    },
    hi: { 
      title: 'किसान डिजिटल प्रोफाइल', 
      edit: 'प्रोफाइल संपादित करें', 
      back: 'डैशबोर्ड पर वापस जाएं', 
      personal: 'व्यक्तिगत जानकारी', 
      verification: 'सत्यापन और केवाईसी', 
      farming: 'खेती का विवरण', 
      account: 'खाता सेटिंग्स',
      phone: 'फ़ोन नंबर', 
      aadhaar: 'आधार नंबर', 
      village: 'गाँव/शहर', 
      kyc: 'केवाईसी स्थिति', 
      land: 'भूमि रिकॉर्ड', 
      bank: 'बैंक खाता',
      crop: 'मुख्य फसल',
      area: 'खेती का क्षेत्र',
      experience: 'अनुभव'
    },
  }[language] || { title: 'Farmer Digital Profile', edit: 'Edit Profile', back: 'Back to Dashboard', personal: 'Personal Information', verification: 'Verification & KYC', farming: 'Farming Details', account: 'Account Settings', phone: 'Phone Number', aadhaar: 'Aadhaar Number', village: 'Village/City', kyc: 'KYC Status', land: 'Land Records', bank: 'Bank Account', crop: 'Primary Crop', area: 'Cultivated Area', experience: 'Experience' };

  return (
    <div className="profile-page">
      <nav className="page-nav">
        <button className="nav-back-btn" onClick={() => navigate('/dashboard')}>← {t.back}</button>
      </nav>
      
      <div className="profile-container">
        {/* TOP PROFILE CARD */}
        <div className="profile-card-main">
          <div className="profile-avatar-section">
            <div className="avatar-wrapper">
              <img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt="User" className="profile-img" />
              <div className="verified-badge-main">✓ Verified</div>
            </div>
          </div>
          <div className="profile-header-text">
            <h1 className="profile-name">{userData?.name || 'Farmer User'}</h1>
            <p className="profile-location">📍 {userData?.village || 'Haryana, India'}</p>
            <div className="id-pill">
              <span className="pill-label">Digital ID:</span> 
              <span className="pill-value">{userData?.farmerId || 'K-12345678'}</span>
            </div>
          </div>
          <button className="btn-profile-edit">{t.edit}</button>
        </div>

        {/* DETAILS GRID */}
        <div className="profile-details-grid">
          {/* Personal Details */}
          <div className="detail-box">
            <div className="box-header">
              <span className="box-icon">👤</span>
              <h3 className="box-title">{t.personal}</h3>
            </div>
            <div className="detail-content">
              <div className="detail-row"><span className="label">{t.phone}:</span> <strong className="value">{userData?.phone || '9876543210'}</strong></div>
              <div className="detail-row"><span className="label">{t.aadhaar}:</span> <strong className="value">XXXX-XXXX-1234</strong></div>
              <div className="detail-row"><span className="label">{t.village}:</span> <strong className="value">{userData?.village || 'Haryana'}</strong></div>
            </div>
          </div>

          {/* Verification Details */}
          <div className="detail-box">
            <div className="box-header">
              <span className="box-icon">🛡️</span>
              <h3 className="box-title">{t.verification}</h3>
            </div>
            <div className="detail-content">
              <div className="kyc-status-wrapper">
                <div className="kyc-info">
                  <span className="label">{t.kyc}</span>
                  <span className="status-text">Fully Verified</span>
                </div>
                <div className="progress-bar-outer">
                  <div className="progress-bar-inner" style={{width: '100%'}}></div>
                </div>
              </div>
              <div className="verify-item">
                <span className="v-label">{t.land}</span>
                <span className="status-pill done">Linked ✅</span>
              </div>
              <div className="verify-item">
                <span className="v-label">{t.bank}</span>
                <span className="status-pill done">Linked ✅</span>
              </div>
            </div>
          </div>

          {/* Farming Details */}
          <div className="detail-box">
            <div className="box-header">
              <span className="box-icon">🌾</span>
              <h3 className="box-title">{t.farming}</h3>
            </div>
            <div className="detail-content">
              <div className="detail-row"><span className="label">{t.crop}:</span> <strong className="value">Wheat, Paddy</strong></div>
              <div className="detail-row"><span className="label">{t.area}:</span> <strong className="value">5.2 Acres</strong></div>
              <div className="detail-row"><span className="label">{t.experience}:</span> <strong className="value">12 Years</strong></div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="detail-box">
            <div className="box-header">
              <span className="box-icon">⚙️</span>
              <h3 className="box-title">{t.account}</h3>
            </div>
            <div className="detail-content">
              <div className="detail-row"><span className="label">Account Type:</span> <strong className="value">Premium Farmer</strong></div>
              <div className="detail-row"><span className="label">Last Login:</span> <strong className="value">Today, 10:30 AM</strong></div>
              <div className="detail-row"><span className="label">Notifications:</span> <strong className="value">Enabled 🔔</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
