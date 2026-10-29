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
  price?: string;
  originalPrice?: string;
}

export const DEFAULT_SITE_CONFIG = {
  author: {
    name: 'Andy Mahoney',
    title: 'Andy Mahoney',
    tagline: 'Books That Build a Better You',
    heroEyebrow: 'SELF-IMPROVEMENT / PERSONAL GROWTH / BETTER LIVING',
    heroHeadline: 'Better Habits.',
    heroHeadlineHighlight: 'A Brighter Future.',
    heroDescription:
      'Discover practical, inspiring books that help you build better habits, improve your mindset, and create the life you want.',
    aboutEyebrow: 'ABOUT THE AUTHOR',
    aboutHeading: 'Andy Mahoney',
    aboutDescription:
      "Andy Mahoney is a passionate writer and advocate for personal growth, purpose, and a better tomorrow. Through his books, he helps readers build better habits, find meaning in every stage of life, and create a future they're excited about.",
    aboutImage: '/images/saved_about_author.webp',
    image: '/images/saved_about_author.webp',
    quote: 'The best chapter can still be ahead.',
    quoteAttribution: 'Andy Mahoney',
    email: 'contact@andymahoneybooks.com',
    heroImage: '/images/saved_hero_books.webp',
  },

  socials: {
    email: 'mailto:contact@andymahoneybooks.com',
    facebook: 'https://facebook.com/andymahoneybooks',
    linkedin: 'https://linkedin.com/in/andymahoney-author',
    youtube: 'https://youtube.com/@andymahoneybooks',
  },

  benefits: [
    {
      id: 'guidance',
      title: 'Practical Guidance',
      description: 'Real-world advice you can apply today.',
      icon: 'leaf',
    },
    {
      id: 'habits',
      title: 'Build Better Habits',
      description: 'Small changes make big differences.',
      icon: 'brain',
    },
    {
      id: 'purpose',
      title: 'Find Your Purpose',
      description: 'Live with intention and confidence.',
      icon: 'heart',
    },
    {
      id: 'future',
      title: 'A Brighter Future',
      description: "Because it's never too late to start.",
      icon: 'book',
    },
  ],

  collection: {
    eyebrow: 'FEATURED BOOKS',
    heading: 'Books for a More Fulfilling Tomorrow',
    description:
      'Discover practical, inspiring books that help you build better habits, improve your mindset, and create the life you want.',
  },

  books: [
    {
      id: 'dont-retire-from-life',
      title: "Retirement Don't Retire from Life",
      displayTitle: "Retirement\nDon't Retire from Life",
      subtitle: 'A Practical Guide to Purpose, Structure, and Life After Work',
      description:
        'A practical and inspiring guide to help you find purpose, build structure, and make the most of your retirement years. Filled with real-life tools and actionable steps.',
      coverImage: '/images/saved_book1_cover.webp',
      amazonUrl:
        'https://www.amazon.com/Retreadment-Dont-Retire-Life-Structure/dp/B0HBNGXFH6/ref=sr_1_1?crid=1YSO2XRQDNVF6&dib=eyJ2IjoiMSJ9.vbKLONup52OqStNfZY8XnwvmfXVcJeAFe0xzSEY5NMi6D0aVQh1BSaK7a-yGAT4eCZdAWmOn-z3AFlEFaB8reqJfEp8qivc_04GI93GjNnR9fFSJeK-8M-wdlFUCUWrh_pSOfdgGVaRzGG7Y4Fc8Tu3dsdQTjiYoxIAWw616Ob7iO_Li2rjXyLmjLWZa2STRDoEGjc-Ewzp_KPmRt_IsShatSOu2hNArDKISVIfJ0XY.sDBXbvhB_whhTvhjkMZThGWFRis_UYWUN26kRVYGNWY&dib_tag=se&keywords=Retirement+Don%27t+Retire+from+Life&qid=1793222605&s=books&sprefix=%2Cstripbooks-intl-ship%2C358&sr=1-1',
      rating: 5,
      reviewCount: 1,
      price: '$6.95',
      originalPrice: '$12.95',
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
      title: 'The Retirement Companion: Be Better. Write Now!',
      displayTitle: 'The Retirement Companion:\nBe Better. Write Now!',
      subtitle: 'A Practice Guide',
      description:
        'A companion to Retreadment Don\'t Retire from Life, this guide helps you put ideas into action with practical exercises, journaling prompts, and real-world strategies.',
      coverImage: '/images/saved_book2_cover.webp',
      amazonUrl:
        'https://www.amazon.com/Retreadment-Companion-Better-Write-Practice-ebook/dp/B0HGN8N7C1?ref_=ast_author_dp_rw&th=1&psc=1&dib=eyJ2IjoiMSJ9.UglLKsDodOONh_JaDDuGaqft4fAYB5BTkOmmflIlvLE.gnQGrBbfoUrjEVnxtZp0JfhKUxyn6YgznToi0AZH8Uo&dib_tag=AUTHOR',
      rating: 5,
      reviewCount: 1,
      price: '$6.95',
      originalPrice: '$12.95',
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
    cta: 'Explore All Books',
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
  ],

  newsletter: {
    eyebrow: 'NEWSLETTER',
    heading: 'Stay Inspired',
    description:
      'Get the latest updates, new releases, and motivational insights straight to your inbox.',
    placeholder: 'Your email address',
    buttonText: 'Subscribe',
    privacyNote: 'No spam. Just good reads.',
  },

  designVersion: 5,
};

// Load saved config from localStorage if present
const getInitialConfig = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('andy_site_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.books) && parsed.books.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing site config', e);
      }
    }
  }
  return DEFAULT_SITE_CONFIG;
};

export const SITE_CONFIG = getInitialConfig();
