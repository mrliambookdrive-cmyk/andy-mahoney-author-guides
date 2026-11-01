import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, ExternalLink, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { BookInfo } from '../data/siteConfig';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: BookInfo[];
  onSelectBook?: (book: BookInfo) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  books,
  onSelectBook,
}) => {
  const [isSelectingBook, setIsSelectingBook] = useState(false);

  // Reset selection view whenever modal is closed or opened
  useEffect(() => {
    if (!isOpen) {
      setIsSelectingBook(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBookOrder = (book: BookInfo) => {
    if (onSelectBook) {
      onSelectBook(book);
    } else {
      const defaultUrl1 =
        'https://www.amazon.com/Retreadment-Dont-Retire-Life-Structure/dp/B0HBNGXFH6/ref=sr_1_1?crid=1YSO2XRQDNVF6&keywords=Retirement+Don%27t+Retire+from+Life&qid=1793222605&sr=1-1';
      const defaultUrl2 =
        'https://www.amazon.com/Retreadment-Companion-Better-Write-Practice-ebook/dp/B0HGN8N7C1?ref_=ast_author_dp_rw&th=1&psc=1';
      const url =
        book.amazonUrl ||
        (book.id === 'retreadment-companion' ? defaultUrl2 : defaultUrl1);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Calculate dynamic subtotal
  const subtotalNumber = books.reduce((sum, b) => {
    const priceNum = parseFloat((b.price || '6.95').replace(/[^0-9.]/g, '')) || 6.95;
    return sum + priceNum;
  }, 0);
  const subtotalFormatted = `$${subtotalNumber.toFixed(2)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-[#F8FAFC]">
          {isSelectingBook ? (
            <button
              onClick={() => setIsSelectingBook(false)}
              className="flex items-center space-x-1.5 text-xs font-semibold text-stone-700 hover:text-[#125688] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Cart</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#125688]" />
              <h3 className="font-serif font-bold text-[#0E1E31] text-base">Your Cart</h3>
            </div>
          )}

          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* VIEW 1: SELECT WHICH BOOK TO ORDER (When user clicked Order Direct on Amazon) */}
        {isSelectingBook ? (
          <div className="p-5">
            <div className="text-center mb-4">
              <span className="inline-block px-2.5 py-0.5 bg-[#125688]/10 text-[#125688] text-[11px] font-bold uppercase tracking-wider rounded-full mb-1.5">
                Choose Book to Order
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-base">
                Which book would you like to order?
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Select a book below to open its official Amazon listing:
              </p>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-0.5">
              {books.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleBookOrder(book)}
                  className="group p-3.5 border border-stone-200 hover:border-[#125688] rounded-lg bg-stone-50 hover:bg-white hover:shadow-md transition-all cursor-pointer flex items-center space-x-3.5"
                >
                  <img
                    src={book.coverImage || '/images/clean_featured_book1.png'}
                    alt={book.title}
                    className="w-12 h-16 object-contain rounded-xs shadow-xs shrink-0 bg-white group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif font-bold text-stone-900 text-xs sm:text-sm line-clamp-1 group-hover:text-[#125688] transition-colors">
                      {book.title}
                    </h5>
                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {book.subtitle}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-bold text-[#0E1E31]">
                        {book.price || '$6.95'}
                      </span>
                      <span className="inline-flex items-center space-x-1 text-xs font-semibold text-white bg-[#125688] hover:bg-[#0E4770] px-3 py-1 rounded transition-colors shadow-xs">
                        <span>Order on Amazon</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => setIsSelectingBook(false)}
                className="text-xs text-stone-500 hover:text-stone-800 font-medium cursor-pointer"
              >
                ← Return to Cart view
              </button>
              <span className="text-[11px] text-stone-400">
                Official Amazon Prime Links
              </span>
            </div>
          </div>
        ) : (
          /* VIEW 2: STANDARD CART VIEW WITH ITEMS AND DIRECT OPTIONS */
          <>
            {/* Cart Items */}
            <div className="p-5 space-y-4 max-h-80 overflow-y-auto">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="flex items-start space-x-3.5 pb-4 border-b border-stone-100 last:border-0 last:pb-0"
                >
                  <img
                    src={book.coverImage || '/images/clean_featured_book1.png'}
                    alt={book.title}
                    className="w-12 h-16 object-contain rounded-xs shadow-xs shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {book.subtitle}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-bold text-[#0E1E31]">
                        {book.price || '$6.95'}
                      </span>
                      <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        In Stock
                      </span>
                    </div>

                    {/* Direct individual order button for each book */}
                    <button
                      onClick={() => handleBookOrder(book)}
                      className="mt-2.5 inline-flex items-center space-x-1 text-[11px] font-semibold text-[#125688] hover:text-[#0E4770] bg-blue-50/70 hover:bg-blue-100/70 px-2.5 py-1 rounded transition-colors cursor-pointer"
                      title={`Order ${book.title} on Amazon`}
                    >
                      <span>Order this book on Amazon</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with Checkout */}
            <div className="p-5 bg-stone-50 border-t border-stone-200">
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-stone-600 font-medium">Subtotal</span>
                <span className="font-bold text-base text-[#0E1E31]">{subtotalFormatted}</span>
              </div>

              {/* Clicking this button prompts the user to choose which book to order on Amazon */}
              <button
                type="button"
                onClick={() => setIsSelectingBook(true)}
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#125688] hover:bg-[#0E4770] text-white py-3 rounded-md text-sm font-semibold transition-colors shadow-xs cursor-pointer"
              >
                <span>Order Direct on Amazon</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              
              <p className="text-[11px] text-stone-500 text-center mt-2">
                Click to choose which book to order on Amazon with fast Prime delivery
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
