import React, { useState } from 'react';
import '../styles/LanguageSelector.css';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'ଓଡିଆ' },
  { code: 'as', name: 'অসমীয়া' },
  { code: 'ma', name: 'मराठी' },
  { code: 'ur', name: 'اردو' },
  { code: 'sa', name: 'संस्कृत' },
  { code: 'ks', name: 'کَشمیری' },
  { code: 'sd', name: 'سنڌي' },
  { code: 'kok', name: 'कोंकणी' },
  { code: 'doi', name: 'Dogri' },
  { code: 'mni', name: 'Manipuri' },
  { code: 'ne', name: 'Nepali' },
];

export default function LanguageSelector({ onSelectLanguage }) {
  const [search, setSearch] = useState('');

  const filteredLangs = LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="lang-screen">
      <div className="lang-card">
        <div className="lang-header">
          <h1 className="lang-logo">🌾 KisanSlot</h1>
          <p>Please select your preferred language to continue</p>
        </div>

        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search language (e.g. Hindi, Tamil...)" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="lang-search"
          />
        </div>

        <div className="lang-grid">
          {filteredLangs.map(lang => (
            <button 
              key={lang.code} 
              className="lang-btn" 
              onClick={() => onSelectLanguage(lang.code)}
            >
              <span className="lang-name">{lang.name}</span>
              <span className="lang-code">{lang.code}</span>
            </button>
          ))}
        </div>

        {filteredLangs.length === 0 && (
          <p className="no-results">No language found. Please try again.</p>
        )}
      </div>
    </div>
  );
}