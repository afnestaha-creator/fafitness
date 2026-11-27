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
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem('fa-fitness-lang');
    if (saved === 'ar' || saved === 'fr') return saved;
  }
  return 'fr';
}

export default function App() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    typeof window !== 'undefined'
      ? resolvePageFromPath(window.location.pathname)
      : 'home',
  );
  const [selectedGoal, setSelectedGoal] = useState<TrainingGoal>('muscle');
  const [selectedTier, setSelectedTier] =
    useState<MembershipTierId>('pro-muscle');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = TRANSLATIONS[lang].metaTitle;
    window.localStorage.setItem('fa-fitness-lang', lang);
  }, [lang]);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(resolvePageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (page: PageId, focusInputId?: string) => {
    const targetPath = PAGE_PATHS[page];
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (focusInputId) {
      window.setTimeout(() => {
        document.getElementById(focusInputId)?.focus({ preventScroll: true });
      }, 260);
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
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#090B0A] text-[#F4F6F4]">
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
                <HomeHub lang={lang} onNavigate={(page) => navigate(page)} />
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
  );
}
