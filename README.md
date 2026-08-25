# Toronto Performance Coaching Platform — Production Foundation

A multilingual, SEO-first and AI-first coaching platform built for Toronto/GTA in-person personal training and worldwide online coaching, with a clean path to a multi-trainer business and future iOS/Android apps.

## Included

### Public website
- Toronto/GTA in-person services plus worldwide online workout/nutrition coaching and programming
- Next.js App Router + TypeScript
- English, Persian/Farsi, French and Spanish routes
- Local Toronto/GTA service architecture
- Per-language canonical + hreflang metadata
- Dynamic multilingual SEO entries editable from Admin
- Organization, Person, LocalBusiness, WebSite and Service structured data
- Dynamic sitemap including services created in Admin
- `robots.txt` that keeps private dashboards/admin/API out of search while allowing public search/AI crawlers
- `llms.txt` with concise machine-readable business context
- AI concierge foundation designed to answer from real site/business context in four languages
- Responsive, server-first pages and optimized Next.js images

### Client portal
- Supabase Google OAuth + email magic-link login
- Client profile and onboarding fields
- Appointment requests
- Training plans
- Nutrition guidance
- Progress logging with a personal visual progress chart inside every client dashboard
- Mobile-ready authenticated `/api/v1/...` endpoints

### Admin portal
Open `/{language}/admin` after assigning your account the `admin` role.

Admin can manage:
- Multilingual page content
- Services
- Pricing/packages and Stripe Price IDs
- Trainers
- Users and roles
- Consultation leads
- Appointment status and trainer assignment
- Training and nutrition plans
- Testimonials
- SEO titles/descriptions for each language/path
- Contact/business/service-area/payment settings

### Payments
- Stripe Checkout route uses package records from Supabase
- Stripe webhook records completed checkout payments
- Supports one-time and subscription package types
- e-transfer / in-person can remain available as operational options in site settings

### Security/data
- Row Level Security for client, trainer and admin roles
- Server-side role checks for the Admin portal
- Private dashboard/admin routes are noindexed and blocked from robots
- Stripe webhook signature verification
- Service-role key is only used in server-only routes
- Basic security response headers

## 1. Create Supabase

Create a Supabase project and run:

`sql/supabase-schema.sql`

Then create your own account through the website and run this once in Supabase SQL Editor:

```sql
update public.profiles
set role = 'admin'
where email = 'YOUR_REAL_EMAIL@example.com';
```

Do not make normal customers admins.

## 2. Enable authentication

In Supabase Authentication:
- Enable Email
- Enable Google if desired
- Add your production domain and Vercel preview URLs to allowed redirect URLs
- Callback path used by the app: `/auth/callback`

## 3. Environment variables

Add these in Vercel Project Settings → Environment Variables:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_BRAND_NAME=Your Brand Name
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
```

Keep `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET` server-only. Never prefix them with `NEXT_PUBLIC_`.

## 4. Stripe

Create products/prices in Stripe. In Admin → Pricing, add each package and paste its Stripe Price ID (`price_...`).

Create a Stripe webhook pointing to:

`https://YOUR-DOMAIN.com/api/stripe/webhook`

Listen for at least:
- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## 5. Vercel deploy

Push the project contents to GitHub, import the repository in Vercel, add environment variables, then deploy.

After the first successful production deploy:
1. Set `NEXT_PUBLIC_SITE_URL` to the final canonical domain.
2. Redeploy.
3. Add the domain property in Google Search Console.
4. Submit `/sitemap.xml` once.
5. Use URL Inspection for important pages after major content changes.

## Admin URLs

Examples:
- `/en/admin`
- `/en/admin/content`
- `/en/admin/services`
- `/en/admin/pricing`
- `/en/admin/trainers`
- `/en/admin/clients`
- `/en/admin/leads`
- `/en/admin/bookings`
- `/en/admin/plans`
- `/en/admin/testimonials`
- `/en/admin/seo`
- `/en/admin/settings`

## Future mobile app

Business data is separated from presentation in Supabase, and authenticated versioned API routes begin under `/api/v1`. A future native app can use the same Supabase Auth/database model and Stripe backend rather than rebuilding the business logic from scratch.

## Important launch notes

- Fitness/nutrition copy should stay within the actual scope of service and credentials.
- Nutrition coaching copy intentionally avoids medical claims.
- Do not publish testimonials without permission.
- Set exact prices, travel radius, cancellation policy, contact information and legal/privacy documents before taking payments.
- When hiring trainers, verify credentials/insurance and configure their role/account before assigning clients.
