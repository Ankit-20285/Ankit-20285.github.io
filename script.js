(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Social links + misc config
  $$('[data-link]').forEach(function (a) { a.href = SITE[a.dataset.link]; });
  $('#solved').textContent = SITE.leetcodeSolved;
  $('#year').textContent = new Date().getFullYear();
  $('#mailBtn').href = 'mailto:' + SITE.email;

  // Resume
  $$('[data-resume]').forEach(function (a) { a.href = SITE.resume.path; a.setAttribute('download', SITE.resume.filename); });
  $$('[data-view-resume]').forEach(function (a) { a.href = SITE.resume.path; });
  $$('[data-resume]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (location.protocol === 'file:') return; // can't check files locally
      e.preventDefault();
      fetch(SITE.resume.path, { method: 'HEAD' }).then(function (r) {
        if (!r.ok) throw 0;
        var t = document.createElement('a'); t.href = SITE.resume.path; t.download = SITE.resume.filename; t.click();
      }).catch(function () {
        $$('[data-resume-msg]').forEach(function (m) { m.textContent = 'Resume is temporarily unavailable. Please email ' + SITE.email + '.'; });
      });
    });
  });

  // Projects
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  $('#projectGrid').innerHTML = SITE.projects.map(function (p) {
    var tags = p.tech.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
    var gh = p.github ? '<a class="btn btn-sm" href="' + esc(p.github) + '" target="_blank" rel="noopener">View on GitHub</a>'
      : '<span class="note">Repository link coming soon</span>';
    var demo = p.demo ? '<a class="btn btn-sm btn-ghost" href="' + esc(p.demo) + '" target="_blank" rel="noopener">Live Demo</a>' : '';
    var actions = '<div class="actions">' + gh + demo + '</div>';
    if (p.featured) {
      var pts = (p.points || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
      return '<article class="glass card featured reveal"><div><span class="badge">Flagship</span><h3>' + esc(p.title) + '</h3><p>' + esc(p.description) +
        '</p><ul>' + pts + '</ul><div class="chips" style="margin:14px 0">' + tags + '</div>' + actions + '</div>' +
        '<div class="project-preview">' +
  '<img src="assets/visionai-home.png" ' +
  'alt="VisionAI image classification application homepage" ' +
  'loading="lazy">' +
'</div></article>';
    }
    return '<article class="glass card reveal"><div class="thumb" aria-hidden="true">' + esc(p.kind) + '</div><h3>' + esc(p.title) + '</h3><p>' + esc(p.description) +
      '</p><div class="chips">' + tags + '</div>' + actions + '</article>';
  }).join('');

  // Nav
  var nav = $('#nav'), btn = $('#menuBtn'), links = $('#links'), toTop = $('#toTop');
  btn.addEventListener('click', function () { var o = links.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
  $$('#links a').forEach(function (a) { a.addEventListener('click', function () { links.classList.remove('open'); btn.setAttribute('aria-expanded', false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { links.classList.remove('open'); btn.setAttribute('aria-expanded', false); } });
  addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 20); toTop.classList.toggle('show', scrollY > 600); }, { passive: true });

  // Active section + reveal
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) $$('#links a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); }); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { secObs.observe(s); });
    var revObs = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); } }); }, { threshold: .12 });
    $$('.reveal').forEach(function (el) { revObs.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }

  // Copy email
  $('#copyBtn').addEventListener('click', function () {
    var t = $('#toast');
    function ok() { t.textContent = 'Email copied: ' + SITE.email; setTimeout(function () { t.textContent = ''; }, 2500); }
    if (navigator.clipboard) navigator.clipboard.writeText(SITE.email).then(ok, function () { t.textContent = 'Copy failed. Email: ' + SITE.email; });
    else t.textContent = 'Email: ' + SITE.email;
  });

  // Neural network canvas
  var cv = $('#net'), cx = cv.getContext('2d'), nodes = [], W, H, dpr = Math.min(devicePixelRatio || 1, 2), mouse = null;
  function size() {
    W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = []; var n = W < 400 ? 28 : 44;
    for (var i = 0; i < n; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 });
  }
  function draw() {
    cx.clearRect(0, 0, W, H);
    nodes.forEach(function (a, i) {
      if (!reduce) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1; }
      for (var j = i + 1; j < nodes.length; j++) {
        var b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) { cx.strokeStyle = 'rgba(167,139,250,' + (1 - d / 110) * .45 + ')'; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke(); }
      }
      var near = mouse && Math.hypot(a.x - mouse.x, a.y - mouse.y) < 90;
      cx.fillStyle = near ? '#22d3ee' : '#a78bfa'; cx.beginPath(); cx.arc(a.x, a.y, near ? 3.5 : 2.2, 0, 7); cx.fill();
    });
    if (!reduce) requestAnimationFrame(draw);
  }
  cv.addEventListener('pointermove', function (e) { var r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; if (reduce) draw(); });
  cv.addEventListener('pointerleave', function () { mouse = null; });
  addEventListener('resize', size);
  size(); draw();
})();
