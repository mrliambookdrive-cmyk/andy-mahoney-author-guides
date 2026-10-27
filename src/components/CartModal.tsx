import React from 'react';
import { ShoppingBag, X, ExternalLink, Trash2 } from 'lucide-react';
import { BookInfo } from '../data/siteConfig';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: BookInfo[];
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, books }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200">
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#125688]" />
            <h3 className="font-serif font-bold text-[#0E1E31] text-base">Your Cart</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-5 space-y-4 max-h-80 overflow-y-auto">
          {books.map((book) => (
            <div key={book.id} className="flex items-center space-x-3.5 pb-4 border-b border-stone-100 last:border-0 last:pb-0">
              <img
                src={book.coverImage || '/images/clean_featured_book1.png'}
                alt={book.title}
                className="w-12 h-16 object-contain rounded-xs shadow-xs shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-serif font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">
                  {book.title}
                </h4>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{book.subtitle}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-bold text-[#0E1E31]">{book.price || '$6.95'}</span>
                  <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">In Stock</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with Checkout */}
        <div className="p-5 bg-stone-50 border-t border-stone-200">
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-stone-600 font-medium">Subtotal</span>
            <span className="font-bold text-base text-[#0E1E31]">$13.90</span>
          </div>

          <a
            href={books[0]?.amazonUrl || 'https://www.amazon.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center space-x-2 bg-[#125688] hover:bg-[#0E4770] text-white py-3 rounded-md text-sm font-semibold transition-colors shadow-xs"
          >
            <span>Order Direct on Amazon</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-[11px] text-stone-500 text-center mt-2">
            Fast delivery with Amazon Prime
          </p>
        </div>
      </div>
    </div>
  );
};
