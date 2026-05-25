gsap.registerPlugin(ScrollTrigger);

/* ── LANGUAGE SYNC ── */
(function () {
  const lang = localStorage.getItem('lang') || 'ko';

  // Inject toggle wrapper into nav (before nav-index)
  const nav = document.querySelector('nav');
  if (nav) {
    const wrapper = document.createElement('div');
    wrapper.className = 'lang-toggle-wrapper';
    wrapper.innerHTML = `
      <button class="lang-btn" data-lang="ko">KO</button>
      <button class="lang-btn" data-lang="en">EN</button>
    `;
    const navIndex = nav.querySelector('.nav-index');
    nav.insertBefore(wrapper, navIndex);

    const btns = wrapper.querySelectorAll('.lang-btn');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const next = btn.dataset.lang;
        localStorage.setItem('lang', next);
        applyLang(next, wrapper);
      });
      btn.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
      btn.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
    });

    function applyLang(l, wrap) {
      document.documentElement.lang = l;
      if (wrap) {
        wrap.querySelectorAll('.lang-btn').forEach(b => {
          if (b.dataset.lang === l) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
      }

      document.querySelectorAll('[data-en]').forEach(el => {
        if (!el.dataset.ko) el.dataset.ko = el.innerHTML;
        el.innerHTML = l === 'en' ? el.dataset.en : el.dataset.ko;
      });
    }

    applyLang(lang, wrapper);
  }
})();

/* ── PAGE ENTRY REVEAL ── */
(function () {
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;inset:0;z-index:30000;background:var(--bg);transform-origin:top;pointer-events:none;will-change:transform;';
  document.body.appendChild(el);
  gsap.set(el, { scaleY: 1 });
  gsap.to(el, {
    scaleY: 0, duration: 0.9, ease: 'power3.inOut', delay: 0.05,
    onComplete() { el.remove(); }
  });
})();

/* ── LENIS SMOOTH SCROLL ── */
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1.0 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

/* ── PAGE TRANSITION ── */
const _pt = (function () {
  const pt = document.createElement('div');
  pt.id = 'page-transition';
  document.body.appendChild(pt);
  return pt;
})();

/* bfcache 복원 시 page-transition 초기화 */
window.addEventListener('pageshow', e => {
  if (e.persisted) gsap.set(_pt, { scaleY: 0 });
});

function _navigate(href) {
  gsap.to(_pt, {
    scaleY: 1, duration: 0.5, ease: 'power3.inOut',
    transformOrigin: 'bottom',
    onComplete: () => { window.location.href = href; }
  });
}

document.querySelectorAll('.nav-close, .detail-nav a').forEach(link => {
  link.addEventListener('click', e => { e.preventDefault(); _navigate(link.href); });
});

/* ── SCROLL PROGRESS BAR ── */
const progressBar = document.createElement('div');
progressBar.style.cssText = 'position:fixed;top:0;left:0;height:2px;width:0%;background:var(--accent);z-index:10000;pointer-events:none;';
document.body.appendChild(progressBar);
gsap.to(progressBar, {
  width: '100%', ease: 'none',
  scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0 }
});

