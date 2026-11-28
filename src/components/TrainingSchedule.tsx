import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Phone, Users } from 'lucide-react';
import { GYM_CONTACT } from '../data/gymData';
import { Language } from '../utils/membership';
import { TRANSLATIONS } from '../i18n/translations';
import { LanguageToggle } from './LanguageToggle';

interface TrainingScheduleProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onContact: () => void;
}

export function TrainingSchedule({
  lang,
  onChangeLang,
  onContact,
}: TrainingScheduleProps) {
  const t = TRANSLATIONS[lang].schedule;
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm font-medium text-[#7CE81E]">{t.eyebrow}</p>
            <LanguageToggle lang={lang} onChangeLang={onChangeLang} />
          </div>
          <h1 className="mt-2 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold leading-[1.04] tracking-tight text-[#F4F6F4] [text-wrap:balance]">
            {t.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#B8C0B8]">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl border border-[#7CE81E]/40 bg-[#121513] p-6 sm:p-8"
          >
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7CE81E]">
                    {t.men.badge}
                  </p>
                  <h2 className="mt-1 font-display text-3xl font-extrabold text-[#F4F6F4]">
                    {t.men.title}
                  </h2>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#7CE81E]/30 bg-[#7CE81E]/10 text-[#7CE81E]">
                  <Users className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {t.men.sessions.map((session) => (
                  <div
                    key={session.label}
                    className="rounded-xl border border-white/[0.08] bg-[#181C19] p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-base font-bold text-[#F4F6F4]">
                          {session.label}
                        </p>
                        <p className="mt-1 text-xs text-[#9BA69B]">
                          {session.note}
                        </p>
                      </div>
                      <div
                        dir="ltr"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#7CE81E]/30 bg-[#090B0A] px-3.5 py-2 font-display text-xl font-extrabold text-[#7CE81E] tabular-nums"
                      >
                        <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{session.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-white/[0.08] pt-5 text-sm text-[#B8C0B8]">
              <CalendarDays className="h-4 w-4 shrink-0 text-[#7CE81E]" aria-hidden="true" />
              <span>{t.men.daysNote}</span>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl border border-white/15 bg-[#121513] p-6 sm:p-8"
          >
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7CE81E]">
                    {t.women.badge}
                  </p>
                  <h2 className="mt-1 font-display text-3xl font-extrabold text-[#F4F6F4]">
                    {t.women.title}
                  </h2>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#181C19] text-[#7CE81E]">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-white/[0.08] bg-[#181C19] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-bold text-[#F4F6F4]">
                      {t.women.sessionLabel}
                    </p>
                    <p className="mt-1 text-xs text-[#9BA69B]">
                      {t.women.sessionNote}
                    </p>
                  </div>
                  <div
                    dir="ltr"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#7CE81E]/30 bg-[#090B0A] px-3.5 py-2 font-display text-xl font-extrabold text-[#7CE81E] tabular-nums"
                  >
                    <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{t.women.time}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9BA69B]">
                  {t.women.daysLabel}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {t.women.days.map((day) => (
                    <div
                      key={day}
                      className="rounded-lg border border-white/12 bg-[#090B0A] px-3 py-2.5 text-center text-sm font-semibold text-[#F4F6F4]"
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-white/[0.08] pt-5 text-sm text-[#B8C0B8]">
              <CalendarDays className="h-4 w-4 shrink-0 text-[#7CE81E]" aria-hidden="true" />
              <span>{t.women.daysSummary}</span>
            </div>
          </motion.article>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/12 bg-[#121513] p-6 sm:p-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#F4F6F4] sm:text-3xl">
              {t.ctaTitle}
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-[#B8C0B8]">
              {t.ctaSub}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onContact}
              className="inline-flex items-center gap-2 rounded-lg bg-[#7CE81E] px-6 py-3.5 text-sm font-bold text-[#090B0A] whitespace-nowrap transition-colors hover:bg-[#8FF236] cursor-pointer"
            >
              <span>{t.ctaButton}</span>
              <ArrowIcon className="h-4 w-4" aria-hidden="true" />
            </button>

            <a
              href={GYM_CONTACT.phoneHref}
              dir="ltr"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#181C19] px-5 py-3.5 text-sm font-semibold text-[#F4F6F4] whitespace-nowrap hover:border-[#7CE81E] hover:text-[#7CE81E] tabular-nums"
            >
              <Phone className="h-4 w-4 text-[#7CE81E]" aria-hidden="true" />
              <span>{GYM_CONTACT.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
