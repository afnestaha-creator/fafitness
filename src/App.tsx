/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HomeHub } from './components/HomeHub';
import { FacilityShowcase } from './components/FacilityShowcase';
import { ProgramPlanner } from './components/ProgramPlanner';
import { MembershipPlans } from './components/MembershipPlans';
import { SocialProof } from './components/SocialProof';
import { FreePassBooking } from './components/FreePassBooking';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import {
  Language,
  MembershipTierId,
  PAGE_PATHS,
  PageId,
  TrainingGoal,
  resolvePageFromPath,
} from './utils/membership';
import { TRANSLATIONS } from './i18n/translations';

function getInitialLanguage(): Language {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('fa-fitness-lang');
      if (saved === 'ar' || saved === 'fr') return saved;
    }
  } catch {
    // Ignore storage SecurityError in restricted iframes / private browsing.
  }
  return 'fr';
}

export default function App() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    try {
      return typeof window !== 'undefined'
        ? resolvePageFromPath(window.location.pathname)
        : 'home';
    } catch {
      return 'home';
    }
  });
  const [selectedGoal, setSelectedGoal] = useState<TrainingGoal>('muscle');
  const [selectedTier, setSelectedTier] =
    useState<MembershipTierId>('pro-muscle');
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const onQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () =>
      window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = TRANSLATIONS[lang].metaTitle;
    try {
      window.localStorage?.setItem('fa-fitness-lang', lang);
    } catch {
      // Ignore storage SecurityError in restricted iframes / private browsing.
    }
  }, [lang]);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(resolvePageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (page: PageId, targetElementId?: string) => {
    const targetPath = PAGE_PATHS[page];
    try {
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page }, '', targetPath);
      }
    } catch {
      // Ignore history SecurityError in sandboxed frames; state navigation still works.
    }
    setCurrentPage(page);

    if (targetElementId) {
      window.setTimeout(() => {
        const el = document.getElementById(targetElementId);
        if (!el) return;
        if (targetElementId === 'gym-map') {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          el.focus({ preventScroll: true });
        }
      }, 280);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleApplyRecommendation = (
    goal: TrainingGoal,
    tierId: MembershipTierId,
  ) => {
    setSelectedGoal(goal);
    setSelectedTier(tierId);
    navigate('booking', 'pass-fullname');
  };

  const handleSelectTier = (tierId: MembershipTierId) => {
    setSelectedTier(tierId);
    navigate('booking', 'pass-fullname');
  };

  return (
    <ErrorBoundary
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#090B0A] px-6 text-center text-[#F4F6F4]">
          <p className="font-display text-3xl font-extrabold">
            FA <span className="text-[#7CE81E]">FITNESS</span> GYM
          </p>
          <p className="mt-3 max-w-md text-sm text-[#B8C0B8]">
            RQ58+255, Rue Lounis Mustapha, Jijel · 0771 03 91 72
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-[#7CE81E] px-5 py-3 text-sm font-bold text-[#090B0A] hover:bg-[#8FF236] cursor-pointer"
          >
            {lang === 'ar' ? 'إعادة تحميل الصفحة' : 'Recharger la page'}
          </button>
        </div>
      }
    >
      <MotionConfig reducedMotion="user">
        <div className="flex min-h-screen flex-col bg-[#090B0A] text-[#F4F6F4]">
          {quotaExceeded && (
            <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
              <span>
                Google Maps Platform quota reached. If you are the app owner,
                visit{' '}
                <a
                  href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-amber-950 hover:text-amber-800"
                >
                  maps developer site
                </a>{' '}
                for instructions to update your account.
              </span>
            </div>
          )}

          <Navbar
            currentPage={currentPage}
            lang={lang}
            onNavigate={(page) =>
              navigate(page, page === 'booking' ? 'pass-fullname' : undefined)
            }
            onChangeLang={setLang}
          />

          <main className="flex-1">
            <AnimatePresence mode="wait">
              {currentPage === 'home' && (
                <motion.div
                  key={`home-${lang}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <HeroSection
                    lang={lang}
                    onChangeLang={setLang}
                    onNavigate={(page) =>
                      navigate(
                        page,
                        page === 'booking' ? 'pass-fullname' : undefined,
                      )
                    }
                  />
                  <HomeHub
                    lang={lang}
                    onNavigate={(page, targetId) => navigate(page, targetId)}
                  />
                  <SocialProof lang={lang} showSteps={false} />
                </motion.div>
              )}

              {currentPage === 'facility' && (
                <motion.div
                  key={`facility-${lang}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <FacilityShowcase
                    lang={lang}
                    onChangeLang={setLang}
                    onClaimPass={() => navigate('booking', 'pass-fullname')}
                  />
                </motion.div>
              )}

              {currentPage === 'programs' && (
                <motion.div
                  key={`programs-${lang}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProgramPlanner
                    lang={lang}
                    onChangeLang={setLang}
                    onApplyRecommendation={handleApplyRecommendation}
                  />
                  <MembershipPlans
                    lang={lang}
                    selectedTier={selectedTier}
                    onSelectTier={handleSelectTier}
                  />
                </motion.div>
              )}

              {currentPage === 'booking' && (
                <motion.div
                  key={`booking-${lang}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <FreePassBooking
                    lang={lang}
                    onChangeLang={setLang}
                    selectedGoal={selectedGoal}
                    selectedTier={selectedTier}
                    onGoalChange={setSelectedGoal}
                    onTierChange={setSelectedTier}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <Footer
            lang={lang}
            onNavigate={(page) => navigate(page)}
            onChangeLang={setLang}
          />
        </div>
      </MotionConfig>
    </ErrorBoundary>
  );
}
