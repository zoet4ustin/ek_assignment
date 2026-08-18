# Deploy — EarnKaro PM Assignment (Agniv)

A static Vite + React site. No backend, no database, no auth, no user data collected.

## Done tonight (launch-ready)
- **`vercel.json`** — security headers on every route: a strict **Content-Security-Policy**
  (scripts/styles/media self-only; images self + `image.pollinations.ai`), `X-Frame-Options: DENY`
  + CSP `frame-ancestors 'none'` (no clickjacking/embedding), `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, `Permissions-Policy` (camera/mic/geo/payment all off), HSTS, and `X-Robots-Tag: noindex`.
- **`public/robots.txt`** + `<meta name="robots" content="noindex, nofollow">` — kept out of search engines.
- **Footer disclaimer** — explicit "independent candidate assignment, not affiliated with EarnKaro;
  brand names/screenshots are illustrative; Instagram is simulated."
- **GitHub link** in the footer → https://github.com/zoet4ustin
- **No secrets** in the repo or bundle; `.gitignore` covers `node_modules`, `dist`, `.vercel`, `.DS_Store`.

## Deploy in the morning

### Option A — via GitHub (recommended, gives auto-deploys)
1. `cd earnkaro-app && git init && git add . && git commit -m "EarnKaro PM assignment"`
2. Create a repo under github.com/zoet4ustin and push.
3. On vercel.com → **Add New → Project → Import** that repo. Vercel auto-detects Vite.
   (Build `vite build`, output `dist` — already in `vercel.json`.)
4. Deploy. Pick a domain (see below).

### Option B — Vercel CLI (fastest)
1. `cd earnkaro-app`
2. `npx vercel` (preview) → then `npx vercel --prod` (production)

## Domain
- Use the free `*.vercel.app` subdomain, or add a custom domain in **Project → Settings → Domains**
  (Vercel issues HTTPS automatically).
- Tip: a non-obvious project/subdomain name keeps the link effectively unlisted.

## Panel-only access (optional)
If you want only the hiring panel to open it: **Project → Settings → Deployment Protection →
Password Protection** (or Vercel Authentication). The link then needs the shared password.

## Post-deploy 60-second check
- Open the site → **Q1 deal images load** (confirms the CSP allows `image.pollinations.ai`).
- The four PDF links in the footer download.
- Browser **Back** moves between pages; opening any prototype starts at the top.
- (Optional) Check headers: `curl -sI https://YOUR_URL | grep -i "content-security\|x-frame\|robots"`.

## Known, intentionally-not-fixed
- `npm audit` flags **esbuild/vite** (moderate/high). These are **dev-server-only** advisories — they
  do not affect the deployed static output. The fix is a breaking Vite 8 upgrade; not worth it for
  this assignment. Do **not** run `npm audit fix --force`.
