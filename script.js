document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SCROLLING FILES / CARDS
  ========================== */

  const cards = document.querySelectorAll(".card");
  const section = document.querySelector(".scroll-section");
  const filesTitle = document.querySelector(".files-title");

  if (section && cards.length) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      let progress =
        (scrollTop - sectionTop) /
        (sectionHeight - window.innerHeight);

      progress = Math.min(Math.max(progress, 0), 1);

      const totalCards = cards.length;
      const activeIndex = Math.floor(progress * totalCards);

      cards.forEach((card, i) => {
        if (i === activeIndex) {
          card.style.opacity = "1";
          card.style.transform = "translate(-50%, -50%) scale(1)";
          card.style.zIndex = 3;
        } else if (i < activeIndex) {
          card.style.opacity = "0.35";
          card.style.transform =
            "translate(calc(-50% - 120px), -50%) scale(0.9)";
          card.style.zIndex = 1;
        } else {
          card.style.opacity = "0.35";
          card.style.transform =
            "translate(calc(-50% + 120px), -50%) scale(0.9)";
          card.style.zIndex = 1;
        }
      });

      if (filesTitle) {
        filesTitle.style.opacity = progress > 0.05 ? "0" : "1";
        filesTitle.style.transform =
          progress > 0.05 ? "translateY(-20px)" : "translateY(0)";
      }
    });
  }

  /* =========================
     HERO LIQUID BLOBS
  ========================== */

  (function () {
    const CFG = {
      color1: '#7A1F2B',   // deep burgundy
      color2: '#5D0413',   // rich red
      count:  6,
      speed:  1.1,
      size:   1.4,         // bigger blobs
      opacity: 0.55,
    };

    const wrap = document.getElementById('blobs');
    if (!wrap) return;

    // Size blobs relative to the hero section, not the full window
    const hero = document.querySelector('.hero');
    const W = () => hero.offsetWidth;
    const H = () => hero.offsetHeight;

    // Inject keyframes once
    const s = document.createElement('style');
    s.textContent = `
      @keyframes lava-move {
        0%,100% { transform: translate(0,0) scale(1); }
        33%      { transform: translate(var(--tx), var(--ty)) scale(1.12); }
        66%      { transform: translate(var(--tx2),var(--ty2)) scale(0.9); }
      }
    `;
    document.head.appendChild(s);

    function makeBlob() {
      const el = document.createElement('div');
      const r   = (Math.random() * 0.12 + 0.06) * Math.min(W(), H()) * CFG.size;
      const dur = (Math.random() * 8 + 12) / CFG.speed;

      Object.assign(el.style, {
        position:    'absolute',
        width:       r * 2 + 'px',
        height:      r * 2 + 'px',
        borderRadius:'50%',
        opacity:     CFG.opacity,
        background:  `radial-gradient(circle at 35% 35%, ${CFG.color1}, ${CFG.color2})`,
        left:        Math.random() * (W() - r * 2) + 'px',
        top:         Math.random() * (H() - r * 2) + 'px',
        animation:   `lava-move ${dur}s ease-in-out infinite`,
        animationDelay: (Math.random() * -dur) + 's',
      });

      el.style.setProperty('--tx',  ((Math.random() - 0.5) * W() * 0.6) + 'px');
      el.style.setProperty('--ty',  ((Math.random() - 0.5) * H() * 0.6) + 'px');
      el.style.setProperty('--tx2', ((Math.random() - 0.5) * W() * 0.5) + 'px');
      el.style.setProperty('--ty2', ((Math.random() - 0.5) * H() * 0.5) + 'px');

      return el;
    }

    for (let i = 0; i < CFG.count; i++) {
      wrap.appendChild(makeBlob());
    }
  })();

});

// double click to kill//
const container = document.querySelector(".character-container");

container.addEventListener("dblclick", () => {
  container.classList.add("dead");
});

// timeline part//
const moments = document.querySelectorAll(".moment");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.3
  }
);

moments.forEach((moment) => {
  observer.observe(moment);
});
