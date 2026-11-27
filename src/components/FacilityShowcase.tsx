import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Check } from 'lucide-react';
import { FACILITY_ZONES, FacilityZone, ZoneCategory } from '../data/gymData';
import { Language } from '../utils/membership';
import { TRANSLATIONS } from '../i18n/translations';
import { FacilityImage } from './FacilityImage';
import { LanguageToggle } from './LanguageToggle';

interface FacilityShowcaseProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onClaimPass: () => void;
}

export function FacilityShowcase({
  lang,
  onChangeLang,
  onClaimPass,
}: FacilityShowcaseProps) {
  const [activeZone, setActiveZone] = useState<FacilityZone | null>(null);
  const [filter, setFilter] = useState<'all' | ZoneCategory>('all');
  const t = TRANSLATIONS[lang].facility;

  const visibleZones =
    filter === 'all'
      ? FACILITY_ZONES
      : FACILITY_ZONES.filter((zone) => zone.category === filter);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
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
          </div>

          <div
            role="group"
            aria-label={t.eyebrow}
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#121513] p-1 self-start md:self-auto"
          >
            {t.filters.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  aria-pressed={active}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                    active
                      ? 'bg-[#7CE81E] text-[#090B0A]'
                      : 'text-[#B8C0B8] hover:text-[#F4F6F4]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-12">
          {visibleZones.map((zone, idx) => {
            const copy = zone[lang];
            const isWide =
              visibleZones.length > 2 && (idx === 0 || idx === visibleZones.length - 1);
            const spanClass =
              visibleZones.length <= 2
                ? 'md:col-span-6'
                : isWide
                  ? 'md:col-span-7'
                  : 'md:col-span-5';

            return (
              <motion.article
                key={zone.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(idx * 0.04, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative h-[320px] md:h-[360px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121513] ${spanClass}`}
              >
                <FacilityImage
                  src={zone.image}
                  alt={copy.alt}
                  fallbackTitle={copy.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090B0A] via-[#090B0A]/80 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#7CE81E]">
                      {copy.subtitle}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#F4F6F4]">
                      {zone.index}. {copy.title}
                    </h2>
                    <p className="mt-1.5 line-clamp-2 max-w-lg text-sm text-[#C6CEC6]">
                      {copy.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveZone(zone)}
                    aria-label={`${t.inspectPrefix} ${copy.title}`}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#090B0A]/80 text-[#F4F6F4] transition-colors duration-150 hover:border-[#7CE81E] hover:bg-[#7CE81E] hover:text-[#090B0A] focus-visible:outline-2 focus-visible:outline-[#7CE81E] cursor-pointer"
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/12 bg-[#121513] p-6 sm:p-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#F4F6F4] sm:text-3xl">
              {t.bannerTitle}
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-[#B8C0B8]">
              {t.bannerSub}
            </p>
          </div>
          <button
            type="button"
            onClick={onClaimPass}
            className="rounded-lg bg-[#7CE81E] px-6 py-3.5 text-sm font-bold text-[#090B0A] whitespace-nowrap shrink-0 hover:bg-[#8FF236] cursor-pointer"
          >
            {t.bannerCta}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeZone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setActiveZone(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="zone-modal-title"
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-[#121513]"
            >
              <div className="relative h-64 sm:h-80 bg-[#090B0A]">
                <FacilityImage
                  src={activeZone.image}
                  alt={activeZone[lang].alt}
                  fallbackTitle={activeZone[lang].title}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveZone(null)}
                  aria-label={t.close}
                  className="absolute top-4 end-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-[#090B0A]/85 text-[#F4F6F4] hover:border-[#7CE81E] hover:text-[#7CE81E] cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-xs font-medium text-[#7CE81E]">
                  {activeZone[lang].subtitle}
                </p>
                <h3
                  id="zone-modal-title"
                  className="mt-1 font-display text-3xl font-bold text-[#F4F6F4]"
                >
                  {activeZone.index}. {activeZone[lang].title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#C6CEC6]">
                  {activeZone[lang].description}
                </p>

                <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {activeZone[lang].specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-2 text-sm text-[#E5EAE5]"
                    >
                      <Check
                        className="h-4 w-4 shrink-0 text-[#7CE81E]"
                        aria-hidden="true"
                      />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center justify-end gap-3 border-t border-white/[0.08] pt-5">
                  <button
                    type="button"
                    onClick={() => setActiveZone(null)}
                    className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-[#D6DDD6] hover:bg-white/5 cursor-pointer"
                  >
                    {t.close}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveZone(null);
                      onClaimPass();
                    }}
                    className="rounded-lg bg-[#7CE81E] px-5 py-2.5 text-sm font-bold text-[#090B0A] hover:bg-[#8FF236] cursor-pointer"
                  >
                    {t.modalCta}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
