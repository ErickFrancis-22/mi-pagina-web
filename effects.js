document.addEventListener("DOMContentLoaded", () => {
  // ---------------- NAVBAR ANIMACIÓN ----------------
  const brandText = document.getElementById('brand-text');
  const dots = document.getElementById('dots');
  let isLoading = true;
  let dotCount = 0;

  setInterval(() => {
    isLoading = !isLoading;
    brandText.firstChild.textContent = isLoading ? "Loading" : "C0d3";
    dots.style.display = isLoading ? "inline" : "none";
  }, 4000);

  setInterval(() => {
    if (isLoading) {
      dotCount = (dotCount + 1) % 4;
      dots.textContent = ".".repeat(dotCount);
    }
  }, 500);

  // ---------------- ANIMACIÓN DE CÓDIGO ----------------
  const codeLines = [
    'print("Hola mundo")',
    'for i in range(5):',
    '    print("Hi!...")',
    'console.log("C#!")'
  ];
  const codeElement = document.getElementById("code-output");
  let lineIndex = 0, charIndex = 0;

  function typeCode() {
    if (charIndex === 0) codeElement.textContent = ""; // limpia antes de escribir nueva línea

    if (charIndex < codeLines[lineIndex].length) {
      codeElement.textContent += codeLines[lineIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeCode, 80);
    } else {
      setTimeout(() => {
        lineIndex = (lineIndex + 1) % codeLines.length;
        charIndex = 0;
        typeCode();
      }, 2000);
    }
  }
  typeCode();

  // ---------------- BARRAS DE PROGRESO ----------------
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  progressBars.forEach(bar => {
    const percentageSpan = document.createElement('span');
    percentageSpan.classList.add('progress-percentage');
    percentageSpan.textContent = '0%';
    bar.appendChild(percentageSpan);
    bar.style.width = '0%';
  });

  let barsAnimated = false;

  function animateBars() {
    if (barsAnimated) return; // Evita repetir animación
    progressBars.forEach(bar => {
      const target = +bar.getAttribute('data-target');
      const span = bar.querySelector('.progress-percentage');
      let width = 0;
      bar.classList.add('show-percentage');

      const interval = setInterval(() => {
        if (width >= target) {
          clearInterval(interval);
        } else {
          width++;
          bar.style.width = width + '%';
          span.textContent = width + '%';
        }
      }, 15);
    });
    barsAnimated = true;  
  }

  function resetBars() {
    progressBars.forEach(bar => {
      bar.style.width = '0%';
      bar.classList.remove('show-percentage');
      const span = bar.querySelector('.progress-percentage');
      span.textContent = '0%';
    });
    barsAnimated = false;
  }

  window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.skills-section');
    const sectionTop = skillsSection.offsetTop;
    const sectionHeight = skillsSection.offsetHeight;
    const scrollY = window.scrollY + window.innerHeight;

    if (scrollY > sectionTop + sectionHeight / 3) {
      animateBars();
    } else {
      resetBars();
    }
  });

  // ---------------- PARTICULAS ----------------
  if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80 },
        color: { value: "#00ff88" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00ff88",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }
});

 const words = ["Sueña", "Construye", "Lanza"];
  const target = document.getElementById("cyberpunk-text");

  let wordIndex = 0;
  let charIndex = 0;
  let typing = true; // true = escribiendo, false = borrando

  function type() {
    const currentWord = words[wordIndex];
    
    if (typing) {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        typing = false;
        setTimeout(type, 1500); // pausa cuando termina de escribir
      } else {
        setTimeout(type, 150);
      }
    } else {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        typing = true;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, 100);
      }
    }
  }

  type();

