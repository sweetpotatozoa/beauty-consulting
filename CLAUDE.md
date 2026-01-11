# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**K-Beauty AI 컨설팅 웹앱 (연애 스타일링)**

This is an AI-powered beauty consulting web application that provides personalized hair and fashion styling recommendations based on user photos. Built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS 4**.

**Target Market**: Women aged 20-30 in Taiwan, Hong Kong, and Singapore
**Core Value**: Photo upload → AI-generated integrated hair + fashion styling guide
**Business Model**: Freemium (free basic analysis + paid detailed report)

**Tech Stack**:
- **AI**: GPT-4 Vision for style analysis
- **Backend**: Supabase (Database + Storage)
- **Payment**: TBD
- **Email**: TBD

## MVP Requirements

### User Flow
1. **Landing Page** (`/`) - Service introduction
2. **Photo Upload + Analysis** (`/consultation/new`) - User uploads photo, AI analyzes
3. **Freemium Result** (`/consultation/:id`) - Display basic styling recommendations
4. **Payment + Email** (`/consultation/:id/payment`) - User pays and enters email
5. **Paid Report** (`/report/:id`) - Detailed report accessed via email link

### Database Schema (Supabase)

**consultations**
- `id` (uuid, primary key)
- `input_data` (jsonb) - User photo and input information
- `free_result` (jsonb) - Basic AI analysis result
- `created_at` (timestamp)

**paid_reports**
- `id` (uuid, primary key)
- `consultation_id` (uuid, foreign key → consultations.id)
- `email` (text) - User email
- `paid_result` (jsonb) - Detailed AI analysis result
- `created_at` (timestamp)

**payments**
- `id` (uuid, primary key)
- `paid_report_id` (uuid, foreign key → paid_reports.id)
- `email` (text) - User email
- `amount` (numeric) - Payment amount
- `status` (text) - Payment status (pending/completed/failed)
- `paid_at` (timestamp)

### API Routes

**POST /api/consultation**
- Creates new consultation with GPT-4 Vision analysis
- Uploads photo to Supabase Storage
- Returns consultation ID and free result

**GET /api/consultation/[id]**
- Retrieves freemium result for a consultation
- Returns basic styling recommendations

**POST /api/payment**
- Processes payment for detailed report
- Creates paid_report entry
- Sends email with report link

**GET /api/report/[id]**
- Retrieves detailed paid report
- Validates access via email link

## Development Commands

### Running the Application
```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Create production build
npm start        # Run production server
npm run lint     # Run ESLint (note: limited configuration)
```

### Key Development Notes
- The dev server runs on `http://localhost:3000`
- Hot reload is enabled - changes to `app/page.tsx` or other files auto-update
- TypeScript strict mode is enabled
- Path alias `@/*` maps to the root directory

## Architecture

### Tech Stack
- **Framework**: Next.js 16.1.1 with App Router
- **React**: Version 19.2.3
- **TypeScript**: v5 with strict mode
- **Styling**: Tailwind CSS 4 with PostCSS
- **Backend**: Supabase (supabase-js v2.90.1)
- **Fonts**: Geist Sans and Geist Mono (optimized via next/font)

### Project Structure
```
app/
  layout.tsx                    # Root layout with font configuration and metadata
  page.tsx                      # Landing page
  globals.css                   # Global styles with Tailwind and CSS variables
  favicon.ico

  consultation/
    new/
      page.tsx                  # Photo upload + AI analysis
    [id]/
      page.tsx                  # Freemium result display
      payment/
        page.tsx                # Payment + email input

  report/
    [id]/
      page.tsx                  # Paid detailed report

  api/
    consultation/
      route.ts                  # POST - Create consultation with GPT-4 Vision
      [id]/
        route.ts                # GET - Retrieve consultation result
    payment/
      route.ts                  # POST - Process payment
    report/
      [id]/
        route.ts                # GET - Retrieve paid report

  components/                   # Shared UI components
  lib/
    supabase.ts                 # Supabase client initialization
    openai.ts                   # OpenAI client for GPT-4 Vision
    types.ts                    # TypeScript type definitions

public/                         # Static assets (SVG icons, images)
```

### App Router Pattern
- Uses Next.js App Router (not Pages Router)
- File-based routing in `app/` directory
- Server Components by default
- Client Components require `"use client"` directive

### Styling Configuration
- **Tailwind CSS 4**: Uses inline theme configuration via `@theme inline` in globals.css
- **CSS Variables**: `--background` and `--foreground` for theme colors
- **Dark Mode**: Automatic dark mode support via `prefers-color-scheme`
- **Fonts**:
  - Sans: Geist (via `--font-geist-sans` variable)
  - Mono: Geist Mono (via `--font-geist-mono` variable)

