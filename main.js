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
    initProjectFiltersAndCarousel();
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
      showHeroInstantly();
      return;
    }

    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Grid draws in
    tl.to('#hero-grid', {
      opacity: 0.5,
      duration: 0.8,
      ease: 'power2.out',
    });

    // 2. Image bounces in
    gsap.set('#hero-image img', { scale: 0, rotation: -15 });
    tl.to('#hero-image img', {
      scale: 1,
      rotation: 2,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
      onComplete: () => {
        // Continuous floating animation
        gsap.to('#hero-image img', {
          y: -15,
          rotation: 0,
          duration: 2.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      }
    }, '-=0.4');

    // Decorative floating elements animation
    gsap.set('.hero__decor', { scale: 0, opacity: 0 });
    tl.to('.hero__decor', {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)',
      onComplete: () => {
        gsap.to('.hero__decor', {
          y: -10,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          stagger: 0.3,
          ease: 'sine.inOut'
        });
      }
    }, '-=0.8');

    // 3. Name slides up with bounce
    tl.fromTo('#hero-name', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.7)' },
      '-=1'
    );

    // 4. Tagline fades up
    tl.fromTo('#hero-tagline',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.8'
    );

    // 5. CTAs bloom in
    tl.fromTo('#hero-ctas',
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
      '-=0.6'
    );

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

    // Parallax on Image
    gsap.to('#hero-image', {
      yPercent: 15,
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
    const els = ['#hero-grid', '#hero-image img', '#hero-name', '#hero-tagline', '#hero-ctas', '#hero-scroll'];
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
     PROJECT CATEGORY FILTERS & CAROUSEL
     ---------------------------------------------------------- */
  function initProjectFiltersAndCarousel() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Carousel elements
    const track = document.getElementById('projects-track');
    const prevBtn = document.getElementById('projects-prev');
    const nextBtn = document.getElementById('projects-next');

    if (!filterBtns.length || !projectCards.length) return;

    function getCardWidth() {
      if (!track) return 440;
      // Get width of first visible card
      const card = Array.from(projectCards).find(c => c.style.display !== 'none');
      if (!card) return 440;
      const style = getComputedStyle(track);
      const gap = parseFloat(style.gap) || 32;
      return card.offsetWidth + gap;
    }

    function updateArrowStates() {
      if (!track || !prevBtn || !nextBtn) return;
      const scrollLeft = Math.round(track.scrollLeft);
      // Small margin of error for fractional pixel scrolling
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);

      if (scrollLeft <= 5) {
        prevBtn.classList.add('disabled');
      } else {
        prevBtn.classList.remove('disabled');
      }

      if (scrollLeft >= maxScroll - 5) {
        nextBtn.classList.add('disabled');
      } else {
        nextBtn.classList.remove('disabled');
      }
    }

    if (prevBtn && nextBtn && track) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
      });

      track.addEventListener('scroll', updateArrowStates, { passive: true });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'flex';
            // Slight animation re-trigger
            gsap.fromTo(card, 
              { opacity: 0, scale: 0.95 }, 
              { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
            );
          } else {
            card.style.display = 'none';
          }
        });
        
        if (track) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
          // Let layout update before checking arrows
          setTimeout(updateArrowStates, 100);
        }

        // Update ScrollTrigger after layout shift
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });
    });

    // Initial arrow check
    setTimeout(updateArrowStates, 100);
  }

  /* ----------------------------------------------------------
     UTILITY: Reduced Motion Check
     ---------------------------------------------------------- */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
})();
