document.addEventListener('DOMContentLoaded', () => {
  const resources = {
    es: {
      translation: {
        "hero.title": "Sueña,Construye<br>Lanza",
        "hero.description": "Soy Erick Hernández, tengo 18 años y soy un estudiante de software apasionado. Me encanta aprender cosas nuevas y enfrentar retos que me ayuden a crecer profesional y personalmente. Siempre busco mejorar mis habilidades y crear soluciones innovadoras.",
        "hero.btnAbout": "Sobre mí",
        "hero.btnProjects": "Proyectos"
      }
    },
    en: {
      translation: {
        "hero.title": "Dream, Build<br>Launch",
        "hero.description": "I am Erick Hernández, 18 years old, and a passionate software student. I love learning new things and facing challenges that help me grow professionally and personally. I always seek to improve my skills and create innovative solutions.",
        "hero.btnAbout": "About Me",
        "hero.btnProjects": "Projects"
      }
    }
  };

  i18next.init({
    lng: 'es',
    debug: true,
    resources
  }, function(err, t) {
    updateContent();
  });

  function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(elem => {
      const key = elem.getAttribute('data-i18n');
      if (key === "hero.title") {
        elem.innerHTML = i18next.t(key);
      } else {
        elem.innerText = i18next.t(key);
      }
    });
  }

  const btn = document.getElementById('langSwitcher');
  btn.addEventListener('click', () => {
    const newLang = i18next.language === 'es' ? 'en' : 'es';
    i18next.changeLanguage(newLang, () => {
      updateContent();
      btn.innerText = newLang.toUpperCase();
    });
  });
});
