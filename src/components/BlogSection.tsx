import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, X, Sparkles, User } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  image: string;
  content: {
    heading: string;
    body: string;
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-career-blueprint',
    title: 'The Post-Career Blueprint: How to Redefine Your Identity After Work',
    category: 'Purpose & Transition',
    date: 'October 2026',
    readTime: '5 min read',
    image: '/images/lifestyle_banner_clean.png',
    summary:
      "For decades, your job gave you a structured day and an easy answer to 'What do you do?' Leaving that behind is not an ending—it is the opening chapter of your most creative years.",
    content: [
      {
        heading: '1. Beyond the Business Card: Rediscovering Who You Are',
        body: 'When you step away from career obligations, the first silence can feel unfamiliar. You no longer have meetings to govern your morning or quarterly deadlines to measure your worth. The key is understanding that your skills, passions, and empathy were never owned by your employer—they belong to you. Post-career life is about investing those assets directly into your own passions, family, and community.',
      },
      {
        heading: '2. The Three Daily Anchors: Rhythm Without the Punch Card',
        body: 'True freedom requires a gentle skeleton of discipline. Without structure, days blur into weeks. Establish three simple anchors: a physical anchor (morning walk or stretch), a creative anchor (writing, reading, crafting, mentoring), and a social anchor (a phone call or shared meal with a friend). This simple rhythm creates momentum and peace of mind.',
      },
      {
        heading: '3. Curiosity as a Compass',
        body: 'Retirement is not a rocking chair; it is an open road. Ask yourself: what did you love doing at age ten that work forced you to abandon? Whether it is woodcraft, novel-writing, gardening, or local volunteering, following your innate curiosity is the single most reliable path to vitality.',
      },
    ],
  },
  {
    id: 'morning-mindset-habits',
    title: '3 Small Morning Habits That Radically Shift Your Mindset',
    category: 'Daily Habits',
    date: 'September 2026',
    readTime: '4 min read',
    image: '/images/card1_hd.png',
    summary:
      'Lasting transformation rarely comes from overwhelming resolutions. Discover the three quiet, high-leverage rituals that set an intentional tone for your entire day.',
    content: [
      {
        heading: '1. The 5-Minute Morning Brain Dump',
        body: 'Before reaching for your phone or checking emails, spend five minutes writing three unfiltered thoughts into a pocket notebook. Clearing the mental debris early allows your brain to transition from passive reaction to intentional focus.',
      },
      {
        heading: '2. Intentional Light & Hydration',
        body: 'Drink a tall glass of water and step outside for 5 to 10 minutes of natural light. This sets your circadian rhythm, sharpens alertness without a caffeine spike, and gives you a grounded sense of presence in the early morning air.',
      },
      {
        heading: '3. Your Single Micro-Mission',
        body: 'Long to-do lists breed anxiety. Instead, identify one meaningful task that, if completed today, makes you feel accomplished and satisfied before you rest your head at night. Protect time for that one priority first.',
      },
    ],
  },
  {
    id: 'lifelong-curiosity-science',
    title: 'The Science of Lifelong Curiosity: Why Your Brain Thrives on New Challenges',
    category: 'Growth & Vitality',
    date: 'August 2026',
    readTime: '6 min read',
    image: '/images/card2_hd.png',
    summary:
      'Neuroscience reveals what reflective writers have always known: stepping outside your comfort zone and tackling new skills keeps your mind agile, resilient, and energized.',
    content: [
      {
        heading: '1. Neuroplasticity Does Not Expire',
        body: 'Decades of neuroscience research have dismantled the old myth that the adult brain is rigid. Your brain creates new synaptic connections well into your 70s, 80s, and beyond—provided you expose it to novel environments and learning stimuli.',
      },
      {
        heading: '2. Reframing the Discomfort of the Beginner',
        body: "When you try a new hobby—whether learning an instrument or writing personal memoirs—the early awkwardness can feel frustrating. That feeling of slight struggle is not failure; it is neurochemical evidence that your brain is building new pathways. Embrace the joy of being a beginner again.",
      },
      {
        heading: '3. Practical Challenges to Try This Month',
        body: 'Start small: read a book on a subject you know nothing about, write down a family story you have never told, or take a different route through your neighborhood. Curiosity is a muscle: the more you exercise it, the stronger your zest for life becomes.',
      },
    ],
  },
];

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="bg-[#F8FAFC] py-20 md:py-28 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center justify-center space-x-3 text-xs font-semibold uppercase tracking-widest text-[#125688] mb-3">
            <span className="w-8 h-[1px] bg-[#125688]/40"></span>
            <span>FROM THE AUTHOR&apos;S DESK</span>
            <span className="w-8 h-[1px] bg-[#125688]/40"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1E31] tracking-tight leading-snug">
            Articles & Practical Guides
          </h2>

          <p className="text-sm sm:text-base text-stone-600 mt-3 max-w-xl mx-auto leading-relaxed">
            Thoughtful insights, habit-building strategies, and reflective advice to help you build purpose and make every season of life count.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1.5"
            >
              {/* Card Header Image */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#0E1E31]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta: Date & Read Time */}
                  <div className="flex items-center space-x-4 text-xs text-stone-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B87B33]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#125688]" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0E1E31] leading-snug group-hover:text-[#125688] transition-colors mb-3">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                {/* Read Full Article Button */}
                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#125688] group-hover:text-[#0E4770] flex items-center gap-1.5 transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] text-stone-400 font-medium">Andy Mahoney</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reading Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-[#0E1E31]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-stone-200 my-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <div className="flex items-center space-x-3 text-xs font-semibold text-[#B87B33] uppercase tracking-wider">
                <span className="px-2.5 py-0.5 rounded-full bg-[#B87B33]/10">
                  {selectedPost.category}
                </span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E1E31] leading-tight mb-4">
              {selectedPost.title}
            </h2>

            {/* Author Byline */}
            <div className="flex items-center space-x-3 pb-6 border-b border-stone-100 mb-6 text-xs text-stone-500">
              <div className="w-7 h-7 rounded-full bg-[#125688]/10 text-[#125688] flex items-center justify-center font-bold">
                A
              </div>
              <div>
                <p className="font-bold text-stone-800">Andy Mahoney</p>
                <p>{selectedPost.date}</p>
              </div>
            </div>

            {/* Article Body */}
            <div className="space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
              <p className="text-stone-800 font-serif italic text-lg leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border-l-4 border-[#B87B33]">
                {selectedPost.summary}
              </p>

              {selectedPost.content.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-serif font-bold text-lg text-[#0E1E31]">
                    {section.heading}
                  </h4>
                  <p className="text-stone-600 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>

            {/* Modal Footer CTA */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-xl text-xs sm:text-sm transition cursor-pointer"
              >
                ← Back to Articles
              </button>

              <a
                href="#books"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPost(null);
                  const el = document.getElementById('books');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-[#125688] hover:bg-[#0E4770] text-white font-medium rounded-xl text-xs sm:text-sm transition shadow-xs cursor-pointer"
              >
                Explore Andy&apos;s Books
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
