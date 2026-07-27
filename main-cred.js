document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // 1. Inject Projects from data.js
  const credImages = {
    "project-1": "assets/cred-ai-ops.png",
    "project-2": "assets/cred-rag.png",
    "project-3": "assets/cred-fulfillment.png",
    "project-4": "assets/cred-po-match.png",
    "project-5": "assets/cred-kharch.png"
  };

  const projectList = document.getElementById('project-list');
  if (typeof projectsData !== 'undefined') {
    Object.keys(projectsData).forEach((id, index) => {
      const project = projectsData[id];
      const imageSrc = credImages[id] || project.image;
      const projectHTML = `
        <article class="project-item gs-reveal">
          <div class="project-info">
            <div class="project-meta">
              <span>0${index + 1}</span>
              <span>${project.category}</span>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.whatItIs.substring(0, 120)}...</p>
            <a href="case-study.html?id=${id}" class="btn-magnetic" data-cursor="hover">
              Explore Case Study
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
          <div class="project-image-wrapper" data-cursor="hover">
            <img src="${imageSrc}" alt="${project.title}" class="project-image">
          </div>
        </article>
      `;
      projectList.insertAdjacentHTML('beforeend', projectHTML);
    });
  }

  // 2. Custom Cursor Logic
  const cursor = document.getElementById('cursor');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  
  // Smooth follow
  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover states
  document.querySelectorAll('[data-cursor="hover"]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // 3. GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  // Hero animation
  gsap.from('.hero__greeting', { y: 20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
  gsap.from('.hero__title', { y: 40, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 });
  gsap.from('.hero__subtitle', { y: 20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.6 });
  gsap.from('.scroll-indicator', { opacity: 0, duration: 1, delay: 1 });

  // Project scroll reveals
  gsap.utils.toArray('.gs-reveal').forEach((elem) => {
    gsap.to(elem, {
      scrollTrigger: {
        trigger: elem,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out'
    });
  });

  // Parallax on images
  gsap.utils.toArray('.project-image').forEach((img) => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      },
      y: 30,
      scale: 1.1,
      ease: 'none'
    });
  });
});