### Environment Variables
The project uses `.env.local` for environment configuration:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (publishable)
- `OPENAI_API_KEY` - OpenAI API key (server-side only)

**Important**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Server-only secrets should not have this prefix.

### TypeScript Configuration
- **Target**: ES2017
- **JSX**: react-jsx (automatic runtime)
- **Module Resolution**: bundler
- **Path Mapping**: `@/*` aliases to project root
- **Strict Mode**: Enabled
- Next.js TypeScript plugin is configured for enhanced IDE support

### ESLint Configuration
Uses ESLint 9 with:
- `eslint-config-next/core-web-vitals` - Core Web Vitals rules
- `eslint-config-next/typescript` - TypeScript-specific Next.js rules
- Custom ignores for `.next/`, `out/`, `build/`, and `next-env.d.ts`

## Supabase Integration

The project is configured to use Supabase with environment variables already set up. When implementing database features:
- Use the Supabase client from `@supabase/supabase-js`
- Environment variables are already configured in `.env.local`
- Create the client in a separate utility file (e.g., `lib/supabase.ts`)
- For server-side: use service role key (not committed)
- For client-side: use the anon key (already in `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### Database Setup
Create tables using Supabase SQL Editor or migrations:
1. Enable UUID extension: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
2. Create tables with proper foreign key relationships
3. Set up Row Level Security (RLS) policies for data protection

### Storage Configuration
- Create a bucket named `consultation-photos` for user uploaded images
- Configure public access policies or signed URLs for image retrieval
- Use `supabase.storage.from('consultation-photos').upload()` for uploads
- Store file paths in `consultations.input_data` JSONB field

## OpenAI Integration

The project uses GPT-4 Vision for analyzing user photos and generating styling recommendations.

### API Configuration
- API key is stored in `OPENAI_API_KEY` (server-side only, not exposed to browser)
- Use OpenAI SDK for Node.js
- Create client wrapper in `lib/openai.ts`

### Usage Pattern
```typescript
// Analyze photo with GPT-4 Vision
const response = await openai.chat.completions.create({
  model: "gpt-4-vision-preview",
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "Analyze this person's style..." },
        { type: "image_url", image_url: { url: imageUrl } }
      ]
    }
  ]
});
```

### Response Structure
- **Free Result**: Basic analysis (hair color, face shape, style keywords)
- **Paid Result**: Detailed recommendations (specific products, styling tips, K-beauty trends)

## Development Patterns

### Adding New Pages
Create files in the `app/` directory:
- `app/about/page.tsx` → `/about` route
- `app/products/[id]/page.tsx` → `/products/:id` route

### Adding API Routes
Create Route Handlers in `app/api/`:
- `app/api/users/route.ts` → `/api/users` endpoint
- Use `GET`, `POST`, `PUT`, `DELETE` named exports

### Component Organization
Organize components by feature and reusability:
```
app/
  components/
    ui/                      # Reusable UI components (Button, Input, Card, etc.)
    consultation/            # Consultation-specific components
      PhotoUpload.tsx
      ResultCard.tsx
    payment/                 # Payment-specific components
      PaymentForm.tsx
    report/                  # Report-specific components
      DetailedReport.tsx

  lib/
    supabase.ts              # Supabase client and helpers
    openai.ts                # OpenAI client and prompt templates
    types.ts                 # Shared TypeScript types
    utils.ts                 # Utility functions
```

### TypeScript Types
Define shared types in `lib/types.ts`:
```typescript
export interface Consultation {
  id: string;
  input_data: {
    photo_url: string;
    user_info?: Record<string, any>;
  };
  free_result: {
    hair_color?: string;
    face_shape?: string;
    style_keywords?: string[];
    basic_recommendations?: string;
  };
  created_at: string;
}

export interface PaidReport {
  id: string;
  consultation_id: string;
  email: string;
  paid_result: {
    detailed_analysis?: string;
    product_recommendations?: Array<{
      name: string;
      category: string;
      reason: string;
    }>;
    styling_tips?: string[];
    k_beauty_trends?: string[];
  };
  created_at: string;
}
```

### Working with Fonts
The project uses `next/font/google` with Geist fonts pre-configured:
- Fonts are optimized and loaded automatically
- Access via CSS variables: `var(--font-geist-sans)`, `var(--font-geist-mono)`
- Variables are defined in `layout.tsx` and used in Tailwind config

### Image Optimization
Use Next.js `<Image>` component from `next/image`:
- Automatic optimization and lazy loading
- Place static images in `public/` directory
- Reference with `/filename.ext` (e.g., `src="/next.svg"`)
