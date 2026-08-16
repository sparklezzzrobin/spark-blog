# spark.geo

English | [简体中文](README.md)

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

A static personal blog built with Astro, themed around contour lines: the site-wide background is a contour-line graphic, the footer displays latitude/longitude coordinates, and the favicon is a contour-line mark. The site outputs fully static HTML with no client-side framework or runtime dependencies; interactivity uses native browser capabilities.

**Live site: <https://spark-blog-phi.vercel.app>**

## Highlights

**Design**

- Contour-line visual theme applied consistently to the background, footer coordinates, and favicon
- Light and dark themes with a circular-reveal transition on toggle; code blocks use dual Shiki themes that follow the site palette
- The footer defaults to the coordinates `0.00°, 0.00°` (the equator–prime meridian crossing) and is replaced with the visitor's location once IP geolocation succeeds

**Features**

- Global search: `Cmd/Ctrl + K` opens a native `<dialog>`; the index is generated at build time as a static `/search.json` and lazy-loaded on first open
- Blog system: Content Collections with zod validation, tag filtering, pinned posts, series archives, and KaTeX math rendering
- Table of contents: a sticky sidebar TOC with scroll-spy on desktop article pages; on mobile, a floating button opens a bottom-sheet TOC
- Back-to-top button on article pages
- Project pages: detail pages driven by Markdown bodies, automatically linking related posts by shared tags
- RSS, sitemap, and Open Graph support

**Engineering**

- Fully static builds with no client-side framework: search uses a native `dialog` and theme switching uses View Transitions, keeping client-side JavaScript minimal
- Personal info (name, signature, social links, footer coordinates) is centralized in [`src/config.ts`](src/config.ts)

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
│   ├── components/          # Header, Footer, SearchDialog, ContourBackground, TocDialog, BackToTop, etc.
│   ├── config.ts            # Site profile configuration (name / signature / socials / footer coordinates)
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

- **Personal info**: edit [`src/config.ts`](src/config.ts), which contains the name, signature, social links, and footer coordinates
- **Writing posts**: add `YYYY-MM-DD-slug.md` under `src/content/posts/`; frontmatter is validated by a zod schema, and invalid fields fail the build
- **Site URL**: update `site` in `astro.config.mjs`, which feeds absolute links in RSS / sitemap / Open Graph tags

## Links

- Live site: <https://spark-blog-phi.vercel.app>
- RSS feed: <https://spark-blog-phi.vercel.app/rss.xml>
- GitHub: <https://github.com/sparklezzzrobin>
