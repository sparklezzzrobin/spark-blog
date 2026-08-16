# spark.geo

English | [简体中文](README.md)

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

A contour-line-themed personal blog — the romance of maps, rendered as a website.

The blog belongs to a GIS & remote sensing student learning web development. The whole site speaks a **contour line** design language: a site-wide background of two "mountains" drawn in contour arcs, a footer signed with latitude/longitude coordinates, and a contour-line favicon. Technically it stays minimal: fully static Astro output, no client-side framework, no runtime dependencies — interactions rely on native browser capabilities.

**Live site: <https://spark-blog-phi.vercel.app>**

## Highlights

**Design**

- 🗺️ **Contour design language** — site-wide contour background, coordinate-style footer, and a contour favicon; unmistakably GIS
- 🌗 **Light & dark themes** — circular-reveal transition on toggle; code blocks use dual Shiki themes matching the site palette
- 📍 **Null Island easter egg** — the footer defaults to `0.00°, 0.00°` (the equator–prime-meridian crossing, a classic GIS inside joke), replaced with the visitor's location once IP geolocation succeeds

**Features**

- 🔍 **Global search** — `Cmd/Ctrl + K` opens a native `<dialog>`; the index is generated at build time as a static `/search.json` and lazy-loaded on first open
- 📝 **Blog system** — Content Collections with zod validation, tag filtering, pinned posts, and series; a sticky TOC with scroll-spy on desktop (collapsed at the top on mobile); KaTeX math rendering
- 📦 **Project pages** — detail pages driven by Markdown bodies, auto-linking related posts by shared tags
- 📡 **Standard feeds** — RSS, sitemap, and Open Graph out of the box

**Engineering**

- ⚡ **Zero client-side framework** — fully static builds; search uses a native `dialog`, theme switching uses View Transitions, so interactivity ships almost no JS
- 🎯 **Single source of truth** — name, signature, social links, and footer coordinates all live in [`src/config.ts`](src/config.ts); update your profile by editing one file

## Tech Stack

| Category | Choice |
| :--- | :--- |
| Framework | [Astro 7](https://astro.build) (fully static output) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config) |
| Language | TypeScript (strict) |
| Content | Content Collections + zod schema validation |
| Math | remark-math + rehype-katex |
| Highlighting | Shiki dual themes (github-light / github-dark) |
| Extras | @astrojs/rss, @astrojs/sitemap |
| Hosting | Vercel |

## Getting Started

Requires Node.js **>= 22.12.0**.

```sh
npm install     # Install dependencies
npm run dev     # Dev server at http://localhost:4321
npm run build   # Build the production site to ./dist/
npm run preview # Preview the build locally
```

## Project Structure

```text
spark-blog/
├── public/                  # Static assets (favicon, etc.)
├── src/
│   ├── components/          # Header, Footer, SearchDialog, ContourBackground, etc.
│   ├── config.ts            # Single source of personal info — name / signature / socials
│   ├── content/
│   │   ├── posts/           # Blog posts (Markdown + frontmatter)
│   │   └── projects/        # Projects (Markdown + frontmatter)
│   ├── content.config.ts    # Collection schemas (zod validation)
│   ├── layouts/             # Base layout
│   ├── pages/               # File-based routes, incl. rss.xml / search.json endpoints
│   └── styles/              # Global styles and design tokens
└── astro.config.mjs         # Site URL / KaTeX / Shiki dual themes / sitemap
```

## Customization

- **Personal info**: edit only [`src/config.ts`](src/config.ts) — name, signature, social links, and footer coordinates
- **Writing posts**: add `YYYY-MM-DD-slug.md` under `src/content/posts/`; invalid frontmatter fails the build immediately
- **Site URL**: update `site` in `astro.config.mjs` (it feeds absolute links in RSS / sitemap / OG tags)

## Links

- 🌐 Live site: <https://spark-blog-phi.vercel.app>
- 📡 RSS feed: <https://spark-blog-phi.vercel.app/rss.xml>
- 💻 GitHub: <https://github.com/sparklezzzrobin>
