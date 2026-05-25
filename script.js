gsap.registerPlugin(ScrollTrigger);

/* ── LANGUAGE TOGGLE ── */
window._i18n = {
  ko: {
    'hero-desc':          '시간이 지나도 가치가 남는,<br/>완성도 있는 결과를 남깁니다.',
    'about-name':         '임채형',
    'about-bio':          '세심한 관찰과 공감을 기반으로,<br/><strong>과하지 않은 표현 속에서 자연스럽게 전달되는 디자인</strong>을 추구합니다.<br/><br/>UI/UX부터 브랜딩, 편집 디자인까지 — 시각적 커뮤니케이션의 모든 영역에서 완성도 있는 결과를 만들어냅니다.',
    'meta-birth':         '생년월일',
    'meta-location':      '위치',
    'meta-education':     '학력',
    'meta-contact-label': '연락처',
    'meta-val-location':  '인천광역시 부평구',
    'meta-val-school':    '한국폴리텍대학 인천캠퍼스<br/>산업디자인과',
    'exp1-role': '그래픽 디자인 강사',
    'exp1-org':  '글로벌숙련기술진흥원',
    'exp1-desc': '포토샵·일러스트레이터 등 그래픽 디자인 툴 활용 교육 진행. 수강생 작업 피드백 및 실무 중심 커리큘럼 운영.',
    'exp2-role': '시각디자인 총괄',
    'exp2-org':  '샘튼',
    'exp2-desc': '브랜드 비주얼 아이덴티티 수립부터 SNS 콘텐츠, 인쇄물, 디지털 마케팅 디자인까지 시각 커뮤니케이션 전반 총괄.',
    'edu1-role': '산업디자인과',
    'edu1-org':  '한국폴리텍대학 인천캠퍼스',
    'edu1-desc': 'UI/UX, 제품·시각디자인 전공. 실무 중심 교육 과정을 통해 다양한 디자인 분야의 실전 역량을 쌓고 졸업.',
    'edu2-role': '과학중점고등학교',
    'edu2-org':  '인천산곡고등학교',
    'edu2-desc': '재학 중 디자인에 관심을 갖고 독학으로 그래픽 툴을 익히며 포트폴리오 제작을 시작.',
    'contact-send-btn':   '메일 보내기',
    'modal-title':        '메시지 보내기',
    'form-ph-name':       '이름',
    'form-ph-email':      '이메일',
    'form-ph-msg':        '메시지를 입력해주세요',
    'form-submit':        '보내기',
    'form-submitting':    '전송 중...',
    'form-error':         '오류 발생 — 다시 시도해주세요',
    'form-success-msg':   '메시지가 전송되었습니다.<br/>빠른 시일 내에 답변 드리겠습니다.',
  },
  en: {
    'hero-desc':          'Crafting timeless design<br/>with enduring quality.',
    'about-name':         'Lim Chae Hyung',
    'about-bio':          'Based on careful observation and empathy,<br/><strong>I pursue design that communicates naturally — without excess.</strong><br/><br/>From UI/UX to branding and editorial — delivering refined results across every domain of visual communication.',
    'meta-birth':         'Date of Birth',
    'meta-location':      'Location',
    'meta-education':     'Education',
    'meta-contact-label': 'Contact',
    'meta-val-location':  'Bupyeong-gu, Incheon',
    'meta-val-school':    'Korea Polytechnic Univ. Incheon<br/>Industrial Design',
    'exp1-role': 'Graphic Design Instructor',
    'exp1-org':  'Korea Skills Agency',
    'exp1-desc': 'Delivered hands-on training in Photoshop, Illustrator, and other graphic tools. Provided feedback on student work and led a practice-focused curriculum.',
    'exp2-role': 'Visual Design Director',
    'exp2-org':  'Saemteun',
    'exp2-desc': 'Oversaw all visual communication — from brand identity and social content to print materials and digital marketing design.',
    'edu1-role': 'Industrial Design',
    'edu1-org':  'Korea Polytechnic Univ. Incheon',
    'edu1-desc': 'Majored in UI/UX, product, and visual design. Built hands-on expertise across diverse disciplines through a practice-centered curriculum.',
    'edu2-role': 'Science High School',
    'edu2-org':  'Incheon Sangok High School',
    'edu2-desc': 'Developed a passion for design and self-taught graphic tools, starting a portfolio during high school.',
    'contact-send-btn':   'Send a Message',
    'modal-title':        'Send a Message',
    'form-ph-name':       'Name',
    'form-ph-email':      'Email',
    'form-ph-msg':        'Your message...',
    'form-submit':        'Send',
    'form-submitting':    'Sending...',
    'form-error':         'Error — please try again',
    'form-success-msg':   'Your message has been sent.<br/>I\'ll get back to you shortly.',
  }
};
window._lang = localStorage.getItem('lang') || 'ko';

