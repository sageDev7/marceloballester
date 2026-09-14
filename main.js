document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mobNav = document.getElementById('mobNav');
  const mobOverlay = document.getElementById('mobOverlay');
  const fabWrap = document.getElementById('fabWrap');

  function updateHeaderScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  function openNav() { mobNav.classList.add('open'); mobOverlay.classList.add('open'); hamburger.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function closeNav() { mobNav.classList.remove('open'); mobOverlay.classList.remove('open'); hamburger.classList.remove('is-open'); document.body.style.overflow = ''; }
  hamburger.addEventListener('click', () => mobNav.classList.contains('open') ? closeNav() : openNav());
  mobOverlay.addEventListener('click', closeNav);
  mobNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobNav.classList.contains('open')) closeNav();
  });

  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  const siteFooter = document.querySelector('footer');
  let footerVisible = false;
  function updateFloats() {
    const y = window.scrollY;
    fabWrap.classList.toggle('visible', y > window.innerHeight * 0.5 && !footerVisible);
  }
  window.addEventListener('scroll', updateFloats, { passive: true });
  updateFloats();
  if (siteFooter && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach(e => { footerVisible = e.isIntersecting; });
      updateFloats();
    }, { threshold: 0 }).observe(siteFooter);
  }

  const redes = document.getElementById('redes');
  if (redes && 'IntersectionObserver' in window) {
    const loadInstagramEmbed = () => {
      if (document.getElementById('ig-embed-script')) return;
      const s = document.createElement('script');
      s.id = 'ig-embed-script';
      s.async = true;
      s.src = 'https://www.instagram.com/embed.js';
      document.body.appendChild(s);
    };
    new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { loadInstagramEmbed(); obs.disconnect(); } });
    }, { rootMargin: '400px' }).observe(redes);
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .15 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }
});
