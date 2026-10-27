import React from 'react';
import { SITE_CONFIG } from '../data/siteConfig';

export const Testimonials: React.FC = () => {
  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  ];

  const subtitles = ['Verified Amazon Reader', 'Retirement Planner', 'Book Club Member'];

  return (
    <section className="bg-[#FAF7F2] py-20 md:py-28 border-b border-[#E8E1D4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.6rem] font-bold text-[#0E1E31] leading-tight">
            What our customers says?
          </h2>
        </div>

        {/* 3 Testimonials Cards Grid matching reference image_1a17417d.png */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 pt-8">
          {SITE_CONFIG.testimonials.map((item: { id: string; quote: string; rating: number; author: string }, index: number) => (
            <div
              key={item.id}
              className="relative bg-white rounded-[32px] p-8 pt-16 shadow-lg border border-stone-100 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Floating Avatar at Top Center */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-stone-100">
                <img
                  src={avatars[index % avatars.length]}
                  alt={item.author}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="text-center flex-grow flex flex-col items-center">
                {/* Name & Subtitle */}
                <h3 className="font-serif font-bold text-lg text-[#0E1E31] mb-0.5">
                  {item.author}
                </h3>
                <p className="text-xs text-stone-500 mb-6 font-medium">
                  {subtitles[index % subtitles.length]}
                </p>

                {/* Quotation Icon */}
                <div className="text-[#00BFA5] font-serif text-2xl font-bold mb-3 select-none leading-none">
                  “
                </div>

                {/* Quote Text */}
                <p className="text-sm text-stone-600 leading-relaxed italic px-2">
                  {item.quote}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-16">
          <span className="w-3 h-3 rounded-full border-2 border-[#00BFA5] bg-transparent inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#00BFA5]/45 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#00BFA5]/45 inline-block" />
        </div>
      </div>
    </section>
  );
};
