import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';
import '../styles/Auth.css';

const translations = {
  en: {
    signup: 'Create Account',
    name: 'Full Name',
    phone: 'Phone Number',
    farmerId: 'Farmer ID',
    aadhaar: 'Aadhaar Number',
    email: 'Email (Optional)',
    selectAuth: 'Sign Up Using',
    signupBtn: 'Create Account',
    already: 'Already have an account?',
    login: 'Login here',
    welcome: 'Welcome to KisanSlot!',
    successTitle: 'Account Created Successfully! 🎉',
    successMsg: 'Welcome to the KisanSlot community. Your digital farming journey begins here!',
  },
  hi: {
    signup: 'खाता बनाएं',
    name: 'पूरा नाम',
    phone: 'फोन नंबर',
    farmerId: 'किसान ID',
    aadhaar: 'आधार नंबर',
    email: 'ईमेल (वैकल्पिक)',
    selectAuth: 'इसका उपयोग करके साइन अप करें',
    signupBtn: 'खाता बनाएं',
    already: 'पहले से खाता है?',
    login: 'यहां लॉगिन करें',
    welcome: 'KisanSlot में आपका स्वागत है!',
    successTitle: 'खाता सफलतापूर्वक बनाया गया! 🎉',
    successMsg: 'KisanSlot समुदाय में आपका स्वागत है। आपकी डिजिटल खेती की यात्रा यहाँ से शुरू होती है!',
  },
};

export default function Signup({ onSuccess }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  const [authType, setAuthType] = useState('phone');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    farmerId: '',
    aadhaar: '',
    email: '',
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1B4D2E', '#F4D03F', '#FFFFFF', '#2D7A3E']
    });
  };

  const handleSignup = () => {
    if (!formData.name || !formData.phone) {
      alert('Please fill in required fields');
      return;
    }

    // Simulate API call
    const userData = { ...formData, authType, userId: Math.random().toString(36).substr(2, 9) };
    
    triggerCelebration();
    setShowPopup(true);
    
    // Delay transition to dashboard to allow user to see the celebration
    setTimeout(() => {
      onSuccess(userData);
    }, 3000);
  };

  return (
    <div className="auth-container">
      {showPopup && (
        <div className="celebration-overlay">
          <div className="celebration-popup">
            <div className="popup-icon">🎉</div>
            <h2 className="popup-title">{t.successTitle}</h2>
            <p className="popup-msg">{t.successMsg}</p>
            <div className="popup-loader">Redirecting to Dashboard...</div>
          </div>
        </div>
      )}

      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">{t.signup}</h2>
          <p className="auth-subtitle">Join the revolution in agricultural procurement</p>
        </div>

        <div className="auth-type-section">
          <label className="section-label">{t.selectAuth}</label>
          <div className="auth-type-toggle">
            <button 
              className={`type-btn ${authType === 'phone' ? 'active' : ''}`} 
              onClick={() => setAuthType('phone')}
            >
              📱 {t.phone}
            </button>
            <button 
              className={`type-btn ${authType === 'farmerId' ? 'active' : ''}`} 
              onClick={() => setAuthType('farmerId')}
            >
              🆔 {t.farmerId}
            </button>
            <button 
              className={`type-btn ${authType === 'aadhaar' ? 'active' : ''}`} 
              onClick={() => setAuthType('aadhaar')}
            >
              🎟️ {t.aadhaar}
            </button>
          </div>
        </div>

        <div className="auth-form">
          <div className="input-group">
            <label className="input-label">{t.name}</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className="auth-input" />
          </div>

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
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  const maxLength = authType === 'phone' ? 10 : (authType === 'aadhaar' ? 12 : 20);
                  if (/^\d*$/.test(value) && value.length <= maxLength) {
                    setFormData({ ...formData, phone: value });
                  }
                }}
                placeholder="0000000000"
                className="auth-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">{t.email}</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" className="auth-input" />
          </div>

          <button className="btn-auth-submit" onClick={handleSignup}>
            {t.signupBtn} <span className="arrow">➔</span>
          </button>
        </div>

        <p className="auth-footer">
          {t.already} <a onClick={() => navigate('/login')} className="signup-link">{t.login}</a>
        </p>
      </div>
    </div>
  );
}
