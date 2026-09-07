import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('kisanslot-language') || 'en');

  const updateLanguage = (code) => {
    setLanguage(code);
    localStorage.setItem('kisanslot-language', code);
    document.documentElement.lang = code;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
