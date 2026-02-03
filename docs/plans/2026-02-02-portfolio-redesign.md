# Minimalist Monochrome Portfolio Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the homepage into a black-and-white, minimalist layout with an “infinite A4” content column, a left-side TOC, and a right-side reading progress indicator.

**Architecture:** Keep a single-page layout in `app/page.tsx`, backed by a structured sections array. Use small client components for TOC and reading progress. Global typography and layout tokens live in `app/globals.css`, with fonts configured via `app/layout.tsx` using `next/font/google`.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS, next/font.

---

### Task 1: Add a minimal test harness for page rendering

**Files:**
- Create: `jest.config.mjs`
- Create: `jest.setup.ts`
- Create: `tests/home.test.tsx`
- Modify: `package.json`

**Step 1: Write the failing test**

```tsx
// tests/home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

test("renders the main headline and TOC", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getByRole("navigation", { name: /table of contents/i })).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/home.test.tsx`
Expected: FAIL with missing jest config / test runner not found

**Step 3: Write minimal implementation**

```js
// jest.config.mjs
export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};
```

```ts
// jest.setup.ts
import "@testing-library/jest-dom";
```

```json
// package.json (scripts)
"test": "jest"
```

Install deps:
```
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/home.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add jest.config.mjs jest.setup.ts tests/home.test.tsx package.json package-lock.json
git commit -m "test: add basic homepage render test"
```

---

### Task 2: Update typography and base tokens (monochrome, no dark mode)

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Step 1: Write the failing test**

```tsx
// tests/home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

test("uses the document font variables on body", () => {
  render(<Home />);
  const body = document.body;
  expect(body.className).toMatch(/font/);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/home.test.tsx`
Expected: FAIL because body class not updated

**Step 3: Write minimal implementation**

```tsx
// app/layout.tsx
import { Newsreader, IBM_Plex_Sans } from "next/font/google";

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

<body className={`${serif.variable} ${sans.variable} antialiased`}>
```

```css
/* app/globals.css */
:root {
  --paper: #ffffff;
  --ink: #111111;
  --mute: #d9d9d9;
  --hairline: #e6e6e6;
}

body {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-serif), Georgia, "Times New Roman", serif;
}

h1, h2, h3 {
  font-family: var(--font-sans), "Helvetica Neue", Arial, sans-serif;
  letter-spacing: -0.01em;
}
```

Remove any dark-mode media blocks from `app/globals.css`.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/home.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "style: add monochrome tokens and typography"
```

---

### Task 3: Add a scroll progress indicator component

**Files:**
- Create: `app/components/ReadingProgress.tsx`
- Modify: `app/page.tsx`

**Step 1: Write the failing test**

```tsx
// tests/home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

test("renders a reading progress meter", () => {
  render(<Home />);
  expect(screen.getByLabelText(/reading progress/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/home.test.tsx`
Expected: FAIL because progress element not found

**Step 3: Write minimal implementation**

```tsx
// app/components/ReadingProgress.tsx
"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, value)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="progress-rail" aria-label="Reading progress">
      <div className="progress-fill" style={{ height: `${progress * 100}%` }} />
    </div>
  );
}
```

Add basic styles in `app/globals.css`:

```css
.progress-rail {
  width: 2px;
  height: 60vh;
  background: var(--hairline);
  position: sticky;
  top: 20vh;
}

.progress-fill {
  width: 100%;
  background: var(--ink);
  transition: height 120ms linear;
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/home.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add app/components/ReadingProgress.tsx app/page.tsx app/globals.css
git commit -m "feat: add reading progress indicator"
```

---

### Task 4: Add a left-hand TOC component

**Files:**
- Create: `app/components/TableOfContents.tsx`
- Modify: `app/page.tsx`

**Step 1: Write the failing test**

```tsx
// tests/home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

test("renders a TOC navigation region", () => {
  render(<Home />);
  expect(screen.getByRole("navigation", { name: /table of contents/i })).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/home.test.tsx`
Expected: FAIL because TOC not present

**Step 3: Write minimal implementation**

```tsx
// app/components/TableOfContents.tsx
import Link from "next/link";

type TocItem = { id: string; label: string };

export default function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="Table of contents" className="toc">
      <div className="toc-title">Contents</div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`#${item.id}`}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

Add styles in `app/globals.css`:

```css
.toc {
  position: sticky;
  top: 6vh;
  font-family: var(--font-sans), "Helvetica Neue", Arial, sans-serif;
  font-size: 0.9rem;
  line-height: 1.4;
}

.toc-title {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  margin-bottom: 0.75rem;
}

.toc a {
  color: inherit;
  text-decoration: none;
}

.toc a:hover {
  text-decoration: underline;
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/home.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add app/components/TableOfContents.tsx app/page.tsx app/globals.css
git commit -m "feat: add table of contents"
```

---

### Task 5: Build the “infinite A4” layout and content structure

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Step 1: Write the failing test**

```tsx
// tests/home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

test("renders multiple content sections with ids", () => {
  render(<Home />);
  const sections = screen.getAllByRole("region");
  expect(sections.length).toBeGreaterThan(2);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/home.test.tsx`
Expected: FAIL because sections not yet present

**Step 3: Write minimal implementation**

```tsx
// app/page.tsx (sketch)
const sections = [
  { id: "intro", title: "Introduction", body: "..." },
  { id: "work", title: "Selected Work", body: "..." },
  { id: "notes", title: "Notes", body: "..." },
  { id: "contact", title: "Contact", body: "..." },
];
```

Layout structure:
- Outer grid: `grid-cols-[minmax(0,1fr)_minmax(0,720px)_minmax(0,1fr)]`
- Left column: TOC
- Center: paper column with `border-left/right: 1px solid var(--hairline)` and generous padding
- Right: progress rail

Add “A4” cues in `app/globals.css`:

```css
.paper {
  border-left: 1px solid var(--hairline);
  border-right: 1px solid var(--hairline);
  padding: 4rem 3.5rem;
  background: var(--paper);
}

.paper-section {
  padding: 3.5rem 0;
  border-bottom: 1px dashed var(--hairline);
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/home.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add app/page.tsx app/globals.css
git commit -m "feat: build infinite A4 layout with sections"
```

---

### Task 6: QA + polish (no animations, strict monochrome)

**Files:**
- Modify: `app/globals.css`
- Modify: `app/page.tsx`

**Step 1: Write the failing test**

```tsx
// tests/home.test.tsx
import { render } from "@testing-library/react";
import Home from "../app/page";

test("does not include dark mode styles", () => {
  render(<Home />);
  expect(document.styleSheets.length).toBeGreaterThan(0);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/home.test.tsx`
Expected: FAIL if dark mode media blocks exist

**Step 3: Write minimal implementation**

- Remove any dark-mode media queries.
- Ensure all colors are limited to white, near-black, and light gray.
- Keep transitions minimal (only progress height).

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/home.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add app/globals.css app/page.tsx
git commit -m "style: enforce monochrome minimalism"
```

---

### Task 7: Verification

**Files:**
- No changes

**Step 1: Run lint**

Run: `npm run lint`
Expected: PASS

**Step 2: Run tests**

Run: `npm test`
Expected: PASS

**Step 3: Commit (if any small fixes)**

```bash
git add -A
git commit -m "chore: fix lint/test issues"
```

