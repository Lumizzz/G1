-- Create storage buckets for media assets
-- Run this in Supabase SQL Editor after creating the schema

-- Media bucket for general uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'application/pdf', 'text/plain']
)
ON CONFLICT (id) DO NOTHING;

-- Logos bucket for brand assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'logos',
  'logos',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Avatars bucket for user profile images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies to allow public read access
CREATE POLICY "Public Read Access" ON storage.objects
FOR SELECT USING (bucket_id IN ('media', 'logos', 'avatars'));

-- Set up storage policies to allow authenticated upload
CREATE POLICY "Authenticated Upload Access" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id IN ('media', 'logos', 'avatars') AND
  auth.role() = 'authenticated'
);

-- Set up storage policies to allow owner to update and delete their files
CREATE POLICY "Owner Update Access" ON storage.objects
FOR UPDATE USING (
  bucket_id IN ('media', 'logos', 'avatars') AND
  auth.uid() = owner_id
);

CREATE POLICY "Owner Delete Access" ON storage.objects
FOR DELETE USING (
  bucket_id IN ('media', 'logos', 'avatars') AND
  auth.uid() = owner_id
);