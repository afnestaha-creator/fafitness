import { MouseEvent } from 'react';
import { GYM_CONTACT } from '../data/gymData';
import { Language, PageId, buildNavigationTarget } from '../utils/membership';
import { TRANSLATIONS } from '../i18n/translations';
import { LanguageToggle } from './LanguageToggle';
import { ContactSocialIcons } from './ContactSocialIcons';

interface FooterProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onChangeLang: (lang: Language) => void;
}

export function Footer({ lang, onNavigate, onChangeLang }: FooterProps) {
  const t = TRANSLATIONS[lang];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, page: PageId) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#090B0A] py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <a
            href={buildNavigationTarget('home')}
            onClick={(e) => handleLinkClick(e, 'home')}
            className="font-display text-2xl font-extrabold tracking-tight text-[#F4F6F4]"
          >
            FA <span className="text-[#7CE81E]">FITNESS</span>
          </a>
          <p className="mt-1 text-xs text-[#9BA69B]">
            {t.footer.rights} · {GYM_CONTACT.hours[lang]}
          </p>
          <p dir="ltr" className="mt-0.5 text-xs text-[#6E786E]">
            {GYM_CONTACT.addressDisplay}
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-6 text-sm text-[#B8C0B8]"
        >
          <a
            href={buildNavigationTarget('home')}
            onClick={(e) => handleLinkClick(e, 'home')}
            className="hover:text-[#F4F6F4] transition-colors"
          >
            {t.nav.home}
          </a>
          <a
            href={buildNavigationTarget('facility')}
            onClick={(e) => handleLinkClick(e, 'facility')}
            className="hover:text-[#F4F6F4] transition-colors"
          >
            {t.nav.facility}
          </a>
          <a
            href={buildNavigationTarget('programs')}
            onClick={(e) => handleLinkClick(e, 'programs')}
            className="hover:text-[#F4F6F4] transition-colors"
          >
            {t.nav.programs}
          </a>
          <a
            href={buildNavigationTarget('booking')}
            onClick={(e) => handleLinkClick(e, 'booking')}
            className="hover:text-[#F4F6F4] transition-colors"
          >
            {t.nav.booking}
          </a>
          <a
            href={GYM_CONTACT.phoneHref}
            dir="ltr"
            className="font-semibold text-[#7CE81E] tabular-nums hover:underline"
          >
            {GYM_CONTACT.phoneDisplay}
          </a>
        </nav>

        <div className="flex flex-wrap items-center gap-4">
          <ContactSocialIcons lang={lang} variant="compact" />
          <LanguageToggle lang={lang} onChangeLang={onChangeLang} />
          <p className="text-xs text-[#6E786E] tabular-nums">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
