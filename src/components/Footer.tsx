import React from 'react';
import { Mail, Facebook, Linkedin, Youtube } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface FooterProps {
  onOpenContact: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContact,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-[#FAF7F2] text-[#4A433A] pt-12 pb-8 border-t border-[#E8E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('hero');
              }}
              className="inline-block group"
            >
              <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.16em] text-[#0E1E31] group-hover:text-[#B87B33] transition-colors">
                {SITE_CONFIG.author.name}
              </span>
            </a>
            <p className="text-xs text-[#71695F] tracking-wide mt-1">
              {SITE_CONFIG.author.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-[#4A433A]">
            <button
              onClick={() => scrollTo('hero')}
              className="hover:text-[#B87B33] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('books')}
              className="hover:text-[#B87B33] transition-colors cursor-pointer"
            >
              Books
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="hover:text-[#B87B33] transition-colors cursor-pointer"
            >
              About Andy
            </button>
            <button
              onClick={onOpenContact}
              className="hover:text-[#B87B33] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-[#0E1E31]">
            <a
              href={SITE_CONFIG.socials.email}
              aria-label="Email Andy Mahoney"
              className="w-8 h-8 rounded-full border border-[#D5C9B8] flex items-center justify-center hover:bg-[#B87B33] hover:text-white hover:border-[#B87B33] transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={SITE_CONFIG.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full border border-[#D5C9B8] flex items-center justify-center hover:bg-[#B87B33] hover:text-white hover:border-[#B87B33] transition-colors duration-200"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={SITE_CONFIG.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full border border-[#D5C9B8] flex items-center justify-center hover:bg-[#B87B33] hover:text-white hover:border-[#B87B33] transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={SITE_CONFIG.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full border border-[#D5C9B8] flex items-center justify-center hover:bg-[#B87B33] hover:text-white hover:border-[#B87B33] transition-colors duration-200"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Legal Hairline & Copyright */}
        <div className="pt-6 border-t border-[#E8E1D4] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7266] gap-3">
          <p>© 2026 Andy Mahoney. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#0E1E31] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-[#0E1E31] transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
