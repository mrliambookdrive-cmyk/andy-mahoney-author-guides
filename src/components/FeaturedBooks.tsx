import React from 'react';
import { SITE_CONFIG, BookInfo } from '../data/siteConfig';
import { ExternalLink, Sparkles } from 'lucide-react';

interface FeaturedBooksProps {
  books?: BookInfo[];
  config?: typeof SITE_CONFIG;
  onSelectBook: (book: BookInfo) => void;
}

export const FeaturedBooks: React.FC<FeaturedBooksProps> = ({
  books = SITE_CONFIG.books,
  config = SITE_CONFIG,
  onSelectBook,
}) => {
  const book1 = books[0] || config.books[0] || SITE_CONFIG.books[0];
  const book2 = books[1] || config.books[1] || SITE_CONFIG.books[1];

  const bookCovers = [
    { book: book1, image: book1.coverImage || '/images/book1_hd_3d.png' },
    { book: book2, image: book2.coverImage || '/images/book2_hd_3d.png' },
  ];

  return (
    <section id="books" className="bg-[#FAF7F2] py-16 md:py-24 border-b border-[#E8E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#B87B33] mb-3">
            {config.collection.eyebrow}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-[#0E1E31] leading-[1.2]">
            {config.collection.heading}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#615A50] leading-relaxed max-w-2xl mx-auto">
            {config.collection.description}
          </p>
          <p className="mt-2 text-xs text-[#B87B33] font-medium tracking-wide">
            Click on any book card to view full details and takeaways
          </p>
        </div>

        {/* Separate Cards Grid showing Exact 3D Book Covers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {bookCovers.map(({ book, image }) => (
            <div
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="bg-white rounded-xl border border-[#E8E0D2] p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center cursor-pointer group relative"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-[#FAF7F2] border border-[#E5DDD0] px-3 py-1 rounded-full text-[11px] font-medium text-[#736B61] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#B87B33]" />
                <span>Click to View Details</span>
              </div>

              {/* 3D Book Cover Image */}
              <div className="w-48 sm:w-56 md:w-64 my-6 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={image}
                  alt={book.title}
                  className="w-full h-auto object-contain drop-shadow-xl rounded-sm"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title & Subtitle */}
              <div className="text-center mt-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0E1E31] group-hover:text-[#B87B33] transition-colors leading-snug">
                  {book.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#736B61] mt-1 line-clamp-1">
                  {book.subtitle}
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <span className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#B87B33] group-hover:bg-[#A56D2B] text-white text-xs sm:text-sm font-medium rounded-sm transition-colors shadow-2xs">
                  <span>View Full Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
