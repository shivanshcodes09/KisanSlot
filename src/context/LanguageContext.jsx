import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context (The "Cloud" that stores the language)
const LanguageContext = createContext();

// 2. Create the Provider (The "Power Station" that gives language to all pages)
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en'); // Default to English

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3. Create a Custom Hook (The "Remote" to change or read the language)
export const useLanguage = () => useContext(LanguageContext);