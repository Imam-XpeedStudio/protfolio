# Imam Hosen Emon — Portfolio

A single-page, **terminal-themed** developer portfolio — built with **HTML + Tailwind CSS + vanilla JavaScript**, no build step.

Highlights a career in **backend engineering, APIs, SaaS & ERP systems** (PHP / Laravel), with an interactive terminal aesthetic.

## Features

- 🖥️ **Terminal / hacker theme** with a live **Matrix-rain** background (start/stop toggle).
- 🌗 **Dark / light theme** toggle — remembers your choice via `localStorage`.
- ⌨️ **Typewriter** effects in the hero and contact sections.
- ✨ Scroll-reveal animations and a fully **responsive** layout.
- 📄 One-click **resume preview** and clickable contact links.

## Tech stack

`HTML5` · `Tailwind CSS` · `Vanilla JavaScript` · `Devicon` — zero dependencies, zero build.

## Project structure

Each section lives in its **own `.html` file**; `index.html` is a small shell that loads them at runtime.

```
imam-portfolio/
├── index.html              # shell: <head> + section placeholders + loader
├── css/styles.css          # theme variables & animations
├── js/
│   ├── include.js          # loads each section file into the page
│   └── app.js              # behavior (matrix, typewriter, theme, observers)
├── sections/               # one .html file per section — edit these
│   ├── nav.html   hero.html   about.html   stack.html   experience.html
│   └── projects.html   education.html   contact.html   footer.html
└── resume/                 # the CV shown by the "view resume" links
```

`index.html` holds a placeholder per section (`<div data-include="sections/…"></div>`);
[`js/include.js`](js/include.js) fetches each file into place, then runs `js/app.js`.

## Run locally

The site is served over `http://` (the section files load via `fetch`), so use a local server —
in VS Code, install the **Live Server** extension, then right-click `index.html` → **Open with Live Server**.

---

© Imam Hosen Emon · Software Engineer · Backend · APIs · SaaS & ERP
