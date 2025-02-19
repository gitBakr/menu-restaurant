import { Language } from '@/types/menu';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector = ({ currentLanguage, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <div className="fixed top-0 right-0 z-50 p-4 bg-restaurant-dark/95 backdrop-blur-sm rounded-bl-xl border-b border-l border-restaurant-gold/20">
      <div className="flex gap-2">
        <button
          onClick={() => onLanguageChange('fr')}
          className={`px-3 py-1 rounded transition-colors ${
            currentLanguage === 'fr'
              ? 'bg-restaurant-gold text-restaurant-dark'
              : 'bg-restaurant-darker text-restaurant-gold border border-restaurant-gold hover:bg-restaurant-darker/80'
          }`}
        >
          FR
        </button>
        <button
          onClick={() => onLanguageChange('ar')}
          className={`px-3 py-1 rounded transition-colors ${
            currentLanguage === 'ar'
              ? 'bg-restaurant-gold text-restaurant-dark'
              : 'bg-restaurant-darker text-restaurant-gold border border-restaurant-gold hover:bg-restaurant-darker/80'
          }`}
        >
          عربي
        </button>
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 rounded transition-colors ${
            currentLanguage === 'en'
              ? 'bg-restaurant-gold text-restaurant-dark'
              : 'bg-restaurant-darker text-restaurant-gold border border-restaurant-gold hover:bg-restaurant-darker/80'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}; 