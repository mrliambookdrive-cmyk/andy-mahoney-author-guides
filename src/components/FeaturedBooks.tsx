import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { SITE_CONFIG, BookInfo } from '../data/siteConfig';

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
  const currentBooks = books && books.length > 0 ? books : config.books || SITE_CONFIG.books;
  const book1 = currentBooks[0] || SITE_CONFIG.books[0];
  const book2 = currentBooks[1] || SITE_CONFIG.books[1];

  const bookList = [
    {
      book: book1,
      defaultCover: '/images/clean_featured_book1.png',
      displayTitle: book1.title || "Retirement Don't Retire from Life",
      subtitle: book1.subtitle || 'A Practical Guide to Purpose, Structure, and Life After Work',
      price: book1.price || '$6.95',
      originalPrice: book1.originalPrice || '$12.95',
      ratingCount: book1.reviewCount || 1,
    },
    {
      book: book2,
      defaultCover: '/images/clean_featured_book2.png',
      displayTitle: book2.title || 'The Retirement Companion: Be Better. Write Now!',
      subtitle: book2.subtitle || 'A Practice Guide',
      price: book2.price || '$6.95',
      originalPrice: book2.originalPrice || '$12.95',
      ratingCount: book2.reviewCount || 1,
    },
  ];

  return (
    <section id="books" className="bg-[#F8FAFC]/60 py-16 sm:py-20 lg:py-24 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="flex items-center justify-center space-x-3 text-xs font-semibold uppercase tracking-widest text-[#1D6399] mb-3">
            <span className="w-8 h-[1px] bg-[#1D6399]/40"></span>
            <span>FEATURED BOOKS</span>
            <span className="w-8 h-[1px] bg-[#1D6399]/40"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1E31] tracking-tight leading-snug">
            {config.collection.heading || 'Books for a More Fulfilling Tomorrow'}
          </h2>
        </div>

        {/* Dual Books Container: 1 col on mobile, side-by-side with vertical divider on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200 max-w-6xl mx-auto items-stretch">
          {bookList.map(({ book, defaultCover, displayTitle, subtitle, price, originalPrice, ratingCount }, idx) => {
            const coverSrc = book.coverImage || defaultCover;
            const defaultUrl1 =
              'https://www.amazon.com/Retreadment-Dont-Retire-Life-Structure/dp/B0HBNGXFH6/ref=sr_1_1?crid=1YSO2XRQDNVF6&keywords=Retirement+Don%27t+Retire+from+Life&qid=1793222605&sr=1-1';
            const defaultUrl2 =
              'https://www.amazon.com/Retreadment-Companion-Better-Write-Practice-ebook/dp/B0HGN8N7C1?ref_=ast_author_dp_rw&th=1&psc=1';
            const amazonLink =
              book.amazonUrl ||
              (book.id === 'retreadment-companion' ? defaultUrl2 : defaultUrl1);

            const handleOpenAmazon = (e?: React.MouseEvent) => {
              if (e) e.preventDefault();
              window.open(amazonLink, '_blank', 'noopener,noreferrer');
            };

            return (
              <div
                key={book.id || idx}
                className={`py-8 md:py-4 flex flex-col sm:flex-row items-center sm:items-start gap-6 ${
                  idx === 0 ? 'md:pr-10 lg:pr-12' : 'md:pl-10 lg:pl-12'
                }`}
              >
                {/* Book Cover with 3D drop shadow - Opens Amazon directly in new tab */}
                <div
                  onClick={handleOpenAmazon}
                  className="w-36 sm:w-44 shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105"
                  title={`View "${displayTitle}" on Amazon (opens new tab)`}
                >
                  <img
                    src={coverSrc}
                    alt={displayTitle}
                    className="w-full h-auto object-contain drop-shadow-md rounded-sm"
                    loading="lazy"
                  />
                </div>

                {/* Book Meta & Details */}
                <div className="flex-1 flex flex-col justify-between text-left">
                  <div>
                    {/* Title - Opens Amazon in new tab */}
                    <h3
                      onClick={handleOpenAmazon}
                      className="font-serif text-xl sm:text-[22px] font-bold text-[#0E1E31] leading-snug hover:text-[#125688] transition-colors cursor-pointer"
                      title={`View "${displayTitle}" on Amazon (opens new tab)`}
                    >
                      {displayTitle}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-sm text-stone-600 mt-2 mb-3 leading-relaxed">
                      {subtitle}
                    </p>

                    {/* Star Rating */}
                    <div className="flex items-center space-x-1 mb-3">
                      <div className="flex text-[#F59E0B]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B]" />
                        ))}
                      </div>
                      <span
                        onClick={handleOpenAmazon}
                        className="text-xs font-medium text-[#125688] hover:underline cursor-pointer ml-1"
                        title="View reader reviews on Amazon"
                      >
                        ({ratingCount})
                      </span>
                    </div>

                    {/* Price with strikethrough discount */}
                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="font-bold text-lg sm:text-xl text-[#0E1E31]">
                        {price}
                      </span>
                      {originalPrice && (
                        <span className="text-xs sm:text-sm text-stone-400 line-through">
                          {originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Details CTA Button - Opens directly in new tab like Amazon */}
                  <div>
                    <a
                      href={amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleOpenAmazon}
                      className="inline-flex items-center space-x-1.5 bg-[#125688] hover:bg-[#0E4770] text-white px-5 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all shadow-xs hover:shadow-md cursor-pointer group"
                      title={`Open "${displayTitle}" on Amazon in a new tab`}
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
