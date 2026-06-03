# Subdomain Operations: copa.blasi.io

## Scope
- Hosted strictly under `copa.blasi.io`.
- All paths are relative to root (`/`, `/calendario`, `/brasil`, `/radar`).

## Deployment
- Deployment is configured to build static pages via `npm run build`.
- Environment vars required for CI strictly separated from client runtime.

## SEO & Metadata
- Base canonical URL forced to `https://copa.blasi.io`.
- `robots.txt` points to `https://copa.blasi.io/sitemap-index.xml`.
