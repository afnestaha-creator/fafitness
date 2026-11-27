import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Phone } from 'lucide-react';
import { GYM_CONTACT, HERO_FACILITY_IMAGE } from '../data/gymData';
import { Language, PAGE_PATHS, PageId } from '../utils/membership';
import { TRANSLATIONS } from '../i18n/translations';
import { FacilityImage } from './FacilityImage';
import { LanguageToggle } from './LanguageToggle';

interface HeroSectionProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onNavigate: (page: PageId) => void;
}

export function HeroSection({
  lang,
  onChangeLang,
  onNavigate,
}: HeroSectionProps) {
  const t = TRANSLATIONS[lang].hero;
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="relative pt-6 pb-12 md:pt-10 md:pb-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-6 lg:py-2"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium tracking-wide text-[#9BA69B]">
                  {t.kicker}
                </p>
                <LanguageToggle lang={lang} onChangeLang={onChangeLang} />
              </div>

              <h1 className="mt-4 font-display text-[clamp(2.5rem,4.8vw,4rem)] font-extrabold leading-[1.02] tracking-tight text-[#F4F6F4] [text-wrap:balance]">
                {t.headlinePrefix}
                <span className="text-[#7CE81E]">{t.headlineAccent}</span>
                {t.headlineSuffix}
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#B8C0B8] md:text-lg">
                {t.subheadlinePrefix}
                <span className="font-semibold text-[#F4F6F4]">
                  {t.coachName}
                </span>
                {t.subheadlineSuffix}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('booking')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7CE81E] px-7 py-3.5 text-base font-bold text-[#090B0A] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#8FF236] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7CE81E] cursor-pointer"
              >
                <span>{t.primaryCta}</span>
                <ArrowIcon className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href={PAGE_PATHS.programs}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('programs');
                }}
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-[#121513] px-6 py-3.5 text-base font-semibold text-[#F4F6F4] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-white/30 hover:bg-[#181C19] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7CE81E]"
              >
                {t.secondaryCta}
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#9BA69B]">
              <span>{t.trust1}</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>{t.trust2}</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <a
                href={GYM_CONTACT.phoneHref}
                dir="ltr"
                className="inline-flex items-center gap-1.5 font-medium text-[#D6DDD6] hover:text-[#7CE81E] transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-[#7CE81E]" aria-hidden="true" />
                <span className="tabular-nums">{GYM_CONTACT.phoneDisplay}</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative h-[340px] sm:h-[400px] lg:h-full lg:min-h-[410px] overflow-hidden rounded-2xl border border-white/10 bg-[#121513]">
              <FacilityImage
                src={HERO_FACILITY_IMAGE.src}
                alt={HERO_FACILITY_IMAGE.alt[lang]}
                priority
                className="h-full w-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090B0A]/90 via-[#090B0A]/25 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-medium text-[#7CE81E]">
                  {t.imageKicker}
                </p>
                <p className="mt-1 text-base font-semibold text-[#F4F6F4]">
                  {t.imageCaption}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 grid grid-cols-2 gap-4 border-y border-white/[0.08] py-5 md:grid-cols-4"
        >
          {t.metrics.map((item) => (
            <div key={item.label} className="px-2">
              <div
                dir="ltr"
                className={`font-display text-2xl font-bold tracking-tight text-[#F4F6F4] tabular-nums md:text-3xl ${
                  lang === 'ar' ? 'text-right' : 'text-left'
                }`}
              >
                {item.value}
              </div>
              <div className="mt-1 text-sm text-[#9BA69B]">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
