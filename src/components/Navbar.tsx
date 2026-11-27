import { useState, MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { Language, PageId, buildNavigationTarget } from '../utils/membership';
import { TRANSLATIONS } from '../i18n/translations';
import { LanguageToggle } from './LanguageToggle';

interface NavbarProps {
  currentPage: PageId;
  lang: Language;
  onNavigate: (page: PageId) => void;
  onChangeLang: (lang: Language) => void;
}

export function Navbar({
  currentPage,
  lang,
  onNavigate,
  onChangeLang,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = TRANSLATIONS[lang].nav;

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.home },
    { id: 'facility', label: t.facility },
    { id: 'programs', label: t.programs },
    { id: 'booking', label: t.booking },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, page: PageId) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#090B0A]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-4">
        <a
          href={buildNavigationTarget('home')}
          onClick={(e) => handleLinkClick(e, 'home')}
          className="font-display text-2xl font-extrabold tracking-tight text-[#F4F6F4] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7CE81E]"
        >
          FA <span className="text-[#7CE81E]">FITNESS</span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B8C0B8]"
        >
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={buildNavigationTarget(item.id)}
                aria-current={active ? 'page' : undefined}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7CE81E] ${
                  active
                    ? 'font-semibold text-[#7CE81E] underline underline-offset-8'
                    : 'hover:text-[#F4F6F4] hover:underline hover:underline-offset-8'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('booking')}
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-[#7CE81E] px-5 py-2.5 text-sm font-bold text-[#090B0A] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#8FF236] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7CE81E] cursor-pointer"
          >
            {t.cta}
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? t.closeMenu : t.openMenu}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex md:hidden h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#121513] text-[#F4F6F4] focus-visible:outline-2 focus-visible:outline-[#7CE81E] cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0D100E] px-6 py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={buildNavigationTarget(item.id)}
                  aria-current={active ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`py-2 text-base font-medium ${
                    active ? 'text-[#7CE81E] font-semibold' : 'text-[#D6DDD6] hover:text-[#7CE81E]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onNavigate('booking');
              }}
              className="mt-2 w-full rounded-lg bg-[#7CE81E] px-5 py-3 text-sm font-bold text-[#090B0A] whitespace-nowrap cursor-pointer"
            >
              {t.cta}
            </button>
            <div className="pt-2 border-t border-white/[0.08]">
              <LanguageToggle lang={lang} onChangeLang={onChangeLang} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
