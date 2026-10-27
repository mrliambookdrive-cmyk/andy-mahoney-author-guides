import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface NewsletterProps {
  config?: typeof SITE_CONFIG;
}

export const Newsletter: React.FC<NewsletterProps> = ({ config }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const activeConfig = config || SITE_CONFIG;
  const newsletterData = activeConfig.newsletter || {
    heading: 'Stay Inspired',
    description: 'Get the latest updates, new releases, and motivational insights straight to your inbox.',
    placeholder: 'Your email address',
    buttonText: 'Subscribe',
    privacyNote: 'No spam. Just good reads.',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      try {
        const existing = JSON.parse(localStorage.getItem('andy_mahoney_subscribers') || '[]');
        if (!existing.includes(email.trim())) {
          existing.push(email.trim());
          localStorage.setItem('andy_mahoney_subscribers', JSON.stringify(existing));
        }
      } catch {
        // ignore
      }
    }, 500);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#DCE8F2]">
      {/* Background Mountain Watercolor Image (clean, zero pre-baked text) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-95"
        style={{ backgroundImage: `url('/images/newsletter_bg.png')` }}
      />
      {/* Subtle blend gradient across the width */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#DCE8F2]/40 via-transparent to-[#DCE8F2]/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-5 text-left">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#0E1E31] mb-2 leading-tight tracking-tight">
              {newsletterData.heading || 'Stay Inspired'}
            </h2>
            <p className="text-xs sm:text-[13px] text-stone-700 max-w-md leading-relaxed font-normal">
              {newsletterData.description ||
                'Get the latest updates, new releases, and motivational insights straight to your inbox.'}
            </p>
          </div>

          {/* Center Column: Interactive Subscribe Form */}
          <div className="lg:col-span-5 text-left">
            {status === 'success' ? (
              <div className="bg-white/95 backdrop-blur-xs border border-emerald-300 p-4 rounded-md flex items-center space-x-3 text-emerald-800 shadow-sm animate-fade-in max-w-md">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold">Thank you for subscribing!</p>
                  <p className="text-stone-600 text-xs">
                    You're now on Andy's private list for inspiring insights.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder={newsletterData.placeholder || 'Your email address'}
                    className="flex-1 bg-white border border-stone-300 rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#125688] shadow-2xs"
                    disabled={status === 'loading'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-[#125688] hover:bg-[#0E4770] text-white px-5 sm:px-6 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-sm cursor-pointer shrink-0 disabled:opacity-70"
                  >
                    {status === 'loading' ? 'Saving...' : (newsletterData.buttonText || 'Subscribe')}
                  </button>
                </div>

                <p className="text-[11px] text-stone-600 mt-2 block">
                  {newsletterData.privacyNote || 'No spam. Just good reads.'}
                </p>

                {status === 'error' && errorMessage && (
                  <div className="flex items-center space-x-1 mt-1.5 text-xs text-red-600 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Right Column: "Better Every Day" Calligraphy Artwork (Transparent PNG) */}
          <div className="lg:col-span-2 hidden lg:flex justify-end items-center">
            <div className="w-32 h-auto select-none pointer-events-none transform -rotate-1">
              <img
                src="/images/better_every_day_calligraphy.png"
                alt="Better Every Day"
                className="w-full h-auto object-contain filter drop-shadow-xs"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
