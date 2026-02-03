# Dianli Yang — Portfolio

A minimalist, monochrome portfolio site with an A4‑width reading column, left TOC, and right‑side progress indicator. Built with Next.js (App Router) and Tailwind CSS.

## Highlights

- A4‑width content column (210mm) for “infinite paper” reading
- Monochrome palette, no dark mode
- Reading progress indicator that replaces the native scrollbar
- Accessible navigation (skip link, semantic sections, ARIA progressbar)

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
- Jest + Testing Library

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

### 3) Run tests

```bash
npm test
```

### 4) Build for production

```bash
npm run build
```

### 5) Start production server

```bash
npm run start
```

## Project Structure

```
app/
  components/
    ReadingProgress.tsx
    TableOfContents.tsx
  globals.css
  layout.tsx
  page.tsx

tests/
  home.test.tsx
```

## Design & UX Notes

- **A4 width**: The content column uses a 210mm max width via the `.a4-width` class.
- **No scrollbar**: Native scrollbars are hidden on both `html` and `body` (`.no-scrollbar`).
- **Progress indicator**: Right‑side vertical bar shows scroll progress using `role="progressbar"`.
- **TOC**: Left side table of contents links to page sections.
- **Typography**: Newsreader (serif) for body, IBM Plex Sans (sans) for headings.

## Accessibility

- Skip link to main content
- Semantic sections with `aria-labelledby`
- Progress bar exposes `aria-valuemin`, `aria-valuemax`, `aria-valuenow`

## Deployment (Vercel)

This repo is linked to a Vercel project. For production:

```bash
vercel --prod
```

If the Vercel CLI isn’t installed:

```bash
npm i -g vercel
```

Or deploy via the Vercel dashboard.

## Troubleshooting

### Build error: Tailwind PostCSS plugin

If you see the error about using `tailwindcss` directly as a PostCSS plugin, ensure:

- `@tailwindcss/postcss` is installed
- `postcss.config.mjs` uses it

Example:

```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### Dev server shows old styles

Clear Next.js cache and restart:

```bash
rm -rf .next
npm run dev
```

## License

All rights reserved.
