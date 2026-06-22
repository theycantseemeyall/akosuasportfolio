const dialTone = document.getElementById("dialTone");
const DIAL_NUMBER = "074-015-4920-7";
const DIAL_LINKS = [
  { label: "Link for 0", url: "https://yoursite.com" },
  { label: "Link for 7", url: "https://yoursite.com" },
  { label: "Link for 4", url: "https://yoursite.com" },
  { label: "Link for 0", url: "https://yoursite.com" },
  { label: "Link for 1", url: "https://yoursite.com" },
  { label: "Link for 5", url: "https://yoursite.com" },
  { label: "Link for 4", url: "https://yoursite.com" },
  { label: "Link for 9", url: "https://yoursite.com" },
  { label: "Link for 2", url: "https://yoursite.com" },
  { label: "Link for 0", url: "https://yoursite.com" },
  { label: "Link for 7", url: "https://yoursite.com" },
];

document.addEventListener("DOMContentLoaded", () => {

  /* SCROLLING FILES / CARDS */
  const cards = document.querySelectorAll(".card");
  const section = document.querySelector(".scroll-section");
  const filesTitle = document.querySelector(".files-title");

  if (section && cards.length) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      let progress = (scrollTop - sectionTop) / (sectionHeight - window.innerHeight);
      progress = Math.min(Math.max(progress, 0), 1);
      const activeIndex = Math.floor(progress * cards.length);

      cards.forEach((card, i) => {
        if (i === activeIndex) {
          card.style.opacity = "1";
          card.style.transform = "translate(-50%, -50%) scale(1)";
          card.style.zIndex = 3;
        } else if (i < activeIndex) {
          card.style.opacity = "0.35";
          card.style.transform = "translate(calc(-50% - 120px), -50%) scale(0.9)";
          card.style.zIndex = 1;
        } else {
          card.style.opacity = "0.35";
          card.style.transform = "translate(calc(-50% + 120px), -50%) scale(0.9)";
          card.style.zIndex = 1;
        }
      });

      if (filesTitle) {
        filesTitle.style.opacity = progress > 0.05 ? "0" : "1";
        filesTitle.style.transform = progress > 0.05 ? "translateY(-20px)" : "translateY(0)";
      }
    });
  }

  /* HERO LIQUID BLOBS */
  (function () {
    const CFG = {
      color1: '#7A1F2B',
      color2: '#5D0413',
      count: 6,
      speed: 1.1,
      size: 1.4,
      opacity: 0.55,
    };

    const wrap = document.getElementById('blobs');
    if (!wrap) return;

    const hero = document.querySelector('.hero');
    const W = () => hero.offsetWidth;
    const H = () => hero.offsetHeight;

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
      const r = (Math.random() * 0.12 + 0.06) * Math.min(W(), H()) * CFG.size;
      const dur = (Math.random() * 8 + 12) / CFG.speed;
      Object.assign(el.style, {
        position: 'absolute',
        width: r * 2 + 'px',
        height: r * 2 + 'px',
        borderRadius: '50%',
        opacity: CFG.opacity,
        background: `radial-gradient(circle at 35% 35%, ${CFG.color1}, ${CFG.color2})`,
        left: Math.random() * (W() - r * 2) + 'px',
        top: Math.random() * (H() - r * 2) + 'px',
        animation: `lava-move ${dur}s ease-in-out infinite`,
        animationDelay: (Math.random() * -dur) + 's',
      });
      el.style.setProperty('--tx', ((Math.random() - 0.5) * W() * 0.6) + 'px');
      el.style.setProperty('--ty', ((Math.random() - 0.5) * H() * 0.6) + 'px');
      el.style.setProperty('--tx2', ((Math.random() - 0.5) * W() * 0.5) + 'px');
      el.style.setProperty('--ty2', ((Math.random() - 0.5) * H() * 0.5) + 'px');
      return el;
    }

    for (let i = 0; i < CFG.count; i++) wrap.appendChild(makeBlob());
  })();

  /* DOUBLE CLICK TO KILL */
  const container = document.querySelector(".character-container");
  if (container) {
    container.addEventListener("dblclick", () => {
      container.classList.add("dead");
    });
  }

  /* TIMELINE */
  const moments = document.querySelectorAll(".moment");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.3 }
  );
  moments.forEach((moment) => observer.observe(moment));

  /* ROTARY PHONE — scroll lights up digits */
  const RPH = {};

  const RAW_DIGITS = DIAL_NUMBER.replace(/-/g, "").split("").map(Number);

  // track which digit index was last lit so we only fire the popup once per digit
  RPH.lastLitIndex = -1;
  RPH.activePopup = null;

  RPH.showPopup = function(linkObj) {
    if (RPH.activePopup) {
      RPH.activePopup.remove();
      RPH.activePopup = null;
    }

    var el = document.createElement("div");
    el.style.cssText = `
      position: fixed;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #fff;
      color: #222;
      padding: 14px 28px;
      border-radius: 12px;
      font-family: Courier, monospace;
      font-size: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.18);
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      z-index: 9999;
      cursor: pointer;
      white-space: nowrap;
    `;
    el.textContent = "→ " + linkObj.label;
    el.addEventListener("click", () => window.open(linkObj.url, "_blank"));
    document.body.appendChild(el);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateX(-50%) translateY(0)";
      });
    });

    var timer = setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateX(-50%) translateY(20px)";
      setTimeout(() => { if (el.parentNode) el.remove(); }, 300);
      if (RPH.activePopup === el) RPH.activePopup = null;
    }, 2500);

    el.addEventListener("mouseenter", () => clearTimeout(timer));
    el.addEventListener("mouseleave", () => {
      timer = setTimeout(() => {
        el.style.opacity = "0";
        el.style.transform = "translateX(-50%) translateY(20px)";
        setTimeout(() => { if (el.parentNode) el.remove(); }, 300);
        if (RPH.activePopup === el) RPH.activePopup = null;
      }, 800);
    });

    RPH.activePopup = el;
  };

  RPH.pen = {
    clear: function() { RPH.ctx.clearRect(0, 0, RPH.W, RPH.H); },
    circle: function(x, y, r) {
      RPH.ctx.beginPath();
      RPH.ctx.arc(x, y, r, 0, Math.PI * 2, true);
      RPH.ctx.fill();
    }
  };

  RPH.phone = {
    oBeta: Math.PI * 4 / 9, dBeta: Math.PI / 7, rBeta: Math.PI / 24,
    r0: 0.25,
    r2: 0.16,
    r1: 0.20,
    r3: 0.03,

    // how many digits are currently lit (driven by scroll)
    litCount: 0,

    drawRing: function() {
      var xc = this.centroid.x, yc = this.centroid.y;
      RPH.ctx.fillStyle = "#444444";
      RPH.pen.circle(RPH.W * xc, RPH.H * yc, RPH.minWH * this.r0);
      RPH.ctx.fillStyle = "rgb(240,245,240)";
      RPH.pen.circle(RPH.W * xc, RPH.H * yc, RPH.minWH * this.r2);
    },

    drawLine: function() {
      var angle = this.oBeta + 10 * this.dBeta + this.rBeta,
          xc = this.centroid.x, yc = this.centroid.y;
      RPH.ctx.strokeStyle = "rgb(240,245,240)";
      RPH.ctx.beginPath();
      RPH.ctx.moveTo(RPH.W * xc + this.r0 * RPH.minWH * Math.cos(angle), RPH.H * yc + this.r0 * RPH.minWH * Math.sin(angle));
      RPH.ctx.lineTo(RPH.W * xc + this.r1 * RPH.minWH * Math.cos(angle), RPH.H * yc + this.r1 * RPH.minWH * Math.sin(angle));
      RPH.ctx.lineWidth = RPH.minWH / 150;
      RPH.ctx.stroke();
    },

    drawNumber: function() {
      // build the display string: lit digits in bright colour, unlit ones dim
      var xStart = RPH.W * this.text.x;
      var y = RPH.H * this.text.y;
      var fontSize = Math.round(RPH.minWH / 18);
      RPH.ctx.font = "bold " + fontSize + "px Courier";
      RPH.ctx.textAlign = "center";

      // measure total width so we can centre manually character by character
      var chars = DIAL_NUMBER.split("");
      var totalWidth = RPH.ctx.measureText(DIAL_NUMBER).width;
      var x = xStart - totalWidth / 2;
      var digitsSeen = 0;

      chars.forEach(function(ch) {
        if (ch === "-") {
          RPH.ctx.fillStyle = "rgba(68,68,68,0.3)";
          RPH.ctx.textAlign = "left";
          RPH.ctx.fillText(ch, x, y);
          x += RPH.ctx.measureText(ch).width;
        } else {
          var isLit = digitsSeen < RPH.phone.litCount;
          var isNext = digitsSeen === RPH.phone.litCount;
          RPH.ctx.fillStyle = isLit
            ? "rgb(180,205,200)"       // lit — teal highlight
            : isNext
              ? "rgba(68,68,68,0.5)"   // next up — slightly brighter
              : "rgba(68,68,68,0.2)";  // not yet
          RPH.ctx.textAlign = "left";
          RPH.ctx.fillText(ch, x, y);
          x += RPH.ctx.measureText(ch).width;
          digitsSeen++;
        }
      });

      RPH.ctx.textAlign = "center";
    },

    drawDigits: function() {
      RPH.ctx.font = RPH.minWH / 18 + "px Courier";
      for (var i = 0; i < 10; i += 1) {
        // light up the hole that matches the next digit to be dialled
        var nextDigit = RAW_DIGITS[Math.min(RPH.phone.litCount, RAW_DIGITS.length - 1)];
        RPH.ctx.fillStyle = (i === nextDigit) ? "rgb(180,205,200)" : "rgb(240,245,240)";
        var angle = this.oBeta + this.dBeta * i;
        RPH.pen.circle(
          RPH.W * this.centroid.x + RPH.minWH * this.r1 * Math.cos(angle),
          RPH.H * this.centroid.y + RPH.minWH * this.r1 * Math.sin(angle),
          RPH.minWH * this.r3
        );
        RPH.ctx.fillStyle = "#444444";
        RPH.ctx.fillText(
          i,
          RPH.W * this.centroid.x + RPH.minWH * this.r1 * Math.cos(angle),
          RPH.H * this.centroid.y + RPH.minWH * this.r1 * Math.sin(angle)
        );
      }
    },

drawReceiver: function() {
  const cx = RPH.W / 2;
  const y = RPH.H * 0.22;

  const w = RPH.W * 0.42;
  const h = RPH.H * 0.08;

  RPH.ctx.strokeStyle = "#111";
  RPH.ctx.lineWidth = h;

  RPH.ctx.beginPath();
  RPH.ctx.moveTo(cx - w/2, y);
  RPH.ctx.quadraticCurveTo(cx, y - 35, cx + w/2, y);
  RPH.ctx.stroke();

  RPH.ctx.fillStyle = "#111";

  RPH.pen.circle(cx - w/2, y, h);
  RPH.pen.circle(cx + w/2, y, h);
},
  
    centroid: { x: 0.5, y: 0.72 },
    text: { x: 0.5, y: 0.32 },

 drawBody: function() {
  const wTop = RPH.W * 0.35;
  const wBottom = RPH.W * 0.50;
  const h = RPH.H * 0.70;

  const cx = RPH.W / 2;
  const y = RPH.H * 0.15;

  const r = 30;

  const leftTop = cx - wTop / 2;
  const rightTop = cx + wTop / 2;
  const leftBottom = cx - wBottom / 2;
  const rightBottom = cx + wBottom / 2;

  RPH.ctx.fillStyle = "#222";

  RPH.ctx.beginPath();

  RPH.ctx.moveTo(leftTop + r, y);

  RPH.ctx.lineTo(rightTop - r, y);
  RPH.ctx.quadraticCurveTo(rightTop, y, rightTop, y + r);

  RPH.ctx.lineTo(rightBottom, y + h - r);
  RPH.ctx.quadraticCurveTo(
    rightBottom,
    y + h,
    rightBottom - r,
    y + h
  );

  RPH.ctx.lineTo(leftBottom + r, y + h);
  RPH.ctx.quadraticCurveTo(
    leftBottom,
    y + h,
    leftBottom,
    y + h - r
  );

  RPH.ctx.lineTo(leftTop, y + r);
  RPH.ctx.quadraticCurveTo(leftTop, y, leftTop + r, y);

  RPH.ctx.closePath();
  RPH.ctx.fill();
},


  };
