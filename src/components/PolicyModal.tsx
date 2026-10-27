import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF7F2] rounded-md max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5DDD0] text-left max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D4]">
          <div className="flex items-center gap-2">
            {isPrivacy ? (
              <ShieldCheck className="w-5 h-5 text-[#B87B33]" />
            ) : (
              <FileText className="w-5 h-5 text-[#B87B33]" />
            )}
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0E1E31]">
              {isPrivacy ? 'Privacy Policy' : 'Terms of Use'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-900 p-1 rounded-sm focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto py-5 space-y-4 text-xs sm:text-sm text-[#554E44] leading-relaxed pr-2">
          {isPrivacy ? (
            <>
              <p>
                <strong>Last Updated: October 2026</strong>
              </p>
              <p>
                Andy Mahoney ("we", "us", or "our") respects your personal privacy. This Privacy Policy clarifies how reader information is handled when you visit our website, sign up for newsletter updates, or inquire about books.
              </p>
              <h4 className="font-serif font-bold text-[#0E1E31] text-base pt-2">
                1. Information We Collect
              </h4>
              <p>
                We only collect email addresses willingly submitted to our newsletter or inquiries sent via our contact form. We do not sell, rent, or trade email lists with third parties or data brokers.
              </p>
              <h4 className="font-serif font-bold text-[#0E1E31] text-base pt-2">
                2. How We Use Information
              </h4>
              <p>
                Your contact details are solely used to deliver author updates, book announcements, practical retirement guidance essays, and responses to your direct inquiries.
              </p>
              <h4 className="font-serif font-bold text-[#0E1E31] text-base pt-2">
                3. Unsubscribing
              </h4>
              <p>
                Every correspondence includes an immediate one-click unsubscribe mechanism. You may also contact us directly at any time to request data removal.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Last Updated: October 2026</strong>
              </p>
              <p>
                Welcome to Andy Mahoney's official author website. By browsing this website, you agree to comply with and be bound by the following terms of use.
              </p>
              <h4 className="font-serif font-bold text-[#0E1E31] text-base pt-2">
                1. Intellectual Property
              </h4>
              <p>
                All book titles, excerpts, cover art, text, and original materials on this website are the intellectual property of Andy Mahoney and protected by applicable copyright law.
              </p>
              <h4 className="font-serif font-bold text-[#0E1E31] text-base pt-2">
                2. External Book Retailers
              </h4>
              <p>
                Links to Amazon or external book distributors are provided for reader convenience. Purchases made on external platforms are governed by the respective platform's sales policies and terms.
              </p>
              <h4 className="font-serif font-bold text-[#0E1E31] text-base pt-2">
                3. Informational Nature
              </h4>
              <p>
                The books and guidance provided are intended for personal enrichment, reflection, and educational purposes regarding post-work life planning.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E8E1D4] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#B87B33] text-white text-xs sm:text-sm font-medium rounded-sm hover:bg-[#A56D2B] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
