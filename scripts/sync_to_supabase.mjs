// scripts/sync_to_supabase.mjs
// Standalone sync utility to push current website data directly to Supabase

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://ueinqyzwhiprpsqzabhv.supabase.co';
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlaW5xeXp3aGlwcnBzcXphYmh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MjY4Mjg1NywiZXhwIjoyMTA4MjU4ODU3fQ.72AiAzM22ZJQyOhywwaigIw5tmda8KItFm1UNN1axo0';
const ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlaW5xeXp3aGlwcnBzcXphYmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2ODI4NTcsImV4cCI6MjEwODI1ODg1N30.QVHEENSMhYEvFtoVso2yVAlH2B5dW63lPT6RT_OhYrM';

const API_KEY = SERVICE_KEY || ANON_KEY;

const booksData = [
  {
    id: 'dont-retire-from-life',
    title: "Retirement Don't Retire from Life",
    display_title: "Retirement\nDon't Retire from Life",
    subtitle: 'A Practical Guide to Purpose, Structure, and Life After Work',
    description:
      'A practical and inspiring guide to help you find purpose, build structure, and make the most of your retirement years. Filled with real-life tools and actionable steps.',
    cover_image: '/images/saved_book1_cover.webp',
    amazon_url:
      'https://www.amazon.com/Retreadment-Dont-Retire-Life-Structure/dp/B0HBNGXFH6/ref=sr_1_1?crid=1YSO2XRQDNVF6&keywords=Retirement+Don%27t+Retire+from+Life&qid=1793222605&sr=1-1',
    rating: 5,
    review_count: 1,
    price: '$6.95',
    original_price: '$12.95',
    publication_year: '2025',
    highlights: [
      'How to maintain healthy daily rhythms without a punch card',
      'Rediscovering forgotten passions and creative outlets',
      'Strengthening relationships with family and community',
      'Physical and mental vitality for the decades ahead',
    ],
    updated_at: new Date().toISOString(),
  },
  {
    id: 'retreadment-companion',
    title: 'The Retirement Companion: Be Better. Write Now!',
    display_title: 'The Retirement Companion:\nBe Better. Write Now!',
    subtitle: 'A Practice Guide',
    description:
      "A companion to Retreadment Don't Retire from Life, this guide helps you put ideas into action with practical exercises, journaling prompts, and real-world strategies.",
    cover_image: '/images/saved_book2_cover.webp',
    amazon_url:
      'https://www.amazon.com/Retreadment-Companion-Better-Write-Practice-ebook/dp/B0HGN8N7C1?ref_=ast_author_dp_rw&th=1&psc=1',
    rating: 5,
    review_count: 1,
    price: '$6.95',
    original_price: '$12.95',
    publication_year: '2025',
    highlights: [
      'Weekly guided journaling prompts and reflection exercises',
      'Personal legacy worksheets and goal-mapping templates',
      'Habit transformation trackers tailored for post-career life',
      'Actionable blueprints for launching passion projects',
    ],
    updated_at: new Date().toISOString(),
  },
];

