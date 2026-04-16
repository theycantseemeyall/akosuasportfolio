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
     HERO LIQUID BLOB
  ========================== */

  const wrapper = document.getElementById("nameWrapper");

  if (!wrapper) return;

  let bubble = document.createElement("div");
  bubble.className = "bubble";
  wrapper.appendChild(bubble);

  let size = 140;
  let mouseActive = false;

  // initial position (centered)
  let x = wrapper.offsetWidth / 2 - size / 2;
  let y = wrapper.offsetHeight / 2 - size / 2;

  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.left = x + "px";
  bubble.style.top = y + "px";

  // idle floating motion (JS-driven for randomness)
  let vx = Math.random() * 1.5 + 0.5;
  let vy = Math.random() * 1.5 + 0.5;

  function idleFloat() {
    if (!mouseActive) {
      x += vx;
      y += vy;

      if (x < 0 || x > wrapper.offsetWidth - size) vx *= -1;
      if (y < 0 || y > wrapper.offsetHeight - size) vy *= -1;

      bubble.style.left = x + "px";
      bubble.style.top = y + "px";
    }

    requestAnimationFrame(idleFloat);
  }

  idleFloat();

  // activate mouse follow ONLY after movement
  wrapper.addEventListener("mousemove", (e) => {
    mouseActive = true;

    const rect = wrapper.getBoundingClientRect();
    x = e.clientX - rect.left - size / 2;
    y = e.clientY - rect.top - size / 2;

    bubble.style.left = x + "px";
    bubble.style.top = y + "px";
  });

  // click = blob grows (surface tension vibe)
  wrapper.addEventListener("click", () => {
    size += 18;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
  });

});
