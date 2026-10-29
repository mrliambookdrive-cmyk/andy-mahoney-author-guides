-- ==============================================================================
-- Supabase Database Schema for Andy Mahoney Author Website CMS
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ueinqyzwhiprpsqzabhv/sql/new
-- ==============================================================================

-- 1. Books Table
CREATE TABLE IF NOT EXISTS public.books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  display_title TEXT,
  subtitle TEXT,
  description TEXT,
  cover_image TEXT,
  amazon_url TEXT,
  rating NUMERIC DEFAULT 5,
  review_count INTEGER DEFAULT 1,
  price TEXT DEFAULT '$6.95',
  original_price TEXT DEFAULT '$12.95',
  publication_year TEXT DEFAULT '2025',
  highlights JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Site Settings Table (Hero, About, Lifestyle, Socials, Benefits, Testimonials)
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Clean existing policies if re-running
DROP POLICY IF EXISTS "Allow public all books" ON public.books;
DROP POLICY IF EXISTS "Allow public read books" ON public.books;
DROP POLICY IF EXISTS "Allow public upsert books" ON public.books;

DROP POLICY IF EXISTS "Allow public all settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow public read settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow public upsert settings" ON public.site_settings;

DROP POLICY IF EXISTS "Allow public all contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow public insert contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow public read contacts" ON public.contacts;

-- Create open policies for web app access
CREATE POLICY "Allow public all books" ON public.books FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all contacts" ON public.contacts FOR ALL USING (true) WITH CHECK (true);
