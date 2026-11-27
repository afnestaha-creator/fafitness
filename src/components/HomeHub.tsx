import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Language, PageId } from '../utils/membership';
import { TRANSLATIONS } from '../i18n/translations';

interface HomeHubProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export function HomeHub({ lang, onNavigate }: HomeHubProps) {
  const t = TRANSLATIONS[lang].homeHub;
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
      </div>
    </section>
  );
}
