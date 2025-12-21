-- Keyable Korea Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- INQUIRIES TABLE
-- Customer inquiry submissions from the website
-- =============================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Customer Information
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,

  -- Inquiry Details
  service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('private_tour', 'medical_tourism', 'guide_service', 'vehicle_rental', 'other')),
  travel_date DATE,
  group_size INTEGER,
  message TEXT NOT NULL,

  -- Admin Management
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'cancelled')),
  admin_notes TEXT,
  locale VARCHAR(5) DEFAULT 'en'
);

-- Index for faster queries
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_service_type ON inquiries(service_type);

-- =============================================
-- NOTICES TABLE
-- Announcements and news for the website
-- =============================================
CREATE TABLE IF NOT EXISTS notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Multilingual Content
  title_en VARCHAR(255) NOT NULL,
  title_id VARCHAR(255) NOT NULL,
  content_en TEXT NOT NULL,
  content_id TEXT NOT NULL,

  -- Metadata
  category VARCHAR(50) DEFAULT 'announcement' CHECK (category IN ('announcement', 'update', 'promotion', 'travel_info')),
  slug VARCHAR(255) UNIQUE NOT NULL,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  views INTEGER DEFAULT 0
);

-- Index for faster queries
CREATE INDEX idx_notices_published ON notices(is_published, published_at DESC);
CREATE INDEX idx_notices_category ON notices(category);
CREATE INDEX idx_notices_slug ON notices(slug);

-- =============================================
-- FAQ TABLE
-- Frequently Asked Questions
-- =============================================
CREATE TABLE IF NOT EXISTS faq (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Multilingual Content
  question_en TEXT NOT NULL,
  question_id TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_id TEXT NOT NULL,

  -- Organization
  category VARCHAR(50) DEFAULT 'general' CHECK (category IN ('general', 'booking', 'payment', 'tour', 'medical', 'visa')),
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true
);

-- Index for ordering
CREATE INDEX idx_faq_order ON faq(order_index, category);
CREATE INDEX idx_faq_published ON faq(is_published);

-- =============================================
-- ADMIN USERS TABLE
-- For admin authentication
-- =============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  last_login TIMESTAMPTZ
);

-- =============================================
-- AUTO-UPDATE TIMESTAMP FUNCTION
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notices_updated_at
  BEFORE UPDATE ON notices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_updated_at
  BEFORE UPDATE ON faq
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read published notices" ON notices
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read published FAQ" ON faq
  FOR SELECT USING (is_published = true);

-- Authenticated access for all operations (service role bypasses RLS)
CREATE POLICY "Service role full access inquiries" ON inquiries
  FOR ALL USING (true);

CREATE POLICY "Service role full access notices" ON notices
  FOR ALL USING (true);

CREATE POLICY "Service role full access faq" ON faq
  FOR ALL USING (true);

-- Allow anonymous inserts to inquiries (for form submissions)
CREATE POLICY "Anyone can insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- =============================================
-- SAMPLE DATA (Optional)
-- =============================================

-- Sample FAQ entries
INSERT INTO faq (question_en, question_id, answer_en, answer_id, category, order_index, is_published) VALUES
(
  'How do I book a private tour?',
  'Bagaimana cara memesan tur pribadi?',
  'You can book a private tour by filling out our inquiry form or contacting us via WhatsApp. Our team will respond within 24 hours with a customized itinerary and quote.',
  'Anda dapat memesan tur pribadi dengan mengisi formulir pertanyaan kami atau menghubungi kami melalui WhatsApp. Tim kami akan merespons dalam 24 jam dengan itinerary dan penawaran yang disesuaikan.',
  'booking',
  1,
  true
),
(
  'What payment methods do you accept?',
  'Metode pembayaran apa yang Anda terima?',
  'We accept bank transfers (Korean and international), credit cards (Visa, Mastercard), and PayPal. A 30% deposit is required to confirm your booking.',
  'Kami menerima transfer bank (Korea dan internasional), kartu kredit (Visa, Mastercard), dan PayPal. Deposit 30% diperlukan untuk mengonfirmasi pemesanan Anda.',
  'payment',
  2,
  true
),
(
  'Do I need a visa to visit Korea for medical tourism?',
  'Apakah saya memerlukan visa untuk berkunjung ke Korea untuk wisata medis?',
  'Indonesian citizens can enter Korea visa-free for up to 30 days for tourism purposes. For medical treatment exceeding 30 days, a medical tourism visa (C-3-3) may be required. We can assist with visa documentation.',
  'Warga negara Indonesia dapat masuk ke Korea tanpa visa hingga 30 hari untuk tujuan wisata. Untuk perawatan medis lebih dari 30 hari, visa wisata medis (C-3-3) mungkin diperlukan. Kami dapat membantu dengan dokumentasi visa.',
  'visa',
  3,
  true
),
(
  'What is included in the guide service?',
  'Apa yang termasuk dalam layanan pemandu?',
  'Our professional guide service includes: a licensed Korean guide fluent in English/Indonesian, real-time translation, local recommendations, restaurant reservations, and 24/7 support during your trip.',
  'Layanan pemandu profesional kami meliputi: pemandu berlisensi Korea yang fasih berbahasa Inggris/Indonesia, terjemahan real-time, rekomendasi lokal, reservasi restoran, dan dukungan 24/7 selama perjalanan Anda.',
  'tour',
  4,
  true
),
(
  'Can you arrange hospital appointments for medical tourism?',
  'Bisakah Anda mengatur janji temu rumah sakit untuk wisata medis?',
  'Yes! We partner with top Korean hospitals including Samsung Medical Center, Asan Medical Center, and Severance Hospital. We handle appointment scheduling, medical record translation, and hospital coordination.',
  'Ya! Kami bermitra dengan rumah sakit terkemuka Korea termasuk Samsung Medical Center, Asan Medical Center, dan Severance Hospital. Kami menangani penjadwalan janji, penerjemahan rekam medis, dan koordinasi rumah sakit.',
  'medical',
  5,
  true
);

-- Sample Notice
INSERT INTO notices (title_en, title_id, content_en, content_id, category, slug, is_published, published_at) VALUES
(
  'Welcome to Keyable Korea!',
  'Selamat Datang di Keyable Korea!',
  'We are excited to launch our new website! Keyable Korea offers premium travel and medical tourism services for visitors from Indonesia and around the world. Explore our services and contact us for a personalized travel experience.',
  'Kami sangat senang meluncurkan website baru kami! Keyable Korea menawarkan layanan wisata dan wisata medis premium untuk pengunjung dari Indonesia dan seluruh dunia. Jelajahi layanan kami dan hubungi kami untuk pengalaman perjalanan yang dipersonalisasi.',
  'announcement',
  'welcome-to-keyable-korea',
  true,
  NOW()
);