(function () {
  const wrapper = document.getElementById('lang-toggle-wrapper');
  if (!wrapper) return;
  const btns = wrapper.querySelectorAll('.lang-btn');

  function applyLang(l) {
    window._lang = l;
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
    document.title = l === 'en' ? 'Lim Chae Hyung — Designer' : '임채형 — Designer';

    // 활성 상태 클래스 토글
    btns.forEach(btn => {
      if (btn.dataset.lang === l) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const strings = window._i18n[l];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (strings[key] !== undefined) el.innerHTML = strings[key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      if (strings[key] !== undefined) el.setAttribute('placeholder', strings[key]);
    });
  }

  applyLang(window._lang);

  btns.forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    btn.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
    btn.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
  });
})();

/* ── LENIS SMOOTH SCROLL ── */
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1.0 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

/* ── PAGE TRANSITION OVERLAY ── */
const _pt = document.createElement('div');
_pt.id = 'page-transition';
document.body.appendChild(_pt);
document.querySelectorAll('.work-item').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.href;
    gsap.to(_pt, {
      scaleY: 1, duration: 0.5, ease: 'power3.inOut',
      transformOrigin: 'bottom',
      onComplete: () => { window.location.href = href; }
    });
  });
});

/* bfcache 복원 시 page-transition 초기화 */
window.addEventListener('pageshow', e => {
  if (e.persisted) gsap.set(_pt, { scaleY: 0 });
});

/* ── SCROLL PROGRESS BAR ── */
const progressBar = document.createElement('div');
progressBar.style.cssText = 'position:fixed;top:0;left:0;height:2px;width:0%;background:var(--accent);z-index:10000;pointer-events:none;';
document.body.appendChild(progressBar);
gsap.to(progressBar, {
  width: '100%', ease: 'none',
  scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0 }
});

