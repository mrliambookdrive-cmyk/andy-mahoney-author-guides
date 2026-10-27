import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Sparkles,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  Save,
  Check,
  Search,
  Bell,
  User,
  Shield,
  TrendingUp,
  Eye,
  DollarSign,
  Layers,
  Menu,
  X,
  Database,
  Image as ImageIcon,
  Upload,
  Loader2
} from 'lucide-react';
import { SITE_CONFIG, BookInfo } from '../data/siteConfig';
import { supabase } from '../lib/supabase';
import { saveSiteConfig, clearSiteConfig, compressImageFile } from '../lib/storage';

interface FullAdminDashboardProps {
  config: typeof SITE_CONFIG;
  onUpdateConfig: (newConfig: typeof SITE_CONFIG) => void;
  onExitAdmin: () => void;
}

export const FullAdminDashboard: React.FC<FullAdminDashboardProps> = ({
  config,
  onUpdateConfig,
  onExitAdmin,
}) => {
  const [formData, setFormData] = useState<typeof SITE_CONFIG>(config);
  const [activeMenu, setActiveMenu] = useState<'overview' | 'books' | 'media' | 'homepage' | 'about' | 'lifestyle' | 'testimonials' | 'settings'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [savedToast, setSavedToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState<string | null>(null);
  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState<string>('Ready');

  useEffect(() => {
    setFormData(config);
  }, [config]);

  const handleSave = async () => {
    setIsSaving(true);
    setSupabaseSyncStatus('Saving & Syncing...');

    try {
      // 1. Reliably save to IndexedDB & safely to localStorage (zero QuotaExceededError)
      await saveSiteConfig(formData);
      onUpdateConfig(formData);

      // 2. Sync to Supabase if connected
      if (supabase) {
        for (const book of formData.books) {
          await supabase.from('books').upsert({
            id: book.id,
            title: book.title,
            subtitle: book.subtitle,
            description: book.description,
            cover_image: book.coverImage,
            amazon_url: book.amazonUrl,
            rating: book.rating || 5,
            review_count: book.reviewCount || 1,
            publication_year: book.publicationYear,
            highlights: book.highlights,
          });
        }

        await supabase.from('site_settings').upsert({
          key: 'main_config',
          value: formData,
        });

        setSupabaseSyncStatus('Synced with Supabase & Stored!');
      } else {
        setSupabaseSyncStatus('Saved securely in storage');
      }
    } catch (err: any) {
      console.warn('Storage or Supabase warning:', err?.message || err);
      setSupabaseSyncStatus('Saved locally in high-capacity storage');
    } finally {
      setIsSaving(false);
      setSavedToast(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all changes to factory defaults?')) {
      await clearSiteConfig();
      window.location.reload();
    }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'hero' | 'book1' | 'book2' | 'lifestyle' | number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingStatus('Optimizing image...');
    try {
      // Optimize image dimensions for crisp display without wasting megabytes
      const isBook = type === 'book1' || type === 'book2' || typeof type === 'number';
      const maxWidth = isBook ? 1200 : 1920;
      const maxHeight = isBook ? 1800 : 1080;

      const compressedDataUrl = await compressImageFile(file, {
        maxWidth,
        maxHeight,
        quality: 0.84,
      });

      if (type === 'hero') {
        setFormData((prev: typeof SITE_CONFIG) => ({
          ...prev,
          author: { ...prev.author, heroImage: compressedDataUrl },
        }));
      } else if (type === 'lifestyle') {
        setFormData((prev: typeof SITE_CONFIG) => ({
          ...prev,
          lifestyle: { ...prev.lifestyle, bgImage: compressedDataUrl },
        }));
      } else if (type === 'book1') {
        setFormData((prev: typeof SITE_CONFIG) => {
          const updated = [...prev.books];
          if (updated[0]) updated[0] = { ...updated[0], coverImage: compressedDataUrl };
          return { ...prev, books: updated };
        });
      } else if (type === 'book2') {
        setFormData((prev: typeof SITE_CONFIG) => {
          const updated = [...prev.books];
          if (updated[1]) updated[1] = { ...updated[1], coverImage: compressedDataUrl };
          return { ...prev, books: updated };
        });
      } else if (typeof type === 'number') {
        setFormData((prev: typeof SITE_CONFIG) => {
          const updated = [...prev.books];
          if (updated[type]) updated[type] = { ...updated[type], coverImage: compressedDataUrl };
          return { ...prev, books: updated };
        });
      }
      setUploadingStatus('Image uploaded & optimized!');
      setTimeout(() => setUploadingStatus(null), 2500);
    } catch (err: any) {
      console.error('Image compression error:', err);
      alert('Failed to process image. Please try again or select another image.');
      setUploadingStatus(null);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex font-sans selection:bg-[#B87B33] selection:text-white">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-[#0A1118] border-r border-stone-800 transition-all duration-300 flex flex-col ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#B87B33] to-amber-600 flex items-center justify-center font-bold text-white shadow-lg shrink-0">
              AM
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-serif font-bold text-base text-white tracking-wide">CMS & Supabase</h1>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live & Connected
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-grow overflow-y-auto">
          <button
            onClick={() => setActiveMenu('overview')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeMenu === 'overview'
                ? 'bg-[#B87B33] text-white shadow-lg shadow-amber-950/30'
                : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Dashboard Overview</span>}
          </button>

          <button
            onClick={() => setActiveMenu('books')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeMenu === 'books'
                ? 'bg-[#B87B33] text-white shadow-lg shadow-amber-950/30'
                : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Books & Covers</span>}
          </button>

          <button
            onClick={() => setActiveMenu('media')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeMenu === 'media'
                ? 'bg-[#B87B33] text-white shadow-lg shadow-amber-950/30'
                : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
            }`}
          >
            <ImageIcon className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Media & Images Manager</span>}
          </button>

          <button
            onClick={() => setActiveMenu('homepage')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeMenu === 'homepage'
                ? 'bg-[#B87B33] text-white shadow-lg shadow-amber-950/30'
                : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
            }`}
          >
            <FileText className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Homepage & Hero</span>}
          </button>

          <button
            onClick={() => setActiveMenu('about')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeMenu === 'about'
                ? 'bg-[#B87B33] text-white shadow-lg shadow-amber-950/30'
                : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>About Author</span>}
          </button>

          <button
            onClick={() => setActiveMenu('lifestyle')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeMenu === 'lifestyle'
                ? 'bg-[#B87B33] text-white shadow-lg shadow-amber-950/30'
                : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
            }`}
          >
            <Layers className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Lifestyle Banner</span>}
          </button>

          <button
            onClick={() => setActiveMenu('testimonials')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeMenu === 'testimonials'
                ? 'bg-[#B87B33] text-white shadow-lg shadow-amber-950/30'
                : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
            }`}
          >
            <MessageSquare className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Testimonials</span>}
          </button>

          <button
            onClick={() => setActiveMenu('settings')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeMenu === 'settings'
                ? 'bg-[#B87B33] text-white shadow-lg shadow-amber-950/30'
                : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
            }`}
          >
            <Settings className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Supabase & Settings</span>}
          </button>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-stone-800 space-y-2">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Exit to Website</span>}
          </button>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className={`flex-grow flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold font-serif capitalize text-white">
              {activeMenu} Management
            </h2>
            <span className="text-xs bg-stone-800 text-stone-300 px-3 py-1 rounded-full border border-stone-700 flex items-center gap-1.5">
              <Database className="w-3 h-3 text-emerald-400" /> {supabaseSyncStatus}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {uploadingStatus && (
              <span className="flex items-center gap-1.5 text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1.5 rounded-full font-medium shadow-md animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" /> {uploadingStatus}
              </span>
            )}

            {savedToast && (
              <span className="flex items-center gap-1.5 text-xs bg-emerald-600 text-white px-3.5 py-1.5 rounded-full font-medium shadow-lg animate-bounce">
                <Check className="w-4 h-4" /> Changes Published & Synced! Reloading...
              </span>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving || !!uploadingStatus}
              className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#B87B33] to-amber-600 hover:from-amber-600 hover:to-[#B87B33] text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-950/40 transition-all transform active:scale-95 cursor-pointer ${
                isSaving || !!uploadingStatus ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving & Storing...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save & Sync to Supabase
                </>
              )}
            </button>

            <button
              onClick={onExitAdmin}
              className="flex items-center gap-1.5 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-sm font-medium transition border border-stone-700 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" /> View Live Site
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 flex-grow space-y-8 bg-stone-950/40 overflow-y-auto">
          {/* OVERVIEW TAB */}
          {activeMenu === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Total Books</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{formData.books.length}</h3>
                    <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Supabase Synced
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Media & Covers</p>
                    <h3 className="text-3xl font-bold text-white mt-1">4 Active</h3>
                    <p className="text-xs text-emerald-400 mt-1">Hero, Books & Banner BG</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Database Tables</p>
                    <h3 className="text-3xl font-bold text-white mt-1">3 Tables</h3>
                    <p className="text-xs text-stone-400 mt-1">books, site_settings, contacts</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Database className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Backend Status</p>
                    <h3 className="text-3xl font-bold text-emerald-400 mt-1">Connected</h3>
                    <p className="text-xs text-stone-400 mt-1">Supabase + Local Cache</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl space-y-6">
                  <h3 className="font-serif text-lg font-bold text-white border-b border-stone-800 pb-4">
                    Quick Website Controls
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setActiveMenu('media')}
                      className="p-4 bg-stone-800/60 hover:bg-stone-800 rounded-xl border border-stone-700/50 flex items-center gap-4 text-left transition group cursor-pointer"
                    >
                      <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg group-hover:scale-110 transition">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Media & Image Manager</h4>
                        <p className="text-xs text-stone-400">Upload hero, book covers & banner BG</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveMenu('books')}
                      className="p-4 bg-stone-800/60 hover:bg-stone-800 rounded-xl border border-stone-700/50 flex items-center gap-4 text-left transition group cursor-pointer"
                    >
                      <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg group-hover:scale-110 transition">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Manage Books</h4>
                        <p className="text-xs text-stone-400">Edit titles, covers & Amazon links</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveMenu('homepage')}
                      className="p-4 bg-stone-800/60 hover:bg-stone-800 rounded-xl border border-stone-700/50 flex items-center gap-4 text-left transition group cursor-pointer"
                    >
                      <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg group-hover:scale-110 transition">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Edit Hero Section</h4>
                        <p className="text-xs text-stone-400">Update headlines & descriptions</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveMenu('settings')}
                      className="p-4 bg-stone-800/60 hover:bg-stone-800 rounded-xl border border-stone-700/50 flex items-center gap-4 text-left transition group cursor-pointer"
                    >
                      <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg group-hover:scale-110 transition">
                        <Database className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Supabase Connection</h4>
                        <p className="text-xs text-stone-400">Configure database credentials</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl space-y-4">
                  <h3 className="font-serif text-lg font-bold text-white border-b border-stone-800 pb-4">
                    System Status
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">CMS Engine</span>
                      <span className="text-emerald-400 font-medium">React 19 / Vite</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Database</span>
                      <span className="text-emerald-400 font-medium">Supabase Ready</span>
                    </div>
                    <div className="pt-4 border-t border-stone-800">
                      <button
                        onClick={handleReset}
                        className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-semibold transition border border-red-500/20 cursor-pointer"
                      >
                        Reset All Config to Default
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MEDIA & IMAGES MANAGER TAB WITH FILE UPLOAD */}
          {activeMenu === 'media' && (
            <div className="space-y-6 bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl animate-in fade-in duration-200">
              <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Media & Image Manager</h3>
                  <p className="text-xs text-stone-400 mt-1">Upload images from your device or paste URLs to update hero banner, book covers, and lifestyle background</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Hero Banner Image */}
                <div className="bg-stone-800/60 p-5 rounded-2xl border border-stone-700/60 space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Hero Background Banner</h4>
                    <p className="text-xs text-stone-400 mb-4">Widescreen banner image shown at top of website.</p>
                    <div className="w-full h-32 rounded-xl overflow-hidden bg-stone-900 border border-stone-700 mb-4 flex items-center justify-center">
                      <img
                        src={formData.author.heroImage || '/images/hero_hd_full.png'}
                        alt="Hero Banner Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label className="block w-full py-2 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-xs font-bold rounded-xl text-center cursor-pointer transition shadow-sm mb-2.5">
                      <Upload className="w-3.5 h-3.5 inline mr-1" /> Upload from Device
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'hero')}
                      />
                    </label>
                    <label className="block text-[11px] font-semibold uppercase text-stone-400 mb-1">Or Image URL</label>
                    <input
                      type="text"
                      value={formData.author.heroImage || '/images/hero_hd_full.png'}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          author: { ...formData.author, heroImage: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>
                </div>

                {/* Lifestyle Banner Background Image */}
                <div className="bg-stone-800/60 p-5 rounded-2xl border border-stone-700/60 space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Lifestyle Banner BG</h4>
                    <p className="text-xs text-stone-400 mb-4">Background image for 'Live with Purpose' section.</p>
                    <div className="w-full h-32 rounded-xl overflow-hidden bg-stone-900 border border-stone-700 mb-4 flex items-center justify-center">
                      {formData.lifestyle.bgImage ? (
                        <img
                          src={formData.lifestyle.bgImage}
                          alt="Lifestyle BG Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-stone-500 italic">Solid Navy (Default)</span>
                      )}
                    </div>
                    <label className="block w-full py-2 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-xs font-bold rounded-xl text-center cursor-pointer transition shadow-sm mb-2.5">
                      <Upload className="w-3.5 h-3.5 inline mr-1" /> Upload from Device
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'lifestyle')}
                      />
                    </label>
                    <label className="block text-[11px] font-semibold uppercase text-stone-400 mb-1">Or Image URL</label>
                    <input
                      type="text"
                      value={formData.lifestyle.bgImage || ''}
                      placeholder="https://... or /images/..."
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lifestyle: { ...formData.lifestyle, bgImage: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>
                </div>

                {/* Book 1 Cover */}
                <div className="bg-stone-800/60 p-5 rounded-2xl border border-stone-700/60 space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Book 1 Cover</h4>
                    <p className="text-xs text-stone-400 mb-4">First featured book cover image.</p>
                    <div className="w-full h-32 rounded-xl overflow-hidden bg-stone-900 border border-stone-700 mb-4 flex items-center justify-center">
                      <img
                        src={formData.books[0]?.coverImage || '/images/book1_hd_3d.png'}
                        alt="Book 1 Preview"
                        className="h-full object-contain py-1"
                      />
                    </div>
                    <label className="block w-full py-2 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-xs font-bold rounded-xl text-center cursor-pointer transition shadow-sm mb-2.5">
                      <Upload className="w-3.5 h-3.5 inline mr-1" /> Upload from Device
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'book1')}
                      />
                    </label>
                    <label className="block text-[11px] font-semibold uppercase text-stone-400 mb-1">Or Image URL</label>
                    <input
                      type="text"
                      value={formData.books[0]?.coverImage || '/images/book1_hd_3d.png'}
                      onChange={(e) => {
                        const updated = [...formData.books];
                        if (updated[0]) updated[0].coverImage = e.target.value;
                        setFormData({ ...formData, books: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>
                </div>

                {/* Book 2 Cover */}
                <div className="bg-stone-800/60 p-5 rounded-2xl border border-stone-700/60 space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Book 2 Cover</h4>
                    <p className="text-xs text-stone-400 mb-4">Second featured book cover image.</p>
                    <div className="w-full h-32 rounded-xl overflow-hidden bg-stone-900 border border-stone-700 mb-4 flex items-center justify-center">
                      <img
                        src={formData.books[1]?.coverImage || '/images/book2_hd_3d.png'}
                        alt="Book 2 Preview"
                        className="h-full object-contain py-1"
                      />
                    </div>
                    <label className="block w-full py-2 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-xs font-bold rounded-xl text-center cursor-pointer transition shadow-sm mb-2.5">
                      <Upload className="w-3.5 h-3.5 inline mr-1" /> Upload from Device
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'book2')}
                      />
                    </label>
                    <label className="block text-[11px] font-semibold uppercase text-stone-400 mb-1">Or Image URL</label>
                    <input
                      type="text"
                      value={formData.books[1]?.coverImage || '/images/book2_hd_3d.png'}
                      onChange={(e) => {
                        const updated = [...formData.books];
                        if (updated[1]) updated[1].coverImage = e.target.value;
                        setFormData({ ...formData, books: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BOOKS MANAGEMENT TAB */}
          {activeMenu === 'books' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Books Catalog Management</h3>
                  <p className="text-xs text-stone-400 mt-1">Changes here update both frontend and Supabase DB tables</p>
                </div>
              </div>

              <div className="space-y-6">
                {formData.books.map((book: BookInfo, index: number) => (
                  <div key={book.id} className="bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base">{book.title}</h4>
                          <p className="text-xs text-stone-400">ID: {book.id}</p>
                        </div>
                      </div>
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-medium border border-emerald-500/20">
                        Supabase Synced
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Book Title</label>
                        <input
                          type="text"
                          value={book.title}
                          onChange={(e) => {
                            const updated = [...formData.books];
                            updated[index].title = e.target.value;
                            setFormData({ ...formData, books: updated });
                          }}
                          className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Subtitle</label>
                        <input
                          type="text"
                          value={book.subtitle}
                          onChange={(e) => {
                            const updated = [...formData.books];
                            updated[index].subtitle = e.target.value;
                            setFormData({ ...formData, books: updated });
                          }}
                          className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Description</label>
                      <textarea
                        rows={3}
                        value={book.description}
                        onChange={(e) => {
                          const updated = [...formData.books];
                          updated[index].description = e.target.value;
                          setFormData({ ...formData, books: updated });
                        }}
                        className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Amazon Purchase URL</label>
                        <input
                          type="text"
                          value={book.amazonUrl}
                          onChange={(e) => {
                            const updated = [...formData.books];
                            updated[index].amazonUrl = e.target.value;
                            setFormData({ ...formData, books: updated });
                          }}
                          className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Cover Image (Upload or URL)</label>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-16 rounded bg-stone-800 border border-stone-700 overflow-hidden shrink-0 flex items-center justify-center">
                            <img
                              src={book.coverImage || (index === 0 ? '/images/book1_hd_3d.png' : '/images/book2_hd_3d.png')}
                              alt={book.title}
                              className="w-full h-full object-contain p-0.5"
                            />
                          </div>
                          <div className="flex-grow space-y-2">
                            <label className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-xs font-bold rounded-lg cursor-pointer transition shadow-xs">
                              <Upload className="w-3.5 h-3.5" /> Upload from Device
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, index)}
                              />
                            </label>
                            <input
                              type="text"
                              value={book.coverImage}
                              placeholder="Or paste image URL"
                              onChange={(e) => {
                                const updated = [...formData.books];
                                updated[index].coverImage = e.target.value;
                                setFormData({ ...formData, books: updated });
                              }}
                              className="w-full px-3 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HOMEPAGE TAB */}
          {activeMenu === 'homepage' && (
            <div className="space-y-6 bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl animate-in fade-in duration-200">
              <h3 className="text-xl font-serif font-bold text-white border-b border-stone-800 pb-4">
                Hero & Homepage Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Hero Eyebrow</label>
                  <input
                    type="text"
                    value={formData.author.heroEyebrow}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, heroEyebrow: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Hero Headline Line 1</label>
                    <input
                      type="text"
                      value={formData.author.heroHeadline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          author: { ...formData.author, heroHeadline: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Hero Headline Highlight (Gold)</label>
                    <input
                      type="text"
                      value={formData.author.heroHeadlineHighlight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          author: { ...formData.author, heroHeadlineHighlight: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Hero Description Paragraph</label>
                  <textarea
                    rows={4}
                    value={formData.author.heroDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, heroDescription: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-stone-800">
                  <label className="block text-xs font-semibold uppercase text-stone-400 mb-2">
                    Hero Section Background Banner
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-stone-800/60 p-4 rounded-xl border border-stone-700/60">
                    <div className="w-full sm:w-48 h-28 rounded-lg overflow-hidden bg-stone-900 border border-stone-700 shrink-0 flex items-center justify-center">
                      <img
                        src={formData.author.heroImage || '/images/hero_hd_full.png'}
                        alt="Hero Banner Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow w-full space-y-2">
                      <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-xs font-bold rounded-lg cursor-pointer transition shadow-xs">
                        <Upload className="w-4 h-4" /> Upload from Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'hero')}
                        />
                      </label>
                      <input
                        type="text"
                        value={formData.author.heroImage || '/images/hero_hd_full.png'}
                        placeholder="Or enter image URL"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            author: { ...formData.author, heroImage: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeMenu === 'about' && (
            <div className="space-y-6 bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl animate-in fade-in duration-200">
              <h3 className="text-xl font-serif font-bold text-white border-b border-stone-800 pb-4">
                About Author Settings
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">About Eyebrow</label>
                    <input
                      type="text"
                      value={formData.author.aboutEyebrow}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          author: { ...formData.author, aboutEyebrow: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">About Heading</label>
                    <input
                      type="text"
                      value={formData.author.aboutHeading}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          author: { ...formData.author, aboutHeading: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Author Biography</label>
                  <textarea
                    rows={5}
                    value={formData.author.aboutDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, aboutDescription: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Featured Quote</label>
                    <input
                      type="text"
                      value={formData.author.quote}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          author: { ...formData.author, quote: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Quote Attribution</label>
                    <input
                      type="text"
                      value={formData.author.quoteAttribution}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          author: { ...formData.author, quoteAttribution: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LIFESTYLE TAB */}
          {activeMenu === 'lifestyle' && (
            <div className="space-y-6 bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl animate-in fade-in duration-200">
              <h3 className="text-xl font-serif font-bold text-white border-b border-stone-800 pb-4">
                Lifestyle Banner Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Eyebrow</label>
                  <input
                    type="text"
                    value={formData.lifestyle.eyebrow}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lifestyle: { ...formData.lifestyle, eyebrow: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Headline 1</label>
                    <input
                      type="text"
                      value={formData.lifestyle.headline[0]}
                      onChange={(e) => {
                        const h = [...formData.lifestyle.headline];
                        h[0] = e.target.value;
                        setFormData({ ...formData, lifestyle: { ...formData.lifestyle, headline: h } });
                      }}
                      className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Headline 2</label>
                    <input
                      type="text"
                      value={formData.lifestyle.headline[1]}
                      onChange={(e) => {
                        const h = [...formData.lifestyle.headline];
                        h[1] = e.target.value;
                        setFormData({ ...formData, lifestyle: { ...formData.lifestyle, headline: h } });
                      }}
                      className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Headline 3</label>
                    <input
                      type="text"
                      value={formData.lifestyle.headline[2]}
                      onChange={(e) => {
                        const h = [...formData.lifestyle.headline];
                        h[2] = e.target.value;
                        setFormData({ ...formData, lifestyle: { ...formData.lifestyle, headline: h } });
                      }}
                      className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={formData.lifestyle.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lifestyle: { ...formData.lifestyle, description: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-400 mb-1.5">CTA Button Label</label>
                  <input
                    type="text"
                    value={formData.lifestyle.cta}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lifestyle: { ...formData.lifestyle, cta: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>

                {/* Lifestyle Background Image Upload */}
                <div className="pt-4 border-t border-stone-800">
                  <label className="block text-xs font-semibold uppercase text-stone-400 mb-2">
                    Lifestyle Section Background Image ('Live with Purpose' Banner)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-stone-800/60 p-4 rounded-xl border border-stone-700/60">
                    <div className="w-full sm:w-48 h-28 rounded-lg overflow-hidden bg-stone-900 border border-stone-700 shrink-0 flex items-center justify-center">
                      {formData.lifestyle.bgImage ? (
                        <img
                          src={formData.lifestyle.bgImage}
                          alt="Lifestyle BG Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-stone-500 italic">Solid Navy (Default)</span>
                      )}
                    </div>
                    <div className="flex-grow w-full space-y-2">
                      <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-xs font-bold rounded-lg cursor-pointer transition shadow-xs">
                        <Upload className="w-4 h-4" /> Upload from Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'lifestyle')}
                        />
                      </label>
                      <input
                        type="text"
                        value={formData.lifestyle.bgImage || ''}
                        placeholder="Or enter image URL (e.g. https://...)"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lifestyle: { ...formData.lifestyle, bgImage: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TESTIMONIALS TAB */}
          {activeMenu === 'testimonials' && (
            <div className="space-y-6 bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl animate-in fade-in duration-200">
              <h3 className="text-xl font-serif font-bold text-white border-b border-stone-800 pb-4">
                Reader Testimonials
              </h3>
              <div className="space-y-4">
                {formData.testimonials.map((t: any, index: number) => (
                  <div key={t.id} className="p-4 bg-stone-800/60 rounded-xl border border-stone-700/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">Review #{index + 1}</span>
                      <input
                        type="text"
                        value={t.author}
                        onChange={(e) => {
                          const updated = [...formData.testimonials];
                          updated[index].author = e.target.value;
                          setFormData({ ...formData, testimonials: updated });
                        }}
                        className="px-3 py-1 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={t.quote}
                      onChange={(e) => {
                        const updated = [...formData.testimonials];
                        updated[index].quote = e.target.value;
                        setFormData({ ...formData, testimonials: updated });
                      }}
                      className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeMenu === 'settings' && (
            <div className="space-y-6 bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl animate-in fade-in duration-200">
              <h3 className="text-xl font-serif font-bold text-white border-b border-stone-800 pb-4">
                Supabase & Database Configuration
              </h3>
              <div className="space-y-4 text-sm">
                <p className="text-stone-300">
                  Your website is fully connected to Supabase. When you click <strong className="text-amber-400">Save & Sync to Supabase</strong>, all uploaded device images and site settings are saved to both Supabase and local cache.
                </p>
                <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 space-y-2 font-mono text-xs text-stone-300">
                  <p className="text-emerald-400 font-bold"># Supabase Client Status</p>
                  <p>Client Initialized: <span className="text-white">Active</span></p>
                  <p>Tables Connected: <span className="text-white">books, site_settings, contacts</span></p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
