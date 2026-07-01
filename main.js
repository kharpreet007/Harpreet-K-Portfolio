/* ============================================================
   HARPREET K — PORTFOLIO
   Main JavaScript: Animations, Interactions, Smooth Scroll
   ============================================================ */

(function () {
  'use strict';

  // Wait for DOM + deferred scripts
  window.addEventListener('DOMContentLoaded', init);

  function init() {
    // Register GSAP plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    initLenis();
    initCustomCursor();
    initNavigation();
    initHeroSequence();
    initScrollReveals();
    initTimelineFill();
    initSkillsReveal();
    initProjectCarousel();
  }

  /* ----------------------------------------------------------
     LENIS SMOOTH SCROLL
     ---------------------------------------------------------- */
  let lenis;

  function initLenis() {
    // Respect reduced motion
    if (prefersReducedMotion()) return;

    try {
      lenis = new Lenis({
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        infinite: false,
      });

      // Connect Lenis to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } catch (e) {
      console.warn('Lenis init failed, using native scroll:', e);
    }
  }

  /* ----------------------------------------------------------
     CUSTOM CURSOR
     ---------------------------------------------------------- */
  function initCustomCursor() {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (prefersReducedMotion()) return;

    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!cursor.classList.contains('visible')) {
        cursor.classList.add('visible');
      }
    });

    // Hide when mouse leaves window
    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('visible');
    });

    // Hover detection for interactive elements
    const interactiveSelectors = 'a, button, .project-card, .skills__item, .metric, .education__item';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        cursor.classList.add('hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        cursor.classList.remove('hover');
      }
    });

    // Smooth cursor follow with RAF
    function animateCursor() {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  /* ----------------------------------------------------------
     NAVIGATION
     ---------------------------------------------------------- */
  function initNavigation() {
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    // Scroll-based nav styling
    if (nav) {
      let lastScrollY = 0;

      const handleNavScroll = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollY > 80) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
      };

      // Use passive listener for performance
      window.addEventListener('scroll', handleNavScroll, { passive: true });
      handleNavScroll(); // Initial check
    }

    // Hamburger toggle
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
      });

      // Close mobile menu on link click
      const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }

    // Smooth scroll for anchor links (when Lenis isn't available)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (!target) return;
        
        e.preventDefault();

        if (lenis) {
          lenis.scrollTo(target, { offset: -80, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ----------------------------------------------------------
     HERO ENTRANCE SEQUENCE
     ---------------------------------------------------------- */
  function initHeroSequence() {
    if (prefersReducedMotion()) {
      // Just show everything immediately
      showHeroInstantly();
      return;
    }

    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Grid draws in
    tl.to('#hero-grid', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    });

    // 2. Ambient glow fades in
    tl.to('#hero-glow', {
      opacity: 0.6,
      duration: 1,
      ease: 'power2.out',
    }, '-=0.5');

    // 3. Name slides up
    tl.to('#hero-name', {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'expo.out',
    }, '-=0.6');

    // 4. Tagline fades up
    tl.to('#hero-tagline', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'expo.out',
    }, '-=0.4');

    // 5. CTAs bloom in
    tl.to('#hero-ctas', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'expo.out',
    }, '-=0.3');

    // 6. Scroll indicator
    tl.to('#hero-scroll', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.2');

    // Parallax effect on hero grid
    gsap.to('#hero-grid', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    // Parallax on glow
    gsap.to('#hero-glow', {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    // Fade hero content on scroll
    gsap.to('.hero__content', {
      opacity: 0,
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: '60% top',
        end: 'bottom top',
        scrub: 0.3,
      },
    });

    // Fade scroll indicator
    gsap.to('#hero-scroll', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: '15% top',
        end: '35% top',
        scrub: true,
      },
    });
  }

  function showHeroInstantly() {
    const els = ['#hero-grid', '#hero-glow', '#hero-name', '#hero-tagline', '#hero-ctas', '#hero-scroll'];
    els.forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }

  /* ----------------------------------------------------------
     SCROLL REVEAL — IntersectionObserver
     ---------------------------------------------------------- */
  function initScrollReveals() {
    if (prefersReducedMotion()) {
      // Show all reveal elements immediately
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            
            // Calculate stagger delay
            const staggerIndex = parseInt(el.style.getPropertyValue('--stagger-index') || '0');
            const delay = staggerIndex * 120;

            setTimeout(() => {
              el.classList.add('revealed');
            }, delay);

            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    // Observe all reveal elements (except hero ones which are handled by GSAP)
    document.querySelectorAll('.reveal').forEach((el) => {
      // Skip hero elements
      if (el.closest('.hero')) return;
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------
     TIMELINE LINE FILL
     ---------------------------------------------------------- */
  function initTimelineFill() {
    if (prefersReducedMotion()) return;

    const timeline = document.getElementById('timeline');
    const fill = document.getElementById('timeline-fill');
    if (!timeline || !fill) return;

    // Animate timeline line fill on scroll
    gsap.to(fill, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 0.3,
      },
    });

    // Activate nodes as they enter viewport
    const timelineItems = timeline.querySelectorAll('.timeline__item');
    
    timelineItems.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 75%',
        onEnter: () => {
          item.classList.add('active');
        },
      });
    });
  }

  /* ----------------------------------------------------------
     SKILLS CATEGORY HEADER ANIMATION
     ---------------------------------------------------------- */
  function initSkillsReveal() {
    if (prefersReducedMotion()) {
      document.querySelectorAll('.skills__category').forEach((cat) => {
        cat.classList.add('revealed');
      });
      return;
    }

    const categories = document.querySelectorAll('.skills__category');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Delay the underline animation slightly for effect
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, 300);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    categories.forEach((cat) => observer.observe(cat));
  }

  /* ----------------------------------------------------------
     PROJECT CAROUSEL ARROWS
     ---------------------------------------------------------- */
  function initProjectCarousel() {
    const track = document.getElementById('projects-track');
    const prevBtn = document.getElementById('projects-prev');
    const nextBtn = document.getElementById('projects-next');

    if (!track || !prevBtn || !nextBtn) return;

    function getCardWidth() {
      const card = track.querySelector('.project-card');
      if (!card) return 440;
      const style = getComputedStyle(track);
      const gap = parseFloat(style.gap) || 32;
      return card.offsetWidth + gap;
    }

    function updateArrowStates() {
      const scrollLeft = Math.round(track.scrollLeft);
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (scrollLeft <= 2) {
        prevBtn.classList.add('disabled');
      } else {
        prevBtn.classList.remove('disabled');
      }

      if (scrollLeft >= maxScroll - 2) {
        nextBtn.classList.add('disabled');
      } else {
        nextBtn.classList.remove('disabled');
      }
    }

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateArrowStates, { passive: true });

    // Initial state
    updateArrowStates();
  }

  /* ----------------------------------------------------------
     UTILITY: Reduced Motion Check
     ---------------------------------------------------------- */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
})();
