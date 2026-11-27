import { useEffect, useState } from 'react';
import { Dumbbell } from 'lucide-react';
import { resolveAssetUrl } from '../utils/membership';

interface FacilityImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function FacilityImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle = 'FA FITNESS GYM',
  priority = false,
}: FacilityImageProps) {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = resolveAssetUrl(src);

  useEffect(() => {
    setFailed(false);
  }, [resolvedSrc]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#161B17] via-[#0F1310] to-[#090B0A] text-[#9BA69B] p-6 text-center"
      >
        <Dumbbell className="w-8 h-8 text-[#7CE81E] mb-3" aria-hidden="true" />
        <span className="font-display text-lg font-bold tracking-wide text-[#F4F6F4]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