/* ── 커서 트레일 · 커스텀 커서 · VIEW 라벨 · 앰비언트 글로우 · 히어로 패럴렉스 (hover 통합 블록) ── */
if (window.matchMedia('(hover: hover)').matches) {
  /* 공유 마우스 좌표 — mousemove 리스너를 하나로 통합하기 위한 변수 */
  let mouseX = 0, mouseY = 0;

  /* ── 커서 트레일 ── */
  const TRAIL = 9;
  const dots = Array.from({ length: TRAIL }, (_, i) => {
    const d = document.createElement('div');
    const size = 4 + i * 0.8;
    d.style.cssText = `position:fixed;top:0;left:0;width:${size}px;height:${size}px;border-radius:50%;
      background:var(--accent);pointer-events:none;z-index:19990;opacity:0;
      transform:translate(-50%,-50%);`;
    document.body.appendChild(d);
    return { el: d, x: 0, y: 0 };
  });

  /* ── 커스텀 커서 ── */
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  /* DOM 마지막으로 이동 + 최상위 z-index 보장 */
  document.body.appendChild(follower);
  document.body.appendChild(cursor);
  cursor.style.zIndex   = '999999';
  follower.style.zIndex = '999998';

  let fx = 0, fy = 0;

  /* ── 커서 VIEW 라벨 ── */
  const viewLabel = document.createElement('div');
  viewLabel.id = 'cursor-view';
  viewLabel.textContent = 'VIEW';
  document.body.appendChild(viewLabel);
  gsap.set(viewLabel, { xPercent: -50, yPercent: -50, scale: 0 });

  /* ── 앰비언트 글로우 ── */
  const accentRgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '118, 199, 192';
  const ambientGlow = document.createElement('div');
  ambientGlow.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:1;opacity:0;';
  document.body.appendChild(ambientGlow);

  /* ── 통합 mousemove 리스너 (5개 → 1개) ── */
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // 커서
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.04 });
    // VIEW 라벨
    gsap.to(viewLabel, { x: mouseX, y: mouseY, duration: 0.12, ease: 'power2.out' });
    // 앰비언트 글로우
    const xp = (mouseX / window.innerWidth  * 100).toFixed(1);
    const yp = (mouseY / window.innerHeight * 100).toFixed(1);
    ambientGlow.style.background = `radial-gradient(circle at ${xp}% ${yp}%, rgba(${accentRgb},0.05) 0%, transparent 50%)`;
    ambientGlow.style.opacity = '1';
    // 히어로 패럴렉스
    const xr = mouseX / window.innerWidth  - 0.5;
    const yr = mouseY / window.innerHeight - 0.5;
    gsap.to('.hero-title',   { x: xr * 60, y: yr * 30, duration: 1.6, ease: 'power2.out' });
    gsap.to('.hero-eyebrow', { x: xr * 26, y: yr * 14, duration: 1.9, ease: 'power2.out' });
    gsap.to('.hero-desc',    { x: xr * 16, y: yr *  9, duration: 2.1, ease: 'power2.out' });
  });

  /* ── gsap.ticker: 커서 트레일 (requestAnimationFrame 대체) ── */
  gsap.ticker.add(() => {
    dots.forEach((dot, i) => {
      const src = i === 0 ? { x: mouseX, y: mouseY } : dots[i - 1];
      const speed = 0.28 - i * 0.02;
      dot.x += (src.x - dot.x) * speed;
      dot.y += (src.y - dot.y) * speed;
      gsap.set(dot.el, { x: dot.x, y: dot.y, opacity: (1 - i / TRAIL) * 0.55 });
    });
  });

  /* ── gsap.ticker: 커서 팔로워 (requestAnimationFrame 대체) ── */
  gsap.ticker.add(() => {
    fx += (mouseX - fx) * 0.11; fy += (mouseY - fy) * 0.11;
    gsap.set(follower, { x: fx, y: fy });
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
  });

  document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(viewLabel,          { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.8)', overwrite: 'auto' });
      gsap.to('#cursor',          { opacity: 0, duration: 0.15, overwrite: 'auto' });
      gsap.to('#cursor-follower', { opacity: 0, duration: 0.15, overwrite: 'auto' });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(viewLabel,          { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.in', overwrite: 'auto' });
      gsap.to('#cursor',          { opacity: 1, duration: 0.2, overwrite: 'auto' });
      gsap.to('#cursor-follower', { opacity: 1, duration: 0.2, overwrite: 'auto' });
    });
  });
}

/* ── MOBILE NAV ── */
const hamburger   = document.getElementById('hamburger');
const mobileNav   = document.getElementById('mobile-nav');
const mobileLinks = mobileNav.querySelectorAll('.mobile-link');
function openMenu() {
  hamburger.classList.add('open'); mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
  lenis.stop();
  gsap.to(mobileLinks, { opacity: 1, y: 0, duration: .55, stagger: .08, ease: 'power3.out' });
}
function closeMenu() {
  hamburger.classList.remove('open');
  gsap.to(mobileLinks, {
    opacity: 0, y: 30, duration: .3, stagger: .05, ease: 'power2.in',
    onComplete: () => { mobileNav.classList.remove('open'); document.body.style.overflow = ''; lenis.start(); }
  });
}
hamburger.addEventListener('click', () => hamburger.classList.contains('open') ? closeMenu() : openMenu());
mobileLinks.forEach(a => a.addEventListener('click', closeMenu));

/* ── ANCHOR SMOOTH SCROLL (Lenis) ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const delay = a.classList.contains('mobile-link') ? 370 : 0;
    setTimeout(() => lenis.scrollTo(target, { offset: -80, duration: 1.2 }), delay);
  });
});

/* ── ACTIVE NAV ── */
(function () {
  const navLinks = document.querySelectorAll('.nav-links a');
  function setActive(id) {
    navLinks.forEach(a => a.classList.toggle('nav-active', a.getAttribute('href') === `#${id}`));
  }
  ['about', 'skills', 'work', 'contact'].forEach(id => {
    ScrollTrigger.create({
      trigger: `#${id}`, start: 'top 50%', end: 'bottom 50%',
      onEnter:     () => setActive(id),
      onEnterBack: () => setActive(id),
      onLeave:     () => setActive(null),
      onLeaveBack: () => setActive(null),
    });
  });
})();


