export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#090B0A] py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:text-start">
        <p className="font-display text-xl font-extrabold tracking-tight text-[#F4F6F4]">
          FA <span className="text-[#7CE81E]">FITNESS</span>
        </p>

        <p dir="ltr" className="text-xs text-[#9BA69B]">
          Copyright © 2026 All rights reserved by{' '}
          <span className="font-semibold text-[#D6DDD6]">fafitness.gym</span> ·{' '}
          Created by{' '}
          <span className="font-semibold text-[#7CE81E]">T/A Company</span>
        </p>
      </div>
    </footer>
  );
}
