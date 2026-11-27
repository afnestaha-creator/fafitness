import { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import {
  BillingCycle,
  Language,
  MEMBERSHIP_TIERS,
  MembershipTierId,
  calculatePlanPrice,
  formatDzd,
} from '../utils/membership';
import { TRANSLATIONS } from '../i18n/translations';

interface MembershipPlansProps {
  lang: Language;
  selectedTier: MembershipTierId;
  onSelectTier: (tierId: MembershipTierId) => void;
}

export function MembershipPlans({
  lang,
  selectedTier,
  onSelectTier,
}: MembershipPlansProps) {
  const [cycle, setCycle] = useState<BillingCycle>('quarterly');
  const t = TRANSLATIONS[lang].pricing;

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-[#7CE81E]">{t.eyebrow}</p>
            <h2 className="mt-2 font-display text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-[#F4F6F4] [text-wrap:balance]">
              {t.title}
            </h2>
            <p className="mt-3 text-base text-[#B8C0B8]">{t.subtitle}</p>
          </div>

          <div
            role="group"
            aria-label={t.eyebrow}
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#121513] p-1 self-start md:self-auto"
          >
            {t.cycles.map((item) => {
              const active = cycle === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCycle(item.id)}
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

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier, idx) => {
            const copy = tier[lang];
            const pricing = calculatePlanPrice(tier.baseMonthlyPrice, cycle);
            const isSelected = selectedTier === tier.id;
            const highlight = tier.popular;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex flex-col justify-between rounded-2xl border p-7 transition-colors ${
                  highlight
                    ? 'border-[#7CE81E]/70 bg-[#141915]'
                    : isSelected
                      ? 'border-white/30 bg-[#121513]'
                      : 'border-white/[0.08] bg-[#121513]'
                }`}
              >
                <div>
                  <p
                    className={`text-xs font-semibold ${
                      highlight ? 'text-[#7CE81E]' : 'text-[#9BA69B]'
                    }`}
                  >
                    {copy.tagline}
                  </p>
                  <h3 className="mt-1.5 font-display text-3xl font-bold text-[#F4F6F4]">
                    {copy.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#B8C0B8]">
                    {copy.summary}
                  </p>

                  <div className="mt-6 border-y border-white/[0.08] py-5">
                    <div className="flex items-baseline gap-2">
                      <span
                        dir="ltr"
                        className="font-display text-4xl font-extrabold text-[#F4F6F4] tabular-nums"
                      >
                        {formatDzd(pricing.effectiveMonthly, lang)}
                      </span>
                      <span className="text-sm text-[#9BA69B]">
                        {t.perMonth}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-[#9BA69B] tabular-nums">
                      {t.billedLabels[cycle]}
                      {pricing.discountPercent > 0 && (
                        <>
                          <span aria-hidden="true"> · </span>
                          <span className="font-semibold text-[#7CE81E]">
                            {t.saveWord} {formatDzd(pricing.savingsTotal, lang)}
                          </span>
                        </>
                      )}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {copy.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm text-[#D6DDD6]"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#7CE81E]"
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTier(tier.id)}
                  className={`mt-8 w-full rounded-lg px-5 py-3.5 text-sm font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    highlight
                      ? 'bg-[#7CE81E] text-[#090B0A] hover:bg-[#8FF236]'
                      : 'border border-white/15 bg-[#181C19] text-[#F4F6F4] hover:border-[#7CE81E] hover:text-[#7CE81E]'
                  }`}
                >
                  {copy.ctaLabel}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
