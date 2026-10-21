(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  let current = 0, keysVisible = false, ideaVisible = false, explainVisible = false, start = null;
  const hashToIndex = () => { const n = Number(location.hash.slice(1)); return Number.isInteger(n) && n >= 1 && n <= SLIDES.length ? n - 1 : null; };
  const initial = hashToIndex(); if (initial !== null) current = initial;
  function render() {
    const s = SLIDES[current];
    $('slide').src = 'assets/' + s.file; $('slide').alt = s.alt;
    $('stage').setAttribute('aria-label', `Lámina ${current + 1} de ${SLIDES.length}: ${s.title}`);
    $('counter').textContent = `${current + 1} / ${SLIDES.length}`;
    $('prev').disabled = current === 0; $('next').disabled = current === SLIDES.length - 1;
    $('keywords').replaceChildren(...s.keywords.map(k => { const tag = document.createElement('span'); tag.textContent = k; return tag; }));
    $('idea').textContent = s.idea;
    $('steps').replaceChildren(...s.steps.map(step => { const li = document.createElement('li'); li.textContent = step; return li; }));
    $('keywords').hidden = !keysVisible; $('idea').hidden = !ideaVisible; $('explain').hidden = !explainVisible;
    $('keyToggle').setAttribute('aria-pressed', String(keysVisible));
    $('ideaToggle').setAttribute('aria-pressed', String(ideaVisible));
    $('explainToggle').setAttribute('aria-pressed', String(explainVisible));
    $('error').hidden = true;
    history.replaceState(null, '', '#' + (current + 1));
  }
  function move(delta) { const next = Math.max(0, Math.min(SLIDES.length - 1, current + delta)); if (next !== current) { current = next; render(); } }
  $('prev').addEventListener('click', () => move(-1));
  $('next').addEventListener('click', () => move(1));
  $('keyToggle').addEventListener('click', () => { keysVisible = !keysVisible; render(); });
  $('ideaToggle').addEventListener('click', () => { ideaVisible = !ideaVisible; render(); });
  $('explainToggle').addEventListener('click', () => { explainVisible = !explainVisible; render(); });
  $('full').addEventListener('click', async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else await $('presentation').requestFullscreen(); } catch {} });
  document.addEventListener('fullscreenchange', () => { $('full').setAttribute('aria-label', document.fullscreenElement ? 'Salir de pantalla completa' : 'Activar pantalla completa'); });
  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.target.tagName === 'BUTTON') return;
    if (e.key === 'ArrowRight') { e.preventDefault(); move(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
    if (e.key === 'Home') { e.preventDefault(); current = 0; render(); }
    if (e.key === 'End') { e.preventDefault(); current = SLIDES.length - 1; render(); }
    if (e.key === 'Escape' && explainVisible) { explainVisible = false; render(); }
  });
  $('stage').addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') start = {x: e.clientX, y: e.clientY}; });
  $('stage').addEventListener('pointerup', e => { if (!start) return; const dx = e.clientX - start.x, dy = e.clientY - start.y; start = null; if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1); });
  $('stage').addEventListener('pointercancel', () => { start = null; });
  $('slide').addEventListener('error', () => { $('error').hidden = false; });
  $('slide').addEventListener('load', () => { $('error').hidden = true; });
  window.addEventListener('hashchange', () => { const n = hashToIndex(); if (n !== null && n !== current) { current = n; render(); } });
  render();
})();
