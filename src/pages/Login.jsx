import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Auth.css';

const translations = {
  en: {
    title: 'Login to Account',
    subtitle: 'Please enter your details to access your dashboard',
    selectAuth: 'Login Using',
    phone: 'Phone Number',
    farmerId: 'Farmer ID',
    aadhaar: 'Aadhaar Number',
    loginBtn: 'Continue',
    noAccount: "Don't have an account?",
    signup: 'Sign up here',
    welcome: 'Welcome back to KisanSlot!',
  },
  hi: {
    title: 'खाते में लॉगिन करें',
    subtitle: 'अपने डैशबोर्ड तक पहुंचने के लिए विवरण दर्ज करें',
    selectAuth: 'लॉगिन विकल्प चुनें',
    phone: 'फोन नंबर',
    farmerId: 'किसान ID',
    aadhaar: 'आधार नंबर',
    loginBtn: 'आगे बढ़ें',
    noAccount: 'खाता नहीं है?',
    signup: 'यहां साइन अप करें',
    welcome: 'KisanSlot में आपका स्वागत है!',
  },
};

export default function Login({ onSuccess }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  const [authType, setAuthType] = useState('phone');
  const [authValue, setAuthValue] = useState('');

  const handleLogin = () => {
    if (!authValue) {
      alert("Please enter your details");
      return;
    }
    const userData = {
      [authType]: authValue,
      userId: Math.random().toString(36).substr(2, 9),
      name: 'Farmer User',
      phone: '9876543210',
    };
    alert(`${t.welcome}\n${t.selectAuth}: ${authValue}`);
    onSuccess(userData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">{t.title}</h2>
          <p className="auth-subtitle">{t.subtitle}</p>
        </div>

        <div className="auth-type-section">
          <label className="section-label">{t.selectAuth}</label>
          <div className="auth-type-toggle">
            <button 
              className={`type-btn ${authType === 'phone' ? 'active' : ''}`} 
              onClick={() => { setAuthType('phone'); setAuthValue(''); }}
            >
              📱 {t.phone}
            </button>
            <button 
              className={`type-btn ${authType === 'farmerId' ? 'active' : ''}`} 
              onClick={() => { setAuthType('farmerId'); setAuthValue(''); }}
            >
              🆔 {t.farmerId}
            </button>
            <button 
              className={`type-btn ${authType === 'aadhaar' ? 'active' : ''}`} 
              onClick={() => { setAuthType('aadhaar'); setAuthValue(''); }}
            >
              🎟️ {t.aadhaar}
            </button>
          </div>
        </div>

        <div className="auth-form">
          <div className="input-group">
            <label className="input-label">
              {authType === 'phone' && t.phone}
              {authType === 'farmerId' && t.farmerId}
              {authType === 'aadhaar' && t.aadhaar}
            </label>
            <div className="phone-input-wrapper">
              {authType === 'phone' && <span className="country-code">+91</span>}
              <input
                type="text"
                value={authValue}
                onChange={(e) => {
                  const value = e.target.value;
                  const maxLength = authType === 'phone' ? 10 : (authType === 'aadhaar' ? 12 : 20);
                  if (/^\d*$/.test(value) && value.length <= maxLength) {
                    setAuthValue(value);
                  }
                }}
                placeholder={
                  authType === 'phone' ? '0000000000' :
                  authType === 'farmerId' ? 'Enter Farmer ID' :
                  '12-digit Aadhaar number'
                }
                className="auth-input"
              />
            </div>
          </div>

          <button className="btn-auth-submit" onClick={handleLogin}>
            {t.loginBtn} <span className="arrow">➔</span>
          </button>
        </div>

        <p className="auth-footer">
          {t.noAccount} <a onClick={() => navigate('/signup')} className="signup-link">{t.signup}</a>
        </p>
      </div>
    </div>
  );
}