# Aetheria — Premium Digital Experience Platform

A premium digital product built with Next.js 15, TypeScript, Tailwind CSS 4, React Three Fiber, Framer Motion, and Supabase.

## Features

- **Cinematic 3D Hero** - Immersive opening experience with React Three Fiber
- **Glassmorphism UI** - Premium dark theme with subtle gradients and depth
- **Full CMS** - Edit all content from admin dashboard
- **AI Assistant** - Visitor chat and admin content generation
- **Admin Dashboard** - Complete management interface
- **Media Library** - Upload and manage assets
- **Forms & Lead Capture** - Integrated with Supabase
- **SEO System** - Dynamic metadata from admin
- **Analytics Dashboard** - Site performance overview
- **Pricing Management** - Edit plans and features
- **Role-based Access** - Super admin, admin, editor, viewer
- **Legal Pages** - Editable privacy, terms, cookies
- **Responsive Design** - Mobile-optimized experience
- **Dark/Light Theme** - User preference aware

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui, Framer Motion
- **3D**: React Three Fiber, @react-three/drei
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: OpenAI GPT-4o (optional, with fallback)
- **State**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React

## Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd aetheria-web
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# OpenAI / AI Provider
OPENAI_API_KEY=sk-your-openai-key-here
OPENAI_MODEL=gpt-4o

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Enable the following extensions in your database:
   - `uuid-ossp`
3. Run the schema SQL from `supabase/schema.sql` in the Supabase SQL Editor
4. (Optional) Run the seed script: `npm run seed`

### 4. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

### 5. Production Build

```bash
npm run build
npm start
```

### 6. Deployment

#### Vercel

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add the same environment variables
4. Deploy!

The site will automatically build and deploy on push.

## Admin Access

First user created via Supabase Auth gets `super_admin` role by default.

## File Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard routes
│   ├── api/               # Server routes (AI chat, admin assistant)
│   └── public/            # Public site routes
├── components/            # Reusable UI components
├── actions/               # Server actions (CMS, auth, forms, AI, etc.)
├── lib/                   # Supabase client, utilities
├── types/                 # TypeScript types
├── hooks/                 # Custom React hooks
└── supabase/              # Database schema
```

## Customization

### Theme Colors

Edit site settings in Admin Dashboard → Site Settings → Branding

### Content Management

All text, images, and structure editable via admin dashboard:
- Homepage sections
- Features & Services
- Pricing plans
- FAQ & Testimonials
- Blog & Case studies
- Navigation & Footer
- SEO metadata
- Legal pages
- AI prompts

## AI Features

### Visitor Assistant
- Accessible via chat bubble on all public pages
- Answers questions about services, pricing, process
- Can capture leads
- Falls back to contact message if no OpenAI key

### Admin Assistant
- Located in Admin Dashboard → AI Settings
- Helps generate copy, blog outlines, FAQs, SEO titles
- Uses editable system prompts from database

## Supabase Storage Buckets

Create these buckets in Supabase Storage:
- `media` - General uploads (public)
- `logos` - Brand assets (public)
- `avatars` - User profile images (public)

All buckets should be set to public for easy CDN delivery.

## License

MIT

## Credits

Built with ❤️ using modern web technologies.