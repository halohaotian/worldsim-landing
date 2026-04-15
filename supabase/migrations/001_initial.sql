-- =====================================================
-- WorldSim Landing Page - Initial Schema
-- Run this in Supabase SQL Editor
-- =====================================================

-- 1. Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  full_name   TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 2. Waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id          SERIAL PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id),
  email       TEXT UNIQUE NOT NULL,
  status      TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'invited', 'active')),
  source      TEXT DEFAULT 'landing',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 3. Page views
CREATE TABLE IF NOT EXISTS page_views (
  id          BIGSERIAL PRIMARY KEY,
  path        TEXT NOT NULL,
  referrer    TEXT,
  user_agent  TEXT,
  session_id  TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 4. Click events
CREATE TABLE IF NOT EXISTS click_events (
  id          BIGSERIAL PRIMARY KEY,
  element     TEXT NOT NULL,
  path        TEXT,
  session_id  TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 5. Daily stats
CREATE TABLE IF NOT EXISTS daily_stats (
  date            DATE PRIMARY KEY,
  page_views      INT DEFAULT 0,
  unique_visitors INT DEFAULT 0,
  registrations   INT DEFAULT 0,
  waitlist_joins  INT DEFAULT 0,
  clicks          INT DEFAULT 0
);

-- 6. Indexes
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views (created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_click_events_created ON click_events (created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist (email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist (status);

-- 7. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies
CREATE POLICY "Users read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users read own waitlist" ON waitlist
  FOR SELECT USING (auth.uid() = user_id);

-- Allow anon/public insert to waitlist (for quick email signup from landing page)
CREATE POLICY "Public insert waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role page_views" ON page_views
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role click_events" ON click_events
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admin read daily_stats" ON daily_stats
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid() AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- 9. Auto-create profile + waitlist on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');

  INSERT INTO public.waitlist (user_id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (email) DO UPDATE SET user_id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
