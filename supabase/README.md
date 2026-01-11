# Supabase Setup Guide

This directory contains SQL scripts for setting up the Supabase database and storage for the Beauty Consulting MVP.

## Prerequisites

1. Create a Supabase project at https://supabase.com
2. Get your project credentials:
   - Project URL: `https://YOUR_PROJECT.supabase.co`
   - Anon/Public Key: Found in Project Settings > API
   - Service Role Key: Found in Project Settings > API (keep this secret!)

## Setup Steps

### 1. Environment Variables

Update your `.env.local` file with Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here  # Optional for MVP
OPENAI_API_KEY=your_openai_key_here
```

### 2. Database Schema

Go to your Supabase Dashboard > SQL Editor and run:

```bash
# Copy and paste the contents of schema.sql
```

Or use Supabase CLI:
```bash
supabase db push
```

This will create:
- `consultations` table
- `paid_reports` table
- `payments` table
- Indexes for performance
- Row Level Security (RLS) policies

### 3. Storage Bucket

**Option A: Using SQL Editor**

Run the `storage.sql` file in the SQL Editor.

**Option B: Using Dashboard (Recommended)**

1. Go to Storage in Supabase Dashboard
2. Click "Create a new bucket"
3. Settings:
   - Name: `consultation-photos`
   - Public: ✅ Yes
   - File size limit: 5 MB
   - Allowed MIME types: `image/jpeg, image/png, image/webp, image/jpg`
4. Click "Create bucket"

Then run the storage policies from `storage.sql` in SQL Editor.

### 4. Verify Setup

Run these queries in SQL Editor to verify:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- Check storage bucket exists
SELECT * FROM storage.buckets WHERE id = 'consultation-photos';
```

## Database Structure

### consultations
Stores user uploaded photos and free AI analysis.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| input_data | JSONB | Photo URL, path, and optional user info |
| free_result | JSONB | Basic AI analysis (face shape, hair color, keywords, recommendation) |
| created_at | TIMESTAMP | When consultation was created |

### paid_reports
Stores detailed paid AI analysis.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| consultation_id | UUID | Foreign key to consultations |
| email | TEXT | User email for access |
| paid_result | JSONB | Detailed AI analysis with recommendations |
| created_at | TIMESTAMP | When report was created |

### payments
Tracks payment transactions.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| paid_report_id | UUID | Foreign key to paid_reports |
| email | TEXT | User email |
| amount | NUMERIC | Payment amount |
| status | TEXT | pending, completed, or failed |
| paid_at | TIMESTAMP | When payment was completed |
| created_at | TIMESTAMP | When payment record was created |

## Security Notes

### Row Level Security (RLS)

The schema includes basic RLS policies:
- Anonymous users can create consultations and read by ID
- Service role (API routes) has full access
- Users can read paid reports (basic email-based access)

**For Production:**
- Implement proper authentication (Supabase Auth)
- Restrict access based on user authentication
- Add rate limiting
- Implement proper email verification

### Storage Security

- Bucket is public for easy image access
- File size limited to 5MB
- Only image MIME types allowed
- Consider adding virus scanning for production

## Testing

After setup, test the connection:

```typescript
import { supabase } from '@/lib/supabase';

// Test database connection
const { data, error } = await supabase.from('consultations').select('count');
console.log('Database connected:', !error);

// Test storage connection
const { data: buckets } = await supabase.storage.listBuckets();
console.log('Storage buckets:', buckets);
```

## Troubleshooting

**Error: "relation 'consultations' does not exist"**
- Make sure you ran `schema.sql` in the SQL Editor
- Check you're connected to the correct Supabase project

**Error: "Bucket 'consultation-photos' does not exist"**
- Create the bucket via Dashboard or run `storage.sql`
- Verify bucket name is exactly `consultation-photos`

**Error: "row-level security policy violation"**
- Check RLS policies are created correctly
- For development, you can temporarily disable RLS (not recommended)

## Next Steps

After completing setup:
1. Test database connection in your Next.js app
2. Test image upload to storage
3. Implement API routes for consultations
4. Test the full flow: upload → analyze → store → retrieve
