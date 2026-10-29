import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY_URL = 'andy_supabase_url';
const STORAGE_KEY_KEY = 'andy_supabase_anon_key';

export const DEFAULT_SUPABASE_URL = 'https://ueinqyzwhiprpsqzabhv.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlaW5xeXp3aGlwcnBzcXphYmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2ODI4NTcsImV4cCI6MjEwODI1ODg1N30.QVHEENSMhYEvFtoVso2yVAlH2B5dW63lPT6RT_OhYrM';

/**
 * Get Supabase credentials from localStorage or Vite environment variables
 */
export function getSupabaseCredentials(): { url: string; key: string } {
  let url = (typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_URL) : '') || '';
  let key = (typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_KEY) : '') || '';

  if (!url && typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) {
    url = import.meta.env.VITE_SUPABASE_URL;
  }
  if (!key && typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) {
    key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  }

  // Fallback to project defaults so app is always connected
  if (!url) url = DEFAULT_SUPABASE_URL;
  if (!key) key = DEFAULT_SUPABASE_ANON_KEY;

  return { url: url.trim(), key: key.trim() };
}

/**
 * Save Supabase credentials into localStorage for instant browser persistence
 */
export function saveSupabaseCredentials(url: string, key: string) {
  if (typeof window !== 'undefined') {
    if (url && url.trim()) {
      localStorage.setItem(STORAGE_KEY_URL, url.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_URL);
    }

    if (key && key.trim()) {
      localStorage.setItem(STORAGE_KEY_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_KEY);
    }
  }
  cachedClient = null;
}

/**
 * Checks if Supabase is properly configured with a real project URL and Anon key
 */
export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseCredentials();
  return Boolean(
    url &&
    key &&
    url.startsWith('https://') &&
    !url.includes('placeholder-supabase') &&
    key !== 'placeholder-anon-key'
  );
}

let cachedClient: SupabaseClient | null = null;

/**
 * Dynamically get or initialize the Supabase client
 */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (cachedClient) return cachedClient;

  const { url, key } = getSupabaseCredentials();
  try {
    cachedClient = createClient(url, key, {
      auth: { persistSession: false },
    });
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

/**
 * Backward-compatible supabase export proxy
 */
export const supabase = {
  from: (table: string) => {
    const client = getSupabase();
    if (!client) {
      throw new Error('Supabase is not configured. Please add your Supabase URL & Anon Key in the Admin Settings tab.');
    }
    return client.from(table);
  },
};

/**
 * Test live connection to Supabase and verify required tables exist
 */
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string; details?: any }> {
  const client = getSupabase();
  if (!client) {
    const { url, key } = getSupabaseCredentials();
    if (!url || !key) {
      return {
        success: false,
        message: 'Supabase credentials are missing. Please enter your Project URL and Anon Public Key below.',
      };
    }
    return {
      success: false,
      message: 'Invalid Supabase URL or Key format. Project URL must start with https:// and be a valid Supabase project.',
    };
  }

  try {
    // 1. Verify books table
    const { error: booksError } = await client.from('books').select('id').limit(1);
    if (booksError) {
      return {
        success: false,
        message: `Connected to Supabase, but error in 'books' table: ${booksError.message}. Make sure you ran supabase_schema.sql!`,
        details: booksError,
      };
    }

    // 2. Verify site_settings table
    const { error: settingsError } = await client.from('site_settings').select('key').limit(1);
    if (settingsError) {
      return {
        success: false,
        message: `Connected to Supabase, but error in 'site_settings' table: ${settingsError.message}. Make sure you ran supabase_schema.sql!`,
        details: settingsError,
      };
    }

    return {
      success: true,
      message: 'Connected successfully! Database tables (books, site_settings) are ready and verified.',
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Connection failed: ${err.message || err}`,
    };
  }
}

/**
 * Save site configuration and books directly to Supabase
 */
export async function saveConfigToSupabase(config: any): Promise<{ success: boolean; error?: string }> {
  const client = getSupabase();
  if (!client) {
    return { success: false, error: 'Supabase is not configured with valid credentials.' };
  }

  try {
    // 1. Upsert books table (matching Supabase public.books schema columns)
    if (Array.isArray(config.books)) {
      for (const book of config.books) {
        const { error: bookErr } = await client.from('books').upsert({
          id: book.id,
          title: book.title,
          subtitle: book.subtitle || '',
          description: book.description || '',
          cover_image: book.coverImage || '',
          amazon_url: book.amazonUrl || '',
          rating: book.rating || 5,
          review_count: book.reviewCount || 1,
          publication_year: book.publicationYear || '2025',
          highlights: book.highlights || [],
          updated_at: new Date().toISOString(),
        });
        if (bookErr) throw bookErr;
      }
    }

    // 2. Upsert site_settings table with full config
    const { error: settingsErr } = await client.from('site_settings').upsert({
      key: 'main_config',
      value: config,
      updated_at: new Date().toISOString(),
    });
    if (settingsErr) throw settingsErr;

    return { success: true };
  } catch (err: any) {
    console.error('Error saving to Supabase:', err);
    return { success: false, error: err.message || String(err) };
  }
}

/**
 * Load full site configuration from Supabase on application startup
 */
export async function loadConfigFromSupabase(): Promise<any | null> {
  const client = getSupabase();
  if (!client) return null;

  try {
    const { data: settingsData, error: settingsErr } = await client
      .from('site_settings')
      .select('value')
      .eq('key', 'main_config')
      .maybeSingle();

    if (settingsErr) {
      console.warn('Could not fetch site_settings from Supabase:', settingsErr.message);
      return null;
    }

    if (!settingsData || !settingsData.value) {
      return null;
    }

    let config = settingsData.value;

    // Fetch individual books to ensure any direct book edits are merged
    const { data: booksData, error: booksErr } = await client
      .from('books')
      .select('*')
      .order('id');

    if (!booksErr && booksData && booksData.length > 0) {
      config.books = booksData.map((b: any) => ({
        id: b.id,
        title: b.title,
        displayTitle: b.display_title || b.title,
        subtitle: b.subtitle,
        description: b.description,
        coverImage: b.cover_image,
        amazonUrl: b.amazon_url,
        rating: b.rating,
        reviewCount: b.review_count,
        price: b.price || '$6.95',
        originalPrice: b.original_price || '$12.95',
        publicationYear: b.publication_year,
        highlights: b.highlights || [],
      }));
    }

    return config;
  } catch (err) {
    console.error('Failed to load from Supabase:', err);
    return null;
  }
}
