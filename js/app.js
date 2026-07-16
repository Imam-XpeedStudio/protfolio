// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Mobile menu ----
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden') === false;
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? '✕' : '≡';
});
document.querySelectorAll('.mob-link').forEach(l =>
  l.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = '≡';
  })
);

// ---- Typewriter (hero + contact) ----
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.js-typewriter').forEach(function (el) {
    const words = (el.getAttribute('data-words') || '').split('|').filter(Boolean);
    if (!words.length) return;
    if (reduce) { el.textContent = words[0]; return; }
    let p = 0, c = 0, deleting = false;
    function tick() {
      const word = words[p];
      el.textContent = word.slice(0, c);
      if (!deleting && c < word.length) { c++; setTimeout(tick, 55); }
      else if (!deleting && c === word.length) { deleting = true; setTimeout(tick, 1600); }
      else if (deleting && c > 0) { c--; setTimeout(tick, 28); }
      else { deleting = false; p = (p + 1) % words.length; setTimeout(tick, 350); }
    }
    tick();
  });
})();

// ---- Scroll reveal ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (Math.min(i % 6, 5) * 60) + 'ms';
  io.observe(el);
});

// ---- Terminal panels: slide each line in, one after another ----
const termIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.term-line').forEach((el, i) => {
        el.style.transitionDelay = (i * 110) + 'ms';
        el.classList.add('in');
      });
      termIO.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('[data-terminal]').forEach(el => termIO.observe(el));

// ---- Contact: sequential typewriter (email → linkedin → … → Connection ready) ----
(function () {
  const seq = document.querySelector('[data-typeseq]');
  if (!seq) return;
  const targets = Array.from(seq.querySelectorAll('[data-type]'));
  if (!targets.length) return;
  // stash each target's full text, then blank it
  targets.forEach(el => { el.dataset.full = el.textContent; el.textContent = ''; });
  const revealRow = el => { const row = el.closest('[data-row]'); if (row) row.classList.remove('tw-hide'); };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) {
    targets.forEach(el => { revealRow(el); el.textContent = el.dataset.full; });
    targets[targets.length - 1].classList.add('typing');
    return;
  }

  function run() {
    let idx = 0;
    (function next() {
      if (idx >= targets.length) return;
      const el = targets[idx];
      const isLast = idx === targets.length - 1;
      const full = el.dataset.full;
      revealRow(el);
      el.classList.add('typing');
      let i = 0;
      (function step() {
        el.textContent = full.slice(0, i);
        if (i < full.length) { i++; setTimeout(step, 24 + Math.random() * 34); }
        else { if (!isLast) el.classList.remove('typing'); idx++; setTimeout(next, 200); }
      })();
    })();
  }

  let started = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !started) { started = true; io.disconnect(); setTimeout(run, 450); }
    });
  }, { threshold: 0.25 });
  io.observe(seq);
})();

// ---- Active nav highlight ----
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.getAttribute('id');
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

// ---- Theme toggle (dark / light) ----
(function () {
  const btn = document.getElementById('themeBtn');
  const sun = document.getElementById('iconSun');
  const moon = document.getElementById('iconMoon');
  const root = document.documentElement;
  function sync() {
    const light = root.classList.contains('light');
    sun.classList.toggle('hidden', light);    // sun shows in dark  → "switch to light"
    moon.classList.toggle('hidden', !light);  // moon shows in light → "switch to dark"
    btn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    if (window.__matrix) window.__matrix.refresh();
  }
  sync();
  btn.addEventListener('click', () => {
    const light = root.classList.toggle('light');
    try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) {}
    sync();
  });
})();

// ---- Matrix rain — the "loader": click to start, click again to stop ----
(function () {
  const canvas = document.getElementById('matrix');
  const btn = document.getElementById('matrixBtn');
  if (!canvas || !btn) return;
  const ctx = canvas.getContext('2d');
  const glyphs = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋ0123456789<>/\\{}[]#$*+=;:'.split('');
  const fontSize = 15;
  let cols = 0, drops = [], raf = null, running = false;
  let bg = '10,14,12', green = '0,255,156';

  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    bg = (cs.getPropertyValue('--c-bg').trim() || '10 14 12').replace(/\s+/g, ',');
    green = (cs.getPropertyValue('--c-green').trim() || '0 255 156').replace(/\s+/g, ',');
  }
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(innerWidth / fontSize);
    drops = Array(cols).fill(0).map(() => (Math.random() * -50) | 0);
  }
  let lastDraw = 0;
  const drawInterval = 76; // ms between steps — higher = slower rain (was ~16ms / 60fps)
  function draw(now) {
    raf = requestAnimationFrame(draw);
    if (now - lastDraw < drawInterval) return;   // throttle to slow the fall
    lastDraw = now;
    ctx.fillStyle = 'rgba(' + bg + ',0.10)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    ctx.font = fontSize + 'px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(' + green + ',0.85)';
    for (let i = 0; i < cols; i++) {
      const ch = glyphs[(Math.random() * glyphs.length) | 0];
      ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > innerHeight && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  function setButton(on) {
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.setAttribute('aria-label', on ? 'Disable matrix rain' : 'Enable matrix rain');
    btn.classList.toggle('text-term-green', on);
    btn.classList.toggle('text-term-dim', !on);
  }
  function save(v) { try { localStorage.setItem('matrix', v); } catch (e) {} }
  function start(persist) {
    if (running) return;
    running = true;
    readColors(); resize();
    canvas.classList.remove('off');
    raf = requestAnimationFrame(draw);
    setButton(true);
    if (persist) save('on');
  }
  function stop(persist) {
    running = false;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    canvas.classList.add('off');
    setTimeout(() => { if (!running) ctx.clearRect(0, 0, innerWidth, innerHeight); }, 620);
    setButton(false);
    if (persist) save('off');
  }
  // let the theme toggle refresh live colors while running
  window.__matrix = { refresh() { if (running) readColors(); } };

  window.addEventListener('resize', () => { if (running) resize(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (raf) { cancelAnimationFrame(raf); raf = null; } }
    else if (running && !raf) { raf = requestAnimationFrame(draw); }
  });
  btn.addEventListener('click', () => { running ? stop(true) : start(true); });

  // Initial state — saved pref wins; else ON (like the reference); OFF if reduced-motion.
  let pref = null;
  try { pref = localStorage.getItem('matrix'); } catch (e) {}
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (pref === 'on' || (pref === null && !reduce)) start(false);
  else stop(false);
})();
