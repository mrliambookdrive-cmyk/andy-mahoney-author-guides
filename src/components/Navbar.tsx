import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenSearch?: () => void;
  onOpenCart?: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenContact, 
  onOpenSearch,
  onOpenCart,
  activeSection 
}) => {
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
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-200 border-b ${
        scrolled ? 'border-stone-200 shadow-xs' : 'border-stone-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Brand Logo & Subtitle */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            className="flex items-center space-x-3 group text-left cursor-pointer"
          >
            <div className="h-10 sm:h-11 flex items-center">
              <img
                src="/images/site_logo.png"
                alt="Andy Mahoney — Books That Build a Better You"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9 text-sm font-medium text-stone-700">
            <button
              onClick={() => scrollTo('hero')}
              className={`transition-colors py-2 cursor-pointer hover:text-[#125688] relative ${
                activeSection === 'hero'
                  ? 'text-[#125688] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#125688]'
                  : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('books')}
              className={`transition-colors py-2 cursor-pointer hover:text-[#125688] relative ${
                activeSection === 'books'
                  ? 'text-[#125688] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#125688]'
                  : ''
              }`}
            >
              All Books
            </button>
            <button
              onClick={() => scrollTo('about')}
              className={`transition-colors py-2 cursor-pointer hover:text-[#125688] relative ${
                activeSection === 'about'
                  ? 'text-[#125688] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#125688]'
                  : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollTo('why-read')}
              className="transition-colors py-2 cursor-pointer hover:text-[#125688]"
            >
              Blog
            </button>
            <button
              onClick={onOpenContact}
              className="transition-colors py-2 cursor-pointer hover:text-[#125688]"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Icons (Search & Shopping Cart) */}
          <div className="hidden md:flex items-center space-x-5 text-stone-700">
            <button
              onClick={onOpenSearch}
              className="p-1.5 hover:text-[#125688] transition-colors cursor-pointer rounded-md hover:bg-stone-50"
              title="Search books..."
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenCart}
              className="p-1.5 hover:text-[#125688] transition-colors cursor-pointer rounded-md hover:bg-stone-50 relative"
              title="View Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#125688] rounded-full"></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-600 hover:text-[#125688]"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-[#125688] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-5 pt-3 pb-6 space-y-4 animate-fade-in shadow-lg">
          <div className="flex flex-col space-y-3 font-medium text-stone-700 text-sm">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left py-2 hover:text-[#125688] border-b border-stone-100"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('books')}
              className="text-left py-2 hover:text-[#125688] border-b border-stone-100"
            >
              All Books
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-2 hover:text-[#125688] border-b border-stone-100"
            >
              About
            </button>
            <button
              onClick={() => scrollTo('why-read')}
              className="text-left py-2 hover:text-[#125688] border-b border-stone-100"
            >
              Blog
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left py-2 hover:text-[#125688]"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
