import { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Phone, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { GYM_CONTACT } from '../data/gymData';
import {
  Language,
  MEMBERSHIP_TIERS,
  MembershipTierId,
  TrainingGoal,
  TrialBookingErrors,
  generatePassCode,
  validateTrialBooking,
} from '../utils/membership';
import { TRANSLATIONS } from '../i18n/translations';
import { LanguageToggle } from './LanguageToggle';

interface FreePassBookingProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  selectedGoal: TrainingGoal;
  selectedTier: MembershipTierId;
  onGoalChange: (goal: TrainingGoal) => void;
  onTierChange: (tier: MembershipTierId) => void;
}

interface ConfirmedPass {
  passCode: string;
  fullName: string;
  phone: string;
  goalId: TrainingGoal;
  tierId: MembershipTierId;
  preferredTimeIdx: number;
}

export function FreePassBooking({
  lang,
  onChangeLang,
  selectedGoal,
  selectedTier,
  onGoalChange,
  onTierChange,
}: FreePassBookingProps) {
  const t = TRANSLATIONS[lang].booking;
  const stepsT = TRANSLATIONS[lang].results;
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTimeIdx, setPreferredTimeIdx] = useState(2);
  const [errors, setErrors] = useState<TrialBookingErrors>({});
  const [confirmed, setConfirmed] = useState<ConfirmedPass | null>(null);

  const preferredTime = t.timeOptions[preferredTimeIdx] ?? t.timeOptions[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateTrialBooking(
      {
        fullName,
        phone,
        goal: selectedGoal,
        preferredTime,
        selectedTier,
      },
      lang,
    );

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    setConfirmed({
      passCode: generatePassCode(fullName, phone),
      fullName: fullName.trim(),
      phone: phone.trim(),
      goalId: selectedGoal,
      tierId: selectedTier,
      preferredTimeIdx,
    });
  };

  const handleReset = () => {
    setConfirmed(null);
    setFullName('');
    setPhone('');
    setErrors({});
  };

  const confirmedGoalLabel = confirmed
    ? t.goalOptions.find((g) => g.id === confirmed.goalId)?.label ?? ''
    : '';
  const confirmedTierName = confirmed
    ? (MEMBERSHIP_TIERS.find((item) => item.id === confirmed.tierId) ?? MEMBERSHIP_TIERS[1])[lang].name
    : '';
  const confirmedTime = confirmed
    ? t.timeOptions[confirmed.preferredTimeIdx] ?? t.timeOptions[0]
    : '';

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-sm font-medium text-[#7CE81E]">{t.eyebrow}</p>
              <LanguageToggle lang={lang} onChangeLang={onChangeLang} />
            </div>
            <h1 className="mt-2 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold leading-[1.03] tracking-tight text-[#F4F6F4] [text-wrap:balance]">
              {t.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#B8C0B8]">
              {t.subtitle}
            </p>

            <div className="mt-8 space-y-3 border-t border-white/[0.08] pt-6 text-sm text-[#D6DDD6]">
              <p>
                <span className="text-[#9BA69B]">{t.directPhoneLabel} </span>
                <a
                  href={GYM_CONTACT.phoneHref}
                  dir="ltr"
                  className="font-semibold text-[#F4F6F4] hover:text-[#7CE81E] tabular-nums"
                >
                  {GYM_CONTACT.phoneDisplay}
                </a>
              </p>
              <p>
                <span className="text-[#9BA69B]">{t.socialLabel} </span>
                <span dir="ltr" className="font-semibold text-[#F4F6F4]">
                  @{GYM_CONTACT.handle}
                </span>
              </p>
              <p>
                <span className="text-[#9BA69B]">{t.hoursLabel} </span>
                <span className="tabular-nums">{GYM_CONTACT.hours[lang]}</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {confirmed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-[#7CE81E]/50 bg-[#121513] p-6 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#7CE81E]">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                      <span>{t.confirmedTag}</span>
                    </div>
                    <h2 className="mt-2 font-display text-3xl font-bold text-[#F4F6F4]">
                      {t.confirmedTitlePrefix} {confirmed.fullName}
                    </h2>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-[#9BA69B]">{t.passCodeLabel}</p>
                    <p
                      dir="ltr"
                      className="font-display text-2xl font-extrabold text-[#7CE81E] tabular-nums"
                    >
                      {confirmed.passCode}
                    </p>
                  </div>
                </div>

                <dl className="mt-6 grid grid-cols-1 gap-4 border-y border-white/[0.08] py-5 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-[#9BA69B]">{t.phoneOutLabel}</dt>
                    <dd
                      dir="ltr"
                      className={`mt-0.5 font-semibold text-[#F4F6F4] tabular-nums ${
                        lang === 'ar' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {confirmed.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#9BA69B]">{t.windowOutLabel}</dt>
                    <dd className="mt-0.5 font-semibold text-[#F4F6F4]">
                      {confirmedTime}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#9BA69B]">{t.focusOutLabel}</dt>
                    <dd className="mt-0.5 font-semibold text-[#F4F6F4]">
                      {confirmedGoalLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#9BA69B]">{t.tierOutLabel}</dt>
                    <dd className="mt-0.5 font-semibold text-[#F4F6F4]">
                      {confirmedTierName}
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 text-sm text-[#B8C0B8]">
                  {t.instructionsStart}{' '}
                  <strong dir="ltr" className="text-[#F4F6F4]">
                    {confirmed.passCode}
                  </strong>{' '}
                  {t.instructionsMid}{' '}
                  <a
                    href={GYM_CONTACT.phoneHref}
                    dir="ltr"
                    className="font-semibold text-[#7CE81E] underline-offset-4 hover:underline"
                  >
                    {GYM_CONTACT.phoneDisplay}
                  </a>{' '}
                  {t.instructionsEnd}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={GYM_CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#7CE81E] px-5 py-3 text-sm font-bold text-[#090B0A] hover:bg-[#8FF236]"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>{t.callDeskCta}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-medium text-[#D6DDD6] hover:bg-white/5 cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    <span>{t.bookAnotherCta}</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5 rounded-2xl border border-white/12 bg-[#121513] p-6 sm:p-8"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="pass-fullname"
                      className="block text-sm font-medium text-[#E5EAE5]"
                    >
                      {t.fullNameLabel}
                    </label>
                    <input
                      id="pass-fullname"
                      name="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) {
                          setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }
                      }}
                      placeholder={t.fullNamePlaceholder}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#090B0A] px-4 py-3 text-sm text-[#F4F6F4] placeholder:text-[#6E786E] focus:border-[#7CE81E] focus:outline-none"
                    />
                    {errors.fullName && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-[#FF6B6B]">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="pass-phone"
                      className="block text-sm font-medium text-[#E5EAE5]"
                    >
                      {t.phoneLabel}
                    </label>
                    <input
                      id="pass-phone"
                      name="phone"
                      type="tel"
                      dir="ltr"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) {
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }
                      }}
                      placeholder={t.phonePlaceholder}
                      className={`mt-1.5 w-full rounded-lg border border-white/15 bg-[#090B0A] px-4 py-3 text-sm text-[#F4F6F4] tabular-nums placeholder:text-[#6E786E] focus:border-[#7CE81E] focus:outline-none ${
                        lang === 'ar' ? 'text-right' : 'text-left'
                      }`}
                    />
                    {errors.phone && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-[#FF6B6B]">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="pass-goal"
                      className="block text-sm font-medium text-[#E5EAE5]"
                    >
                      {t.goalLabel}
                    </label>
                    <select
                      id="pass-goal"
                      value={selectedGoal}
                      onChange={(e) => onGoalChange(e.target.value as TrainingGoal)}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#090B0A] px-4 py-3 text-sm text-[#F4F6F4] focus:border-[#7CE81E] focus:outline-none"
                    >
                      {t.goalOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="pass-tier"
                      className="block text-sm font-medium text-[#E5EAE5]"
                    >
                      {t.tierLabel}
                    </label>
                    <select
                      id="pass-tier"
                      value={selectedTier}
                      onChange={(e) =>
                        onTierChange(e.target.value as MembershipTierId)
                      }
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#090B0A] px-4 py-3 text-sm text-[#F4F6F4] focus:border-[#7CE81E] focus:outline-none"
                    >
                      {MEMBERSHIP_TIERS.map((tier) => (
                        <option key={tier.id} value={tier.id}>
                          {tier[lang].name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="pass-time"
                    className="block text-sm font-medium text-[#E5EAE5]"
                  >
                    {t.timeLabel}
                  </label>
                  <select
                    id="pass-time"
                    value={preferredTimeIdx}
                    onChange={(e) => setPreferredTimeIdx(Number(e.target.value))}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#090B0A] px-4 py-3 text-sm text-[#F4F6F4] focus:border-[#7CE81E] focus:outline-none"
                  >
                    {t.timeOptions.map((slot, idx) => (
                      <option key={slot} value={idx}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7CE81E] px-6 py-4 text-base font-bold text-[#090B0A] whitespace-nowrap transition-all duration-150 hover:bg-[#8FF236] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7CE81E] cursor-pointer"
                >
                  <span>{t.submitCta}</span>
                  <ArrowIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-white/[0.08] pt-12">
          <p className="text-sm font-medium text-[#9BA69B]">
            {stepsT.stepsHeading}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {stepsT.steps.map((item) => (
              <div key={item.step} className="space-y-2">
                <p className="font-display text-2xl font-bold text-[#7CE81E] tabular-nums">
                  {item.step}. {item.title}
                </p>
                <p className="text-sm leading-relaxed text-[#B8C0B8]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
