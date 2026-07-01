# Shining Star Electro Mechanical Work

Production-ready corporate website for an Ethiopian elevator, escalator, and electromechanical engineering company.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons
- Server Components by default
- `next/image` optimized remote images
- Route metadata, sitemap, robots, and JSON-LD

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3001`.

On Windows PowerShell systems that block `npm.ps1`, use `npm.cmd`:

```bash
npm.cmd install
npm.cmd run dev
```

## Production Build

```bash
npm run typecheck
npm run build
npm run start
```

The scripts use Webpack explicitly because this Windows environment loaded Next's
WASM compiler fallback while Turbopack requires native bindings.

## Deployment

Deploy to Vercel, Netlify, or any Node-compatible Next.js host.

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project in the hosting provider.
3. Set the build command to `npm run build`.
4. Set the install command to `npm install` or `npm ci`.
5. Set the output/framework preset to Next.js.
6. Configure the production domain and update `siteConfig.url` in `lib/site.ts`.

## Lead Forms

Forms currently post to `/api/inquiries` and return a success response. Connect that route to email, CRM, database storage, or a messaging workflow before launch.

## Image Sources

The site uses optimized remote images from Unsplash through `next/image`. If production hosting restricts remote image optimization, keep `images.unsplash.com` allowed in `next.config.ts`.
