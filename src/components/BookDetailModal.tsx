import React, { useState } from 'react';
import { X, ExternalLink, Star, Check, Edit2, Bookmark } from 'lucide-react';
import { BookInfo } from '../data/siteConfig';

interface BookDetailModalProps {
  book: BookInfo | null;
  onClose: () => void;
  onUpdateAmazonUrl: (bookId: string, newUrl: string) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onUpdateAmazonUrl,
}) => {
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState(book?.amazonUrl || '');

  if (!book) return null;

  const handleSaveUrl = () => {
    onUpdateAmazonUrl(book.id, tempUrl);
    setIsEditingUrl(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF7F2] rounded-md max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5DDD0] text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 p-1 rounded-sm focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Book 3D Cover */}
          <div className="sm:col-span-5 flex flex-col items-center">
            <div className="bg-white p-3 rounded-md border border-[#E5DDD0] shadow-md max-w-[220px]">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-auto object-contain rounded-xs"
              />
            </div>

            {book.rating && (
              <div className="mt-4 flex flex-col items-center text-center">
                <div className="flex text-[#E5A13B] gap-1">
                  {[...Array(book.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E5A13B]" />
                  ))}
                </div>
                <span className="text-xs text-[#6B6358] mt-1 font-medium">
                  5.0 out of 5 stars (Verified Reader)
                </span>
              </div>
            )}
          </div>

          {/* Book Info */}
          <div className="sm:col-span-7">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#B87B33]">
              Featured Edition
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E1E31] leading-snug mt-1">
              {book.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[#736B61] mt-1 mb-3">
              {book.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-[#554E44] leading-relaxed mb-4">
              {book.description}
            </p>

            {/* Core Highlights */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-[#0E1E31] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-[#B87B33]" />
                Key Themes & Takeaways
              </h4>
              <ul className="space-y-1.5 text-xs text-[#5D554A]">
                {book.highlights.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[#B87B33] font-bold mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Amazon Purchase & URL Configuration */}
            <div className="pt-2 border-t border-[#E8E1D4]">
              {isEditingUrl ? (
                <div className="space-y-2 mb-3">
                  <label className="block text-[11px] font-semibold text-stone-700">
                    Configure Amazon Product URL:
                  </label>
                  <input
                    type="url"
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    placeholder="https://www.amazon.com/dp/..."
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#DDD3C2] rounded-sm text-stone-900"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveUrl}
                      className="px-3 py-1 bg-[#B87B33] text-white text-xs font-medium rounded-sm"
                    >
                      Save URL
                    </button>
                    <button
                      onClick={() => setIsEditingUrl(false)}
                      className="px-3 py-1 bg-stone-200 text-stone-700 text-xs rounded-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] text-[#7A7266] truncate max-w-[200px]">
                    URL: {book.amazonUrl}
                  </span>
                  <button
                    onClick={() => {
                      setTempUrl(book.amazonUrl);
                      setIsEditingUrl(true);
                    }}
                    className="text-[11px] text-[#B87B33] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit link
                  </button>
                </div>
              )}

              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-sm font-medium rounded-sm transition-colors shadow-xs"
              >
                <span>View on Amazon</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
