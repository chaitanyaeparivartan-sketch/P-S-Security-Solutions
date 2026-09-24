/**
 * P & S SECURITY SOLUTIONS - APPLE-GRADE CANVAS WEBP IMAGE SEQUENCE ENGINE
 * Ultra-smooth, zero-latency frame scrubbing on HTML5 Canvas
 */

document.addEventListener('DOMContentLoaded', () => {
  // Chapter 1 Logo Zoom Elements
  const logoZoomOverlay    = document.getElementById('logoZoomOverlay');
  const zoomMaskLayer      = document.getElementById('zoomMaskLayer');
  const zoomSolidLayer     = document.getElementById('zoomSolidLayer');
  const zoomTextLayer      = document.getElementById('zoomTextLayer');
  const introScrollPrompt  = document.getElementById('introScrollPrompt');
  const introTagline       = document.getElementById('introTagline');
  const hudOverlay1        = document.getElementById('hudOverlay1');
  const mainNavbar         = document.getElementById('main-navbar');

  // Drive the hero navbar with a 0-1 opacity + optional translateY offset
  // Drive the hero navbar with a 0-1 opacity + optional translateY offset
  function setNavbarOpacity(opacity, translateY) {
    if (!mainNavbar) return;
    // On mobile screens, keep navbar permanently interactive and visible
    if (window.innerWidth <= 991) {
      mainNavbar.style.opacity = '1';
      mainNavbar.style.pointerEvents = 'auto';
      mainNavbar.style.transform = 'none';
      return;
    }
    const clamped = Math.min(1, Math.max(0, opacity));
    mainNavbar.style.opacity       = clamped.toFixed(3);
    mainNavbar.style.pointerEvents = clamped > 0.05 ? 'auto' : 'none';
    mainNavbar.style.transform     = `translateY(${(translateY || 0).toFixed(1)}px)`;
  }

  // Chapters configuration for WebP frame sequences (numbered 1 to 5, 30fps / 300 frames)
  const chapters = [
    {
      id: 'security',
      container: document.getElementById('chapter-security'),
      canvas: document.getElementById('canvas1'),
      folder: 'assets/frames/1',
      totalFrames: 300,
      isIntro: true,
      images: [],
      loaded: [],
      targetProgress: 0,
      currentProgress: 0,
      currentFrameIndex: -1,
      lastDrawnIndex: -1,
      ctx: null
    },
    {
      id: 'climate',
      container: document.getElementById('chapter-climate'),
      canvas: document.getElementById('canvas2'),
      folder: 'assets/frames/2',
      totalFrames: 300,
      isIntro: false,
      images: [],
      loaded: [],
      targetProgress: 0,
      currentProgress: 0,
      currentFrameIndex: -1,
      lastDrawnIndex: -1,
      ctx: null
    },
    {
      id: 'living',
      container: document.getElementById('chapter-living'),
      canvas: document.getElementById('canvas3'),
      folder: 'assets/frames/3',
      totalFrames: 300,
      isIntro: false,
      images: [],
      loaded: [],
      targetProgress: 0,
      currentProgress: 0,
      currentFrameIndex: -1,
      lastDrawnIndex: -1,
      ctx: null
    },
    {
      id: 'hazard',
      container: document.getElementById('chapter-hazard'),
      canvas: document.getElementById('canvas4'),
      folder: 'assets/frames/4',
      totalFrames: 300,
      isIntro: false,
      images: [],
      loaded: [],
      targetProgress: 0,
      currentProgress: 0,
      currentFrameIndex: -1,
      lastDrawnIndex: -1,
      ctx: null
    },
    {
      id: 'network',
      container: document.getElementById('chapter-network'),
      canvas: document.getElementById('canvas5'),
      folder: 'assets/frames/5',
      totalFrames: 300,
      isIntro: false,
      images: [],
      loaded: [],
      targetProgress: 0,
      currentProgress: 0,
      currentFrameIndex: -1,
      lastDrawnIndex: -1,
      ctx: null
    },
    {
      id: 'access',
      container: document.getElementById('chapter-access'),
      canvas: document.getElementById('canvas6'),
      folder: 'assets/frames/6',
      totalFrames: 300,
      isIntro: false,
      images: [],
      loaded: [],
      targetProgress: 0,
      currentProgress: 0,
      currentFrameIndex: -1,
      lastDrawnIndex: -1,
      ctx: null
    }
  ];

  // Helper to format frame path
  function getFramePath(folder, index) {
    const padded = String(index + 1).padStart(4, '0');
    return `${folder}/f_${padded}.webp`;
  }

  // Draw specific frame onto canvas with instant paint
  function drawFrame(chapter, index) {
    if (!chapter.ctx || index < 0 || index >= chapter.totalFrames) return;

    chapter.currentFrameIndex = index;

    const img = chapter.images[index];
    if (img && chapter.loaded[index]) {
      if (chapter.lastDrawnIndex !== index) {
        chapter.ctx.drawImage(img, 0, 0, chapter.canvas.width, chapter.canvas.height);
        chapter.lastDrawnIndex = index;
      }
      return;
    }

    // Find nearest loaded frame to avoid any blank flash
    for (let offset = 1; offset < chapter.totalFrames; offset++) {
      const prev = index - offset;
      if (prev >= 0 && chapter.loaded[prev]) {
        if (chapter.lastDrawnIndex !== prev) {
          chapter.ctx.drawImage(chapter.images[prev], 0, 0, chapter.canvas.width, chapter.canvas.height);
          chapter.lastDrawnIndex = prev;
        }
        return;
      }
      const next = index + offset;
      if (next < chapter.totalFrames && chapter.loaded[next]) {
        if (chapter.lastDrawnIndex !== next) {
          chapter.ctx.drawImage(chapter.images[next], 0, 0, chapter.canvas.width, chapter.canvas.height);
          chapter.lastDrawnIndex = next;
        }
        return;
      }
    }
  }

  // Initialize Canvas contexts and frame preloading
  chapters.forEach((chapter, chapterIndex) => {
    if (!chapter.canvas) return;

    // On mobile devices, optimize canvas buffer resolution to prevent GPU memory starvation
    if (window.innerWidth <= 768 && chapter.canvas.width > 1920) {
      chapter.canvas.width = 1920;
      chapter.canvas.height = 1080;
    }

    // Cache HUD overlay elements for scroll-driven staged reveal
    chapter.hudTitle = chapter.container ? chapter.container.querySelector('.hud-title') : null;
    chapter.hudDescs = chapter.container ? Array.from(chapter.container.querySelectorAll('.hud-desc')) : [];

    // Get 2D rendering context optimized for full opaque scenes
    chapter.ctx = chapter.canvas.getContext('2d', { alpha: false });
    chapter.images = new Array(chapter.totalFrames);
    chapter.loaded = new Array(chapter.totalFrames).fill(false);

    // Preload frame 0 immediately and render to canvas
    const firstImg = new Image();
    firstImg.src = getFramePath(chapter.folder, 0);
    firstImg.onload = () => {
      chapter.loaded[0] = true;
      if (chapter.currentFrameIndex === -1) {
        chapter.ctx.drawImage(firstImg, 0, 0, chapter.canvas.width, chapter.canvas.height);
        chapter.currentFrameIndex = 0;
        chapter.lastDrawnIndex = 0;
      }
    };
    chapter.images[0] = firstImg;

    // Progressive non-blocking loading pipeline (in idle batches so network and UI never stutter)
    function loadRemainingFrames() {
      let currentIdx = 1;
      const batchSize = 6;

      function loadBatch() {
        if (currentIdx >= chapter.totalFrames) return;
        const end = Math.min(currentIdx + batchSize, chapter.totalFrames);
        for (let i = currentIdx; i < end; i++) {
          const img = new Image();
          img.src = getFramePath(chapter.folder, i);
          const frameIdx = i;
          img.onload = () => {
            chapter.loaded[frameIdx] = true;
            const neededIndex = Math.min(
              Math.max(Math.round(chapter.currentProgress * (chapter.totalFrames - 1)), 0),
              chapter.totalFrames - 1
            );
            if (neededIndex === frameIdx) {
              chapter.ctx.drawImage(img, 0, 0, chapter.canvas.width, chapter.canvas.height);
              chapter.lastDrawnIndex = frameIdx;
              chapter.currentFrameIndex = frameIdx;
            }
          };
          chapter.images[i] = img;
        }
        currentIdx = end;
        if (currentIdx < chapter.totalFrames) {
          if ('requestIdleCallback' in window) {
            requestIdleCallback(loadBatch, { timeout: 150 });
          } else {
            setTimeout(loadBatch, 40);
          }
        }
      }

      loadBatch();
    }

    // Chapter 1 loads after initial paint so hero rendering is 100% fluid
    if (chapterIndex === 0) {
      setTimeout(loadRemainingFrames, 250);
    } else {
      // Subsequent chapters load with idle stagger so they never contend with hero
      setTimeout(loadRemainingFrames, 1500 + chapterIndex * 500);
    }
  });

  // Staged scroll-driven HUD reveal: Title first, then Description paragraphs, then smooth exit
  function updateChapterHUD(chapter, prog) {
    if (!chapter.hudTitle && (!chapter.hudDescs || chapter.hudDescs.length === 0)) return;

    const isMobile = window.innerWidth <= 991;
    const startProg = isMobile ? 0.01 : 0.04;

    let titleOpacity = 0;
    let titleY = 28;
    let desc1Opacity = 0;
    let desc1Y = 24;
    let desc2Opacity = 0;
    let desc2Y = 24;

    if (prog <= startProg) {
      // 0. Initial state: completely hidden
      titleOpacity = 0;
      titleY = 28;
      desc1Opacity = 0;
      desc1Y = 24;
      desc2Opacity = 0;
      desc2Y = 24;
    } else if (prog < 0.76) {
      // 1. Title reveals first by scroll
      const titleReveal = Math.min(1, Math.max(0, (prog - startProg) / 0.18));
      titleOpacity = titleReveal;
      titleY = 28 * (1 - titleReveal);

      // 2. First description paragraph reveals next by scroll
      const desc1Reveal = Math.min(1, Math.max(0, (prog - (startProg + 0.12)) / 0.18));
      desc1Opacity = desc1Reveal;
      desc1Y = 24 * (1 - desc1Reveal);

      // 3. Second description paragraph reveals smoothly after paragraph 1
      const desc2Reveal = Math.min(1, Math.max(0, (prog - (startProg + 0.22)) / 0.18));
      desc2Opacity = desc2Reveal;
      desc2Y = 24 * (1 - desc2Reveal);
    } else if (prog < 0.94) {
      // 4. Smooth exit as next white section card slides over (0.76 -> 0.94)
      const exitProg = Math.min(1, Math.max(0, (prog - 0.76) / 0.18));
      const exitFade = Math.max(0, 1 - exitProg);
      titleOpacity = exitFade;
      titleY = -28 * exitProg;
      desc1Opacity = exitFade;
      desc1Y = -24 * exitProg;
      desc2Opacity = exitFade;
      desc2Y = -24 * exitProg;
    } else {
      // 5. Fully cleared
      titleOpacity = 0;
      titleY = -28;
      desc1Opacity = 0;
      desc1Y = -24;
      desc2Opacity = 0;
      desc2Y = -24;
    }

    if (chapter.hudTitle) {
      chapter.hudTitle.style.opacity = titleOpacity.toFixed(3);
      chapter.hudTitle.style.transform = `translate3d(0, ${titleY.toFixed(1)}px, 0)`;
    }

    if (chapter.hudDescs && chapter.hudDescs.length > 0) {
      if (chapter.hudDescs[0]) {
        chapter.hudDescs[0].style.opacity = desc1Opacity.toFixed(3);
        chapter.hudDescs[0].style.transform = `translate3d(0, ${desc1Y.toFixed(1)}px, 0)`;
      }
      for (let i = 1; i < chapter.hudDescs.length; i++) {
        chapter.hudDescs[i].style.opacity = desc2Opacity.toFixed(3);
        chapter.hudDescs[i].style.transform = `translate3d(0, ${desc2Y.toFixed(1)}px, 0)`;
      }
    }
  }

  // Calculate target scrub progress and logo zoom on scroll
  function onScroll() {
    const windowHeight = window.innerHeight;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const isMobile = window.innerWidth <= 991;
    const zoomDistance = isMobile ? windowHeight * 0.75 : windowHeight * 1.1;

    // Sticky navbar persistence: ensure navbar stays 100% visible once past the intro zoom
    if (scrollY >= zoomDistance) {
      setNavbarOpacity(1, 0);
    }

    chapters.forEach((chapter) => {
      if (!chapter.container || !chapter.canvas) return;

      const rect = chapter.container.getBoundingClientRect();

      // Skip offscreen chapters
      if (rect.bottom < -100 || rect.top > windowHeight + 100) {
        return;
      }

      const spacer = chapter.container.querySelector('.scrub-track-spacer');
      const totalSpacerHeight = spacer ? spacer.offsetHeight : windowHeight * 1.5;
      const scrolled = -rect.top;

      // Special handling for Chapter 1: Initial Logo Zoom Reveal -> Canvas Sequence -> Slide-Over Card
      if (chapter.isIntro && logoZoomOverlay && zoomMaskLayer && zoomSolidLayer) {
        const sequenceScrubDistance = Math.max(totalSpacerHeight - zoomDistance, windowHeight * 0.8);

        if (scrolled <= 0) {
          // 1. Initial State: White logo screen — navbar fully hidden
          logoZoomOverlay.style.display = 'flex';
          logoZoomOverlay.style.opacity = '1';
          zoomSolidLayer.style.opacity = '1';
          zoomMaskLayer.style.opacity = '1';
          zoomMaskLayer.style.transform = 'scale(1)';
          zoomSolidLayer.style.transform = 'scale(1)';
          if (zoomTextLayer) {
            zoomTextLayer.style.opacity = '1';
            zoomTextLayer.style.transform = 'scale(1)';
          }
          if (introScrollPrompt) introScrollPrompt.style.opacity = '1';
          if (introTagline) introTagline.style.opacity = '1';
          if (hudOverlay1) hudOverlay1.style.opacity = '0';
          chapter.targetProgress = 0;
          updateChapterHUD(chapter, 0);
          setNavbarOpacity(0, -12);
        } else if (scrolled < zoomDistance) {
          // 2. Zooming in: Solid logo crossfades to transparent mask revealing Canvas sequence
          const zoomProg = scrolled / zoomDistance;

          logoZoomOverlay.style.display = 'flex';

          // Prompt fades out quickly
          if (introScrollPrompt) {
            introScrollPrompt.style.opacity = `${Math.max(0, 1 - zoomProg * 3.5)}`;
          }

          // Solid logo crossfades, revealing canvas through transparent logo cutout
          const solidAlpha = Math.max(0, 1.0 - (zoomProg / 0.28));
          zoomSolidLayer.style.opacity = `${solidAlpha.toFixed(3)}`;

          // Exponential scale zoom into the logo cutout
          const currentScale = 1.0 + Math.pow(zoomProg, 2.2) * 46.0;
          zoomMaskLayer.style.transform = `scale(${currentScale.toFixed(3)})`;
          zoomSolidLayer.style.transform = `scale(${currentScale.toFixed(3)})`;

          // Tagline zooms and crossfades in exact sync with the logo
          if (zoomTextLayer) {
            zoomTextLayer.style.opacity = `${solidAlpha.toFixed(3)}`;
            zoomTextLayer.style.transform = `scale(${currentScale.toFixed(3)})`;
          }

          // Fade out remaining mask borders as scale clears screen
          if (zoomProg > 0.75) {
            const revealProg = (zoomProg - 0.75) / 0.25;  // 0 → 1 as zoom finishes
            const maskFade = Math.max(0, 1.0 - revealProg);
            logoZoomOverlay.style.opacity = `${maskFade.toFixed(3)}`;
            if (hudOverlay1) {
              hudOverlay1.style.opacity = '1';
            }
            // Navbar slides in from -12px to 0 in exact sync with the reveal
            const navY = -12 * (1 - revealProg);
            setNavbarOpacity(revealProg, navY);
          } else {
            logoZoomOverlay.style.opacity = '1';
            if (hudOverlay1) hudOverlay1.style.opacity = '0';
            setNavbarOpacity(0, -12);
          }

          chapter.targetProgress = 0;
          updateChapterHUD(chapter, 0);
        } else if (scrolled < totalSpacerHeight) {
          // 3. Video scrubbing — navbar fully visible, title & description reveal by scroll
          logoZoomOverlay.style.display = 'none';
          if (hudOverlay1) hudOverlay1.style.opacity = '1';
          setNavbarOpacity(1, 0);

          const scrubScrolled = scrolled - zoomDistance;
          chapter.targetProgress = Math.min(Math.max(scrubScrolled / sequenceScrubDistance, 0), 1);
          updateChapterHUD(chapter, chapter.targetProgress);
        } else {
          // 4. Last frame locked — navbar stays (gets covered by white card sliding over)
          logoZoomOverlay.style.display = 'none';
          if (hudOverlay1) hudOverlay1.style.opacity = '1';
          setNavbarOpacity(1, 0);
          chapter.targetProgress = 1.0;
          updateChapterHUD(chapter, 1.0);
        }
      } else {
        // Standard Chapters (2, 3, 4, 5, 6): Scrub -> Lock Last Frame -> Slide-Over Card
        if (scrolled <= 0) {
          chapter.targetProgress = 0;
          updateChapterHUD(chapter, 0);
        } else if (scrolled < totalSpacerHeight) {
          chapter.targetProgress = Math.min(Math.max(scrolled / totalSpacerHeight, 0), 1);
          updateChapterHUD(chapter, chapter.targetProgress);
        } else {
          // Locked at final frame
          chapter.targetProgress = 1.0;
          updateChapterHUD(chapter, 1.0);
        }
      }
    });
  }

  // Smooth lerp loop with requestAnimationFrame for 60fps frame painting
  function renderLoop() {
    chapters.forEach((chapter) => {
      if (!chapter.canvas || !chapter.ctx) return;

      const rect = chapter.container.getBoundingClientRect();
      // Skip offscreen chapters
      if (rect.bottom < -150 || rect.top > window.innerHeight + 150) {
        return;
      }

      // Smooth lerp interpolation for silky scroll response
      const diff = chapter.targetProgress - chapter.currentProgress;
      if (Math.abs(diff) > 0.0008) {
        chapter.currentProgress += diff * 0.22; // Responsive Apple-grade lerp factor
        chapter.currentProgress = Math.max(0, Math.min(chapter.currentProgress, 1.0));

        // Calculate target frame index
        const targetIndex = Math.min(
          Math.max(Math.round(chapter.currentProgress * (chapter.totalFrames - 1)), 0),
          chapter.totalFrames - 1
        );

        if (targetIndex !== chapter.currentFrameIndex) {
          drawFrame(chapter, targetIndex);
        }

        // Keep HUD title & description reveal in silky sync with the frame scrubbing
        updateChapterHUD(chapter, chapter.currentProgress);
      }
    });

    requestAnimationFrame(renderLoop);
  }

  // Interactive Scene Pills in Living section
  const scenePills = document.querySelectorAll('.scene-pill');
  scenePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      scenePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Attach Scroll & Resize Listeners
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial trigger
  onScroll();
  requestAnimationFrame(renderLoop);

  // ========================================================
  // Navbar Active State (Home remains active on index.html)
  // ========================================================
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  const homeLink = document.getElementById('nav-home');
  if (homeLink) {
    navLinks.forEach(l => l.classList.remove('active'));
    homeLink.classList.add('active');
  }

  // ========================================================
  // Direct Home Redirection & Initial Auto-Scroll to CCTV Hero
  // ========================================================
  let isAutoScrolling = false;

  function stopAutoScroll() {
    isAutoScrolling = false;
  }

  // Cancel auto-scroll if user starts manually interacting
  window.addEventListener('wheel', stopAutoScroll, { passive: true });
  window.addEventListener('touchmove', stopAutoScroll, { passive: true });
  window.addEventListener('touchstart', stopAutoScroll, { passive: true });
  window.addEventListener('pointerdown', stopAutoScroll, { passive: true });
  window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].includes(e.code)) {
      stopAutoScroll();
    }
  }, { passive: true });

  function scrollToHomeCCTV(smooth = true, duration = 750) {
    const isMobile = window.innerWidth <= 991;
    const zoomDist = isMobile ? window.innerHeight * 0.75 : window.innerHeight * 1.1;
    const targetY = Math.round(zoomDist + (isMobile ? 15 : 30));

    if (!smooth) {
      window.scrollTo(0, targetY);
      if (logoZoomOverlay) logoZoomOverlay.style.display = 'none';
      if (hudOverlay1) hudOverlay1.style.opacity = '1';
      setNavbarOpacity(1, 0);
      onScroll();
      return;
    }

    const startY = window.pageYOffset || document.documentElement.scrollTop;
    if (Math.abs(targetY - startY) < 5) {
      window.scrollTo(0, targetY);
      if (logoZoomOverlay) logoZoomOverlay.style.display = 'none';
      if (hudOverlay1) hudOverlay1.style.opacity = '1';
      setNavbarOpacity(1, 0);
      onScroll();
      return;
    }

    isAutoScrolling = true;
    const distance = targetY - startY;
    let startTime = null;

    function step(currentTime) {
      if (!isAutoScrolling) return;
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeInOutCubic for a brisk yet silky glide
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + (distance * ease));
      onScroll();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isAutoScrolling = false;
        window.scrollTo(0, targetY);
        if (logoZoomOverlay) logoZoomOverlay.style.display = 'none';
        if (hudOverlay1) hudOverlay1.style.opacity = '1';
        setNavbarOpacity(1, 0);
        onScroll();
      }
    }

    requestAnimationFrame(step);
  }

  // When the Page initially renders:
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const currentHash = window.location.hash;
  const isTargetingHero = !currentHash || currentHash === '#home' || currentHash === '#cctv' || currentHash === '#top';

  if (isTargetingHero) {
    // Start cleanly at top so the logo zoom reveal starts from frame 0
    window.scrollTo(0, 0);
    onScroll();

    // Trigger smooth, brisk auto-scroll that plays the logo zoom animation
    setTimeout(() => {
      scrollToHomeCCTV(true, 750);
    }, 120);
  }

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#home' || window.location.hash === '#cctv') {
      scrollToHomeCCTV(true, 550);
    }
  });

  // When clicking Home nav link on index.html
  if (homeLink) {
    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      // If already at or past the hero, smoothly glide to CCTV hero
      scrollToHomeCCTV(true, 550);
    });
  }

  // When clicking navbar Logo on index.html: replay the logo zoom animation
  const navLogo = document.getElementById('nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo(0, 0);
      onScroll();
      setTimeout(() => {
        scrollToHomeCCTV(true, 750);
      }, 100);
    });
  }
});

