# Keyable Korea

Korea Inbound Travel & Medical Tourism Website for International Visitors

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Check project status
npm run status
```

## Live URLs

- **Development**: http://localhost:3000 (or 3005 if 3000 is busy)
- **English**: http://localhost:3000/en
- **Indonesian**: http://localhost:3000/id
- **Admin**: http://localhost:3000/admin

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # i18n routes (en, id)
│   │   ├── page.tsx       # Landing page
│   │   ├── services/      # Services pages
│   │   ├── inquiry/       # Inquiry form
│   │   ├── about/         # About page
│   │   ├── faq/           # FAQ with Schema.org
│   │   └── notices/       # Notices/News
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── llms.txt/          # AI crawler info
│   ├── robots.txt/        # Robots configuration
│   └── sitemap.xml/       # SEO sitemap
├── components/
│   ├── ui/                # Reusable UI components
│   ├── forms/             # Form components
│   ├── layout/            # Header, Footer
│   └── seo/               # Schema components
├── lib/
│   ├── i18n/              # Internationalization
│   ├── constants.ts       # Site configuration
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript types
```

## Features

- **Multi-language**: English & Indonesian (Bahasa Indonesia)
- **SEO Optimized**: Schema.org, sitemap.xml, robots.txt
- **LLM Friendly**: llms.txt for ChatGPT/Claude/Perplexity crawlers
- **Responsive**: Mobile-first design with TailwindCSS
- **Modern Stack**: Next.js 16, React 19, TailwindCSS 4, TypeScript

## Pages

| Route | Description |
|-------|-------------|
| `/en`, `/id` | Landing page |
| `/en/services` | Service listings |
| `/en/services/private-tour` | Private tour details |
| `/en/services/medical-tourism` | Medical tourism details |
| `/en/services/guide-service` | Guide service details |
| `/en/services/vehicle-rental` | Vehicle rental details |
| `/en/inquiry` | Contact/inquiry form |
| `/en/inquiry/complete` | Form submission confirmation |
| `/en/about` | About us |
| `/en/faq` | FAQ with Schema.org markup |
| `/en/notices` | News & Updates |
| `/admin` | Admin dashboard |
| `/admin/inquiries` | Manage inquiries |
| `/admin/notices` | Manage notices |
| `/admin/faq` | Manage FAQ |

## Environment Variables

Create `.env.local` with the following:

```env
# Supabase (Optional - for database)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Notifications (Gmail SMTP)
SMTP_USER=jinhyeokcc@gmail.com
SMTP_PASS=your_gmail_app_password

# Admin API Key
ADMIN_API_KEY=generate_a_secure_random_string
```

### Setting up Gmail SMTP

1. Go to Google Account → Security
2. Enable 2-Factor Authentication
3. Create an App Password (Mail > Other)
4. Use that password as `SMTP_PASS`

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Manual

```bash
npm run build
npm run start
```

## Contact Information

- **Email**: jinhyeokcc@gmail.com
- **Phone**: +82-10-2216-0058
- **WhatsApp**: +82-10-2216-0058

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run status   # Show project status
npm run check    # Run all checks
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4
- **Icons**: Lucide React
- **Forms**: Zod validation
- **Database**: Supabase (optional)
- **Email**: Nodemailer

## License

Private - All rights reserved
