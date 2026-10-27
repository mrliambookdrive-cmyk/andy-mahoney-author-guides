/**
 * Site configuration and data for Andy Mahoney's author website.
 * Supports dynamic overrides from localStorage and Admin CMS.
 */

export interface BookInfo {
  id: string;
  title: string;
  displayTitle: string;
  subtitle: string;
  description: string;
  coverImage: string;
  amazonUrl: string;
  rating?: number;
  reviewCount?: number;
  publicationYear: string;
  highlights: string[];
}

const DEFAULT_SITE_CONFIG = {
  author: {
    name: 'ANDY MAHONEY',
    title: 'Andy Mahoney',
    tagline: 'Practical Guides for a More Meaningful Next Chapter',
    heroEyebrow: 'PRACTICAL GUIDANCE FOR WHAT COMES NEXT',
    heroHeadline: "Retirement Isn’t the End —",
    heroHeadlineHighlight: "It’s a New Beginning.",
    heroDescription:
      'Discover practical ideas, proven approaches, and real-life guidance to help you create purpose, structure, and joy in your next chapter.',
    aboutEyebrow: 'ABOUT ANDY MAHONEY',
    aboutHeading: 'A Passion for Helping Others Thrive',
    aboutDescription:
      'Andy Mahoney is a writer and guide focused on helping people navigate the next chapter of life with purpose, structure and joy. Through practical advice and real-world insights, his goal is to inspire and support others in creating a more meaningful and fulfilling life after work.',
    quote: 'The best chapter can still be ahead.',
    quoteAttribution: 'ANDY MAHONEY',
    email: 'contact@andymahoneybooks.com',
    heroImage: '/images/hero_hd_full.png',
  },

  socials: {
    email: 'mailto:contact@andymahoneybooks.com',
    facebook: 'https://facebook.com/andymahoneybooks',
    linkedin: 'https://linkedin.com/in/andymahoney-author',
    youtube: 'https://youtube.com/@andymahoneybooks',
  },

  benefits: [
    {
      id: 'purpose',
      title: 'Purpose After Work',
      description: 'Find what truly matters in this new chapter.',
      icon: 'compass',
    },
    {
      id: 'practical',
      title: 'Practical Guidance',
      description: 'Actionable ideas you can apply today.',
      icon: 'book',
    },
    {
      id: 'real-life',
      title: 'Real-Life Strategies',
      description: 'Built on experience and practical wisdom.',
      icon: 'chart',
    },
    {
      id: 'meaningful',
      title: 'A More Meaningful Life',
      description: 'Live with intention, structure and joy.',
      icon: 'sprout',
    },
  ],

  collection: {
    eyebrow: 'THE ANDY MAHONEY BOOK COLLECTION',
    heading: 'Practical Guides for a Better, Brighter Next Chapter',
    description:
      'Two powerful books. One clear mission: to help you live a more purposeful, active and fulfilling life after work.',
  },

  books: [
    {
      id: 'dont-retire-from-life',
      title: "Retreadment Don't Retire from Life",
      displayTitle: "Retreadment\nDon't Retire from Life",
      subtitle: 'A Practice Guide to Purpose, Structure, and Life After Work',
      description:
        'A practical and inspiring guide to help you find purpose, build structure, and make the most of your retirement years. Filled with real-life tools and actionable steps.',
      coverImage: '/images/book1_hd_3d.png',
      amazonUrl: 'https://www.amazon.com/dp/B0D1EXAMPLE1',
      rating: 5,
      reviewCount: 1,
      publicationYear: '2025',
      highlights: [
        'How to maintain healthy daily rhythms without a punch card',
        'Rediscovering forgotten passions and creative outlets',
        'Strengthening relationships with family and community',
        'Physical and mental vitality for the decades ahead',
      ],
    },
    {
      id: 'retreadment-companion',
      title: 'The Retreadment Companion',
      displayTitle: 'The Retreadment\nCompanion',
      subtitle: 'Be Better. Write Now! - A Practice Guide',
      description:
        'A companion to Retreadment Don\'t Retire from Life, this guide helps you put ideas into action with practical exercises, journaling prompts, and real-world strategies.',
      coverImage: '/images/book2_hd_3d.png',
      amazonUrl: 'https://www.amazon.com/dp/B0D2EXAMPLE2',
      rating: 5,
      publicationYear: '2025',
      highlights: [
        'Weekly guided journaling prompts and reflection exercises',
        'Personal legacy worksheets and goal-mapping templates',
        'Habit transformation trackers tailored for post-career life',
        'Actionable blueprints for launching passion projects',
      ],
    },
  ] as BookInfo[],

  lifestyle: {
    eyebrow: 'A MORE MEANINGFUL NEXT CHAPTER',
    headline: ['Live with Purpose.', 'Stay Curious.', 'Keep Growing.'],
    description:
      'Retirement is not an ending — it’s an opportunity to explore, create, give back and focus on what truly matters.',
    cta: 'Explore the Books',
    bgImage: '',
  },

  testimonials: [
    {
      id: '1',
      quote:
        'A practical and inspiring guide. It gave me a fresh perspective on retirement and helped me create a plan for a more fulfilling life.',
      rating: 5,
      author: 'Amazon Reader',
    },
    {
      id: '2',
      quote:
        'The perfect companion to put ideas into action. I especially loved the exercises and journaling prompts.',
      rating: 5,
      author: 'Amazon Reader',
    },
    {
      id: '3',
      quote:
        'Clear, practical and easy to read. These books make you think differently about what life after work can be.',
      rating: 5,
      author: 'Amazon Reader',
    },
  ],

  newsletter: {
    eyebrow: 'STAY CONNECTED',
    heading: 'Get Updates on New Books and Inspiring Insights',
    description:
      'Join the mailing list to be the first to know about new releases, updates and practical tips for a more meaningful next chapter.',
    placeholder: 'Enter your email address',
    buttonText: 'Subscribe',
    privacyNote: 'No spam. Just meaningful updates.',
  },
};

// Load saved config from localStorage if present
const getInitialConfig = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('andy_site_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing site config', e);
      }
    }
  }
  return DEFAULT_SITE_CONFIG;
};

export const SITE_CONFIG = getInitialConfig();