/* ── TEXT SCRAMBLE ── */
function scramble(el, finalText, delay = 0) {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
  const TOTAL = 36;
  let frame = 0;
  setTimeout(() => {
    const iv = setInterval(() => {
      el.textContent = finalText.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i < (frame / TOTAL) * finalText.length) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      if (++frame > TOTAL) { el.textContent = finalText; clearInterval(iv); }
    }, 26);
  }, delay);
}

/* ── INTRO ── */
const intro      = document.getElementById('intro');
const introSpans = intro.querySelectorAll('span');
const introFill  = intro.querySelector('.intro-bar-fill');

if (sessionStorage.getItem('introSeen')) {
  intro.remove();
  playHero();
} else {
  gsap.timeline({
    onComplete() {
      sessionStorage.setItem('introSeen', '1');
      gsap.to(intro, {
        yPercent: -100, duration: .9, ease: 'power3.inOut',
        onComplete: () => intro.remove()
      });
      playHero();
    }
  })
  .to(introSpans, { y: '0%', duration: .8, stagger: .12, ease: 'power3.out' })
  .add(() => { introFill.style.width = '100%'; }, '+=.15')
  .to({}, { duration: .85 });
}

/* ── HERO ENTRANCE + SCRAMBLE ── */
function playHero() {
  const lines = document.querySelectorAll('.hero-title .line span');
  gsap.fromTo(lines,
    { y: '110%', skewX: -8 },
    { y: '0%', skewX: 0, duration: 1.1, stagger: .12, ease: 'power4.out',
      onComplete() {
        lines.forEach((el, i) => scramble(el, el.textContent, i * 100));
      }
    }
  );
  gsap.to(['.hero-eyebrow', '.hero-desc'], {
    opacity: 1, y: 0, duration: .95, stagger: .18, delay: .35, ease: 'power3.out',
    onComplete() {
      gsap.to('.hero-eyebrow', { y: -10, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.hero-desc',   { y: -7,  duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.8 });
    }
  });
  gsap.to('.hero-scroll', { opacity: 1, duration: .8, delay: .7 });
}

/* ── TICKER — 스크롤 방향에 따라 방향 전환 ── */
const tickerTrack = document.querySelector('.ticker-track');
if (tickerTrack) {
  tickerTrack.style.animation = 'none';
  const trackLen = tickerTrack.scrollWidth / 2;
  let tx = 0, tickSpd = 1.6, targetSpd = 1.6;

  gsap.ticker.add(() => {
    tickSpd += (targetSpd - tickSpd) * 0.07;
    tx -= tickSpd;
    if (tx <= -trackLen) tx += trackLen;
    if (tx > 0)          tx -= trackLen;
    gsap.set(tickerTrack, { x: tx });
  });

  ScrollTrigger.create({
    onUpdate(self) {
      const v   = self.getVelocity();
      const abs = Math.abs(v);
      const spd = abs > 600 ? 7 : abs > 200 ? 4 : 1.6;
      targetSpd = v < -80 ? -spd : spd;
    }
  });
}

/* ── WORK TITLE — word reveal ── */
const workTitle = document.querySelector('.work-title');
if (workTitle) {
  const parts = workTitle.innerHTML.split(/<br\s*\/?>/i);
  workTitle.innerHTML = parts.map(w =>
    `<span style="display:block;overflow:hidden;line-height:.95"><span class="wt-inner" style="display:block">${w}</span></span>`
  ).join('');
  gsap.from(workTitle.querySelectorAll('.wt-inner'), {
    scrollTrigger: { trigger: workTitle, start: 'top 85%' },
    y: '105%', duration: 1.05, stagger: 0.13, ease: 'power3.out'
  });
}

/* ── HERO SCROLL FADE ── */
gsap.fromTo(['.hero-title', '.hero-eyebrow', '.hero-sub'],
  { opacity: 1 },
  { scrollTrigger: { trigger: '#hero', start: 'top top', end: '45% top', scrub: true },
    opacity: 0, ease: 'none' }
);

/* ── ABOUT META STAGGER ── */
gsap.utils.toArray('.meta-item').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%' },
    opacity: 0, y: 30, scale: 0.92, duration: 0.75, delay: i * 0.1, ease: 'back.out(1.5)'
  });
});

