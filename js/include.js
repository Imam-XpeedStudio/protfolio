// Loads each section's .html file into its placeholder, then starts the page behavior.
// Every element with data-include="path/to/file.html" is replaced by that file's markup.
(async function () {
  const slots = document.querySelectorAll('[data-include]');

  await Promise.all(Array.from(slots).map(async (slot) => {
    const url = slot.getAttribute('data-include');
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
      slot.outerHTML = await res.text();
    } catch (err) {
      console.error('[include] failed to load ' + url + ':', err);
      slot.innerHTML =
        '<p style="color:#f66;font-family:monospace;padding:1rem">' +
        'Could not load ' + url + '. Serve the site over http:// (Live Server / GitHub Pages), not file://.' +
        '</p>';
    }
  }));

  // All sections are now in the DOM — load the behavior script (typewriter, theme, matrix, etc.).
  const script = document.createElement('script');
  script.src = 'js/app.js';
  document.body.appendChild(script);
})();
