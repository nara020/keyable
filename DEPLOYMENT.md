# Keyable Korea Deployment Guide

## Prerequisites

1. **Node.js 18+** installed
2. **Supabase account** with project created
3. **Gmail account** with App Password enabled (for notifications)
4. **Vercel account** (recommended for deployment)

---

## 1. Supabase Setup

### 1.1 Create Database Tables

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: `hcxuyuyudtsgooakfknd`
3. Navigate to **SQL Editor**
4. Copy and paste contents of `supabase/migrations/001_initial_schema.sql`
5. Click **Run** to create all tables

### 1.2 Get API Keys

1. Go to **Settings** > **API**
2. Copy these values to `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

---

## 2. Gmail SMTP Setup

### 2.1 Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**

### 2.2 Create App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** and **Windows Computer** (or other)
3. Click **Generate**
4. Copy the 16-character password to `.env.local` as `SMTP_PASS`

---

## 3. Environment Configuration

Update `.env.local` with all required values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://hcxuyuyudtsgooakfknd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email
SMTP_USER=jinhyeokcc@gmail.com
SMTP_PASS=your_16_char_app_password

# Admin
ADMIN_API_KEY=generate_random_string_here
ADMIN_PASSWORD=your_secure_password

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 4. Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 5. Production Build

```bash
# Type check
npm run typecheck

# Build for production
npm run build

# Start production server
npm start
```

---

## 6. Deployment to Vercel

### 6.1 Connect Repository

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository

### 6.2 Configure Environment Variables

In Vercel project settings, add all environment variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `SMTP_USER` | Gmail address |
| `SMTP_PASS` | Gmail app password |
| `ADMIN_API_KEY` | Random secure string |
| `ADMIN_PASSWORD` | Admin login password |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement ID (optional) |

### 6.3 Deploy

1. Click **Deploy**
2. Wait for build to complete
3. Visit your production URL

---

## 7. Post-Deployment Checklist

- [ ] Test homepage loads correctly
- [ ] Test language switching (EN/ID)
- [ ] Submit inquiry form and check email notification
- [ ] Login to admin dashboard (/admin/login)
- [ ] Verify Supabase connection in admin dashboard
- [ ] Check Google Analytics tracking (if configured)
- [ ] Verify robots.txt and sitemap.xml are accessible
- [ ] Test llms.txt for AI crawler optimization

---

## 8. Admin Access

- **URL**: `https://your-domain.com/admin/login`
- **Password**: Value of `ADMIN_PASSWORD` env variable

### Admin Features

- **Dashboard**: Overview of inquiries, notices, FAQ stats
- **Inquiries**: View and manage customer inquiries
- **Notices**: Create and publish announcements
- **FAQ**: Manage frequently asked questions

---

## 9. Security Recommendations

1. **Change default passwords** before production
2. **Use strong ADMIN_API_KEY** (32+ random characters)
3. **Enable HTTPS** (automatic on Vercel)
4. **Review Supabase RLS policies** for your use case
5. **Monitor access logs** regularly

---

## 10. Troubleshooting

### Database Connection Errors

- Verify Supabase URL and keys are correct
- Check if database tables exist
- Verify RLS policies allow required operations

### Email Not Sending

- Confirm Gmail App Password is correct
- Check spam folder
- Verify 2FA is enabled on Gmail

### Admin Login Issues

- Clear browser cookies
- Verify ADMIN_PASSWORD env variable
- Check browser console for errors

---

## Support

- **Email**: jinhyeokcc@gmail.com
- **Phone**: +82-10-2216-0058

---

*Last updated: December 2024*
