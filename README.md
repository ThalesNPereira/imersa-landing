## imersa Landing

Marketing site for `imersa`, built with Next.js and prepared for Cloudflare Workers via OpenNext.

## Local development

Install dependencies and start the app:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` and set the public values used by the landing page:

```bash
NEXT_PUBLIC_SITE_URL=https://imersa.io
NEXT_PUBLIC_CAL_LINK=
NEXT_PUBLIC_POSTHOG_TOKEN=
NEXT_PUBLIC_POSTHOG_HOST=
```

## Cloudflare deployment

This repository is configured for Cloudflare Workers with:

- `wrangler.jsonc` for the Worker runtime, R2 incremental cache, and custom domains
- `open-next.config.ts` for the OpenNext Cloudflare adapter
- `public/_headers` for static asset caching
- `npm run preview` for local Workers preview
- `npm run deploy` for production deployment

Use these commands:

```bash
npm run lint
npm run build
npm run preview
npm run deploy
```

## Production checklist

Before the final deploy, confirm:

- the Cloudflare zone for `imersa.io` is active
- the registrar nameservers point to Cloudflare
- `NEXT_PUBLIC_SITE_URL` is set to `https://imersa.io`
- the Cal.com booking link and PostHog variables are set in Cloudflare
- `npm run deploy` finishes without route or domain errors

## SEO surfaces included

The app now ships with:

- canonical metadata for `https://imersa.io`
- Open Graph and Twitter cards
- `robots.txt`
- `sitemap.xml`
- `manifest.webmanifest`
- JSON-LD for `Organization`, `WebSite`, `Service`, and `FAQPage`
