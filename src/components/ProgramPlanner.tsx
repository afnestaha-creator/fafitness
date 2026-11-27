import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import {
  CoachingLevel,
  Language,
  MembershipTierId,
  TrainingGoal,
  recommendProgram,
} from '../utils/membership';
import { TRANSLATIONS } from '../i18n/translations';
import { LanguageToggle } from './LanguageToggle';

interface ProgramPlannerProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onApplyRecommendation: (goal: TrainingGoal, tierId: MembershipTierId) => void;
}

const DAY_OPTIONS: (3 | 4 | 5)[] = [3, 4, 5];

export function ProgramPlanner({
  lang,
  onChangeLang,
  onApplyRecommendation,
}: ProgramPlannerProps) {
  const [goal, setGoal] = useState<TrainingGoal>('muscle');
  const [days, setDays] = useState<3 | 4 | 5>(4);
  const [coaching, setCoaching] = useState<CoachingLevel>('guided');

  const t = TRANSLATIONS[lang].planner;
  const recommendation = recommendProgram(goal, days, coaching, lang);
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="border-b border-white/[0.08] bg-[#0D100E] py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-sm font-medium text-[#7CE81E]">{t.eyebrow}</p>
              <LanguageToggle lang={lang} onChangeLang={onChangeLang} />
            </div>
            <h1 className="mt-2 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold leading-[1.04] tracking-tight text-[#F4F6F4] [text-wrap:balance]">
              {t.title}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#B8C0B8]">
              {t.subtitle}
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm font-semibold text-[#E5EAE5]">{t.step1}</p>
                <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {t.goals.map((item) => {
                    const active = goal === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGoal(item.id)}
                        aria-pressed={active}
                        className={`rounded-lg border px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                          active
                            ? 'border-[#7CE81E] bg-[#7CE81E] text-[#090B0A]'
                            : 'border-white/10 bg-[#121513] text-[#C6CEC6] hover:border-white/25 hover:text-[#F4F6F4]'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#E5EAE5]">{t.step2}</p>
                <div className="mt-2.5 grid grid-cols-3 gap-2.5">
                  {DAY_OPTIONS.map((count) => {
                    const active = days === count;
                    return (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setDays(count)}
                        aria-pressed={active}
                        className={`rounded-lg border px-4 py-2.5 text-sm font-semibold tabular-nums whitespace-nowrap transition-all duration-150 cursor-pointer ${
                          active
                            ? 'border-[#7CE81E] bg-[#7CE81E] text-[#090B0A]'
                            : 'border-white/10 bg-[#121513] text-[#C6CEC6] hover:border-white/25 hover:text-[#F4F6F4]'
                        }`}
                      >
                        {count} {t.daysSuffix}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#E5EAE5]">{t.step3}</p>
                <div className="mt-2.5 grid grid-cols-3 gap-2.5">
                  {t.coaching.map((item) => {
                    const active = coaching === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCoaching(item.id)}
                        aria-pressed={active}
                        className={`rounded-lg border px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                          active
                            ? 'border-[#7CE81E] bg-[#7CE81E] text-[#090B0A]'
                            : 'border-white/10 bg-[#121513] text-[#C6CEC6] hover:border-white/25 hover:text-[#F4F6F4]'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="rounded-2xl border border-white/12 bg-[#121513] p-6 sm:p-8">
              <div className="border-b border-white/[0.08] pb-5">
                <p className="text-xs font-medium text-[#7CE81E]">
                  {t.recommendedPrefix} · {recommendation.tierName}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-[#F4F6F4] sm:text-3xl">
                  {recommendation.splitTitle}
                </h2>
              </div>

              <div className="mt-5 space-y-2.5">
                {recommendation.weeklySchedule.map((session) => (
                  <div
                    key={session}
                    className="flex items-center gap-3 rounded-lg bg-[#181C19] px-4 py-3 text-sm font-medium text-[#E5EAE5]"
                  >
                    <Check
                      className="h-4 w-4 shrink-0 text-[#7CE81E]"
                      aria-hidden="true"
                    />
                    <span>{session}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-[#9BA69B]">
                    {t.floorZoneLabel}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#F4F6F4]">
                    {recommendation.focusZone}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#9BA69B]">
                    {t.milestoneLabel}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#7CE81E]">
                    {recommendation.expectedOutcome}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onApplyRecommendation(goal, recommendation.tierId)}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7CE81E] px-6 py-3.5 text-base font-bold text-[#090B0A] whitespace-nowrap transition-all duration-150 hover:bg-[#8FF236] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7CE81E] cursor-pointer"
              >
                <span>{t.applyCta}</span>
                <ArrowIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
