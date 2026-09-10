/**
 * SENTINEL CORE - APPLE-GRADE CANVAS WEBP IMAGE SEQUENCE ENGINE
 * Ultra-smooth, zero-latency frame scrubbing on HTML5 Canvas
 */

document.addEventListener('DOMContentLoaded', () => {
  // Chapter 1 Logo Zoom Elements
  const logoZoomOverlay = document.getElementById('logoZoomOverlay');
  const zoomMaskLayer = document.getElementById('zoomMaskLayer');
  const zoomSolidLayer = document.getElementById('zoomSolidLayer');
  const introScrollPrompt = document.getElementById('introScrollPrompt');
  const hudOverlay1 = document.getElementById('hudOverlay1');

  // Chapters configuration for WebP frame sequences
  const chapters = [
    {
      id: 'security',
      container: document.getElementById('chapter-security'),
      canvas: document.getElementById('canvas1'),
      folder: 'frames/cctv',
      totalFrames: 150,
      isIntro: true,
      images: [],
      loaded: [],
      targetProgress: 0,
      currentProgress: 0,
      currentFrameIndex: -1,
      ctx: null
    },
    {
      id: 'climate',
      container: document.getElementById('chapter-climate'),
      canvas: document.getElementById('canvas2'),
      folder: 'frames/fan',
      totalFrames: 150,
      isIntro: false,
      images: [],
      loaded: [],
      targetProgress: 0,
      currentProgress: 0,
      currentFrameIndex: -1,
      ctx: null
    },
    {
      id: 'hazard',
      container: document.getElementById('chapter-hazard'),
      canvas: document.getElementById('canvas3'),
      folder: 'frames/stove',
      totalFrames: 150,
      isIntro: false,
      images: [],
      loaded: [],
      targetProgress: 0,
      currentProgress: 0,
      currentFrameIndex: -1,
      ctx: null
    },
    {
      id: 'living',
      container: document.getElementById('chapter-living'),
      canvas: document.getElementById('canvas4'),
      folder: 'frames/sofa',
      totalFrames: 150,
      isIntro: false,
      images: [],
      loaded: [],
      targetProgress: 0,
      currentProgress: 0,
      currentFrameIndex: -1,
      ctx: null
    },
    {
      id: 'network',
      container: document.getElementById('chapter-network'),
      canvas: document.getElementById('canvas5'),
      folder: 'frames/network',
      totalFrames: 150,
      isIntro: false,
      images: [],
      loaded: [],
      targetProgress: 0,
      currentProgress: 0,
      currentFrameIndex: -1,
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

    const img = chapter.images[index];
    if (img && chapter.loaded[index]) {
      chapter.ctx.drawImage(img, 0, 0, chapter.canvas.width, chapter.canvas.height);
      chapter.currentFrameIndex = index;
    } else {
      // Find nearest loaded frame to avoid any blank flash
      for (let offset = 1; offset < chapter.totalFrames; offset++) {
        const prev = index - offset;
        if (prev >= 0 && chapter.loaded[prev]) {
          chapter.ctx.drawImage(chapter.images[prev], 0, 0, chapter.canvas.width, chapter.canvas.height);
          break;
        }
        const next = index + offset;
        if (next < chapter.totalFrames && chapter.loaded[next]) {
          chapter.ctx.drawImage(chapter.images[next], 0, 0, chapter.canvas.width, chapter.canvas.height);
          break;
        }
      }
    }
  }

  // Initialize Canvas contexts and frame preloading
  chapters.forEach((chapter, chapterIndex) => {
    if (!chapter.canvas) return;

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
      }
    };
    chapter.images[0] = firstImg;

    // Progressive loading pipeline
    function loadRemainingFrames() {
      for (let i = 1; i < chapter.totalFrames; i++) {
        const img = new Image();
        img.src = getFramePath(chapter.folder, i);
        const frameIdx = i;
        img.onload = () => {
          chapter.loaded[frameIdx] = true;
          // If we are currently holding on this exact frame, paint it
          const neededIndex = Math.min(
            Math.max(Math.round(chapter.currentProgress * (chapter.totalFrames - 1)), 0),
            chapter.totalFrames - 1
          );
          if (neededIndex === frameIdx) {
            chapter.ctx.drawImage(img, 0, 0, chapter.canvas.width, chapter.canvas.height);
            chapter.currentFrameIndex = frameIdx;
          }
        };
        chapter.images[i] = img;
      }
    }

    // Load Chapter 1 immediately, schedule other chapters with slight staggered delay
    if (chapterIndex === 0) {
      loadRemainingFrames();
    } else {
      setTimeout(loadRemainingFrames, chapterIndex * 250);
    }
  });

  // Calculate target scrub progress and logo zoom on scroll
  function onScroll() {
    const windowHeight = window.innerHeight;

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
        const zoomDistance = windowHeight * 1.1;
        const sequenceScrubDistance = Math.max(totalSpacerHeight - zoomDistance, windowHeight);

        if (scrolled <= 0) {
          // 1. Initial State: Small Centered Logo on White Canvas
          logoZoomOverlay.style.display = 'flex';
          logoZoomOverlay.style.opacity = '1';
          zoomSolidLayer.style.opacity = '1';
          zoomMaskLayer.style.opacity = '1';
          zoomMaskLayer.style.transform = 'scale(1)';
          zoomSolidLayer.style.transform = 'scale(1)';
          if (introScrollPrompt) introScrollPrompt.style.opacity = '1';
          if (hudOverlay1) hudOverlay1.style.opacity = '0';
          chapter.targetProgress = 0;
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

          // Fade out remaining mask borders as scale clears screen
          if (zoomProg > 0.75) {
            const maskFade = Math.max(0, (1.0 - zoomProg) / 0.25);
            logoZoomOverlay.style.opacity = `${maskFade.toFixed(3)}`;
            if (hudOverlay1) {
              hudOverlay1.style.opacity = `${Math.min(1, (zoomProg - 0.75) / 0.25).toFixed(3)}`;
            }
          } else {
            logoZoomOverlay.style.opacity = '1';
            if (hudOverlay1) hudOverlay1.style.opacity = '0';
          }

          chapter.targetProgress = 0;
        } else if (scrolled < totalSpacerHeight) {
          // 3. Zoom reveal complete -> Canvas Sequence scrubs to last frame
          logoZoomOverlay.style.display = 'none';
          if (hudOverlay1) hudOverlay1.style.opacity = '1';

          const scrubScrolled = scrolled - zoomDistance;
          chapter.targetProgress = Math.min(Math.max(scrubScrolled / sequenceScrubDistance, 0), 1);
        } else {
          // 4. Last frame reached: Locked at final frame while white card slides over
          logoZoomOverlay.style.display = 'none';
          if (hudOverlay1) hudOverlay1.style.opacity = '1';
          chapter.targetProgress = 1.0;
        }
      } else {
        // Standard Chapters (2, 3, 4, 5): Scrub -> Lock Last Frame -> Slide-Over Card
        if (scrolled <= 0) {
          chapter.targetProgress = 0;
        } else if (scrolled < totalSpacerHeight) {
          chapter.targetProgress = Math.min(Math.max(scrolled / totalSpacerHeight, 0), 1);
        } else {
          // Locked at final frame
          chapter.targetProgress = 1.0;
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
});
