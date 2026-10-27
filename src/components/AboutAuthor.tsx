import React, { useState } from 'react';
import { ArrowRight, BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { SITE_CONFIG, BookInfo } from '../data/siteConfig';

interface AboutAuthorProps {
  onOpenContact: () => void;
  config?: typeof SITE_CONFIG;
  books?: BookInfo[];
}

export const AboutAuthor: React.FC<AboutAuthorProps> = ({ 
  onOpenContact,
  config = SITE_CONFIG,
  books = config.books || SITE_CONFIG.books,
}) => {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <section id="about" className="bg-[#FAF7F2] py-16 md:py-24 border-b border-[#E8E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Author Bio & Details */}
          <div className="lg:col-span-6 text-left">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#B87B33] mb-3">
              {SITE_CONFIG.author.aboutEyebrow}
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-[#0E1E31] leading-[1.2] mb-5">
              {SITE_CONFIG.author.aboutHeading}
            </h2>

            <p className="text-sm sm:text-base text-[#564F45] leading-relaxed mb-6 font-normal">
              {SITE_CONFIG.author.aboutDescription}
            </p>

            {/* Expandable biography context */}
            {showFullBio && (
              <div className="mb-6 p-5 bg-white/80 rounded-md border border-[#E8DFD1] text-xs sm:text-sm text-[#5B544A] space-y-3 animate-fadeIn">
                <p>
                  With over three decades of professional experience mentoring leaders, executives, and individuals transitioning through major life phases, Andy brings an empathetic, grounded voice to retirement planning.
                </p>
                <p>
                  His writing focuses on breaking the conventional myth of passive retirement, empowering retirees to treat post-career life as an active canvas for creativity, volunteering, craftsmanship, writing, and community engagement.
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-xs sm:text-sm font-medium rounded-sm transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer active:scale-[0.98]"
              >
                <span>{showFullBio ? 'Show Less' : 'Learn More About Andy'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-transparent hover:bg-[#F0E8DC] text-[#0E1E31] text-xs sm:text-sm font-medium rounded-sm transition-colors cursor-pointer"
              >
                <span>Get in Touch</span>
              </button>
            </div>
          </div>

          {/* Right Column: Real Published Books Showcase */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative group max-w-[520px] w-full bg-white rounded-xl border border-[#E8E0D2] p-8 shadow-sm">
              <div className="text-center mb-6">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#B87B33] mb-1">
                  PUBLISHED WORKS BY THE AUTHOR
                </p>
                <h3 className="font-serif text-xl font-bold text-[#0E1E31]">
                  Featured Bestsellers
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6 items-center justify-center">
                {books.map((book: BookInfo, idx: number) => (
                  <div key={book.id} className="flex flex-col items-center group/book">
                    <div className="w-36 h-48 sm:w-40 sm:h-52 overflow-hidden rounded-md shadow-md border border-stone-200 bg-stone-50 transition-transform duration-300 group-hover/book:scale-105 flex items-center justify-center">
                      <img
                        src={book.coverImage || (idx === 0 ? '/images/book1_hd_3d.png' : '/images/book2_hd_3d.png')}
                        alt={book.title}
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="mt-3 text-xs font-serif font-bold text-[#0E1E31] text-center line-clamp-1">
                      {book.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
