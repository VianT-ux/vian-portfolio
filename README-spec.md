# Vian's Growth Portfolio

Growth marketing portfolio site. Single-page scroll with capabilities metrics, case studies, and blog.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Astro 4 (static output, zero client JS) |
| Styling | Tailwind CSS 3 |
| CMS | Tina CMS (basic mode — form editor + live preview) |
| CMS Backend | Tina Cloud (free tier, GitHub OAuth) |
| Hosting | Cloudflare Pages |
| Repo | github.com/VianT-ux/vian-portfolio |
| Live URL | https://viantwoon.com |

## Architecture

```
GitHub repo (main)
    │
    ├── content/          ← JSON/MDX content files (source of truth)
    ├── tina/config.ts    ← CMS schema definition
    └── src/pages/        ← Astro templates that query content at build time

Editing flow:
  Tina Admin (/admin) → saves to GitHub → Cloudflare auto-rebuilds → live in ~1-2 min

Production output:
  Pure static HTML/CSS. Zero React, zero Tina JS shipped to visitors.
```

## Content Editing

### Option A: Tina Admin (no code required)

1. Go to `https://viantwoon.com/admin/index.html`
2. Log in with GitHub (Tina Cloud handles auth)
3. Edit content in the form-based UI
4. Click Save — Tina commits to the repo, Cloudflare rebuilds

### Option B: Edit JSON files directly

1. Edit files in `content/` locally
2. Commit and push to `main`
3. Cloudflare auto-rebuilds

## Content Structure

### Singletons (one file each, cannot create/delete in admin)

| Collection | File | What it controls |
|---|---|---|
| Homepage | `content/homepage/index.json` | Hero headline, subtitle, photo, companies, about text, SEO |
| Capabilities | `content/capabilities/index.json` | Capability tabs (PMM, Growth, Commercial) with metrics |
| Testimonials | `content/testimonials/index.json` | Testimonial quotes (list) |
| Site Settings | `content/settings/index.json` | Logo, footer, social links, resume file, contact email |

### Multi-document collections (create as many as needed)

| Collection | Directory | Format |
|---|---|---|
| Case Studies | `content/case-studies/` | MDX (rich text) |
| Blog Posts | `content/blog/` | MDX (rich text) |

Rich text supports custom components: **Callout**, **CTA Banner**, **Image with Caption**.

### Media

Images are stored in `public/uploads/` (repo-based). Upload via the Tina admin media manager.

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
cd my-personal-site
npm install
```

### Environment variables

Create `.env` in the project root:

```
TINA_CLIENT_ID=<from app.tina.io>
TINA_TOKEN=<from app.tina.io>
```

### Run locally

```bash
npm run dev
```

This starts both Tina's local GraphQL server and Astro dev server. Visit:
- Site: `http://localhost:4321`
- Admin: `http://localhost:4321/admin/index.html`

### Build for production

```bash
npm run build
```

Runs `tinacms build` (generates admin panel + GraphQL client) then `astro build` (generates static HTML).

## Deployment (Cloudflare Pages)

### Build settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `my-personal-site` |

### Environment variables (Cloudflare Pages dashboard)

| Variable | Value |
|---|---|
| `NODE_VERSION` | `18` |
| `TINA_CLIENT_ID` | *(from app.tina.io)* |
| `TINA_TOKEN` | *(from app.tina.io)* |

### Deploy webhook

A Cloudflare Pages deploy hook is connected to Tina Cloud so that admin saves trigger immediate rebuilds. If this needs to be recreated:

1. Cloudflare Pages > Settings > Builds & Deployments > Deploy hooks — create one for `main`
2. Tina Cloud > project settings > Webhooks — paste the URL

## Key Files

```
my-personal-site/
├── content/                          # All CMS-managed content
│   ├── homepage/index.json
│   ├── capabilities/index.json
│   ├── settings/index.json
│   ├── testimonials/index.json
│   ├── case-studies/                 # MDX files (one per case study)
│   └── blog/                         # MDX files (one per post)
├── tina/
│   └── config.ts                     # CMS schema — defines all collections & fields
├── src/
│   ├── pages/
│   │   ├── index.astro               # Homepage (queries Tina content at build time)
│   │   ├── blog/[slug].astro         # Blog post template
│   │   └── case-studies/[slug].astro # Case study template
│   ├── layouts/
│   │   └── Layout.astro              # Base layout with SEO meta tags
│   └── components/
│       ├── RichTextRenderer.astro    # Renders Tina rich-text AST to HTML (no React)
│       └── rich-text/
│           ├── Callout.astro         # Info/warning/tip callout block
│           ├── CTABanner.astro       # Call-to-action banner block
│           └── CaptionedImage.astro  # Image with caption block
├── public/
│   └── uploads/                      # Media files uploaded via Tina admin
├── pencil-new.pen                    # Design file (edit in Pencil only)
└── .env                              # Local credentials (gitignored)
```

## Design File Sync (pencil-new.pen)

The `.pen` design file can be synced with Tina content for text-only changes. This is a manual process via Claude Code:

1. Edit content through Tina admin or JSON files
2. Tell Claude Code to "sync the pen file"
3. Claude reads the JSON content and updates the 19 mapped text nodes in the `.pen` file

This covers: headline, subtitle, company names, about text, tab labels, metric highlights/descriptions, detail text, and CTA text. Structural changes (adding/removing items) are not synced — update the `.pen` file manually for those.

## Tina Cloud Admin

- Dashboard: https://app.tina.io
- Project: `vian-portfolio`
- Auth: GitHub OAuth
- The `main` branch must be indexed (green checkmark) for builds to succeed
