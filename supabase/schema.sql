-- ==========================================
-- AETHERIA — Supabase Database Schema
-- ==========================================
-- Run this in your Supabase SQL Editor to create all tables,
-- RLS policies, triggers, and initial seed data.
-- ==========================================

-- 1. PROFILES (extends Supabase auth.users)
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('super_admin', 'admin', 'editor', 'viewer')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', COALESCE(NEW.raw_user_meta_data->>'role', 'viewer'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. HERO (single row — the hero section)
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS hero (
  id SERIAL PRIMARY KEY,
  headline TEXT NOT NULL DEFAULT 'Building the Future of Digital Intelligence',
  subheadline TEXT DEFAULT 'Where visionary ideas meet precision engineering. We craft immersive digital experiences that define categories and captivate audiences.',
  cta_primary_text TEXT DEFAULT 'Start Building',
  cta_primary_link TEXT DEFAULT '/contact',
  cta_secondary_text TEXT DEFAULT 'See Our Work',
  cta_secondary_link TEXT DEFAULT '/case-studies',
  bg_video_url TEXT,
  bg_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. SECTIONS (CMS-like, each section has a unique key)
-- ------------------------------------------------------
CREATE TABLE IF NOT EXISTS sections (
  id SERIAL PRIMARY KEY,
  key VARCHAR(50) UNIQUE NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  subtitle TEXT,
  content JSONB DEFAULT '{}',
  is_visible BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. NAVIGATION
-- --------------
CREATE TABLE IF NOT EXISTS navigation (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  parent_id INT REFERENCES navigation(id) ON DELETE SET NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  is_external BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. FOOTER (organized by columns/sections)
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS footer (
  id SERIAL PRIMARY KEY,
  key VARCHAR(50) UNIQUE NOT NULL,
  content JSONB NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. FEATURES
-- ------------
CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY,
  icon TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. SERVICES
-- ------------
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  icon TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  link TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. PRICING PLANS
-- ------------------
CREATE TABLE IF NOT EXISTS pricing_plans (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT NOT NULL,
  period TEXT,
  features JSONB DEFAULT '[]',
  cta_text TEXT DEFAULT 'Get Started',
  cta_link TEXT DEFAULT '/contact',
  is_popular BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. FAQS
-- --------
CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. TESTIMONIALS
-- ------------------
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_avatar TEXT,
  company TEXT,
  content TEXT NOT NULL,
  rating INT DEFAULT 5,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. BLOG POSTS
-- ----------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  author_id UUID REFERENCES profiles(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. CASE STUDIES
-- ------------------
CREATE TABLE IF NOT EXISTS case_studies (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  client TEXT,
  industry TEXT,
  challenge TEXT,
  solution TEXT NOT NULL,
  results JSONB,
  cover_image_url TEXT,
  testimonial_quote TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. LEADS
-- ----------
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. NEWSLETTER SUBSCRIBERS
-- ----------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_confirmed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. SEO SETTINGS
-- ------------------
CREATE TABLE IF NOT EXISTS seo_settings (
  id SERIAL PRIMARY KEY,
  page_key TEXT UNIQUE NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  canonical_url TEXT,
  extra_meta JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. AI CONFIG
-- ---------------
CREATE TABLE IF NOT EXISTS ai_config (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. SITE SETTINGS
-- --------------------
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. MEDIA
-- ----------
CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_text TEXT,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. LEGAL PAGES
-- -----------------
CREATE TABLE IF NOT EXISTS legal_pages (
  id SERIAL PRIMARY KEY,
  page_type TEXT NOT NULL CHECK (page_type IN ('privacy', 'terms', 'cookies')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_updated TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- UPDATED_AT TRIGGER FUNCTION
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename IN ('hero','sections','navigation','footer','features','services','pricing_plans',
                        'faqs','testimonials','blog_posts','case_studies','seo_settings','ai_config',
                        'site_settings','media','legal_pages')
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS update_updated_at on %I; ALTER TABLE %I ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();', tbl, tbl);
    EXECUTE format('CREATE TRIGGER update_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();', tbl);
  END LOOP;
END $$;

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_pages ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS on content tables
CREATE POLICY "Public read access on hero" ON hero FOR SELECT USING (true);
CREATE POLICY "Public read access on sections" ON sections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read access on navigation" ON navigation FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read access on footer" ON footer FOR SELECT USING (true);
CREATE POLICY "Public read access on features" ON features FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read access on services" ON services FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read access on pricing_plans" ON pricing_plans FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read access on faqs" ON faqs FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read access on testimonials" ON testimonials FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read published blog_posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read visible case_studies" ON case_studies FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read active legal_pages" ON legal_pages FOR SELECT USING (is_active = true);
CREATE POLICY "Public read seo_settings" ON seo_settings FOR SELECT USING (true);
CREATE POLICY "Public read ai_config (visitor)" ON ai_config FOR SELECT USING (key NOT LIKE 'admin_%');
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read media" ON media FOR SELECT USING (true);

-- ADMIN WRITE ACCESS (authenticated users with editor+)
-- Helper function to check user role
CREATE OR REPLACE FUNCTION auth_role_is_at_least(min_role TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  CASE min_role
    WHEN 'viewer' THEN RETURN user_role IN ('viewer','editor','admin','super_admin');
    WHEN 'editor' THEN RETURN user_role IN ('editor','admin','super_admin');
    WHEN 'admin' THEN RETURN user_role IN ('admin','super_admin');
    WHEN 'super_admin' THEN RETURN user_role = 'super_admin';
    ELSE RETURN false;
  END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Editor+ policies for content
CREATE POLICY "Editor write on hero" ON hero FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor write on sections" ON sections FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor write on navigation" ON navigation FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor write on footer" ON footer FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor write on features" ON features FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor write on services" ON services FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor write on pricing_plans" ON pricing_plans FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor write on faqs" ON faqs FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor write on testimonials" ON testimonials FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor read blog_posts" ON blog_posts FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor write case_studies" ON case_studies FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Admin read/write leads" ON leads FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor read/write newsletter_subs" ON newsletter_subscribers FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor write seo_settings" ON seo_settings FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Admin write ai_config" ON ai_config FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Admin write site_settings" ON site_settings FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor write media" ON media FOR ALL USING (auth_role_is_at_least('editor'));
CREATE POLICY "Editor write legal_pages" ON legal_pages FOR ALL USING (auth_role_is_at_least('editor'));

-- Profile: users read own, admin reads all
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id OR auth_role_is_at_least('admin'));
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id OR auth_role_is_at_least('admin'));

-- ==========================================
-- SEED DATA
-- ==========================================

-- Hero (default)
INSERT INTO hero (id, headline, subheadline, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link)
VALUES (1, 'Building the Future of Digital Intelligence', 'Where visionary ideas meet precision engineering. We craft immersive digital experiences that define categories and captivate audiences.', 'Start Building', '/contact', 'See Our Work', '/case-studies')
ON CONFLICT (id) DO NOTHING;

-- Features
INSERT INTO features (id, icon, title, description, display_order) VALUES
(1, 'brain-circuit', 'AI-Powered Architecture', 'Intelligent systems designed around your business logic. Automation that thinks.', 1),
(2, 'shield-check', 'Enterprise-Grade Security', 'Bank-level encryption, SOC 2 compliance, and zero-trust architecture from day one.', 2),
(3, 'zap', 'Lightning Performance', 'Sub-second load times. Global edge deployment. Zero compromise on speed.', 3),
(4, 'palette', 'Bespoke Design', 'Every pixel intentional. Every interaction choreographed. Every experience elevated.', 4),
(5, 'bar-chart-3', 'Data-Driven Growth', 'Analytics, A/B testing, and conversion intelligence built into every layer.', 5),
(6, 'globe', 'Global Scale', 'Multi-region infrastructure. CDN-optimized assets. Zero-latency worldwide.', 6)
ON CONFLICT (id) DO NOTHING;

-- Services
INSERT INTO services (id, icon, title, description, details, display_order) VALUES
(1, 'layout-dashboard', 'Digital Platform Design', 'End-to-end platform design and development for products that matter.', 'Research, wireframes, visual design, prototyping, development, testing, launch.', 1),
(2, 'smartphone', 'Mobile Experience', 'Native and cross-platform applications that people love to use daily.', 'React Native, Flutter, SwiftUI, Kotlin. One codebase or platform-specific.', 2),
(3, 'line-chart', 'Growth & Analytics', 'Data strategy, implementation, and ongoing optimization for compound growth.', 'GA4, Mixpanel, custom dashboards, funnel analysis, cohort tracking.', 3),
(4, 'cpu', 'Cloud Infrastructure', 'Scalable, secure, and cost-optimized cloud architecture you can rely on.', 'AWS, GCP, Azure, Vercel. Auto-scaling, monitoring, CI/CD.', 4)
ON CONFLICT (id) DO NOTHING;

-- Pricing
INSERT INTO pricing_plans (id, name, description, price, period, features, cta_text, is_popular, display_order) VALUES
(1, 'Starter', 'For early-stage teams building their first premium product.', '2,499', 'project', '["1 core feature set","Basic analytics dashboard","Responsive design","Email support","1 revision round"]'::jsonb, 'Get Started', false, 1),
(2, 'Growth', 'For scaling companies that need a comprehensive digital presence.', '7,999', 'project', '["Full website + CMS","Admin dashboard","AI assistant integration","SEO optimization","3 revision rounds","30-day support"]'::jsonb, 'Get Started', true, 2),
(3, 'Enterprise', 'For organizations requiring complete custom solutions.', 'Custom', null, '["Full custom platform","Priority support","Dedicated team","Custom integrations","SLA guarantee","Ongoing retainer option"]'::jsonb, 'Contact Sales', false, 3)
ON CONFLICT (id) DO NOTHING;

-- FAQs
INSERT INTO faqs (id, question, answer, category, display_order) VALUES
(1, 'What technologies do you use?', 'We primarily use Next.js, TypeScript, Tailwind CSS, React Three Fiber for 3D, and Supabase for backend. Our stack is chosen for performance, maintainability, and developer experience.', 'General', 1),
(2, 'How long does a typical project take?', 'A standard premium website takes 6-12 weeks from kickoff to launch. Enterprise platforms may take 3-6 months depending on scope.', 'Timeline', 2),
(3, 'Do you offer ongoing support?', 'Yes. We offer monthly retainers for ongoing development, optimization, and support after launch.', 'Support', 3),
(4, 'Can I edit the content after launch?', 'Absolutely. Your CMS dashboard gives you full editing control over all content — pages, text, images, pricing, SEO metadata, and more.', 'CMS', 4),
(5, 'What about hosting and deployment?', 'We deploy to Vercel for frontend hosting and use Supabase for backend, database, and storage. Both are enterprise-grade platforms with 99.99% uptime.', 'Infrastructure', 5)
ON CONFLICT (id) DO NOTHING;

-- Testimonials
INSERT INTO testimonials (id, author_name, author_role, content, company, rating, display_order) VALUES
(1, 'Sarah Chen', 'CEO, Luminary Tech', 'Aetheria didn''t just build our website — they elevated our entire brand. The result is something we''m proud to show every single day.', 'Luminary Tech', 5, 1),
(2, 'Marcus Rivera', 'Head of Product, Nova AI', 'The attention to detail, the motion design, the backend architecture — everything was handled with exceptional care and expertise.', 'Nova AI', 5, 2),
(3, 'Elena Vasquez', 'Founder, Greenline', 'Working with Aetheria felt like having a world-class CTO and creative director on our team from day one.', 'Greenline', 5, 3)
ON CONFLICT (id) DO NOTHING;

-- Navigation
INSERT INTO navigation (id, label, href, display_order) VALUES
(1, 'Home', '/public', 1),
(2, 'Features', '/public/features', 2),
(3, 'Services', '/public/services', 3),
(4, 'Pricing', '/public/pricing', 4),
(5, 'Case Studies', '/public/case-studies', 5),
(6, 'Blog', '/public/blog', 6),
(7, 'Contact', '/public/contact', 7)
ON CONFLICT (id) DO NOTHING;

-- AI Config defaults
INSERT INTO ai_config (id, key, value) VALUES
(1, 'visitor_system_prompt', '{"prompt":"You are Aria, a helpful AI assistant for Aetheria. You help visitors learn about our services, find the right information, and connect with our team. Be warm, professional, and concise. Always try to help the visitor take the next step toward engagement."}'::jsonb),
(2, 'admin_system_prompt', '{"prompt":"You are an AI writing and strategy assistant for the Aetheria admin team. Help generate compelling copy, create SEO-friendly content, brainstorm marketing angles, and improve communication. Be direct, creative, and actionable."}'::jsonb),
(3, 'visitor_welcome_message', '{"message":"Hi there! I''m Aria, your Aetheria assistant. How can I help you today?"}')
ON CONFLICT (id) DO NOTHING;

-- Site settings defaults
INSERT INTO site_settings (id, key, value) VALUES
(1, 'brand', '{"name":"Aetheria","tagline":"Intelligent Digital Experiences","logo_url":"","favicon_url":"","accent_color":"#7C3AED"}'::jsonb),
(2, 'contact', '{"email":"hello@aetheria.app","phone":"+1 (555) 000-0000","address":"San Francisco, CA","social":{"twitter":"","linkedin":"","github":""}}'::jsonb),
(3, 'theme', '{"bg_gradient":{"from":"#0a0a0f","to":"#1a0a2e"},"accent_primary":"#7C3AED","accent_secondary":"#A78BFA","font_heading":"Inter","font_body":"Inter"}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Legal pages defaults
INSERT INTO legal_pages (id, page_type, title, content, is_active) VALUES
(1, 'privacy', 'Privacy Policy', '# Privacy Policy\n\nLast updated: January 2026\n\n## 1. Information We Collect\n\nWe collect information you provide directly, such as your name, email address, and company when you fill out forms on our website.\n\n## 2. How We Use Information\n\nWe use the information we collect to provide, maintain, and improve our services, to communicate with you, and to process your requests.\n\n## 3. Information Sharing\n\nWe do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent.\n\n## 4. Data Security\n\nWe implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.\n\n## 5. Your Rights\n\nYou have the right to access, correct, or delete your personal data. Contact us to exercise these rights.\n\n## 6. Contact\n\nFor questions about this policy, please contact us at hello@aetheria.app.', true),
(2, 'terms', 'Terms of Service', '# Terms of Service\n\nLast updated: January 2026\n\n## 1. Acceptance of Terms\n\nBy accessing and using the Aetheria website, you accept and agree to be bound by these Terms of Service.\n\n## 2. Use of Services\n\nOur digital services are provided on an "as is" basis. We reserve the right to modify or discontinue services at any time.\n\n## 3. Intellectual Property\n\nAll content, design, and intellectual property on this website is owned by Aetheria and protected by applicable laws.\n\n## 4. Limitation of Liability\n\nIn no event shall Aetheria be liable for any indirect, incidental, special, consequential, or punitive damages.\n\n## 5. Governing Law\n\nThese terms shall be governed by the laws of the State of California.\n\n## 6. Contact\n\nFor questions about these terms, contact us at hello@aetheria.app.', true),
(3, 'cookies', 'Cookie Policy', '# Cookie Policy\n\nLast updated: January 2026\n\n## 1. What Are Cookies\n\nCookies are small data files stored on your device when you visit our website.\n\n## 2. Cookies We Use\n\n- **Essential Cookies:** Required for site functionality.\n- **Analytics Cookies:** Help us understand how visitors use our site.\n- **Marketing Cookies:** Used to deliver relevant advertisements.\n\n## 3. Managing Cookies\n\nYou can control cookies through your browser settings. Disabling cookies may affect site functionality.\n\n## 4. Third-Party Cookies\n\nWe use third-party services (e.g., Google Analytics) that may set their own cookies.\n\n## 5. Contact\n\nFor questions about our cookie policy, contact us at hello@aetheria.app.', true)
ON CONFLICT (id) DO NOTHING;

-- SEO settings
INSERT INTO seo_settings (id, page_key, meta_title, meta_description) VALUES
(1, 'home', 'Aetheria — Intelligent Digital Experiences', 'Premium digital solutions powered by intelligence. Transform your vision into reality.'),
(2, 'about', 'About Aetheria — Our Story & Mission', 'Learn about Aetheria''s mission to create intelligent digital experiences.'),
(3, 'features', 'Features — What Makes Aetheria Different', 'Explore the capabilities that set Aetheria apart from the rest.'),
(4, 'pricing', 'Pricing — Transparent Plans for Every Stage', 'Choose the plan that fits your needs. From starter to enterprise.'),
(5, 'contact', 'Contact Aetheria — Let''s Build Something Great', 'Get in touch. We''d love to hear about your project.')
ON CONFLICT (id) DO NOTHING;
