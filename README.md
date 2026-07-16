# Imam Hosen Emon — Portfolio

A single-page, terminal-themed developer portfolio. Built with **HTML + Tailwind CSS + vanilla JavaScript** — no build step, so it hosts straight on GitHub Pages.

Features a **Matrix-rain** background you can start/stop (nav button) and a **dark / light theme** toggle — both remember your choice via `localStorage`.

## Project structure

Each section lives in its **own file**. `index.html` is a small shell that loads them:

```
imam-portfolio/
├── index.html              # shell: <head> + mount points + <script> tags
├── css/
│   └── styles.css          # all custom CSS (theme variables, animations)
├── js/
│   └── app.js              # all behavior (matrix, typewriter, theme, observers)
├── sections/               # one file per section — edit these to change content
│   ├── nav.js
│   ├── hero.js
│   ├── about.js
│   ├── stack.js
│   ├── experience.js
│   ├── projects.js
│   ├── education.js
│   ├── contact.js
│   └── footer.js
├── resume.pdf              # ← YOU ADD THIS (your CV)
└── .nojekyll               # serve files as-is on GitHub Pages
```

**How the split works:** each `sections/*.js` file injects its own HTML into a `<div id="mount-…">` placeholder in `index.html`. This is done with plain `<script>` tags (not `fetch`), so it works **both** by double-clicking `index.html` locally **and** when hosted — with zero build step. All Tailwind classes still apply normally.

> To edit a section's text or layout, open its file in `sections/` — the HTML lives inside a template literal (the `` `...` `` block).

## 1. Add your resume

Drop your CV into this folder and name it exactly:

```
resume.pdf
```

(If you keep a different name, update the three `href="resume.pdf"` links in `index.html`.)

## 2. Push to GitHub

```bash
cd imam-portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/imam-xs/<your-repo-name>.git
git push -u origin main
```

## 3. Turn on GitHub Pages

1. Open your repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. Wait ~1 minute. Your site goes live at:
   `https://imam-xs.github.io/<your-repo-name>/`

### Want it at `imam-xs.github.io` (no sub-path)?
Name the repository exactly **`imam-xs.github.io`** and push — GitHub serves it at the root domain.

## Customizing

- **Section text / layout** — edit the matching file in `sections/` (e.g. `sections/experience.js` for the work history).
- **Accent color / theme** — `index.html` holds the `tailwind.config` colors; the actual color values live as CSS variables in `css/styles.css` (`--c-green`, `--c-bg`, …). Change them in one place and both light + dark update.
- **Typewriter lines** — the hero/contact rotating text is a `data-words="a|b|c"` attribute in `sections/hero.js` and `sections/contact.js`.
- **Matrix rain default** — in `js/app.js`, it starts ON; change `start(false)` to `stop(false)` on the last line of the matrix block to start OFF.
- **Default theme** — the "Set theme before first paint" script in `index.html`'s `<head>`; follows the visitor's OS setting unless they pick one.
- **Tech icons** — use [Devicon](https://devicon.dev/) class names, e.g. `devicon-laravel-plain colored`.

## Local preview

Just double-click `index.html`, or run a tiny server:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

---

© Imam Hosen · Software Engineer (PHP / Laravel)
"# protfolio" 
