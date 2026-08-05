# Final Touch

A Next.js storefront for Final Touch professional paint systems, with catalogue, shade tools, cart, checkout, and protected product administration.

## Run locally

1. Copy `.env.example` to `.env.local` and provide a PostgreSQL `DATABASE_URL`.
2. Install dependencies: `npm install`
3. Start the app: `npm run dev`

The catalogue seeds itself when it first connects to an empty database.

## Deploy to Vercel

Set these environment variables in the Vercel project before deploying:

- `DATABASE_URL` (required; a PostgreSQL connection string with SSL enabled)
- `ADMIN_USER`
- `ADMIN_PASSWORD`
- `ADMIN_SECRET`

Then deploy with:

```bash
npx vercel --prod
```

The Vercel deployment must be connected to a reachable PostgreSQL database. Do not commit `.env.local` or production credentials.