/* ── ABOUT REVEAL ── */
gsap.fromTo('.about-img-wrap',
  { clipPath: 'inset(0 0 100% 0)' },
  { scrollTrigger: { trigger: '.about-img-wrap', start: 'top 100%' },
    clipPath: 'inset(0 0 0% 0)', duration: 1.3, ease: 'power3.inOut' }
);
gsap.from('.about-content', {
  scrollTrigger: { trigger: '.about-content', start: 'top 95%' },
  opacity: 0, x: 60, duration: 1.1, ease: 'power3.out'
});
gsap.to('.about-img-wrap img', {
  scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: true },
  y: 90, ease: 'none'
});

/* ── ABOUT PHOTO GRAYSCALE → COLOR ── */
const _aboutImg = document.querySelector('.about-img-wrap img');
if (_aboutImg) {
  gsap.set(_aboutImg, { filter: 'grayscale(1)' });
  ScrollTrigger.create({
    trigger: '.about-img-wrap', start: 'top 95%',
    onEnter: () => gsap.to(_aboutImg, { filter: 'grayscale(0)', duration: 2, ease: 'power2.out', delay: 0.3 })
  });
}

/* ── EXPERIENCE ITEMS ── */
gsap.utils.toArray('.exp-item').forEach((el, i) => {
  gsap.to(el, {
    scrollTrigger: { trigger: el, start: 'top 87%' },
    opacity: 1, y: 0, duration: .75, delay: i * .07, ease: 'power3.out'
  });
});

/* ── SKILL BARS + 숫자 카운트업 ── */
document.querySelectorAll('.skill-fill').forEach((bar, i) => {
  const pctEl = bar.closest('.skill-item').querySelector('.skill-pct');
  const target = +bar.dataset.width;
  ScrollTrigger.create({
    trigger: bar, start: 'top 88%',
    onEnter: () => {
      gsap.to(bar, { width: target + '%', duration: 1.4, delay: i * 0.07, ease: 'power3.out' });
      if (pctEl) {
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target, duration: 1.4, delay: i * 0.07, ease: 'power3.out',
          onUpdate() { pctEl.textContent = Math.round(obj.n) + '%'; }
        });
      }
    }
  });
});

/* ── WORK FILTER ── */
(function () {
  const filterBtns = document.querySelectorAll('.wf-btn');
  const workItems  = document.querySelectorAll('.work-item');
  const countEl    = document.querySelector('.work-count');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const toShow = [...workItems].filter(item => f === 'all' || item.dataset.cat === f);
      const toHide = [...workItems].filter(item => f !== 'all' && item.dataset.cat !== f);
      const visible = [...workItems].filter(item => item.style.display !== 'none');

      gsap.killTweensOf([...workItems]);

      gsap.to(visible, {
        opacity: 0,
        y: -10,
        scale: 0.97,
        duration: 0.2,
        ease: 'power2.in',
        overwrite: true,
        onComplete() {
          gsap.set(toHide, { display: 'none' });
          gsap.set(toShow, { display: '', clearProps: 'clipPath', opacity: 0, y: 50, scale: 0.82, rotation: -1.5 });
          gsap.to(toShow, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.65,
            stagger: { amount: 0.4, ease: 'power2.inOut' },
            ease: 'back.out(1.4)',
            overwrite: true,
            onComplete() { gsap.set(toShow, { clearProps: 'transform' }); }
          });
        }
      });

      if (countEl) {
        const count = f === 'all'
          ? workItems.length
          : [...workItems].filter(el => el.dataset.cat === f).length;
        countEl.textContent = String(count).padStart(2, '0') + ' Projects';
      }
    });

    btn.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
    btn.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
  });

  /* 필터 버튼 마그네틱 */
  if (window.matchMedia('(hover: hover)').matches) {
    filterBtns.forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r  = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width  / 2);
        const dy = e.clientY - (r.top  + r.height / 2);
        gsap.to(btn, { x: dx * 0.32, y: dy * 0.32, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' });
      });
    });
  }
})();

