import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface LifestyleBannerProps {
  config?: typeof SITE_CONFIG;
}

export const LifestyleBanner: React.FC<LifestyleBannerProps> = ({ config = SITE_CONFIG }) => {
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

  const bgImage = config.lifestyle.bgImage;

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#0E1E31] text-white py-20 md:py-28 border-b border-[#1E2D3E]"
      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {bgImage && <div className="absolute inset-0 bg-[#0E1E31]/80 backdrop-blur-2xs z-0" />}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#E5A754] mb-4">
          {config.lifestyle.eyebrow}
        </p>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-bold text-white leading-tight mb-6">
          {config.lifestyle.headline[0]}
          <br className="hidden sm:inline" /> {config.lifestyle.headline[1]} {config.lifestyle.headline[2]}
        </h2>

        {/* Accent Divider */}
        <div className="w-16 h-[2px] bg-[#B87B33] mx-auto mb-6" />

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          {config.lifestyle.description}
        </p>

        {/* CTA Button */}
        <div>
          <button
            onClick={() => scrollTo('books')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-sm sm:text-base font-medium rounded-sm shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98]"
          >
            <span>{config.lifestyle.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
