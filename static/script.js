document.addEventListener('DOMContentLoaded', () => {

  /* ---- mobile menu ---- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }));

  /* ---- active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const setActive = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', setActive);
  setActive();

  /* ---- reveal on scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---- stat counters ---- */
  const counters = [
    { id: 'statYears', target: 14 },
    { id: 'statHorses', target: 28 },
    { id: 'statMembers', target: 210 },
    { id: 'statHectare', target: 12 }
  ];
  let counted = false;
  const runCounters = () => {
    if (counted) return;
    counted = true;
    counters.forEach(c => {
      const el = document.getElementById(c.id);
      let val = 0;
      const step = Math.max(1, Math.round(c.target / 40));
      const timer = setInterval(() => {
        val += step;
        if (val >= c.target) { val = c.target; clearInterval(timer); }
        el.textContent = val.toLocaleString('fa-IR');
      }, 30);
    });
  };
  const heroStats = document.querySelector('.hero-stats');
  const statsIo = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) runCounters(); });
  }, { threshold: 0.4 });
  statsIo.observe(heroStats);

  /* ---- instructors render ---- */
  const instructors = [
    { name: 'شیوا مرادی', role: 'مربی ارشد درساژ', hue: '#7A4A25' },
    { name: 'آرش کیانی', role: 'مربی پرش با مانع', hue: '#5C2A2A' },
    { name: 'نگار صالحی', role: 'مربی سوارکاری کودکان', hue: '#2F4A2A' },
    { name: 'بابک رستمی', role: 'کارشناس اسب‌درمانی', hue: '#B8892B' }
  ];
  const row = document.getElementById('instructorsRow');
  row.innerHTML = instructors.map(p => `
    <div class="instructor">
      <div class="instructor-photo" style="background:linear-gradient(155deg, ${p.hue}, #1B140F);">
        <svg viewBox="0 0 200 260" width="100%" height="100%">
          <circle cx="100" cy="90" r="42" fill="#F3EAD9" opacity="0.9"/>
          <path d="M40 260c0-50 27-90 60-90s60 40 60 90z" fill="#F3EAD9" opacity="0.9"/>
        </svg>
      </div>
      <h4>${p.name}</h4>
      <span>${p.role}</span>
    </div>
  `).join('');

  /* ---- testimonial slider ---- */
  const testimonials = [
    { q: 'پسرم شش‌ماهه هر جمعه بی‌قرار منتظر جلسهٔ سوارکاریش هست. مربی‌ها با صبر زیادی با بچه‌ها کار می‌کنند.', a: 'مادر یکی از اعضای دورهٔ کودکان' },
    { q: 'بعد از دو سال تمرین در الوند، اولین مقام مسابقات درساژ استانی رو گرفتم. برنامه‌ریزی مربی ارشد فوق‌العاده دقیق بود.', a: 'عضو دورهٔ درساژ رقابتی' },
    { q: 'میدان استاندارد و اسب‌های آرام باعث شد بعد از سال‌ها ترس، دوباره اعتماد به نفسم رو برای سوارشدن پیدا کنم.', a: 'عضو دورهٔ عمومی بزرگسالان' }
  ];
  const qEl = document.getElementById('testiQuote');
  const aEl = document.getElementById('testiAuthor');
  const dotsEl = document.getElementById('testiDots');
  let ti = 0;
  const renderTesti = () => {
    qEl.style.opacity = 0;
    setTimeout(() => {
      qEl.textContent = '«' + testimonials[ti].q + '»';
      aEl.textContent = testimonials[ti].a;
      qEl.style.opacity = 1;
      [...dotsEl.children].forEach((d, i) => d.classList.toggle('active', i === ti));
    }, 200);
  };
  dotsEl.innerHTML = testimonials.map((_, i) => `<button data-i="${i}"></button>`).join('');
  dotsEl.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    ti = +b.dataset.i; renderTesti();
  }));
  renderTesti();
  setInterval(() => { ti = (ti + 1) % testimonials.length; renderTesti(); }, 6000);

  /* ---- form ---- */
  const form = document.getElementById('regForm');
  const msg = document.getElementById('formMsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fname').value.trim();
    const phone = document.getElementById('fphone').value.trim();
    if (!name || !phone) {
      msg.textContent = 'لطفاً نام و شمارهٔ تماس را وارد کنید.';
      msg.className = 'form-msg';
      return;
    }
    msg.textContent = `ممنون ${name}! درخواست شما ثبت شد، به‌زودی با شما تماس می‌گیریم.`;
    msg.className = 'form-msg ok';
    form.reset();
  });

  /* ---- header shadow on scroll ---- */
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 20 ? '0 8px 24px rgba(27,20,15,0.08)' : 'none';
  });

});