// static/js/script.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) Quitar fallback si el JS cargó correctamente
  document.body.classList.remove('no-js');

  // 2) Referencias de navegación
  const navMenu  = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav__link');
  const header   = document.querySelector('.header');

  // 3) Abrir/cerrar menú móvil (usa la clase .active coherente con el CSS)
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
    });
  }

  // 4) Cerrar menú al hacer clic en cualquier enlace del menú
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
      if (navToggle && navToggle.classList.contains('active')) {
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 5) IntersectionObserver para animar secciones (.section.visible)
  const sections = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animar solo una vez
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(sec => io.observe(sec));
  } else {
    // Fallback si no hay IO
    sections.forEach(sec => sec.classList.add('visible'));
  }

  // 6) Resaltar enlace activo según scroll
  const sectionAnchors = Array.from(document.querySelectorAll('section[id]'));
  const updateActiveNav = () => {
    const scrollPos = window.scrollY + (header ? header.offsetHeight + 10 : 70);
    let currentId = sectionAnchors.length ? sectionAnchors[0].id : null;

    for (const sec of sectionAnchors) {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    }

    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  };
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // 7) Sombra en header al hacer scroll
  const toggleHeaderShadow = () => {
    if (!header) return;
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', toggleHeaderShadow, { passive: true });
  toggleHeaderShadow();
});
