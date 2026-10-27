import React from 'react';
import { Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface FooterProps {
  onOpenContact: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContact,
}) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-[#0B1A2D] text-stone-300 pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Header / Navigation Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6">
          
          {/* Brand Logo Lockup */}
          <div className="flex items-center">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('hero');
              }}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <img
                src="/images/brand_icon.png"
                alt="Andy Mahoney"
                className="h-6 w-auto object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-serif text-lg font-bold tracking-tight text-white group-hover:text-stone-100 transition-colors">
                Andy Mahoney
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-stone-300">
            <button
              onClick={() => scrollTo('hero')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('books')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              All Books
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollTo('why-read')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Blog
            </button>
            <button
              onClick={onOpenContact}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 text-stone-300">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-white transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenContact}
              aria-label="Email"
              className="hover:text-white transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-stone-400">
            © 2025 Andy Mahoney. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
