// Minimum motion pass: scroll-triggered section reveals.
// Progressive enhancement only - if this script fails to load or run,
// no .js-reveal class is ever added and every section stays at its
// normal, fully-visible state (see the CSS comment in styles.css).
document.addEventListener('DOMContentLoaded', function () {
  // Respect prefers-reduced-motion even if CSS somehow loads out of order.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var sections = document.querySelectorAll('main > section');
  if (sections.length < 2) return; // nothing to stagger beyond a single hero

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  sections.forEach(function (section, i) {
    if (i === 0) return; // first section is the hero; it has its own load-in animation
    // Anything already on screen at load (e.g. a short section sitting right
    // under a compact hero/step-indicator) must never be given the reveal
    // treatment - fading it in over 0.6s would flash already-visible content
    // (including live form fields) to near-invisible right after load.
    if (section.getBoundingClientRect().top < window.innerHeight) return;
    section.classList.add('js-reveal');
    section.style.transitionDelay = (Math.min(i, 4) * 40) + 'ms';
    io.observe(section);
  });
});
