import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, X, BookOpen, Sparkles, User, Tag } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  image: string;
  fallbackImage: string;
  content: {
    heading: string;
    body: string;
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-career-blueprint',
    title: 'The Post-Career Blueprint: How to Redefine Your Identity After Work',
    category: 'Purpose & Retirement',
    date: 'October 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/mountain_lake.png',
    summary:
      "For decades, your career gave you a daily schedule and an answer to 'Who are you?' Leaving it behind is not the end—it is an extraordinary opportunity to build a chapter built around what truly matters.",
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
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/about_desk_clean.png',
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
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/lifestyle_lake.jpg',
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
  {
    id: 'legacy-journaling',
    title: 'Legacy Journaling: Writing Down the Stories Your Family Will Treasure',
    category: 'Family & Legacy',
    date: 'July 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/about_desk_clean.png',
    summary:
      'Your memories, mistakes, and triumphs are an irreplaceable family heritage. Learn how simple weekly reflection prompts help you record your history without pressure.',
    content: [
      {
        heading: '1. You Do Not Need to Be a Professional Writer',
        body: 'The greatest obstacle to recording your memories is the misconception that you need literary brilliance. Your children and grandchildren do not want Shakespeare; they want your genuine voice, your humor, and your honest observations on life.',
      },
      {
        heading: '2. The One-Question-Per-Week Method',
        body: "Instead of staring at a blank 300-page notebook, answer one specific prompt per week: 'What was your favorite childhood meal?' 'What was the hardest decision of your 30s?' In one year, you will have completed a 52-chapter treasure of lived wisdom.",
      },
      {
        heading: '3. The Therapeutic Ripple Effect',
        body: 'Reviewing your past through writing provides profound emotional closure. It helps you recognize the thread of resilience that has carried you through difficult seasons, reinforcing your self-worth today.',
      },
    ],
  },
  {
    id: 'energy-vitality-rhythms',
    title: 'The Energy Equation: Sustaining Mental & Physical Vitality in Your Next Season',
    category: 'Health & Energy',
    date: 'June 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/mountain_lake.png',
    summary:
      'Discover how gentle daily movement, restorative sleep routines, and mindful eating fuel energetic mornings and sharper cognitive focus for decades ahead.',
    content: [
      {
        heading: '1. Movement as Joy, Not Punishment',
        body: 'Shift your relationship with exercise from exhausting gym sessions to consistent daily movement. A 30-minute brisk walk in fresh air, light mobility work, and stretching do more for longevity and joint health than sporadic intense workouts.',
      },
      {
        heading: '2. Rest as a Non-Negotiable Foundation',
        body: 'Quality sleep is when the brain cleanses metabolic waste and consolidates memories. Establish an evening wind-down ritual: dim the overhead lighting 60 minutes before bed, put away screens, and read physical books.',
      },
      {
        heading: '3. Hydration and Brain Clarity',
        body: 'Mild dehydration is the number-one hidden cause of mid-afternoon brain fog and sluggishness. Keeping a dedicated water carafe on your desk keeps energy steady without relying on endless refills of caffeine.',
      },
    ],
  },
  {
    id: 'purpose-through-giving',
    title: 'Purpose Through Giving: How Mentorship & Community Service Enrich Life',
    category: 'Connection & Community',
    date: 'May 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/lifestyle_lake_backdrop.jpg',
    summary:
      'True joy in post-career life often comes from extending a hand. Explore how sharing your decades of experience with others creates lasting fulfillment.',
    content: [
      {
        heading: '1. The Helper’s High Is Clinically Real',
        body: 'Psychological studies consistently show that volunteering triggers the release of endorphins and oxytocin, reducing chronic stress and combatting the isolation that often accompanies life transitions.',
      },
      {
        heading: '2. Mentoring the Rising Generation',
        body: 'Young professionals and students are hungry for thoughtful guidance, calm perspective, and active listening. Offering an hour a week to mentor someone in your former field gives your past experience a vibrant second life.',
      },
      {
        heading: '3. Finding Local Causes That Resonate',
        body: 'Look around your neighborhood: community libraries, animal sanctuaries, literacy programs, and local food pantries all thrive on dedicated volunteer hearts. Start with one morning a month and watch your social circle expand.',
      },
    ],
  },
];

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Purpose & Retirement', 'Daily Habits', 'Growth & Vitality', 'Family & Legacy', 'Health & Energy', 'Connection & Community'];

  const filteredPosts =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="blog" className="bg-[#F8FAFC] py-20 md:py-28 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-3 text-xs font-semibold uppercase tracking-widest text-[#125688] mb-3">
            <span className="w-8 h-[1px] bg-[#125688]/40"></span>
            <span>FROM THE AUTHOR&apos;S DESK</span>
            <span className="w-8 h-[1px] bg-[#125688]/40"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.6rem] font-bold text-[#0E1E31] tracking-tight leading-snug">
            Articles & Practical Guides
          </h2>

          <p className="text-sm sm:text-base text-stone-600 mt-3 max-w-xl mx-auto leading-relaxed">
            Thoughtful insights, habit-building strategies, and reflective advice to help you build purpose and make every season of life count.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#125688] text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1.5"
            >
              {/* Card Header Image with Error Fallback */}
              <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== post.fallbackImage) {
                      target.src = post.fallbackImage;
                    }
                  }}
                />
                <div className="absolute top-4 left-4 bg-[#0E1E31]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
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

            {/* Article Image Banner */}
            <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-6 bg-stone-100">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = selectedPost.fallbackImage;
                }}
              />
            </div>

            {/* Article Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E1E31] leading-tight mb-4">
              {selectedPost.title}
            </h2>

            {/* Author Byline */}
            <div className="flex items-center space-x-3 pb-6 border-b border-stone-100 mb-6 text-xs text-stone-500">
              <div className="w-8 h-8 rounded-full bg-[#125688]/10 text-[#125688] flex items-center justify-center font-bold">
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
