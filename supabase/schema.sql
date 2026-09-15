CREATE TABLE IF NOT EXISTS admin_settings (
  id INT PRIMARY KEY DEFAULT 1,
  password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS personal_info (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT,
  role TEXT,
  tagline TEXT,
  email TEXT,
  avatar_url TEXT,
  github TEXT,
  linkedin TEXT,
  instagram TEXT
);

CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT,
  role TEXT,
  join_date TEXT,
  description TEXT,
  logo_url TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS project_categories (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  icon TEXT,
  display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id TEXT REFERENCES project_categories(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  key_features TEXT[] DEFAULT '{}',
  repo_link TEXT DEFAULT '',
  live_link TEXT DEFAULT '',
  display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  icon_url TEXT,
  display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  issuer TEXT,
  date TEXT,
  credential_url TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  file_url TEXT DEFAULT '',
  display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT DEFAULT 'achievement',
  title TEXT,
  description TEXT,
  perks TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  display_order INT DEFAULT 0
);

-- Enable RLS
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Allow SELECT for anon role (public read)
CREATE POLICY "Public read for personal_info" ON personal_info FOR SELECT TO anon USING (true);
CREATE POLICY "Public read for experiences" ON experiences FOR SELECT TO anon USING (true);
CREATE POLICY "Public read for project_categories" ON project_categories FOR SELECT TO anon USING (true);
CREATE POLICY "Public read for projects" ON projects FOR SELECT TO anon USING (true);
CREATE POLICY "Public read for skills" ON skills FOR SELECT TO anon USING (true);
CREATE POLICY "Public read for certifications" ON certifications FOR SELECT TO anon USING (true);
CREATE POLICY "Public read for resources" ON resources FOR SELECT TO anon USING (true);
CREATE POLICY "Public read for achievements" ON achievements FOR SELECT TO anon USING (true);

-- Storage bucket policy comment:
-- Please create a storage bucket named 'portfolio-assets' in your Supabase dashboard
-- and set it to 'Public' so that uploaded images can be accessed openly.

-- Insert default admin password
INSERT INTO admin_settings (id, password_hash) 
VALUES (1, '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy')
ON CONFLICT (id) DO NOTHING;
