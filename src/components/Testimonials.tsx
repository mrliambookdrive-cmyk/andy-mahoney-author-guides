import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface TestimonialsProps {
  config?: typeof SITE_CONFIG;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ config = SITE_CONFIG }) => {
  const avatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  ];

  const defaultSubtitles = [
    'Verified Amazon Purchase',
    'Verified Amazon Purchase',
    'Life Transition Planners & Readers',
    'Verified Amazon Purchase',
    'Former Educator & Retiree',
    'Verified Amazon Purchase',
  ];

  const testimonialsList =
    config?.testimonials && config.testimonials.length > 0
      ? config.testimonials
      : SITE_CONFIG.testimonials;

  return (
    <section id="reviews" className="bg-[#FAF7F2] py-20 md:py-24 border-b border-[#E8E1D4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center justify-center space-x-3 text-xs font-semibold uppercase tracking-widest text-[#125688] mb-3">
            <span className="w-8 h-[1px] bg-[#125688]/40"></span>
            <span>READER REVIEWS</span>
            <span className="w-8 h-[1px] bg-[#125688]/40"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.6rem] font-bold text-[#0E1E31] leading-tight">
            What Readers Say
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3 max-w-xl mx-auto leading-relaxed">
            Real stories and reflections from readers who turned these practical guides into daily habits and meaningful new chapters.
          </p>
        </div>

        {/* Testimonials Cards Grid (Responsive 1/2/3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pt-6">
          {testimonialsList.map((item: any, index: number) => {
            const avatarUrl = item.avatar || avatars[index % avatars.length];
            const subtitleText = item.subtitle || defaultSubtitles[index % defaultSubtitles.length];

            return (
              <div
                key={item.id || index}
                className="relative bg-white rounded-3xl p-7 sm:p-8 pt-14 shadow-sm hover:shadow-xl border border-stone-200/70 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Floating Avatar at Top Center */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-stone-100 ring-2 ring-[#B87B33]/20">
                  <img
                    src={avatarUrl}
                    alt={item.author}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="text-center flex-grow flex flex-col items-center">
                  {/* 5-Star Rating */}
                  <div className="flex items-center space-x-1 mb-2 text-[#F59E0B]">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                    ))}
                  </div>

                  {/* Name */}
                  <h3 className="font-serif font-bold text-lg text-[#0E1E31] mb-1">
                    {item.author}
                  </h3>

                  {/* Subtitle / Verified Badge */}
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#B87B33] mb-4 font-semibold tracking-wide">
                    {subtitleText.includes('Verified') && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                    <span>{subtitleText}</span>
                  </div>

                  {/* Quotation Icon */}
                  <Quote className="w-5 h-5 text-[#125688]/25 mb-2 rotate-180" />

                  {/* Quote Text */}
                  <p className="text-sm text-stone-600 leading-relaxed italic px-1">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Book Reference Tag */}
                  {item.bookTitle && (
                    <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-medium text-[#125688] tracking-wide">
                      Reviewed: <span className="font-semibold italic">{item.bookTitle}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
