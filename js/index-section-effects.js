(() => {
  const isPhone = window.matchMedia("(max-width: 768px)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isPhone || reduceMotion) return;

  document
    .querySelectorAll(
      ".hero-pixel-fx, .about-good-snake-fx, .service-money-fx, .service-money-bill-fx, .site-smoke-cursor-fx"
    )
    .forEach((el) => el.remove());

  const hero = document.querySelector("main#home .landing");
  const about = document.querySelector("main#home .about-section");
  const service = document.querySelector("main#home .service-section");
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
     Pixel block cursor
  ========================================================= */
  const pixelColors = ["#5cf28b", "#c89cff", "#e06112", "#c2c730", "#f4f4ef"];
  const pixelSymbols = ["", "+", ">", "=", "/", "."];

  let lastHero = 0;

  function createHeroPixel(event) {
    const now = Date.now();

    if (now - lastHero < 48) return;
    lastHero = now;

    const block = makeFx("hero-pixel-fx");

    block.textContent = pixelSymbols[Math.floor(Math.random() * pixelSymbols.length)];
    block.style.left = `${event.clientX}px`;
    block.style.top = `${event.clientY}px`;
    block.style.background = pixelColors[Math.floor(Math.random() * pixelColors.length)];

    removeAfter(block, 700);
  }

  /* =========================================================
     ABOUT / SECOND SECTION
     Good snake follower
  ========================================================= */
  const snake = [];
  const snakeCount = 24;

  for (let i = 0; i < snakeCount; i += 1) {
    const part = makeFx(
      i === 0
        ? "about-good-snake-fx about-good-snake-head"
        : "about-good-snake-fx"
    );

    part.style.opacity = "0";
    part.style.setProperty("--snake-i", i);
    part.style.zIndex = i === 0 ? "100060" : `${100030 - i}`;

    snake.push({
      el: part,
      x: 0,
      y: 0
    });
  }

  let snakeX = 0;
  let snakeY = 0;
  let snakeActive = false;
  let snakeStarted = false;

  function showSnake(event) {
    snakeX = event.clientX;
    snakeY = event.clientY;

    if (!snakeStarted) {
      snake.forEach((part) => {
        part.x = snakeX;
        part.y = snakeY;
        part.el.style.opacity = "1";
      });

      snakeStarted = true;
    }

    snakeActive = true;
  }

  function hideSnake() {
    snakeActive = false;
    snakeStarted = false;

    snake.forEach((part) => {
      part.el.style.opacity = "0";
    });
  }

  function animateSnake() {
    if (snakeActive) {
      snake[0].x += (snakeX - snake[0].x) * 0.32;
      snake[0].y += (snakeY - snake[0].y) * 0.32;

      for (let i = 1; i < snake.length; i += 1) {
        snake[i].x += (snake[i - 1].x - snake[i].x) * 0.28;
        snake[i].y += (snake[i - 1].y - snake[i].y) * 0.28;
      }

      snake.forEach((part, index) => {
        const next = snake[index - 1] || {
          x: snakeX,
          y: snakeY
        };

        const dx = next.x - part.x;
        const dy = next.y - part.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        part.el.style.left = `${part.x}px`;
        part.el.style.top = `${part.y}px`;
        part.el.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      });
    }

    requestAnimationFrame(animateSnake);
  }

  animateSnake();

  /* =========================================================
     SERVICE / THIRD SECTION
     Dollar spread hover effect
  ========================================================= */
  const moneySymbols = ["$", "$", "$", "¢", "৳"];
  let lastMoney = 0;

  function createServiceMoney(event) {
    const now = Date.now();

    if (now - lastMoney < 70) return;
    lastMoney = now;

    const count = 5 + Math.floor(Math.random() * 4);

    for (let i = 0; i < count; i += 1) {
      const money = makeFx("service-money-fx");

      const angle = Math.random() * Math.PI * 2;
      const distance = 28 + Math.random() * 74;

      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - Math.random() * 18;

      const rotate = -35 + Math.random() * 70;
      const size = 13 + Math.random() * 10;

      money.textContent = moneySymbols[Math.floor(Math.random() * moneySymbols.length)];
      money.style.left = `${event.clientX + (Math.random() - 0.5) * 10}px`;
      money.style.top = `${event.clientY + (Math.random() - 0.5) * 10}px`;
      money.style.fontSize = `${size}px`;
      money.style.setProperty("--money-x", `${dx}px`);
      money.style.setProperty("--money-y", `${dy}px`);
      money.style.setProperty("--money-rotate", `${rotate}deg`);

      removeAfter(money, 900);
    }

    if (Math.random() > 0.35) {
      const bill = makeFx("service-money-bill-fx");

      const angle = Math.random() * Math.PI * 2;
      const distance = 24 + Math.random() * 54;

      bill.style.left = `${event.clientX}px`;
      bill.style.top = `${event.clientY}px`;
      bill.style.setProperty("--bill-x", `${Math.cos(angle) * distance}px`);
      bill.style.setProperty("--bill-y", `${Math.sin(angle) * distance - 16}px`);
      bill.style.setProperty("--bill-rotate", `${-24 + Math.random() * 48}deg`);

      removeAfter(bill, 920);
    }
  }

  /* =========================================================
     AFTER SERVICE SECTION
     Smoke / dhua
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

  /* =========================================================
     SECTION ROUTER
  ========================================================= */
  document.addEventListener("pointermove", (event) => {
    const y = event.clientY;

    if (isInsideY(hero, y)) {
      hideSnake();
      createHeroPixel(event);
      return;
    }

    if (isInsideY(about, y)) {
      showSnake(event);
      return;
    }

    hideSnake();

    if (isInsideY(service, y)) {
      createServiceMoney(event);
      return;
    }

    if (isInsideY(feature, y) || isInsideY(carousel, y) || isInsideY(footer, y)) {
      createSmoke(event);
    }
  });

  document.addEventListener("pointerleave", () => {
    hideSnake();
  });
})();
