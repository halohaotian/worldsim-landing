-- =====================================================
-- WorldSim Landing Page - Initial Schema
-- All tables use worldsim_ prefix to avoid conflicts
-- =====================================================

-- 1. Profiles table
CREATE TABLE IF NOT EXISTS worldsim_profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  full_name   TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 2. Waitlist table
CREATE TABLE IF NOT EXISTS worldsim_waitlist (
  id          SERIAL PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id),
  email       TEXT UNIQUE NOT NULL,
  status      TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'invited', 'active')),
  source      TEXT DEFAULT 'landing',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 3. Page views
CREATE TABLE IF NOT EXISTS worldsim_page_views (
  id          BIGSERIAL PRIMARY KEY,
  path        TEXT NOT NULL,
  referrer    TEXT,
  user_agent  TEXT,
  session_id  TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 4. Click events
CREATE TABLE IF NOT EXISTS worldsim_click_events (
  id          BIGSERIAL PRIMARY KEY,
  element     TEXT NOT NULL,
  path        TEXT,
  session_id  TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 5. Daily stats
CREATE TABLE IF NOT EXISTS worldsim_daily_stats (
  date            DATE PRIMARY KEY,
  page_views      INT DEFAULT 0,
  unique_visitors INT DEFAULT 0,
  registrations   INT DEFAULT 0,
  waitlist_joins  INT DEFAULT 0,
  clicks          INT DEFAULT 0
);

-- 6. Indexes
CREATE INDEX IF NOT EXISTS idx_worldsim_pv_created ON worldsim_page_views (created_at);
CREATE INDEX IF NOT EXISTS idx_worldsim_pv_session ON worldsim_page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_worldsim_ce_created ON worldsim_click_events (created_at);
CREATE INDEX IF NOT EXISTS idx_worldsim_wl_email ON worldsim_waitlist (email);
CREATE INDEX IF NOT EXISTS idx_worldsim_wl_status ON worldsim_waitlist (status);

-- 7. Enable RLS
ALTER TABLE worldsim_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE worldsim_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE worldsim_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE worldsim_click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE worldsim_daily_stats ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies
CREATE POLICY "worldsim_users_read_own_profile" ON worldsim_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "worldsim_users_read_own_waitlist" ON worldsim_waitlist
  FOR SELECT USING (auth.uid() = user_id);

-- Allow anon insert to waitlist (for quick email signup from landing page)
CREATE POLICY "worldsim_public_insert_waitlist" ON worldsim_waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "worldsim_service_role_pv" ON worldsim_page_views
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "worldsim_service_role_ce" ON worldsim_click_events
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "worldsim_admin_read_stats" ON worldsim_daily_stats
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid() AND raw_app_meta_data->>'role' = 'admin'
    )
  );

-- 9. Auto-create profile + waitlist on signup (worldsim-specific function)
CREATE OR REPLACE FUNCTION public.worldsim_handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.worldsim_profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');

  INSERT INTO public.worldsim_waitlist (user_id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (email) DO UPDATE SET user_id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS worldsim_on_auth_user_created ON auth.users;
CREATE TRIGGER worldsim_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.worldsim_handle_new_user();
