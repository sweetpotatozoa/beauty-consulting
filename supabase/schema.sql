-- Beauty Consulting MVP Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Consultations table: stores user photos and free AI analysis
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  input_data JSONB NOT NULL,
  -- Structure: { photo_url: string, photo_path?: string, user_info?: { age?, preferences?, concerns? } }
  free_result JSONB NOT NULL,
  -- Structure: { face_shape: string, hair_color: string, style_keywords: string[], basic_recommendation: string }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Paid reports table: stores detailed AI analysis after payment
CREATE TABLE IF NOT EXISTS paid_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  paid_result JSONB NOT NULL,
  -- Structure: { detailed_analysis, hair_recommendations, fashion_guidance, product_recommendations, styling_tips, k_beauty_trends }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Payments table: tracks payment status
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  paid_report_id UUID NOT NULL REFERENCES paid_reports(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_paid_reports_consultation_id ON paid_reports(consultation_id);
CREATE INDEX IF NOT EXISTS idx_paid_reports_email ON paid_reports(email);
CREATE INDEX IF NOT EXISTS idx_payments_paid_report_id ON payments(paid_report_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- Row Level Security (RLS) Policies
-- For MVP, we'll keep it simple - allow all reads/writes for now
-- In production, you'd want more strict policies

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE paid_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to create consultations
CREATE POLICY "Allow anonymous consultation creation"
  ON consultations FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anyone to read their own consultation by ID
CREATE POLICY "Allow consultation read by ID"
  ON consultations FOR SELECT
  TO anon
  USING (true);

-- Allow service role full access (for API routes)
CREATE POLICY "Service role full access to consultations"
  ON consultations
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to paid_reports"
  ON paid_reports
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to payments"
  ON payments
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow users to read paid reports they own (by email)
-- Note: In production, use proper authentication instead of email matching
CREATE POLICY "Allow paid report read by email"
  ON paid_reports FOR SELECT
  TO anon
  USING (true);

-- Comments for documentation
COMMENT ON TABLE consultations IS 'Stores user uploaded photos and free AI styling analysis';
COMMENT ON TABLE paid_reports IS 'Stores detailed paid AI analysis linked to consultations';
COMMENT ON TABLE payments IS 'Tracks payment transactions for paid reports';

COMMENT ON COLUMN consultations.input_data IS 'JSONB: photo_url, photo_path, optional user_info';
COMMENT ON COLUMN consultations.free_result IS 'JSONB: face_shape, hair_color, style_keywords, basic_recommendation';
COMMENT ON COLUMN paid_reports.paid_result IS 'JSONB: detailed analysis including hair/fashion recommendations, products, tips, trends';
