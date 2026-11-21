/* SAMANVAYA 2027 - shared site script */
{
  /* mobile navigation */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* mark the current page in the navigation */
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('#site-nav a').forEach(a => {
    const target = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
    if (target === here || (here === '' && target === 'index.html')) a.setAttribute('aria-current', 'page');
  });

  /* footer year */
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* countdown to the conference */
  document.querySelectorAll('[data-countdown]').forEach(el => {
    const t = new Date(el.dataset.countdown).getTime();
    const days = Math.ceil((t - Date.now()) / 864e5);
    el.textContent = days > 1 ? days + ' days to go' : days === 1 ? 'Tomorrow' : days > -2 ? 'Happening now' : 'Thank you for attending';
  });

  /* ridgelines: Kamand valley mountains drawn as sums of sines */
  const ridges = document.querySelectorAll('.ridge');
  const drawRidge = el => {
    const W = el.clientWidth, H = el.clientHeight;
    if (!W || !H) return;
    let s = Number(el.dataset.seed || 7);
    const rnd = () => (s = s * 16807 % 2147483647) / 2147483647;
    const layers = Number(el.dataset.layers || 4);
    const fills = (el.dataset.fills || '#2c5f92,#214f80,#173d66,var(--bg)').split(',');
    let out = '';
    for (let L = 0; L < layers; L++) {
      const last = L === layers - 1;
      const base = last ? H * 0.84 : H * (0.3 + 0.24 * L / Math.max(1, layers - 2));
      const amp = last ? H * 0.07 : H * (0.36 - 0.06 * L);
      const terms = [1, 2, 3, 5, 8].map(k => ({ k, a: amp / (k ** 0.9) * (0.5 + rnd()), p: rnd() * 6.283 }));
      const step = Math.max(4, W / 160);
      let d = 'M0 ' + H;
      for (let x = 0; x <= W + step; x += step) {
        const u = x / W * 6.283;
        let y = base;
        for (const t of terms) y -= t.a * Math.sin(t.k * u + t.p) * 0.5;
        y = Math.max(H * 0.04, Math.min(H, y));
        d += ' L' + Math.min(x, W).toFixed(1) + ' ' + y.toFixed(1);
      }
      d += ' L' + W + ' ' + H + ' Z';
      const fill = fills[L] || fills[fills.length - 1];
      out += '<path d="' + d + '" fill="' + fill + '"/>';
      if (L < layers - 1) out += '<path d="' + d.replace(/ L\d+(\.\d+)? \d+(\.\d+)? Z$/, '').replace(/^M0 [\d.]+ L/, 'M') + '" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1"/>';
    }
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" aria-hidden="true">' + out + '</svg>';
  };
  const ridgeObserver = new ResizeObserver(entries => entries.forEach(e => drawRidge(e.target)));
  ridges.forEach(r => ridgeObserver.observe(r));
}
