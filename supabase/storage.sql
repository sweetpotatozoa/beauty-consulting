-- Storage bucket setup for consultation photos
-- Run this in Supabase SQL Editor or Storage UI

-- Create storage bucket for consultation photos
-- Note: This can also be done via Supabase Dashboard > Storage
-- Bucket name: consultation-photos
-- Public: true (for easy access to images)
-- File size limit: 5MB (recommended for photos)
-- Allowed MIME types: image/jpeg, image/png, image/webp

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'consultation-photos',
  'consultation-photos',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for consultation-photos bucket
-- Allow anyone to upload photos
CREATE POLICY "Allow anonymous upload to consultation-photos"
  ON storage.objects FOR INSERT
  TO anon
  WITH CHECK (
    bucket_id = 'consultation-photos'
    AND (storage.foldername(name))[1] IS NOT NULL -- Ensure files are in a folder
  );

-- Allow anyone to read photos (public bucket)
CREATE POLICY "Allow public read from consultation-photos"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'consultation-photos');

-- Allow service role full access for deletion/updates
CREATE POLICY "Service role full access to consultation-photos"
  ON storage.objects
  TO service_role
  USING (bucket_id = 'consultation-photos')
  WITH CHECK (bucket_id = 'consultation-photos');

-- Optional: Auto-delete policy for old files (cleanup)
-- Uncomment if you want to automatically delete photos older than 30 days
-- CREATE POLICY "Auto-delete old photos"
--   ON storage.objects FOR DELETE
--   TO authenticated
--   USING (
--     bucket_id = 'consultation-photos'
--     AND created_at < NOW() - INTERVAL '30 days'
--   );
