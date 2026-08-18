# ek_assignment

Interactive companion site for a product assignment (EarnKaro). Static Vite + React app, no backend, no database, no auth, no user data collected.

**Independent candidate assignment. Not affiliated with EarnKaro. Brand names and screenshots are illustrative; the Instagram surface is simulated.**

## What's in here

| Route (in-app view) | What it is |
| --- | --- |
| Home | Landing page, entry into everything below |
| Approach | How the two answers were put together |
| Q1 | Creator segmentation and personalisation prototype (msite shell, onboarding, feed, event inspector) |
| Q2 | Instagram creator suite flow |
| Calculator | Earnings calculator |
| Journey | Walkthrough of the build |

The written answers ship as PDFs in `public/answers/` and are linked from the footer.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the build on :4173
```

## Deploy

Vercel auto-detects Vite. `vercel.json` pins the build (`vite build` -> `dist`) and sets security headers: strict CSP, `X-Frame-Options: DENY`, `frame-ancestors 'none'`, nosniff, Referrer-Policy, Permissions-Policy, HSTS, and `X-Robots-Tag: noindex`. `public/robots.txt` and a `<meta name="robots">` tag keep it out of search engines.

See `DEPLOY.md` for the full deploy and post-deploy checklist.

## Stack

React 18, TypeScript, Vite 5. No UI framework, no state library. Images for Q1 deals are generated at runtime via `image.pollinations.ai` (allow-listed in the CSP).

## Notes

`npm audit` flags esbuild/vite. Those are dev-server-only advisories and do not affect the deployed static output. Do not run `npm audit fix --force`.