const fullConfig = {
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
    { id: 'guidance', title: 'Practical Guidance', description: 'Real-world advice you can apply today.', icon: 'leaf' },
    { id: 'habits', title: 'Build Better Habits', description: 'Small changes make big differences.', icon: 'brain' },
    { id: 'purpose', title: 'Find Your Purpose', description: 'Live with intention and confidence.', icon: 'heart' },
    { id: 'future', title: 'A Brighter Future', description: "Because it's never too late to start.", icon: 'book' },
  ],
  collection: {
    eyebrow: 'FEATURED BOOKS',
    heading: 'Books for a More Fulfilling Tomorrow',
    description:
      'Discover practical, inspiring books that help you build better habits, improve your mindset, and create the life you want.',
  },
  books: booksData.map((b) => ({
    id: b.id,
    title: b.title,
    displayTitle: b.display_title,
    subtitle: b.subtitle,
    description: b.description,
    coverImage: b.cover_image,
    amazonUrl: b.amazon_url,
    rating: b.rating,
    reviewCount: b.review_count,
    price: b.price,
    originalPrice: b.original_price,
    publicationYear: b.publication_year,
    highlights: b.highlights,
  })),
  lifestyle: {
    eyebrow: 'A MORE MEANINGFUL NEXT CHAPTER',
    headline: ['Live with Purpose.', 'Stay Curious.', 'Keep Growing.'],
    description:
      "Retirement is not an ending — it's an opportunity to explore, create, give back and focus on what truly matters.",
    cta: 'Explore All Books',
    bgImage: '',
  },
  testimonials: [
    {
      id: '1',
      author: 'David M.',
      subtitle: 'Verified Amazon Purchase',
      bookTitle: "Retirement Don't Retire from Life",
      quote:
        "After 38 years in corporate management, stepping away was terrifying. Andy's book gave me a practical blueprint rather than generic platitudes. His advice on building daily anchors without a punch card completely transformed my transition.",
      rating: 5,
    },
    {
      id: '2',
      author: 'Sarah Jenkins',
      subtitle: 'Verified Amazon Purchase',
      bookTitle: 'The Retirement Companion: Be Better. Write Now!',
      quote:
        'The companion journal is brilliant! The weekly prompts helped me put my thoughts and hopes into words. Doing the exercises with my morning coffee has become my favorite ritual. Highly recommend getting both books together.',
      rating: 5,
    },
    {
      id: '3',
      author: 'Robert & Elena Torres',
      subtitle: 'Life Transition Planners & Readers',
      bookTitle: "Retirement Don't Retire from Life",
      quote:
        "My wife and I read this together before our retirement date. It sparked honest conversations about how we wanted to spend our time, volunteer, and stay active. It made us truly excited for what's ahead.",
      rating: 5,
    },
    {
      id: '4',
      author: 'Patricia L. Brooks',
      subtitle: 'Verified Amazon Purchase',
      bookTitle: 'The Retirement Companion: Be Better. Write Now!',
      quote:
        "Hands-down the most practical life guide I've come across. It treats retirement not as an ending, but as an open canvas. The legacy worksheets alone are worth ten times the price.",
      rating: 5,
    },
    {
      id: '5',
      author: 'Michael Chang',
      subtitle: 'Former Educator & Retiree',
      bookTitle: "Retirement Don't Retire from Life",
      quote:
        'Andy Mahoney writes with warm empathy and razor-sharp clarity. His emphasis on curiosity and mental vitality gave me the courage to start mentoring and take up woodcraft at 64. A must-read.',
      rating: 5,
    },
    {
      id: '6',
      author: 'Karen W.',
      subtitle: 'Verified Amazon Purchase',
      bookTitle: "Retirement Don't Retire from Life",
      quote:
        'Clear, inspiring, and delightfully easy to read. You can tell Andy understands the psychological hurdles of letting go of your career. It felt like having a trusted mentor sitting right across the table.',
      rating: 5,
    },
  ],
  newsletter: {
    eyebrow: 'NEWSLETTER',
    heading: 'Stay Inspired',
    description: 'Get the latest updates, new releases, and motivational insights straight to your inbox.',
    placeholder: 'Your email address',
    buttonText: 'Subscribe',
    privacyNote: 'No spam. Just good reads.',
  },
  designVersion: 6,
};

async function syncToSupabase() {
  console.log('🚀 Checking Supabase target:', SUPABASE_URL);

  const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'resolution=merge-duplicates',
  };

  try {
    // 1. Check books table existence
    const checkBooks = await fetch(`${SUPABASE_URL}/rest/v1/books?select=id&limit=1`, { headers });
    if (!checkBooks.ok) {
      const err = await checkBooks.text();
      console.error('❌ Table "books" check failed:', checkBooks.status, err);
      console.log('\n⚠️ ATTENTION: The "books" table does not exist in your Supabase project yet!');
      console.log('👉 Please open your Supabase SQL editor:');
      console.log('   https://supabase.com/dashboard/project/ueinqyzwhiprpsqzabhv/sql/new');
      console.log('   and run the schema from supabase_schema.sql.\n');
      process.exit(1);
    }

    // 2. Upsert Books
    console.log('📦 Upserting books to Supabase...');
    for (const book of booksData) {
      const bookPayload = {
        id: book.id,
        title: book.title,
        subtitle: book.subtitle,
        description: book.description,
        cover_image: book.cover_image,
        amazon_url: book.amazon_url,
        rating: book.rating,
        review_count: book.review_count,
        publication_year: book.publication_year,
        highlights: book.highlights,
        updated_at: book.updated_at,
      };
      const res = await fetch(`${SUPABASE_URL}/rest/v1/books`, {
        method: 'POST',
        headers,
        body: JSON.stringify(bookPayload),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error(`❌ Failed to upsert book "${book.id}":`, res.status, text);
      } else {
        console.log(`✅ Upserted book: "${book.title}"`);
      }
    }

    // 3. Upsert site_settings
    console.log('⚙️ Upserting site_settings (key: "main_config")...');
    const resSettings = await fetch(`${SUPABASE_URL}/rest/v1/site_settings`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        key: 'main_config',
        value: fullConfig,
        updated_at: new Date().toISOString(),
      }),
    });
    if (!resSettings.ok) {
      const text = await resSettings.text();
      console.error('❌ Failed to upsert site_settings:', resSettings.status, text);
    } else {
      console.log('✅ Upserted site_settings ("main_config") successfully!');
    }

    console.log('\n🎉 ALL DATA HAS BEEN SYNCHRONIZED TO SUPABASE SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Sync failed with unexpected error:', err.message || err);
    process.exit(1);
  }
}

syncToSupabase();
