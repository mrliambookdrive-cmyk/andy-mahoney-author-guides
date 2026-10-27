import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { BookInfo } from '../data/siteConfig';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: BookInfo[];
  onSelectBook: (book: BookInfo) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  books,
  onSelectBook,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredBooks = books.filter((b) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      b.title.toLowerCase().includes(q) ||
      b.subtitle.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-stone-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center space-x-3">
          <Search className="w-5 h-5 text-[#125688] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books, chapters, or topics (e.g. habits, retirement, companion)..."
            className="w-full text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 px-1">
            {query.trim() ? `Search results (${filteredBooks.length})` : 'Popular Books'}
          </p>

          {filteredBooks.length === 0 ? (
            <div className="text-center py-8 text-stone-500 text-sm">
              No matching books found for "{query}".
            </div>
          ) : (
            filteredBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => {
                  onSelectBook(book);
                  onClose();
                }}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-[#F8FAFC] cursor-pointer transition-colors border border-transparent hover:border-stone-200"
              >
                <img
                  src={book.coverImage || '/images/clean_featured_book1.png'}
                  alt={book.title}
                  className="w-12 h-16 object-contain rounded-xs shadow-xs shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-stone-900 text-sm truncate">
                    {book.title}
                  </h4>
                  <p className="text-xs text-stone-500 truncate mt-0.5">{book.subtitle}</p>
                  <p className="text-xs font-bold text-[#125688] mt-1">{book.price || '$6.95'}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
