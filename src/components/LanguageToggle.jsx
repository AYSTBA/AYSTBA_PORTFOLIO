import { Globe } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function LanguageToggle({ scrollProgress }) {
  const { lang, toggleLang } = useLang();

  return (
    <button 
      className="lang-toggle"
      style={{ '--np': scrollProgress }}
      onClick={toggleLang}
      title={lang === 'en' ? '切换到中文' : 'Switch to English'}
    >
      <Globe size={16} />
      <span>{lang === 'en' ? '中' : 'EN'}</span>
    </button>
  );
}
