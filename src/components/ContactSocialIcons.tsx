import { Phone } from 'lucide-react';
import { GYM_CONTACT } from '../data/gymData';
import { Language } from '../utils/membership';

interface ContactSocialIconsProps {
  lang: Language;
  variant?: 'compact' | 'labelled';
  showPhone?: boolean;
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function ContactSocialIcons({
  lang,
  variant = 'compact',
  showPhone = true,
}: ContactSocialIconsProps) {
  const labels =
    lang === 'ar'
      ? {
          instagram: 'إنستغرام FA FITNESS',
          facebook: 'فيسبوك FA FITNESS',
          phone: `اتصل على ${GYM_CONTACT.phoneDisplay}`,
          instagramShort: 'Instagram',
          facebookShort: 'Facebook',
        }
      : {
          instagram: 'Instagram FA FITNESS',
          facebook: 'Facebook FA FITNESS',
          phone: `Appeler le ${GYM_CONTACT.phoneDisplay}`,
          instagramShort: 'Instagram',
          facebookShort: 'Facebook',
        };

  if (variant === 'labelled') {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={GYM_CONTACT.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.instagram}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#121513] px-3.5 py-2.5 text-sm font-medium text-[#F4F6F4] transition-colors hover:border-[#7CE81E] hover:text-[#7CE81E]"
        >
          <InstagramIcon className="h-4 w-4 text-[#7CE81E]" />
          <span>{labels.instagramShort}</span>
        </a>

        <a
          href={GYM_CONTACT.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.facebook}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#121513] px-3.5 py-2.5 text-sm font-medium text-[#F4F6F4] transition-colors hover:border-[#7CE81E] hover:text-[#7CE81E]"
        >
          <FacebookIcon className="h-4 w-4 text-[#7CE81E]" />
          <span>{labels.facebookShort}</span>
        </a>

        <a
          href={GYM_CONTACT.phoneHref}
          dir="ltr"
          aria-label={labels.phone}
          className="inline-flex items-center gap-2 rounded-lg border border-[#7CE81E]/40 bg-[#7CE81E]/10 px-3.5 py-2.5 text-sm font-semibold text-[#7CE81E] tabular-nums transition-colors hover:bg-[#7CE81E] hover:text-[#090B0A]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span>{GYM_CONTACT.phoneDisplay}</span>
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={GYM_CONTACT.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.instagram}
        title={labels.instagram}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-[#121513] text-[#D6DDD6] transition-colors hover:border-[#7CE81E] hover:text-[#7CE81E] focus-visible:outline-2 focus-visible:outline-[#7CE81E]"
      >
        <InstagramIcon className="h-4 w-4" />
      </a>

      <a
        href={GYM_CONTACT.facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.facebook}
        title={labels.facebook}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-[#121513] text-[#D6DDD6] transition-colors hover:border-[#7CE81E] hover:text-[#7CE81E] focus-visible:outline-2 focus-visible:outline-[#7CE81E]"
      >
        <FacebookIcon className="h-4 w-4" />
      </a>

      {showPhone && (
        <a
          href={GYM_CONTACT.phoneHref}
          aria-label={labels.phone}
          title={GYM_CONTACT.phoneDisplay}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#7CE81E]/40 bg-[#7CE81E]/10 text-[#7CE81E] transition-colors hover:bg-[#7CE81E] hover:text-[#090B0A] focus-visible:outline-2 focus-visible:outline-[#7CE81E]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
