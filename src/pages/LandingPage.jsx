import React, { useState } from 'react'; // FIXED: Added useState here
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/LandingPage.css';

const translations = {
  en: {
    signup: 'Join Now', login: 'Farmer Login', tagline: 'Restoring Dignity and Time to the Indian Farmer',
    farmers: 'Farmers Empowered', hours: 'Hours Recovered', income: 'Income Boosted',
    problemTitle: 'The Silent Struggle of our Farmers',
    problemDesc: 'For decades, the procurement process has been a test of endurance. Farmers travel miles only to stand in chaotic queues for hours, losing wages and fuel. This inefficiency costs livelihoods.',
    solutionTitle: 'The KisanSlot Revolution',
    solutionDesc: 'We replace chaos with precision. By digitizing the queue, we ensure that the farmer is the priority, not the process.',
    featureTitle: 'Engineered for the Grassroots',
    feature1: '⚡ Instant Slot Booking', feature2: '📱 SMS & WhatsApp Alerts',
    feature3: '💰 Zero-Middleman Transparency', feature4: '🌾 22+ Regional Languages',
    feature5: '📉 Real-time Queue Tracking', feature6: '🏦 Integrated Payment Status',
    aboutTitle: 'Our Vision',
    aboutDesc: 'KisanSlot is more than a tool; it is a government-backed mission to ensure every grain of effort a farmer puts into the soil is rewarded with a dignified procurement experience.',
    contactUs: 'Get in Touch', email: 'Email: support@kisanslot.gov.in', phone: 'Phone: +91-1234-567890',
    changeLang: 'Language'
  },
  hi: {
    signup: 'अभी जुड़ें', login: 'किसान लॉगिन', tagline: 'भारतीय किसानों को समय और सम्मान वापस देना',
    farmers: 'सशक्त किसान', hours: 'बचाए गए घंटे', income: 'आय बढ़ी',
    problemTitle: 'हमारे किसानों का मौन संघर्ष',
    problemDesc: 'दशकों से, खरीद प्रक्रिया सहनशक्ति की परीक्षा रही है। किसान मील दूर से आते हैं और घंटों अराजक कतारों में खड़े रहते हैं।',
    solutionTitle: 'किसानस्लॉट क्रांति',
    solutionDesc: 'हम अराजकता को सटीकता से बदलते हैं। डिजिटल कतार के माध्यम से, हम सुनिश्चित करते हैं कि किसान प्राथमिकता हो।',
    featureTitle: 'जमीनी स्तर के लिए निर्मित',
    feature1: '⚡ तत्काल स्लॉट बुकिंग', feature2: '📱 SMS और व्हाट्सएप अलर्ट',
    feature3: '💰 बिचौलिया-मुक्त पारदर्शिता', feature4: '🌾 22+ क्षेत्रीय भाषाओं में उपलब्ध',
    feature5: '📉 रीयल-टाइम कतार ट्रैकिंग', feature6: '🏦 एकीकृत भुगतान स्थिति',
    aboutTitle: 'हमारा दृष्टिकोण',
    aboutDesc: 'KisanSlot एक सरकार समर्थित मिशन है ताकि यह सुनिश्चित हो सके कि किसान की मेहनत का फल सम्मान के साथ मिले।',
    contactUs: 'हमसे संपर्क करें', email: 'ईमेल: support@kisanslot.gov.in', phone: 'फोन: +91-1234-567890',
    changeLang: 'भाषा बदलें'
  },
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const t = translations[language] || translations.en;
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <div className="landing-page-wrapper">
      <nav className="main-nav">
        <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <span className="logo-text">KisanSlot</span>
        </div>
        <div className="nav-buttons">
          <div className="lang-dropdown">
            <button className="nav-btn lang-toggle" onClick={() => setShowLangMenu(!showLangMenu)}>
              🌐 {t.changeLang}
            </button>
            {showLangMenu && (
              <div className="lang-menu">
                {Object.keys(translations).map(lang => (
                  <div key={lang} className="lang-option" onClick={() => { setLanguage(lang); setShowLangMenu(false); }}>
                    {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : lang}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="nav-btn login" onClick={() => navigate('/login')}>{t.login}</button>
          <button className="nav-btn signup" onClick={() => navigate('/signup')}>{t.signup}</button>
        </div>
      </nav>

      <section 
        className="hero-section" 
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <div className="hero-overlay">
          <h1 className="hero-title">Empowering the Annadata</h1>
          <p className="hero-subtitle">{t.tagline}</p>
          <div className="hero-buttons">
            <button className="btn-hero-signup" onClick={() => navigate('/signup')}>{t.signup}</button>
            <button className="btn-hero-login" onClick={() => navigate('/login')}>{t.login}</button>
          </div>
        </div>
      </section>

      <section className="impact-section">
        <h2 className="section-title">Our National Impact</h2>
        <div className="impact-grid">
          <div className="impact-card">
            <span className="impact-num">2.5L+</span>
            <span className="impact-label">{t.farmers}</span>
          </div>
          <div className="impact-card">
            <span className="impact-num">12.5M</span>
            <span className="impact-label">{t.hours}</span>
          </div>
          <div className="impact-card">
            <span className="impact-num">₹125Cr</span>
            <span className="impact-label">{t.income}</span>
          </div>
        </div>
      </section>

      <section className="problem-section">
        <h2 className="section-title">{t.problemTitle}</h2>
        <div className="comparison-container">
          <div className="comp-card old">
            <h3 className="card-h3">The Old Way ❌</h3>
            <p>Wake up at 4 AM ➔ Chaotic queues ➔ Wait 4 hours ➔ Processed in 20 mins</p>
            <p className="loss-tag">Loss: ₹500/trip</p>
          </div>
          <div className="comp-arrow">➔</div>
          <div className="comp-card new">
            <h3 className="card-h3">The KisanSlot Way ✅</h3>
            <p>Book on app ➔ Arrive at exact time ➔ Processed in 20 mins</p>
            <p className="gain-tag">Gain: Time & Peace</p>
          </div>
        </div>
        <p className="problem-desc">{t.problemDesc}</p>
      </section>

      <section className="features-section">
        <h2 className="section-title">{t.featureTitle}</h2>
        <div className="features-grid">
          {[t.feature1, t.feature2, t.feature3, t.feature4, t.feature5, t.feature6].map((f, i) => (
            <div key={i} className="feature-item-floating">
              <div className="f-icon-circle">
                <span className="f-icon">{['⚡','📱','💰','🌾','📉','🏦'][i]}</span>
              </div>
              <p>{f}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">{t.aboutTitle}</h2>
          <div className="vision-grid">
            <div className="vision-card">
              <div className="v-icon">🎯</div><h4 className="v-title">Our Mission</h4><p>To eliminate the chaos of traditional procurement and restore dignity and time.</p>
            </div>
            <div className="vision-card">
              <div className="v-icon">⚙️</div><h4 className="v-title">Our Method</h4><p>A scalable cloud-system accessible via SMS and Web portals.</p>
            </div>
            <div className="vision-card">
              <div className="v-icon">🚀</div><h4 className="v-title">Our Vision</h4><p>A digital India where procurement is a right, not a struggle.</p>
            </div>
          </div>
          <p className="about-footer">{t.aboutDesc}</p>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 KisanSlot. A Government of India Initiative.</p>
      </footer>
    </div>
  );
}