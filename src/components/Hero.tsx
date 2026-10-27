import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG, BookInfo } from '../data/siteConfig';

interface HeroProps {
  onSelectBook: (book: BookInfo) => void;
  config?: typeof SITE_CONFIG;
}

export const Hero: React.FC<HeroProps> = ({ onSelectBook, config = SITE_CONFIG }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" className="relative w-full bg-[#FAF7F2] overflow-hidden border-b border-[#EAE3D6]">
      {/* ========================================================
          MOBILE HERO VIEW (< md: screens up to 767px)
          Large, prominent, high-impact hero filling mobile view nicely
         ======================================================== */}
      <div className="block md:hidden px-5 pt-8 pb-12 bg-[#FAF7F2]">
        <div className="max-w-md mx-auto text-left">
          {/* Eyebrow */}
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B87B33] mb-3">
            {config.author.heroEyebrow}
          </p>

          {/* Big Bold Headline */}
          <h1 className="font-serif text-[2.15rem] leading-[1.18] font-bold text-[#0E1E31] tracking-tight">
            Retirement
            <br />
            Isn’t the End —
            <br />
            <span className="text-[#B87B33]">It’s a New Beginning.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="mt-4 text-sm text-[#554E44] leading-relaxed font-normal">
            {config.author.heroDescription}
          </p>

          {/* Touch-Friendly Action Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => scrollTo('books')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-sm font-medium rounded-sm shadow-sm active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Explore the Books</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo('about')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#F5EFE6] text-[#0E1E31] border border-[#DDD3C2] text-sm font-medium rounded-sm active:scale-[0.98] transition-all cursor-pointer shadow-2xs"
            >
              <span>Learn More</span>
            </button>
          </div>

          {/* Big Full HD 3D Book Showcase for Mobile */}
          <div className="mt-8 relative">
            <div className="rounded-md overflow-hidden shadow-lg border border-[#E7DFD2] bg-[#FAF7F2]">
              <img
                src="/images/hero_books_mobile_hd.png"
                alt="Retreadment Don't Retire From Life and The Retreadment Companion by Andy Mahoney"
                className="w-full h-auto block object-cover"
                loading="eager"
              />
            </div>

            {/* Quick Preview Links */}
            <div className="mt-3 flex items-center justify-between text-xs text-[#71695F] px-1">
              <span className="italic font-serif">Tap to preview:</span>
              <div className="flex items-center gap-3 font-medium text-[#B87B33]">
                <button
                  onClick={() => onSelectBook(config.books[0])}
                  className="hover:underline cursor-pointer"
                >
                  Book 1
                </button>
                <span>·</span>
                <button
                  onClick={() => onSelectBook(config.books[1])}
                  className="hover:underline cursor-pointer"
                >
                  Book 2
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          DESKTOP & TABLET HERO VIEW (>= md: 768px and up)
          Widescreen 1853 x 849 Full HD Canvas with Interactive Hotspots
         ======================================================== */}
      <div className="hidden md:block relative max-w-[1853px] mx-auto">
        <div className="relative w-full overflow-hidden select-none">
          {/* Pristine Full HD Hero Banner (1853 x 849) */}
          <img
            src={config.author.heroImage || '/images/hero_hd_full.png'}
            alt="Retirement Isn't the End — It's a New Beginning. Books by Andy Mahoney"
            className="w-full h-auto block"
            loading="eager"
            referrerPolicy="no-referrer"
          />

          {/* Hotspot 1: Primary CTA - "Explore the Books →" */}
          <button
            onClick={() => scrollTo('books')}
            aria-label="Explore the Books"
            className="absolute z-20 cursor-pointer rounded-xs group transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-[0.98]"
            style={{
              left: '6.58%',
              top: '77.5%',
              width: '18.78%',
              height: '9.07%',
            }}
          >
            <span className="absolute inset-0 rounded-xs bg-white/0 group-hover:bg-white/15 transition-colors duration-200" />
          </button>

          {/* Hotspot 2: Secondary CTA - "Learn More" */}
          <button
            onClick={() => scrollTo('about')}
            aria-label="Learn More About Andy Mahoney"
            className="absolute z-20 cursor-pointer rounded-xs group transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E1E31] active:scale-[0.98]"
            style={{
              left: '26.66%',
              top: '77.5%',
              width: '11.55%',
              height: '9.07%',
            }}
          >
            <span className="absolute inset-0 rounded-xs bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />
          </button>

          {/* Hotspot 3: Book 1 Click Preview */}
          <button
            onClick={() => onSelectBook(config.books[0])}
            aria-label="Quick Preview: Retreadment Don't Retire from Life"
            className="absolute z-20 cursor-pointer rounded-xs group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            style={{
              left: '50.7%',
              top: '15.9%',
              width: '20.5%',
              height: '72.4%',
            }}
          >
            <span className="absolute inset-0 rounded-xs bg-black/0 group-hover:bg-white/10 transition-colors duration-200" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#0E1E31]/85 text-white text-[11px] font-medium px-3 py-1 rounded shadow-xs whitespace-nowrap">
              Click to Preview Book 1
            </span>
          </button>

          {/* Hotspot 4: Book 2 Click Preview */}
          <button
            onClick={() => onSelectBook(config.books[1])}
            aria-label="Quick Preview: The Retreadment Companion"
            className="absolute z-20 cursor-pointer rounded-xs group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            style={{
              left: '71.2%',
              top: '17.6%',
              width: '24.3%',
              height: '74.2%',
            }}
          >
            <span className="absolute inset-0 rounded-xs bg-black/0 group-hover:bg-white/10 transition-colors duration-200" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#0E1E31]/85 text-white text-[11px] font-medium px-3 py-1 rounded shadow-xs whitespace-nowrap">
              Click to Preview Book 2
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
