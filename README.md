# ankithans.com — personal site

Refined-minimal personal site with an "agent-built" signature: a terminal boot
sequence on first visit, a ⌘K command palette for navigation, and case studies
for work that's mostly private/proprietary (presented abstractly).

## Stack

- **TanStack Start** (React 19) + Vite 8
- **Tailwind CSS v4** (CSS-first `@theme` tokens in `src/styles/app.css`)
- **Motion** (`motion/react`) for animation
- **MDX** for case studies and blog posts (`@mdx-js/rollup` + remark/rehype, Shiki for code)
- **Geist Sans + Geist Mono** (variable fonts)

## Develop

```bash
bun install
bun run dev        # http://localhost:3000
bun run build      # production build + typecheck
bun run deploy     # build + deploy to Cloudflare Workers
```

## Structure

```
src/
  routes/            file-based routes (__root, index, work/, writing/)
  components/        header, footer, command-palette, agent-hero, cards, mdx, theme, reveal
  content/
    work/*.mdx       case studies (frontmatter + body)
    writing/*.mdx    blog posts
  lib/
    site.ts          name, socials, nav  ← edit your details here
    content.ts       MDX glob loaders + types
  styles/app.css     design tokens + base + prose styles
public/media/        cover art + figures (swappable)
public/media/blog/   recovered GSoC/Charmil images
```

## Editing content

- **Add a case study**: drop an `.mdx` file in `src/content/work/` with frontmatter
  (`title, slug, org, role, period, status, summary, stack[], metrics[], order, cover`).
  Body components available: `<Figure>`, `<Metrics>`, `<Spec>`, `<Callout>`.
- **Add a post**: drop an `.mdx` file in `src/content/writing/` (`title, slug, date, summary, tags[]`).
- **Your details**: edit `src/lib/site.ts`.

## Visuals

Case-study covers use **theme-adaptive SVGs** in `public/media/*.svg` (they work in
both light and dark mode). Codex-generated raster alternates live alongside them as
`*-sample.png` — swap any cover by changing the `cover:` field in the MDX frontmatter
(e.g. `cover: /media/starship-sample.png`).

All Tessell visuals are **abstracted/representative** — no real internal UI or
customer data.

## Confidentiality

Starship and Spectra are unreleased Tessell products. Their pages are written as
abstracted case studies with redrawn diagrams and representative visuals only.

## Deploy

Targets Cloudflare Workers with the official TanStack Start Cloudflare adapter.

- `wrangler.jsonc` defines the Worker and custom domains for `ankithans.com` and
  `www.ankithans.com`.
- `.github/workflows/deploy.yml` deploys on pushes to `main`.
- Required GitHub repository secrets:
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_API_TOKEN`
