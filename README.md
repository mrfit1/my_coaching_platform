# Toronto Performance Coaching — launch-ready foundation

A fast multilingual Next.js foundation for a Toronto personal-training business that can expand into a multi-trainer platform and mobile app.

## Included
- English, Persian/Farsi, French and Spanish public pages
- Local Toronto service positioning: in-home, private, online, programming, nutrition coaching, beginner/active-aging
- SEO: localized metadata, canonical + hreflang, sitemap, robots, Open Graph, large image previews
- Structured data: Organization, Person, LocalBusiness/SportsActivityLocation, WebSite, Service list
- `llms.txt` and crawlable semantic public pages for AI/search discovery
- Simple Google/email authentication UI using Supabase Auth
- Client dashboard foundation
- Appointment-request API + Supabase schema
- Stripe checkout API foundation for one-time or monthly payments
- Multi-trainer-ready database roles (`client`, `trainer`, `admin`)
- Mobile-friendly blue/white design and optimized Next.js images

## Before first production launch
1. Rename the temporary brand by setting `NEXT_PUBLIC_BRAND_NAME` in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to the real domain. This automatically updates canonical URLs, sitemap and structured data.
3. Create a Supabase project and run `sql/supabase-schema.sql`.
4. Add Supabase URL/keys to Vercel. In Supabase Auth enable Email and Google providers and add the production callback URL.
5. Create Stripe products/prices, then add `STRIPE_SECRET_KEY`, `STRIPE_PRICE_SINGLE`, and `STRIPE_PRICE_MONTHLY`.
6. Set the final public contact email/phone when ready.
7. Replace temporary/custom pricing copy once service packages are finalized.
8. Add a precise business/service address only if you want it public. The current structured data intentionally says Toronto, Ontario without publishing a street address.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Architecture note
The web app uses Supabase as the shared authentication/database layer so a future iOS/Android app can use the same user accounts, appointments, plans and progress data rather than rebuilding the backend.

## SEO / AI visibility note
No code can guarantee ranking or inclusion in AI answers. This project provides the technical foundation: multilingual pages, local service entities, consistent structured data, crawlable content, good information architecture, and clean machine-readable context. Authority still depends on real business information, reviews/citations, local profiles, useful content and time.
