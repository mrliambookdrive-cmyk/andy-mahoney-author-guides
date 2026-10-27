import React, { useState, useEffect } from 'react';
import { Settings, X, Save, RotateCcw, BookOpen, User, MessageSquare, Layout, Sparkles, Check } from 'lucide-react';
import { SITE_CONFIG, BookInfo } from '../data/siteConfig';
import { clearSiteConfig } from '../lib/storage';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  config: typeof SITE_CONFIG;
  onUpdateConfig: (newConfig: typeof SITE_CONFIG) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [formData, setFormData] = useState<typeof SITE_CONFIG>(config);
  const [activeTab, setActiveTab] = useState<'hero' | 'books' | 'about' | 'lifestyle' | 'testimonials'>('hero');
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    setFormData(config);
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateConfig(formData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all changes to default?')) {
      await clearSiteConfig();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0E1E31] text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="bg-[#B87B33] p-2 rounded-lg">
              <Settings className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Admin Control Panel</h2>
              <p className="text-xs text-stone-300">Customize all website texts, books, images & details in real time</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {savedToast && (
              <span className="flex items-center gap-1.5 text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-full font-medium animate-bounce">
                <Check className="w-3.5 h-3.5" /> Saved Successfully!
              </span>
            )}
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded-lg flex items-center gap-1.5 transition"
              title="Reset to default"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-stone-100 px-6 py-3 border-b border-stone-200 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'hero' ? 'bg-[#0E1E31] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <User className="w-4 h-4" /> Hero & Author
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'books' ? 'bg-[#0E1E31] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Books Management
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'about' ? 'bg-[#0E1E31] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4" /> About Section
          </button>
          <button
            onClick={() => setActiveTab('lifestyle')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'lifestyle' ? 'bg-[#0E1E31] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Layout className="w-4 h-4" /> Lifestyle Banner
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'testimonials' ? 'bg-[#0E1E31] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Testimonials
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6 bg-stone-50/50">
          {/* TAB 1: HERO & AUTHOR */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#0E1E31] border-b pb-2">Hero Section Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Hero Eyebrow Kicker</label>
                  <input
                    type="text"
                    value={formData.author.heroEyebrow}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, heroEyebrow: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Author Name / Brand</label>
                  <input
                    type="text"
                    value={formData.author.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, name: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Hero Headline Line 1</label>
                  <input
                    type="text"
                    value={formData.author.heroHeadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, heroHeadline: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Hero Headline Highlight (Gold)</label>
                  <input
                    type="text"
                    value={formData.author.heroHeadlineHighlight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, heroHeadlineHighlight: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Hero Description Paragraph</label>
                <textarea
                  rows={3}
                  value={formData.author.heroDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      author: { ...formData.author, heroDescription: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={formData.author.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, email: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKS MANAGEMENT */}
          {activeTab === 'books' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-[#0E1E31] border-b pb-2">Books & Cover Images</h3>
              {formData.books.map((book: BookInfo, index: number) => (
                <div key={book.id} className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h4 className="font-bold text-[#0E1E31] flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#B87B33]" /> Book #{index + 1}: {book.title}
                    </h4>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-medium">
                      ID: {book.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Book Title</label>
                      <input
                        type="text"
                        value={book.title}
                        onChange={(e) => {
                          const updated = [...formData.books];
                          updated[index].title = e.target.value;
                          setFormData({ ...formData, books: updated });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={book.subtitle}
                        onChange={(e) => {
                          const updated = [...formData.books];
                          updated[index].subtitle = e.target.value;
                          setFormData({ ...formData, books: updated });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Book Description</label>
                    <textarea
                      rows={2}
                      value={book.description}
                      onChange={(e) => {
                        const updated = [...formData.books];
                        updated[index].description = e.target.value;
                        setFormData({ ...formData, books: updated });
                      }}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Amazon Purchase URL</label>
                      <input
                        type="text"
                        value={book.amazonUrl}
                        onChange={(e) => {
                          const updated = [...formData.books];
                          updated[index].amazonUrl = e.target.value;
                          setFormData({ ...formData, books: updated });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Cover Image Path / URL</label>
                      <input
                        type="text"
                        value={book.coverImage}
                        onChange={(e) => {
                          const updated = [...formData.books];
                          updated[index].coverImage = e.target.value;
                          setFormData({ ...formData, books: updated });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                      />
                      <p className="text-[11px] text-stone-500 mt-1">E.g., /images/client_real_book.png or custom image URL</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ABOUT SECTION */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#0E1E31] border-b pb-2">About the Author</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">About Eyebrow</label>
                  <input
                    type="text"
                    value={formData.author.aboutEyebrow}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, aboutEyebrow: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">About Heading</label>
                  <input
                    type="text"
                    value={formData.author.aboutHeading}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, aboutHeading: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Author Bio Description</label>
                <textarea
                  rows={4}
                  value={formData.author.aboutDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      author: { ...formData.author, aboutDescription: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Featured Quote</label>
                  <input
                    type="text"
                    value={formData.author.quote}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, quote: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Quote Attribution</label>
                  <input
                    type="text"
                    value={formData.author.quoteAttribution}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, quoteAttribution: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LIFESTYLE BANNER */}
          {activeTab === 'lifestyle' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#0E1E31] border-b pb-2">Lifestyle Banner Settings</h3>
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Eyebrow</label>
                <input
                  type="text"
                  value={formData.lifestyle.eyebrow}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lifestyle: { ...formData.lifestyle, eyebrow: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Headline Part 1</label>
                  <input
                    type="text"
                    value={formData.lifestyle.headline[0]}
                    onChange={(e) => {
                      const h = [...formData.lifestyle.headline];
                      h[0] = e.target.value;
                      setFormData({ ...formData, lifestyle: { ...formData.lifestyle, headline: h } });
                    }}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Headline Part 2</label>
                  <input
                    type="text"
                    value={formData.lifestyle.headline[1]}
                    onChange={(e) => {
                      const h = [...formData.lifestyle.headline];
                      h[1] = e.target.value;
                      setFormData({ ...formData, lifestyle: { ...formData.lifestyle, headline: h } });
                    }}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Headline Part 3</label>
                  <input
                    type="text"
                    value={formData.lifestyle.headline[2]}
                    onChange={(e) => {
                      const h = [...formData.lifestyle.headline];
                      h[2] = e.target.value;
                      setFormData({ ...formData, lifestyle: { ...formData.lifestyle, headline: h } });
                    }}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.lifestyle.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lifestyle: { ...formData.lifestyle, description: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={formData.lifestyle.cta}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lifestyle: { ...formData.lifestyle, cta: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 5: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-[#0E1E31] border-b pb-2">Reader Testimonials</h3>
              {formData.testimonials.map((t: any, index: number) => (
                <div key={t.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700">Testimonial #{index + 1}</span>
                    <input
                      type="text"
                      value={t.author}
                      onChange={(e) => {
                        const updated = [...formData.testimonials];
                        updated[index].author = e.target.value;
                        setFormData({ ...formData, testimonials: updated });
                      }}
                      className="px-2.5 py-1 border rounded text-xs font-medium bg-stone-50"
                      placeholder="Author"
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
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#B87B33] outline-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-100 px-6 py-4 border-t border-stone-200 flex items-center justify-between">
          <p className="text-xs text-stone-500">
            Tip: Press <kbd className="bg-white px-2 py-1 rounded border shadow-2xs font-mono font-bold">Ctrl + Shift + E</kbd> anytime to open this panel.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-[#0E1E31] hover:bg-[#1A2D44] text-white text-sm font-medium flex items-center gap-2 shadow-md transition"
            >
              <Save className="w-4 h-4" /> Save Changes & Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
