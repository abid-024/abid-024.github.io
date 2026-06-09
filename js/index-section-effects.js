(() => {
  const isPhone = window.matchMedia("(max-width: 768px)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isPhone || reduceMotion) return;

  function removeAfter(el, time) {
    window.setTimeout(() => {
      el.remove();
    }, time);
  }

  function createFixedFx(className) {
    const el = document.createElement("span");
    el.className = className;
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
    return el;
  }

  /* =========================================================
     SECTION 1: HERO / FIRST SECTION
     Effect: pixel block cursor trail
  ========================================================= */
  const hero = document.querySelector("main#home .landing");

  if (hero) {
    const colors = ["#5cf28b", "#c89cff", "#e06112", "#c2c730", "#f4f4ef"];
    const symbols = ["", "+", ">", "=", "/", "."];

    let lastHero = 0;

    hero.addEventListener("pointermove", (event) => {
      const now = Date.now();
      if (now - lastHero < 48) return;
      lastHero = now;

      const block = createFixedFx("hero-pixel-fx");
      block.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      block.style.left = `${event.clientX}px`;
      block.style.top = `${event.clientY}px`;
      block.style.background = colors[Math.floor(Math.random() * colors.length)];

      removeAfter(block, 700);
    });
  }

  /* =========================================================
     SECTION 2: ABOUT / SECOND SECTION
     Effect: skeleton / bone follower
  ========================================================= */
  const about = document.querySelector("main#home .about-section");

  if (about) {
    const segmentCount = 12;
    const segments = [];

    for (let i = 0; i < segmentCount; i += 1) {
      const seg = createFixedFx("about-bone-fx");
      seg.style.opacity = "0";

      segments.push({
        el: seg,
        x: 0,
        y: 0
      });
    }

    let targetX = 0;
    let targetY = 0;
    let active = false;

    function resetBone(x, y) {
      segments.forEach((seg) => {
        seg.x = x;
        seg.y = y;
      });
    }

    about.addEventListener("pointerenter", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      resetBone(targetX, targetY);
      active = true;

      segments.forEach((seg) => {
        seg.el.style.opacity = "1";
      });
    });

    about.addEventListener("pointermove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    });

    about.addEventListener("pointerleave", () => {
      active = false;

      segments.forEach((seg) => {
        seg.el.style.opacity = "0";
      });
    });

    function animateBone() {
      if (active) {
        segments[0].x += (targetX - segments[0].x) * 0.28;
        segments[0].y += (targetY - segments[0].y) * 0.28;

        for (let i = 1; i < segments.length; i += 1) {
          segments[i].x += (segments[i - 1].x - segments[i].x) * 0.24;
          segments[i].y += (segments[i - 1].y - segments[i].y) * 0.24;
        }

        for (let i = 0; i < segments.length; i += 1) {
          const current = segments[i];
          const next = segments[i - 1] || { x: targetX, y: targetY };

          const dx = next.x - current.x;
          const dy = next.y - current.y;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          current.el.style.left = `${current.x}px`;
          current.el.style.top = `${current.y}px`;
          current.el.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        }
      }

      requestAnimationFrame(animateBone);
    }

    animateBone();
  }

  /* =========================================================
     SECTION 3: SERVICE SECTION
     Effect: magic spark particles
  ========================================================= */
  const services = document.querySelector("main#home .service-section");

  if (services) {
    const sparkColors = ["#8f7cff", "#6cf0ff", "#fff4df", "#ffd76b", "#5cf28b"];
    let lastSpark = 0;

    services.addEventListener("pointermove", (event) => {
      const now = Date.now();
      if (now - lastSpark < 45) return;
      lastSpark = now;

      const count = 2 + Math.floor(Math.random() * 2);

      for (let i = 0; i < count; i += 1) {
        const spark = createFixedFx("service-magic-fx");

        const size = 4 + Math.random() * 8;
        const driftX = (Math.random() - 0.5) * 46;
        const driftY = -18 - Math.random() * 38;
        const color = sparkColors[Math.floor(Math.random() * sparkColors.length)];

        spark.style.left = `${event.clientX + (Math.random() - 0.5) * 18}px`;
        spark.style.top = `${event.clientY + (Math.random() - 0.5) * 18}px`;
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.background = color;
        spark.style.setProperty("--spark-color", color);
        spark.style.setProperty("--spark-x", `${driftX}px`);
        spark.style.setProperty("--spark-y", `${driftY}px`);

        removeAfter(spark, 1000);
      }
    });
  }

  /* =========================================================
     AFTER SERVICE SECTION
     Effect: smoke / dhua
     Areas:
     - Resource Vault / Featured Projects
     - Language row
     - Footer
  ========================================================= */
  const smokeAreas = [
    "main#home .feature-section",
    "main#home .carousel-section",
    ".site-footer"
  ];

  let lastSmoke = 0;

  function createSmoke(event) {
    const now = Date.now();
    if (now - lastSmoke < 55) return;
    lastSmoke = now;

    for (let i = 0; i < 2; i += 1) {
      const smoke = createFixedFx("site-smoke-cursor-fx");

      const size = 28 + Math.random() * 48;
      const driftX = (Math.random() - 0.5) * 48;
      const driftY = -10 - Math.random() * 36;

      smoke.style.left = `${event.clientX + (Math.random() - 0.5) * 14}px`;
      smoke.style.top = `${event.clientY + (Math.random() - 0.5) * 14}px`;
      smoke.style.width = `${size}px`;
      smoke.style.height = `${size}px`;
      smoke.style.setProperty("--smoke-x", `${driftX}px`);
      smoke.style.setProperty("--smoke-y", `${driftY}px`);
      smoke.style.setProperty("--smoke-rotate", `${(Math.random() - 0.5) * 30}deg`);

      removeAfter(smoke, 1300);
    }
  }

  smokeAreas.forEach((selector) => {
    const area = document.querySelector(selector);

    if (!area) return;

    area.addEventListener("pointermove", createSmoke);
  });
})();
