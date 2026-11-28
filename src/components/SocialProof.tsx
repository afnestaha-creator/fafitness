import { motion } from 'motion/react';
import { TRANSFORMATIONS } from '../data/gymData';
import { Language } from '../utils/membership';
import { TRANSLATIONS } from '../i18n/translations';

interface SocialProofProps {
  lang: Language;
}

export function SocialProof({ lang }: SocialProofProps) {
  const t = TRANSLATIONS[lang].results;

  return (
    <section className="border-t border-white/[0.08] bg-[#0D100E] py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#7CE81E]">{t.eyebrow}</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-[#F4F6F4] [text-wrap:balance]">
            {t.title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TRANSFORMATIONS.map((story, idx) => {
            const copy = story[lang];
            return (
              <motion.blockquote
                key={story.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#121513] p-6"
              >
                <div>
                  <p className="text-xs font-semibold text-[#7CE81E] tabular-nums">
                    {copy.outcomeMetric}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#D6DDD6]">
                    “{copy.quote}”
                  </p>
                </div>

                <footer className="mt-6 border-t border-white/[0.08] pt-4 text-xs text-[#9BA69B]">
                  <span className="font-semibold text-[#F4F6F4]">
                    {copy.name}
                  </span>
                  <span aria-hidden="true"> · </span>
                  <span>{copy.program}</span>
                  <span aria-hidden="true"> · </span>
                  <span className="tabular-nums">{copy.timeframe}</span>
                </footer>
              </motion.blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
}