/* ── WORK ITEMS — parallax + zoom / clip-path reveal / siblings dim (3개 루프 통합) ── */
(function () {
  const workItems = gsap.utils.toArray('.work-item');

  workItems.forEach((item, i) => {
    const img = item.querySelector('img');

    /* 이미지 패럴렉스 + 줌 */
    gsap.to(img, {
      scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true },
      y: -40, ease: 'none'
    });
    item.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.12, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    });

    /* clip-path 등장 */
    gsap.fromTo(item,
      { clipPath: 'inset(0 0 100% 0)', scale: 0.94, y: 20 },
      {
        scrollTrigger: { trigger: item, start: 'top 88%' },
        clipPath: 'inset(0 0 0% 0)',
        scale: 1, y: 0,
        duration: 0.9, delay: (i % 2) * 0.12, ease: 'power3.out',
        onComplete() { gsap.set(item, { clearProps: 'clipPath,transform' }); }
      }
    );
  });

  /* siblings dim (hover 전용) */
  if (window.matchMedia('(hover: hover)').matches) {
    workItems.forEach(item => {
      const siblings = workItems.filter(el => el !== item);
      item.addEventListener('mouseenter', () => {
        gsap.to(siblings, { opacity: 0.15, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(siblings, { opacity: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
      });
    });
  }
})();

/* ── WORK COUNT — counter ── */
const countEl = document.querySelector('.work-count');
if (countEl) {
  ScrollTrigger.create({
    trigger: countEl, start: 'top 88%',
    onEnter: () => {
      let n = 0;
      const iv = setInterval(() => {
        countEl.textContent = String(++n).padStart(2, '0') + ' Projects';
        if (n >= 9) clearInterval(iv);
      }, 55);
    }
  });
}

/* ── CONTACT TITLE ── */
gsap.from('.contact-title', {
  scrollTrigger: { trigger: '.contact-title', start: 'top 82%' },
  y: 90, opacity: 0, duration: 1.1, ease: 'power3.out'
});

/* ── CONTACT EMAIL SCRAMBLE ── */
/* .email-text span만 타겟팅하여 내부 SVG 아이콘 보존 */
const _emailText = document.querySelector('.contact-email .email-text');
if (_emailText) {
  ScrollTrigger.create({
    trigger: _emailText, start: 'top 88%',
    onEnter: () => scramble(_emailText, _emailText.textContent, 200)
  });
}

/* ── MAGNETIC BUTTON ── */
if (window.matchMedia('(hover: hover)').matches) {
  const btn = document.querySelector('.contact-btn');
  if (btn) {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      gsap.to(btn, { x: dx * 0.38, y: dy * 0.38, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' });
    });
  }
}

/* ── IG FLOAT BUTTON ── */
const igFloat = document.getElementById('ig-float');
if (igFloat) {
  gsap.set(igFloat, { y: 20, opacity: 0 });
  let _igVisible = false;
  lenis.on('scroll', ({ scroll }) => {
    const show = scroll > 300;
    if (show === _igVisible) return;
    _igVisible = show;
    gsap.to(igFloat, show
      ? { y: 0,  opacity: 1, duration: .6, ease: 'power3.out', overwrite: true }
      : { y: 20, opacity: 0, duration: .4, ease: 'power2.in',  overwrite: true }
    );
  });
  igFloat.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
  igFloat.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
  if (window.matchMedia('(hover: hover)').matches) {
    igFloat.addEventListener('mousemove', e => {
      const r  = igFloat.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      gsap.to(igFloat, { x: dx * 0.28, y: dy * 0.28, duration: 0.4, ease: 'power2.out' });
    });
    igFloat.addEventListener('mouseleave', () => {
      gsap.to(igFloat, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' });
    });
  }
}

/* ── IG CTA 버튼 커서 grow ── */
const igBtn = document.querySelector('.ig-btn');
if (igBtn) {
  igBtn.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
  igBtn.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
}

/* ── SECTION LABELS ── */
gsap.utils.toArray('.section-label').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 91%' },
    opacity: 0, x: -50, skewX: -8, duration: .85, ease: 'power3.out'
  });
});

/* ── BACK TO TOP ── */
(function () {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  gsap.set(btn, { y: 20, opacity: 0 });
  let _topBtnVisible = false;
  lenis.on('scroll', ({ scroll }) => {
    const show = scroll > 300;
    if (show === _topBtnVisible) return;
    _topBtnVisible = show;
    gsap.to(btn, show
      ? { y: 0,  opacity: 1, duration: .6, ease: 'power3.out', overwrite: true }
      : { y: 20, opacity: 0, duration: .4, ease: 'power2.in',  overwrite: true }
    );
  });

  btn.addEventListener('click', () => lenis.scrollTo(0, { duration: 1.5 }));
  btn.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
  btn.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
})();

