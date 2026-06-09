(() => {
  const isPhone = window.matchMedia("(max-width: 768px)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isPhone || reduceMotion) return;

  function removeAfter(el, time) {
    window.setTimeout(() => {
      el.remove();
    }, time);
  }

  /* =========================================================
     SECTION 1: HERO EFFECT
     Pixel/block cursor trail
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

      const block = document.createElement("span");
      block.className = "hero-pixel-fx";
      block.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      block.style.left = `${event.clientX}px`;
      block.style.top = `${event.clientY}px`;
      block.style.background = colors[Math.floor(Math.random() * colors.length)];

      document.body.appendChild(block);
      removeAfter(block, 700);
    });
  }

  /* =========================================================
     AFTER SERVICES AREA EFFECT
     Smoke / dhua only for:
     - Resource Vault / Featured Projects
     - Language carousel
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
      const smoke = document.createElement("span");
      smoke.className = "site-smoke-cursor-fx";
      smoke.setAttribute("aria-hidden", "true");

      const size = 26 + Math.random() * 46;
      const driftX = (Math.random() - 0.5) * 46;
      const driftY = -10 - Math.random() * 34;

      smoke.style.left = `${event.clientX + (Math.random() - 0.5) * 14}px`;
      smoke.style.top = `${event.clientY + (Math.random() - 0.5) * 14}px`;
      smoke.style.width = `${size}px`;
      smoke.style.height = `${size}px`;
      smoke.style.setProperty("--smoke-x", `${driftX}px`);
      smoke.style.setProperty("--smoke-y", `${driftY}px`);
      smoke.style.setProperty("--smoke-rotate", `${(Math.random() - 0.5) * 30}deg`);

      document.body.appendChild(smoke);
      removeAfter(smoke, 1250);
    }
  }

  smokeAreas.forEach((selector) => {
    const area = document.querySelector(selector);
    if (!area) return;

    area.addEventListener("pointermove", createSmoke);
  });
})();
