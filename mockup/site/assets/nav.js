// Shared mobile-navigation toggle. Additive only — does not alter any
// existing link, href, or nav structure; only opens/closes the drawer that
// CSS already defines at <=900px, and locks background scroll while open.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.site-header').forEach(function (header) {
    var toggle = header.querySelector('.nav-toggle');
    if (!toggle) return;

    function setOpen(isOpen) {
      header.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('no-scroll', isOpen);
      toggle.querySelector('.nav-toggle-icon-bars').style.display = isOpen ? 'none' : 'block';
      toggle.querySelector('.nav-toggle-icon-x').style.display = isOpen ? 'block' : 'none';
    }

    toggle.addEventListener('click', function () {
      setOpen(!header.classList.contains('is-open'));
    });

    header.querySelectorAll('.site-nav a, .header-actions a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  });
});
