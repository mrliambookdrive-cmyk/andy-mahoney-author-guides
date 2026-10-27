import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic email validation regex
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
      // Simulate newsletter registration
      setStatus('success');
      // Store in localStorage if available
      try {
        const existing = JSON.parse(localStorage.getItem('andy_mahoney_subscribers') || '[]');
        if (!existing.includes(email.trim())) {
          existing.push(email.trim());
          localStorage.setItem('andy_mahoney_subscribers', JSON.stringify(existing));
        }
      } catch {
        // ignore storage errors
      }
    }, 600);
  };

  return (
    <section className="bg-[#0A192A] text-white py-14 md:py-18 border-b border-[#142940]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading and description */}
          <div className="lg:col-span-7 text-left">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#E5A754] mb-2.5">
              {SITE_CONFIG.newsletter.eyebrow}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.4rem] font-bold text-white leading-[1.2]">
              {SITE_CONFIG.newsletter.heading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mt-3 max-w-xl">
              {SITE_CONFIG.newsletter.description}
            </p>
          </div>

          {/* Right Column: Email input and Subscribe CTA */}
          <div className="lg:col-span-5 text-left">
            {status === 'success' ? (
              <div className="bg-[#122A42] border border-[#234568] p-5 rounded-sm flex items-start gap-3 text-emerald-300 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-white">Thank you for subscribing!</p>
                  <p className="text-xs text-slate-300 mt-1">
                    You're now subscribed for book updates and practical insights with <span className="font-medium text-white">{email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setEmail('');
                    }}
                    className="mt-3 text-xs text-[#E5A754] hover:underline cursor-pointer"
                  >
                    Subscribe another email
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col sm:flex-row items-stretch overflow-hidden rounded-sm shadow-xs border border-white/20 focus-within:border-[#B87B33] transition-colors">
                  <div className="relative flex-1 bg-white flex items-center">
                    <Mail className="absolute left-3.5 w-4 h-4 text-stone-400 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder={SITE_CONFIG.newsletter.placeholder}
                      className="w-full py-3.5 pl-10 pr-3 text-xs sm:text-sm text-stone-900 bg-white placeholder-stone-400 focus:outline-none"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-[#B87B33] hover:bg-[#A56D2B] text-white px-6 py-3.5 font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer disabled:opacity-70 active:scale-[0.99]"
                  >
                    <span>{status === 'loading' ? 'Subscribing...' : SITE_CONFIG.newsletter.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Validation Error Message */}
                {status === 'error' && (
                  <p className="mt-2 text-xs text-rose-300 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </p>
                )}

                {/* Privacy note */}
                <p className="mt-2.5 text-[11px] sm:text-xs text-slate-400">
                  {SITE_CONFIG.newsletter.privacyNote}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