RPH.draw = function() {
  RPH.pen.clear();

  RPH.phone.drawBody(); 
  RPH.phone.drawReceiver();  // add this

  RPH.ctx.textAlign = "center";
  RPH.ctx.textBaseline = "middle";

  RPH.phone.drawRing();
  RPH.phone.drawLine();
  RPH.phone.drawNumber();
  RPH.phone.drawDigits();
};

window.addEventListener("scroll", function() {
    var phoneSection = document.querySelector(".phone-scroll-section");
    if (!phoneSection) return;

    var sectionTop = phoneSection.offsetTop;
    var sectionHeight = phoneSection.offsetHeight;
    var progress = (window.scrollY - sectionTop) / (sectionHeight - window.innerHeight);
    progress = Math.min(Math.max(progress, 0), 1);

    var newLitCount = Math.floor(progress * (RAW_DIGITS.length + 1));
    newLitCount = Math.min(newLitCount, RAW_DIGITS.length);

    if (newLitCount > RPH.lastLitIndex + 1) {
      for (var i = RPH.lastLitIndex + 1; i < newLitCount; i++) {
        if (DIAL_LINKS[i]) RPH.showPopup(DIAL_LINKS[i]);
         if (dialTone) {
    dialTone.currentTime = 0;
    dialTone.play();
  }

  if (DIAL_LINKS[i]) {
    RPH.showPopup(DIAL_LINKS[i]);
  }
      }
    }

    RPH.phone.litCount = newLitCount;
    RPH.lastLitIndex = newLitCount - 1;
  });

  RPH.resizeCanvas = function() {
    if (!RPH.canvas) return;
    RPH.canvas.width = window.innerWidth;
    RPH.canvas.height = window.innerHeight;
    RPH.W = RPH.canvas.width;
    RPH.H = RPH.canvas.height;
    RPH.minWH = Math.min(RPH.W, RPH.H);
  };

 RPH.init = function() {
    RPH.canvas = document.getElementById("retrophone");
    if (!RPH.canvas) return;
    RPH.ctx = RPH.canvas.getContext("2d");
    RPH.resizeCanvas();
    setInterval(RPH.draw, 10);
  };

  RPH.init();
  window.addEventListener('resize', RPH.resizeCanvas, false);

}); // end DOMContentLoaded
