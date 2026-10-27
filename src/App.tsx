import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BenefitsStrip } from './components/BenefitsStrip';
import { FeaturedBooks } from './components/FeaturedBooks';
import { LifestyleBanner } from './components/LifestyleBanner';
import { Testimonials } from './components/Testimonials';
import { AboutAuthor } from './components/AboutAuthor';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { BookDetailModal } from './components/BookDetailModal';
import { PolicyModal } from './components/PolicyModal';
import { FullAdminDashboard } from './components/FullAdminDashboard';
import { BookInfo, SITE_CONFIG } from './data/siteConfig';
import { Settings } from 'lucide-react';
import { loadSiteConfig, getSyncSiteConfig, saveSiteConfig } from './lib/storage';
import { AdminAuthModal } from './components/AdminAuthModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookInfo | null>(null);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  // Load config from sync localStorage or fallback to default SITE_CONFIG
  const [config, setConfig] = useState(() => {
    const saved = getSyncSiteConfig();
    return saved || SITE_CONFIG;
  });

  const [books, setBooks] = useState<BookInfo[]>(config.books || SITE_CONFIG.books);

  // Load latest config asynchronously from high-capacity IndexedDB on startup
  useEffect(() => {
    loadSiteConfig().then((loaded) => {
      if (loaded) {
        setConfig(loaded);
        if (loaded.books) {
          setBooks(loaded.books);
        }
      }
    });
  }, []);

  // Update books when config changes
  useEffect(() => {
    if (config.books) {
      setBooks(config.books);
    }
  }, [config]);

  // Listen for Ctrl + Shift + E shortcut to prompt password and open admin panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setIsAdminOpen((currentAdminOpen) => {
          if (currentAdminOpen) {
            return false;
          } else {
            setIsAuthModalOpen(true);
            return false;
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Monitor active scroll section for navbar highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'books', 'about'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUpdateConfig = (newConfig: typeof SITE_CONFIG) => {
    setConfig(newConfig);
    saveSiteConfig(newConfig).catch((err) => {
      console.warn('Storage warning:', err);
    });
  };

  const handleUpdateAmazonUrl = (bookId: string, newUrl: string) => {
    const updatedBooks = books.map((b) => (b.id === bookId ? { ...b, amazonUrl: newUrl } : b));
    setBooks(updatedBooks);
    const newConfig = { ...config, books: updatedBooks };
    handleUpdateConfig(newConfig);
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook((prev) => (prev ? { ...prev, amazonUrl: newUrl } : null));
    }
  };

  // If Admin Dashboard is open, render full-screen admin dashboard page
  if (isAdminOpen) {
    return (
      <FullAdminDashboard
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onExitAdmin={() => setIsAdminOpen(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] flex flex-col font-sans selection:bg-[#B87B33]/20 selection:text-[#B87B33]">
      {/* 1. Top Navigation Bar */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero onSelectBook={(book) => setSelectedBook(book)} config={config} />

        {/* 3. Four-Column Benefits Strip */}
        <BenefitsStrip />

        {/* 4. Featured Book Collection */}
        <FeaturedBooks
          books={books}
          config={config}
          onSelectBook={(book) => setSelectedBook(book)}
        />

        {/* 5. Full-Width Lifestyle Banner */}
        <LifestyleBanner config={config} />

        {/* 6. Testimonials Section */}
        <Testimonials />

        {/* 7. About the Author Section */}
        <AboutAuthor onOpenContact={() => setIsContactOpen(true)} config={config} books={books} />

        {/* 8. Dark Navy Newsletter Signup Section */}
        <Newsletter />
      </main>

      {/* 9. Elegant Footer */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onOpenPrivacy={() => setPolicyType('privacy')}
        onOpenTerms={() => setPolicyType('terms')}
      />

      {/* Floating Admin Trigger Button (Bottom Right) */}
      <button
        onClick={() => {
          if (isAdminOpen) {
            setIsAdminOpen(false);
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        className="fixed bottom-6 right-6 z-40 bg-[#0E1E31] hover:bg-[#1A2D44] text-white p-3.5 rounded-full shadow-xl flex items-center justify-center group transition-all duration-300 hover:scale-105 border border-stone-700"
        title="Open Admin Dashboard (Ctrl + Shift + E)"
      >
        <Settings className="w-5 h-5 text-[#B87B33] animate-spin-slow" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-medium pl-0 group-hover:pl-2">
          Admin Dashboard (Ctrl+Shift+E)
        </span>
      </button>

      {/* Password Protection Modal for Admin Dashboard */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          setIsAdminOpen(true);
        }}
      />

      {/* Interactive Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onUpdateAmazonUrl={handleUpdateAmazonUrl}
      />

      <PolicyModal
        type={policyType}
        onClose={() => setPolicyType(null)}
      />
    </div>
  );
}
