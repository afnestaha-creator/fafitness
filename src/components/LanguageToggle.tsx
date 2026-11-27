import { Language } from '../utils/membership';
import { TRANSLATIONS } from '../i18n/translations';

interface LanguageToggleProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
}

export function LanguageToggle({ lang, onChangeLang }: LanguageToggleProps) {
  const t = TRANSLATIONS[lang].langSwitcher;

  return (
    <div
      role="group"
      aria-label={t.label}
      className="inline-flex items-center gap-1 rounded-lg border border-white/12 bg-[#121513] p-1 shrink-0"
    >
      <button
        type="button"
        onClick={() => onChangeLang('fr')}
        aria-pressed={lang === 'fr'}
        className={`rounded-md px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors duration-150 cursor-pointer ${
          lang === 'fr'
            ? 'bg-[#7CE81E] text-[#090B0A]'
            : 'text-[#B8C0B8] hover:text-[#F4F6F4]'
        }`}
      >
        {t.fr}
      </button>
      <button
        type="button"
        onClick={() => onChangeLang('ar')}
        aria-pressed={lang === 'ar'}
        className={`rounded-md px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors duration-150 cursor-pointer ${
          lang === 'ar'
            ? 'bg-[#7CE81E] text-[#090B0A]'
            : 'text-[#B8C0B8] hover:text-[#F4F6F4]'
        }`}
      >
        {t.ar}
      </button>
    </div>
  );
}
