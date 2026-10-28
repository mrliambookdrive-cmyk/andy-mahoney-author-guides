import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedBooks } from './components/FeaturedBooks';
import { AboutAuthor } from './components/AboutAuthor';
import { BenefitsStrip } from './components/BenefitsStrip';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { BookDetailModal } from './components/BookDetailModal';
import { PolicyModal } from './components/PolicyModal';
import { SearchModal } from './components/SearchModal';
import { CartModal } from './components/CartModal';
import { FullAdminDashboard } from './components/FullAdminDashboard';
import { BookInfo, DEFAULT_SITE_CONFIG, SITE_CONFIG } from './data/siteConfig';
import { Settings } from 'lucide-react';
import { loadSiteConfig, getSyncSiteConfig, saveSiteConfig } from './lib/storage';
import { isSupabaseConfigured, loadConfigFromSupabase } from './lib/supabase';
import { AdminAuthModal } from './components/AdminAuthModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookInfo | null>(null);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  // Load config: prefer new design version 3 or fallback to updated DEFAULT_SITE_CONFIG
  const [config, setConfig] = useState(() => {
    const saved = getSyncSiteConfig();
    if (saved && saved.designVersion === 3 && !saved.newsletter?.heading?.includes('Get Updates')) {
      return saved;
    }
    return { ...DEFAULT_SITE_CONFIG, designVersion: 3 };
  });

  const [books, setBooks] = useState<BookInfo[]>(config.books || DEFAULT_SITE_CONFIG.books);

  // Load latest config: local storage first for speed, then Supabase if connected
  useEffect(() => {
    const initConfig = async () => {
      // 1. Load from IndexedDB/localStorage first for instant render
      const loaded = await loadSiteConfig();
      if (loaded && loaded.designVersion === 3 && !loaded.newsletter?.heading?.includes('Get Updates')) {
        setConfig(loaded);
        if (loaded.books) {
          setBooks(loaded.books);
        }
      } else {
        const freshConfig = {
          ...DEFAULT_SITE_CONFIG,
          ...(loaded || {}),
          newsletter: { ...DEFAULT_SITE_CONFIG.newsletter },
          author: {
            ...DEFAULT_SITE_CONFIG.author,
            aboutImage: DEFAULT_SITE_CONFIG.author.aboutImage,
            heroImage: DEFAULT_SITE_CONFIG.author.heroImage,
          },
          books: DEFAULT_SITE_CONFIG.books,
          designVersion: 3,
        };
        setConfig(freshConfig);
        setBooks(freshConfig.books);
        saveSiteConfig(freshConfig).catch(() => {});
      }

      // 2. If Supabase is configured, fetch latest database state & sync
      if (isSupabaseConfigured()) {
        try {
          const supabaseConfig = await loadConfigFromSupabase();
          if (supabaseConfig) {
            setConfig(supabaseConfig);
            if (supabaseConfig.books) {
              setBooks(supabaseConfig.books);
            }
            await saveSiteConfig(supabaseConfig);
          }
        } catch (err) {
          console.warn('Could not sync with Supabase on startup:', err);
        }
      }
    };

    initConfig();
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
      const sections = ['hero', 'books', 'about', 'why-read'];
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
    const versioned = { ...newConfig, designVersion: 2 };
    setConfig(versioned);
    saveSiteConfig(versioned).catch((err) => {
      console.warn('Storage warning:', err);
    });
  };

  const handleUpdateAmazonUrl = (bookId: string, newUrl: string) => {
    const updatedBooks = books.map((b) => (b.id === bookId ? { ...b, amazonUrl: newUrl } : b));
    setBooks(updatedBooks);
    const newConfig = { ...config, books: updatedBooks, designVersion: 2 };
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
    <div className="min-h-screen bg-white text-[#1E293B] flex flex-col font-sans selection:bg-[#125688]/20 selection:text-[#125688]">
      {/* 1. Header / Navbar */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-grow">
        {/* 2. Hero Section: "Better Habits. A Brighter Future." */}
        <Hero onSelectBook={(book) => setSelectedBook(book)} config={config} />

        {/* 3. Featured Books Section: "Books for a More Fulfilling Tomorrow" */}
        <FeaturedBooks
          books={books}
          config={config}
          onSelectBook={(book) => setSelectedBook(book)}
        />

        {/* 4. About the Author Section: Desk with Books & Andy Mahoney */}
        <AboutAuthor onOpenContact={() => setIsContactOpen(true)} config={config} books={books} />

        {/* 5. Benefits Section: "WHY READ ANDY MAHONEY / More Than Just Books" */}
        <BenefitsStrip />

        {/* 6. Newsletter Section: "Stay Inspired" */}
        <Newsletter config={config} />
      </main>

      {/* 7. Dark Navy Footer */}
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
        className="fixed bottom-6 right-6 z-40 bg-[#0E1E31] hover:bg-[#1A2D44] text-white p-3.5 rounded-full shadow-xl flex items-center justify-center group transition-all duration-300 hover:scale-105 border border-stone-700 cursor-pointer"
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
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        books={books}
        onSelectBook={(book) => setSelectedBook(book)}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        books={books}
      />

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
