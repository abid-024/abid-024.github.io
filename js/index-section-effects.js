(() => {
  const isPhone = window.matchMedia("(max-width: 768px)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isPhone || reduceMotion) return;

  const hero = document.querySelector("main#home .landing");
  const about = document.querySelector("main#home .about-section");
  const services = document.querySelector("main#home .service-section");
  const feature = document.querySelector("main#home .feature-section");
  const carousel = document.querySelector("main#home .carousel-section");
  const footer = document.querySelector(".site-footer, footer");

  function isInsideY(el, y) {
    if (!el) return false;

    const rect = el.getBoundingClientRect();
    return y >= rect.top && y <= rect.bottom;
  }

  function makeFx(className) {
    const el = document.createElement("span");
    el.className = className;
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
    return el;
  }

  function removeAfter(el, ms) {
    window.setTimeout(() => {
      el.remove();
    }, ms);
  }

  /* =========================================================
     HERO / FIRST SECTION
     Pixel block effect
  ========================================================= */
  const colors = ["#5cf28b", "#c89cff", "#e06112", "#c2c730", "#f4f4ef"];
  const symbols = ["", "+", ">", "=", "/", "."];

  let lastHero = 0;

  function createHeroPixel(event) {
    const now = Date.now();
    if (now - lastHero < 48) return;
    lastHero = now;

    const block = makeFx("hero-pixel-fx");
    block.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    block.style.left = `${event.clientX}px`;
    block.style.top = `${event.clientY}px`;
    block.style.background = colors[Math.floor(Math.random() * colors.length)];

    removeAfter(block, 700);
  }

  /* =========================================================
     ABOUT / SECOND SECTION
     Skeleton follower
  ========================================================= */
  const bones = [];
  const boneCount = 12;

  for (let i = 0; i < boneCount; i += 1) {
    const bone = makeFx("about-bone-fx");
    bone.style.opacity = "0";

    bones.push({
      el: bone,
      x: 0,
      y: 0
    });
  }

  let boneTargetX = 0;
  let boneTargetY = 0;
  let boneActive = false;
  let boneWasActive = false;

  function activateBones(event) {
    boneTargetX = event.clientX;
    boneTargetY = event.clientY;

    if (!boneWasActive) {
      bones.forEach((bone) => {
        bone.x = boneTargetX;
        bone.y = boneTargetY;
        bone.el.style.opacity = "1";
      });

      boneWasActive = true;
    }

    boneActive = true;
  }

  function hideBones() {
    boneActive = false;
    boneWasActive = false;

    bones.forEach((bone) => {
      bone.el.style.opacity = "0";
    });
  }

  function animateBones() {
    if (boneActive) {
      bones[0].x += (boneTargetX - bones[0].x) * 0.28;
      bones[0].y += (boneTargetY - bones[0].y) * 0.28;

      for (let i = 1; i < bones.length; i += 1) {
        bones[i].x += (bones[i - 1].x - bones[i].x) * 0.24;
        bones[i].y += (bones[i - 1].y - bones[i].y) * 0.24;
      }

      for (let i = 0; i < bones.length; i += 1) {
        const current = bones[i];
        const next = bones[i - 1] || { x: boneTargetX, y: boneTargetY };

        const dx = next.x - current.x;
        const dy = next.y - current.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        current.el.style.left = `${current.x}px`;
        current.el.style.top = `${current.y}px`;
        current.el.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      }
    }

    requestAnimationFrame(animateBones);
  }

  animateBones();

  /* =========================================================
     SERVICE SECTION
     Magic spark effect
  ========================================================= */
  const sparkColors = ["#8f7cff", "#6cf0ff", "#fff4df", "#ffd76b", "#5cf28b"];
  let lastSpark = 0;

  function createMagicSpark(event) {
    const now = Date.now();
    if (now - lastSpark < 45) return;
    lastSpark = now;

    const count = 2 + Math.floor(Math.random() * 2);

    for (let i = 0; i < count; i += 1) {
      const spark = makeFx("service-magic-fx");

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
  }

  /* =========================================================
     AFTER SERVICE AREA
     Smoke effect:
     Resource Vault / Featured Projects + Language Row + Footer
  ========================================================= */
  let lastSmoke = 0;

  function createSmoke(event) {
    const now = Date.now();
    if (now - lastSmoke < 55) return;
    lastSmoke = now;

    for (let i = 0; i < 2; i += 1) {
      const smoke = makeFx("site-smoke-cursor-fx");

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

  document.addEventListener("pointermove", (event) => {
    const y = event.clientY;

    if (isInsideY(hero, y)) {
      hideBones();
      createHeroPixel(event);
      return;
    }

    if (isInsideY(about, y)) {
      activateBones(event);
      return;
    }

    hideBones();

    if (isInsideY(services, y)) {
      createMagicSpark(event);
      return;
    }

    if (
      isInsideY(feature, y) ||
      isInsideY(carousel, y) ||
      isInsideY(footer, y)
    ) {
      createSmoke(event);
    }
  });

  document.addEventListener("pointerleave", () => {
    hideBones();
  });
})();
