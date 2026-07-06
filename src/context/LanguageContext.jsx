import { createContext, useContext, useState, useEffect } from 'react';
import { translations, defaultLang } from '../i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('aystba-lang');
    return saved || defaultLang;
  });

  useEffect(() => {
    localStorage.setItem('aystba-lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'zh' : 'en');
  };

  const t = (key) => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[lang] || translation.en;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLang must be used within a LanguageProvider');
  }
  return context;
}