/* ── CURSOR TRAIL ── */
if (window.matchMedia('(hover: hover)').matches) {
  const TRAIL = 9;
  let trailPos = { x: 0, y: 0 };
  const dots = Array.from({ length: TRAIL }, (_, i) => {
    const d = document.createElement('div');
    const size = 4 + i * 0.8;
    d.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:50%;
      background:var(--accent);pointer-events:none;z-index:19990;opacity:0;
      transform:translate(-50%,-50%);`;
    document.body.appendChild(d);
    return { el: d, x: 0, y: 0 };
  });
  document.addEventListener('mousemove', e => { trailPos = { x: e.clientX, y: e.clientY }; });
  (function trailLoop() {
    dots.forEach((dot, i) => {
      const src = i === 0 ? trailPos : dots[i - 1];
      const speed = 0.28 - i * 0.02;
      dot.x += (src.x - dot.x) * speed;
      dot.y += (src.y - dot.y) * speed;
      gsap.set(dot.el, { x: dot.x, y: dot.y, opacity: (1 - i / TRAIL) * 0.55 });
    });
    requestAnimationFrame(trailLoop);
  })();
}

/* ── CUSTOM CURSOR ── */
if (window.matchMedia('(hover: hover)').matches) {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.to(cursor, { x: mx, y: my, duration: 0.04 });
  });
  (function loop() {
    fx += (mx - fx) * 0.11; fy += (my - fy) * 0.11;
    gsap.set(follower, { x: fx, y: fy });
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
  });
}

/* ── ESCAPE KEY SHORTCUT ── */
/* 라이트박스가 열려 있으면 페이지 이동을 막고 사진 닫기만 처리 */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const lb = document.getElementById('lightbox');
  if (lb && lb.classList.contains('open')) return;
  _navigate('../index.html#work');
});

/* ── AMBIENT GLOW ── */
if (window.matchMedia('(hover: hover)').matches) {
  const accentRgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '118, 199, 192';
  const ambientGlow = document.createElement('div');
  ambientGlow.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:1;opacity:0;';
  document.body.appendChild(ambientGlow);
  document.addEventListener('mousemove', e => {
    const xp = (e.clientX / window.innerWidth  * 100).toFixed(1);
    const yp = (e.clientY / window.innerHeight * 100).toFixed(1);
    ambientGlow.style.background = `radial-gradient(circle at ${xp}% ${yp}%, rgba(${accentRgb},0.05) 0%, transparent 50%)`;
    ambientGlow.style.opacity = '1';
  });
}

/* ── TEXT SCRAMBLE ── */
function scramble(el, finalText, delay = 0) {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const TOTAL = 28;
  let frame = 0;
  setTimeout(() => {
    const iv = setInterval(() => {
      el.textContent = finalText.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i < (frame / TOTAL) * finalText.length) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      if (++frame > TOTAL) { el.textContent = finalText; clearInterval(iv); }
    }, 38);
  }, delay);
}

/* ── HERO TITLE SCRAMBLE ── */
const titleInner = document.querySelector('.detail-title-inner');
if (titleInner) {
  const originalText = titleInner.textContent;
  setTimeout(() => scramble(titleInner, originalText, 600), 0);
}

/* ── HERO IMAGE PARALLAX ── */
gsap.to('.detail-hero img', {
  scrollTrigger: { trigger: '.detail-hero', start: 'top top', end: 'bottom top', scrub: true },
  y: 120, ease: 'none'
});

/* ── META ROW REVEAL ── */
gsap.utils.toArray('.detail-meta-item').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: '.detail-meta', start: 'top 88%' },
    opacity: 0, y: 20, duration: .7, delay: i * 0.09, ease: 'power3.out'
  });
});

/* ── DESC REVEAL ── */
gsap.from('.detail-desc', {
  scrollTrigger: { trigger: '.detail-desc', start: 'top 88%' },
  opacity: 0, y: 28, duration: .9, ease: 'power3.out'
});

/* ── SECTION TAG REVEAL ── */
gsap.utils.toArray('.section-tag').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 90%' },
    opacity: 0, x: -20, duration: .6, ease: 'power3.out'
  });
});

/* ── IMAGE CLIP-PATH REVEAL ── */
gsap.utils.toArray('.img-full').forEach((el, i) => {
  gsap.fromTo(el,
    { clipPath: 'inset(0 0 100% 0)' },
    {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.85, ease: 'power3.out'
    }
  );
});

gsap.utils.toArray('.img-grid-2, .img-grid-3').forEach(grid => {
  gsap.utils.toArray(grid.children).forEach((child, i) => {
    gsap.fromTo(child,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        scrollTrigger: { trigger: grid, start: 'top 88%' },
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.75, delay: i * 0.1, ease: 'power3.out'
      }
    );
  });
});

/* ── NAV REVEAL ── */
gsap.from('.detail-nav', {
  scrollTrigger: { trigger: '.detail-nav', start: 'top 92%' },
  opacity: 0, y: 20, duration: .7, ease: 'power3.out'
});

/* ── CURSOR ZOOM LABEL ── */
if (window.matchMedia('(hover: hover)').matches) {
  const zoomLabel = document.createElement('div');
  zoomLabel.id = 'cursor-zoom';
  zoomLabel.textContent = 'ZOOM';
  document.body.appendChild(zoomLabel);
  gsap.set(zoomLabel, { xPercent: -50, yPercent: -50, scale: 0 });

  document.addEventListener('mousemove', e => {
    gsap.to(zoomLabel, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out' });
  });

  document.querySelectorAll('.detail-body img').forEach(img => {
    img.addEventListener('mouseenter', () => {
      gsap.to(zoomLabel,          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.8)', overwrite: 'auto' });
      gsap.to('#cursor',          { opacity: 0, duration: 0.15, overwrite: 'auto' });
      gsap.to('#cursor-follower', { opacity: 0, duration: 0.15, overwrite: 'auto' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(zoomLabel,          { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.in', overwrite: 'auto' });
      gsap.to('#cursor',          { opacity: 1, duration: 0.2, overwrite: 'auto' });
      gsap.to('#cursor-follower', { opacity: 1, duration: 0.2, overwrite: 'auto' });
    });
  });
}

/* ── LIGHTBOX ── */
(function () {
  const images = [...document.querySelectorAll('.detail-body img')];
  if (!images.length) return;

  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = `
    <div class="lb-overlay"></div>
    <button class="lb-close" aria-label="닫기">
      <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="lb-img-wrap"><img src="" alt="" /></div>
    <div class="lb-counter"></div>
  `;
  document.body.appendChild(lb);

  const lbImg     = lb.querySelector('.lb-img-wrap img');
  const lbWrap    = lb.querySelector('.lb-img-wrap');
  const lbOverlay = lb.querySelector('.lb-overlay');
  const lbCounter = lb.querySelector('.lb-counter');
  const lbClose   = lb.querySelector('.lb-close');
  let current = 0;

  function updateCounter() {
    lbCounter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
  }

  function openLb(idx) {
    current = idx;
    lbImg.src = images[current].src;
    lbImg.alt = images[current].alt;
    updateCounter();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lenis.stop();
    gsap.to(lbOverlay, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(lbWrap, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out' });
  }

  function closeLb() {
    gsap.to(lbWrap,    { scale: 0.93, opacity: 0, duration: 0.25, ease: 'power2.in' });
    gsap.to(lbOverlay, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete() {
        lb.classList.remove('open');
        document.body.style.overflow = '';
        lenis.start();
      }
    });
  }

  images.forEach((img, i) => img.addEventListener('click', () => openLb(i)));
  lbClose.addEventListener('click', (e) => { e.stopPropagation(); closeLb(); });
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target === lbOverlay) closeLb();
  });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
  });

  lbClose.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
  lbClose.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
})();

/* ── PROCESS SECTION ── */
(function () {
  const processSection = document.querySelector('.detail-process');
  if (!processSection) return;

  const tag = processSection.querySelector('.section-tag');
  if (tag) {
    gsap.from(tag, {
      scrollTrigger: { trigger: tag, start: 'top 90%' },
      opacity: 0, x: -40, skewX: -8, duration: .8, ease: 'power3.out'
    });
  }

  const items = gsap.utils.toArray('.process-item');
  items.forEach((item, i) => {
    gsap.to(item, {
      scrollTrigger: { trigger: processSection, start: 'top 80%' },
      opacity: 1, y: 0,
      duration: 0.7,
      delay: i * 0.12,
      ease: 'back.out(1.3)'
    });

    const num   = item.querySelector('.process-num');
    const title = item.querySelector('.process-title');

    item.addEventListener('mouseenter', () => {
      gsap.to(num,   { opacity: 1, scale: 1.06, x: 4,  duration: 0.35, ease: 'power2.out' });
      gsap.to(title, { color: 'var(--accent)',           duration: 0.25 });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(num,   { opacity: 0.2, scale: 1, x: 0,   duration: 0.4, ease: 'power2.out' });
      gsap.to(title, { color: 'var(--fg)',               duration: 0.3 });
    });
  });
})();
