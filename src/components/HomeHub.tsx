import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import { GYM_CONTACT } from '../data/gymData';
import {
  Language,
  PageId,
  buildGoogleMapsSearchUrl,
} from '../utils/membership';
import { TRANSLATIONS } from '../i18n/translations';

interface HomeHubProps {
  lang: Language;
  onNavigate: (page: PageId, focusOrScrollId?: string) => void;
}

export function HomeHub({ lang, onNavigate }: HomeHubProps) {
  const t = TRANSLATIONS[lang].homeHub;
  const locT = TRANSLATIONS[lang].location;
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#7CE81E]">{t.eyebrow}</p>
            <h2 className="mt-2 font-display text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-[#F4F6F4] [text-wrap:balance]">
              {t.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#9BA69B]">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.cards.map((card, idx) => (
            <motion.div
              key={card.page}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#121513] p-7"
            >
              <div>
                <p className="font-display text-xl font-bold text-[#7CE81E] tabular-nums">
                  {card.index}.
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold text-[#F4F6F4]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#B8C0B8]">
                  {card.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate(card.page)}
                className="mt-7 inline-flex items-center justify-between gap-2 rounded-lg border border-white/15 bg-[#181C19] px-4 py-3 text-sm font-semibold text-[#F4F6F4] transition-colors duration-150 hover:border-[#7CE81E] hover:text-[#7CE81E] cursor-pointer"
              >
                <span>{card.action}</span>
                <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#121513] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <MapPin
              className="mt-0.5 h-5 w-5 shrink-0 text-[#7CE81E]"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-medium text-[#9BA69B]">
                {locT.eyebrow}
              </p>
              <p dir="ltr" className="mt-0.5 text-sm font-semibold text-[#F4F6F4]">
                {GYM_CONTACT.addressDisplay}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('booking', 'gym-map')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#7CE81E] px-4 py-2.5 text-sm font-bold text-[#090B0A] whitespace-nowrap transition-colors hover:bg-[#8FF236] cursor-pointer"
            >
              <span>{locT.homeBannerAction}</span>
              <ArrowIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>

            <a
              href={buildGoogleMapsSearchUrl(GYM_CONTACT.addressDisplay)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3.5 py-2.5 text-sm font-medium text-[#D6DDD6] whitespace-nowrap hover:border-[#7CE81E] hover:text-[#7CE81E]"
            >
              <span>{locT.openInMapsBtn}</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