/* ── EMAIL COPY ── */
(function () {
  const btn   = document.getElementById('copy-email');
  const toast = document.getElementById('copy-toast');
  if (!btn) return;
  const EMAIL = 'lim0925lim0925@gmail.com';
  let timer;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = EMAIL; ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove();
    }
    btn.classList.add('copied');
    if (toast) toast.classList.add('visible');
    clearTimeout(timer);
    timer = setTimeout(() => {
      btn.classList.remove('copied');
      if (toast) toast.classList.remove('visible');
    }, 2000);
  });
  btn.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
  btn.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
})();

/* ── EMAILJS 초기화 ── */
// emailjs.com 가입 후 아래 3가지를 교체하세요
const EJS_PUBLIC_KEY  = 'H0kfd0Zd7M7Pj8wVP';
const EJS_SERVICE_ID  = 'service_1devwzh';
const EJS_TEMPLATE_ID = 'template_hcnbben';
emailjs.init({ publicKey: EJS_PUBLIC_KEY });

/* ── CONTACT MODAL ── */
(function () {
  const modal     = document.getElementById('contact-modal');
  const overlay   = modal.querySelector('.modal-overlay');
  const box       = modal.querySelector('.modal-box');
  const closeBtn  = modal.querySelector('.modal-close');
  const openBtn   = document.getElementById('open-contact-modal');
  const form      = document.getElementById('contact-form');
  const success   = modal.querySelector('.form-success');

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    lenis.stop();
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: .35, ease: 'power2.out' });
    gsap.fromTo(box,
      { opacity: 0, y: 36, scale: 0.97 },
      { opacity: 1, y: 0,  scale: 1,    duration: .5, ease: 'power3.out' }
    );
  }

  function closeModal() {
    gsap.to(box,     { opacity: 0, y: 20, scale: 0.97, duration: .3, ease: 'power2.in' });
    gsap.to(overlay, {
      opacity: 0, duration: .3, ease: 'power2.in',
      onComplete() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        lenis.start();
        form.reset();
        form.style.display = '';
        success.style.display = 'none';
        const submitSpan = form.querySelector('[data-i18n="form-submit"]');
        if (submitSpan) submitSpan.innerHTML = (window._i18n[window._lang] || window._i18n.ko)['form-submit'];
      }
    });
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // cursor-grow 모달 버튼에도 적용
  [openBtn, closeBtn, modal.querySelector('.form-submit')].forEach(el => {
    if (!el) return;
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
  });

  // 에러 초기화
  form.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
    el.addEventListener('input', () => el.closest('.form-group').classList.remove('has-error'));
  });

  // EmailJS 비동기 제출
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const L = window._i18n[window._lang] || window._i18n.ko;

    // 커스텀 validation
    let hasError = false;
    form.querySelectorAll('.form-group').forEach(group => {
      const field = group.querySelector('input, textarea');
      const val = field.value.trim();
      const isEmailField = field.type === 'email';
      const isEmpty = val === '';
      const isInvalidEmail = isEmailField && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (isEmpty || isInvalidEmail) {
        group.classList.add('has-error');
        void field.offsetWidth;
        hasError = true;
      }
    });
    if (hasError) return;

    const submitSpan = form.querySelector('[data-i18n="form-submit"]');

    const RATE_KEY = '_cl_last';
    const COOLDOWN = 60000;
    const lastSent = parseInt(localStorage.getItem(RATE_KEY) || '0', 10);
    const remaining = Math.ceil((COOLDOWN - (Date.now() - lastSent)) / 1000);
    if (Date.now() - lastSent < COOLDOWN) {
      submitSpan.textContent = window._lang === 'en' ? `Wait ${remaining}s` : `${remaining}초 후 재시도`;
      setTimeout(() => { submitSpan.textContent = L['form-submit']; }, 2500);
      return;
    }

    submitSpan.textContent = L['form-submitting'];
    try {
      await emailjs.sendForm(EJS_SERVICE_ID, EJS_TEMPLATE_ID, form);
      localStorage.setItem(RATE_KEY, String(Date.now()));
      form.style.display = 'none';
      success.style.display = 'block';
      gsap.from(success, { opacity: 0, y: 16, duration: .5, ease: 'power3.out' });
    } catch {
      submitSpan.textContent = L['form-error'];
    }
  });
})();
