import React from 'react';
import { Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { BrandLogo } from './BrandLogo';

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
          
          {/* Brand Logo Lockup — Pure vector & typography */}
          <div className="flex items-center">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('hero');
              }}
              className="cursor-pointer group"
              aria-label="Andy Mahoney"
            >
              <BrandLogo variant="dark" />
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
              onClick={() => scrollTo('blog')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Blog
            </button>
            <button
              onClick={() => scrollTo('reviews')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              What Readers Say
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
