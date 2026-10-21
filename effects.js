document.addEventListener('DOMContentLoaded', () => {
  const translatedElements = [...document.querySelectorAll('[data-i18n]')];
  const spanish = new Map(translatedElements.map(el => [el, el.innerHTML]));
  let language = 'es';
  const projectList = document.getElementById('project-list');
  const safeUrl = value => {
    if (!value) return null;
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
    catch { return null; }
  };
  function renderProjects() {
    projectList.replaceChildren();
    (window.portfolioProjects || []).forEach((project, index) => {
      const card = document.createElement('article');
      card.className = `project${project.placeholder ? ' placeholder' : ''}`;
      const art = document.createElement('div'); art.className = 'project-art';
      const number = document.createElement('small'); number.textContent = `PROJECT / ${String(index + 1).padStart(2, '0')}`;
      const mark = document.createElement('span'); mark.textContent = project.placeholder ? '+' : '</>';
      if (project.image && /^(assets\/)[\w./-]+$/.test(project.image) && !project.image.includes('..')) {
        const img = document.createElement('img'); img.src = project.image;
        img.alt = project.title[language]; img.loading = 'lazy';
        img.addEventListener('error', () => img.replaceWith(mark), { once: true }); art.append(img);
      } else art.append(mark);
      art.append(number);
      const body = document.createElement('div'); body.className = 'project-body';
      const badge = document.createElement('span'); badge.className = 'badge'; badge.textContent = project.status[language];
      const title = document.createElement('h3'); title.textContent = project.title[language];
      const description = document.createElement('p'); description.textContent = project.description[language];
      const tags = document.createElement('div'); tags.className = 'tags';
      project.technologies.forEach(technology => { const tag = document.createElement('span'); tag.textContent = technology; tags.append(tag); });
      const links = document.createElement('div'); links.className = 'project-links';
      [[project.repo, language === 'es' ? 'Ver código ↗' : 'Source code ↗'], [project.demo, language === 'es' ? 'Ver demo ↗' : 'Live demo ↗']].forEach(([value, text]) => {
        const url = safeUrl(value); if (!url) return;
        const link = document.createElement('a'); link.href = url; link.textContent = text; link.target = '_blank'; link.rel = 'noopener noreferrer'; links.append(link);
      });
      body.append(badge, title, description, tags, links); card.append(art, body); projectList.append(card);
    });
  }
  const switcher = document.getElementById('langSwitcher');
  switcher.addEventListener('click', () => {
    language = language === 'es' ? 'en' : 'es'; document.documentElement.lang = language;
    translatedElements.forEach(el => { el.innerHTML = language === 'es' ? spanish.get(el) : (window.portfolioEnglish[el.dataset.i18n] || spanish.get(el)); });
    switcher.textContent = language === 'es' ? 'EN' : 'ES';
    switcher.setAttribute('aria-label', language === 'es' ? 'Switch to English' : 'Cambiar a español');
    renderProjects();
    document.getElementById('code-output').textContent = language === 'es' ? 'Aprender. Construir. Mejorar.' : 'Learn. Build. Improve.';
  });
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('nav-links');
  function closeMenu() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', () => { const opened = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(opened)); });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); toggle.focus(); } });
  document.getElementById('year').textContent = new Date().getFullYear();
  renderProjects();
});

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // ===== BARRA DE LECTURA =====

  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.setAttribute("aria-hidden", "true");
  document.body.append(progressBar);

  let scrollFrame = null;

  function updateProgress() {
    const total =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      total > 0
        ? Math.min(1, Math.max(0, window.scrollY / total))
        : 0;

    progressBar.style.transform = `scaleX(${progress})`;
    scrollFrame = null;
  }

  function scheduleProgress() {
    if (scrollFrame !== null) return;

    scrollFrame = requestAnimationFrame(updateProgress);
  }

  window.addEventListener("scroll", scheduleProgress, {
    passive: true
  });

  window.addEventListener("resize", scheduleProgress);
  window.addEventListener("load", scheduleProgress);

  if ("ResizeObserver" in window) {
    const pageObserver = new ResizeObserver(scheduleProgress);
    pageObserver.observe(document.body);
  }

  updateProgress();

  // Entrada de secciones con efecto de desvanecimiento y desplazamiento
  // Secciones: proyectos, sobre mí y contacto.
  // Se ocultan al cargar la página y se muestran al hacer scroll.

  const sections = document.querySelectorAll(
    "#proyectos, #sobre-mi, #contacto"
  );

  let revealObserver = null;

  function showAllSections() {
    revealObserver?.disconnect();

    sections.forEach((section) => {
      section.classList.remove("reveal-pending");
      section.classList.add("reveal-visible");
    });
  }

  if (
    !reducedMotion.matches &&
    "IntersectionObserver" in window
  ) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("reveal-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    sections.forEach((section) => {
      // No ocultamos secciones que ya estén en pantalla.
      const rect = section.getBoundingClientRect();

      if (rect.top < window.innerHeight) return;

      section.classList.add("reveal-pending");

      requestAnimationFrame(() => {
        section.classList.add("reveal-ready");
        revealObserver.observe(section);
      });
    });
  }

  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) showAllSections();
  });

  // Luz que sigue el puntero del mouse en las tarjetas de proyecto

  const projectList = document.getElementById("project-list");

  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  let pointerFrame = null;
  let lastPointer = null;

  projectList?.addEventListener("pointermove", (event) => {
    if (!finePointer.matches || reducedMotion.matches) return;

    const card = event.target.closest(".project");
    if (!card) return;

    lastPointer = {
      card,
      x: event.clientX,
      y: event.clientY
    };

    if (pointerFrame !== null) return;

    pointerFrame = requestAnimationFrame(() => {
      const { card, x, y } = lastPointer;

      if (card.isConnected) {
        const rect = card.getBoundingClientRect();

        card.style.setProperty(
          "--mouse-x",
          `${x - rect.left}px`
        );

        card.style.setProperty(
          "--mouse-y",
          `${y - rect.top}px`
        );
      }

      pointerFrame = null;
    });
  });
});
