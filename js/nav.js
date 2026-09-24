/**
 * P & S SECURITY SOLUTIONS - MOBILE HAMBURGER NAV
 * Injects a standalone full-screen mobile drawer — completely independent
 * of the desktop .nav-links pill so there are zero conflicts.
 */
(function initMobileNav() {

  function getNavLinks() {
    // Read current page links from the existing desktop nav
    const links = [];
    document.querySelectorAll('.nav-links .nav-link').forEach(function(a) {
      links.push({ href: a.href, text: a.textContent.trim(), active: a.classList.contains('active') });
    });
    // Contact link
    const contact = document.querySelector('.nav-links .btn-contact, .btn-contact');
    return { links, contactHref: contact ? contact.href : 'contact.html' };
  }

  function buildDrawer() {
    const { links, contactHref } = getNavLinks();

    const overlay = document.createElement('div');
    overlay.id = 'mobileNavOverlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Navigation menu');

    // Build inner HTML
    let linksHTML = links.map(function(l) {
      return '<a href="' + l.href + '" class="mnav-link' + (l.active ? ' active' : '') + '">' + l.text + '</a>';
    }).join('');

    overlay.innerHTML = [
      '<div class="mnav-backdrop" id="mnavBackdrop"></div>',
      '<div class="mnav-sheet" id="mnavSheet" role="menu">',
      '  <div class="mnav-handle"></div>',
      '  <nav class="mnav-links">',
      linksHTML,
      '    <a href="' + contactHref + '" class="mnav-contact-btn">',
      '      <span>Contact Us</span>',
      '      <span class="mnav-arrow">',
      '        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">',
      '          <line x1="5" y1="12" x2="19" y2="12"></line>',
      '          <polyline points="12 5 19 12 12 19"></polyline>',
      '        </svg>',
      '      </span>',
      '    </a>',
      '  </nav>',
      '</div>'
    ].join('');

    document.body.appendChild(overlay);

    // Inject CSS once
    if (!document.getElementById('mnavStyle')) {
      const style = document.createElement('style');
      style.id = 'mnavStyle';
      style.textContent = [
        '#mobileNavOverlay {',
        '  display: none;',
        '  position: fixed;',
        '  inset: 0;',
        '  z-index: 9999;',
        '  pointer-events: none;',
        '}',
        '#mobileNavOverlay.is-open {',
        '  display: block;',
        '  pointer-events: none;',
        '}',
        '.mnav-backdrop {',
        '  position: absolute;',
        '  left: 0;',
        '  right: 0;',
        '  top: 74px;',
        '  bottom: 0;',
        '  background: rgba(15, 23, 42, 0.35);',
        '  backdrop-filter: blur(4px);',
        '  -webkit-backdrop-filter: blur(4px);',
        '  opacity: 0;',
        '  transition: opacity 0.28s ease;',
        '  pointer-events: none;',
        '}',
        '#mobileNavOverlay.is-open .mnav-backdrop {',
        '  opacity: 1;',
        '  pointer-events: auto;',
        '}',
        '.mnav-sheet {',
        '  position: absolute;',
        '  left: 12px;',
        '  right: 12px;',
        '  top: 74px;',
        '  background: #ffffff;',
        '  border-radius: 20px;',
        '  box-shadow: 0 8px 48px rgba(15,23,42,0.18), 0 2px 12px rgba(15,23,42,0.08);',
        '  padding: 12px 12px 16px;',
        '  transform: translateY(-20px);',
        '  opacity: 0;',
        '  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;',
        '  display: flex;',
        '  flex-direction: column;',
        '  gap: 0;',
        '  max-height: calc(100vh - 90px);',
        '  overflow-y: auto;',
        '  pointer-events: none;',
        '}',
        '#mobileNavOverlay.is-open .mnav-sheet {',
        '  transform: translateY(0);',
        '  opacity: 1;',
        '  pointer-events: auto;',
        '}',
        '.mnav-handle { display: none; }',
        '.mnav-links {',
        '  display: flex;',
        '  flex-direction: column;',
        '  gap: 2px;',
        '}',
        '.mnav-link {',
        '  display: block;',
        '  padding: 15px 18px;',
        '  border-radius: 14px;',
        '  font-family: inherit;',
        '  font-size: 16px;',
        '  font-weight: 500;',
        '  color: #1e293b;',
        '  text-decoration: none;',
        '  transition: background 0.15s ease, color 0.15s ease;',
        '  letter-spacing: 0.01em;',
        '}',
        '.mnav-link:hover {',
        '  background: #f1f5f9;',
        '  color: #2563eb;',
        '}',
        '.mnav-link.active {',
        '  background: #eff6ff;',
        '  color: #2563eb;',
        '  font-weight: 700;',
        '}',
        '.mnav-contact-btn {',
        '  display: inline-flex;',
        '  align-items: center;',
        '  gap: 10px;',
        '  margin-top: 12px;',
        '  padding: 4px 4px 4px 20px;',
        '  background: #000000;',
        '  color: #ffffff;',
        '  border-radius: 999px;',
        '  font-family: inherit;',
        '  font-size: 15px;',
        '  font-weight: 500;',
        '  text-decoration: none;',
        '  border: 1px solid rgba(0,0,0,0.1);',
        '  box-shadow: 0 2px 10px rgba(0,0,0,0.2);',
        '  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;',
        '  width: fit-content;',
        '  align-self: flex-start;',
        '}',
        '.mnav-contact-btn:hover {',
        '  background: #18181b;',
        '  box-shadow: 0 4px 16px rgba(0,0,0,0.35);',
        '  transform: translateY(-1px);',
        '}',
        '.mnav-arrow {',
        '  width: 32px;',
        '  height: 32px;',
        '  border-radius: 50%;',
        '  background: #ffffff;',
        '  color: #000000;',
        '  display: flex;',
        '  align-items: center;',
        '  justify-content: center;',
        '  flex-shrink: 0;',
        '  transition: transform 0.2s ease;',
        '}',
        '.mnav-contact-btn:hover .mnav-arrow {',
        '  transform: translateX(2px);',
        '}'
      ].join('\n');
      document.head.appendChild(style);
    }

    return overlay;
  }

  function setup() {
    const hamburger = document.getElementById('navHamburger');
    if (!hamburger) return;

    // On mobile only
    function isMobile() { return window.innerWidth <= 991; }

    let overlay = null;

    function openMenu() {
      if (!overlay) {
        overlay = buildDrawer();
        // Wire close on backdrop
        const backdrop = document.getElementById('mnavBackdrop');
        if (backdrop) {
          backdrop.addEventListener('click', closeMenu);
          backdrop.addEventListener('touchend', function(e) {
            e.preventDefault();
            closeMenu();
          });
        }
        // Close on any link click
        overlay.querySelectorAll('.mnav-link, .mnav-contact-btn').forEach(function(a) {
          a.addEventListener('click', closeMenu);
        });
      }
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    function closeMenu() {
      if (overlay) {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
      }
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    function handleToggle(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (hamburger.classList.contains('is-active')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    hamburger.addEventListener('click', handleToggle);
    hamburger.addEventListener('touchend', handleToggle);

    // Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeMenu();
    });

    // Close on resize back to desktop
    window.addEventListener('resize', function() {
      if (!isMobile()) closeMenu();
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();

/**
 * UNIVERSAL SECTION & CARD GROW EFFECT (Scroll Reveal)
 * Matches the Hero Section Grow Animation across all subpages:
 * about.html, services.html, contact.html, testimonials.html, terms.html, privacy-policy.html
 */
(function initSectionGrowAnimations() {
  if (typeof window === 'undefined') return;

  function initGrow() {
    // Only apply on dedicated subpages
    if (!document.body.classList.contains('dedicated-page')) return;

    // Major sections and cards
    const selector = [
      'section:not(.services-hero-section):not(.costa-hero-section)',
      '.section-head-center',
      '.service-catalog-card',
      '.about-trio-card',
      '.about-founder-card',
      '.stat-card-modern',
      '.fan-testimonial-card',
      '.faq-modern-container > *',
      '.location-split-wrap > *',
      '.legal-layout > *',
      '.page-cta-banner'
    ].join(', ');

    const targets = Array.from(document.querySelectorAll(selector));
    if (!targets.length) return;

    // Stagger delay for cards inside grids
    const grids = document.querySelectorAll(
      '.services-catalog-grid, .about-quad-grid, .about-founders-grid, ' +
      '.services-stats-grid, .showcase-cards-track, .faq-accordion-list'
    );
    grids.forEach(function(grid) {
      Array.from(grid.children).forEach(function(child, idx) {
        child.setAttribute('data-stagger', String((idx % 6) + 1));
      });
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function(el) {
        el.classList.add('reveal-grow', 'is-grown');
      });
      return;
    }

    const observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-grown');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(function(el) {
      el.classList.add('reveal-grow');
      // If already within initial screen, grow immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        requestAnimationFrame(function() {
          el.classList.add('is-grown');
        });
      } else {
        observer.observe(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGrow);
  } else {
    initGrow();
  }
})();

