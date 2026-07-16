# Imam Hosen Emon — Portfolio

A single-page, terminal-themed developer portfolio. Built with **HTML + Tailwind CSS + vanilla JavaScript** — no build step, so it hosts straight on GitHub Pages.

Features a **Matrix-rain** background you can start/stop (nav button) and a **dark / light theme** toggle — both remember your choice via `localStorage`.

## Project structure

Each section lives in its **own `.html` file**. `index.html` is a small shell that loads them at runtime:

```
imam-portfolio/
├── index.html              # shell: <head> + section placeholders + loader
├── css/
│   └── styles.css          # all custom CSS (theme variables, animations)
├── js/
│   ├── include.js          # loader: fetches each section file into the page
│   └── app.js              # all behavior (matrix, typewriter, theme, observers)
├── sections/               # one .html file per section — edit these to change content
│   ├── nav.html
│   ├── hero.html
│   ├── about.html
│   ├── stack.html
│   ├── experience.html
│   ├── projects.html
│   ├── education.html
│   ├── contact.html
│   └── footer.html
├── resume/
│   └── Imam-Hosen-Resume.pdf   # the CV shown by the "view resume" links
└── .nojekyll               # serve files as-is on GitHub Pages
```

**How the split works:** `index.html` contains a placeholder for each section, e.g.
`<div data-include="sections/contact.html"></div>`. On load, [`js/include.js`](js/include.js)
`fetch()`es every section file and drops its markup into place, then loads `js/app.js`
for the interactive behavior. All Tailwind classes apply normally.

> ⚠️ **Because it uses `fetch()`, the site must be served over `http://`** (Live Server or
> GitHub Pages). Opening `index.html` by double-clicking it (`file://`) will show
> "Could not load sections/…" — that's a browser security rule, not a bug. See
> [Local preview](#local-preview) below.

To edit a section's text or layout, just open its file in `sections/` — it's plain HTML.

## 1. Update your resume

Replace the file at:

```
resume/Imam-Hosen-Resume.pdf
```

The resume links **open the PDF in a new browser tab** (preview), not download it. If you
rename the file, update the `href="resume/Imam-Hosen-Resume.pdf"` links in
`sections/nav.html`, `sections/hero.html`, and `sections/contact.html`.

## 2. Push changes to GitHub

The repo is already set up (remote: `Imam-XpeedStudio/protfolio`). To publish edits:

```bash
cd imam-portfolio
git add -A
git commit -m "Describe your change"
git push
```

## 3. GitHub Pages

1. Open the repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. Wait ~1 minute. The live site (served over `https://`, so the section includes work)
   goes live at your Pages URL.

## Customizing

- **Section text / layout** — edit the matching file in `sections/` (e.g. `sections/experience.html` for the work history).
- **Accent color / theme** — `index.html` holds the `tailwind.config` colors; the actual color values live as CSS variables in `css/styles.css` (`--c-green`, `--c-bg`, …). Change them in one place and both light + dark update.
- **Typewriter lines** — the hero/contact rotating text is a `data-words="a|b|c"` attribute in `sections/hero.html` and `sections/contact.html`.
- **Matrix rain default** — in `js/app.js`, it starts ON; change `start(false)` to `stop(false)` on the last line of the matrix block to start OFF.
- **Default theme** — the "Set theme before first paint" script in `index.html`'s `<head>`; follows the visitor's OS setting unless they pick one.
- **Tech icons** — use [Devicon](https://devicon.dev/) class names, e.g. `devicon-laravel-plain colored`.

## Local preview

The site **must be served over `http://`** — double-clicking `index.html` will not work
(the section files won't load).

**VS Code Live Server (recommended)**
1. Install the **Live Server** extension (by Ritwick Dey).
2. Right-click `index.html` → **Open with Live Server**. Auto-reloads on save.

---

© Imam Hosen Emon · Software Engineer · Backend · APIs · SaaS & ERP
