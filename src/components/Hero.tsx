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
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const book1 = config.books?.[0] || SITE_CONFIG.books[0];
  const book2 = config.books?.[1] || SITE_CONFIG.books[1];

  return (
    <section id="hero" className="relative w-full bg-gradient-to-b from-[#EBF2F8]/40 via-white to-white overflow-hidden border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Action */}
          <div className="lg:col-span-6 text-left z-10">
            {/* Kicker Category Breadcrumb */}
            <p className="text-xs sm:text-[13px] font-semibold tracking-wider uppercase text-[#1D6399] mb-4">
              {config.author.heroEyebrow || 'SELF-IMPROVEMENT  /  PERSONAL GROWTH  /  BETTER LIVING'}
            </p>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#0E1E31] leading-[1.12] tracking-tight mb-5">
              <span>{config.author.heroHeadline || 'Better Habits.'}</span>
              <br />
              <span>{config.author.heroHeadlineHighlight || 'A Brighter Future.'}</span>
            </h1>

            {/* Body Description */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-normal">
              {config.author.heroDescription ||
                'Discover practical, inspiring books that help you build better habits, improve your mindset, and create the life you want.'}
            </p>

            {/* Primary Action Button */}
            <div>
              <button
                onClick={() => scrollTo('books')}
                className="inline-flex items-center space-x-2 bg-[#125688] hover:bg-[#0E4770] text-white px-7 py-3 rounded-md text-sm font-medium transition-all shadow-xs hover:shadow-md cursor-pointer group"
              >
                <span>Explore All Books</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Books on Desk Presentation */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative max-w-[540px] w-full">
              <div className="relative rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
                <img
                  src={config.author.heroImage || '/images/new_hero_books.png'}
                  alt="Retreadment Don't Retire From Life and The Retreadment Companion by Andy Mahoney"
                  className="w-full h-auto object-contain block drop-shadow-sm"
                  loading="eager"
                />
              </div>

              {/* Invisible interactive click hotspots over the two 3D books */}
              <div className="absolute inset-0 grid grid-cols-2 pointer-events-auto">
                <button
                  type="button"
                  onClick={() => {
                    const defaultUrl1 =
                      'https://www.amazon.com/Retreadment-Dont-Retire-Life-Structure/dp/B0HBNGXFH6/ref=sr_1_1?crid=1YSO2XRQDNVF6&keywords=Retirement+Don%27t+Retire+from+Life&qid=1793222605&sr=1-1';
                    const url = book1.amazonUrl || defaultUrl1;
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="w-full h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#125688]/30 rounded-l-lg transition-colors hover:bg-black/[0.02]"
                  title="Open Retirement Don't Retire from Life on Amazon (opens new tab)"
                  aria-label="View Retreadment Don't Retire from Life on Amazon"
                />
                <button
                  type="button"
                  onClick={() => {
                    const defaultUrl2 =
                      'https://www.amazon.com/Retreadment-Companion-Better-Write-Practice-ebook/dp/B0HGN8N7C1?ref_=ast_author_dp_rw&th=1&psc=1';
                    const url = book2.amazonUrl || defaultUrl2;
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="w-full h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#125688]/30 rounded-r-lg transition-colors hover:bg-black/[0.02]"
                  title="Open The Retirement Companion on Amazon (opens new tab)"
                  aria-label="View The Retirement Companion on Amazon"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
