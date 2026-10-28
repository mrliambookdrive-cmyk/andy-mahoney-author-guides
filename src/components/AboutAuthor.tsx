import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG, BookInfo } from '../data/siteConfig';

interface AboutAuthorProps {
  onOpenContact: () => void;
  config?: typeof SITE_CONFIG;
  books?: BookInfo[];
}

export const AboutAuthor: React.FC<AboutAuthorProps> = ({ 
  onOpenContact,
  config = SITE_CONFIG,
}) => {
  const [showExtendedBio, setShowExtendedBio] = useState(false);

  return (
    <section id="about" className="relative bg-white py-16 sm:py-20 lg:py-24 border-b border-stone-200/70 overflow-hidden">
      
      {/* Subtle Watercolor/Brush accent in top right */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#EBF2F8]/60 via-[#F3F8FC]/30 to-transparent pointer-events-none rounded-full blur-2xl transform translate-x-20 -translate-y-20"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Desk with Stacked Hardcovers & Framed Author Portrait */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative max-w-[500px] w-full rounded-xl overflow-hidden shadow-sm border border-stone-200/60 bg-stone-50 transition-transform duration-300 hover:shadow-md">
              <img
                src={config.author.aboutImage || (config.author as any).image || '/images/new_about_author_desk.png'}
                alt="Andy Mahoney on desk with books Better Habits, More Purpose, A Brighter Future"
                className="w-full h-auto object-cover block"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/about_desk_clean.png';
                }}
              />
            </div>
          </div>

          {/* Right Column: Author Biography & Signature */}
          <div className="lg:col-span-6 text-left">
            {/* Kicker */}
            <p className="text-xs font-semibold tracking-wider uppercase text-[#1D6399] mb-3">
              {config.author.aboutEyebrow || 'ABOUT THE AUTHOR'}
            </p>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1E31] leading-tight mb-5">
              {config.author.aboutHeading || 'Andy Mahoney'}
            </h2>

            {/* Paragraph Bio */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 max-w-xl font-normal">
              {config.author.aboutDescription ||
                "Andy Mahoney is a passionate writer and advocate for personal growth, purpose, and a better tomorrow. Through his books, he helps readers build better habits, find meaning in every stage of life, and create a future they're excited about."}
            </p>

            {/* Extended Bio toggle */}
            {showExtendedBio && (
              <div className="mb-6 p-4 bg-[#F8FAFC] rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-600 space-y-2 animate-fade-in">
                <p>
                  With decades of practical experience guiding individuals through pivotal lifestyle transformations, Andy believes that real fulfillment comes not from passive retreat, but from active curiosity, purposeful structure, and daily momentum.
                </p>
                <p>
                  His books distill timeless principles into accessible exercises that empower readers to thrive at any stage of life.
                </p>
              </div>
            )}

            {/* Signature & Learn More Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
              {/* Handwritten Signature */}
              <div className="h-10 flex items-center">
                <img
                  src="/images/author_signature_clean.png"
                  alt="Andy Mahoney Signature"
                  className="h-9 w-auto object-contain"
                />
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => setShowExtendedBio(!showExtendedBio)}
                  className="inline-flex items-center space-x-1.5 border border-[#125688] text-[#125688] hover:bg-[#125688]/5 px-5 py-2.5 rounded-md font-medium text-xs sm:text-sm transition-colors cursor-pointer group"
                >
                  <span>{showExtendedBio ? 'Show Less' : 'Learn More'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
