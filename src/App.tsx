import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedBooks } from './components/FeaturedBooks';
import { AboutAuthor } from './components/AboutAuthor';
import { BenefitsStrip } from './components/BenefitsStrip';
import { BlogSection } from './components/BlogSection';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { PolicyModal } from './components/PolicyModal';
import { SearchModal } from './components/SearchModal';
import { CartModal } from './components/CartModal';
import { FullAdminDashboard } from './components/FullAdminDashboard';
import { BookInfo, DEFAULT_SITE_CONFIG, SITE_CONFIG } from './data/siteConfig';
import { Settings } from 'lucide-react';
import { loadSiteConfig, getSyncSiteConfig, saveSiteConfig } from './lib/storage';
import { isSupabaseConfigured, loadConfigFromSupabase, saveConfigToSupabase } from './lib/supabase';
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

  // Instant synchronous initialization from cache: zero delay, zero stale flash on refresh
  const [config, setConfig] = useState<typeof SITE_CONFIG>(() => {
    const cached = getSyncSiteConfig();
    if (cached && Array.isArray(cached.books) && cached.books.length > 0) {
      return cached;
    }
    return DEFAULT_SITE_CONFIG;
  });

  const [books, setBooks] = useState<BookInfo[]>(() => {
    const cached = getSyncSiteConfig();
    if (cached && Array.isArray(cached.books) && cached.books.length > 0) {
      return cached.books;
    }
    return DEFAULT_SITE_CONFIG.books;
  });

  // Background silent sync: keeps local state authoritative without UI flickering
  useEffect(() => {
    let isMounted = true;

    const syncAuthoritativeData = async () => {
      // 1. If localStorage was empty, check IndexedDB
      if (!getSyncSiteConfig()) {
        const idbData = await loadSiteConfig();
        if (isMounted && idbData && Array.isArray(idbData.books) && idbData.books.length > 0) {
          setConfig(idbData);
          setBooks(idbData.books);
        }
      }

      // 2. Silently fetch from Supabase in the background
      if (isSupabaseConfigured()) {
        try {
          const cloudConfig = await loadConfigFromSupabase();
          if (isMounted && cloudConfig && Array.isArray(cloudConfig.books) && cloudConfig.books.length > 0) {
            setConfig((prevConfig) => {
              const currentStr = JSON.stringify(prevConfig);
              const cloudStr = JSON.stringify(cloudConfig);
              if (currentStr !== cloudStr) {
                if (cloudConfig.books && Array.isArray(cloudConfig.books)) {
                  setBooks(cloudConfig.books);
                }
                return cloudConfig;
              }
              return prevConfig;
            });
            // Always persist latest cloud config into cache for instantaneous next refresh
            await saveSiteConfig(cloudConfig);
          }
        } catch (err) {
          console.warn('Silent cloud sync note:', err);
        }
      }
    };

    syncAuthoritativeData();

    return () => {
      isMounted = false;
    };
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
    const versioned = { ...newConfig, designVersion: 5 };
    setConfig(versioned);
    if (Array.isArray(versioned.books) && versioned.books.length > 0) {
      setBooks(versioned.books);
    }
    saveSiteConfig(versioned).catch((err) => {
      console.warn('Storage warning:', err);
    });
    if (isSupabaseConfigured()) {
      saveConfigToSupabase(versioned).catch((err) => {
        console.warn('Supabase sync note in App:', err);
      });
    }
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

  const handleOpenBookAmazon = (book: BookInfo) => {
    const defaultUrl1 =
      'https://www.amazon.com/Retreadment-Dont-Retire-Life-Structure/dp/B0HBNGXFH6/ref=sr_1_1?crid=1YSO2XRQDNVF6&keywords=Retirement+Don%27t+Retire+from+Life&qid=1793222605&sr=1-1';
    const defaultUrl2 =
      'https://www.amazon.com/Retreadment-Companion-Better-Write-Practice-ebook/dp/B0HGN8N7C1?ref_=ast_author_dp_rw&th=1&psc=1';
    const url =
      book.amazonUrl ||
      (book.id === 'retreadment-companion' ? defaultUrl2 : defaultUrl1);
    window.open(url, '_blank', 'noopener,noreferrer');
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
        <Hero onSelectBook={handleOpenBookAmazon} config={config} />

        {/* 3. Featured Books Section: "Books for a More Fulfilling Tomorrow" */}
        <FeaturedBooks
          books={books}
          config={config}
          onSelectBook={handleOpenBookAmazon}
        />

        {/* 4. About the Author Section: Desk with Books & Andy Mahoney */}
        <AboutAuthor onOpenContact={() => setIsContactOpen(true)} config={config} books={books} />

        {/* 5. Benefits Section: "WHY READ ANDY MAHONEY / More Than Just Books" */}
        <BenefitsStrip />

        {/* 6. Blog & Articles Section: "From the Author's Desk / Practical Life Guides" */}
        <BlogSection />

        {/* 7. What Readers Say Section: "Reader Reviews & Praise" */}
        <Testimonials config={config} />

        {/* 8. Newsletter Section: "Stay Inspired" */}
        <Newsletter config={config} />
      </main>

      {/* 9. Dark Navy Footer */}
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
        onSelectBook={handleOpenBookAmazon}
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

      <PolicyModal
        type={policyType}
        onClose={() => setPolicyType(null)}
      />
    </div>
  );
}
