import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface NavbarProps {
  onOpenContact: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
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
    <header
      className={`sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md transition-all duration-200 border-b ${
        scrolled ? 'border-[#E6DFD3] shadow-xs' : 'border-[#ECE5D9]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-22">
          {/* Brand lockup */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            className="flex flex-col group text-left cursor-pointer"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.16em] text-[#0E1E31] transition-colors group-hover:text-[#B87B33]">
              {SITE_CONFIG.author.name}
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.18em] text-[#71695F] font-sans font-medium uppercase mt-0.5">
              {SITE_CONFIG.author.tagline}
            </span>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#4A453E]">
            <button
              onClick={() => scrollTo('hero')}
              className={`transition-colors py-1 cursor-pointer hover:text-[#0E1E31] relative ${
                activeSection === 'hero'
                  ? 'text-[#0E1E31] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0E1E31]'
                  : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('books')}
              className={`transition-colors py-1 cursor-pointer hover:text-[#0E1E31] relative ${
                activeSection === 'books'
                  ? 'text-[#0E1E31] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0E1E31]'
                  : ''
              }`}
            >
              Books
            </button>
            <button
              onClick={() => scrollTo('about')}
              className={`transition-colors py-1 cursor-pointer hover:text-[#0E1E31] relative ${
                activeSection === 'about'
                  ? 'text-[#0E1E31] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0E1E31]'
                  : ''
              }`}
            >
              About Andy
            </button>
            <button
              onClick={onOpenContact}
              className="transition-colors py-1 cursor-pointer hover:text-[#0E1E31]"
            >
              Contact
            </button>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => scrollTo('books')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-xs sm:text-sm font-medium rounded-sm transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer active:scale-[0.98]"
            >
              <span>Explore the Books</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0E1E31] hover:text-[#B87B33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B87B33] rounded"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E6DFD3] px-6 py-5 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-4 text-base font-medium text-[#4A453E]">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left py-2 hover:text-[#B87B33] border-b border-[#ECE5D9]/60"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('books')}
              className="text-left py-2 hover:text-[#B87B33] border-b border-[#ECE5D9]/60"
            >
              Books
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-2 hover:text-[#B87B33] border-b border-[#ECE5D9]/60"
            >
              About Andy
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left py-2 hover:text-[#B87B33] border-b border-[#ECE5D9]/60"
            >
              Contact
            </button>

            <button
              onClick={() => scrollTo('books')}
              className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-[#B87B33] hover:bg-[#A56D2B] text-white font-medium rounded-sm transition-colors text-sm"
            >
              <span>Explore the Books</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
